

/* CSS Styles zum toggeln... */
/* CSS Styles zum toggeln... */
/* CSS Styles zum toggeln... */
document.addEventListener("DOMContentLoaded", function () {
    // Event Listener für den Button hinzufügen
    document.getElementById('toggleModeButton').addEventListener('click', toggleMode);
});
function toggleMode() {
    var link = document.getElementById("theme-style");
    var currentHref = link.getAttribute("href");

    if (currentHref === "styles.css") {
        link.setAttribute("href", "stylesprint.css"); // Heller Modus
    } else if (currentHref === "stylesprint.css") {
        link.setAttribute("href", "stylestablet.css"); // Tablet-Modus
    } else {
        link.setAttribute("href", "styles.css"); // Dunkler Modus
    }
}



/* Schriftgrößenänderung */
/* Schriftgrößenänderung */
/* Schriftgrößenänderung */
document.addEventListener("input", function (event) {
    const input = event.target;

    // Nur für Elemente mit der Klasse "autoscale"
    if (!input.classList.contains("autoscale")) return;

    // Falls noch nicht gespeichert, merke dir die ursprüngliche Schriftgröße und Höhe
    if (!input.dataset.originalFontSize) {
        const computedStyle = window.getComputedStyle(input);
        input.dataset.originalFontSize = parseFloat(computedStyle.fontSize);
        input.dataset.originalHeight = computedStyle.height;
    }

    const originalFontSize = parseFloat(input.dataset.originalFontSize);
    const originalHeight = input.dataset.originalHeight;

    // Verfügbarer Platz im Inputfeld berechnen
    const computedStyle = window.getComputedStyle(input);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const availableWidth = input.clientWidth - paddingLeft - paddingRight;

    // Canvas zur Messung der Textbreite
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Setze die ursprüngliche Schriftgröße
    ctx.font = `${computedStyle.fontWeight} ${originalFontSize}px ${computedStyle.fontFamily}`;

    const text = input.value || "";
    const textWidth = ctx.measureText(text).width;

    // Frühzeitige Skalierung (reduziere Schriftgröße bereits 10% früher)
    const shrinkThreshold = availableWidth * 0.9;

    let newFontSize = originalFontSize;
    if (textWidth > shrinkThreshold) {
        newFontSize = originalFontSize * (shrinkThreshold / textWidth);
    }

    // Mindestschriftgröße festlegen
    newFontSize = Math.max(newFontSize, 10);

    // Setze neue Schriftgröße, aber halte die Höhe konstant
    input.style.fontSize = newFontSize + "px";
    input.style.height = originalHeight; // Sicherstellen, dass die Höhe immer gleich bleibt
});







