function validateStrasseeinzug() {
    const strasseeinzugInput = document.getElementById("strasseeinzug");

    if (!strasseeinzugInput.value || strasseeinzugInput.value.trim() === "") {
        alert("Objekt / Straße bitte eingeben.");
        return false;
    }

    return true;
}

function validateCheckboxes() {
    const abnahmeCheckbox = document.getElementById("abnahme");
    const uebergabeCheckbox = document.getElementById("uebergabe");

    if (!abnahmeCheckbox.checked && !uebergabeCheckbox.checked) {
        alert("Bitte mind. eine Protokollart wählen (Abnahme- und / oder Übergabeprotokoll).");
        return false;
    }

    return true;
}

function validateZentralCheckboxes() {
    const checkboxes = document.querySelectorAll('#zentral input[type="checkbox"]');
    let isChecked = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        alert("Bitte Checkboxen für Heizung / Warmwasser zentral oder dezentral auswählen.");
        return false;
    }

    return true;
}

function validateNumberInputs() {
    const numberInputs = document.querySelectorAll('input.meterstand.autoscale[type="number"]');
    let allValid = true;

    numberInputs.forEach(input => {
        let value = input.value.trim();

        input.classList.remove("input-error");

        if (value === "") {
            alert(`Bitte gültigen Zählerstand eingeben`);
            input.classList.add("input-error");
            input.focus();
            allValid = false;
            return;
        }

        value = value.replace(",", ".");

        const decimalPoints = (value.match(/\./g) || []).length;
        if (decimalPoints > 1) {
            alert(`Ungültiges Zahlenformat im Feld: "${input.placeholder || input.className}". Bitte geben Sie eine gültige Dezimalzahl ein (z.B. 234,456).`);
            input.classList.add("input-error");
            input.focus();
            allValid = false;
            return;
        }

        const numberValue = Number(value);

        if (isNaN(numberValue)) {
            alert(`Bitte gültige Zahl eingeben im Feld: "${input.placeholder || input.className || 'Zählerstand'}"`);
            input.classList.add("input-error");
            input.focus();
            allValid = false;
            return;
        }

        if (numberValue < 0.000001) {
            alert(`Der Wert muss mindestens 0,000001 betragen im Feld: "${input.placeholder || input.className || 'Zählerstand'}"`);
            input.classList.add("input-error");
            input.focus();
            allValid = false;
            return;
        }

        input.value = numberValue;
        input.classList.remove("input-error");
    });

    return allValid;
}

function processData() {
    return new Promise((resolve) => {
        resolve();
    });
}

async function runAllPrintJSFunctions() {
    await processData();
    await otherFunction();
    document.dispatchEvent(new CustomEvent('printJSFinished'));
}
