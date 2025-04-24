// Copyright - Oliver Acker, acker_oliver@yahoo.de
// pictopdf.js
// Version 3.32_beta

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pictopdfButton').addEventListener('click', async function () {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);
        const maxPageHeight = pageHeight - 2 * margin;

        // Fortschrittsanzeige erstellen
        const progressWrapper = document.createElement('div');
        progressWrapper.style.position = 'fixed';
        progressWrapper.style.top = '50%';
        progressWrapper.style.left = '50%';
        progressWrapper.style.transform = 'translate(-50%, -50%)';
        progressWrapper.style.backgroundColor = '#fff';
        progressWrapper.style.border = '1px solid #ccc';
        progressWrapper.style.padding = '20px';
        progressWrapper.style.zIndex = '10000';
        progressWrapper.style.width = '600px';
        progressWrapper.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        progressWrapper.style.textAlign = 'center';

        const progressBar = document.createElement('div');
        progressBar.style.height = '20px';
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = '#4caf50';
        progressBar.style.borderRadius = '10px';
        progressBar.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.7)';
        progressBar.style.transition = 'width 0.2s';

        const progressOuter = document.createElement('div');
        progressOuter.style.width = '100%';
        progressOuter.style.backgroundColor = '#eee';
        progressOuter.style.marginTop = '10px';
        progressOuter.appendChild(progressBar);

        const progressText = document.createElement('div');
        progressText.innerText = '0 %';
        progressText.style.marginTop = '10px';
        progressText.style.fontFamily = 'sans-serif';
        progressText.style.fontSize = '22px';

        const titleText = document.createElement('div');
        titleText.innerText = 'PDF wird erstellt...';
        titleText.style.fontSize = '26px';
        titleText.style.fontWeight = 'bold';
        titleText.style.marginBottom = '10px';
        titleText.style.fontFamily = 'sans-serif';
        progressWrapper.appendChild(titleText);

        progressWrapper.appendChild(progressOuter);
        progressWrapper.appendChild(progressText);
        document.body.appendChild(progressWrapper);

        async function renderImageElement(originalElement, index, total) {
            try {
                // Element klonen, um es gefahrlos manipulieren zu können
                const clonedElement = originalElement.cloneNode(true);
                clonedElement.style.backgroundColor = '#ffffff';
                clonedElement.style.padding = '0';

                // Interaktive Elemente im Klon ausblenden
                const elementsToHide = clonedElement.querySelectorAll('button, a, input, select, textarea, .no-print');
                elementsToHide.forEach(el => el.style.display = 'none');

                // Klon temporär zur Seite hinzufügen (aber nicht sichtbar)
                clonedElement.style.position = 'absolute';
                clonedElement.style.left = '-9999px';
                document.body.appendChild(clonedElement);

                // html2canvas auf dem Klon anwenden
                await new Promise(resolve => setTimeout(resolve, 100));
                const canvas = await html2canvas(clonedElement, {
                    scale: 3,
                    useCORS: true,
                    allowTaint: true,
                    letterRendering: true
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.75);
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                let scaledHeight = (imgHeight * usableWidth) / imgWidth;

                if (scaledHeight > maxPageHeight) {
                    const scaleFactor = maxPageHeight / scaledHeight;
                    const scaledWidth = usableWidth * scaleFactor;
                    scaledHeight = maxPageHeight;
                    pdf.addImage(imgData, 'JPEG',
                        margin + (usableWidth - scaledWidth) / 2,
                        margin,
                        scaledWidth,
                        scaledHeight,
                        undefined,
                        'SLOW'
                    );
                } else {
                    pdf.addImage(imgData, 'JPEG',
                        margin,
                        margin,
                        usableWidth,
                        scaledHeight,
                        undefined,
                        'SLOW'
                    );
                }

                // Fortschritt anzeigen
                const percent = Math.round(((index + 1) / total) * 100);
                progressBar.style.width = percent + '%';
                progressText.innerText = `${index + 1} von ${total} Bildern verarbeitet (${percent} %)`;

                // Klon entfernen
                document.body.removeChild(clonedElement);

            } catch (error) {
                console.error("Fehler beim Rendern des Bildes:", error);
            }
        }




        // Bilder sammeln
        const bilderZimmer = document.querySelector('.bilderzimmer');
        const largeImages = document.querySelectorAll('[id^="large-wrapper-img"]');
        const bilder = [];

        if (bilderZimmer) {
            bilder.push(...bilderZimmer.children);
        }
        if (largeImages.length > 0) {
            bilder.push(...largeImages);
        }

        for (let i = 0; i < bilder.length; i++) {
            if (i !== 0) pdf.addPage();
            await renderImageElement(bilder[i], i, bilder.length);
        }

        // Dateiname automatisch generieren
        const strasseInput = document.getElementById('strasseeinzug');
        const strasse = strasseInput ? strasseInput.value.trim() : 'Unbekannte_Straße';

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
        const isAbnahme = document.getElementById('abnahme')?.checked;
        const isUebergabe = document.getElementById('uebergabe')?.checked;

        if (isAbnahme && isUebergabe) {
            protokollTyp = 'Abnahme- und Übergabeprotokoll';
        } else if (isAbnahme) {
            protokollTyp = 'Abnahmeprotokoll';
        } else if (isUebergabe) {
            protokollTyp = 'Übergabeprotokoll';
        } else {
            protokollTyp = 'Protokoll';
        }

        const fileName = `${strasse}_Bilder_${protokollTyp}_${datumZeit}.pdf`.replace(/\s+/g, '_');

        pdf.save(fileName);


        // Fortschrittsanzeige entfernen
        document.body.removeChild(progressWrapper);
    });
});