/* Textinhalt und Farben von Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc. nicht vorkommen */
/* Textinhalt und Farben von Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc. nicht vorkommen */
/* Textinhalt und Farben von Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc. nicht vorkommen */
document.addEventListener("DOMContentLoaded", function () {
    // Allgemeine Funktion zur Überprüfung und Aktualisierung von Überschriften
    function checkAndUpdateHeading(tableId, headingText, notGivenText) {
        let table = document.getElementById(tableId);

        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (table) {
                // Wenn die Tabelle existiert, setze die Überschrift auf den Standardtext
                if (text === notGivenText) {
                    h3.textContent = headingText;
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                // Wenn die Tabelle nicht existiert, setze die Überschrift auf "nicht angegeben"
                if (text === headingText) {
                    h3.textContent = notGivenText;
                    h3.style.color = "yellow";
                    h3.style.borderBottom = "1px solid black";
                    h3.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Funktion zur Überprüfung der einziehenden Mieter
    function checkAndUpdateEinziehenderMieter() {
        let found = false;

        // Prüfe, ob ein Element mit der ID, die "NameEin" enthält, vorhanden ist
        for (let i = 1; i <= 99; i++) {
            let element = document.getElementById("NameEin" + String(i).padStart(2, "0"));
            if (element) {
                found = true;
                break;
            }
        }

        // Passe die Überschrift basierend auf dem Vorhandensein der Tabelle an
        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (found) {
                if (text === "einziehender Mieter (nicht zutreffend)") {
                    h3.textContent = "einziehender Mieter";
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                if (text === "einziehender Mieter") {
                    h3.textContent = "einziehender Mieter (nicht zutreffend)";
                    h3.style.color = "blue";
                    h3.style.borderBottom = "1px solid black";
                    h3.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Initiale Prüfung beim Laden der Seite
    checkAndUpdateHeading("schluesselTable", "Schlüssel", "Schlüssel (nicht angegeben)");
    checkAndUpdateHeading("auszugmieterTable", "ausziehender Mieter", "ausziehender Mieter (nicht zutreffend)");
    checkAndUpdateHeading("zaehlerTable", "Zähler", "Zähler (nicht angegeben)");
    checkAndUpdateEinziehenderMieter();

    // Event Listener für Buttons
    document.getElementById('addKeyButton').addEventListener('click', function () {
        setTimeout(function () {
            checkAndUpdateHeading("schluesselTable", "Schlüssel", "Schlüssel (nicht angegeben)");
            checkAndUpdateHeading("auszugmieterTable", "ausziehender Mieter", "ausziehender Mieter (nicht zutreffend)");
            checkAndUpdateEinziehenderMieter();
        }, 100);
    });

    document.getElementById('addausziehenderMieter').addEventListener('click', function () {
        setTimeout(function () {
            checkAndUpdateHeading("auszugmieterTable", "ausziehender Mieter", "ausziehender Mieter (nicht zutreffend)");
            checkAndUpdateEinziehenderMieter();
            checkAndUpdateHeading("schluesselTable", "Schlüssel", "Schlüssel (nicht angegeben)");
        }, 100);
    });

    document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
        setTimeout(function () {
            checkAndUpdateHeading("auszugmieterTable", "ausziehender Mieter", "ausziehender Mieter (nicht zutreffend)");
            checkAndUpdateEinziehenderMieter();
            checkAndUpdateHeading("schluesselTable", "Schlüssel", "Schlüssel (nicht angegeben)");
        }, 100);
    });

    document.getElementById('addZaehlerButton').addEventListener('click', function () {
        setTimeout(function () {
            checkAndUpdateHeading("zaehlerTable", "Zähler", "Zähler (nicht angegeben)");
        }, 100);
    });
});




/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
let counterEinziehender = 1;
document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
    let table = document.getElementById('einzugmieterTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'einzugmieterTable';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Name', 'Vorname', 'Tel.:', 'E-Mail'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        const button = document.getElementById('addeinziehenderMieter');
        button.insertAdjacentElement('beforebegin', table);
    }

    const newRow1 = document.createElement('tr');
    const nameCell = document.createElement('td');
    const vornameCell = document.createElement('td');
    const strasseCell = document.createElement('td');
    const plzOrtCell = document.createElement('td');

    const counter = document.querySelectorAll('.signature-container').length + 1;
    const nameId = `NameEin${counter.toString().padStart(2, '0')}`;
    const vornameId = `VornameEin${counter.toString().padStart(2, '0')}`;

    nameCell.innerHTML = `<input type="text" placeholder="Name" id="${nameId}" class="autoscale" value="Fürst-Metternich Strobel" style="width: 230px;">`;
    vornameCell.innerHTML = `<input type="text" placeholder="Vorname" id="${vornameId}" class="autoscale" value="Heinrich-Maximilian" style="width: 150px;">`;
    strasseCell.innerHTML = '<input type="text" placeholder="Tel.:" class="phones autoscale" value="0175 / 89874585" style="width: 140px;">';
    plzOrtCell.innerHTML = '<input type="email" placeholder="mail@web.de" class="mails autoscale" value="klausschneider1960@gmail56.com" style="width: 300px;">';

    newRow1.appendChild(nameCell);
    newRow1.appendChild(vornameCell);
    newRow1.appendChild(strasseCell);
    newRow1.appendChild(plzOrtCell);

    // Neue Zeile als erste Zeile im tbody einfügen (also oberhalb der bestehenden)
    const tbody = table.querySelector('tbody');
    tbody.insertBefore(newRow1, tbody.firstChild);


    const signatureContainer = document.createElement('div');
    signatureContainer.classList.add('signature-container');
    signatureContainer.id = `signature-container-einziehender-mieter-${counter}`;

    const signatureBox = document.createElement('div');
    signatureBox.classList.add('signature-box');


    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.classList.add('signature-clear-btn');
    clearButton.textContent = 'x';
    clearButton.onclick = () => clearSignature(`einziehender-mieter-signature-${counter}`);
    signatureBox.appendChild(clearButton);

    const canvas = document.createElement('canvas');
    canvas.id = `einziehender-mieter-signature-${counter}`;
    canvas.classList.add('signature-canvas3');
    signatureBox.appendChild(canvas);

    signatureContainer.appendChild(signatureBox);

    // Mieter-Info direkt unter der Signatur-Box platzieren
    const mieterInfo = document.createElement('div');
    mieterInfo.id = `einziehender-mieter-info-${counter}`;
    mieterInfo.style.marginTop = '5px';
    mieterInfo.style.fontWeight = 'bold';
    mieterInfo.style.textAlign = 'center';
    mieterInfo.innerHTML = `einziehender Mieter: <span id="einziehender-mieter-fullname-${counter}"></span>`;

    signatureContainer.appendChild(mieterInfo);

    // Signaturfeld direkt unter den bestehenden Unterschriftenfeldern einfügen
    const signatureContent = document.querySelector('.signature-content');
    signatureContent.appendChild(signatureContainer);

    initSignatureCanvas(`einziehender-mieter-signature-${counter}`);

    const nameInput = document.getElementById(nameId);
    const vornameInput = document.getElementById(vornameId);
    const fullNameSpan = document.getElementById(`einziehender-mieter-fullname-${counter}`);

    nameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));
    vornameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));

    // Überschriftenzeile bei einziehenden Mieter hinzufügen
    let table2 = document.getElementById('einzugmieterTable');

    if (table2) {
        // Überprüfe, ob bereits eine Kopfzeile (thead) vorhanden ist
        if (!table2.querySelector('thead')) {
            // Erstelle das thead und tr-Element
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Die Überschriften
            const headers = ['Name', 'Vorname', 'Tel.: ', 'E-Mail'];

            // Füge die Überschriften zu der Zeile hinzu
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            // Füge die headerRow zu thead hinzu
            thead.appendChild(headerRow);

            // Füge das thead zur Tabelle hinzu
            table2.insertBefore(thead, table2.querySelector('tbody'));
        }
    }

});









