/* Copyright - Oliver Acker, acker_oliver@yahoo.de
suggestion.js
Version 3.35_beta */

const mitarbeiternamen = [
    "Christian Adler",
    "Oliver Acker",
    "Manfred Launicke",
    "Claus Zechmeister",
    "Marli Smith",
    "Darius Andörfer",
    "Stefanie Muscat"
];

const farben = [

    "weiß",
    "beige",
    "grau",        
    "hellgrau",    
    "anthrazit",
    "creme",
    "creme-weiß",
    "elfenbein",
    "taubenblau",
    "hellblau",
    "dunkelblau",
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
    "sonstige",

    "rot",
    "hellrot",
    "dunkelrot",
    "karminrot",
    "weinrot",

    "grün",
    "hellgrün",
    "dunkelgrün",
    "waldgrün",
    "apfelgrün",

    "braun",
    "hellbraun",
    "dunkelbraun",
    "kakao",
    "mahagoni",

    "mittelgrau",
    "steingrau",
    "silbergrau",

    "lila",
    "helllila",
    "dunkellila",
    "flieder",
    "lavendel",

    "rosa",
    "hellrosa",
    "dunkelrosa",
    "puderrosa",
    "altrosa",

    "gelb",
    "hellgelb",
    "dunkelgelb",
    "sonnenblumengelb",
    "goldgelb"
];

const fussbodenMaterialien = [
    "Holz - Parkett",
    "Holz - Parkett, Eiche",
    "Holz - Parkett, Esche",
    "Holz - Parkett, Kiefer",
    "Holz - Parkett, Meranti",
    "Holz - Parkett, Lärche",
    "Holz",
    "Holz - Dielen",
    "Holz - Dielen, Eiche",
    "Holz - Dielen, Kiefer",
    "Holz - Dielen, Lärche",
    "Holz - Dielen, Esche",
    "Holz - Dielen, Meranti",
    "Holz - Dielen, Bambus",
    "Laminat",
    "Laminat - Optik Buche",
    "Laminat - Optik Esche",
    "Laminat - Optik Eiche",
    "Laminat - Optik Kiefer",
    "Laminat - Optik Stein",
    "Laminat - Optik terrakotta",
    "Laminat - Optik Bunt / Musterung",
    "Fliesen",
    "Fliesen - beige",
    "Fliesen - weiß",
    "Fliesen - schwarz",
    "Fliesen - grau",
    "Fliesen - blau",
    "Fliesen - grün",
    "Fliesen - terrakotta",
    "Teppich",
    "Teppich - grau",
    "Teppich - blau",
    "Teppich - beige",
    "Teppich - schwarz",
    "Teppich - gemustert",
    "Vinyl",
    "Vinyl - Optik Buche",
    "Vinyl - Optik Esche",
    "Vinyl - Optik Eiche",
    "Vinyl - Optik Kiefer",
    "Vinyl - Optik Stein",
    "Vinyl - Optik terrakotta",
    "Vinyl - Optik Bunt / Musterung",
    "PVC",
    "PVC - Optik Buche",
    "PVC - Optik Esche",
    "PVC - Optik Eiche",
    "PVC - Optik Kiefer",
    "PVC - Optik Stein",
    "PVC - Optik terrakotta",
    "PVC - Optik Bunt / Musterung",
    "Beton",
    "Betonoptik",
    "Kork",
    "Naturstein",
    "Marmor",
    "Granit",
    "Linoleum",
    "Terrazzo",
    "Zement",
    "Kunststoff",
    "sonstiger Bodenbelag"
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

document.addEventListener("DOMContentLoaded", function () {

    function updateSignFields() {
        document.getElementById("strasseeinzugsign").textContent = document.getElementById("strasseeinzug").value;
        document.getElementById("lageeinzugsign").textContent = document.getElementById("lageeinzug2").value;
        document.getElementById("plzeinzugsign").textContent = document.getElementById("plzeinzug").value;
        document.getElementById("datumsign").textContent = document.getElementById("datum").value;
    }

    function showSuggestions(input, suggestionsArray, suggestionList) {
        const inputValue = input.value.toLowerCase();

        const suggestions = suggestionsArray.filter(item =>
            item.toLowerCase().includes(inputValue)
        );

        suggestionList.innerHTML = "";

        suggestions.forEach(item => {
            const option = document.createElement("div");
            option.textContent = item;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                input.value = item;
                suggestionList.innerHTML = "";
                updateSignFields();
            });
            suggestionList.appendChild(option);
        });

        if (suggestions.length > 0) {
            suggestionList.style.display = "block";
        } else {
            suggestionList.style.display = "none";
        }
    }

    function showAllSuggestions(inputField, suggestionsArray, suggestionList) {
        suggestionList.innerHTML = "";

        suggestionsArray.forEach(item => {
            const option = document.createElement("div");
            option.textContent = item;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                inputField.value = item; 
                suggestionList.innerHTML = ""; 
                updateSignFields(); 
            });
            suggestionList.appendChild(option);
        });

        suggestionList.style.display = "block";
    }

    function setupInputField(inputField, suggestionsArray, suggestionListId) {
        const suggestionList = document.getElementById(suggestionListId);

        inputField.addEventListener("focus", function () {
            showAllSuggestions(inputField, suggestionsArray, suggestionList);
        });

        inputField.addEventListener("input", function (event) {
            showSuggestions(event.target, suggestionsArray, suggestionList);
        });
    }

    document.addEventListener("input", function (event) {
        try {
            // 1. Sicherstellen, dass target ein gültiges DOM-Element mit classList ist
            const target = event.target;
            if (!target || typeof target.classList === 'undefined' || !target.classList.contains) {
                return;
            }
    
            // 2. Nur für Elemente mit Klasse 'suggestion-input' ausführen
            if (target.classList.contains("suggestion-input")) {
                // 3. Sicherstellen, dass benötigte Attribute existieren
                const suggestionListId = target.getAttribute("data-suggestion-list");
                const dataType = target.getAttribute("data-type");
                
                if (!suggestionListId || !dataType) {
                    console.warn("Fehlende erforderliche Attribute:", { suggestionListId, dataType });
                    return;
                }
    
                // 4. Suggestion-Liste finden
                const suggestionList = document.getElementById(suggestionListId);
                if (!suggestionList) {
                    console.warn("Suggestion-Liste nicht gefunden:", suggestionListId);
                    return;
                }
    
                // 5. Passendes Array basierend auf dataType auswählen
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
                    default:
                        console.warn(`Unbekannter Datentyp: ${dataType}`);
                        return;
                }
    
                // 6. Suggestions anzeigen (mit zusätzlicher Prüfung)
                if (Array.isArray(suggestionsArray)) {
                    showSuggestions(target, suggestionsArray, suggestionList);
                } else {
                    console.warn("SuggestionsArray ist kein Array:", suggestionsArray);
                }
            }
        } catch (error) {
            console.debug("Fehler im input-Event-Listener:", error);
            // Optional: Fehler an einen Error-Service melden
            // trackError(error);
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
        try {
            const target = event.target;
            // Sicherheitsprüfung für target und classList
            if (!target || typeof target.classList === 'undefined' || !target.classList.contains) {
                return;
            }
            
            if (!target.classList.contains("suggestion-input")) {
                document.querySelectorAll(".suggestion-list").forEach(list => {
                    list.style.display = "none";
                });
            }
        } catch (error) {
            console.debug("Klick auf nicht-DOM-Element ignoriert:", error); // Optional: Fehler loggen
        }
    });

    updateSignFields();
});

