

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





/* Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc nicht vorkommen */
/* Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc nicht vorkommen */
/* Überschriften ändern, wenn Schlüssel, Zähler, Mieter etc nicht vorkommen */
document.addEventListener("DOMContentLoaded", function () {
    // Funktion zur Überprüfung der Tabelle für "Schlüssel"
    function checkAndUpdateSchluessel() {
        let table = document.getElementById("schluesselTable");

        // Durchlaufe alle h3-Elemente
        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (table) {
                // Falls die Tabelle existiert, stelle sicher, dass die Überschrift "Schlüssel" ist
                if (text === "Schlüssel (nicht angegeben)") {
                    h3.textContent = "Schlüssel";
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                // Falls die Tabelle nicht existiert, ändere "Schlüssel" zu "Schlüssel (nicht angegeben)"
                if (text === "Schlüssel") {
                    h3.textContent = "Schlüssel (nicht angegeben)";
                    h3.style.color = "red";
                    h3.style.borderBottom = "1px solid black";
                    h3.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Funktion zur Überprüfung der Tabelle für "ausziehender Mieter"
    function checkAndUpdateAusziehenderMieter() {
        let table = document.getElementById("auszugmieterTable");

        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (table) {
                // Falls die Tabelle existiert, stelle sicher, dass die Überschrift wieder "ausziehender Mieter" ist
                if (text === "ausziehender Mieter (nicht zutreffend)") {
                    h3.textContent = "ausziehender Mieter";
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                // Falls die Tabelle nicht existiert, ändere "ausziehender Mieter" zu "ausziehender Mieter (nicht zutreffend)"
                if (text === "ausziehender Mieter") {
                    h3.textContent = "ausziehender Mieter (nicht zutreffend)";
                    h3.style.color = "red";
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
        for (let i = 1; i <= 99; i++) { // Gehe von NameEin01 bis NameEin99 durch
            let element = document.getElementById("NameEin" + String(i).padStart(2, "0"));
            if (element) {
                found = true;
                break;
            }
        }

        // Wenn ein passendes Element gefunden wurde, die Überschrift anpassen
        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (found) {
                // Falls ein "NameEin" Element gefunden wurde, stelle sicher, dass die Überschrift wieder "einziehender Mieter" ist
                if (text === "einziehender Mieter (nicht zutreffend)") {
                    h3.textContent = "einziehender Mieter";
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                // Falls kein "NameEin" Element vorhanden ist, ändere "einziehender Mieter" zu "einziehender Mieter (nicht zutreffend)"
                if (text === "einziehender Mieter") {
                    h3.textContent = "einziehender Mieter (nicht zutreffend)";
                    h3.style.color = "red";
                    h3.style.borderBottom = "1px solid black";
                    h3.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Initiale Prüfung beim Laden der Seite
    checkAndUpdateSchluessel();  // Standardmäßig wird "Schlüssel (nicht angegeben)" angezeigt
    checkAndUpdateAusziehenderMieter();
    checkAndUpdateEinziehenderMieter();

    // Event Listener für den Button "Schlüssel hinzufügen"
    document.getElementById('addKeyButton').addEventListener('click', function () {
        // Überprüfe nach dem Hinzufügen des Schlüssels die Tabelle und passe die Überschrift an
        setTimeout(function () {
            checkAndUpdateSchluessel();  // Überprüft, ob die Tabelle jetzt existiert und passt die Überschrift an
            checkAndUpdateAusziehenderMieter();
            checkAndUpdateEinziehenderMieter();
        }, 100); // Verzögerung nach der Änderung im DOM
    });

    // Event Listener für den Button "ausziehender Mieter hinzufügen"
    document.getElementById('addausziehenderMieter').addEventListener('click', function () {
        // Überprüfe nach dem Hinzufügen des Mieters die Tabelle und passe die Überschrift an
        setTimeout(function () {
            checkAndUpdateAusziehenderMieter();
            checkAndUpdateEinziehenderMieter();
            checkAndUpdateSchluessel();  // Auch die Schlüssel-Überschrift wird überprüft
        }, 100); // Verzögere die Überprüfung ein wenig, um DOM-Änderungen abzuwarten
    });

    // Event Listener für den Button "einziehender Mieter hinzufügen"
    document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
        // Überprüfe nach dem Hinzufügen des Mieters die Tabelle und passe die Überschrift an
        setTimeout(function () {
            checkAndUpdateAusziehenderMieter();
            checkAndUpdateEinziehenderMieter();
            checkAndUpdateSchluessel();  // Auch die Schlüssel-Überschrift wird überprüft
        }, 100); // Verzögere die Überprüfung ein wenig, um DOM-Änderungen abzuwarten
    });
});
document.addEventListener("DOMContentLoaded", function () {
    function checkAndUpdateZaehler() {
        let table = document.getElementById("zaehlerTable");

        document.querySelectorAll("h3").forEach(function (h3) {
            let text = h3.textContent.trim();

            if (table) {
                if (text === "Zähler (nicht angegeben)") {
                    h3.textContent = "Zähler";
                    h3.style.color = "black";
                    h3.style.borderBottom = "0px solid black";
                    h3.style.paddingBottom = "0px";
                }
            } else {
                if (text === "Zähler") {
                    h3.textContent = "Zähler (nicht angegeben)";
                    h3.style.color = "red";
                    h3.style.borderBottom = "1px solid black";
                    h3.style.paddingBottom = "5px";
                }
            }
        });
    }
    // Initiale Überprüfung beim Laden der Seite
    checkAndUpdateZaehler();
    // Event Listener für den Button "Zähler hinzufügen"
    document.getElementById('addZaehlerButton').addEventListener('click', function () {
        setTimeout(checkAndUpdateZaehler, 100);
    });
});






/* Button einziehender Mieter hinzufügen... */
/* Button einziehender Mieter hinzufügen... */
/* Button einziehender Mieter hinzufügen... */
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

    nameCell.innerHTML = `<input type="text" placeholder="Name" id="${nameId}" value="von Fürst-Metternich Strobel" style="width: 280px;">`;
    vornameCell.innerHTML = `<input type="text" placeholder="Vorname" id="${vornameId}" value="Heinricht-Maximilian" style="width: 180px;">`;
    strasseCell.innerHTML = '<input type="text" placeholder="Tel.:" class="phones" value="0175 / 89874585" style="width: 180px;">';
    plzOrtCell.innerHTML = '<input type="email" placeholder="mail@web.de" class="mails" value="klausschneider1960@gmail56.com" style="width: 240px;">';

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
});
document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
    // Überprüfe, ob die Tabelle mit der ID "einzugmieterTable" existiert
    let table = document.getElementById('einzugmieterTable');

    if (table) {
        // Überprüfe, ob bereits eine Kopfzeile (thead) vorhanden ist
        if (!table.querySelector('thead')) {
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
            table.insertBefore(thead, table.querySelector('tbody'));
        }
    }
});






/* button ausziehenden Mieter hinzufügen fügt eine zeile hinzu und unterschriftenfelder für ausziehenden Mieter */
/* button ausziehenden Mieter hinzufügen fügt eine zeile hinzu und unterschriftenfelder für ausziehenden Mieter */
/* button ausziehenden Mieter hinzufügen fügt eine zeile hinzu und unterschriftenfelder für ausziehenden Mieter */
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

    nameCell.innerHTML = `<input type="text" placeholder="Name" id="${nameId}" value="Müller-Heidrich" style="width: 225px;">`;
    vornameCell.innerHTML = `<input type="text" placeholder="Vorname" id="${vornameId}" value="Hans-Peter" style="width: 150px;">`;
    strasseCell.innerHTML = '<input type="text" placeholder="neue Straße" class="newstreets" value="Paul von Gossen Str. 159" style="width: 250px;">';
    plzOrtCell.innerHTML = '<input type="text" placeholder="PLZ / Ort" class="plzauszug" value="90415 Nünrberg-Fischbach" style="width: 240px;">';

    /* 
        nameCell.innerHTML = `<input type="text" placeholder="Name" id="${nameId}" value="von Fürst-Metternich Strobel" style="width: 310px;">`;
        vornameCell.innerHTML = `<input type="text" placeholder="Vorname" id="${vornameId}" value="Heinricht-Maximilian" style="width: 180px;">`;
        strasseCell.innerHTML = '<input type="text" placeholder="Tel.:" class="phones" value="0175 / 89874585" style="width: 180px;">';
        plzOrtCell.innerHTML = '<input type="email" placeholder="mail@web.de" class="mails" value="klausschneider1960@gmail56.com" style="width: 240px;">';
       xxxxxxxxxx */

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
    mieterInfo.style.textAlign = 'center';  // Falls nötig, für bessere Optik
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
function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}
function initSignatureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    // Größe des Canvas festlegen
    canvas.width = 500;
    canvas.height = 150;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Zeichnen starten, wenn die Maus oder der Finger gedrückt wird
    canvas.addEventListener('mousedown', (e) => startDrawing(e));
    canvas.addEventListener('touchstart', (e) => startDrawing(e), { passive: true });

    // Zeichnen fortsetzen, wenn die Maus oder der Finger bewegt wird
    canvas.addEventListener('mousemove', (e) => draw(e));
    canvas.addEventListener('touchmove', (e) => draw(e), { passive: true });

    // Zeichnen stoppen, wenn die Maus oder der Finger losgelassen wird
    canvas.addEventListener('mouseup', () => stopDrawing());
    canvas.addEventListener('touchend', () => stopDrawing(), { passive: true });

    // Start des Zeichnens
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    // Zeichnen der Linie
    function draw(e) {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.lineWidth = 3;

        lastX = pos.x;
        lastY = pos.y;
    }

    // Beenden des Zeichnens
    function stopDrawing() {
        isDrawing = false;
    }

    // Mausposition auf dem Canvas ermitteln (unter Berücksichtigung der Position des Canvas im Dokument)
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();  // Berechnet die Position des Canvas relativ zur Seite
        const x = e.clientX - rect.left;  // Mausposition relativ zum Canvas
        const y = e.clientY - rect.top;   // Mausposition relativ zum Canvas
        return { x, y };
    }
}
// Unterschrift löschen
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
// Initialisiere das Canvas nach dem Laden der Seite
window.onload = function () {
    initSignatureCanvas('vermieter-signature');
};
// Initialisiere das Canvas nach dem Laden der Seite
window.onload = function () {
    initSignatureCanvas('vermieter-signature');
};
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
function updateFullName(fullNameSpan, name, vorname) {
    fullNameSpan.textContent = name && vorname ? `${vorname} ${name}` : 'Bitte Name und Vorname eingeben';
}




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
    schluesselnummerCell.innerHTML = '<input type="text" placeholder="Schlüsselnummer" style="width: 98%;">';

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
            { text: 'Zählernummer', width: '180px' },
            { text: 'Einbaulage', width: '280px' },
            { text: 'Zählerstand', width: '180px' }
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
    zaehlernummerCell.innerHTML = '<input type="text" placeholder="Zählernummer" class="metercounter" style="width:180px;">';

    const einbaulageCell = document.createElement('td');
    einbaulageCell.innerHTML = '<input type="text" placeholder="exakte Einbaulage" style="width:280px;" class="einbaulage">';

    const zaehlerstandCell = document.createElement('td');
    zaehlerstandCell.innerHTML = '<input type="text" placeholder="Zählerstand" class="meterstand" style="width:180px;">';

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(zaehlernummerCell);
    newRow.appendChild(einbaulageCell);
    newRow.appendChild(zaehlerstandCell);

    // Zeile in den Tabellenkörper einfügen
    const tbody = table.querySelector('tbody');
    tbody.appendChild(newRow);
});