/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
let counter = 1;
document.getElementById('addausziehenderMieter').addEventListener('click', function () {
    let table = document.getElementById('auszugmieterTable');

    if (!table) {
        table = document.createElement('table');
        table.id = 'auszugmieterTable';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Name', 'Vorname', 'neue Straße', 'PLZ / Ort'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        const button = document.getElementById('addausziehenderMieter');
        button.insertAdjacentElement('beforebegin', table);
    }

    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const vornameCell = document.createElement('td');
    const strasseCell = document.createElement('td');
    const plzOrtCell = document.createElement('td');

    const counter = document.querySelectorAll('.signature-container').length + 1;
    const nameId = `NameAus${counter.toString().padStart(2, '0')}`;
    const vornameId = `VornameAus${counter.toString().padStart(2, '0')}`;

    nameCell.innerHTML = `<input type="text" placeholder="Name" id="${nameId}" class="autoscale" value="Müller-Heidrich" style="width: 180px;">`;
    vornameCell.innerHTML = `<input type="text" placeholder="Vorname" id="${vornameId}" class="autoscale" value="Hans-Peter" style="width: 110px;">`;
    strasseCell.innerHTML = '<input type="text" placeholder="neue Straße" class="newstreets autoscale" value="Paul von Gossen Str. 159" style="width: 300px;">';
    plzOrtCell.innerHTML = '<input type="text" placeholder="PLZ / Ort" class="plzauszug autoscale" value="90415 Nünrberg-Fischbach" style="width: 220px;">';

    newRow.appendChild(nameCell);
    newRow.appendChild(vornameCell);
    newRow.appendChild(strasseCell);
    newRow.appendChild(plzOrtCell);

    table.querySelector('tbody').appendChild(newRow);

    const signatureContainer = document.createElement('div');
    signatureContainer.classList.add('signature-container');
    signatureContainer.id = `signature-container-ausziehender-mieter-${counter}`;

    const signatureBox = document.createElement('div');
    signatureBox.classList.add('signature-box');

    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.classList.add('signature-clear-btn');
    clearButton.textContent = 'x';
    clearButton.onclick = () => clearSignature(`ausziehender-mieter-signature-${counter}`);
    signatureBox.appendChild(clearButton);

    const canvas = document.createElement('canvas');
    canvas.id = `ausziehender-mieter-signature-${counter}`;
    canvas.classList.add('signature-canvas');
    signatureBox.appendChild(canvas);

    signatureContainer.appendChild(signatureBox);

    // Mieter-Info direkt unter der Signatur-Box platzieren
    const mieterInfo = document.createElement('div');
    mieterInfo.id = `ausziehender-mieter-info-${counter}`;
    mieterInfo.style.marginTop = '-100px';
    mieterInfo.style.marginBottom = '100px';
    mieterInfo.style.fontWeight = 'bold';
    mieterInfo.style.textAlign = 'center';
    mieterInfo.innerHTML = `ausziehender Mieter: <span id="ausziehender-mieter-fullname-${counter}"></span>`;

    signatureContainer.appendChild(mieterInfo); // Direkt unter das Signaturfeld

    document.querySelector('.signature-content').insertAdjacentElement('afterend', signatureContainer);
    initSignatureCanvas(`ausziehender-mieter-signature-${counter}`);

    const nameInput = document.getElementById(nameId);
    const vornameInput = document.getElementById(vornameId);
    const fullNameSpan = document.getElementById(`ausziehender-mieter-fullname-${counter}`);

    nameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));
    vornameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));
});















