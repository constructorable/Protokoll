let roomCount = 0;

function addRoom() {
    roomCount++;
    const roomId = "zimm" + String(roomCount).padStart(2, '0');
    const container = document.getElementById("room-container");

    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room-container");
    roomDiv.setAttribute("id", roomId);

    // Haupt-Button Container
    const mainButtonContainer = document.createElement("div");
    mainButtonContainer.classList.add("main-button-container");

    // Haupt-Button
    const mainButton = document.createElement("button");
    mainButton.classList.add("main-upload-button");
    mainButton.innerHTML = "+ Bilder hinzufügen (Zimmer " + roomCount + ")";

    // Auswahlmenü (initial versteckt)
    const choiceMenu = document.createElement("div");
    choiceMenu.classList.add("choice-menu");
    choiceMenu.style.display = "none";

    // Kamera-Option
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

    // Datei-Option
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

    // Event-Listener
    mainButton.addEventListener("click", function (e) {
        e.stopPropagation();
        choiceMenu.style.display = choiceMenu.style.display === "none" ? "block" : "none";
    });

    // Schließe Menü bei Klick außerhalb
    document.addEventListener("click", function () {
        choiceMenu.style.display = "none";
    });

    const handleUpload = (event) => {
        choiceMenu.style.display = "none";
        handleFileUpload(event, roomId);
    };

    cameraInput.addEventListener("change", handleUpload);
    fileInput.addEventListener("change", handleUpload);

    // Elemente zusammenbauen
    choiceMenu.appendChild(cameraChoice);
    choiceMenu.appendChild(cameraInput);
    choiceMenu.appendChild(fileChoice);
    choiceMenu.appendChild(fileInput);

    mainButtonContainer.appendChild(mainButton);
    mainButtonContainer.appendChild(choiceMenu);
    roomDiv.appendChild(mainButtonContainer);

    // Bildervorschau (unverändert)
    const imageSection = document.createElement("div");
    imageSection.classList.add("image-preview");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.id = `preview-${roomId}`;

    imageSection.appendChild(imageContainer);
    roomDiv.appendChild(imageSection);
    container.appendChild(roomDiv);
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
        const imgUrl = URL.createObjectURL(file); // Erzeugt eine Blob-URL

        // Vorschau für das Bild im jeweiligen Zimmer
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

        // Große Ansicht für das Bild im jeweiligen Zimmer
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("large-image-wrapper");
        imageWrapper.setAttribute("id", "large-wrapper-" + imgId);

        const label = document.createElement("p");
        label.textContent = "Zimmer " + roomId;

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

    // Angepasste deleteImage-Funktion, um Blob-URLs freizugeben
    function deleteImage(imgId, imgUrl) {
        const smallImageWrapper = document.getElementById("wrapper-" + imgId);
        const largeImageWrapper = document.getElementById("large-wrapper-" + imgId);

        if (smallImageWrapper) smallImageWrapper.remove();
        if (largeImageWrapper) largeImageWrapper.remove();

        // Speicher freigeben
        URL.revokeObjectURL(imgUrl);
    }
}

function deleteImage(imgId) {
    const smallImageWrapper = document.getElementById("wrapper-" + imgId);
    const largeImageWrapper = document.getElementById("large-wrapper-" + imgId);

    if (smallImageWrapper) smallImageWrapper.remove();
    if (largeImageWrapper) largeImageWrapper.remove();
}
