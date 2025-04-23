/* Copyright - Oliver Acker, acker_oliver@yahoo.de
suggestion.js
Version 3.32_beta */

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

        if (target && target.classList && !target.classList.contains("suggestion-input")) {
            document.querySelectorAll(".suggestion-list").forEach(list => {
                list.style.display = "none";
            });
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

    if (input.dataset.autocompleteInit) return;
    input.dataset.autocompleteInit = 'true';

    const suggestions = [
        'links',
        'rechts',
        'hinten',
        'vorne',
        'mitte',
        'links (hofseitig)',
        'rechts (hofseitig)',
        'vorne (hofseitig)',
        'hinten (hofseitig)',
        'mitte (hofseitig)',
        'links (straßenseitig)',
        'rechts (straßenseitig)',
        'vorne (straßenseitig)',
        'hinten (straßenseitig)',
        'mitte (straßenseitig)',
        'straßenseitig',
        'hofseitig',
        'Wohnzimmer',
        'Arbeitszimmer',
        'Kinderzimmer',
        'Schlafzimmer',
        'Abstellraum',
        'Esszimmer',
        'Hobbyraum'
    ];

    let activeIndex = -1;
    let currentSuggestions = [];

    const dropdown = document.createElement('div');
    dropdown.className = 'suggestion-dropdown';
    dropdown.style.display = 'none';

    function positionDropdown() {
        const rect = input.getBoundingClientRect();
        dropdown.style.position = 'absolute';
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.width = `${rect.width}px`;
    }

    document.body.appendChild(dropdown);

    input.addEventListener('input', function (e) {
        const value = e.target.value.toLowerCase();
        dropdown.innerHTML = '';
        activeIndex = -1;

        if (value.length === 0) {
            dropdown.style.display = 'none';
            return;
        }

        currentSuggestions = suggestions.filter(item =>
            item.toLowerCase().includes(value)
        );

        if (currentSuggestions.length > 0) {
            positionDropdown();

            currentSuggestions.sort((a, b) => {
                const aStartsWith = a.toLowerCase().startsWith(value) ? 0 : 1;
                const bStartsWith = b.toLowerCase().startsWith(value) ? 0 : 1;
                return aStartsWith - bStartsWith;
            });

            currentSuggestions.forEach((item, index) => {
                const suggestionItem = document.createElement('div');

                const matchIndex = item.toLowerCase().indexOf(value);
                if (matchIndex >= 0) {
                    const before = item.substring(0, matchIndex);
                    const match = item.substring(matchIndex, matchIndex + value.length);
                    const after = item.substring(matchIndex + value.length);

                    suggestionItem.innerHTML = `${before}${match}${after}`;
                } else {
                    suggestionItem.textContent = item;
                }

                suggestionItem.className = 'suggestion-item';
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
    });

    input.addEventListener('keydown', function (e) {
        const items = dropdown.querySelectorAll('.suggestion-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % currentSuggestions.length;
            highlightItem(items, activeIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
            highlightItem(items, activeIndex);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            input.value = currentSuggestions[activeIndex];
            dropdown.style.display = 'none';
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });

    function highlightItem(items, index) {
        items.forEach(item => item.classList.remove('highlighted'));
        if (index >= 0 && items[index]) {
            items[index].classList.add('highlighted');
            items[index].scrollIntoView({ block: 'nearest' });
        }
    }

    input.addEventListener('blur', function () {
        setTimeout(() => {
            if (!dropdown.contains(document.activeElement)) {
                dropdown.style.display = 'none';
            }
        }, 200);
    });

    if (!document.getElementById('suggestion-styles')) {
        const style = document.createElement('style');
        style.id = 'suggestion-styles';
        style.textContent = `
            .suggestion-dropdown {
                border: 1px solid #ddd;
                background: white;
                z-index: 1000;
                max-height: 150px;
                overflow-y: auto;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .suggestion-item {
                padding: 8px 12px;
                cursor: pointer;
            }
            .suggestion-item:hover, .suggestion-item.highlighted {
                background-color: #f0f0f0;
            }

        `;
        document.head.appendChild(style);
    }
}
