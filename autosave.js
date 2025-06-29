document.addEventListener('DOMContentLoaded', function () {
    
    let autosaveInterval;
    let autosaveCounter = 0;

    console.log('🔄 Autosave: Modul wird initialisiert...');

    // Canvas-Daten sammeln
    function collectCanvasDataForAutosave() {
        console.log('🖼️ Autosave: Canvas-Daten werden gesammelt...');
        const canvasData = {};
        const canvasElements = document.querySelectorAll('canvas[id*="signature-canvas"]');
        
        console.log(`🖼️ Autosave: ${canvasElements.length} Canvas-Elemente gefunden`);
        
        canvasElements.forEach((canvas, index) => {
            if (canvas.id) {
                try {
                    const dataURL = canvas.toDataURL('image/png');
                    if (!isCanvasEmptyForAutosave(canvas)) {
                        canvasData[canvas.id] = dataURL;
                        console.log(`✅ Canvas ${canvas.id} hat Inhalt und wurde erfasst`);
                    } else {
                        console.log(`⚪ Canvas ${canvas.id} ist leer`);
                    }
                } catch (error) {
                    console.error(`❌ Fehler beim Speichern von Canvas ${canvas.id}:`, error);
                }
            } else {
                console.log(`⚠️ Canvas ${index} hat keine ID`);
            }
        });
        
        console.log(`🖼️ Autosave: Canvas-Sammlung abgeschlossen. ${Object.keys(canvasData).length} Canvas mit Inhalt`);
        return canvasData;
    }

    // Prüfen ob Canvas leer ist
    function isCanvasEmptyForAutosave(canvas) {
        const context = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0);
    }

    // Aktuellen Formularstatus sammeln
    function getCurrentFormState() {
        console.log('📋 Autosave: Formularstatus wird gesammelt...');
        const formData = {};
        let hasData = false;
        let inputCount = 0;
        let filledInputCount = 0;

        // Alle Formularelemente durchgehen
        document.querySelectorAll('input, select, textarea').forEach(element => {
            inputCount++;
            if (element.id) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    formData[element.id] = element.checked;
                    if (element.checked) {
                        hasData = true;
                        filledInputCount++;
                        console.log(`✅ ${element.type} ${element.id}: ${element.checked}`);
                    }
                } else if (element.type === 'select-one') {
                    formData[element.id] = element.value;
                    if (element.value) {
                        hasData = true;
                        filledInputCount++;
                        console.log(`✅ Select ${element.id}: "${element.value}"`);
                    }
                } else {
                    formData[element.id] = element.value;
                    if (element.value && element.value.trim() !== '') {
                        hasData = true;
                        filledInputCount++;
                        console.log(`✅ Input ${element.id}: "${element.value.substring(0, 20)}${element.value.length > 20 ? '...' : ''}"`);
                    }
                }
            }
        });

        console.log(`📋 Autosave: ${inputCount} Formularelemente gefunden, ${filledInputCount} mit Inhalt`);

        // Radio-Gruppen sammeln
        const radioGroups = {};
        let radioGroupCount = 0;
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            if (!radioGroups[radio.name]) {
                const checkedRadio = document.querySelector(`input[name="${radio.name}"]:checked`);
                radioGroups[radio.name] = checkedRadio ? checkedRadio.value : '';
                if (checkedRadio) {
                    hasData = true;
                    radioGroupCount++;
                    console.log(`📻 Radio-Gruppe ${radio.name}: "${checkedRadio.value}"`);
                }
            }
        });
        formData.radioGroups = radioGroups;

        console.log(`📻 Autosave: ${Object.keys(radioGroups).length} Radio-Gruppen gefunden, ${radioGroupCount} ausgewählt`);

        // Room-Toggle Status sammeln
        let roomToggleCount = 0;
        document.querySelectorAll('.room-toggle .toggle-option').forEach(option => {
            const room = option.closest('.room-toggle')?.dataset.room;
            if (room && option.classList.contains('active')) {
                const identifier = `room_${room}_toggle`;
                formData[identifier] = option.dataset.value;
                hasData = true;
                roomToggleCount++;
                console.log(`🏠 Room-Toggle ${room}: "${option.dataset.value}"`);
            }
        });

        console.log(`🏠 Autosave: ${roomToggleCount} Room-Toggles aktiv`);

        // Canvas-Daten sammeln
        const canvasData = collectCanvasDataForAutosave();
        if (Object.keys(canvasData).length > 0) {
            hasData = true;
        }

        const result = {
            formData,
            canvasData,
            hasData,
            timestamp: new Date().toISOString()
        };

        console.log(`📋 Autosave: Formularstatus-Sammlung abgeschlossen. hasData: ${hasData}`);
        return result;
    }

    // Autosave-Namen generieren
    function generateAutosaveName() {
        try {
            const strasse = document.getElementById('strasseeinzug')?.value.trim() || 'Protokoll';
            const now = new Date();
            const dateStr = now.toLocaleDateString('de-DE').replace(/\./g, '-');
            const timeStr = now.toLocaleTimeString('de-DE', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            }).replace(/:/g, '-');

            autosaveCounter++;
            const name = `AutoSave_${strasse}_${dateStr}_${timeStr}_${autosaveCounter}`.replace(/[/\\?%*:|"<>]/g, '_');
            console.log(`📝 Autosave: Generierter Name: ${name}`);
            return name;
        } catch (e) {
            console.error('❌ Autosave: Fehler bei der Namensgenerierung:', e);
            autosaveCounter++;
            return `AutoSave_${Date.now()}_${autosaveCounter}`;
        }
    }

    // Alle gespeicherten Daten abrufen
    function getAllSavesForAutosave() {
        try {
            const saves = localStorage.getItem('formSaves');
            const result = saves ? JSON.parse(saves) : {};
            console.log(`💾 Autosave: ${Object.keys(result).length} gespeicherte Zustände im localStorage gefunden`);
            return result;
        } catch (e) {
            console.error('❌ Autosave: Fehler beim Zugriff auf localStorage:', e);
            return {};
        }
    }

    // Autosave durchführen - WIRD IMMER AUSGEFÜHRT
    function performAutosave() {
        console.log('');
        console.log('🔄 ========== AUTOSAVE DURCHGANG GESTARTET ==========');
        console.log('🕐 Zeitpunkt:', new Date().toLocaleTimeString());
        
        try {
            const currentState = getCurrentFormState();
            
            console.log(`📊 Daten vorhanden: ${currentState.hasData}`);
            
            // IMMER SPEICHERN - egal ob Daten vorhanden sind oder nicht
            console.log('💾 SPEICHERUNG WIRD DURCHGEFÜHRT...');
            
            const saveName = generateAutosaveName();
            const allSaves = getAllSavesForAutosave();

            const saveData = {
                data: currentState.formData,
                canvasData: currentState.canvasData,
                timestamp: new Date().toISOString(),
                isAutosave: true
            };

            allSaves[saveName] = saveData;
            
            console.log('💾 Speichere in localStorage...');
            localStorage.setItem('formSaves', JSON.stringify(allSaves));
            console.log('✅ In localStorage gespeichert');
            
            console.log('🎉 ✅ AUTOSAVE ERFOLGREICH GESPEICHERT! ✅');
            console.log(`📁 Name: ${saveName}`);
            console.log(`📊 Formulardaten: ${Object.keys(currentState.formData).length} Felder`);
            console.log(`🖼️ Canvas-Daten: ${Object.keys(currentState.canvasData).length} Canvas`);
            console.log(`🕐 Timestamp: ${saveData.timestamp}`);
            console.log(`📈 Autosave-Counter: ${autosaveCounter}`);
            console.log(`📦 Gesamt gespeicherte Zustände: ${Object.keys(allSaves).length}`);

        } catch (error) {
            console.error('❌ FEHLER beim automatischen Speichern:', error);
            console.error('❌ Stack Trace:', error.stack);
        }
        
        console.log('🔄 ========== AUTOSAVE DURCHGANG BEENDET ==========');
        console.log('');
    }

    // Autosave starten - NIEMALS STOPPEN
    function startAutosave() {
        console.log('🚀 Autosave: Startvorbereitung...');
        
        if (autosaveInterval) {
            console.log('⏹️ Vorheriges Interval wird gestoppt');
            clearInterval(autosaveInterval);
        }
        
        // Erstes Autosave sofort ausführen
        console.log('🎬 ERSTES AUTOSAVE WIRD JETZT AUSGEFÜHRT');
        performAutosave();
        
        // Alle 10 Sekunden Autosave - NIEMALS STOPPEN
        console.log('⏰ Interval wird auf 5 Sekunden gesetzt...');
        autosaveInterval = setInterval(() => {
            console.log('⏰ 5-Sekunden-Interval ausgelöst');
            performAutosave();
        }, 300000);
        
        console.log('🔄 Autosave: Automatisches Speichern alle 5 Sekunden gestartet (NIEMALS STOPPEN)');
        console.log('✅ Autosave-Start abgeschlossen');
    }

    // Status abfragen
    function getAutosaveStatus() {
        const status = {
            intervalId: autosaveInterval,
            counter: autosaveCounter,
            isRunning: !!autosaveInterval,
            nextSaveIn: '5 Sekunden'
        };
        console.log('📊 Autosave Status:', status);
        return status;
    }

    // Manuelles Autosave
    function performManualAutosave() {
        console.log('🔧 Manuelles Autosave angefordert');
        performAutosave();
    }

    // Alle Autosaves anzeigen
    function showAllAutosaves() {
        try {
            const allSaves = getAllSavesForAutosave();
            const autosaves = Object.entries(allSaves).filter(([name, data]) => data && data.isAutosave);
            
            console.log('📋 ========== ALLE AUTOSAVES ==========');
            console.log(`📊 Gesamt: ${autosaves.length} Autosaves`);
            
            autosaves.forEach(([name, data], index) => {
                console.log(`${index + 1}. ${name} - ${new Date(data.timestamp).toLocaleString()}`);
            });
            
            console.log('📋 ===================================');
            return autosaves;
        } catch (error) {
            console.error('❌ Fehler beim Anzeigen der Autosaves:', error);
            return [];
        }
    }

    // Globale Funktionen verfügbar machen
    window.autosaveModule = {
        status: getAutosaveStatus,
        performNow: performManualAutosave,
        showAll: showAllAutosaves
    };

    // Autosave automatisch beim Laden der Seite starten - NIEMALS STOPPEN
    console.log('🚀 Autosave wird automatisch gestartet und läuft NIEMALS STOPPEN...');
    startAutosave();

    console.log('📁 Autosave-Modul vollständig geladen');
    console.log('🔧 Verfügbare Funktionen: window.autosaveModule');
    console.log('🔧 Status mit: window.autosaveModule.status()');
    console.log('🔧 Manuell ausführen: window.autosaveModule.performNow()');
    console.log('🔧 Alle anzeigen: window.autosaveModule.showAll()');
});