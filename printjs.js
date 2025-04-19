document.addEventListener('DOMContentLoaded', function () {
});

// Hilfsfunktionen an den Anfang stellen
function prepareDOMForPDF() {
    const changes = [];

    // Verstecke unnötige Elemente
    document.querySelectorAll('.no-print').forEach(el => {
        changes.push({
            element: el,
            property: 'style.display',
            original: el.style.display
        });
        el.style.display = 'none';
    });

    // Vereinfache komplexe CSS-Animationen
    document.querySelectorAll('*').forEach(el => {
        changes.push({
            element: el,
            property: 'style.animation',
            original: el.style.animation
        });
        el.style.animation = 'none';
    });

    return changes;
}

function restoreDOM(changes) {
    changes.forEach(change => {
        change.element.style[change.property] = change.original;
    });
}

async function preloadImages() {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        
        return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Auch bei Fehlern fortfahren
        });
    });
    
    await Promise.all(promises);
}

async function renderElementsInParallel(elements) {
    const promises = elements.map(element =>
        html2canvas(element, {
            scale: 1,
            useCORS: true,
            logging: false,
            allowTaint: true,
            letterRendering: true
        })
    );
    return await Promise.all(promises);
}

/* function updateProgress(current, total) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const percentage = Math.round((current / total) * 100);

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Fortschritt: ${percentage}%`;

    // Farbwechsel basierend auf Fortschritt
    if (percentage < 30) {
        progressBar.style.backgroundColor = '#ff4d4d';
    } else if (percentage < 70) {
        progressBar.style.backgroundColor = '#ffcc00';
    } else {
        progressBar.style.backgroundColor = '#4CAF50';
    }
} */

