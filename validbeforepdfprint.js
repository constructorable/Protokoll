/* Copyright - Oliver Acker, acker_oliver@yahoo.de
connection.js
Version 3.34_beta */

function validateStrasseeinzug() {
    const strasseeinzugInput = document.getElementById("strasseeinzug");

    if (!strasseeinzugInput.value || strasseeinzugInput.value.trim() === "") {
        alert("Objekt / Straße bitte eingeben.");
        return false;
    }

    return true;
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