/* Button Schlüssel hinzufügen */
/* Button Schlüssel hinzufügen */
/* Button Schlüssel hinzufügen */
document.getElementById('addKeyButton').addEventListener('click', function () {
    const tableContainer = document.getElementById('schluesselTableContainer');

    // Überprüfen, ob die Tabelle bereits existiert
    let table = document.getElementById('schluesselTable');

    if (!table) {
        // Tabelle und den entsprechenden Kopf erstellen
        table = document.createElement('table');
        table.id = 'schluesselTable';

        // CSS für die Tabelle hinzufügen
        const style = document.createElement('style');
        style.textContent = `
            #schluesselTable {
                width: 100%;
                   border-collapse: collapse;
             
            }
            #schluesselTable th, #schluesselTable td {
                padding: 8px;
                padding-top:0px;
                padding-bottom:0px;
               
            }
            #schluesselTable th:nth-child(1), #schluesselTable td:nth-child(1) {
                width: 300px; /* Schlüsselbezeichnung */
            }
            #schluesselTable th:nth-child(2), #schluesselTable td:nth-child(2) {
                width: 90px; /* Anzahl */
                border:none;
            }
            #schluesselTable th:nth-child(3), #schluesselTable td:nth-child(3) {
                width: auto; /* Bezeichnung (nimmt den Rest der Breite ein) */
                border:none;
            }
        `;
        document.head.appendChild(style);

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Schlüsselbezeichnung', 'Anzahl', 'Schlüsselnummer / Bemerkung'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        // Die Tabelle in den DOM einfügen
        tableContainer.appendChild(table);
    }

    // Neue Zeile in den Tabellenkörper hinzufügen
    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    bezeichnungCell.innerHTML = `
        <select style="width: 100%;">
            <option value="leer"></option>
            <option value="haustuer">Haustür</option>
            <option value="wohnung">Wohnung</option>
            <option value="keller">Keller</option>
            <option value="dachboden">Dachboden</option>
            <option value="briefkasten">Briefkasten</option>
            <option value="abstellraum">Abstellraum</option>
            <option value="fahrradbereich">Fahrradbereich</option>
            <option value="sonstige">Sonstige</option>
        </select>`;

    const anzahlCell = document.createElement('td');
    anzahlCell.innerHTML = '<input type="number" placeholder="Anzahl" style="width: 100%;">';

    const schluesselnummerCell = document.createElement('td');
    schluesselnummerCell.innerHTML = '<input type="text" placeholder="Schlüsselnummer" class="autoscale" style="width: 98%;">';

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(anzahlCell);
    newRow.appendChild(schluesselnummerCell);

    // Zeile in den Tabellenkörper einfügen
    const tbody = table.querySelector('tbody');
    tbody.appendChild(newRow);
});




