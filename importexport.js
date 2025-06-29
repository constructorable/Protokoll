// importexport.js
console.log("Import/Export-Skript geladen");

document.addEventListener('DOMContentLoaded', () => {
    
    // Canvas-Funktionen für Import/Export
    function collectCanvasDataForExport() {
        console.log('📤 Export: Canvas-Daten werden gesammelt...');
        const canvasData = {};
        const canvasElements = document.querySelectorAll('canvas[id*="signature-canvas"]');
        
        console.log(`📤 Export: ${canvasElements.length} Canvas-Elemente gefunden`);
        
        canvasElements.forEach(canvas => {
            if (canvas.id) {
                try {
                    const dataURL = canvas.toDataURL('image/png');
                    if (!isCanvasEmpty(canvas)) {
                        canvasData[canvas.id] = dataURL;
                        console.log(`✅ Canvas ${canvas.id} exportiert (hat Inhalt)`);
                    } else {
                        console.log(`⚪ Canvas ${canvas.id} ist leer`);
                    }
                } catch (error) {
                    console.error(`❌ Fehler beim Exportieren von Canvas ${canvas.id}:`, error);
                }
            }
        });
        
        console.log(`📤 Export: ${Object.keys(canvasData).length} Canvas mit Signaturen exportiert`);
        return canvasData;
    }

    function isCanvasEmpty(canvas) {
        const context = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0);
    }

    function restoreCanvasDataFromImport(canvasData) {
        console.log('📥 Import: Canvas-Daten werden wiederhergestellt...');
        
        if (!canvasData || Object.keys(canvasData).length === 0) {
            console.log('📥 Import: Keine Canvas-Daten zum Importieren gefunden');
            return 0;
        }

        let restoredCount = 0;
        
        for (const [canvasId, dataURL] of Object.entries(canvasData)) {
            const canvas = document.getElementById(canvasId);
            if (canvas) {
                const context = canvas.getContext('2d');
                const image = new Image();
                
                image.onload = function() {
                    // Canvas leeren
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    // Bild wiederherstellen
                    context.drawImage(image, 0, 0);
                    console.log(`✅ Canvas ${canvasId} erfolgreich importiert`);
                };
                
                image.onerror = function() {
                    console.error(`❌ Fehler beim Laden der Signatur für Canvas ${canvasId}`);
                };
                
                image.src = dataURL;
                restoredCount++;
            } else {
                console.warn(`⚠️ Canvas ${canvasId} nicht gefunden im DOM`);
            }
        }
        
        console.log(`📥 Import: ${restoredCount} Canvas-Signaturen wiederhergestellt`);
        return restoredCount;
    }

    // Feedback-System
    const feedback = createFeedbackElement();
    const showFeedback = (message, isSuccess) => {
        // Message Content (erstes Child ist der close button)
        if (feedback.childNodes.length > 1) {
            feedback.childNodes[1].textContent = message;
        } else {
            const msg = document.createElement('div');
            msg.textContent = message;
            msg.style.padding = '58px 60px 60px 56px';
            msg.style.fontSize = '1.5rem';
            feedback.appendChild(msg);
        }

        feedback.style.backgroundColor = isSuccess ? '#466c9c' : '#F44336';

        // Stile für zentrierte Positionierung
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.zIndex = '1000';
        feedback.style.borderRadius = '5px';
        feedback.style.color = 'rgb(255, 255, 255)';
        feedback.style.textAlign = 'center';
        feedback.style.boxShadow = '0 0 34px 1555px rgba(0,0,0,0.2)';
        feedback.style.maxWidth = '90%';
        feedback.style.minWidth = '500px';
        feedback.style.width = 'auto';

        // Animationseinstellungen
        feedback.style.display = 'flex';
        feedback.style.alignItems = 'center';
        feedback.style.justifyContent = 'center';
        feedback.style.opacity = '1';

        // Automatisches Ausblenden nach 5 Sekunden
        const timeoutId = setTimeout(() => {
            hideFeedback(feedback);
        }, 115000);

        // Timeout bei manuellem Schließen löschen
        feedback.closeBtn = feedback.querySelector('span');
        feedback.closeBtn.timeoutId = timeoutId;
        feedback.closeBtn.addEventListener('click', () => {
            clearTimeout(timeoutId);
        });
    };

    // Dateiname-Modal erstellen
    const createFilenameModal = () => {
        const modal = document.createElement('div');
        modal.id = 'filenameModal';
        modal.innerHTML = `
            <div class="filename-modal-overlay">
                <div class="filename-modal-content">
                    <div class="filename-modal-header">
                        <h3>Export-Datei speichern</h3>
                        <button class="filename-modal-close-btn" type="button">&times;</button>
                    </div>
                    <div class="filename-modal-body">
                        <label for="filenameInput">Dateiname:</label>
                        <input type="text" id="filenameInput" class="filename-input" placeholder="Dateiname eingeben">
                        <small class="filename-hint">Die Endung .json wird automatisch hinzugefügt</small>
                    </div>
                    <div class="filename-modal-footer">
                        <button class="btn-secondary" id="cancelExport">Abbrechen</button>
                        <button class="btn-primary" id="confirmExport">Speichern</button>
                    </div>
                </div>
            </div>
        `;

        // Modal-Styles hinzufügen
        const style = document.createElement('style');
        style.textContent = `
            .filename-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .filename-modal-content {
                background: #ffffff;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                animation: filenameModalFadeIn 0.3s ease-out;
            }
            
            @keyframes filenameModalFadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            .filename-modal-header {
                padding: 24px 24px 16px 24px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .filename-modal-header h3 {
                margin: 0;
                color: #333;
                font-size: 1.3em;
                font-weight: 600;
            }
            
            .filename-modal-body {
                padding: 24px;
            }
            
            .filename-modal-body label {
                display: block;
                margin-bottom: 8px;
                color: #555;
                font-weight: 500;
            }
            
            .filename-input {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
                box-sizing: border-box;
                transition: border-color 0.2s;
            }
            
            .filename-input:focus {
                outline: none;
                border-color: #2196F3;
            }
            
            .filename-hint {
                display: block;
                margin-top: 8px;
                color: #888;
                font-size: 0.9em;
            }
            
            .filename-modal-footer {
                padding: 16px 24px 24px 24px;
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
            
            .btn-primary, .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                transition: all 0.2s ease;
                min-width: 100px;
            }
            
            .btn-primary {
                background:rgb(77, 122, 159);
                color: white;
            }
            
            .btn-primary:hover {
                background: #1976D2;
            }
            
            .btn-secondary {
                background: #757575;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #616161;
            }
            
            .filename-modal-close-btn {
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #999;
                padding: 4px;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .filename-modal-close-btn:hover {
                color: #333;
                background: #f5f5f5;
            }
            
            @media (max-width: 500px) {
                .filename-modal-content {
                    margin: 10px;
                    max-width: none;
                }
                
                .filename-modal-header,
                .filename-modal-body,
                .filename-modal-footer {
                    padding: 16px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        return modal;
    };

    // Modal anzeigen
    const showFilenameModal = (defaultFilename, onConfirm, onCancel) => {
        const modal = createFilenameModal();
        const input = modal.querySelector('#filenameInput');
        const confirmBtn = modal.querySelector('#confirmExport');
        const cancelBtn = modal.querySelector('#cancelExport');
        const closeBtn = modal.querySelector('.filename-modal-close-btn');
        const overlay = modal.querySelector('.filename-modal-overlay');

        // Dateiname ohne .json-Endung setzen
        const nameWithoutExtension = defaultFilename.replace(/\.json$/, '');
        input.value = nameWithoutExtension;
        input.select();

        // Event Handlers
        const handleConfirm = () => {
            const filename = input.value.trim();
            if (!filename) {
                input.focus();
                return;
            }
            
            // .json-Endung hinzufügen falls nicht vorhanden
            const finalFilename = filename.endsWith('.json') ? filename : filename + '.json';
            closeModal();
            onConfirm(finalFilename);
        };

        const handleCancel = () => {
            closeModal();
            if (onCancel) onCancel();
        };

        const closeModal = () => {
            modal.remove();
        };

        // Events binden
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        closeBtn.addEventListener('click', handleCancel);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) handleCancel();
        });

        // Enter-Taste für Bestätigung
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });

        // Modal anzeigen und Input fokussieren
        modal.style.display = 'block';
        setTimeout(() => input.focus(), 100);
    };

    // Export-Funktion (erweitert für Canvas)
    document.getElementById('export').addEventListener('click', () => {
        console.log('📤 Export gestartet...');
        
        try {
            const formData = {};
            let hasData = false;

            // Alle relevanten Elemente sammeln
            document.querySelectorAll('input, select, textarea').forEach(element => {
                if (element.type === 'button' || element.type === 'submit') return;

                const identifier = element.name || element.id;
                if (!identifier) return;

                if (element.type === 'checkbox' || element.type === 'radio') {
                    formData[identifier] = element.checked;
                    if (element.checked) hasData = true;
                } else {
                    formData[identifier] = element.value;
                    if (element.value) hasData = true;
                }
            });

            // Spezielle Behandlung für Toggle-Optionen
            document.querySelectorAll('.room-toggle .toggle-option').forEach(option => {
                const room = option.closest('.room-toggle').dataset.room;
                const identifier = `room_${room}_toggle`;
                if (option.classList.contains('active')) {
                    formData[identifier] = option.dataset.value;
                    hasData = true;
                }
            });

            // Canvas-Daten sammeln
            const canvasData = collectCanvasDataForExport();
            if (Object.keys(canvasData).length > 0) {
                hasData = true;
            }

            if (!hasData) {
                showFeedback("Keine Daten zum Export gefunden", false);
                return;
            }

            // Standard-Dateinamen generieren
            const straßenname = document.getElementById('strasseeinzug').value || 'UnbekannteStrasse';
            const now = new Date();
            const datumZeit = now.toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_')
                .slice(0, 19);

            // Sonderzeichen aus Straßennamen entfernen
            const cleanStraßenname = straßenname
                .replace(/[^a-zA-Z0-9äöüÄÖÜß\- ]/g, '')
                .trim()
                .replace(/\s+/g, '_');

            const defaultFilename = `Export_${cleanStraßenname}_${datumZeit}.json`;

            // Modal anzeigen für Dateiname-Eingabe
            showFilenameModal(
                defaultFilename,
                (finalFilename) => {
                    // Export-Datenstruktur erstellen
                    const exportData = {
                        formData: formData,
                        canvasData: canvasData,
                        exportMetadata: {
                            timestamp: new Date().toISOString(),
                            version: '1.0',
                            canvasCount: Object.keys(canvasData).length,
                            formFieldCount: Object.keys(formData).length
                        }
                    };

                    // Export durchführen
                    const dataStr = JSON.stringify(exportData, null, 2);
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = finalFilename;
                    link.click();

                    console.log('📤 Export erfolgreich abgeschlossen:');
                    console.log(`📁 Dateiname: ${finalFilename}`);
                    console.log(`📊 Formularfelder: ${Object.keys(formData).length}`);
                    console.log(`🖼️ Canvas-Signaturen: ${Object.keys(canvasData).length}`);

                    const signatureInfo = Object.keys(canvasData).length > 0 ? ` (inkl. ${Object.keys(canvasData).length} Signaturen)` : '';
                    showFeedback(`Export erfolgreich auf dem Gerät abgespeichert${signatureInfo}`, true);
                    setTimeout(() => URL.revokeObjectURL(url), 100);
                },
                () => {
                    showFeedback("Export abgebrochen", false);
                }
            );

        } catch (error) {
            console.error("📤 Export-Fehler:", error);
            showFeedback("Fehler beim Export: " + error.message, false);
        }
    });

    // Import-Funktion (erweitert für Canvas)
    document.getElementById('import').addEventListener('click', () => {
        console.log('📥 Import gestartet...');
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    console.log('📥 Import-Daten erhalten:', importData);

                    let importedCount = 0;
                    let canvasCount = 0;

                    // Prüfen ob es neue Datenstruktur ist (mit Canvas) oder alte
                    let formDataToImport = importData;
                    let canvasDataToImport = {};

                    if (importData.formData && typeof importData.formData === 'object') {
                        // Neue Datenstruktur mit Canvas
                        formDataToImport = importData.formData;
                        canvasDataToImport = importData.canvasData || {};
                        
                        console.log('📥 Neue Datenstruktur erkannt (mit Canvas-Support)');
                        if (importData.exportMetadata) {
                            console.log('📊 Export-Info:', importData.exportMetadata);
                        }
                    } else {
                        // Alte Datenstruktur (nur Formulardaten)
                        console.log('📥 Alte Datenstruktur erkannt (nur Formulardaten)');
                    }

                    // Standard-Elemente importieren
                    document.querySelectorAll('input, select, textarea').forEach(element => {
                        const identifier = element.name || element.id;
                        if (!identifier || !formDataToImport.hasOwnProperty(identifier)) return;

                        if (element.type === 'checkbox' || element.type === 'radio') {
                            element.checked = formDataToImport[identifier];
                        } else {
                            element.value = formDataToImport[identifier];
                        }
                        importedCount++;
                        element.dispatchEvent(new Event('change'));
                    });

                    // Toggle-Optionen importieren
                    document.querySelectorAll('.room-toggle').forEach(toggle => {
                        const room = toggle.dataset.room;
                        const identifier = `room_${room}_toggle`;
                        if (formDataToImport[identifier]) {
                            const options = toggle.querySelectorAll('.toggle-option');
                            options.forEach(opt => {
                                opt.classList.toggle('active', opt.dataset.value === formDataToImport[identifier]);
                            });
                            importedCount++;
                        }
                    });

                    // Canvas-Daten importieren
                    if (Object.keys(canvasDataToImport).length > 0) {
                        canvasCount = restoreCanvasDataFromImport(canvasDataToImport);
                    }

                    console.log('📥 Import abgeschlossen:');
                   /*  console.log(`📊 Formularfelder importiert: ${importedCount}`); */
                   /*  console.log(`🖼️ Canvas-Signaturen importiert: ${canvasCount}`); */

                    const statusMessage = canvasCount > 0 
                        ? `${importedCount} Felder erfolgreich importiert`
                        : `${importedCount} Felder erfolgreich importiert`;

                    showFeedback(statusMessage, true);

                } catch (error) {
                    console.error("📥 Import-Fehler:", error);
                    showFeedback("Ungültige Datei: " + error.message, false);
                }
            };
            reader.readAsText(file);
        });
        fileInput.click();
    });

    function createFeedbackElement() {
        const feedback = document.createElement('div');
        feedback.style.display = 'none';
        feedback.style.transition = 'opacity 0.5s ease';
        feedback.style.opacity = '0';

        // Close Button erstellen
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '5px';
        closeBtn.style.right = '10px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '2rem';
        closeBtn.addEventListener('click', () => {
            hideFeedback(feedback);
        });

        feedback.appendChild(closeBtn);
        document.body.appendChild(feedback);
        return feedback;
    }

    function hideFeedback(element) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 500);
    }
});