/* Toggel Viewer Modi */
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




/* button einziehenden Mieter hinzufügen */
document.getElementById('addeinziehenderMieter').addEventListener('click', function () {
    const newRow2 = document.createElement('tr');

    const bezeichnungCell2 = document.createElement('td');
    const numbaCell2 = document.createElement('td');
    const lageCell2 = document.createElement('td');
    const standCell2 = document.createElement('td');

    bezeichnungCell2.innerHTML = '<input type="text" placeholder="Name">';
    numbaCell2.innerHTML = '<input type="text" placeholder="Vorname">';
    lageCell2.innerHTML = '<input type="text" placeholder="Tel.:">';
    standCell2.innerHTML = '<input type="text" placeholder="E-Mail">';

    newRow2.appendChild(bezeichnungCell2);
    newRow2.appendChild(numbaCell2);
    newRow2.appendChild(lageCell2);
    newRow2.appendChild(standCell2);

    const tbody = document.querySelector('#einzugmieterTable tbody');
    const buttonRow = document.getElementById('addeinziehenderMieterRow');

    tbody.insertBefore(newRow2, buttonRow); // Füge neue Zeile vor der Button-Zeile ein
});



/* button ausziehenden Mieter hinzufügen */
document.getElementById('addausziehenderMieter').addEventListener('click', function () {

    const newRow4 = document.createElement('tr');

    const bezeichnungCell4 = document.createElement('td');
    const numbaCell4 = document.createElement('td');
    const lageCell4 = document.createElement('td');
    const standCell4 = document.createElement('td');

    bezeichnungCell4.innerHTML = '<input type="text" placeholder="Name">';
    numbaCell4.innerHTML = '<input type="text" placeholder="Vorname">';
    lageCell4.innerHTML = '<input type="text" placeholder="neue Straße">';
    standCell4.innerHTML = '<input type="text" placeholder="PLZ / Ort">';

    newRow4.appendChild(bezeichnungCell4);
    newRow4.appendChild(numbaCell4);
    newRow4.appendChild(lageCell4);
    newRow4.appendChild(standCell4);

    const tbody4 = document.querySelector('#auszugmieterTable tbody');
    const buttonRow4 = document.getElementById('addausziehenderMieterRow');

    tbody4.insertBefore(newRow4, buttonRow4); // Füge neue Zeile vor der Button-Zeile ein
});