/* Button Zähler hinzufügen */
/* Button Zähler hinzufügen */
/* Button Zähler hinzufügen */
document.getElementById('addZaehlerButton').addEventListener('click', function () {
    const tableContainer = document.getElementById('zaehlerTableContainer');

    // Überprüfen, ob die Tabelle bereits existiert
    let table = document.getElementById('zaehlerTable');

    if (!table) {
        // Tabelle und den entsprechenden Kopf erstellen
        table = document.createElement('table');
        table.id = 'zaehlerTable';
        table.style.width = '100%'; // Breite der Tabelle

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = [
            { text: 'Bezeichnung', width: '230px' },
            { text: 'Zählernummer', width: '170px' },
            { text: 'Einbaulage', width: '290px' },
            { text: 'Zählerstand', width: '140px' }
        ];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header.text;
            th.style.width = header.width; // Breite der Überschrift anpassen
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        // Die Tabelle in den DOM einfügen
        tableContainer.appendChild(table);
    }

    // Neue Zeile in den Tabellenkörper hinzufügen
    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    bezeichnungCell.innerHTML = `
        <select style="width:230px;">
            <option value="leer"></option>
            <option value="gaszaehler">Gaszähler</option>
            <option value="stromzaehler">Stromzähler</option>
            <option value="waermezaehler">Wärmezähler</option>
            <option value="wassertemperaturKalt">Wasserzähler (kalt)</option>
            <option value="wassertemperaturWarm">Wasserzähler (warm)</option>
            <option value="heizkostenverteiler">Heizkostenverteiler</option>
        </select>`;

    const zaehlernummerCell = document.createElement('td');
    zaehlernummerCell.innerHTML = '<input type="text" placeholder="Zählernummer" class="metercounter autoscale" style="width:170px;">';

    const einbaulageCell = document.createElement('td');
    einbaulageCell.innerHTML = '<input type="text" placeholder="exakte Einbaulage" style="width:290px;" class="einbaulage autoscale">';

    const zaehlerstandCell = document.createElement('td');
    zaehlerstandCell.innerHTML = '<input type="text" placeholder="Zählerstand" class="meterstand autoscale" style="width:140px;">';

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(zaehlernummerCell);
    newRow.appendChild(einbaulageCell);
    newRow.appendChild(zaehlerstandCell);

    // Zeile in den Tabellenkörper einfügen
    const tbody = table.querySelector('tbody');
    tbody.appendChild(newRow);
});







// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorahnden" auf "nein" geklickt wird.
// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorahnden" auf "nein" geklickt wird.
// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorahnden" auf "nein" geklickt wird.
document.addEventListener("DOMContentLoaded", function () {
    function setupRoomToggle(room) {
        // Überprüfen, ob der Container die ID "weitereBemerkungenContainer" oder "nebenraum" hat
        if (room.id === "weitereBemerkungen" || room.id === "nebenraum" || room.id === "hauptBemerkungen") {
            return; // Überspringen, wenn es einer der ausgeschlossenen Container ist
        }

        const radioJa = room.querySelector("input[type='radio'][value='ja']");
        const radioNein = room.querySelector("input[type='radio'][value='nein']");
        const tableRows = room.querySelectorAll("table tr:not(:first-child)");

        function toggleTable() {
            tableRows.forEach(row => {
                row.style.display = radioNein.checked ? "none" : "table-row";
            });
        }

        // **Hier wird standardmäßig "Nein" gesetzt**
        if (radioNein) {
            radioNein.checked = true;
            toggleTable();
        }

        if (radioJa && radioNein) {
            radioJa.addEventListener("change", toggleTable);
            radioNein.addEventListener("change", toggleTable);
        }
    }

    function toggleRoom(header, content, arrow) {
        if (content.style.display === "none") {
            content.style.display = "table";
            arrow.style.transform = "rotate(180deg)";
        } else {
            content.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    }

    function addToggleFunctionality(room) {
        const header = room.querySelector("h3");
        const content = room.querySelector("table");

        if (header && content) {
            let arrow = header.querySelector("span");
            if (!arrow) {
                arrow = document.createElement("span");
                arrow.textContent = " ▼";
                arrow.style.transition = "transform 0.3s ease";
                header.appendChild(arrow);
            }

            content.style.display = "table"; // Räume sollen offen sein
            header.style.cursor = "pointer";
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.alignItems = "center";

            header.addEventListener("click", function () {
                toggleRoom(header, content, arrow);
            });
        }
    }

    // Initialisierung für jeden Raum
    const rooms = document.querySelectorAll(".rooms");
    rooms.forEach(room => {
        setupRoomToggle(room);
        addToggleFunctionality(room);
    });
});



/* versehentlich geklickte Radiobutton wieder deaktivieren */
/* versehentlich geklickte Radiobutton wieder deaktivieren */
/* versehentlich geklickte Radiobutton wieder deaktivieren */
document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("click", function () {
            if (this.checked && this.dataset.previouslyChecked) {
                // Wenn der Radio-Button bereits ausgewählt war, deaktiviere ihn
                this.checked = false;
                this.dataset.previouslyChecked = "";
            } else {
                // Markiere den Radio-Button als zuvor ausgewählt
                this.dataset.previouslyChecked = "true";
            }
        });
    });
});




/* Bemerkungszeile duplizieren */
/* Bemerkungszeile duplizieren */
/* Bemerkungszeile duplizieren */
function duplicateRow(button) {
    // Finde die aktuelle Zeile (die Zeile, in der der Button geklickt wurde)
    const row = button.closest('tr');

    // Klone die Zeile
    const newRow = row.cloneNode(true);

    // Lösche den Wert im Input-Feld der neuen Zeile
    const inputField = newRow.querySelector('input.dupli');
    if (inputField) {
        inputField.value = '';
    }

    // Verstecke den Button in der aktuellen Zeile
    const currentButton = row.querySelector('.dupli-button');
    if (currentButton) {
        currentButton.classList.add('hidden');
    }

    // Füge die neue Zeile nach der aktuellen Zeile ein
    row.parentNode.insertBefore(newRow, row.nextSibling);
}




