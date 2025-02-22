// Warte, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    // Definiere ein Array mit Stockwerk-Optionen
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
    ];

    // Funktion, um Vorschläge basierend auf der Benutzereingabe anzuzeigen
    function showSuggestions(input) {
        const inputValue = input.value.toLowerCase();
        const suggestions = stockwerke.filter(stockwerk =>
            stockwerk.toLowerCase().startsWith(inputValue)
        );

        // Lösche alte Vorschläge
        const suggestionList = document.getElementById("stockwerkSuggestions");
        suggestionList.innerHTML = "";

        // Zeige neue Vorschläge an
        suggestions.forEach(stockwerk => {
            const option = document.createElement("div");
            option.textContent = stockwerk;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                // Setze den ausgewählten Stockwerk-Namen ins Input-Feld
                input.value = stockwerk;
                // Verstecke die Vorschlagsliste
                suggestionList.innerHTML = "";
            });
            suggestionList.appendChild(option);
        });

        // Zeige die Vorschlagsliste an, wenn es passende Vorschläge gibt
        if (suggestions.length > 0) {
            suggestionList.style.display = "block";
        } else {
            suggestionList.style.display = "none";
        }
    }

    // Event-Listener für das Input-Feld (Lage/Stockwerk)
    document.getElementById("lageeinzug").addEventListener("input", function (event) {
        showSuggestions(event.target);
    });

    // Verstecke die Vorschlagsliste, wenn außerhalb geklickt wird
    document.addEventListener("click", function (event) {
        if (event.target.id !== "lageeinzug") {
            document.getElementById("stockwerkSuggestions").style.display = "none";
        }
    });
});