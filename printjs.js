// Copyright - Oliver Acker, acker_oliver@yahoo.de
// print.js
// Version 3.25_beta

document.addEventListener('DOMContentLoaded', function () {

});

function validateStrasseeinzug() {
    const strasseeinzugInput = document.getElementById("strasseeinzug");

    if (!strasseeinzugInput.value || strasseeinzugInput.value.trim() === "") {
        alert("Objekt / Straße bitte eingeben.");
        return false;
    }

    return true;
}

function validateCheckboxes() {
    const abnahmeCheckbox = document.getElementById("abnahme");
    const uebergabeCheckbox = document.getElementById("uebergabe");

    if (!abnahmeCheckbox.checked && !uebergabeCheckbox.checked) {
        alert("Bitte mind.s eine Protokollart wählen (Abnahme- und / oder Übergabeprotokoll).");
        return false;
    }

    return true;
}

function validateZentralCheckboxes() {
    const checkboxes = document.querySelectorAll('#zentral input[type="checkbox"]');
    let isChecked = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        alert("Bitte Checkboxen für Heizung / Warmwasser zentral oder dezentral auswählen.");
        return false;
    }

    return true;
}

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


    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';



    // NEU: Placeholder ausblenden
    const inputsWithPlaceholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    const originalPlaceholders = [];
    inputsWithPlaceholders.forEach(input => {
        originalPlaceholders.push({
            element: input,
            placeholder: input.getAttribute('placeholder')
        });
        input.removeAttribute('placeholder');
    });

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.style.width = '0%';
    progressText.textContent = '0% abgeschlossen';

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

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        async function renderElementToPDF(element, yOffset = margin) {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                const canvas = await html2canvas(element, { scale: 1, useCORS: true });
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
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

                    pdf.addImage(imgData, 'JPEG', margin, yOffset, usableWidth, scaledHeight, undefined, 'FAST');
                }

                return yOffset + scaledHeight + margin;
            } catch (error) {
                console.warn("Fehler beim Rendern des Elements:", element, error);
                return yOffset;
            }
        }


        let targetPercentage = 0;
        let currentDisplayPercentage = 0;
        const progressIntervalDuration = 30;

        function updateProgressSmoothly(target) {
            targetPercentage = target;

            if (!window.progressInterval) {
                window.progressInterval = setInterval(animateProgress, progressIntervalDuration);
            }
        }

        function animateProgress() {
            if (currentDisplayPercentage < targetPercentage) {
                currentDisplayPercentage++;
                progressBar.style.width = `${currentDisplayPercentage}%`;
                progressText.textContent = `${currentDisplayPercentage}% abgeschlossen`;

                updateProgressColor(currentDisplayPercentage);
            }

            if (currentDisplayPercentage >= targetPercentage) {
                clearInterval(window.progressInterval);
                window.progressInterval = null;
            }
        }

        if (currentDisplayPercentage >= 100) {
            progressBar.classList.add('progress-complete');
            setTimeout(() => {
                progressBar.classList.remove('progress-complete');
            }, 1000);
        }

        function updateProgressColor(percentage) {
            if (percentage > 75) {
                progressBar.style.backgroundColor = '#2E7D32'; // Dunkelgrün (reif)
                progressBar.style.boxShadow = '0 0 15px rgba(46, 125, 50, 0.6)';
            } else if (percentage > 50) {
                progressBar.style.backgroundColor = '#388E3C'; // Mittelgrün (wachsend)
                progressBar.style.boxShadow = '0 0 12px rgba(56, 142, 60, 0.5)';
            } else if (percentage > 25) {
                progressBar.style.backgroundColor = '#4CAF50'; // Frischgrün
                progressBar.style.boxShadow = '0 0 8px rgba(76, 175, 80, 0.4)';
            } else {
                progressBar.style.backgroundColor = '#8BC34A'; // Hellgrün (Keimling)
                progressBar.style.boxShadow = '0 0 5px rgba(139, 195, 74, 0.3)';
            }
        }



        function updateProgress(current, total) {
            const percentage = Math.min(Math.round((current / total) * 100), 100);
            updateProgressSmoothly(percentage);
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
            elements.stammdupli,
            elements.signtoggle,
            ...(elements.bilderzimmer ? Array.from(elements.bilderzimmer.children) : []),
            ...(elements.largeImages ? Array.from(elements.largeImages) : [])
        ].length;

        let currentElement = 0;

        await renderElementToPDF(elements.allgemein);
        currentElement++;
        updateProgress(currentElement, totalElements);

        const neinElements = [];
        if (document.querySelector('#kitch2')?.checked) neinElements.push(elements.kueche);
        if (document.querySelector('#bath2')?.checked) neinElements.push(elements.bad);
        if (document.querySelector('#guestwc2')?.checked) neinElements.push(elements.wc);
        if (document.querySelector('#dieleflur2')?.checked) neinElements.push(elements.flur);
        if (document.querySelector('#abstell2')?.checked) neinElements.push(elements.abstellraum);

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
                updateProgress(currentElement, totalElements);
            }
        }

        if (elements.roomContainers.length > 0) {
            for (const room of elements.roomContainers) {
                pdf.addPage();
                await renderElementToPDF(room);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        if (neinElements.length > 0) {
            pdf.addPage();
            let yOffset = margin;
            for (const element of neinElements) {
                yOffset = await renderElementToPDF(element, yOffset);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        pdf.addPage();
        let yOffset = margin;
        if (elements.nebenraum) yOffset = await renderElementToPDF(elements.nebenraum, yOffset);
        if (elements.weitereBemerkungen) yOffset = await renderElementToPDF(elements.weitereBemerkungen, yOffset);
        if (elements.hauptBemerkungen) yOffset = await renderElementToPDF(elements.hauptBemerkungen, yOffset);
        currentElement++;
        updateProgress(currentElement, totalElements);

        pdf.addPage();
        let yOffset2 = margin;
        if (elements.print1) yOffset2 = await renderElementToPDF(elements.print1, yOffset2);
        if (elements.stammdupli) yOffset2 = await renderElementToPDF(elements.stammdupli, yOffset2);
        if (elements.signtoggle) yOffset2 = await renderElementToPDF(elements.signtoggle, yOffset2);
        currentElement++;
        updateProgress(currentElement, totalElements);

        if (elements.bilderzimmer) {
            const children = Array.from(elements.bilderzimmer.children);
            for (let i = 0; i < children.length; i += 2) {
                pdf.addPage();
                const firstImage = children[i];
                const secondImage = children[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    updateProgress(currentElement, totalElements);
                }
            }
        }

        if (elements.largeImages.length > 0) {
            const largeImages = Array.from(elements.largeImages);
            for (let i = 0; i < largeImages.length; i += 2) {
                pdf.addPage();
                const firstImage = largeImages[i];
                const secondImage = largeImages[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    updateProgress(currentElement, totalElements);
                }
            }
        }

        const inputs = document.querySelectorAll("input");
        const originalHeights = [];

        inputs.forEach(input => {
            originalHeights.push(input.style.height);
            input.style.height = "24px";
        });

        const strasse = document.getElementById('strasseeinzug').value;
        const datum = document.getElementById('datum').value;

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

        const fileName = `${strasse}_${datum}_${protokollTyp}.pdf`.replace(/\s+/g, '_');
        pdf.save(fileName);






        inputs.forEach((input, index) => {
            input.style.height = originalHeights[index];
        });

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {

        originalPlaceholders.forEach(item => {
            item.element.setAttribute('placeholder', item.placeholder);
        });

        themeElement.setAttribute("href", currentTheme);
        buttons.forEach(button => button.style.display = '');

        themeElement.setAttribute("href", currentTheme);
        buttons.forEach(button => button.style.display = '');

        /*         document.querySelectorAll(".imagePreview, .image-preview, .customUploadButton, input[type='file']").forEach(element => {
                    element.style.display = "inline-block";
                }); */

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