/* button schlüssel hinzufügen */
document.getElementById('addKeyButton').addEventListener('click', function () {
    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    const anzahlCell = document.createElement('td');
    const schluesselnummerCell = document.createElement('td');

    bezeichnungCell.innerHTML = `
        <select>
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

    anzahlCell.innerHTML = '<input type="number" placeholder="Anzahl">';
    schluesselnummerCell.innerHTML = '<input type="text" placeholder="Schlüsselnummer">';

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(anzahlCell);
    newRow.appendChild(schluesselnummerCell);

    const tbody = document.querySelector('#schluesselTable tbody');
    const buttonRow = document.getElementById('addKeyRow'); // Korrekte ID

    if (tbody && buttonRow) {
        tbody.insertBefore(newRow, buttonRow); // Neue Zeile vor der Button-Zeile einfügen
    } else {
        console.error("Fehler: Tabelle oder Button-Zeile nicht gefunden.");
    }
});




/* button Zähler hinzufügen */
document.getElementById('addZaehlerButton').addEventListener('click', function () {
    const newRow = document.createElement('tr');

    const bezeichnungCell = document.createElement('td');
    const numbaCell = document.createElement('td');
    const lageCell = document.createElement('td');
    const standCell = document.createElement('td');

    bezeichnungCell.innerHTML = '<select><option value="leer"></option><option value="gaszaehler">Gaszähler</option><option value="stromzaehler">Stromzähler</option><option value="waermezaehler">Wärmezähler</option><option value="wassertemperaturKalt">Wasserzähler (kalt)</option><option value="wassertemperaturWarm">Wasserzähler (warm)</option><option value="heizkostenverteiler">Heizkostenverteiler</option></select>';
    numbaCell.innerHTML = '<input type="text" placeholder="Zählernummer">';
    lageCell.innerHTML = '<input type="text" placeholder="exakte Einbaulage">';
    standCell.innerHTML = '<input type="text" placeholder="Zählerstand">';

    newRow.appendChild(bezeichnungCell);
    newRow.appendChild(numbaCell);
    newRow.appendChild(lageCell);
    newRow.appendChild(standCell);

    const tbody = document.querySelector('#zaehlerTable tbody');
    const addButtonRow = document.getElementById('addZaelerRow'); // Button-Zeile

    if (tbody && addButtonRow) {
        tbody.appendChild(newRow); // Neue Zeile am Ende der Tabelle hinzufügen
        tbody.appendChild(addButtonRow); // Button-Zeile wieder an letzter Stelle einfügen
    } else {
        console.error("Fehler: Tabelle oder Button-Zeile nicht gefunden.");
    }
});





/* toggle allgemein  */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".allgemein00").forEach(allgemein => {
        const header = allgemein.querySelector("h3");
        const contentElements = Array.from(allgemein.children).filter(el => el !== header);

        if (header && contentElements.length > 0) {
            const arrow = document.createElement("span");
            arrow.textContent = " ▼";
            arrow.style.transition = "transform 0.3s ease";
            header.appendChild(arrow);

            contentElements.forEach(element => {
                element.style.display = "none";
                element.style.opacity = "0";
                element.style.transition = "opacity 0.5s ease-out";
            });

            header.style.cursor = "pointer";
            header.style.padding = "8px";
            header.style.transition = "background 0.3s";
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.alignItems = "center";

            /*             header.addEventListener("mouseover", () => {
                            header.style.background = "#c9c9c9";
                        });
                        header.addEventListener("mouseout", () => {
                            header.style.background = "#c9c9c9";
                        }); */

            header.addEventListener("click", function () {
                const isHidden = contentElements[0].style.display === "none";

                contentElements.forEach(element => {
                    if (isHidden) {
                        element.style.display = "block";
                        setTimeout(() => {
                            element.style.opacity = "1";
                        }, 10);
                    } else {
                        element.style.opacity = "0";
                        setTimeout(() => {
                            element.style.display = "none";
                        }, 500);
                    }
                });

                arrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
            });
        }
    });
});





/* toggle sign */
document.addEventListener("DOMContentLoaded", function () {
    const signHeader = document.querySelector(".sign02");
    const signContent = document.querySelector(".signature-content");

    if (signHeader && signContent) {
        const arrow = document.createElement("span");
        arrow.textContent = " ▼";
        arrow.style.transition = "transform 0.3s ease";
        signHeader.appendChild(arrow);

        signContent.style.display = "none";
        signContent.style.overflow = "hidden";
        signContent.style.opacity = "0";
        signContent.style.transition = "max-height 0.5s ease-out, opacity 0.5s ease-out";


        // Styling für den Header anpassen
        signHeader.style.cursor = "pointer";
        signHeader.style.paddingTop = "25px";  // Padding oben
        signHeader.style.paddingBottom = "25px";  // Padding unten
        signHeader.style.paddingLeft = "10px";  // Padding oben
        signHeader.style.paddingRight = "12px";  // Padding unten
        signHeader.style.transition = "background 0.3s";
        signHeader.style.display = "flex";
        signHeader.style.justifyContent = "space-between";
        signHeader.style.alignItems = "center";


        signHeader.addEventListener("click", function () {
            if (signContent.style.display === "none") {
                signContent.style.display = "block";
                signContent.style.maxHeight = "0px";
                setTimeout(() => {
                    signContent.style.maxHeight = signContent.scrollHeight + "px";
                    signContent.style.opacity = "1";
                }, 10);
                arrow.style.transform = "rotate(180deg)";
            } else {
                signContent.style.maxHeight = "0px";
                signContent.style.opacity = "0";
                setTimeout(() => {
                    signContent.style.display = "none";
                }, 500);
                arrow.style.transform = "rotate(0deg)";
            }
        });
    }
});



/* Funktion Unterschriftenfelder */
document.addEventListener("DOMContentLoaded", function () {
    function initSignatureCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        let drawing = false;

        function getPosition(e) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (e.clientX || e.touches[0].clientX) - rect.left,
                y: (e.clientY || e.touches[0].clientY) - rect.top
            };
        }

        function startDraw(e) {
            e.preventDefault();
            const pos = getPosition(e);
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        function draw(e) {
            if (!drawing) return;
            e.preventDefault();
            const pos = getPosition(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.stroke();
        }

        function stopDraw(e) {
            e.preventDefault();
            drawing = false;
            ctx.beginPath();
        }

        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDraw);
        canvas.addEventListener("mouseleave", stopDraw);

        canvas.addEventListener("touchstart", startDraw, { passive: false });
        canvas.addEventListener("touchmove", draw, { passive: false });
        canvas.addEventListener("touchend", stopDraw, { passive: false });

        // Canvas-Größe erst setzen, wenn sichtbar
        setTimeout(resizeCanvas, 100);
    }

    window.clearSignature = function (canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    function initializeWhenVisible(elementId, callback) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.disconnect(); // Stoppt die Beobachtung nach erstem Laden
                }
            });
        });
        observer.observe(document.getElementById(elementId));
    }

    initializeWhenVisible("mieter-signature", () => initSignatureCanvas("mieter-signature"));
    initializeWhenVisible("mieter-signature2", () => initSignatureCanvas("mieter-signature2"));
    initializeWhenVisible("vermieter-signature", () => initSignatureCanvas("vermieter-signature"));
});








// Räume bzw. derein Eigenschaften entfernen, wenn Raum vorahnden "nein" geklickt wird.
document.addEventListener("DOMContentLoaded", function () {
    function setupRoomToggle(room) {
        // Überprüfen, ob der Container die ID "weitereBemerkungenContainer" hat
        if (room.id === "weitereBemerkungenContainer") {
            return; // Überspringen, wenn es der Container ist, der ausgeschlossen werden soll
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

    // Zimmer kopieren
    function duplicateRoom() {
        let container = document.getElementById("zimmerContainer");
        let originalZimmer = container.querySelector(".rooms");

        if (!originalZimmer) return;

        let neueNummer = container.getElementsByClassName("rooms").length + 1;
        let neuesZimmer = originalZimmer.cloneNode(true);

        neuesZimmer.innerHTML = neuesZimmer.innerHTML.replace(/zimm01/g, "zimm0" + neueNummer);
        neuesZimmer.innerHTML = neuesZimmer.innerHTML.replace(/Zimmer 1/g, "Zimmer " + neueNummer);
        neuesZimmer.id = "zimm0" + neueNummer;

        let header = neuesZimmer.querySelector("h3");
        if (header) header.textContent = "Zimmer " + neueNummer;

        // Setze alle Radio-Buttons im neuen Zimmer zurück
        neuesZimmer.querySelectorAll("input[type='radio']").forEach(input => input.checked = false);

        container.appendChild(neuesZimmer);

        // Füge Toggle-Funktionalität und Room-Toggle nur für das neue Zimmer hinzu
        addToggleFunctionality(neuesZimmer);
        setupRoomToggle(neuesZimmer);
    }

    // Initialisiere Toggle-Funktionalität für alle vorhandenen Zimmer
    document.querySelectorAll(".rooms").forEach(room => {
        addToggleFunctionality(room);
        setupRoomToggle(room);
    });

    // Event-Listener für den "Zimmer hinzufügen" Button
    document.getElementById("duplicateBtn").addEventListener("click", duplicateRoom);
});



//Euro formatieren
document.getElementById('pauschalbetrag').addEventListener('input', function (e) {
    // Wert des Eingabefelds holen
    let value = e.target.value;

    // Wert in eine Dezimalzahl umwandeln und auf zwei Nachkommastellen runden
    let formattedValue = parseFloat(value).toFixed(2);

    // Formatierten Wert zurück in das Eingabefeld schreiben
    e.target.value = formattedValue;
});





/* Bild hochladen */
document.addEventListener('DOMContentLoaded', function () {
    // Event-Listener für den Button
    document.getElementById('uploadImageButton').addEventListener('click', function () {
        document.getElementById('imageInput').click(); // Öffnet den Datei-Dialog
    });

    // Event-Listener für die Dateiauswahl
    document.getElementById('imageInput').addEventListener('change', function (event) {
        const files = event.target.files; // Alle ausgewählten Dateien

        // Verarbeite jede Datei
        for (const file of files) {
            if (file.type.startsWith('image/')) { // Nur Bilder verarbeiten
                const reader = new FileReader();

                // Wenn die Datei geladen ist
                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;

                    // Wenn das Bild geladen ist
                    img.onload = function () {
                        // Skaliere das Bild auf n Pixel
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const maxWidth = 1000;
                        const maxHeight = 500;
                        let width = img.width;
                        let height = img.height;

                        // Berechne das neue Seitenverhältnis
                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width = width * ratio;
                            height = height * ratio;
                        }

                        // Setze die Canvas-Größe
                        canvas.width = width;
                        canvas.height = height;

                        // Zeichne das Bild auf den Canvas
                        ctx.drawImage(img, 0, 0, width, height);

                        // Erstelle ein neues img-Element mit dem skalierten Bild
                        const scaledImg = document.createElement('img');
                        scaledImg.src = canvas.toDataURL('image/jpeg', 0.9); // Qualität: 90%

                        // Füge das img-Element zum DOM hinzu
                        const imageContainer = document.createElement('div');
                        imageContainer.className = 'image-container';
                        imageContainer.appendChild(scaledImg);

                        // Füge den Container nach dem sign-Element ein
                        const signElement = document.querySelector('.sign');
                        signElement.insertAdjacentElement('afterend', imageContainer);
                    };
                };

                // Lese die Datei als Data-URL (Base64)
                reader.readAsDataURL(file);
            } else {
                alert('Bitte wählen Sie nur Bilddateien aus.');
            }
        }
    });
});



/* PDF save button */
document.getElementById('savePdfButton').addEventListener('click', async function () {
    const element = document.querySelector('.container'); // Nur den Container erfassen

    if (!element) {
        console.error("Fehler: Kein Element mit der Klasse 'container' gefunden.");
        return;
    }

    // Speichern des aktuellen Stylesheet-Hrefs (für den Fall, dass es später wiederhergestellt werden muss)
    const currentTheme = document.getElementById("theme-style").getAttribute("href");

    // Schalte auf das Druck-Stylesheet (stylesprint.css)
    document.getElementById("theme-style").setAttribute("href", "stylesprint.css");

    // Alle Buttons vorübergehend ausblenden
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    // Alle Pfeile <span> vorübergehend ausblenden
    const span00 = document.querySelectorAll('span');
    span00.forEach(span => span.style.display = 'none');

    // Alle `.rooms`-Tabellen sichtbar machen
    const rooms = document.querySelectorAll('.rooms table');
    const hiddenStates = new Map(); // Speichert den Originalzustand der Tabellen

    rooms.forEach(table => {
        hiddenStates.set(table, table.style.display); // Originalzustand speichern
        table.style.display = 'table'; // Sichtbar machen
        table.style.maxHeight = 'none';
        table.style.opacity = '1';
    });

    const hiddenStates2 = new Map();
    const allgemein00 = document.querySelectorAll('.allgemein00 h3, .allgemein00 table');
    allgemein00.forEach(table => {
        hiddenStates2.set(table, table.style.display); // Originalzustand speichern
        table.style.display = 'table'; // Sichtbar machen
        table.style.maxHeight = 'none';
        table.style.opacity = '1';
    });

    // Alle `.sign`-Bereiche sichtbar machen
    const signSection = document.querySelector('.sign');
    const signContent = document.querySelector('.signature-content');
    const signHeader = document.querySelector('.sign02');

    if (signSection && signContent && signHeader) {
        signSection.style.display = 'block';  // Sichtbar machen der gesamten Unterschriften-Sektion
        signContent.style.display = 'block'; // Sichtbar machen des Inhalts der Unterschriften-Sektion
        signContent.style.maxHeight = 'none'; // Max Height zurücksetzen
        signContent.style.opacity = '1'; // Sichtbar machen
    }

    // Temporär den Placeholder-Text aus allen Eingabefeldern entfernen
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
        input.setAttribute('data-placeholder', input.getAttribute('placeholder')); // Placeholder speichern
        input.removeAttribute('placeholder'); // Placeholder entfernen
    });

    try {
        // Warte kurz, damit das Stylesheet geladen wird
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Rendere den Inhalt mit dem stylesprint.css-Stylesheet
        const canvas = await html2canvas(element, {
            logging: false,
            useCORS: true,
            scale: 2
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.5); // 0.5 gibt die Komprimierungsstärke an (0.0 bis 1.0)

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const usableWidth = pageWidth - (2 * margin);
        const usableHeight = pageHeight - (2 * margin);

        const imgWidth = usableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;

        while (position < imgHeight) {
            const remainingHeight = imgHeight - position;
            const renderHeight = Math.min(remainingHeight, usableHeight);

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = (renderHeight * canvas.width) / imgWidth;

            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(canvas, 0, position * (canvas.width / imgWidth), canvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

            const partialImgData = tempCanvas.toDataURL('image/JPEG');
            pdf.addImage(partialImgData, 'JPEG', margin, margin, imgWidth * 1, renderHeight * 1);

            position += usableHeight;

            if (position < imgHeight) {
                pdf.addPage();
            }
        }

        // Wenn Bilder hochgeladen wurden, fügen wir sie zur PDF hinzu
        if (window.imageData && window.imageData.length > 0) {
            let imgPositionY = 10; // Y-Position für das erste Bild
            window.imageData.forEach((imgData, index) => {
                pdf.addImage(imgData, 'JPEG', margin, imgPositionY, 50, 50); // Bild in PDF einfügen
                imgPositionY += 60; // Nächste Position für das Bild (nach unten verschieben)
                if (imgPositionY + 50 > pageHeight - margin) {
                    pdf.addPage(); // Neue Seite, wenn der Platz knapp wird
                    imgPositionY = 10; // Y-Position zurücksetzen
                }
            });
        }

        // PDF speichern
        pdf.save('dokument.pdf');
    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {
        // Nach dem Speichern der PDF die Buttons wieder sichtbar machen
        buttons.forEach(button => button.style.display = '');

        // `.rooms`-Tabellen wieder in den Originalzustand versetzen
        rooms.forEach(table => {
            table.style.display = hiddenStates.get(table); // Ursprünglicher Zustand
        });

        // Placeholder-Text wiederherstellen
        inputs.forEach(input => {
            input.setAttribute('placeholder', input.getAttribute('data-placeholder')); // Placeholder zurücksetzen
            input.removeAttribute('data-placeholder'); // Temporäre Speicherung entfernen
        });

        // Zurück zum ursprünglichen Stylesheet
        document.getElementById("theme-style").setAttribute("href", currentTheme);
    }
});




/* Farbe der Toggle-Überschriften verändern von weiteren Bemerkungen */
window.addEventListener('DOMContentLoaded', function () {
    // Container für "weitereBemerkungen"
    const container1 = document.getElementById('weitereBemerkungenContainer');
    const roomsElement1 = container1.querySelector('.rooms');
    const weitereBemerkungenElement = container1.querySelector('#weitereBemerkungen');

    if (roomsElement1 && weitereBemerkungenElement && roomsElement1 === weitereBemerkungenElement) {
        roomsElement1.style.backgroundColor = 'rgb(255, 238, 171)';
    }

    // Container für "hauptBemerkungen"
    const container2 = document.getElementById('hauptBemerkungenContainer');
    const roomsElement2 = container2.querySelector('.rooms');
    const hauptBemerkungenElement = container2.querySelector('#hauptBemerkungen');

    if (roomsElement2 && hauptBemerkungenElement && roomsElement2 === hauptBemerkungenElement) {
        roomsElement2.style.backgroundColor = 'rgb(255, 238, 171)';
    }

    // Container für "sign"
    const signContainer = document.querySelector('.sign');
    const signHeader = signContainer.querySelector('.sign02');  // Hier das H3-Element auswählen

    // Hier prüfen, ob das H3-Element die Klasse .sign02 ist
    if (signHeader) {
        // Nur gelb machen, wenn das H3-Element nach einer .rooms kommt
        const roomsInSign = signContainer.querySelector('.rooms');
        if (roomsInSign && roomsInSign.nextElementSibling === signHeader) {
            signHeader.style.backgroundColor = 'rgb(255, 238, 171)';
        }
    }
});


/* vermutlich hinfällig */
/* window.addEventListener('DOMContentLoaded', function () {
    // Hole das H3-Element mit der Klasse sign02
    const signHeader = document.querySelector('.sign02');

    // Überprüfe, ob das Element vorhanden ist
    if (signHeader) {
        // Setze die Hintergrundfarbe sofort auf Gelb
        signHeader.style.backgroundColor = 'rgb(255, 238, 171)';

        // Füge einen EventListener hinzu, um das Element zu toggeln (auf/ab)
        signHeader.addEventListener('click', function () {
            // Überprüfen, ob der Hintergrund bereits gelb ist
            if (signHeader.style.backgroundColor === 'rgb(252, 192, 0)') {
                // Wenn ja, Hintergrundfarbe zurücksetzen
                signHeader.style.backgroundColor = '';
            } else {
                // Ansonsten auf Gelb setzen
                signHeader.style.backgroundColor = 'rgb(255, 238, 171)';
            }
        });
    }
}); */





/* Schriftgröße für Textinputfelder verkleinern, wenn zu viel Text eingegeeben wurden */
document.addEventListener("DOMContentLoaded", function () {
    const container = document.body;

    function adjustFontSize(input) {
        const placeholder = input.getAttribute("placeholder")?.trim().toLowerCase();
        const currentLength = input.value.length;

        // Überspringe Input-Felder mit dem Platzhalter "Bemerkungen..."
        if (placeholder === "bemerkungen...") {
            return; // Beende die Funktion, ohne die Schriftgröße anzupassen
        }

        if (placeholder === "tel.:") {
            const maxLength = 9;
            if (currentLength > maxLength) {
                let newFontSize = 18 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "22px";
            }
        }

        else if (placeholder === "e-mail") {
            const maxLength = 25;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        else if (placeholder === "vorname") {
            const maxLength = 12;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        else if (placeholder === "plz / ort") {
            const maxLength = 16;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        else if (placeholder === "zählernummer") {
            const maxLength = 16;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        else if (placeholder === "exakte einbaulage") {
            const maxLength = 32;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        else if (placeholder === "zählerstand") {
            const maxLength = 11;
            if (currentLength > maxLength) {
                let newFontSize = 18 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "20px";
            }
        }

        // Für alle anderen Inputfelder (z. B. Name, Vorname)
        else {
            const maxLength = 29;
            if (currentLength > maxLength) {
                let newFontSize = 20 - (currentLength - maxLength) * 0.5;
                newFontSize = Math.max(newFontSize, 8);
                input.style.fontSize = `${newFontSize}px`;
            } else {
                input.style.fontSize = "22px";
            }
        }
    }

    // Beim Laden der Seite alle Inputfelder durchlaufen und Schriftgröße anpassen
    const inputs = container.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        adjustFontSize(input);
    });

    // Event-Listener für Änderungen in den Inputfeldern
    container.addEventListener("input", function (event) {
        if (event.target && event.target.type === "text") {
            adjustFontSize(event.target);
        }
    });
});



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



// Funktion zur Anpassung der Höhe des Textarea
/* function adjustTextareaHeight(textarea) {

    textarea.style.height = "auto";

    textarea.style.height = textarea.scrollHeight + "px";
}
function initializeTextareaAutoResize() {
    // Wähle alle Textarea-Elemente mit der Klasse "bemerkung-textarea" aus
    const textareas = document.querySelectorAll(".bemerkung-textarea");

    // Wende die Höhenanpassung auf jedes Textarea-Element an
    textareas.forEach(textarea => {
        // Höhe sofort anpassen (falls bereits Text vorhanden ist)
        adjustTextareaHeight(textarea);

        // Höhe bei jeder Eingabe anpassen
        textarea.addEventListener("input", () => {
            adjustTextareaHeight(textarea);
        });
    });
}
document.addEventListener("DOMContentLoaded", initializeTextareaAutoResize);
window.addEventListener("load", initializeTextareaAutoResize);
 */



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


// Funktion zum Löschen der Unterschrift
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
