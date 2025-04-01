// Copyright - Oliver Acker, acker_oliver@yahoo.de
// Version 3.23

// suggestion.js

// Definiere das Array mit den Mitarbeiternamen
const mitarbeiternamen = [
    "Christian Adler",
    "Oliver Acker",
    "Manfred Launicke",
    "Claus Zechmeister",
    "Marli Smith",
    "Darius Andörfer"
];

// Definiere das Array mit den Farben
const farben = [
    "weiß",
    "beige",
    "grau",
    "hellgrau",
    "anthrazit",
    "creme",
    "elfenbein",
    "taubenblau",
    "mintgrün",
    "pastellrosa",
    "sand",
    "terrakotta",
    "olivgrün",
    "taupe",
    "vanille",
    "himmelblau",
    "lachs",
    "moosgrün",
    "zitronengelb",
    "sonstige"
];

// Definiere das Array mit den Fußbodenmaterialien
const fussbodenMaterialien = [
    "Parkett",
    "Laminat",
    "Fliesen",
    "Teppich",
    "Vinyl",
    "Betonoptik",
    "Kork",
    "Naturstein",
    "Marmor",
    "Granit",
    "Linoleum",
    "Dielen",
    "Eichenholz",
    "Bambus",
    "Terrazzo",
    "Zement",
    "Kunststoff",
    "Gummi",
    "Keramik",
    "sonstige"
];

const fussbodenFarben = [
    "braun",
    "holz",
    "hellbraun",
    "dunkelbraun",
    "natur",
    "eiche",
    "nussbaum",
    "kiefer",
    "fichte",
    "anthrazit",
    "grau",
    "schwarz",
    "bunt",
    "sonstige"
];

const stockwerke = [
    "EG rechts",
    "EG links",
    "EG mitte",
    "1. OG rechts",
    "1. OG links",
    "1. OG mitte",
    "2. OG rechts",
    "2. OG links",
    "2. OG mitte",
    "3. OG rechts",
    "3. OG links",
    "3. OG mitte",
    "4. OG rechts",
    "4. OG links",
    "4. OG mitte",
    "5. OG rechts",
    "5. OG links",
    "5. OG mitte",
    "6. OG rechts",
    "6. OG links",
    "6. OG mitte",
    "DG rechts",
    "DG links",
    "DG mitte",
    "Souterrain",
    "RG, EG rechts",
    "RG, EG links",
    "RG, EG mitte",
    "RG, 1. OG rechts",
    "RG, 1. OG links",
    "RG, 1. OG mitte",
    "RG, 2. OG rechts",
    "RG, 2. OG links",
    "RG, 2. OG mitte",
    "RG, 3. OG rechts",
    "RG, 3. OG links",
    "RG, 3. OG mitte",
    "RG, 4. OG rechts",
    "RG, 4. OG links",
    "RG, 4. OG mitte",
    "RG, 5. OG rechts",
    "RG, 5. OG links",
    "RG, 5. OG mitte",
    "RG, 6. OG rechts",
    "RG, 6. OG links",
    "RG, 6. OG mitte",
    "RG, DG rechts",
    "RG, DG links",
    "RG, DG mitte",
    "RG, Souterrain"
];

// Warte, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Aktualisieren der Signaturfelder
    function updateSignFields() {
        document.getElementById("strasseeinzugsign").textContent = document.getElementById("strasseeinzug").value;
        document.getElementById("lageeinzugsign").textContent = document.getElementById("lageeinzug2").value;
        document.getElementById("plzeinzugsign").textContent = document.getElementById("plzeinzug").value;
        document.getElementById("datumsign").textContent = document.getElementById("datum").value;
    }


    // Funktion, um Vorschläge basierend auf der Benutzereingabe anzuzeigen
    function showSuggestions(input, suggestionsArray, suggestionList) {
        const inputValue = input.value.toLowerCase();
        const suggestions = suggestionsArray.filter(item =>
            item.toLowerCase().startsWith(inputValue)
        );

        suggestionList.innerHTML = "";

        suggestions.forEach(item => {
            const option = document.createElement("div");
            option.textContent = item;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                input.value = item; // Setze den ausgewählten Wert in das Input-Feld
                suggestionList.innerHTML = ""; // Leere die Vorschlagsliste
                updateSignFields(); // Aktualisiere die Signaturfelder SOFORT
            });
            suggestionList.appendChild(option);
        });

        if (suggestions.length > 0) {
            suggestionList.style.display = "block";
        } else {
            suggestionList.style.display = "none";
        }
    }

    // Funktion, um alle Vorschläge anzuzeigen (beim Fokus auf das Input-Feld)
    function showAllSuggestions(inputField, suggestionsArray, suggestionList) {
        suggestionList.innerHTML = "";

        suggestionsArray.forEach(item => {
            const option = document.createElement("div");
            option.textContent = item;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                inputField.value = item; // Setze den ausgewählten Wert in das Input-Feld
                suggestionList.innerHTML = ""; // Leere die Vorschlagsliste
                updateSignFields(); // Aktualisiere die Signaturfelder SOFORT
            });
            suggestionList.appendChild(option);
        });

        suggestionList.style.display = "block";
    }

    // Funktion, um Event-Listener für Input-Felder zu registrieren
    function setupInputField(inputField, suggestionsArray, suggestionListId) {
        const suggestionList = document.getElementById(suggestionListId);

        // Zeige alle Vorschläge an, wenn das Input-Feld den Fokus erhält
        inputField.addEventListener("focus", function () {
            showAllSuggestions(inputField, suggestionsArray, suggestionList);
        });

        // Zeige gefilterte Vorschläge an, während der Benutzer tippt
        inputField.addEventListener("input", function (event) {
            showSuggestions(event.target, suggestionsArray, suggestionList);
        });
    }

    // Event-Listener für alle Input-Felder mit der Klasse "suggestion-input"
    document.addEventListener("input", function (event) {
        const target = event.target;
        if (target.classList.contains("suggestion-input")) {
            const suggestionListId = target.getAttribute("data-suggestion-list");
            const suggestionList = document.getElementById(suggestionListId);
            const dataType = target.getAttribute("data-type");

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
                case "fussboden-farbe":
                    suggestionsArray = fussbodenFarben;
                    break;
                case "stockwerk":
                    suggestionsArray = stockwerke;
                    break;
                default:
                    console.warn(`Unbekannter Datentyp: ${dataType}`);
                    return;
            }

            showSuggestions(target, suggestionsArray, suggestionList);
        }
    });


    document.addEventListener("focus", function (event) {
        const target = event.target;
        if (target.classList.contains("suggestion-input")) {
            const suggestionListId = target.getAttribute("data-suggestion-list");
            const suggestionList = document.getElementById(suggestionListId);
            const dataType = target.getAttribute("data-type");

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
                case "fussboden-farbe":
                    suggestionsArray = fussbodenFarben;
                    break;
                case "stockwerk":
                    suggestionsArray = stockwerke;
                    break;
                default:
                    console.warn(`Unbekannter Datentyp: ${dataType}`);
                    return;
            }

            showAllSuggestions(target, suggestionsArray, suggestionList);
        }
    }, true);


    document.addEventListener("click", function (event) {
        const target = event.target;
        // Prüfe, ob target ein Element ist und classList hat
        if (target && target.classList && !target.classList.contains("suggestion-input")) {
            document.querySelectorAll(".suggestion-list").forEach(list => {
                list.style.display = "none";
            });
        }
    });

    // Initialisiere die Signaturfelder beim Laden der Seite
    updateSignFields();
});