/* Toggle Allgemein */
/* Toggle Allgemein */
/* Toggle Allgemein */
/* document.addEventListener('DOMContentLoaded', function () {
    const heading = document.querySelector('.uberschrift2');

    heading.addEventListener('click', function () {
        const toggleDiv = document.getElementById('toggleDiv');

        if (toggleDiv) {
            if (toggleDiv.style.display === 'none' || toggleDiv.style.display === '') {
                toggleDiv.style.display = 'block';
                setTimeout(() => {
                    toggleDiv.style.opacity = '1';
                }, 10);
            } else {
                toggleDiv.style.opacity = '0';
                setTimeout(() => {
                    toggleDiv.style.display = 'none';
                }, 300);
            }
        }
    });
}); */




/* toggle sign-Content */
/* toggle sign-Content */
/* toggle sign-Content */
document.addEventListener('DOMContentLoaded', function () {
    // Wähle das sichtbare div mit der Klasse "sign" aus
    const signDiv = document.querySelector('.sign');
    // Wähle das auszublendende div mit der ID "signtoggle" aus
    const signToggle = document.getElementById('signtoggle');

    // Füge ein Klick-Event hinzu
    /*     signDiv.addEventListener('click', function () {
            // Toggle die Sichtbarkeit
            if (signToggle.style.display === 'none' || signToggle.style.display === '') {
                signToggle.style.display = 'block';
                // Füge die Klasse "visible" hinzu, um die Animation zu starten
                setTimeout(() => {
                    signToggle.classList.add('visible');
                }, 10);
            } else {
                // Entferne die Klasse "visible", um die Animation rückgängig zu machen
                signToggle.classList.remove('visible');
                // Verstecke das Element nach Abschluss der Animation
                setTimeout(() => {
                    signToggle.style.display = 'none';
                }, 300); // Wartezeit entsprechend der CSS-Transition
            }
        }); */
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
/* function setupImageUpload(uploadButton) {
    uploadButton.addEventListener("change", function (event) {
        const title = this.getAttribute("data-title"); // Titel aus dem data-title-Attribut lesen

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

                    let width = img.width;
                    let height = img.height;

                    // Skalieren, wenn eine Seite kleiner als 800px ist
                    if (width < 800 || height < 800) {
                        let scale = Math.max(800 / width, 800 / height);
                        width = Math.round(width * scale);
                        height = Math.round(height * scale);
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    let scaledImageSrc = canvas.toDataURL("image/jpeg");

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
                    deleteButton.textContent = "❌";
                    deleteButton.style.position = "absolute";
                    deleteButton.style.top = "-12px";
                    deleteButton.style.right = "-14px";
                    deleteButton.style.color = "white";
                    deleteButton.style.border = "none";
                    deleteButton.style.cursor = "pointer";
                    deleteButton.style.fontSize = "14px";
                    deleteButton.style.borderRadius = "50%";
                    deleteButton.style.padding = "6px 6px";

                    // Löschen-Funktion
                    deleteButton.addEventListener("click", function () {
                        imgWrapper.remove(); // Entfernt das Miniaturbild
                        highResWrapper.remove(); // Entfernt das hochauflösende Bild
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
                };
            };

            reader.readAsDataURL(file);
        });

        // Nach dem Hochladen den Input zurücksetzen, damit man das gleiche Bild erneut hochladen kann
        this.value = "";
    });
} */
/* document.querySelectorAll('input[class^="imageUpload"]').forEach(setupImageUpload); */

function setupImageUpload(uploadButton) {
    uploadButton.addEventListener("change", function (event) {
        const title = this.getAttribute("data-title"); // Titel aus dem data-title-Attribut lesen

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





// Funktion zum Duplizieren eines Zimmers
// Funktion zum Duplizieren eines Zimmers
// Funktion zum Duplizieren eines Zimmers
function duplicateRoom() {
    let container = document.getElementById("zimmerContainer");
    let originalZimmer = container.querySelector(".rooms");

    if (!originalZimmer) return;

    // Zähle die existierenden Zimmer und ermittele die neue Zimmernummer
    let neueNummer = container.getElementsByClassName("rooms").length + 1;
    let neuesZimmer = originalZimmer.cloneNode(true);

    // Formatierte Nummer (z. B. "01", "02", usw.)
    let formattedNummer = String(neueNummer).padStart(2, '0');

    // Ersetze alle Vorkommen von "01" durch die neue Nummer im inneren HTML
    neuesZimmer.innerHTML = neuesZimmer.innerHTML.replace(/01/g, formattedNummer);

    // Ersetze die Zimmernummer im Text (z. B. "Zimmer 1" -> "Zimmer 2")
    neuesZimmer.innerHTML = neuesZimmer.innerHTML.replace(/Zimmer 1/g, "Zimmer " + neueNummer);

    // Aktualisiere die ID des neuen Zimmers
    neuesZimmer.id = "zimm" + formattedNummer;

    // Passe die Überschrift des neuen Zimmers an
    let header = neuesZimmer.querySelector("h3");
    if (header) header.textContent = "Zimmer " + neueNummer;

    // Aktualisiere das data-title Attribut des Upload-Buttons für das neue Zimmer
    let uploadButton = neuesZimmer.querySelector('.customUploadButton' + formattedNummer);
    if (uploadButton) {
        let uploadInput = neuesZimmer.querySelector('.imageUpload' + formattedNummer);
        // Hier wird das data-title-Attribut im Format 'Zimmer 01', 'Zimmer 02' etc. gesetzt
        let formattedTitle = "Zimmer " + formattedNummer;
        uploadButton.setAttribute("for", "uploadZimmer" + formattedNummer);
        uploadButton.textContent = "+ Bilder hinzufügen (" + formattedTitle + ")";
        uploadInput.setAttribute("id", "uploadZimmer" + formattedNummer);
        uploadInput.setAttribute("data-title", formattedTitle);  // data-title im Format 'Zimmer 01'
    }

    // Setze alle Radio-Buttons im neuen Zimmer zurück
    neuesZimmer.querySelectorAll("input[type='radio']").forEach(input => input.checked = false);

    // Leere die Bildvorschau-Container im neuen Zimmer
    let imagePreview = neuesZimmer.querySelector('.imagePreview');
    let highResImagePreview = neuesZimmer.querySelector('.highResImagePreview');
    if (imagePreview) imagePreview.innerHTML = ''; // Leere den Miniaturansicht-Container
    if (highResImagePreview) highResImagePreview.innerHTML = ''; // Leere den hochauflösenden Bild-Container

    // Füge das neue Zimmer in den Container ein
    container.appendChild(neuesZimmer);

    // Füge die Toggle-Funktionalität nur für das neue Zimmer hinzu
    addToggleFunctionality(neuesZimmer);
    setupRoomToggle(neuesZimmer);

    // Füge den Event-Listener für das neue .imageUpload-Element hinzu
    let newUploadInput = neuesZimmer.querySelector('.imageUpload' + formattedNummer);
    if (newUploadInput) {
        setupImageUpload(newUploadInput);
    }
}



/* Stammdaten aus allgemeinen Informationen ziehen und bei Unterschriften duplizieren
Stammdaten aus allgemeinen Informationen ziehen und bei Unterschriften duplizieren
Stammdaten aus allgemeinen Informationen ziehen und bei Unterschriften duplizieren */
document.addEventListener("DOMContentLoaded", function () {
    function updateSignFields() {
        document.getElementById("strasseeinzugsign").textContent = document.getElementById("strasseeinzug").value;
        document.getElementById("lageeinzugsign").textContent = document.getElementById("lageeinzug").value;
        document.getElementById("plzeinzugsign").textContent = document.getElementById("plzeinzug").value;
        document.getElementById("datumsign").textContent = document.getElementById("datum").value;
    }

    // Event-Listener für alle Input-Felder
    document.getElementById("strasseeinzug").addEventListener("input", updateSignFields);
    document.getElementById("lageeinzug").addEventListener("input", updateSignFields);
    document.getElementById("plzeinzug").addEventListener("input", updateSignFields);
    document.getElementById("datum").addEventListener("input", updateSignFields);

    // Initiale Befüllung beim Laden der Seite
    updateSignFields();
});






/* Schriftgrößenänderung */
/* Schriftgrößenänderung */
/* Schriftgrößenänderung */
document.getElementById("strasseeinzug").addEventListener("input", function () {
    if (this.value.length > 34) {
        this.style.fontSize = "15px"; // Schriftgröße weiter verkleinern
    } else if (this.value.length > 28) {
        this.style.fontSize = "18px"; // Schriftgröße verkleinern
    } else {
        this.style.fontSize = "20px"; // Standardgröße beibehalten
    }
});
document.getElementById("plzeinzug").addEventListener("input", function () {
    if (this.value.length > 32) {
        this.style.fontSize = "15px"; // Schriftgröße weiter verkleinern
    } else if (this.value.length > 27) {
        this.style.fontSize = "18px"; // Schriftgröße verkleinern
    } else {
        this.style.fontSize = "20px"; // Standardgröße beibehalten
    }
});
document.getElementById("lageeinzug").addEventListener("input", function () {
    if (this.value.length > 36) {
        this.style.fontSize = "15px"; // Schriftgröße weiter verkleinern
    } else if (this.value.length > 30) {
        this.style.fontSize = "18px"; // Schriftgröße verkleinern
    } else {
        this.style.fontSize = "20px"; // Standardgröße beibehalten
    }
});
document.addEventListener("input", function (event) {
    if (event.target.id.startsWith("NameEin")) {
        let inputLength = event.target.value.length;

        if (inputLength > 28) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße

        } else if (inputLength > 24) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße

        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.id.startsWith("VornameEin")) {
        let inputLength = event.target.value.length;

        if (inputLength > 24) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße
            event.target.style.width = "270px"; // Größte Breite
        } else if (inputLength > 16) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
            /*             event.target.style.width = "220px"; // Breite vergrößern */
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
            /*             event.target.style.width = "180px"; // Standardbreite */
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("mails")) {
        let inputLength = event.target.value.length;

        if (inputLength > 21) {
            event.target.style.fontSize = "13px"; // Kleinste Schriftgröße
        } else if (inputLength > 16) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("phones")) {
        let inputLength = event.target.value.length;

        if (inputLength > 16) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße
        } else if (inputLength > 12) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.id.startsWith("VornameAus")) {
        let inputLength = event.target.value.length;

        if (inputLength > 16) {
            event.target.style.fontSize = "14px"; // Kleinste Schriftgröße
        } else if (inputLength > 11) {
            event.target.style.fontSize = "16px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.id.startsWith("NameAus")) {
        let inputLength = event.target.value.length;

        if (inputLength > 26) {
            event.target.style.fontSize = "14px"; // Kleinste Schriftgröße
        } else if (inputLength > 22) {
            event.target.style.fontSize = "16px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("newstreets")) {
        let inputLength = event.target.value.length;

        if (inputLength > 21) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße
        } else if (inputLength > 18) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("plzauszug")) {
        let inputLength = event.target.value.length;

        if (inputLength > 21) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße
        } else if (inputLength > 18) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("keynumber")) {
        let inputLength = event.target.value.length;

        if (inputLength > 26) {
            event.target.style.fontSize = "16px"; // Kleinste Schriftgröße
            /*             event.target.style.width = "320px"; // Größte Breite */
        } else if (inputLength > 20) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
            /*            event.target.style.width = "310px"; // Breite vergrößern */
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße
            /*             event.target.style.width = "300px"; // Standardbreite */
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("metercounter")) {
        let inputLength = event.target.value.length;

        if (inputLength > 14) {
            event.target.style.fontSize = "13px"; // Kleinste Schriftgröße
        } else if (inputLength > 12) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("einbaulage")) {
        let inputLength = event.target.value.length;

        if (inputLength > 32) {
            event.target.style.fontSize = "16px"; // Kleinste Schriftgröße
        } else if (inputLength > 24) {
            event.target.style.fontSize = "18px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("meterstand")) {
        let inputLength = event.target.value.length;

        if (inputLength > 14) {
            event.target.style.fontSize = "15px"; // Kleinste Schriftgröße
        } else if (inputLength > 12) {
            event.target.style.fontSize = "17px"; // Mittlere Schriftgröße
        } else {
            event.target.style.fontSize = "20px"; // Standardgröße beibehalten
        }
    }
});












