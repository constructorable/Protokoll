/* Copyright - Oliver Acker, acker_oliver@yahoo.de
script.js
Version 3.32_beta */

/* CSS Styles zum toggeln... */
/* CSS Styles zum toggeln... */
/* CSS Styles zum toggeln... */
document.addEventListener("DOMContentLoaded", function () {
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





const toggleBtn = document.getElementById("toggleStickyBtn");
const stickyContainer = document.getElementById("stickyContainer");

toggleBtn.addEventListener("click", () => {
  const isOpen = stickyContainer.getAttribute("data-state") === "open";
  
  if (isOpen) {
    // Menü schließen
    stickyContainer.setAttribute("data-state", "closed");
    toggleBtn.setAttribute("data-state", "closed");
  } else {
    // Menü öffnen
    stickyContainer.setAttribute("data-state", "open");
    toggleBtn.setAttribute("data-state", "open");
  }
});




/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
/* Button einziehender Mieter hinzufügen (inkl. Unterschriftenfeld für einziehenden Mieter)... */
document.addEventListener("DOMContentLoaded", function () {
    let counterEinziehender = 1;

    document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
        let table = document.getElementById('einzugmieterTable');

        // Tabellen-Header nur einmal erstellen
        if (!table.querySelector('thead')) {
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
        }

        // Neue Zeile erstellen
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const vornameCell = document.createElement('td');
        const telefonCell = document.createElement('td');
        const emailCell = document.createElement('td');

        const counter1 = document.querySelectorAll('.signature-container').length + 1;
        const suffix1 = counter1.toString().padStart(2, '0');

        const nameId = `NameEin${suffix1}`;
        const vornameId = `VornameEin${suffix1}`;
        const telefonId = `TelefonEin${suffix1}`;
        const emailId = `MailEin${suffix1}`;

        nameCell.innerHTML = `
        <input type="text" id="${nameId}" class="autoscale nameeinziehmieter" 
               style="min-width: 1px;" placeholder="Nachname einziehender Mieter">`;

        vornameCell.innerHTML = `
        <input type="text" id="${vornameId}" class="autoscale vornameeinziehmieter" 
               style="min-width: 1px;" placeholder="Vorname">`;

        telefonCell.innerHTML = `
        <input type="text" id="${telefonId}" class="phones autoscale teleinziehmieter" 
               style="min-width: 1px;" placeholder="Telefon">`;

        emailCell.innerHTML = `
        <input type="email" id="${emailId}" class="mails autoscale maileinziehmieter" 
               style="min-width: 1px;" placeholder="E-Mail">`;

        newRow.appendChild(nameCell);
        newRow.appendChild(vornameCell);
        newRow.appendChild(telefonCell);
        newRow.appendChild(emailCell);


        // Zeile am ENDE der Tabelle einfügen
        table.querySelector('tbody').appendChild(newRow);



        // Signatur-Container erstellen
        const signatureContainer = document.createElement('div');
        signatureContainer.classList.add('signature-container');
        signatureContainer.id = `signature-container-einziehender-mieter-${counter1}`;

        const signatureBox = document.createElement('div');
        signatureBox.classList.add('signature-box');

        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.classList.add('signature-clear-btn');
        clearButton.textContent = 'x';
        clearButton.onclick = () => clearSignature(`einziehender-mieter-signature-${counter1}`);
        signatureBox.appendChild(clearButton);

        const canvas = document.createElement('canvas');
        canvas.id = `einziehender-mieter-signature-${counter1}`;
        canvas.classList.add('signature-canvas3');
        signatureBox.appendChild(canvas);

        signatureContainer.appendChild(signatureBox);

        const mieterInfo = document.createElement('div');
        mieterInfo.id = `einziehender-mieter-info-${counter1}`;
        mieterInfo.style.marginTop = '-10px';
        mieterInfo.style.marginLeft = '11px';
        mieterInfo.style.fontWeight = 'bold';
        mieterInfo.style.textAlign = 'left';
        mieterInfo.innerHTML = `einziehender Mieter: <span id="einziehender-mieter-fullname-${counter1}"></span>`;

        signatureContainer.appendChild(mieterInfo);

        // Signatur-Container einfügen
        const signatureContent = document.querySelector('.signature-content');
        if (signatureContent) {
            signatureContent.appendChild(signatureContainer);
        }

        // Signatur-Canvas initialisieren
        initSignatureCanvas(`einziehender-mieter-signature-${counter1}`);

        // Event-Listener für Namensaktualisierung
        const nameInput = document.getElementById(nameId);
        const vornameInput = document.getElementById(vornameId);
        const fullNameSpan = document.getElementById(`einziehender-mieter-fullname-${counter1}`);

        nameInput.addEventListener('input', () => {
            updateFullName(fullNameSpan, nameInput.value, vornameInput.value);
        });

        vornameInput.addEventListener('input', () => {
            updateFullName(fullNameSpan, nameInput.value, vornameInput.value);
        });

        counterEinziehender++;
    });

    // Hilfsfunktion für Namen unter Unterschrift
    function updateFullName(fullNameSpan, lastName, firstName) {
        fullNameSpan.textContent = `${firstName || ''} ${lastName || ''}`.trim();
    }
});


