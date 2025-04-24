// ueberschriftkeyandmeter.js

document.addEventListener("DOMContentLoaded", function() {
    // Allgemeine Funktion zur Überprüfung von Tabelleninhalten
    function checkMieterStatus(sectionId, headingText) {
        const section = document.getElementById(sectionId);
        if (!section) return;
    
        // Neuer Selektor: Alle Inputs innerhalb von tbody im Table
        const foundInputs = section.querySelectorAll('tbody input');
        console.log(`In "${sectionId}" gefunden:`, foundInputs);
    
        const hasInputs = foundInputs.length > 0;
    
        const headings = Array.from(document.querySelectorAll('h3'));
        const heading = headings.find(h =>
            h.textContent.trim().toLowerCase().startsWith(headingText.toLowerCase())
        );
    
        if (!heading) return;
    
        if (hasInputs) {
            heading.textContent = headingText;
            heading.style.color = "black";
            heading.style.borderBottom = "0px solid black";
            heading.style.paddingBottom = "0px";
        } else {
            heading.textContent = `${headingText} (nicht zutreffend)`;
            heading.style.color = "#c80000";
            heading.style.borderBottom = "1px solid black";
            heading.style.paddingBottom = "5px";
        }
    }

    // Event Listener für Buttons
    function setupEventListeners() {
        document.getElementById('addKeyButton')?.addEventListener('click', () => {
            setTimeout(() => checkMieterStatus('schluesselTable', 'Schlüssel'), 50);
        });

        document.getElementById('addZaehlerButton')?.addEventListener('click', () => {
            setTimeout(() => checkMieterStatus('zaehlerTable', 'Zähler'), 50);
        });
    }

    // Zusätzliche Überprüfung bei Änderungen
    const observer = new MutationObserver(function(mutations) {
        checkMieterStatus('schluesselTable', 'Schlüssel');
        checkMieterStatus('zaehlerTable', 'Zähler');
    });

    const containers = [
        document.getElementById('schluesselTable'),
        document.getElementById('zaehlerTable')
    ].filter(Boolean);

    containers.forEach(container => {
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });

    // Initiale Überprüfung
    function initialCheck() {
        checkMieterStatus('schluesselTable', 'Schlüssel');
        checkMieterStatus('zaehlerTable', 'Zähler');
    }

    initialCheck();
    setupEventListeners();
});