document.addEventListener('DOMContentLoaded', function () {

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) { 
                    const inputs = node.querySelectorAll ?
                        node.querySelectorAll('input[name="bezeich-lage"]') : [];
                    inputs.forEach(initAutocomplete);

                    if (node.tagName === 'INPUT' && node.name === 'bezeich-lage') {
                        initAutocomplete(node);
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.querySelectorAll('input[name="bezeich-lage"]').forEach(initAutocomplete);
});

function initAutocomplete(input) {
    try {
        // 1. Input-Validierung
        if (!input || !input.dataset) return;
        if (input.dataset.autocompleteInit) return;
        input.dataset.autocompleteInit = 'true';

        // 2. Suggestions-Array
        const suggestions = [
            'links', 'rechts', 'hinten', 'vorne', 'mitte',
            'links (hofseitig)', 'rechts (hofseitig)',
            'vorne (hofseitig)', 'hinten (hofseitig)', 'mitte (hofseitig)',
            'links (straßenseitig)', 'rechts (straßenseitig)',
            'vorne (straßenseitig)', 'hinten (straßenseitig)', 'mitte (straßenseitig)',
            'straßenseitig', 'hofseitig',
            'Wohnzimmer', 'Arbeitszimmer', 'Kinderzimmer',
            'Schlafzimmer', 'Abstellraum', 'Esszimmer', 'Hobbyraum'
        ];

        // 3. Variablen initialisieren
        let activeIndex = -1;
        let currentSuggestions = [];
        const dropdown = document.createElement('div');
        dropdown.className = 'suggestion-dropdown';
        dropdown.style.display = 'none';

        // 4. Hilfsfunktionen
        const positionDropdown = () => {
            try {
                const rect = input.getBoundingClientRect();
                dropdown.style.position = 'absolute';
                dropdown.style.left = `${rect.left + window.scrollX}px`;
                dropdown.style.top = `${rect.bottom + window.scrollY}px`;
                dropdown.style.width = `${rect.width}px`;
            } catch (error) {
                console.debug('Positionierung fehlgeschlagen:', error);
            }
        };

        const highlightItem = (items, index) => {
            try {
                items.forEach(item => item.classList.remove('highlighted'));
                if (index >= 0 && items[index]) {
                    items[index].classList.add('highlighted');
                    items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            } catch (error) {
                console.debug('Highlight fehlgeschlagen:', error);
            }
        };

        // 5. Dropdown zum DOM hinzufügen
        document.body.appendChild(dropdown);

        // 6. Event-Listener
        input.addEventListener('input', function(e) {
            try {
                const value = e.target.value.toLowerCase();
                dropdown.innerHTML = '';
                activeIndex = -1;

                if (!value) {
                    dropdown.style.display = 'none';
                    return;
                }

                currentSuggestions = suggestions.filter(item => 
                    item.toLowerCase().includes(value)
                );

                if (currentSuggestions.length > 0) {
                    positionDropdown();
                    currentSuggestions.sort((a, b) => 
                        a.toLowerCase().startsWith(value) ? 0 : 1 - 
                        (b.toLowerCase().startsWith(value) ? 0 : 1)
                    );

                    currentSuggestions.forEach((item, index) => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'suggestion-item';
                        
                        const matchIndex = item.toLowerCase().indexOf(value);
                        if (matchIndex >= 0) {
                            const before = item.substring(0, matchIndex);
                            const match = item.substring(matchIndex, matchIndex + value.length);
                            const after = item.substring(matchIndex + value.length);
                            suggestionItem.innerHTML = `${before}<strong>${match}</strong>${after}`;
                        } else {
                            suggestionItem.textContent = item;
                        }

                        suggestionItem.addEventListener('click', () => {
                            input.value = item;
                            dropdown.style.display = 'none';
                        });
                        dropdown.appendChild(suggestionItem);
                    });
                    dropdown.style.display = 'block';
                } else {
                    dropdown.style.display = 'none';
                }
            } catch (error) {
                console.debug('Input-Event fehlgeschlagen:', error);
                dropdown.style.display = 'none';
            }
        });

        input.addEventListener('keydown', function(e) {
            try {
                const items = dropdown.querySelectorAll('.suggestion-item');
                
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        activeIndex = (activeIndex + 1) % currentSuggestions.length;
                        highlightItem(items, activeIndex);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        activeIndex = (activeIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
                        highlightItem(items, activeIndex);
                        break;
                    case 'Enter':
                        if (activeIndex >= 0) {
                            e.preventDefault();
                            input.value = currentSuggestions[activeIndex];
                            dropdown.style.display = 'none';
                        }
                        break;
                    case 'Escape':
                        dropdown.style.display = 'none';
                        break;
                }
            } catch (error) {
                console.debug('Tastatureingabe fehlgeschlagen:', error);
            }
        });

        input.addEventListener('blur', function() {
            setTimeout(() => {
                try {
                    if (!dropdown.contains(document.activeElement)) {
                        dropdown.style.display = 'none';
                    }
                } catch (error) {
                    console.debug('Blur-Event fehlgeschlagen:', error);
                }
            }, 200);
        });

        // 7. Styles hinzufügen
        if (!document.getElementById('suggestion-styles')) {
            try {
                const style = document.createElement('style');
                style.id = 'suggestion-styles';
                style.textContent = `
                    .suggestion-dropdown {
                        border: 1px solid #ddd;
                        background: white;
                        z-index: 1000;
                        max-height: 200px;
                        overflow-y: auto;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        border-radius: 4px;
                        margin-top: 2px;
                    }
                    .suggestion-item {
                        padding: 8px 12px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .suggestion-item:hover, 
                    .suggestion-item.highlighted {
                        background-color: #f0f7ff;
                    }
                    .suggestion-item strong {
                        font-weight: bold;
                        color: #0066cc;
                    }
                `;
                document.head.appendChild(style);
            } catch (error) {
                console.debug('Style-Erstellung fehlgeschlagen:', error);
            }
        }

    } catch (error) {
        console.error('Autocomplete-Initialisierung fehlgeschlagen:', error);
    }
}