/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
/* Button ausziehender Mieter hinzufügen (inkl. Unterschriftenfeld für ausziehenden Mieter)... */
document.addEventListener("DOMContentLoaded", function () {
    let counterAusziehender = 1;

    document.getElementById('addausziehenderMieter').addEventListener('click', function () {
        let table = document.getElementById('auszugmieterTable');

        if (!table) {
            table = document.createElement('table');
            table.id = 'auszugmieterTable';

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['Name, Vorname', 'neue Straße', 'PLZ / Ort', 'E-Mail'];

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
        const strasseCell = document.createElement('td');
        const plzOrtCell = document.createElement('td');
        const emailCell = document.createElement('td');

        const suffix2 = counterAusziehender.toString().padStart(2, '0');
        const nameId = `NameAus${suffix2}`;
        const strasseId = `StrasseAus${suffix2}`;
        const plzOrtId = `PLZOrtAus${suffix2}`;
        const emailId = `MailAus${suffix2}`;

        nameCell.innerHTML = `
            <input type="text" id="${nameId}" class="autoscale" placeholder="Vor- und Nachname ausziehender Mieter">`;

        strasseCell.innerHTML = `
            <input type="text" id="${strasseId}" class="newstreets autoscale" placeholder="neue Straße">`;

        plzOrtCell.innerHTML = `
            <input type="text" id="${plzOrtId}" class="plzauszug autoscale" placeholder="PLZ / Ort">`;

        emailCell.innerHTML = `
            <input type="email" id="${emailId}" style="width: 11px;" class="mails2 autoscale" placeholder="E-Mail">`;

        newRow.appendChild(nameCell);
        newRow.appendChild(strasseCell);
        newRow.appendChild(plzOrtCell);
        newRow.appendChild(emailCell);
        table.querySelector('tbody').appendChild(newRow);



        // Signatur-Container
        const signatureContainer = document.createElement('div');
        signatureContainer.classList.add('signature-container');
        signatureContainer.id = `signature-container-ausziehender-mieter-${counterAusziehender}`;

        const signatureBox = document.createElement('div');
        signatureBox.classList.add('signature-box');

        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.classList.add('signature-clear-btn');
        clearButton.textContent = 'x';
        // Neuer Event-Handler:
        clearButton.onclick = function () {
            const canvas = this.parentElement.querySelector('canvas');
            if (canvas) {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                localStorage.removeItem(`signature_${canvas.id}`);
            }
        };





        signatureBox.appendChild(clearButton);

        const canvas = document.createElement('canvas');
        canvas.id = `ausziehender-mieter-signature-${counterAusziehender}`;
        canvas.classList.add('signature-canvas');
        signatureBox.appendChild(canvas);

        signatureContainer.appendChild(signatureBox);

        const mieterInfo = document.createElement('div');
        mieterInfo.id = `ausziehender-mieter-info-${counterAusziehender}`;
        mieterInfo.style.marginTop = '-10px';
        mieterInfo.style.marginLeft = '1px';
        mieterInfo.style.fontWeight = 'bold';
        mieterInfo.style.textAlign = 'left';
        mieterInfo.innerHTML = `ausziehender Mieter: <span id="ausziehender-mieter-fullname-${counterAusziehender}"></span>`;
        signatureContainer.appendChild(mieterInfo);

        const signatureContent = document.querySelector('.signature-content');
        if (signatureContent) {
            signatureContent.appendChild(signatureContainer);
        }

        initSignatureCanvas(`ausziehender-mieter-signature-${counterAusziehender}`);

        const nameInput = document.getElementById(nameId);
        const fullNameSpan = document.getElementById(`ausziehender-mieter-fullname-${counterAusziehender}`);

        nameInput.addEventListener('input', () => {
            const fullName = nameInput.value;
            updateFullName(fullNameSpan, fullName);
        });

        counterAusziehender++;
    });

    function updateFullName(fullNameSpan, fullName) {
        const [name, vorname] = fullName.split(',').map(part => part.trim());
        fullNameSpan.textContent = vorname && name ? `${vorname} ${name}` : fullName;
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

        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 Stunden werden die Unterschriften gespeichert. 
        const signatureObject = {
            data: signatureData,
            expiration: expirationTime
        };
        localStorage.setItem(`signature_${canvasId}`, JSON.stringify(signatureObject));
    }

    function loadSignatureFromLocalStorage(canvas, context, canvasId) {
        const storedData = localStorage.getItem(`signature_${canvasId}`);

        // 1. Keine Daten vorhanden? → Abbruch
        if (!storedData) return;

        try {
            const signatureObject = JSON.parse(storedData);

            // 2. Prüfe, ob das Objekt gültig ist
            if (!signatureObject?.data || !signatureObject?.expiration) {
                throw new Error("Ungültiges Unterschriftsformat");
            }

            // 3. Prüfe, ob die Unterschrift noch gültig ist
            const now = new Date().getTime();
            if (now < signatureObject.expiration) {
                loadSignature(canvas, context, signatureObject.data);
            } else {
                // Abgelaufen → aus localStorage löschen
                localStorage.removeItem(`signature_${canvasId}`);
            }
        } catch (error) {
            console.error("Fehler beim Laden der Unterschrift:", error);
            // Beschädigte Daten löschen
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
/* function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem(`signature_${canvasId}`);
}
 */

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
/* function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem(`signature_${canvasId}`);
        console.log(`Signatur auf Canvas mit ID ${canvasId} gelöscht.`);
    } else {
        console.error(`Canvas mit der ID ${canvasId} wurde nicht gefunden.`);
    }
} */


function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem(`signature_${canvasId}`);
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

/* function duplicateRow(button) {
    const row = button.closest('tr');

    const newRow = row.cloneNode(true);

    const inputField = newRow.querySelector('input.dupli');
    if (inputField) {
        inputField.value = '';
    }

    // Entferne die Markierung der ursprünglichen Zeile (falls vorhanden)
    newRow.classList.remove('original-row');

    // Füge die neue Zeile nach der aktuellen Zeile ein
    row.parentNode.insertBefore(newRow, row.nextSibling);
}
 */

function duplicateRow(button) {
    const row = button.closest('tr');
    const newRow = row.cloneNode(true);
    const inputField = newRow.querySelector('input.dupli');

    if (inputField) {
        inputField.value = '';

        // Raum-Container ermitteln (z. B. div id="jueche")
        const roomContainer = button.closest('div.rooms') || button.closest('div[id^="j"]');
        if (!roomContainer) {
            console.warn("Raum nicht gefunden – ID kann nicht gesetzt werden.");
            return;
        }

        const roomId = roomContainer.id; // z. B. "jueche"
        const prefix = 'dupli' + roomId.replace(/^j/, ''); // z. B. "duplikueche"

        // Zähle vorhandene IDs in diesem Raum, die mit dem Prefix beginnen
        const existingInputs = roomContainer.querySelectorAll(`input.dupli[id^="${prefix}"]`);
        const count = existingInputs.length + 1; // neue Nummer

        // ID setzen (zweistellig, z. B. "duplikuech01")
        const newId = `${prefix}${count.toString().padStart(2, '0')}`;
        inputField.id = newId;
    }

    newRow.classList.remove('original-row');
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
                    const maxWidth = 3000;
                    const maxHeight = 3000;
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
                            imgWrapper.remove();
                            highResWrapper.remove();
                            URL.revokeObjectURL(scaledImageSrc);

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
                        highResWrapper.id = `largexxx-wrapperxxx-imgxxx-${storedImages.length}-${Math.random().toString(36).substr(2, 9)}`;

                        let titleElement = document.createElement("p");
                        titleElement.textContent = title;

                        let imgHighRes = document.createElement("img");
                        imgHighRes.src = scaledImageSrc;
                        imgHighRes.style.display = "block";
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
                            highResWrapper.remove();
                            imgWrapper.remove();
                            URL.revokeObjectURL(scaledImageSrc);

                            // Entferne das Bild aus localStorage
                            storedImages = storedImages.filter(img => img.imageUrl !== scaledImageSrc);
                            localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
                        });

                        highResWrapper.appendChild(titleElement);
                        highResWrapper.appendChild(imgHighRes);
                        highResWrapper.appendChild(deleteButtonHighRes);
                        signContainer.appendChild(highResWrapper);
                    }, 'image/jpeg', 0.7);
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
    setTimeout(function () {
        function formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }

        // Verbesserte Update-Funktion mit Fehlerbehandlung
        function updateSignFields() {
            try {
                const strasse = document.getElementById("strasseeinzug")?.value + "," || "";
                const lage = document.getElementById("lageeinzug2")?.value + "," || "";
                const plz = document.getElementById("plzeinzug")?.value + "," || "";
                const mieterid = document.getElementById("mieterid")?.value + "," || "";
                const datum = formatDate(document.getElementById("datum")?.value);

                // Sicherstellen, dass die Signaturfelder existieren
                const strasseSign = document.getElementById("strasseeinzugsign");
                const lageSign = document.getElementById("lageeinzugsign");
                const plzSign = document.getElementById("plzeinzugsign");
                const mieteridSign = document.getElementById("mieteridsign");
                const datumSign = document.getElementById("datumsign");

                if (strasseSign) strasseSign.textContent = strasse;
                if (lageSign) lageSign.textContent = lage;
                if (plzSign) plzSign.textContent = plz;
                if (mieteridSign) mieteridSign.textContent = mieterid;
                if (datumSign) datumSign.textContent = datum;
            } catch (error) {
                console.error("Fehler beim Aktualisieren der Signaturfelder:", error);
            }
        }

        // Verbesserte Mieternummer-Handling
        function handleMieterIdChange() {
            try {
                const mieterIdInput = document.getElementById("mieterid");
                if (!mieterIdInput || !window.strassen) return;

                const fullValue = window.strassen.find(s =>
                    s.mieternummer.startsWith(mieterIdInput.value)
                )?.mieternummer;

                if (fullValue) {
                    mieterIdInput.value = fullValue;
                }
                updateSignFields();
            } catch (error) {
                console.error("Fehler bei Mieternummer-Update:", error);
            }
        }

        // Event-Listener mit Debounce
        function setupEventListeners() {
            const debounce = (func, delay) => {
                let timeout;
                return function () {
                    const context = this;
                    const args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), delay);
                };
            };

            const fields = [
                { id: "mieterid", handler: debounce(handleMieterIdChange, 500) },
                { id: "strasseeinzug", handler: updateSignFields },
                { id: "lageeinzug2", handler: updateSignFields },
                { id: "plzeinzug", handler: updateSignFields },
                { id: "datum", handler: updateSignFields }
            ];

            fields.forEach(field => {
                const element = document.getElementById(field.id);
                if (element) {
                    element.addEventListener("input", field.handler);
                    element.addEventListener("change", updateSignFields);
                }
            });
        }

        // Robustere MutationObserver-Implementierung
        function setupMutationObserver() {
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                        updateSignFields();
                    }
                });
            });

            const fields = ["strasseeinzug", "lageeinzug2", "plzeinzug", "mieterid", "datum"];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element, {
                        attributes: true,
                        attributeFilter: ['value'],
                        subtree: true
                    });
                }
            });
        }

        // Initialisierung
        setupEventListeners();
        setupMutationObserver();
        updateSignFields();

        // Fallback: Regelmäßige Überprüfung (falls nötig)
        setInterval(updateSignFields, 60000);
    }, 60000);
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



