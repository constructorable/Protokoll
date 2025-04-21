document.addEventListener('DOMContentLoaded', function () {
});

const checkboxState = storeCheckboxState();


function storeCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const states = [];
    checkboxes.forEach(checkbox => {
        states.push({
            id: checkbox.id,
            checked: checkbox.checked,
            type: checkbox.type
        });
    });
    return states;
}

function restoreCheckboxState(states) {
    states.forEach(state => {
        const checkbox = document.getElementById(state.id);
        if (checkbox) {
            checkbox.checked = state.checked;
        }
    });
}


// Vorbereitung: DOM manipulieren & Originalwerte speichern
function prepareDOMForPDF() {
    const changes = [];

    // Buttons, Animations, bestimmte Klassen ausblenden
    document.querySelectorAll('.no-print, button').forEach(el => {
        changes.push({ element: el, property: 'display', original: el.style.display });
        el.style.display = 'none';
    });

    // Alle Animationen entfernen
    document.querySelectorAll('*').forEach(el => {
        changes.push({ element: el, property: 'animation', original: el.style.animation });
        el.style.animation = 'none';
    });

    return changes;
}

function restoreDOM(changes) {
    changes.forEach(({ element, property, original }) => {
        element.style[property] = original;
    });
}

async function preloadImages() {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
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


/* document.getElementById('savePdfButton').addEventListener('click', async function (event) {
    if (!validateStrasseeinzug() || !validateZentralCheckboxes() || !validateCheckboxes() || !validateNumberInputs()) {
        event.preventDefault();
        return;
    } */

document.getElementById('savePdfButton').addEventListener('click', async function (event) {
    if (!validateStrasseeinzug() || !validateNumberInputs()) {
        event.preventDefault();
        return;
    }


    // Bestätigungsdialog für Bilder anzeigen
    // Funktion gibt ein Promise zurück, das true (mit Bildern), false (ohne) oder null (abbrechen) zurückgibt

    const bilderVorhanden =
        document.querySelector('.bilderzimmer')?.children.length > 0 ||
        document.querySelectorAll('[id^="large-wrapper-img"]').length > 0;

    let includeImages = false;

    // 2. Modal anzeigen, falls Bilder vorhanden
    if (bilderVorhanden) {
        includeImages = await showImageModal();

        if (includeImages === null) {
            // Benutzer hat abgebrochen
            return;
        }
    }
    exportPDF(includeImages);











    let domChanges = []; // Stelle sicher, dass domChanges immer existiert

    async function exportPDF(includeImages) {
        if (exportInProgress) {
            console.log("Ein Export läuft bereits.");
            return;
        }
        exportInProgress = true;
        const domChanges = prepareDOMForPDF();
        const progressBarContainer = document.getElementById('progress-bar');
        progressBarContainer.style.display = 'block';


        const bar = new ProgressBar.Line(progressBarContainer, {
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: { width: '100%', height: '100%' },
            text: {
                style: {
                    color: '#999',
                    position: 'absolute',
                    right: '0',
                    top: '30px',
                    padding: 0,
                    margin: 0,
                    transform: null,
                },
                autoStyleContainer: false,
            },
            from: { color: '#FFEA82' },
            to: { color: '#ED6A5A' },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            },

        });

        bar.animate(1.0, async function () {
            try {
                if (includeImages) {
                    await printJS({
                        printable: 'printable',
                        type: 'html',
                        style: '@page { size: auto;  margin: 20mm; }',
                        targetStyles: ['*'],
                        scanStyles: false,
                    });
                } else {
                    const printableElement = document.getElementById('printable').cloneNode(true);
                    const images = printableElement.querySelectorAll('img');
                    images.forEach(img => img.remove());

                    const printContainer = document.createElement('div');
                    printContainer.appendChild(printableElement);
                    document.body.appendChild(printContainer);

                    await printJS({
                        printable: printContainer.innerHTML,
                        type: 'raw-html',
                        style: '@page { size: auto;  margin: 20mm; }',
                        scanStyles: false,
                    });

                    document.body.removeChild(printContainer);
                }
            } catch (error) {
                console.error("Fehler beim PDF-Export:", error);
            } finally {

                restoreCheckboxState(checkboxState);

                progressBarContainer.style.display = 'none';
                progressBarContainer.innerHTML = ''; // Fortschrittsbalken zurücksetzen
                restoreDOM(domChanges); // 🌟 DOM zurücksetzen
                exportInProgress = false;
            }
        });



        try {
            // Vorab das aktuelle Theme speichern
            const currentTheme = themeElement.getAttribute("href");

            // Überprüfen, ob Bilder vorhanden sind, bevor das Modal angezeigt wird
            const bilderVorhanden = checkForImages();

            if (bilderVorhanden) {
                // Zeige Modal und frage, ob Bilder inkludiert werden sollen
                const includeImages = await showImageModal();

                // Wenn der Benutzer den Export abbricht (null zurückgibt), gehe zurück
                if (includeImages === null) {
                    themeElement.setAttribute("href", currentTheme);
                    restoreDOM(domChanges); // Ursprungszustand wiederherstellen
                    return; // Abbruch des Vorgangs
                }

                // Wenn Bilder enthalten sein sollen, DOM ändern
                domChanges = prepareDOMForPDF(); // DOM-Änderungen speichern

                // Exportiere das PDF
                const pdf = await generatePDF(domChanges, includeImages);
                savePDF(pdf);

                // Nach dem Export das Theme zurücksetzen
                themeElement.setAttribute("href", currentTheme);
            }

        } catch (error) {
            console.error("Fehler beim PDF-Export:", error);
        } finally {
            // Sicherstellen, dass beim Abbruch der Zustand immer zurückgesetzt wird
            restoreDOM(domChanges); // Ursprungszustand wiederherstellen
            themeElement.setAttribute("href", currentTheme); // Theme zurücksetzen
        }
    }

    // Funktion, um DOM für den PDF-Export vorzubereiten
    function prepareDOMForPDF() {
        // Beispiel: Änderungen am DOM durchführen und zurückgeben
        const changes = []; // Array für Änderungen
        // Speichern, welche Elemente geändert wurden
        changes.push(...document.querySelectorAll('.important-element'));
        // Weitere Modifikationen hier, falls nötig
        return changes;
    }

    // Funktion, um den DOM-Zustand wiederherzustellen
    function restoreDOM(changes) {
        // Stelle sicher, dass alle Änderungen zurückgesetzt werden
        changes.forEach(element => {
            // Beispiel: Rücksetzen von Attributen oder Styles
            element.style = ""; // Beispiel für das Zurücksetzen von Styles
        });
    }

    // Funktion zum Überprüfen, ob Bilder vorhanden sind
    function checkForImages() {
        return document.querySelectorAll('img').length > 0;
    }

    // Funktion zum Anzeigen des Bild-Dialogs
    function showImageModal() {
        return new Promise((resolve) => {
            const modal = document.getElementById('imageModal');
            const withImagesBtn = document.getElementById('withImagesBtn');
            const withoutImagesBtn = document.getElementById('withoutImagesBtn');
            const cancelModalBtn = document.getElementById('cancelModalBtn');

            modal.style.display = 'flex'; // Modal sichtbar machen

            // Cleanup-Funktion, um Modal zu schließen und Event Listener zu entfernen
            function closeModal() {
                modal.style.display = 'none';
                withImagesBtn.removeEventListener('click', onWithImages);
                withoutImagesBtn.removeEventListener('click', onWithoutImages);
                cancelModalBtn.removeEventListener('click', onCancel);
            }

            function onWithImages() {
                closeModal();
                resolve(true); // mit Bildern
            }

            function onWithoutImages() {
                closeModal();
                resolve(false); // ohne Bilder
            }

            function onCancel() {
                closeModal();
                resolve(null); // abgebrochen
            }

            withImagesBtn.addEventListener('click', onWithImages);
            withoutImagesBtn.addEventListener('click', onWithoutImages);
            cancelModalBtn.addEventListener('click', onCancel);
        });
    }


    // Funktion zur PDF-Erstellung (Beispiel)
    async function generatePDF(domChanges, includeImages) {
        // Hier wird das PDF erstellt, basierend auf den DOM-Änderungen und der Option für Bilder
        const pdf = {}; // Beispiel-PDF-Objekt
        return pdf;
    }

    // Funktion zum Speichern des PDFs (Beispiel)
    function savePDF(pdf) {
        console.log("PDF wurde gespeichert", pdf);
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
        bilderzimmer: includeImages ? document.querySelector('.bilderzimmer') : null,
        largeImages: includeImages ? document.querySelectorAll('[id^="large-wrapper-img"]') : [],
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



    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        async function renderElementToPDF(element, yOffset = margin) {
            try {
                // Temporär Bilder ausblenden wenn keine Bilder gewünscht
                if (!includeImages) {
                    element.querySelectorAll('img').forEach(img => {
                        img.style.display = 'none';
                    });
                }

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    letterRendering: true
                });

                // Originalzustand wiederherstellen
                if (!includeImages) {
                    element.querySelectorAll('img').forEach(img => {
                        img.style.display = '';
                    });
                }

                const imgData = canvas.toDataURL('image/jpeg', 0.7);
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
            ...(includeImages && elements.bilderzimmer ? Array.from(elements.bilderzimmer.children) : []),
            ...(includeImages ? Array.from(elements.largeImages) : [])
        ].length;

        let currentElement = 0;

        await renderElementToPDF(elements.allgemein);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

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

        if (elements.roomContainers.length > 0) {
            for (const room of elements.roomContainers) {
                pdf.addPage();
                await renderElementToPDF(room);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

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

        pdf.addPage();
        let yOffset = margin;
        if (elements.nebenraum) yOffset = await renderElementToPDF(elements.nebenraum, yOffset);
        if (elements.weitereBemerkungen) yOffset = await renderElementToPDF(elements.weitereBemerkungen, yOffset);
        if (elements.hauptBemerkungen) yOffset = await renderElementToPDF(elements.hauptBemerkungen, yOffset);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        pdf.addPage();
        let yOffset2 = margin;
        if (elements.print1) yOffset2 = await renderElementToPDF(elements.print1, yOffset2);
        if (elements.signtoggle) yOffset2 = await renderElementToPDF(elements.signtoggle, yOffset2);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        if (includeImages && elements.bilderzimmer) {
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

        if (includeImages && elements.largeImages.length > 0) {
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

        const inputs = document.querySelectorAll("input");
        const originalHeights = [];
        inputs.forEach(input => {
            originalHeights.push(input.style.height);
            input.style.height = "24px";
        });

        function generateFileName() {
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
        
            // Protokollart aus Dropdown auslesen
            const protokollDropdown = document.querySelector('.dropdown-style');
            let protokollTyp = protokollDropdown ? protokollDropdown.value : '';
            
            // Fallback für alte Checkbox-Logik (falls noch benötigt)
            if (!protokollTyp) {
                const isAbnahme = document.getElementById('abn01')?.checked || false;
                const isUebergabe = document.getElementById('ueb01')?.checked || false;
        
                if (isAbnahme && isUebergabe) {
                    protokollTyp = 'Abnahme- und Übergabeprotokoll';
                } else if (isAbnahme) {
                    protokollTyp = 'Abnahmeprotokoll';
                } else if (isUebergabe) {
                    protokollTyp = 'Übergabeprotokoll';
                }
            }
        
            // Sonderzeichen und Leerzeichen ersetzen
            const cleanStrasse = strasse.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
            const cleanProtokollTyp = protokollTyp.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
        
            // Dateiname zusammenbauen
            let fileName = `${cleanStrasse}_${datumZeit}`;
            if (cleanProtokollTyp && cleanProtokollTyp !== '-') {
                fileName += `_${cleanProtokollTyp}`;
            }
            fileName += '.pdf';
        
            return fileName;
        }

        const fileName = generateFileName();
        pdf.save(fileName);

        inputs.forEach((input, index) => {
            input.style.height = originalHeights[index];
        });

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {
        // DOM-Zustand wiederherstellen
        restoreDOM(domChanges);

        // Platzhalter wiederherstellen
        originalPlaceholders.forEach(item => {
            item.element.setAttribute('placeholder', item.placeholder);
        });

        // Ursprüngliches Theme wiederherstellen
        themeElement.setAttribute("href", currentTheme);

        // Buttons wieder anzeigen
        buttons.forEach(button => button.style.display = '');

        // Sticky-Leiste wieder anzeigen
        if (stickyContainer) stickyContainer.style.display = '';

        // Overlay schließen
        loadingOverlay.style.display = 'none';

    }
});


