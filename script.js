
// Copyright - Oliver Acker, acker_oliver@yahoo.de
// Version 3.21

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
// Funktion zum Hinzufügen von Schriftgrößen-Steuerungen zu Input-Feldern
function addFontControlsToInputs() {
    // Alle Input-Felder vom Typ "text" und "email" auswählen
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');

    inputs.forEach(input => {
        // Prüfen, ob bereits Controls hinzugefügt wurden
        if (input.parentElement.classList.contains('input-container')) {
            // Wenn bereits Controls vorhanden sind, initialisiere die Schriftgrößen-Steuerung
            const plusButton = input.parentElement.querySelector('.font-plus');
            const minusButton = input.parentElement.querySelector('.font-minus');
            if (plusButton && minusButton) {
                initFontControls(input, plusButton, minusButton);
            }
            return; // Überspringen, falls bereits vorhanden
        }

        // Container für Input und Buttons erstellen
        const container = document.createElement('div');
        container.classList.add('input-container');

        // Buttons für Schriftgrößen-Steuerung erstellen
        const controls = document.createElement('div');
        controls.classList.add('size-controls');

        const plusButton = document.createElement('button');
        plusButton.classList.add('font-plus');
        plusButton.textContent = '+';

        const minusButton = document.createElement('button');
        minusButton.classList.add('font-minus');
        minusButton.textContent = '-';

        // Buttons zum Controls-Container hinzufügen
        controls.appendChild(plusButton);
        controls.appendChild(minusButton);

        // Input-Feld in den Container verschieben
        input.parentNode.insertBefore(container, input);
        container.appendChild(input);
        container.appendChild(controls);

        // Schriftgrößen-Steuerung initialisieren
        initFontControls(input, plusButton, minusButton);
    });
}
// Funktion zur Initialisierung der Schriftgrößen-Steuerung
function initFontControls(input, plusButton, minusButton) {
    let fontSize = parseFloat(window.getComputedStyle(input).fontSize);
    const minSize = 8; // Minimale Schriftgröße
    const maxSize = 24; // Maximale Schriftgröße
    const step = 4; // Schrittweite

    // Funktion zur Aktualisierung der Schriftgröße
    function updateFontSize(newSize) {
        fontSize = Math.min(Math.max(newSize, minSize), maxSize);
        input.style.fontSize = `${fontSize}px`;

        // Buttons deaktivieren, wenn Grenzwerte erreicht sind
        plusButton.disabled = fontSize >= maxSize;
        minusButton.disabled = fontSize <= minSize;
    }

    // Event-Listener für die Buttons
    plusButton.addEventListener('click', () => updateFontSize(fontSize + step));
    minusButton.addEventListener('click', () => updateFontSize(fontSize - step));

    // Initiale Schriftgröße setzen
    updateFontSize(fontSize);
}
// Funktion zum Beobachten von DOM-Änderungen
function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Überprüfe, ob neue Input-Felder hinzugefügt wurden
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Suche nach Input-Feldern im hinzugefügten Element
                        const inputs = node.querySelectorAll('input[type="text"], input[type="email"]');
                        inputs.forEach(input => {
                            // Prüfen, ob bereits Controls hinzugefügt wurden
                            if (!input.parentElement.classList.contains('input-container')) {
                                // Container für Input und Buttons erstellen
                                const container = document.createElement('div');
                                container.classList.add('input-container');

                                // Buttons für Schriftgrößen-Steuerung erstellen
                                const controls = document.createElement('div');
                                controls.classList.add('size-controls');

                                const plusButton = document.createElement('button');
                                plusButton.classList.add('font-plus');
                                plusButton.textContent = '+';

                                const minusButton = document.createElement('button');
                                minusButton.classList.add('font-minus');
                                minusButton.textContent = '-';

                                // Buttons zum Controls-Container hinzufügen
                                controls.appendChild(plusButton);
                                controls.appendChild(minusButton);

                                // Input-Feld in den Container verschieben
                                input.parentNode.insertBefore(container, input);
                                container.appendChild(input);
                                container.appendChild(controls);

                                // Schriftgrößen-Steuerung initialisieren
                                initFontControls(input, plusButton, minusButton);
                            } else {
                                // Falls bereits Controls vorhanden sind, initialisiere die Schriftgrößen-Steuerung
                                const plusButton = input.parentElement.querySelector('.font-plus');
                                const minusButton = input.parentElement.querySelector('.font-minus');
                                if (plusButton && minusButton) {
                                    initFontControls(input, plusButton, minusButton);
                                }
                            }
                        });
                    }
                });
            }
        });
    });

    // Beobachte das gesamte Dokument auf Änderungen
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    addFontControlsToInputs(); // Vorhandene Inputs verarbeiten
    observeDOMChanges(); // Zukünftige Inputs beobachten
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
        const headers = [
            { text: 'Name', width: '30%' },
            { text: 'Vorname', width: '25%' },
            { text: 'Tel.:', width: '20%' },
            { text: 'E-Mail', width: '25%' }
        ];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header.text;
            th.style.width = header.width;
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

    nameCell.innerHTML = `<input type="text" id="${nameId}" class="autoscale nameeinziehmieter" style="min-width: 1px;">`;
    vornameCell.innerHTML = `<input type="text" id="${vornameId}" class="autoscale vornameeinziehmieter" style="min-width: 1px;">`;
    strasseCell.innerHTML = '<input type="text" class="phones autoscale teleinziehmieter" style="min-width: 1px;">';
    plzOrtCell.innerHTML = '<input type="email" class="mails autoscale maileinziehmieter" style="min-width: 1px;">';

    newRow1.appendChild(nameCell);
    newRow1.appendChild(vornameCell);
    newRow1.appendChild(strasseCell);
    newRow1.appendChild(plzOrtCell);

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

    const mieterInfo = document.createElement('div');
    mieterInfo.id = `einziehender-mieter-info-${counter}`;
    mieterInfo.style.marginTop = '-10px';
    mieterInfo.style.marginLeft = '11px';
    mieterInfo.style.fontWeight = 'bold';
    mieterInfo.style.textAlign = 'left';
    mieterInfo.innerHTML = `einziehender Mieter: <span id="einziehender-mieter-fullname-${counter}"></span>`;

    signatureContainer.appendChild(mieterInfo);

    const signatureContent = document.querySelector('.signature-content');
    signatureContent.appendChild(signatureContainer);

    initSignatureCanvas(`einziehender-mieter-signature-${counter}`);

    const nameInput = document.getElementById(nameId);
    const vornameInput = document.getElementById(vornameId);
    const fullNameSpan = document.getElementById(`einziehender-mieter-fullname-${counter}`);

    nameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));
    vornameInput.addEventListener('input', () => updateFullName(fullNameSpan, nameInput.value, vornameInput.value));

    let table2 = document.getElementById('einzugmieterTable');

    if (table2) {
        if (!table2.querySelector('thead')) {
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headers = [
                { text: 'Name', width: '30%' },
                { text: 'Vorname', width: '25%' },
                { text: 'Tel.:', width: '20%' },
                { text: 'E-Mail', width: '25%' }
            ];

            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.text;
                th.style.width = header.width;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);

            table2.insertBefore(thead, table2.querySelector('tbody'));
        }
    }
});



