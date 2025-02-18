let roomCount = 0;

function addRoom() {
    roomCount++;
    const roomId = "zimm" + String(roomCount).padStart(2, '0'); // Erzeugt zimm01, zimm02, zimm03.
    const container = document.getElementById("room-container");

    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room-container");
    /* roomDiv.setAttribute("id", "room-" + roomCount); */
    roomDiv.setAttribute("id", roomId);

    const roomTitle = document.createElement("h3");
    roomTitle.textContent = "Zimmer " + roomCount;

    const table = document.createElement("table");
    table.innerHTML = `


        <tr>
            <td>Bezeichnung / Lage</td>
            <td colspan="5" style="background-color:#fff;">
                <input type="text" name="bezeich-lage">
            </td>
        </tr>

        <tr>
                <th>allgemeiner Zustand</th>
                <th>renoviert</th>
                <th>neuwertig</th>
                <th>geringe Gebrauchs - spuren</th>
                <th>stärkerer Gebrauchs - spuren</th>
                <th>nicht renoviert</th>
            </tr>

            <tr>
                <td></td>
                <td>
                    <input type="radio" id="${roomId}-zus01" name="${roomId}-zus" value="reno">
                    <label for="${roomId}-zus01" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-zus02" name="${roomId}-zus" value="neuwe">
                    <label for="${roomId}-zus02" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-zus03" name="${roomId}-zus" value="geringe">
                    <label for="${roomId}-zus03" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-zus04" name="${roomId}-zus" value="staerkere">
                    <label for="${roomId}-zus04" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-zus05" name="${roomId}-zus" value="nichtreno">
                    <label for="${roomId}-zus05" class="radio-label"></label>
                </td>

            </tr>













            <tr class="trennlinie">
                <td class="keine-linie"></td>


            </tr>


            <tr style="border-top:50px solid #fff;">
                <th>Bereich</th>
                <th>in Ordnung</th>
                <th>reparatur - bedürftig</th>
                <th>Reparatur durch den Mieter</th>
                <th>Reparatur durch den Vermieter</th>
                <th>nicht vorhanden</th>
            </tr>

            <tr>
                <td>Tür / Zarge / Beschläge</td>
                <td>
                    <input type="radio" id="${roomId}-tuere1" name="${roomId}-tuere" value="in Ordnung">
                    <label for="${roomId}-tuere1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-tuere2" name="${roomId}-tuere"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-tuere2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-tuere3" name="${roomId}-tuere00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-tuere3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-tuere4" name="${roomId}-tuere0000"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-tuere4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-tuere5" name="${roomId}-tuere" value="nicht vorhanden">
                    <label for="${roomId}-tuere5" class="radio-label"></label>
                </td>
            </tr>






            <tr>
                <td>Schlüssel vorhanden</td>
                <td class="no-border-right text-right"
                    style="text-align: right; padding-right:10px; background-color:rgb(255, 255, 255);">
                    JA
                </td>
                <td>
                    <input type="radio" id="${roomId}-zimmer2" name="${roomId}-zimmer" value="${roomId}-zimmer">
                    <label for="${roomId}-zimmer2" class="radio-label"></label>
                </td>
                <td class="no-border-right text-right"
                    style="text-align: right; padding-right:10px; background-color:rgb(255, 255, 255);">
                    NEIN
                </td>
                <td class="no-border-right">
                    <input type="radio" id="${roomId}-zimmer4" name="${roomId}-zimmer" value="${roomId}-zimmer">
                    <label for="${roomId}-zimmer4" class="radio-label"></label>
                </td>
                <td>
                </td>
            </tr>

            <tr>
                <td>Fenster/Beschläge/Glas</td>
                <td>
                    <input type="radio" id="${roomId}-fenster1" name="${roomId}-fenster" value="in Ordnung">
                    <label for="${roomId}-fenster1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fenster2" name="${roomId}-fenster"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-fenster2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fenster3" name="${roomId}-fenster00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-fenster3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fenster4" name="${roomId}-fenster00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-fenster4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fenster5" name="${roomId}-fenster" value="nicht vorhanden">
                    <label for="${roomId}-fenster5" class="radio-label"></label>
                </td>
            </tr>

            <tr>
                <td>Jalousie/Rolläden/Klappäden</td>
                <td>
                    <input type="radio" id="${roomId}-rollo1" name="${roomId}-rollo" value="in Ordnung">
                    <label for="${roomId}-rollo1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-rollo2" name="${roomId}-rollo"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-rollo2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-rollo3" name="${roomId}-rollo00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-rollo3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-rollo4" name="${roomId}-rollo00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-rollo4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-rollo5" name="${roomId}-rollo" value="nicht vorhanden">
                    <label for="${roomId}-rollo5" class="radio-label"></label>
                </td>
            </tr>

            <tr>
                <td>Decke</td>
                <td>
                    <input type="radio" id="${roomId}-decke1" name="${roomId}-decke" value="in Ordnung">
                    <label for="${roomId}-decke1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-decke2" name="${roomId}-decke"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-decke2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-decke3" name="${roomId}-decke00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-decke3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-decke4" name="${roomId}-decke00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-decke4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-decke5" name="${roomId}-decke" value="nicht vorhanden">
                    <label for="${roomId}-decke5" class="radio-label"></label>
                </td>
            </tr>

            <tr>
                <td>Wände / Tapeten</td>
                <td>
                    <input type="radio" id="${roomId}-waende1" name="${roomId}-waende" value="in Ordnung">
                    <label for="${roomId}-waende1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-waende2" name="${roomId}-waende"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-waende2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-waende3" name="${roomId}-waende00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-waende3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-waende4" name="${roomId}-waende00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-waende4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-waende5" name="${roomId}-waende" value="nicht vorhanden">
                    <label for="${roomId}-waende5" class="radio-label"></label>
                </td>
            </tr>

            <tr>
                <td>Farbe der Wände</td>
                <td colspan="5">
                    <select name="farbe">
                        <option value="" selected disabled>Bitte wählen...</option>
                        <option value="weiß">Weiß</option>
                        <option value="beige">Beige</option>
                        <option value="grau">Grau</option>
                        <option value="bunt">Bunt</option>
                        <option value="sonstige">Sonstige</option>
                    </select>
                </td>
            </tr>



            <tr>
                <td>Heizkörper / Ventile / Rohre</td>
                <td>
                    <input type="radio" id="${roomId}-heizkoerper1" name="${roomId}-heizkoerper" value="in Ordnung">
                    <label for="${roomId}-heizkoerper1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-heizkoerper2" name="${roomId}-heizkoerper"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-heizkoerper2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-heizkoerper3" name="${roomId}-heizkoerper00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-heizkoerper3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-heizkoerper4" name="${roomId}-heizkoerper00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-heizkoerper4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-heizkoerper5" name="${roomId}-heizkoerper"
                        value="nicht vorhanden">
                    <label for="${roomId}-heizkoerper5" class="radio-label"></label>
                </td>
            </tr>

            <tr>
                <td>Fußboden / Leisten</td>
                <td>
                    <input type="radio" id="${roomId}-fussboden1" name="${roomId}-fussboden" value="in Ordnung">
                    <label for="${roomId}-fussboden1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fussboden2" name="${roomId}-fussboden"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-fussboden2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fussboden3" name="${roomId}-fussboden00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-fussboden3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fussboden4" name="${roomId}-fussboden00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-fussboden4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-fussboden5" name="${roomId}-fussboden" value="nicht vorhanden">
                    <label for="${roomId}-fussboden5" class="radio-label"></label>
                </td>
            </tr>


            <tr>
                <td>Fußboden Material</td>
                <td colspan="5">
                    <select name="boeden">
                        <option value="" selected disabled>Bitte wählen...</option>
                        <option value="parkett">Parkett</option>
                        <option value="laminat">Laminat</option>
                        <option value="pvc">PVC</option>
                        <option value="vinyl">Vinyl</option>
                        <option value="fliesen">Fliesen</option>
                        <option value="beton">Beton</option>
                        <option value="teppich">Teppich</option>
                        <option value="sonstige">Sonstige</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>Fußboden Farbe</td>
                <td colspan="5">
                    <select name="farbe">
                        <option value="" selected disabled>Bitte wählen...</option>
                        <option value="weiß">Braun</option>
                        <option value="beige">Schwarz</option>
                        <option value="grau">Grau</option>
                        <option value="bunt">Holz</option>
                        <option value="sonstige">Stein</option>
                        <option value="sonstige">Sonstige</option>
                    </select>
                </td>
            </tr>


            <tr>
                <td>Radio-/Fernseh-/Internetdose</td>
                <td>
                    <input type="radio" id="${roomId}-internet1" name="${roomId}-internet" value="in Ordnung">
                    <label for="${roomId}-internet1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-internet2" name="${roomId}-internet"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-internet2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-internet3" name="${roomId}-internet00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-internet3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-internet4" name="${roomId}-internet00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-internet4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-internet5" name="${roomId}-internet" value="nicht vorhanden">
                    <label for="${roomId}-internet5" class="radio-label"></label>
                </td>
            </tr>

            <tr>




            <tr>
                <td>Steckdosen / Lichtschalter</td>
                <td>
                    <input type="radio" id="${roomId}-elektrik1" name="${roomId}-elektrik" value="in Ordnung">
                    <label for="${roomId}-elektrik1" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-elektrik2" name="${roomId}-elektrik"
                        value="reparatur- / renovierungsbedürftig">
                    <label for="${roomId}-elektrik2" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-elektrik3" name="${roomId}-elektrik00"
                        value="Reparatur durch den Mieter">
                    <label for="${roomId}-elektrik3" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-elektrik4" name="${roomId}-elektrik00"
                        value="Reparatur durch den Vermieter">
                    <label for="${roomId}-elektrik4" class="radio-label"></label>
                </td>
                <td>
                    <input type="radio" id="${roomId}-elektrik5" name="${roomId}-elektrik" value="nicht vorhanden">
                    <label for="${roomId}-elektrik5" class="radio-label"></label>
                </td>
            </tr>

            <tr>


            <tr>
                <td>Anzahl der Rauchwarnmelder</td>

                <td class="no-border-right text-right"
                    style="text-align: right; padding-right:10px; background-color:rgb(255, 255, 255);">
                    0
                </td>
                <td>
                    <input type="radio" id="${roomId}-rwm1" name="${roomId}-rwm" value="${roomId}-rwm">
                    <label for="${roomId}-rwm1" class="radio-label"></label>
                </td>


                <td class="no-border-right text-right"
                    style="text-align: right; padding-right:10px; background-color:rgb(255, 255, 255);">
                    1 (oder mehr)
                </td>
                <td class="no-border-right">
                    <input type="radio" id="${roomId}-rwm2" name="${roomId}-rwm" value="${roomId}-rwm">
                    <label for="${roomId}-rwm2" class="radio-label"></label>
                </td>
                <td>




                </td>
            </tr>


            <tr>
                <td style="vertical-align: top; font-weight:600; padding-top:15px;">Bemerkungen:</td>
            </tr>



    `;

    const remarkSection = document.createElement("div");
    remarkSection.classList.add("remark-row");
    remarkSection.innerHTML = `
        <input type="text" name="remark" class="autoscale" placeholder="">
    `;


    roomDiv.appendChild(roomTitle);
    roomDiv.appendChild(table);
    roomDiv.appendChild(remarkSection);

    const addRemarkButton = document.createElement("button");
    addRemarkButton.classList.add("add-remark-btn");
    addRemarkButton.textContent = "+";
    addRemarkButton.onclick = function () { addRemark(roomDiv); };
    roomDiv.appendChild(addRemarkButton);












    // Upload-Button mit inkrementeller ID
    const uploadButton = document.createElement("input");
    uploadButton.setAttribute("type", "file");
    uploadButton.setAttribute("multiple", "true");
    uploadButton.setAttribute("accept", "image/*");
    uploadButton.setAttribute("capture", "environment"); // Öffnet Kamera auf Mobilgeräten
    uploadButton.setAttribute("id", "file-upload-" + roomCount);
    uploadButton.style.display = "none"; // Versteckt das Standard-Upload-Feld
    
    // Dynamischer Button-Text basierend auf der Zimmernummer
    const buttonText = `+ Bilder hinzufügen (Zimmer ${roomCount})`;
    
    // Erstelle einen sichtbaren Button mit der Klasse .customUploadButton
    const customButton = document.createElement("button");
    customButton.textContent = buttonText;
    customButton.classList.add("customUploadButton");
    
    // Klick auf den Button öffnet das versteckte Upload-Feld
    customButton.addEventListener("click", () => {
        uploadButton.click();
    });
    
    // Event Listener für den Upload der Bilder
    uploadButton.addEventListener("change", function (event) {
        const roomId = this.id.split("-")[2];
        handleFileUpload(event, roomId);
    });
    
    // Erstelle einen Bereich für die Bildervorschau
    const imageSection = document.createElement("div");
    imageSection.classList.add("image-preview");
    
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.setAttribute("id", "preview-" + roomCount);
    
    imageSection.appendChild(imageContainer);
    
    // Füge alles in `roomDiv` ein
    roomDiv.appendChild(uploadButton);  // Unsichtbares Upload-Feld
    roomDiv.appendChild(customButton);  // Sichtbarer Button mit dynamischem Namen
    roomDiv.appendChild(imageSection);  // Vorschau-Bereich
    
    container.appendChild(roomDiv);
    
    // CSS-Styles direkt über JavaScript hinzufügen, um den Button zu zentrieren
    customButton.style.display = "block"; // Button als Block-Element anzeigen
    customButton.style.margin = "20px auto"; // Automatische Ränder für horizontale Zentrierung
    customButton.style.textAlign = "center"; // Text im Button zentrieren
    customButton.style.width = "350px"; // Breite des Buttons (optional)
    
    

}





















