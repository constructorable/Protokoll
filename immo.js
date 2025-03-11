// Copyright - Oliver Acker, acker_oliver@yahoo.de
// Version 3.2
// immo.js

// Warte, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    // Definiere ein Array mit Straßennamen, Postleitzahlen und Orten
    const strassen = [
        { name: "Amalienstr. 38", plz: "90419", ort: "Nürnberg" },
        { name: "Ammonstr. 2", plz: "90762", ort: "Fürth" },
        { name: "Ammonstr. 4", plz: "90762", ort: "Fürth" },
        { name: "Anne-Frank-Str. 43", plz: "90459", ort: "Nürnberg" },
        { name: "Arnulfstr. 4", plz: "90489", ort: "Nürnberg" },
        { name: "Äußere Großweidenmühlstr. 10", plz: "90419", ort: "Nürnberg" },
        { name: "Badstr. 52", plz: "5330", ort: "Bad Zurzach" },
        { name: "Bahnhofstr. 79", plz: "90402", ort: "Nürnberg" },
        { name: "Bogenstr. 42", plz: "90459", ort: "Nürnberg" },
        { name: "Emilienstr. 1", plz: "90489", ort: "Nürnberg" },
        { name: "Flugplatzstr. 80", plz: "90768", ort: "Fürth" },
        { name: "Frauentorgraben 3", plz: "90443", ort: "Nürnberg" },
        { name: "Friedrichstr. 9", plz: "90762", ort: "Fürth" },
        { name: "Fürther Str. 45", plz: "90513", ort: "Zirndorf" },
        { name: "Fürther Str. 54", plz: "90429", ort: "Nürnberg" },
        { name: "Fürther Str. 56", plz: "90429", ort: "Nürnberg" },
        { name: "Fürther Str. 62", plz: "90429", ort: "Nürnberg" },
        { name: "Fürther Str. 99", plz: "90429", ort: "Nürnberg" },
        { name: "Gibitzenhofstr. 61", plz: "90443", ort: "Nürnberg" },
        { name: "Grenzstr. 13", plz: "90768", ort: "Fürth" },
        { name: "Grünerstr. 2", plz: "90763", ort: "Fürth" },
        { name: "Hallstr. 6", plz: "90762", ort: "Fürth" },
        { name: "Hans-Vogel-Str. 20", plz: "90765", ort: "Fürth" },
        { name: "Hauptstr. 57", plz: "90562", ort: "Heroldsberg" },
        { name: "Hauptstr. 60", plz: "91052", ort: "Erlangen" },
        { name: "Hertastr. 21", plz: "90461", ort: "Nürnberg" },
        { name: "Hirschenstr. 31", plz: "90762", ort: "Fürth" },
        { name: "Hirschenstr. 7", plz: "90762", ort: "Fürth" },
        { name: "Hornschuchpromenade 25", plz: "90762", ort: "Fürth" },
        { name: "Innerer Kleinreuther Weg 5", plz: "90419", ort: "Nürnberg" },
        { name: "Innerer Kleinreuther Weg 7", plz: "90419", ort: "Nürnberg" },
        { name: "Ipsheimer Str. 12", plz: "90431", ort: "Nürnberg" },
        { name: "Johann-Geismann-Str. 1", plz: "90763", ort: "Fürth" },
        { name: "Johannisstr. 108", plz: "90419", ort: "Nürnberg" },
        { name: "Katharinengasse 24", plz: "90403", ort: "Nürnberg" },
        { name: "Kirchenweg 43", plz: "90419", ort: "Nürnberg" },
        { name: "Kneippallee 5", plz: "90513", ort: "Zirndorf" },
        { name: "Kneippallee 7", plz: "90513", ort: "Zirndorf" },
        { name: "Kneippallee 7a", plz: "90513", ort: "Zirndorf" },
        { name: "Königstr. 25-27", plz: "90402", ort: "Nürnberg" },
        { name: "Königswarterstr. 20", plz: "90762", ort: "Fürth" },
        { name: "Krugstr. 27", plz: "90419", ort: "Nürnberg" },
        { name: "Kurgartenstr. 19", plz: "90762", ort: "Fürth" },
        { name: "Landgrabenstr. 14", plz: "90443", ort: "Nürnberg" },
        { name: "Lilienstr. 57", plz: "90547", ort: "Stein b. Nürnberg" },
        { name: "Mondstr. 8", plz: "90762", ort: "Fürth" },
        { name: "Nelkenstr. 11", plz: "90547", ort: "Stein b. Nürnberg" },
        { name: "Nelkenstr. 3", plz: "90547", ort: "Stein b. Nürnberg" },
        { name: "Nelkenstr. 5", plz: "90547", ort: "Stein b. Nürnberg" },
        { name: "Neubleiche 8", plz: "90478", ort: "Nürnberg" },
        { name: "Obere Turnstr. 9", plz: "90429", ort: "Nürnberg" },
        { name: "Peterstr. 71", plz: "90478", ort: "Nürnberg" },
        { name: "Prinzregentenufer 5", plz: "90489", ort: "Nürnberg" },
        { name: "Rankestr. 60", plz: "90461", ort: "Nürnberg" },
        { name: "Reitmorstr. 50", plz: "80538", ort: "München" },
        { name: "Saalfelder Str. 5", plz: "90765", ort: "Fürth" },
        { name: "Saalfelder Str. 6", plz: "90765", ort: "Fürth" },
        { name: "Sauerbruchstr. 10", plz: "90513", ort: "Zirndorf" },
        { name: "Schlotfegergasse 6", plz: "90402", ort: "Nürnberg" },
        { name: "Schumannstr. 13", plz: "90429", ort: "Nürnberg" },
        { name: "Schwabacher Str. 4", plz: "90762", ort: "Fürth" },
        { name: "Schwabacher Str. 85", plz: "90439", ort: "Nürnberg" },
        { name: "Sigmund-Nathan-Str. 4+4a", plz: "90762", ort: "Fürth" },
        { name: "Sigmundstr. 139", plz: "90431", ort: "Nürnberg" },
        { name: "Spitzwegstr. 27", plz: "90455", ort: "Nürnberg" },
        { name: "Sprottauer Str. 10", plz: "90475", ort: "Nürnberg" },
        { name: "Stephanstr. 14", plz: "90478", ort: "Nürnberg" },
        { name: "Stephanstr. 16", plz: "90478", ort: "Nürnberg" },
        { name: "Stephanstr. 21", plz: "90478", ort: "Nürnberg" },
        { name: "Strauchstr. 29", plz: "90478", ort: "Nürnberg" },
        { name: "Thurn-und-Taxis-Str. 18", plz: "90411", ort: "Nürnberg" },
        { name: "Vacher Str. 471", plz: "90768", ort: "Fürth" },
        { name: "Willy-Brandt-Platz 10", plz: "90402", ort: "Nürnberg" },
        { name: "Wodanstr. 34", plz: "90461", ort: "Nürnberg" },
        { name: "Zollhof 8", plz: "90443", ort: "Nürnberg" }

    ];


    function updateSignFields() {
        document.getElementById("strasseeinzugsign").textContent = document.getElementById("strasseeinzug").value;
        document.getElementById("plzeinzugsign").textContent = document.getElementById("plzeinzug").value;
        document.getElementById("lageeinzugsign").textContent = document.getElementById("lageeinzug2").value;
        document.getElementById("datumsign").textContent = document.getElementById("datum").value;
    }


    // Funktion, um Vorschläge basierend auf der Benutzereingabe anzuzeigen
    function showSuggestions(input) {
        const inputValue = input.value.toLowerCase();
        const suggestions = strassen.filter(strasse =>
            strasse.name.toLowerCase().startsWith(inputValue)
        );

        const suggestionList = document.getElementById("suggestionList");
        suggestionList.innerHTML = "";

        suggestions.forEach(strasse => {
            const option = document.createElement("div");
            option.textContent = strasse.name;
            option.classList.add("suggestion-item");
            option.addEventListener("click", () => {
                // Setze den ausgewählten Wert in das Input-Feld
                document.getElementById("strasseeinzug").value = strasse.name;

                // Setze PLZ und Ort in das entsprechende Input-Feld
                document.getElementById("plzeinzug").value = `${strasse.plz} ${strasse.ort}`;

                // Aktualisiere die Signaturfelder SOFORT
                updateSignFields();

                // Verstecke die Vorschlagsliste
                suggestionList.innerHTML = "";
            });
            suggestionList.appendChild(option);
        });

        if (suggestions.length > 0) {
            suggestionList.style.display = "block";
        } else {
            suggestionList.style.display = "none";
        }
    }

    // Event-Listener für das Straßen-Input-Feld
    document.getElementById("strasseeinzug").addEventListener("input", function (event) {
        showSuggestions(event.target);
        updateSignFields(); // Aktualisiere die Signaturfelder bei jeder Eingabe
    });

    // Event-Listener für das PLZ/Ort-Input-Feld
    document.getElementById("plzeinzug").addEventListener("input", function () {
        updateSignFields(); // Aktualisiere die Signaturfelder bei jeder Eingabe
    });

    // Event-Listener für das Lage/Stockwerk-Input-Feld
    document.getElementById("lageeinzug2").addEventListener("input", function () {
        updateSignFields(); // Aktualisiere die Signaturfelder bei jeder Eingabe
    });

    // Event-Listener für das Datums-Input-Feld
    document.getElementById("datum").addEventListener("change", function () {
        updateSignFields(); // Aktualisiere die Signaturfelder bei Änderung des Datums
    });

    // Verstecke die Vorschlagsliste, wenn außerhalb geklickt wird
    document.addEventListener("click", function (event) {
        if (event.target.id !== "strasseeinzug") {
            document.getElementById("suggestionList").style.display = "none";
        }
    });

    // Initialisiere die Signaturfelder beim Laden der Seite
    updateSignFields();
});