/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
document.addEventListener("DOMContentLoaded", function () {
    let counter = 1;

    // Button zum Hinzufügen eines ausziehenden Mieters
    document.getElementById('addausziehenderMieter').addEventListener('click', function () {
        let table = document.getElementById('auszugmieterTable');

        // Erstelle die Tabelle, falls sie noch nicht existiert
        if (!table) {
            table = document.createElement('table');
            table.id = 'auszugmieterTable';

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['Name, Vorname', 'neue Straße', 'PLZ / Ort', 'E-Mail'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                if (headerText === 'E-Mail') {
                    th.style.width = '118px'; // Breite der E-Mail-Spalte
                }
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            const button = document.getElementById('addausziehenderMieter');
            button.insertAdjacentElement('beforebegin', table);
        }

        // Neue Zeile für den ausziehenden Mieter erstellen
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const strasseCell = document.createElement('td');
        const plzOrtCell = document.createElement('td');
        const emailCell = document.createElement('td');

        const counter = document.querySelectorAll('.signature-container').length + 1;
        const nameId = `NameAus${counter.toString().padStart(2, '0')}`;

        nameCell.innerHTML = `
            <div class="input-container">
                <input type="text" id="${nameId}" class="autoscale" style="width: 220px; font-size: 24px;">
                <div class="size-controls">
                    <button class="font-plus" disabled="">+</button>
                    <button class="font-minus">-</button>
                </div>
            </div>`;
        strasseCell.innerHTML = `
            <div class="input-container">
                <input type="text" class="newstreets autoscale" style="width: 220px; font-size: 24px;">
                <div class="size-controls">
                    <button class="font-plus" disabled="">+</button>
                    <button class="font-minus">-</button>
                </div>
            </div>`;
        plzOrtCell.innerHTML = `
            <div class="input-container">
                <input type="text" class="plzauszug autoscale" style="width: 230px; font-size: 24px;">
                <div class="size-controls">
                    <button class="font-plus" disabled="">+</button>
                    <button class="font-minus">-</button>
                </div>
            </div>`;
        emailCell.innerHTML = `
            <div class="input-container">
                <input type="email" class="mails2 autoscale" style="width: 160px; font-size: 24px;">
                <div class="size-controls">
                    <button class="font-plus" disabled="">+</button>
                    <button class="font-minus">-</button>
                </div>
            </div>`;

        newRow.appendChild(nameCell);
        newRow.appendChild(strasseCell);
        newRow.appendChild(plzOrtCell);
        newRow.appendChild(emailCell);

        table.querySelector('tbody').appendChild(newRow);

        // Unterschriftenfeld und Namensanzeige erstellen
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
        mieterInfo.style.marginTop = '-10px';
        mieterInfo.style.marginLeft = '1px';
        mieterInfo.style.fontWeight = 'bold';
        mieterInfo.style.textAlign = 'left';
        mieterInfo.innerHTML = `ausziehender Mieter: <span id="ausziehender-mieter-fullname-${counter}"></span>`;

        signatureContainer.appendChild(mieterInfo);

        // Unterschriftenfeld und Namensanzeige in .signature-content einfügen (nach den einziehenden Mietern)
        const signatureContent = document.querySelector('.signature-content');
        if (signatureContent) {
            // Füge das neue Unterschriftenfeld nach den bestehenden Unterschriftenfeldern ein
            signatureContent.appendChild(signatureContainer);
        } else {
            console.error("Container mit der Klasse '.signature-content' nicht gefunden!");
        }

        // Signatur-Canvas initialisieren
        initSignatureCanvas(`ausziehender-mieter-signature-${counter}`);

        // Event-Listener für das Namensfeld
        const nameInput = document.getElementById(nameId);
        const fullNameSpan = document.getElementById(`ausziehender-mieter-fullname-${counter}`);

        nameInput.addEventListener('input', () => {
            const fullName = nameInput.value;
            updateFullName(fullNameSpan, fullName);
        });

        // Schriftgrößen-Steuerung für die neuen Input-Felder initialisieren
        const inputContainers = signatureContainer.querySelectorAll('.input-container');
        inputContainers.forEach(container => {
            const input = container.querySelector('input');
            const plusButton = container.querySelector('.font-plus');
            const minusButton = container.querySelector('.font-minus');
            initFontControls(input, plusButton, minusButton);
        });

        counter++;
    });

    // Funktion, um den Namen unter der Unterschrift anzuzeigen
    function updateFullName(fullNameSpan, fullName) {
        // Trenne den Namen in "Name" und "Vorname" basierend auf dem Komma
        const [name, vorname] = fullName.split(',').map(part => part.trim());

        // Setze den Namen im Format "Vorname Name"
        if (vorname && name) {
            fullNameSpan.textContent = `${vorname} ${name}`;
        } else {
            // Falls kein Komma vorhanden ist, zeige den gesamten Namen an
            fullNameSpan.textContent = fullName;
        }
    }

    // Funktion zur Initialisierung der Schriftgrößen-Steuerung
    function initFontControls(input, plusButton, minusButton) {
        let fontSize = parseFloat(window.getComputedStyle(input).fontSize);
        const minSize = 8; // Minimale Schriftgröße
        const maxSize = 24; // Maximale Schriftgröße
        const step = 4; // Schrittweite

        // Funktion zur Aktualisierung der Schriftgröße
        function updateFontSize(newSize) {
            fontSize = Math.min(Math.max(newSize, minSize), maxSize);
            input.style.fontSize = `${fontSize}px`;

            // Buttons deaktivieren, wenn Grenzwerte erreicht sind
            plusButton.disabled = fontSize >= maxSize;
            minusButton.disabled = fontSize <= minSize;
        }

        // Event-Listener für die Buttons
        plusButton.addEventListener('click', () => updateFontSize(fontSize + step));
        minusButton.addEventListener('click', () => updateFontSize(fontSize - step));

        // Initiale Schriftgröße setzen
        updateFontSize(fontSize);
    }
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

    // Vorhandene Unterschrift aus localStorage laden (mit canvasId als Schlüssel)
    loadSignatureFromLocalStorage(canvas, context, canvasId);

    // Beim Ändern der Bildschirmgröße neu skalieren
    window.addEventListener('resize', () => {
        resizeCanvas(canvas, context);
        loadSignatureFromLocalStorage(canvas, context, canvasId);
    });

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

        saveSignatureToLocalStorage(canvas, canvasId); // Unterschrift in localStorage speichern
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

    function saveSignatureToLocalStorage(canvas, canvasId) {
        const signatureData = canvas.toDataURL();
        const expirationTime = new Date().getTime() + 48 * 60 * 60 * 1000; // 48 Stunden in Millisekunden
        const signatureObject = {
            data: signatureData,
            expiration: expirationTime
        };
        localStorage.setItem(`signature_${canvasId}`, JSON.stringify(signatureObject));
    }

    function loadSignatureFromLocalStorage(canvas, context, canvasId) {
        const signatureObject = JSON.parse(localStorage.getItem(`signature_${canvasId}`));
        if (signatureObject && new Date().getTime() < signatureObject.expiration) {
            loadSignature(canvas, context, signatureObject.data);
        } else {
            localStorage.removeItem(`signature_${canvasId}`);
        }
    }

    function loadSignature(canvas, context, imageData) {
        if (!imageData) return;
        const img = new Image();
        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageData;
    }

    function resizeCanvas(canvas, context) {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            loadSignatureFromLocalStorage(canvas, context, canvasId);
        }
    }
}

// Funktion zum Löschen der Unterschrift
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem(`signature_${canvasId}`);
}


