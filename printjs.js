document.getElementById('savePdfButton').addEventListener('click', async function () {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex'; // Ladebildschirm anzeigen

    // Fortschrittsanzeige
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.style.width = '0%';
    progressText.textContent = '0% abgeschlossen';

    // Schließen-Button für den Ladebildschirm
    const closeButton = document.getElementById('closeLoadingOverlay');
    closeButton.addEventListener('click', function () {
        loadingOverlay.style.display = 'none'; // Ladebildschirm ausblenden
    });

    // Sticky-Container vorübergehend ausblenden
    const stickyContainer = document.querySelector('.sticky-container');
    if (stickyContainer) {
        stickyContainer.style.display = 'none';
    }

    // Rest des Codes bleibt unverändert
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
            stickyContainer.style.display = ''; // Sticky-Container wieder einblenden
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
                const canvas = await html2canvas(element, { scale: 1, useCORS: true });
                const imgData = canvas.toDataURL('image/jpeg', 0.7);
                const imgHeight = (canvas.height * usableWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', margin, yOffset, usableWidth, imgHeight, undefined, 'FAST');
                return yOffset + imgHeight + margin;
            } catch (error) {
                console.warn("Kein Bild gefunden, überspringe dieses Element:", element);
                return yOffset;
            }
        }

        function updateProgress(current, total) {
            const percentage = Math.round((current / total) * 100);
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            progressText.textContent = `${Math.min(percentage, 100)}% abgeschlossen`;
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
            elements.bilderzimmer ? elements.bilderzimmer.children : [],
            elements.largeImages
        ].flat().length;

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
            for (const child of elements.bilderzimmer.children) {
                pdf.addPage();
                await renderElementToPDF(child);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        if (elements.largeImages.length > 0) {
            for (const image of elements.largeImages) {
                pdf.addPage();
                await renderElementToPDF(image);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        // Speichere die ursprünglichen Höhen der Input-Felder
        const inputs = document.querySelectorAll("input");
        const originalHeights = [];

        inputs.forEach(input => {
            originalHeights.push(input.style.height);
            input.style.height = "24px";
        });

        // PDF speichern
        pdf.save('protokoll.pdf');

        // Ursprüngliche Höhen wiederherstellen
        inputs.forEach((input, index) => {
            input.style.height = originalHeights[index];
        });

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {
        themeElement.setAttribute("href", currentTheme);
        buttons.forEach(button => button.style.display = '');

        document.querySelectorAll(".imagePreview, .image-preview, .customUploadButton, input[type='file']").forEach(element => {
            element.style.display = "inline-block";
        });

        loadingOverlay.style.display = 'none';

        // Sticky-Container wieder einblenden
        if (stickyContainer) {
            stickyContainer.style.display = '';
        }
    }
});
