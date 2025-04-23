/* Copyright - Oliver Acker, acker_oliver@yahoo.de
save.js
Version 3.32_beta */


function getFormData() {
    const data = {};

    data['dupli_autoscale'] = [];
    document.querySelectorAll('input.dupli.autoscale[id]').forEach(input => {
        const key = input.id;
        data[key] = input.value;
    });

    data['signatureFullnames'] = {};
    document.querySelectorAll('[id^="einziehender-mieter-fullname-"], [id^="ausziehender-mieter-fullname-"]').forEach(span => {
        data['signatureFullnames'][span.id] = span.textContent.trim();
    });

    document.querySelectorAll('input').forEach(input => {
        const key = input.id || input.name;
        if (!key) return;

        if (input.type === 'radio' || input.type === 'checkbox') {
            data[key] = input.checked;
        } else {
            data[key] = input.value;
        }
    });

    document.querySelectorAll('select').forEach(select => {
        const key = select.id || select.name;
        if (!key) return;

        data[key] = select.value;
    });

    return data;
}

function exportCurrentSaveAsText() {
    const select = document.getElementById("loadSelect");
    const selectedName = select?.value;
    if (!selectedName) {
        alert("Bitte zuerst eine gespeicherte Version auswählen.");
        return;
    }

    const allSaves = JSON.parse(localStorage.getItem("saves")) || {};
    const currentData = allSaves[selectedName];

    if (!currentData) {
        alert("Keine Daten gefunden.");
        return;
    }

    const jsonText = JSON.stringify(currentData, null, 2);
    const blob = new Blob([jsonText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedName}_daten.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


const saveAsTextBtn = document.getElementById("saveasText");
if (saveAsTextBtn) {
    saveAsTextBtn.addEventListener("click", exportCurrentSaveAsText);
}



// Gespeicherte Daten wieder ins Formular einsetzen
function setFormData(data) {

    /*     data['remarks'] = [];
    document.querySelectorAll('.dupli-container input.dupli.autoscale').forEach(input => {
        data['remarks'].push(input.value);
    }); */

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el && el.classList.contains("dupli") && el.classList.contains("autoscale")) {
            el.value = data[key];
        }
    });

    if (data['signatureFullnames']) {
        Object.entries(data['signatureFullnames']).forEach(([id, value]) => {
            const span = document.getElementById(id);
            if (span) {
                span.textContent = value;
            }
        });
    }


    // Bemerkungen zurück in dynamische Felder einfügen
    if (Array.isArray(data['remarks'])) {
        // Vorherige Bemerkungen entfernen, bis auf eine (die Originalzeile)
        const originalRow = document.querySelector('tr.original-row');
        const dupliTable = originalRow?.parentElement;

        if (dupliTable) {
            // Alle außer Original löschen
            dupliTable.querySelectorAll('tr:not(.original-row)').forEach(row => row.remove());

            // Erste Zeile setzen
            const firstInput = originalRow.querySelector('input.dupli.autoscale');
            if (firstInput) firstInput.value = data['remarks'][0] || '';

            // Restliche dynamisch erzeugen
            for (let i = 1; i < data['remarks'].length; i++) {
                const newRow = originalRow.cloneNode(true);
                newRow.classList.remove('original-row');
                newRow.querySelector('input.dupli.autoscale').value = data['remarks'][i];

                dupliTable.appendChild(newRow);
            }
        }
    }


    Object.keys(data).forEach(key => {
        const el = document.getElementById(key) || document.querySelector(`[name="${key}"]`);

        if (el) {
            if (el.type === 'radio' || el.type === 'checkbox') {
                el.checked = data[key];
            } else {
                el.value = data[key];
            }
        }
    });
}

// Speichern unter einem Namen
function saveData() {
    const name = prompt("Bitte Namen für die Speicherung eingeben:");
    if (!name) return;

    const allSaves = JSON.parse(localStorage.getItem("saves")) || {};
    allSaves[name] = getFormData();
    localStorage.setItem("saves", JSON.stringify(allSaves));

    updateSaveList();

    // Nach dem Speichern auch den Namen als geladen anzeigen
    const nameDisplay = document.getElementById("currentSaveName");
    if (nameDisplay) {
        nameDisplay.textContent = `Aktuell geladene Version: ${name}`;
    }
}


// Liste gespeicherter Einträge aktualisieren
function updateSaveList() {
    const select = document.getElementById("loadSelect");
    if (!select) return;

    select.innerHTML = "";
    const allSaves = JSON.parse(localStorage.getItem("saves")) || {};
    Object.keys(allSaves).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}