// Unterschriften Canvas-Größe dynamisch an Container anpassen
// Unterschriften Canvas-Größe dynamisch an Container anpassen
// Unterschriften Canvas-Größe dynamisch an Container anpassen
function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}



// Button Unterschriften löschen
// Button Unterschriften löschen
// Button Unterschriften löschen
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem(`signature_${canvasId}`);
        console.log(`Signatur auf Canvas mit ID ${canvasId} gelöscht.`);
    } else {
        console.error(`Canvas mit der ID ${canvasId} wurde nicht gefunden.`);
    }
}


// Unterschriftenfeld für Vermieter
// Unterschriftenfeld für Vermieter
// Unterschriftenfeld für Vermieter
window.onload = function () {
    initSignatureCanvas('vermieter-signature');
};














































/* Bemerkungszeile duplizieren */
/* Bemerkungszeile duplizieren */
/* Bemerkungszeile duplizieren */
// Funktion zum Duplizieren einer Zeile
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

    // Entferne die Markierung der ursprünglichen Zeile (falls vorhanden)
    newRow.classList.remove('original-row');

    // Füge die neue Zeile nach der aktuellen Zeile ein
    row.parentNode.insertBefore(newRow, row.nextSibling);
}


// Funktion zum Löschen einer Zeile
// Funktion zum Löschen einer Zeile
// Funktion zum Löschen einer Zeile
function deleteRow(button) {
    // Finde die aktuelle Zeile (die Zeile, in der der Button geklickt wurde)
    const row = button.closest('tr');

    // Überprüfe, ob die Zeile die ursprüngliche Zeile ist
    if (row.classList.contains('original-row')) {
        alert('Die ursprüngliche Zeile kann nicht gelöscht werden.');
        return; // Beende die Funktion, ohne die Zeile zu löschen
    }

    // Entferne die Zeile
    row.remove();
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
                        deleteButton.style.top = "-10px";
                        deleteButton.style.right = "-11px";
                        deleteButton.style.color = "white";
                        deleteButton.style.backgroundColor = "rgb(181, 45, 45)"; // Hintergrundfarbe rot
                        deleteButton.style.border = "none";
                        deleteButton.style.cursor = "pointer";
                        deleteButton.style.fontSize = "12px";
                        deleteButton.style.borderRadius = "15px";
                        deleteButton.style.padding = "3px 7px";

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

                        // Hochauflösendes Bild mit Titel in der gewünschten HTML-Struktur
                        let highResWrapper = document.createElement("div");
                        highResWrapper.className = "large-image-wrapperxxx";
                        /* highResWrapper.id = `large-wrapper-img-${storedImages.length}-${Math.random().toString(36).substr(2, 9)}`; */
                        highResWrapper.id = `largexxx-wrapperxxx-imgxxx-${storedImages.length}-${Math.random().toString(36).substr(2, 9)}`;

                        let titleElement = document.createElement("p");
                        titleElement.textContent = title;

                        let imgHighRes = document.createElement("img");
                        imgHighRes.src = scaledImageSrc;
                        imgHighRes.style.display = "block";
                        /*   imgHighRes.style.maxWidth = "950px"; */
                        imgHighRes.style.width = "auto";
                        imgHighRes.style.height = "600px";
                        imgHighRes.style.border = "1px solid #ccc";
                        imgHighRes.style.borderRadius = "5px";
                        imgHighRes.style.margin = "0 auto";
                        imgHighRes.style.marginBottom = "25px";

                        let deleteButtonHighRes = document.createElement("button");
                        deleteButtonHighRes.className = "delete-btn";
                        deleteButtonHighRes.textContent = "X";
                        deleteButtonHighRes.style.color = "white";
                        deleteButtonHighRes.style.backgroundColor = "rgb(181, 45, 45)";
                        deleteButtonHighRes.style.border = "none";
                        deleteButtonHighRes.style.cursor = "pointer";
                        deleteButtonHighRes.style.fontSize = "12px";
                        deleteButtonHighRes.style.borderRadius = "15px";
                        deleteButtonHighRes.style.padding = "3px 7px";

                        // Löschen-Funktion für das hochauflösende Bild
                        deleteButtonHighRes.addEventListener("click", function () {
                            highResWrapper.remove(); // Entfernt das hochauflösende Bild
                            imgWrapper.remove(); // Entfernt das Miniaturbild
                            URL.revokeObjectURL(scaledImageSrc); // Gibt den Blob-URL frei

                            // Entferne das Bild aus localStorage
                            storedImages = storedImages.filter(img => img.imageUrl !== scaledImageSrc);
                            localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
                        });

                        highResWrapper.appendChild(titleElement);
                        highResWrapper.appendChild(imgHighRes);
                        highResWrapper.appendChild(deleteButtonHighRes);
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
    // Funktion zum Formatieren des Datums
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Funktion zum Aktualisieren der Signaturfelder
    function updateSignFields() {
        // Werte aus den Input-Feldern holen und ein Komma anhängen
        const strasse = document.getElementById("strasseeinzug").value + ",";
        const lage = document.getElementById("lageeinzug2").value + ",";
        const plz = document.getElementById("plzeinzug").value + ",";
        const datum = formatDate(document.getElementById("datum").value); // Datum formatieren

        // Werte in die Signaturfelder schreiben
        document.getElementById("strasseeinzugsign").textContent = strasse;
        document.getElementById("lageeinzugsign").textContent = lage;
        document.getElementById("plzeinzugsign").textContent = plz;
        document.getElementById("datumsign").textContent = datum;
    }

    // Event-Listener für Input-Felder hinzufügen
    document.getElementById("strasseeinzug").addEventListener("input", updateSignFields);
    document.getElementById("lageeinzug2").addEventListener("input", updateSignFields);
    document.getElementById("plzeinzug").addEventListener("input", updateSignFields);
    document.getElementById("datum").addEventListener("input", updateSignFields);

    // MutationObserver, um programmatische Änderungen zu überwachen
    const observerConfig = { attributes: true, childList: true, subtree: true };

    const strasseObserver = new MutationObserver(updateSignFields);
    const lageObserver = new MutationObserver(updateSignFields);
    const plzObserver = new MutationObserver(updateSignFields);
    const datumObserver = new MutationObserver(updateSignFields);

    strasseObserver.observe(document.getElementById("strasseeinzug"), observerConfig);
    lageObserver.observe(document.getElementById("lageeinzug2"), observerConfig);
    plzObserver.observe(document.getElementById("plzeinzug"), observerConfig);
    datumObserver.observe(document.getElementById("datum"), observerConfig);

    // Beim Laden der Seite sofort die Signaturfelder aktualisieren
    updateSignFields();
});














