// Bilder hochladen, Funktion zum Hinzufügen des Event-Listeners für ein bestimmtes .imageUpload-Element
// Bilder hochladen, Funktion zum Hinzufügen des Event-Listeners für ein bestimmtes .imageUpload-Element
// Bilder hochladen, Funktion zum Hinzufügen des Event-Listeners für ein bestimmtes .imageUpload-Element
function setupImageUpload(uploadButton) {
    uploadButton.addEventListener("change", function (event) {
        const title = this.getAttribute("data-title");

        // Container für Miniaturansichten und hochauflösende Bilder auswählen
        const imagePreview = this.nextElementSibling; // Miniaturansicht-Container
        const signContainer = document.querySelector('.bilderzimmer'); // Container für hochauflösende Bilder

        // Bilder verarbeiten und hinzufügen, ohne bestehende Bilder zu ersetzen
        Array.from(event.target.files).forEach(file => {
            let reader = new FileReader();
            reader.onload = function (e) {
                let img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");

                    // Zielgröße für die Skalierung
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    // Skalieren, wenn eine Seite größer als die maximale Größe ist
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width = width * ratio;
                        height = height * ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Bild komprimieren und als Blob speichern
                    canvas.toBlob(function (blob) {
                        const scaledImageSrc = URL.createObjectURL(blob);

                        // Temporär im localStorage speichern
                        const imageData = {
                            title: title,
                            imageUrl: scaledImageSrc,
                        };
                        let storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
                        storedImages.push(imageData);
                        localStorage.setItem('uploadedImages', JSON.stringify(storedImages));

                        // Miniaturansicht mit Löschen-Button
                        let imgWrapper = document.createElement("div");
                        imgWrapper.style.display = "inline-block";
                        imgWrapper.style.position = "relative";
                        imgWrapper.style.margin = "5px";

                        let imgThumbnail = document.createElement("img");
                        imgThumbnail.src = scaledImageSrc;
                        imgThumbnail.style.maxWidth = "100px";
                        imgThumbnail.style.maxHeight = "100px";
                        imgThumbnail.style.border = "1px solid #ccc";
                        imgThumbnail.style.borderRadius = "5px";

                        // Löschen-Button für Miniaturansicht
                        let deleteButton = document.createElement("button");
                        deleteButton.textContent = "X";
                        deleteButton.style.position = "absolute";
                        deleteButton.style.top = "-12px";
                        deleteButton.style.right = "-14px";
                        deleteButton.style.color = "white";
                        deleteButton.style.backgroundColor = "red"; // Hintergrundfarbe rot
                        deleteButton.style.border = "none";
                        deleteButton.style.cursor = "pointer";
                        deleteButton.style.fontSize = "14px";
                        deleteButton.style.borderRadius = "2px";
                        deleteButton.style.padding = "6px 6px";
                        deleteButton.style.paddingTop = "1px";  // Padding oben
                        deleteButton.style.paddingBottom = "1px";  // Padding unten



                        // Löschen-Funktion
                        deleteButton.addEventListener("click", function () {
                            imgWrapper.remove(); // Entfernt das Miniaturbild
                            highResWrapper.remove(); // Entfernt das hochauflösende Bild
                            URL.revokeObjectURL(scaledImageSrc); // Gibt den Blob-URL frei

                            // Entferne das Bild aus localStorage
                            storedImages = storedImages.filter(img => img.imageUrl !== scaledImageSrc);
                            localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
                        });

                        imgWrapper.appendChild(imgThumbnail);
                        imgWrapper.appendChild(deleteButton);
                        imagePreview.appendChild(imgWrapper);

                        // Hochauflösendes Bild mit Titel
                        let highResWrapper = document.createElement("div");
                        let titleElement = document.createElement("h3");
                        titleElement.textContent = title;

                        let imgHighRes = document.createElement("img");
                        imgHighRes.src = scaledImageSrc;
                        imgHighRes.style.maxWidth = "950px";
                        imgHighRes.style.border = "1px solid #ccc";
                        imgHighRes.style.borderRadius = "5px";
                        imgHighRes.style.marginBottom = "10px";

                        highResWrapper.appendChild(titleElement);
                        highResWrapper.appendChild(imgHighRes);
                        signContainer.appendChild(highResWrapper);
                    }, 'image/jpeg', 0.7); // Qualität auf 70% setzen
                };
            };

            reader.readAsDataURL(file);
        });

        // Nach dem Hochladen den Input zurücksetzen, damit man das gleiche Bild erneut hochladen kann
        this.value = "";
    });
}
document.querySelectorAll('input[class^="imageUpload"]').forEach(setupImageUpload);






