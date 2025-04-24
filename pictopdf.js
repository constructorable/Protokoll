document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pictopdfButton').addEventListener('click', async function () {
        // Qualitätsauswahl Dialog erstellen
        const qualityDialog = document.createElement('div');
        qualityDialog.style.position = 'fixed';
        qualityDialog.style.top = '50%';
        qualityDialog.style.left = '50%';
        qualityDialog.style.transform = 'translate(-50%, -50%)';
        qualityDialog.style.backgroundColor = '#fff';
        qualityDialog.style.border = '1px solid #ccc';
        qualityDialog.style.padding = '20px';
        qualityDialog.style.zIndex = '10000';
        qualityDialog.style.width = '400px';
        qualityDialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        qualityDialog.style.textAlign = 'center';

        const titleText = document.createElement('div');
        titleText.innerText = 'PDF Qualität wählen';
        titleText.style.fontSize = '20px';
        titleText.style.fontWeight = 'bold';
        titleText.style.marginBottom = '20px';
        titleText.style.fontFamily = 'sans-serif';
        qualityDialog.appendChild(titleText);

        // Qualitätsoptionen
        const qualityOptions = [
            { value: 'low', label: 'Geringe Qualität (kleinere Dateigröße)', jpegQuality: 0.5, scale: 1.5 },
            { value: 'medium', label: 'Mittlere Qualität (empfohlen)', jpegQuality: 0.6, scale: 2 },
            { value: 'high', label: 'Hohe Qualität (größere Dateigröße)', jpegQuality: 0.7, scale: 3 }
        ];

        let selectedQuality = qualityOptions[1]; // Standard: mittlere Qualität

        // Container für Radio-Buttons
        const radioContainer = document.createElement('div');
        radioContainer.style.margin = '20px 0';
        
        qualityOptions.forEach(option => {
            const optionContainer = document.createElement('div');
            optionContainer.style.margin = '10px 0';
            optionContainer.style.display = 'flex';
            optionContainer.style.alignItems = 'center';
            optionContainer.style.cursor = 'pointer';

            // Unsichtbarer echter Radio-Button (für Funktionalität)
            const realRadio = document.createElement('input');
            realRadio.type = 'radio';
            realRadio.name = 'pdfQuality';
            realRadio.id = `quality-real-${option.value}`;
            realRadio.value = option.value;
            realRadio.style.position = 'absolute';
            realRadio.style.opacity = '0';
            realRadio.style.width = '0';
            realRadio.style.height = '0';
            if (option.value === 'medium') realRadio.checked = true;

            // Visuelle Repräsentation des Radio-Buttons
            const customRadio = document.createElement('span');
            customRadio.style.display = 'inline-block';
            customRadio.style.width = '20px';
            customRadio.style.height = '20px';
            customRadio.style.borderRadius = '50%';
            customRadio.style.border = '2px solid #4caf50';
            customRadio.style.marginRight = '10px';
            customRadio.style.position = 'relative';
            customRadio.style.flexShrink = '0';
            
            // Innerer Punkt für ausgewählten Zustand
            const radioDot = document.createElement('span');
            radioDot.style.position = 'absolute';
            radioDot.style.top = '50%';
            radioDot.style.left = '50%';
            radioDot.style.transform = 'translate(-50%, -50%)';
            radioDot.style.width = '12px';
            radioDot.style.height = '12px';
            radioDot.style.borderRadius = '50%';
            radioDot.style.backgroundColor = realRadio.checked ? '#4caf50' : 'transparent';
            
            customRadio.appendChild(radioDot);

            const label = document.createElement('label');
            label.htmlFor = `quality-real-${option.value}`;
            label.innerText = option.label;
            label.style.fontFamily = 'sans-serif';
            label.style.flex = '1';
            label.style.cursor = 'pointer';

            // Event-Handler für die visuelle Darstellung
            const updateRadioVisual = () => {
                if (realRadio.checked) {
                    radioDot.style.backgroundColor = '#4caf50';
                    selectedQuality = option;
                } else {
                    radioDot.style.backgroundColor = 'transparent';
                }
            };

            realRadio.addEventListener('change', updateRadioVisual);
            
            // Klick auf Container soll Radio-Button auswählen
            optionContainer.addEventListener('click', () => {
                realRadio.checked = true;
                updateRadioVisual();
                // Andere Radio-Buttons aktualisieren
                document.querySelectorAll(`input[name="pdfQuality"]`).forEach(r => {
                    if (r !== realRadio) {
                        r.checked = false;
                        r.dispatchEvent(new Event('change'));
                    }
                });
            });

            optionContainer.appendChild(realRadio);
            optionContainer.appendChild(customRadio);
            optionContainer.appendChild(label);
            radioContainer.appendChild(optionContainer);
        });

        qualityDialog.appendChild(radioContainer);

        // Buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Abbrechen';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.addEventListener('click', function() {
            document.body.removeChild(qualityDialog);
        });

        const confirmButton = document.createElement('button');
        confirmButton.innerText = 'PDF erstellen';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = '#4caf50';
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '4px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.addEventListener('click', function() {
            document.body.removeChild(qualityDialog);
            createPDF(selectedQuality);
        });

        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(confirmButton);
        qualityDialog.appendChild(buttonContainer);

        document.body.appendChild(qualityDialog);
    });

    async function createPDF(qualitySettings) {
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
                    scale: qualitySettings.scale,
                    useCORS: true,
                    allowTaint: true,
                    letterRendering: true
                });

                const imgData = canvas.toDataURL('image/jpeg', qualitySettings.jpegQuality);
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
    }
});