// Datum automatisch einfügen
// Datum automatisch einfügen
// Datum automatisch einfügen
document.addEventListener("DOMContentLoaded", function () {
    // Hole das heutige Datum
    const heute = new Date();

    // Formatiere das Datum im Format YYYY-MM-DD
    const jahr = heute.getFullYear();
    const monat = String(heute.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert
    const tag = String(heute.getDate()).padStart(2, '0');
    const heutigesDatum = `${jahr}-${monat}-${tag}`;

    // Setze das heutige Datum in das Datumsfeld
    document.getElementById("datum").value = heutigesDatum;
});


// prüfen ob es eine gültige E-Mailadrese im Input isFinite
// prüfen ob es eine gültige E-Mailadrese im Input isFinite
// prüfen ob es eine gültige E-Mailadrese im Input isFinite
function validateEmail(email) {
    // Einfache Regex-Überprüfung für E-Mail-Adressen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Funktion zur Anzeige von Fehlermeldungen
function showError(inputElement, message) {
    // Entferne vorhandene Fehlermeldungen
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    // Erstelle eine neue Fehlermeldung
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '12px';
    errorMessage.textContent = message;

    // Füge die Fehlermeldung nach dem Eingabefeld ein
    inputElement.insertAdjacentElement('afterend', errorMessage);
}
// Funktion zur Entfernung von Fehlermeldungen
function clearError(inputElement) {
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}
// Warte, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    // Hole das E-Mail-Eingabefeld
    const emailInput = document.querySelector('.mails.autoscale');

    // Füge Event-Listener für das "input"- und "blur"-Event hinzu
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const email = emailInput.value.trim(); // Hole den eingegebenen Wert und entferne Leerzeichen

            // Überprüfe, ob die E-Mail-Adresse gültig ist
            if (email && !validateEmail(email)) {
                showError(emailInput, "gültige E-Mail Adresse eingeben");
                clearError(emailInput); // Entferne die Fehlermeldung, wenn die E-Mail gültig ist
            }
        });

        emailInput.addEventListener('blur', function () {
            const email = emailInput.value.trim(); // Hole den eingegebenen Wert und entferne Leerzeichen

            // Überprüfe, ob die E-Mail-Adresse gültig ist
            if (email && !validateEmail(email)) {
                showError(emailInput, "gültige E-Mail Adresse eingeben");
            } else {
                clearError(emailInput); // Entferne die Fehlermeldung, wenn die E-Mail gültig ist
            }
        });
    }
});