// Gewählte Speicherung laden
function loadSelectedSave() {
    const select = document.getElementById("loadSelect");
    const selectedName = select.value;
    if (!selectedName) return;

    const allSaves = JSON.parse(localStorage.getItem("saves")) || {};
    if (allSaves[selectedName]) {
        setFormData(allSaves[selectedName]);

        // Name der aktuellen Version anzeigen
        const nameDisplay = document.getElementById("currentSaveName");
        if (nameDisplay) {
            nameDisplay.textContent = `Aktuell geladene Version: ${selectedName}`;
        }
    }
}

// Auswahl zwischen Einzel- und Komplettlöschung
function deleteSelectedSave() {
    const allSaves = JSON.parse(localStorage.getItem("saves")) || {};
    const select = document.getElementById("loadSelect");
    const selectedName = select.value;

    if (Object.keys(allSaves).length === 0) {
        alert("Keine gespeicherten Einträge vorhanden.");
        return;
    }

    const choice = prompt(
        "Was möchtest du löschen?\n\n1 - Aktuell gewählte Speicherung\n2 - Alle Speicherungen\n\nGib 1 oder 2 ein:"
    );

    if (choice === "1") {
        if (!selectedName) {
            alert("Bitte eine Speicherung auswählen.");
            return;
        }

        if (confirm(`"${selectedName}" wirklich löschen?`)) {
            delete allSaves[selectedName];
            localStorage.setItem("saves", JSON.stringify(allSaves));
            updateSaveList();
            
        }

    } else if (choice === "2") {
        if (confirm("Wirklich **alle** gespeicherten Versionen löschen?")) {
            localStorage.removeItem("saves");
            updateSaveList();
            alert("Alle Einträge wurden gelöscht.");
        }
    } else {
        alert("Ungültige Eingabe. Vorgang abgebrochen.");
    }
}

// Event-Listener zu Buttons
document.addEventListener("DOMContentLoaded", () => {
    updateSaveList();

    const saveBtn = document.getElementById("saveButton");
    if (saveBtn) saveBtn.addEventListener("click", saveData);

    const loadBtn = document.getElementById("loadButton");
    if (loadBtn) loadBtn.addEventListener("click", loadSelectedSave);

    const deleteBtn = document.getElementById("deleteButton");
    if (deleteBtn) deleteBtn.addEventListener("click", deleteSelectedSave);

    const exportPortableBtn = document.getElementById("exportPortableBtn");
    if (exportPortableBtn) exportPortableBtn.addEventListener("click", exportPortableSave);
});


function saveMieterDaten() {
    const mieterdaten = [];

    // Alle Nachnamen-Eingabefelder (sie enthalten die Basis-ID)
    const nachnamenFelder = document.querySelectorAll('input[id^="NameEin"]');

    nachnamenFelder.forEach((nachnameInput) => {
        const idSuffix = nachnameInput.id.replace("NameEin", ""); // z. B. "02"
        const vornameInput = document.getElementById(`VornameEin${idSuffix}`);

        // Passende Telefon und E-Mail Felder aus derselben Zeile holen
        const row = nachnameInput.closest('tr');
        const telefonInput = row.querySelector('.teleinziehmieter');
        const emailInput = row.querySelector('.maileinziehmieter');

        mieterdaten.push({
            nachname: nachnameInput.value.trim(),
            vorname: vornameInput ? vornameInput.value.trim() : "",
            telefon: telefonInput ? telefonInput.value.trim() : "",
            email: emailInput ? emailInput.value.trim() : ""
        });
    });

    // 🧪 Testweise in der Konsole anzeigen:
    console.log("Einziehende Mieter:", mieterdaten);

    // Optional: Abspeichern in localStorage
    localStorage.setItem("einziehendeMieter", JSON.stringify(mieterdaten));
}

function exportPortableSave() {
    const data = getFormData();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `Protokoll_${timestamp}.protokoll`;
    
    // Metadaten hinzufügen
    const portableData = {
        version: 1,
        created: new Date().toISOString(),
        browser: navigator.userAgent,
        data: data
    };

    const jsonText = JSON.stringify(portableData, null, 2);
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

function importPortableSave(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const portableData = JSON.parse(e.target.result);
            
            // Version prüfen
            if (!portableData.version || portableData.version > 1) {
                throw new Error("Nicht unterstütztes Dateiformat");
            }
            
            // Daten ins Formular laden
            setFormData(portableData.data);
            
            // Erfolgsmeldung
            alert("Protokoll erfolgreich importiert!");
            
        } catch (error) {
            console.error("Import fehlgeschlagen:", error);
            alert("Fehler beim Import: " + error.message);
        }
    };
    
    reader.onerror = function() {
        alert("Fehler beim Lesen der Datei");
    };
    
    reader.readAsText(file);
}

// Event-Handler für Datei-Upload
document.getElementById('importFileInput')?.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        importPortableSave(e.target.files[0]);
        e.target.value = ''; // Reset für erneuten Upload
    }
});