function addRemark(roomDiv) {
    const newRemarkRow = document.createElement("div");
    newRemarkRow.classList.add("remark-row");
    newRemarkRow.innerHTML = `
        <input type="text" name="remark" class="autoscale" placeholder="">
    `;

    roomDiv.insertBefore(newRemarkRow, roomDiv.querySelector('button.add-remark-btn'));
}

function handleFileUpload(event, roomId) {
    const previewDiv = document.getElementById("preview-" + roomId);

    let largeRoomImages = document.getElementById("large-preview-" + roomId);
    if (!largeRoomImages) {
        const largeImageContainer = document.getElementById("large-images-container");
        const largeRoomTitle = document.createElement("h3");
        /*   largeRoomTitle.textContent = "Zimmer " + roomId; */
        largeImageContainer.appendChild(largeRoomTitle);

        largeRoomImages = document.createElement("div");
        largeRoomImages.classList.add("large-image-container");
        largeRoomImages.setAttribute("id", "large-preview-" + roomId);
        largeImageContainer.appendChild(largeRoomImages);
    }

    const files = event.target.files;
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgId = "img-" + roomId + "-" + Math.random().toString(36).substr(2, 9);

            // Vorschau für das Bild im jeweiligen Zimmer
            const smallImageWrapper = document.createElement("div");
            smallImageWrapper.setAttribute("id", "wrapper-" + imgId);
            smallImageWrapper.classList.add("image-wrapper");

            const imgSmall = document.createElement("img");
            imgSmall.setAttribute("src", e.target.result);

            const deleteBtnSmall = document.createElement("button");
            deleteBtnSmall.textContent = "X";
            deleteBtnSmall.classList.add("delete-btn");
            deleteBtnSmall.onclick = function () {
                deleteImage(imgId);
            };

            smallImageWrapper.appendChild(imgSmall);
            smallImageWrapper.appendChild(deleteBtnSmall);
            previewDiv.appendChild(smallImageWrapper);

            // Große Ansicht für das Bild im jeweiligen Zimmer
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("large-image-wrapper");
            imageWrapper.setAttribute("id", "large-wrapper-" + imgId);

            const label = document.createElement("p");
            label.textContent = "Zimmer " + roomId;

            const imgLarge = document.createElement("img");
            imgLarge.setAttribute("src", e.target.result);

            const deleteBtnLarge = document.createElement("button");
            deleteBtnLarge.textContent = "X";
            deleteBtnLarge.classList.add("delete-btn");
            deleteBtnLarge.onclick = function () {
                deleteImage(imgId);
            };

            imageWrapper.appendChild(label);
            imageWrapper.appendChild(imgLarge);
            imageWrapper.appendChild(deleteBtnLarge);
            largeRoomImages.appendChild(imageWrapper);
        };
        reader.readAsDataURL(file);
    }
}

function deleteImage(imgId) {
    const smallImageWrapper = document.getElementById("wrapper-" + imgId);
    const largeImageWrapper = document.getElementById("large-wrapper-" + imgId);

    if (smallImageWrapper) smallImageWrapper.remove();
    if (largeImageWrapper) largeImageWrapper.remove();
}