// maximale Zeichenanzeil für Bemerkungszeilen
// maximale Zeichenanzeil für Bemerkungszeilen
// maximale Zeichenanzeil für Bemerkungszeilen
const inputFields = document.querySelectorAll('input.dupli.autoscale');
inputFields.forEach((input) => {
    input.setAttribute('maxlength', '115');
    input.style.fontSize = '18px';
    input.addEventListener('input', () => {
        if (input.value.length > 115) {
            input.value = input.value.slice(0, 115);
        }
    });
});



// Funktion zum Formatieren des Datums im Feld bei REnovierungsverplfichtung
// Funktion zum Formatieren des Datums im Feld bei REnovierungsverplfichtung
// Funktion zum Formatieren des Datums im Feld bei REnovierungsverplfichtung
function formatDate(inputDate) {
    const date = new Date(inputDate); // Datumsobjekt erstellen
    const day = String(date.getDate()).padStart(2, '0'); // Tag (mit führender Null)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Monat (mit führender Null)
    const year = date.getFullYear(); // Jahr
    return `${day}.${month}.${year}`; // Datum im Format DD.MM.YYYY zurückgeben
}

// Event-Listener für das Datums-Input-Feld
document.getElementById('arbeitsdatum').addEventListener('change', function () {
    const inputDate = this.value; // Wert des Input-Felds
    const formattedDate = formatDate(inputDate); // Datum formatieren
    document.getElementById('formatted-date').textContent = formattedDate; // Formatiertes Datum anzeigen
});