// Hauptfunktion
document.getElementById('savePdfButton').addEventListener('click', async function (event) {
    if (!validateStrasseeinzug()) {
        event.preventDefault();
        return;
    }

    if (!validateZentralCheckboxes()) {
        event.preventDefault();
        return;
    }

    if (!validateCheckboxes()) {
        event.preventDefault();
        return;
    }

    if (!validateNumberInputs()) {
        event.preventDefault();
        return;
    }

    initializeProgressBar();

    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    const inputsWithPlaceholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    const originalPlaceholders = [];
    inputsWithPlaceholders.forEach(input => {
        originalPlaceholders.push({
            element: input,
            placeholder: input.getAttribute('placeholder')
        });
        input.removeAttribute('placeholder');
    });

    const closeButton = document.getElementById('closeLoadingOverlay');
    closeButton.addEventListener('click', function () {
        loadingOverlay.style.display = 'none';
    });

    const stickyContainer = document.querySelector('.sticky-container');
    if (stickyContainer) {
        stickyContainer.style.display = 'none';
    }

    const elements = {
        allgemein: document.querySelector('#zzzallgemein'),
        kueche: document.querySelector('#zzzkueche'),
        bad: document.querySelector('#zzzbad'),
        wc: document.querySelector('#zzzwc'),
        flur: document.querySelector('#zzzflur'),
        abstellraum: document.querySelector('#abstellContainer'),
        roomContainers: document.querySelectorAll('.room-container'),
        nebenraum: document.querySelector('#nebenraumContainer'),
        weitereBemerkungen: document.querySelector('#weitereBemerkungenContainer'),
        hauptBemerkungen: document.querySelector('#hauptBemerkungenContainer'),
        signtoggle: document.querySelector('#signtoggle'),
        bilderzimmer: document.querySelector('.bilderzimmer'),
        largeImages: document.querySelectorAll('[id^="large-wrapper-img"]'),
        print1: document.querySelector('#zzzprint1'),
        stammdupli: document.querySelector('.stammdupli')
    };

    if (!elements.allgemein || !elements.kueche || !elements.bad || !elements.wc || !elements.flur || !elements.abstellraum) {
        console.error("Fehler: Ein oder mehrere erforderliche Elemente wurden nicht gefunden.");
        loadingOverlay.style.display = 'none';
        if (stickyContainer) {
            stickyContainer.style.display = '';
        }
        return;
    }

    const themeElement = document.getElementById("theme-style");
    const currentTheme = themeElement.getAttribute("href");
    themeElement.setAttribute("href", "stylesprint.css");

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    // DOM vorbereiten
    const domChanges = prepareDOMForPDF();
    await preloadImages();

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        async function renderElementToPDF(element, yOffset = margin) {
            try {
                const canvas = await html2canvas(element, {
                    scale: 1, // Reduzierte Skalierung für bessere Performance
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    letterRendering: true
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.7); // Reduzierte Qualität
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                const maxPageHeight = pageHeight - 2 * margin;
                let scaledHeight = (imgHeight * usableWidth) / imgWidth;

                if (scaledHeight > maxPageHeight) {
                    const scaleFactor = maxPageHeight / scaledHeight;
                    scaledHeight *= scaleFactor;
                    const scaledWidth = usableWidth * scaleFactor;

                    pdf.addImage(
                        imgData,
                        'JPEG',
                        margin + (usableWidth - scaledWidth) / 2,
                        yOffset,
                        scaledWidth,
                        scaledHeight,
                        undefined,
                        'FAST'
                    );
                } else {
                    pdf.addImage(imgData, 'JPEG', margin, yOffset, usableWidth, scaledHeight, undefined, 'SLOW');
                }

                return yOffset + scaledHeight + margin;
            } catch (error) {
                console.warn("Fehler beim Rendern des Elements:", element, error);
                return yOffset;
            }
        }

        const totalElements = [
            elements.allgemein,
            elements.kueche,
            elements.bad,
            elements.wc,
            elements.flur,
            elements.abstellraum,
            ...elements.roomContainers,
            elements.nebenraum,
            elements.weitereBemerkungen,
            elements.hauptBemerkungen,
            elements.print1,
            elements.signtoggle,
            ...(elements.bilderzimmer ? Array.from(elements.bilderzimmer.children) : []),
            ...(elements.largeImages ? Array.from(elements.largeImages) : [])
        ].length;

        let currentElement = 0;

        // Erste Seite
        await renderElementToPDF(elements.allgemein);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        // Räume rendern
        const roomsToRender = [
            { condition: !document.querySelector('#kitch2')?.checked, element: elements.kueche },
            { condition: !document.querySelector('#bath2')?.checked, element: elements.bad },
            { condition: !document.querySelector('#guestwc2')?.checked, element: elements.wc },
            { condition: !document.querySelector('#dieleflur2')?.checked, element: elements.flur },
            { condition: !document.querySelector('#abstell2')?.checked, element: elements.abstellraum }
        ];

        for (const room of roomsToRender) {
            if (room.condition) {
                pdf.addPage();
                await renderElementToPDF(room.element);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        // Weitere Räume
        if (elements.roomContainers.length > 0) {
            for (const room of elements.roomContainers) {
                pdf.addPage();
                await renderElementToPDF(room);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        // "Nein"-Elemente
        const neinElements = [];
        if (document.querySelector('#kitch2')?.checked) neinElements.push(elements.kueche);
        if (document.querySelector('#bath2')?.checked) neinElements.push(elements.bad);
        if (document.querySelector('#guestwc2')?.checked) neinElements.push(elements.wc);
        if (document.querySelector('#dieleflur2')?.checked) neinElements.push(elements.flur);
        if (document.querySelector('#abstell2')?.checked) neinElements.push(elements.abstellraum);

        if (neinElements.length > 0) {
            pdf.addPage();
            let yOffset = margin;
            for (const element of neinElements) {
                yOffset = await renderElementToPDF(element, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        // Bemerkungen
        pdf.addPage();
        let yOffset = margin;
        if (elements.nebenraum) yOffset = await renderElementToPDF(elements.nebenraum, yOffset);
        if (elements.weitereBemerkungen) yOffset = await renderElementToPDF(elements.weitereBemerkungen, yOffset);
        if (elements.hauptBemerkungen) yOffset = await renderElementToPDF(elements.hauptBemerkungen, yOffset);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        // Unterschriften und Druck
        pdf.addPage();
        let yOffset2 = margin;
        if (elements.print1) yOffset2 = await renderElementToPDF(elements.print1, yOffset2);
        if (elements.signtoggle) yOffset2 = await renderElementToPDF(elements.signtoggle, yOffset2);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        // Bilder
        if (elements.bilderzimmer) {
            const children = Array.from(elements.bilderzimmer.children);
            for (let i = 0; i < children.length; i += 2) {
                pdf.addPage();
                const firstImage = children[i];
                const secondImage = children[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    window.updateProgress(currentElement, totalElements);
                }
            }
        }

        // Große Bilder
        if (elements.largeImages.length > 0) {
            const largeImages = Array.from(elements.largeImages);
            for (let i = 0; i < largeImages.length; i += 2) {
                pdf.addPage();
                const firstImage = largeImages[i];
                const secondImage = largeImages[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    window.updateProgress(currentElement, totalElements);
                }
            }
        }

        // Input-Höhen zurücksetzen
        const inputs = document.querySelectorAll("input");
        const originalHeights = [];
        inputs.forEach(input => {
            originalHeights.push(input.style.height);
            input.style.height = "24px";
        });

        // PDF speichern
        const strasse = document.getElementById('strasseeinzug').value;
        const now = new Date();
        const datumZeit = now.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/, /, '_').replace(/\./g, '-').replace(/:/g, '-');

        let protokollTyp = '';
        const isAbnahme = document.getElementById('abnahme').checked;
        const isUebergabe = document.getElementById('uebergabe').checked;

        if (isAbnahme && isUebergabe) {
            protokollTyp = 'Abnahme- und Übergabeprotokoll';
        } else if (isAbnahme) {
            protokollTyp = 'Abnahmeprotokoll';
        } else if (isUebergabe) {
            protokollTyp = 'Übergabeprotokoll';
        }

        const fileName = `${strasse}_${datumZeit}_${protokollTyp}.pdf`.replace(/\s+/g, '_');
        pdf.save(fileName);

        inputs.forEach((input, index) => {
            input.style.height = originalHeights[index];
        });

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {
        // Aufräumen
        restoreDOM(domChanges);
        
        originalPlaceholders.forEach(item => {
            item.element.setAttribute('placeholder', item.placeholder);
        });

        themeElement.setAttribute("href", currentTheme);
        buttons.forEach(button => button.style.display = '');

        document.querySelectorAll(".customUploadButton").forEach(element => {
            element.style.display = "inline-block";
        });

        document.querySelectorAll(".imagePreview, .image-preview, input[type='file']").forEach(element => {
            element.style.display = "none";
        });

        loadingOverlay.style.display = 'none';

        if (stickyContainer) {
            stickyContainer.style.display = '';
        }
    }
});
