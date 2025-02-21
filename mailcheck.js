// mailcheck.js

// Funktion zur Überprüfung der E-Mail-Adresse
function validateEmail(email) {
    // Einfache Regex-Überprüfung für E-Mail-Adressen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funktion zur Anzeige von Fehlermeldungen
function showError(inputElement, message) {
    // Entferne vorhandene Fehlermeldungen
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    // Erstelle eine neue Fehlermeldung
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '12px';
    errorMessage.textContent = message;

    // Füge die Fehlermeldung nach dem Eingabefeld ein
    inputElement.insertAdjacentElement('afterend', errorMessage);
}

// Funktion zur Entfernung von Fehlermeldungen
function clearError(inputElement) {
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

// Funktion zum Hinzufügen von Event-Listenern für E-Mail-Felder
function addEmailValidationListeners(emailInput) {
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim(); // Hole den eingegebenen Wert und entferne Leerzeichen

        // Überprüfe, ob die E-Mail-Adresse gültig ist
        if (email && !validateEmail(email)) {
            showError(emailInput, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        } else {
            clearError(emailInput); // Entferne die Fehlermeldung, wenn die E-Mail gültig ist
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim(); // Hole den eingegebenen Wert und entferne Leerzeichen

        // Überprüfe, ob die E-Mail-Adresse gültig ist
        if (email && !validateEmail(email)) {
            showError(emailInput, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        } else {
            clearError(emailInput); // Entferne die Fehlermeldung, wenn die E-Mail gültig ist
        }
    });
}

// Funktion zur Initialisierung der E-Mail-Validierung
function initEmailValidation() {
    // Überwache Änderungen im DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Überprüfe, ob neue Knoten hinzugefügt wurden
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    // Überprüfe, ob das neue Element ein E-Mail-Eingabefeld ist
                    if (node.nodeType === 1 && node.matches('input[type="email"].mails.autoscale')) {
                        addEmailValidationListeners(node); // Füge Event-Listener hinzu
                    }

                    // Überprüfe auch die Kinder des neuen Knotens
                    if (node.nodeType === 1) {
                        const emailInputs = node.querySelectorAll('input[type="email"].mails.autoscale');
                        emailInputs.forEach(function(emailInput) {
                            addEmailValidationListeners(emailInput); // Füge Event-Listener hinzu
                        });
                    }
                });
            }
        });
    });

    // Starte die Überwachung des gesamten Dokuments
    observer.observe(document.body, {
        childList: true, // Überwache das Hinzufügen/Entfernen von Kindknoten
        subtree: true    // Überwache auch alle Unterknoten
    });

    // Füge Event-Listener für bereits vorhandene E-Mail-Felder hinzu
    const existingEmailInputs = document.querySelectorAll('input[type="email"].mails.autoscale');
    existingEmailInputs.forEach(function(emailInput) {
        addEmailValidationListeners(emailInput);
    });
}

// Warte, bis das DOM vollständig geladen ist, und initialisiere die E-Mail-Validierung
document.addEventListener("DOMContentLoaded", initEmailValidation);