// Hinweis, wenn Steie geschlossen oder neu geladen wird.
// Hinweis, wenn Steie geschlossen oder neu geladen wird.
// Hinweis, wenn Steie geschlossen oder neu geladen wird.
let allowUnload = false;
window.addEventListener('beforeunload', function (event) {
    if (!allowUnload) {
        const confirmationMessage = 'Möchten Sie die Seite wirklich verlassen? Alle Eingaben gehen dadurch verloren.';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});
document.getElementById('newTabButton').addEventListener('click', function () {
    allowUnload = true;
    window.open('https://www.google.com', '_blank');
    setTimeout(() => { allowUnload = false; }, 1000);
});
window.addEventListener('beforeunload', function (event) {
    const confirmationMessage = 'Möchten Sie die Seite wirklich verlassen? Alle Eingaben gehen dadurch verloren.';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
}); 

// Funktion, um den Namen unter der Unterschrift anzuzeigen
// Funktion, um den Namen unter der Unterschrift anzuzeigen
// Funktion, um den Namen unter der Unterschrift anzuzeigen
function updateFullName(fullNameSpan, fullName) {
    // Trenne den Namen in "Name" und "Vorname" basierend auf dem Komma
    const [name, vorname] = fullName.split(',').map(part => part.trim());

    // Setze den Namen im Format "Vorname Name"
    if (vorname && name) {
        fullNameSpan.textContent = `${vorname} ${name}`;
    } else {
        // Falls kein Komma vorhanden ist, zeige den gesamten Namen an
        fullNameSpan.textContent = fullName;
    }
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
                        <option value="wohnung">Wohnungstür</option>
                        <option value="wohnunghaustuer">Haustür inkl. Wohnungstür</option>
                        <option value="briefkasten">Briefkasten</option>
                        <option value="keller">Keller</option>
                        <option value="dachboden">Dachboden</option>
                        <option value="garage">Garage</option>
                        <option value="garage">Doppelparkanlage</option>
                        <option value="fahrradbereich">Fahrradbereich</option>
                        <option value="abstellraum">Abstellraum</option>
                        <option value="buero">Büro</option>
                        <option value="lagerraum">Lagerraum</option>
                        <option value="muellraum">Müllraum</option>
                        <option value="sonstige">Sonstige</option>
            
        </select>`;

    const anzahlCell = document.createElement('td');
    anzahlCell.innerHTML = '<input type="number" placeholder="" style="width: 100%;">';

    const schluesselnummerCell = document.createElement('td');
    schluesselnummerCell.innerHTML = '<input type="text" placeholder="" class="autoscale" style="width: 100%;">';

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
            { text: 'Zählerstand', width: '166px' }
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
    zaehlernummerCell.innerHTML = '<input type="text" placeholder="" class="metercounter autoscale" style="width:170px;">';

    const einbaulageCell = document.createElement('td');
    einbaulageCell.innerHTML = '<input type="text" placeholder="" class="autoscale" style="width: 100%;">';

    const zaehlerstandCell = document.createElement('td');
    zaehlerstandCell.innerHTML = '<input type="text" placeholder="" class="meterstand autoscale" style="width:166px;">';

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
            let arrow = header.querySelector("span.arrows00"); // Suche nach einem span mit der Klasse arrows00
            if (!arrow) {
                arrow = document.createElement("span");
                arrow.textContent = " ▼";
                arrow.classList.add("arrows00"); // Füge die Klasse arrows00 hinzu
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

// Vorname und Nachname unter die Unterschriftenfelder setzen xxx
// Vorname und Nachname unter die Unterschriftenfelder setzen
// Vorname und Nachname unter die Unterschriftenfelder setzen
function updateFullName(fullNameSpan, name, vorname) {
    fullNameSpan.textContent = name && vorname ? `${vorname} ${name}` : '';
}

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
                    h3.style.color = "#c80000";
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
                    h3.style.color = "#c80000";
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