// Funktion zum Formatieren des Datums im Feld bei Renovierungsverpflichtung
// Funktion zum Formatieren des Datums im Feld bei Renovierungsverpflichtung
// Funktion zum Formatieren des Datums im Feld bei Renovierungsverpflichtung
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
/* document.getElementById('newTabButton').addEventListener('click', function () {
    allowUnload = true;
    window.open('https://www.google.com', '_blank');
    setTimeout(() => { allowUnload = false; }, 1000);
}); */
window.addEventListener('beforeunload', function (event) {
    const confirmationMessage = 'Möchten Sie die Seite wirklich verlassen? Alle Eingaben gehen dadurch verloren.';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
});



// Funktion, um den Namen unter der Unterschrift anzuzeigen
// Funktion, um den Namen unter der Unterschrift anzuzeigen
// Funktion, um den Namen unter der Unterschrift anzuzeigen
function updateFullName(fullNameSpan, fullName) {
    const [name, vorname] = fullName.split(',').map(part => part.trim());
    if (vorname && name) {
        fullNameSpan.textContent = `${vorname} ${name}`;
    } else {
        fullNameSpan.textContent = fullName;
    }
}



/* Button Schlüssel hinzufügen */
/* Button Schlüssel hinzufügen */
/* Button Schlüssel hinzufügen */
document.getElementById('addKeyButton').addEventListener('click', function () {
    const tableContainer = document.getElementById('schluesselTableContainer');
    let table = document.getElementById('schluesselTable');

    if (!table) {
        table = document.createElement('table');
        table.id = 'schluesselTable';

        const style = document.createElement('style');
        style.textContent = `
            #schluesselTable {
                width: 100%;
                border-collapse: collapse;
            }
            #schluesselTable th, #schluesselTable td {
                padding: 8px;
                padding-top: 0px;
                padding-bottom: 0px;
            }
            #schluesselTable th:nth-child(1), #schluesselTable td:nth-child(1) {
                width: 300px;
            }
            #schluesselTable th:nth-child(2), #schluesselTable td:nth-child(2) {
                width: 90px;
                border: none;
            }
            #schluesselTable th:nth-child(3), #schluesselTable td:nth-child(3) {
                width: auto;
                border: none;
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
        tableContainer.appendChild(table);
    }

    const counter3 = table.querySelectorAll('tbody tr').length + 1;
    const suffix3 = counter3.toString().padStart(2, '0');

    const idBezeichnung = `SchluesselArt${suffix3}`;
    const idAnzahl = `SchluesselAnz${suffix3}`;
    const idBemerkung = `SchluesselBem${suffix3}`;

    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    bezeichnungCell.innerHTML = `
        <select id="${idBezeichnung}" style="width: 100%;">
            <option value="leer"></option>
            <option value="haustuer">Haustür</option>
            <option value="wohnung">Wohnungstür</option>
            <option value="wohnunghaustuer">Haustür inkl. Wohnungstür</option>
            <option value="briefkasten">Briefkasten</option>
            <option value="keller">Keller</option>
            <option value="dachboden">Dachboden</option>
            <option value="garage">Garage</option>
            <option value="doppelparkanlage">Doppelparkanlage</option>
            <option value="fahrradbereich">Fahrradbereich</option>
            <option value="abstellraum">Abstellraum</option>
            <option value="buero">Büro</option>
            <option value="lagerraum">Lagerraum</option>
            <option value="muellraum">Müllraum</option>
            <option value="sonstige">Sonstige</option>
        </select>`;

    const anzahlCell = document.createElement('td');
    anzahlCell.innerHTML = `<input type="number" id="${idAnzahl}" placeholder="" style="width: 100%;">`;

    const schluesselnummerCell = document.createElement('td');
    schluesselnummerCell.innerHTML = `<input type="text" id="${idBemerkung}" placeholder="" class="autoscale" style="width: 100%;">`;

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(anzahlCell);
    newRow.appendChild(schluesselnummerCell);

    table.querySelector('tbody').appendChild(newRow);
});




/* Button Zähler hinzufügen */
/* Button Zähler hinzufügen */
/* Button Zähler hinzufügen */
document.getElementById('addZaehlerButton').addEventListener('click', function () {
    const tableContainer = document.getElementById('zaehlerTableContainer');
    let table = document.getElementById('zaehlerTable');

    if (!table) {
        table = document.createElement('table');
        table.id = 'zaehlerTable';
        table.style.width = '100%';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = [
            { text: 'Bezeichnung', width: '230px' },
            { text: 'Zählernummer', width: '250px' },
            { text: 'Einbaulage', width: '290px' },
            { text: 'Zählerstand', width: '166px' }
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

        tableContainer.appendChild(table);
    }

    // Zähler für eindeutige ID
    const counter4 = table.querySelectorAll('tbody tr').length + 1;
    const suffix4 = counter4.toString().padStart(2, '0');

    // Eindeutige IDs
    const idBezeichnung = `ZaehlerArt${suffix4}`;
    const idNummer = `ZaehlerNummer${suffix4}`;
    const idEinbau = `Einbaulage${suffix4}`;
    const idStand = `Zaehlerstand${suffix4}`;

    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    bezeichnungCell.innerHTML = `
        <select id="${idBezeichnung}" style="width:230px;">
            <option value="leer"></option>
            <option value="gaszaehler">Gaszähler</option>
            <option value="stromzaehler">Stromzähler</option>
            <option value="waermezaehler">Wärmezähler</option>
            <option value="wassertemperaturKalt">Wasserzähler (kalt)</option>
            <option value="wassertemperaturWarm">Wasserzähler (warm)</option>
            <option value="heizkostenverteiler">Heizkostenverteiler</option>
        </select>`;

    const zaehlernummerCell = document.createElement('td');
    zaehlernummerCell.innerHTML = `<input type="text" id="${idNummer}" class="metercounter autoscale" style="width:250px;">`;

    const einbaulageCell = document.createElement('td');
    einbaulageCell.innerHTML = `<input type="text" id="${idEinbau}" class="autoscale" style="width: 100%;">`;

    const zaehlerstandCell = document.createElement('td');
    zaehlerstandCell.innerHTML = `<input type="number" id="${idStand}" class="meterstand autoscale" style="width:166px;">`;

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(zaehlernummerCell);
    newRow.appendChild(einbaulageCell);
    newRow.appendChild(zaehlerstandCell);

    table.querySelector('tbody').appendChild(newRow);
});



// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorhanden" auf "nein" geklickt wird.
// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorhanden" auf "nein" geklickt wird.
// Räume bzw. derein Eigenschaften ausblenden, wenn "Raum vorhanden" auf "nein" geklickt wird.
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
                /* arrow.textContent = " ▼"; */
                /* arrow.classList.add("arrows00"); */
                /* arrow.style.transition = "transform 0.3s ease"; */
                /* header.appendChild(arrow); */
            }

            content.style.display = "table"; // Räume sollen offen sein
            /* header.style.cursor = "pointer"; */
            /*             header.style.display = "flex";
                        header.style.justifyContent = "space-between";
                        header.style.alignItems = "center"; */

            /*   header.addEventListener("click", function () {
                  toggleRoom(header, content, arrow);
              }); */
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
document.addEventListener("click", function (event) {
    const target = event.target;

    if (target && target.matches('input[type="radio"]')) {
        if (target.checked && target.dataset.previouslyChecked === "true") {
            target.checked = false;
            target.dataset.previouslyChecked = "";
        } else {
            // Alle anderen Radios mit dem gleichen Namen zurücksetzen
            const radiosSameName = document.querySelectorAll(`input[name="${target.name}"]`);
            radiosSameName.forEach(r => r.dataset.previouslyChecked = "");

            // Diesen markieren
            target.dataset.previouslyChecked = "true";
        }
    }
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
document.addEventListener("DOMContentLoaded", function() {
    // Allgemeine Funktion zur Überprüfung von Tabelleninhalten
    function checkSection(sectionId, defaultText, activeText) {
        const section = document.getElementById(sectionId);
        const hasContent = section && (
            section.querySelector('input') || 
            section.querySelector('select') ||
            section.querySelector('tbody tr:not(#addausziehenderMieterRow)')
        );
        
        const headers = document.querySelectorAll('h3');
        headers.forEach(header => {
            if (header.textContent.includes(defaultText)) {  // Hier fehlte die schließende Klammer
                if (hasContent) {
                    header.textContent = activeText;
                    header.style.color = "black";
                    header.style.borderBottom = "0px solid black";
                    header.style.paddingBottom = "0px";
                }
            } else if (header.textContent.includes(activeText)) {
                if (!hasContent) {
                    header.textContent = defaultText;
                    header.style.color = "#c80000";
                    header.style.borderBottom = "1px solid black";
                    header.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Spezielle Funktion für einziehende Mieter
    function checkEinziehendeMieter() {
        const hasEinziehende = document.querySelectorAll('#einzugmieterTable input').length > 0;
        const headers = document.querySelectorAll('h3');
        
        headers.forEach(header => {
            if (header.textContent.includes("einziehender Mieter")) {
                if (hasEinziehende) {
                    header.textContent = "einziehender Mieter";
                    header.style.color = "black";
                    header.style.borderBottom = "0px solid black";
                    header.style.paddingBottom = "0px";
                } else {
                    header.textContent = "einziehender Mieter (nicht zutreffend)";
                    header.style.color = "#c80000";
                    header.style.borderBottom = "1px solid black";
                    header.style.paddingBottom = "5px";
                }
            }
        });
    }

    // Initiale Prüfung
    function initialCheck() {
        checkSection('schluesselTable', 'Schlüssel (nicht angegeben)', 'Schlüssel');
        checkSection('auszugmieterTable', 'ausziehender Mieter (nicht zutreffend)', 'ausziehender Mieter');
        checkSection('zaehlerTable', 'Zähler (nicht angegeben)', 'Zähler');
        checkEinziehendeMieter();
    }

    // Event Listener für Buttons
    function setupEventListeners() {
        document.getElementById('addKeyButton').addEventListener('click', () => {
            setTimeout(() => checkSection('schluesselTable', 'Schlüssel (nicht angegeben)', 'Schlüssel'), 50);
        });
        
        document.getElementById('addausziehenderMieter').addEventListener('click', () => {
            setTimeout(() => {
                checkSection('auszugmieterTable', 'ausziehender Mieter (nicht zutreffend)', 'ausziehender Mieter');
                checkEinziehendeMieter();
            }, 50);
        });
        
        document.getElementById('addeinziehenderMieter').addEventListener('click', () => {
            setTimeout(checkEinziehendeMieter, 50);
        });
        
        document.getElementById('addZaehlerButton').addEventListener('click', () => {
            setTimeout(() => checkSection('zaehlerTable', 'Zähler (nicht angegeben)', 'Zähler'), 50);
        });
    }

    initialCheck();
    setupEventListeners();

    // Zusätzliche Überprüfung bei Änderungen
    const observer = new MutationObserver(function(mutations) {
        initialCheck();
    });

    // Beobachte Änderungen in den relevanten Containern
    const containers = [
        document.getElementById('schluesselTable'),
        document.getElementById('auszugmieterTable'),
        document.getElementById('zaehlerTable'),
        document.getElementById('einzugmieterTable')
    ].filter(Boolean);

    containers.forEach(container => {
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });
});





/* Abteilung "Regelung Mäneglbeseitigung": wenn die erste radio-Checkbox mit nicht-zutreffend ausgewählt wird werden alle darunterliegenden Radio-Checkboxes ebenfalls mit nicht-zutreffend" ausgefüllt. */
/* Abteilung "Regelung Mäneglbeseitigung": wenn die erste radio-Checkbox mit nicht-zutreffend ausgewählt wird werden alle darunterliegenden Radio-Checkboxes ebenfalls mit nicht-zutreffend" ausgefüllt. */
/* Abteilung "Regelung Mäneglbeseitigung": wenn die erste radio-Checkbox mit nicht-zutreffend ausgewählt wird werden alle darunterliegenden Radio-Checkboxes ebenfalls mit nicht-zutreffend" ausgefüllt. */

document.addEventListener('DOMContentLoaded', function () {
    const masterRadio = document.getElementById('weitereBemerkungen2');
    const dependentRadios = [
        'weitereBemerkungen6',
        'weitereBemerkungen9',
        'nichtZutreffendCheckbox2'
    ];
    if (!masterRadio) {
        console.error('Haupt-Radio-Button nicht gefunden');
        return;
    }
    masterRadio.addEventListener('click', function () {
        const isChecked = this.checked;
        dependentRadios.forEach(id => {
            const radio = document.getElementById(id);
            if (radio) {
                radio.checked = isChecked;

                const label = document.querySelector(`label[for="${id}"]`) || radio.nextElementSibling;

                if (label) {
                    if (isChecked) {
                        label.classList.add('checked');
                        label.classList.remove('unchecked');
                    } else {
                        label.classList.add('unchecked');
                        label.classList.remove('checked');
                    }
                }
                const event = new Event('change', { bubbles: true });
                radio.dispatchEvent(event);
            }
        });
        console.log(`Master Radio ${isChecked ? 'aktiviert' : 'deaktiviert'}, alle abhängigen Elemente aktualisiert`);
    });
});