// Stammdaten aus allgemeinen Informationen ziehen und unterhalb der Überschrift "Unterschriften" hinzufügen
// Stammdaten aus allgemeinen Informationen ziehen und unterhalb der Überschrift "Unterschriften" hinzufügen
// Stammdaten aus allgemeinen Informationen ziehen und unterhalb der Überschrift "Unterschriften" hinzufügen
document.addEventListener("DOMContentLoaded", function () {
    function updateSignFields() {
        document.getElementById("strasseeinzugsign").textContent = document.getElementById("strasseeinzug").value;
        document.getElementById("lageeinzugsign").textContent = document.getElementById("lageeinzug").value;
        document.getElementById("plzeinzugsign").textContent = document.getElementById("plzeinzug").value;
        document.getElementById("datumsign").textContent = document.getElementById("datum").value;
    }
    document.getElementById("strasseeinzug").addEventListener("input", updateSignFields);
    document.getElementById("lageeinzug").addEventListener("input", updateSignFields);
    document.getElementById("plzeinzug").addEventListener("input", updateSignFields);
    document.getElementById("datum").addEventListener("input", updateSignFields);
    updateSignFields();
});











// Unterschriftenfeld Canvas-Größe dynamisch an Container anpassen (gut für responive Design geeignet)
// Unterschriftenfeld Canvas-Größe dynamisch an Container anpassen (gut für responive Design geeignet)
// Unterschriftenfeld Canvas-Größe dynamisch an Container anpassen (gut für responive Design geeignet)
function resizeCanvas(canvas, context) {
    const rect = canvas.getBoundingClientRect();
    
    // Unterschrift zwischenspeichern
    const tempImage = canvas.toDataURL();

    // Neue Größe setzen
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Unterschrift wiederherstellen
    loadSignature(canvas, context, tempImage);
}




// Unterschriftenfeld: Diese Funktion initialisiert ein Canvas-Element, das als Signaturfeld verwendet werden kann
// Unterschriftenfeld: Diese Funktion initialisiert ein Canvas-Element, das als Signaturfeld verwendet werden kann
// Unterschriftenfeld: Diese Funktion initialisiert ein Canvas-Element, das als Signaturfeld verwendet werden kann
function initSignatureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    // Initiale Größe setzen
    resizeCanvas(canvas, context);

    // Vorhandene Unterschrift aus localStorage laden
    loadSignature(canvas, context, localStorage.getItem('signature'));

    // Beim Ändern der Bildschirmgröße neu skalieren
    window.addEventListener('resize', () => resizeCanvas(canvas, context));

    let isDrawing = false;
    let points = [];

    canvas.addEventListener('mousedown', (e) => startDrawing(e));
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    }, { passive: false });

    canvas.addEventListener('mousemove', (e) => draw(e));
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    }, { passive: false });

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        points = [{ x: getMousePos(e).x, y: getMousePos(e).y }];
    }

    function draw(e) {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        points.push({ x: pos.x, y: pos.y });

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i - 1];
            const currentPoint = points[i];
            const midX = (prevPoint.x + currentPoint.x) / 2;
            const midY = (prevPoint.y + currentPoint.y) / 2;

            context.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY);
        }

        context.stroke();
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        saveSignature(canvas); // Unterschrift in localStorage speichern
    }

    function stopDrawing() {
        isDrawing = false;
        points = [];
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
            y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
        };
    }

    function saveSignature(canvas) {
        localStorage.setItem('signature', canvas.toDataURL());
    }

    function loadSignature(canvas, context, imageData) {
        if (!imageData) return;
        const img = new Image();
        img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = imageData;
    }
}

// Unterschriftenfeld für Vermieter
window.onload = function () {
    initSignatureCanvas('vermieter-signature');
};


// Unterschriften Canvas-Größe dynamisch an Container anpassen
// Unterschriften Canvas-Größe dynamisch an Container anpassen
// Unterschriften Canvas-Größe dynamisch an Container anpassen
function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}




// Unterschriftenfeld für Vermieter
// Unterschriftenfeld für Vermieter
// Unterschriftenfeld für Vermieter
window.onload = function () {
    initSignatureCanvas('vermieter-signature');
};



// Vorname und Nachname unter die Unterschriftenfelder setzen
// Vorname und Nachname unter die Unterschriftenfelder setzen
// Vorname und Nachname unter die Unterschriftenfelder setzen
function updateFullName(fullNameSpan, name, vorname) {
    fullNameSpan.textContent = name && vorname ? `${vorname} ${name}` : '';
}


// Button Unterschriften löschen
// Button Unterschriften löschen
// Button Unterschriften löschen
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
