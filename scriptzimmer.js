// Copyright - Oliver Acker, acker_oliver@yahoo.de
// scriptzimmer.js
// Version 3.30_beta

function initializeSuggestionInputs() {
    document.querySelectorAll(".suggestion-input").forEach(inputField => {
        const suggestionListId = inputField.getAttribute("data-suggestion-list");
        const suggestionList = document.getElementById(suggestionListId);
        const dataType = inputField.getAttribute("data-type");

        let suggestionsArray = [];
        switch (dataType) {
            case "farbe":
                suggestionsArray = farben;
                break;
            case "mitarbeiter":
                suggestionsArray = mitarbeiternamen;
                break;
            case "fussboden":
                suggestionsArray = fussbodenMaterialien;
                break;

            case "stockwerk":
                suggestionsArray = stockwerke;
                break;
            default:
                console.warn(`Unbekannter Datentyp: ${dataType}`);
                return;
        }

        inputField.addEventListener("input", function (event) {
            showSuggestions(event.target, suggestionsArray, suggestionList);
        });

        inputField.addEventListener("focus", function () {
            showAllSuggestions(inputField, suggestionsArray, suggestionList);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initializeSuggestionInputs();
});

let roomCount = 0;
let specialRoomCount = 7;

function addRoom() {
    roomCount++;
    specialRoomCount++;
    const roomId = "zimm" + String(roomCount).padStart(2, '0');
    const container = document.getElementById("room-container");
    const roomIdnumber = String(roomCount).padStart(1, '0');

    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room-container");
    roomDiv.setAttribute("id", roomId);

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
        <input type="radio" id="${roomId}-zus01" name="${roomId}-zus">
        <label for="${roomId}-zus01" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-zus02" name="${roomId}-zus">
        <label for="${roomId}-zus02" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-zus03" name="${roomId}-zus">
        <label for="${roomId}-zus03" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-zus04" name="${roomId}-zus">
        <label for="${roomId}-zus04" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-zus05" name="${roomId}-zus">
        <label for="${roomId}-zus05" class="radio-label"></label>
    </td>

</tr>

<tr style="display: table-row;">
 <td colspan="6" style="border-top: 25px solid rgb(255, 255, 255);"></td>
</tr>

<tr class="trennlinie">
    <td class="keine-linie"></td>

</tr>

<tr>
    <th>Bereich</th>
    <th>in Ordnung</th>
    <th>geringe Gebrauchs - spuren</th>
    <th>repa. - bedürftig</th>
    <th>Reparatur durch den Mieter oder Vermieter</th>
    <th>nicht vor handen</th>
</tr>

<tr>
    <td>Tür / Zarge / Beschläge</td>
    <td>
        <input type="radio" id="${roomId}-tuere1" name="${roomId}-tuere">
        <label for="${roomId}-tuere1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-tuere2" name="${roomId}-tuere">
        <label for="${roomId}-tuere2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-tuere3" name="${roomId}-tuere00">
        <label for="${roomId}-tuere3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-tuere5" name="${roomId}-tuere">
        <label for="${roomId}-tuere5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Schlüssel vorhanden</td>
                        <td colspan="2"><select class="dropdown-style2">
                                <option>-</option>
                                <option>ja</option>
                                <option>nein</option>
                            </select></td>
</tr>

<tr>
    <td>Fenster / Beschläge / Glas</td>
    <td>
        <input type="radio" id="${roomId}-fenster1" name="${roomId}-fenster">
        <label for="${roomId}-fenster1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-fenster2" name="${roomId}-fenster">
        <label for="${roomId}-fenster2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-fenster3" name="${roomId}-fenster00">
        <label for="${roomId}-fenster3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-fenster5" name="${roomId}-fenster">
        <label for="${roomId}-fenster5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Jalousie / Rolläden / Klappäden</td>
    <td>
        <input type="radio" id="${roomId}-rollo1" name="${roomId}-rollo">
        <label for="${roomId}-rollo1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-rollo2" name="${roomId}-rollo">
        <label for="${roomId}-rollo2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-rollo3" name="${roomId}-rollo00">
        <label for="${roomId}-rollo3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-rollo5" name="${roomId}-rollo">
        <label for="${roomId}-rollo5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Decke</td>
    <td>
        <input type="radio" id="${roomId}-decke1" name="${roomId}-decke">
        <label for="${roomId}-decke1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-decke2" name="${roomId}-decke">
        <label for="${roomId}-decke2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-decke3" name="${roomId}-decke00">
        <label for="${roomId}-decke3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-decke5" name="${roomId}-decke">
        <label for="${roomId}-decke5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Wände / Tapeten</td>
    <td>
        <input type="radio" id="${roomId}-waende1" name="${roomId}-waende">
        <label for="${roomId}-waende1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-waende2" name="${roomId}-waende">
        <label for="${roomId}-waende2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-waende3" name="${roomId}-waende00">
        <label for="${roomId}-waende3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-waende5" name="${roomId}-waende">
        <label for="${roomId}-waende5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Farbe der Wände</td>
    <td colspan="5">
        <input id="farbeInput${specialRoomCount}" type="text" name="farbe"
            class="testeinzeilig langes-input autoscale suggestion-input" style="width: 350px;" data-type="farbe"
            data-suggestion-list="farbeSuggestions${specialRoomCount}">
        <div id="farbeSuggestions${specialRoomCount}" class="suggestion-list"></div>
    </td>
</tr>

<tr>
    <td style="padding-bottom: 20px; padding-top:20px">Heizkörper / Ventile / Rohre</td>
    <td>
        <input type="radio" id="${roomId}-heizkoerper1" name="${roomId}-heizkoerper">
        <label for="${roomId}-heizkoerper1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-heizkoerper2" name="${roomId}-heizkoerper">
        <label for="${roomId}-heizkoerper2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-heizkoerper3" name="${roomId}-heizkoerper00">
        <label for="${roomId}-heizkoerper3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-heizkoerper5" name="${roomId}-heizkoerper">
        <label for="${roomId}-heizkoerper5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td>Fußboden Material</td>
    <td colspan="5">
        <input id="fussbodenInput${specialRoomCount}" type="text" name="fussboden"
            class="testeinzeilig langes-input autoscale suggestion-input" style="width: 350px;" data-type="fussboden"
            data-suggestion-list="fussbodenSuggestions${specialRoomCount}">
        <div id="fussbodenSuggestions${specialRoomCount}" class="suggestion-list"></div>
    </td>
</tr>

<tr>
    <td>Fußboden / Leisten</td>
    <td>
        <input type="radio" id="${roomId}-fussboden1" name="${roomId}-fussboden">
        <label for="${roomId}-fussboden1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-fussboden2" name="${roomId}-fussboden">
        <label for="${roomId}-fussboden2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-fussboden3" name="${roomId}-fussboden00">
        <label for="${roomId}-fussboden3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-fussboden5" name="${roomId}-fussboden">
        <label for="${roomId}-fussboden5" class="radio-label"></label>
    </td>
</tr>

<tr>
    <td style="padding-bottom: 20px; padding-top:20px">Radio- / Fernseh- / Internetdose</td>
    <td>
        <input type="radio" id="${roomId}-internet1" name="${roomId}-internet">
        <label for="${roomId}-internet1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-internet2" name="${roomId}-internet">
        <label for="${roomId}-internet2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-internet3" name="${roomId}-internet00">
        <label for="${roomId}-internet3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-internet5" name="${roomId}-internet">
        <label for="${roomId}-internet5" class="radio-label"></label>
    </td>
</tr>

<tr>

<tr>
    <td style="padding-bottom: 20px;">Steckdosen / Lichtschalter</td>
    <td>
        <input type="radio" id="${roomId}-elektrik1" name="${roomId}-elektrik">
        <label for="${roomId}-elektrik1" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-elektrik2" name="${roomId}-elektrik">
        <label for="${roomId}-elektrik2" class="radio-label"></label>
    </td>
    <td>
        <input type="radio" id="${roomId}-elektrik3" name="${roomId}-elektrik00">
        <label for="${roomId}-elektrik3" class="radio-label"></label>
    </td>
    <td><select class="dropdown-style2">
            <option>-</option>
            <option>Mieter</option>
            <option>Vermieter</option>
            <option>in Klärung</option>
        </select></td>
    <td>
        <input type="radio" id="${roomId}-elektrik5" name="${roomId}-elektrik">
        <label for="${roomId}-elektrik5" class="radio-label"></label>
    </td>
</tr>

<tr>

<tr>
    <td class="rwm-label">Anzahl der Rauchwarnmelder</td>
    <td colspan="4" class="rwm-input-container">
        <input type="number" id="rwm-count${roomId}" name="rwm-count" min="1" class="rwm-input">
    </td>
</tr>

<tr>
    <td colspan="6" style="vertical-align: top; font-weight:600; padding-top:15px;">Bemerkungen zu Zimmer
        ${roomIdnumber}:</td>
</tr>
    `;

    const mainButtonContainer = document.createElement("div");
    mainButtonContainer.classList.add("main-button-container");

    const mainButton = document.createElement("button");
    mainButton.classList.add("main-upload-button");
    mainButton.innerHTML = "+ Bilder hinzufügen (Zimmer " + roomCount + ")";

    const choiceMenu = document.createElement("div");
    choiceMenu.classList.add("choice-menu");
    choiceMenu.style.display = "none";

    const cameraChoice = document.createElement("label");
    cameraChoice.setAttribute("for", `camera-${roomId}`);
    cameraChoice.classList.add("menu-choice");
    cameraChoice.innerHTML = "📷 Kamera verwenden";

    const cameraInput = document.createElement("input");
    cameraInput.type = "file";
    cameraInput.accept = "image/*";
    cameraInput.id = `camera-${roomId}`;
    cameraInput.hidden = true;
    cameraInput.setAttribute("capture", "environment");

    const fileChoice = document.createElement("label");
    fileChoice.setAttribute("for", `file-${roomId}`);
    fileChoice.classList.add("menu-choice");
    fileChoice.innerHTML = "📁 Dateien auswählen";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.id = `file-${roomId}`;
    fileInput.hidden = true;

    mainButton.addEventListener("click", function (e) {
        e.stopPropagation();
        choiceMenu.style.display = choiceMenu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", function () {
        choiceMenu.style.display = "none";
    });

    const handleUpload = (event) => {
        choiceMenu.style.display = "none";
        handleFileUpload(event, roomId);
    };

    cameraInput.addEventListener("change", handleUpload);
    fileInput.addEventListener("change", handleUpload);

    choiceMenu.appendChild(cameraChoice);
    choiceMenu.appendChild(cameraInput);
    choiceMenu.appendChild(fileChoice);
    choiceMenu.appendChild(fileInput);

    mainButtonContainer.appendChild(mainButton);
    mainButtonContainer.appendChild(choiceMenu);

    const roomTitle = document.createElement("h3");
    roomTitle.textContent = "Zimmer " + roomCount;

    const remarkSection = document.createElement("div");
    remarkSection.classList.add("remark-row");
    remarkSection.innerHTML = `
        <input type="text" name="remark" class="autoscale" placeholder="">
    `;

    const addRemarkButton = document.createElement("button");
    addRemarkButton.classList.add("add-remark-btn");
    addRemarkButton.textContent = "+";
    addRemarkButton.onclick = function () { addRemark(roomDiv); };

    roomDiv.appendChild(roomTitle);
    roomDiv.appendChild(table);
    roomDiv.appendChild(remarkSection);
    roomDiv.appendChild(addRemarkButton);
    roomDiv.appendChild(mainButtonContainer);

    const imageSection = document.createElement("div");
    imageSection.classList.add("image-preview");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.id = `preview-${roomId}`;

    imageSection.appendChild(imageContainer);
    roomDiv.appendChild(imageSection);
    container.appendChild(roomDiv);
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
        largeImageContainer.appendChild(largeRoomTitle);

        largeRoomImages = document.createElement("div");
        largeRoomImages.classList.add("large-image-container");
        largeRoomImages.setAttribute("id", "large-preview-" + roomId);
        largeImageContainer.appendChild(largeRoomImages);
    }

    const files = event.target.files;
    for (let file of files) {
        const imgId = "img-" + roomId + "-" + Math.random().toString(36).substr(2, 9);
        const imgUrl = URL.createObjectURL(file); 

        const smallImageWrapper = document.createElement("div");
        smallImageWrapper.setAttribute("id", "wrapper-" + imgId);
        smallImageWrapper.classList.add("image-wrapper");

        const imgSmall = document.createElement("img");
        imgSmall.setAttribute("src", imgUrl);

        const deleteBtnSmall = document.createElement("button");
        deleteBtnSmall.textContent = "X";
        deleteBtnSmall.classList.add("delete-btn");
        deleteBtnSmall.onclick = function () {
            deleteImage(imgId, imgUrl);
        };

        smallImageWrapper.appendChild(imgSmall);
        smallImageWrapper.appendChild(deleteBtnSmall);
        previewDiv.appendChild(smallImageWrapper);

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("large-image-wrapper");
        imageWrapper.setAttribute("id", "large-wrapper-" + imgId);

        const label = document.createElement("p");
        label.textContent = "Zimmer " + roomCount;

        const imgLarge = document.createElement("img");
        imgLarge.setAttribute("src", imgUrl);

        const deleteBtnLarge = document.createElement("button");
        deleteBtnLarge.textContent = "X";
        deleteBtnLarge.classList.add("delete-btn");
        deleteBtnLarge.onclick = function () {
            deleteImage(imgId, imgUrl);
        };

        imageWrapper.appendChild(label);
        imageWrapper.appendChild(imgLarge);
        imageWrapper.appendChild(deleteBtnLarge);
        largeRoomImages.appendChild(imageWrapper);
    }

    function deleteImage(imgId, imgUrl) {
        const smallImageWrapper = document.getElementById("wrapper-" + imgId);
        const largeImageWrapper = document.getElementById("large-wrapper-" + imgId);

        if (smallImageWrapper) smallImageWrapper.remove();
        if (largeImageWrapper) largeImageWrapper.remove();

        URL.revokeObjectURL(imgUrl);
    }
}

function deleteImage(imgId) {
    const smallImageWrapper = document.getElementById("wrapper-" + imgId);
    const largeImageWrapper = document.getElementById("large-wrapper-" + imgId);

    if (smallImageWrapper) smallImageWrapper.remove();
    if (largeImageWrapper) largeImageWrapper.remove();
}
