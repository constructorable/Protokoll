document.getElementById('savePdfButton').addEventListener('click', async function () {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'block';

    // Fortschrittsanzeige
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.style.width = '0%';
    progressText.textContent = '0% abgeschlossen';

    // Elemente zwischenspeichern
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

    // Überprüfen, ob alle erforderlichen Elemente vorhanden sind
    if (!elements.allgemein || !elements.kueche || !elements.bad || !elements.wc || !elements.flur || !elements.abstellraum) {
        console.error("Fehler: Ein oder mehrere erforderliche Elemente wurden nicht gefunden.");
        loadingOverlay.style.display = 'none';
        return;
    }

    // Theme für den Druckmodus aktivieren
    const themeElement = document.getElementById("theme-style");
    const currentTheme = themeElement.getAttribute("href");
    themeElement.setAttribute("href", "stylesprint.css");

    // Buttons ausblenden
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        // Funktion zum Rendern eines Elements in die PDF
        async function renderElementToPDF(element, yOffset = margin) {
            try {
                const canvas = await html2canvas(element, { scale: 1, useCORS: true }); // Skalierung auf 1 reduzieren
                const imgData = canvas.toDataURL('image/jpeg', 0.7); // Qualität auf 70% reduzieren
                const imgHeight = (canvas.height * usableWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', margin, yOffset, usableWidth, imgHeight, undefined, 'FAST'); // 'FAST' für schnelleres Rendern
                return yOffset + imgHeight + margin;
            } catch (error) {
                console.warn("Kein Bild gefunden, überspringe dieses Element:", element);
                return yOffset;
            }
        }

        // Fortschritt aktualisieren
        function updateProgress(current, total) {
            const percentage = Math.round((current / total) * 100);
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}% abgeschlossen`;
        }

        // Anzahl der zu rendernden Elemente
        // Anzahl der zu rendernden Elemente
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

        // Fortschritt aktualisieren
        function updateProgress(current, total) {
            const percentage = Math.round((current / total) * 100);
            // Sicherstellen, dass der Prozentsatz nie mehr als 100% beträgt
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            progressText.textContent = `${Math.min(percentage, 100)}% abgeschlossen`;
        }


        let currentElement = 0;

        // Rendere die allgemeinen Informationen (Seite 1)
        await renderElementToPDF(elements.allgemein);
        currentElement++;
        updateProgress(currentElement, totalElements);

        // Überprüfen, welche Räume auf "NEIN" gesetzt sind
        const neinElements = [];
        if (document.querySelector('#kitch2')?.checked) neinElements.push(elements.kueche);
        if (document.querySelector('#bath2')?.checked) neinElements.push(elements.bad);
        if (document.querySelector('#guestwc2')?.checked) neinElements.push(elements.wc);
        if (document.querySelector('#dieleflur2')?.checked) neinElements.push(elements.flur);
        if (document.querySelector('#abstell2')?.checked) neinElements.push(elements.abstellraum);

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
                updateProgress(currentElement, totalElements);
            }
        }

        // Zusätzliche Räume rendern
        if (elements.roomContainers.length > 0) {
            for (const room of elements.roomContainers) {
                pdf.addPage();
                await renderElementToPDF(room);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        // "NEIN"-Elemente rendern
        if (neinElements.length > 0) {
            pdf.addPage();
            let yOffset = margin;
            for (const element of neinElements) {
                yOffset = await renderElementToPDF(element, yOffset);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        // Dreiergespann rendern
        pdf.addPage();
        let yOffset = margin;
        if (elements.nebenraum) yOffset = await renderElementToPDF(elements.nebenraum, yOffset);
        if (elements.weitereBemerkungen) yOffset = await renderElementToPDF(elements.weitereBemerkungen, yOffset);
        if (elements.hauptBemerkungen) yOffset = await renderElementToPDF(elements.hauptBemerkungen, yOffset);
        currentElement++;
        updateProgress(currentElement, totalElements);

        // Unterschriften rendern
        pdf.addPage();
        let yOffset2 = margin;
        if (elements.print1) yOffset2 = await renderElementToPDF(elements.print1, yOffset2);
        if (elements.stammdupli) yOffset2 = await renderElementToPDF(elements.stammdupli, yOffset2);
        if (elements.signtoggle) yOffset2 = await renderElementToPDF(elements.signtoggle, yOffset2);
        currentElement++;
        updateProgress(currentElement, totalElements);




        // Bilder rendern
        if (elements.bilderzimmer) {
            for (const child of elements.bilderzimmer.children) {
                pdf.addPage();
                await renderElementToPDF(child);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        // Large Images rendern
        if (elements.largeImages.length > 0) {
            for (const image of elements.largeImages) {
                pdf.addPage();
                await renderElementToPDF(image);
                currentElement++;
                updateProgress(currentElement, totalElements);
            }
        }

        // PDF speichern
        pdf.save('protokoll.pdf');

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {
        // Ursprüngliches Theme und Buttons wiederherstellen
        themeElement.setAttribute("href", currentTheme);
        buttons.forEach(button => button.style.display = '');

        // Bildvorschauen und Upload-Buttons wieder anzeigen
        document.querySelectorAll(".imagePreview, .image-preview, .customUploadButton, input[type='file']").forEach(element => {
            element.style.display = "inline-block";
        });

        // Ladeanzeige ausblenden
        loadingOverlay.style.display = 'none';
    }
});
