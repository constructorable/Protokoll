// Copyright - Oliver Acker, acker_oliver@yahoo.de
// mailcheck.js
// Version 3.25_beta

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(inputElement, message) {
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '16px';
    errorMessage.textContent = message;

    inputElement.insertAdjacentElement('afterend', errorMessage);
}

function clearError(inputElement) {
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

function addEmailValidationListeners(emailInput) {
    emailInput.addEventListener('input', function () {
        const email = emailInput.value.trim();

        if (email && !validateEmail(email)) {
            showError(emailInput, "Bitte gültige E-Mail-Adresse eingeben.");
        } else {
            clearError(emailInput);
        }
    });

    emailInput.addEventListener('blur', function () {
        const email = emailInput.value.trim();

        if (email && !validateEmail(email)) {
            showError(emailInput, "Bitte gültige E-Mail-Adresse eingeben.");
        } else {
            clearError(emailInput);
        }
    });
}

function initEmailValidation() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                    // Überprüfe, ob das hinzugefügte Element ein E-Mail-Eingabefeld mit den Klassen "mails" oder "mails2" ist
                    if (node.nodeType === 1 && node.matches('input[type="email"].mails.autoscale, input[type="email"].mails2.autoscale')) {
                        addEmailValidationListeners(node);
                    }

                    // Überprüfe alle Kinder des hinzugefügten Elements auf E-Mail-Eingabefelder
                    if (node.nodeType === 1) {
                        const emailInputs = node.querySelectorAll('input[type="email"].mails.autoscale, input[type="email"].mails2.autoscale');
                        emailInputs.forEach(function (emailInput) {
                            addEmailValidationListeners(emailInput);
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Füge Event-Listener zu bestehenden E-Mail-Eingabefeldern hinzu
    const existingEmailInputs = document.querySelectorAll('input[type="email"].mails.autoscale, input[type="email"].mails2.autoscale');
    existingEmailInputs.forEach(function (emailInput) {
        addEmailValidationListeners(emailInput);
    });
}

document.addEventListener("DOMContentLoaded", initEmailValidation);
