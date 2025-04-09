// Copyright - Oliver Acker, acker_oliver@yahoo.de
// mailsend.js
// Version 3.25_beta


function sendEmail(fileName, emails, client) {
  
    const objekt = document.getElementById('strasseeinzug').value;
    const lage = document.getElementById('lageeinzug2').value;
    const plzOrt = document.getElementById('plzeinzug').value;
    const datum = document.getElementById('datum').value;
    const mietid = document.getElementById('mieterid').value;

    const abnahmeCheckbox = document.getElementById('abnahme').checked ? "Abnahmeprotokoll" : "";
    const uebergabeCheckbox = document.getElementById('uebergabe').checked ? "Übergabeprotokoll" : "";


     let protokollTyp = "";

    
    if (abnahmeCheckbox && uebergabeCheckbox) {
        protokollTyp = "Abnahme- und Übergabeprotokoll";
    } else {
  
        protokollTyp = `${abnahmeCheckbox} ${uebergabeCheckbox}`.trim();
    }


    const subject = encodeURIComponent(
        `${objekt}, ${lage} - ${protokollTyp} / ${mietid}`
    );

   
  
    const body = encodeURIComponent(
        `Sehr geehrte Damen und Herren,\n` +
        `anbei erhalten Sie das erstellte Dokument (${protokollTyp}).\n\n` +
        `Objekt / Straße: ${objekt}\n` +
        `PLZ / Ort: ${plzOrt}\n` +
        `Lage / Stockwerk: ${lage}\n` +
        `Mieternummer: ${mietid}\n` +
        `Datum: ${datum}\n\n` +
        `Mit freundlichen Grüßen\n\n` +
        `Sauer Immobilien GmbH\n\n` +
        `Königstr. 25- 27\n\n` +
        `90402 Nürnberg\n\n` +
        `Tel.: 0911 / 21491-0\n\n` +
        `E-Mail: hausverwaltung@sauer-immobilien.de`

    );

 
    const emailList = emails.join(',');
    const ccEmail = "hausverwaltung@sauer-immobilien.de";
    const bccEmail = "acker_oliver@yahoo.de";

    let mailtoLink;
    switch (client) {
        case 'gmail':
            mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailList}&cc=${ccEmail}&bcc=${bccEmail}&su=${subject}&body=${body}`;
            break;
        case 'outlook':
            mailtoLink = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${emailList}&cc=${ccEmail}&bcc=${bccEmail}&subject=${subject}&body=${body}`;
            break;
        case 'yahoo':
            mailtoLink = `https://compose.mail.yahoo.com/?to=${emailList}&cc=${ccEmail}&bcc=${bccEmail}&subject=${subject}&body=${body}`;
            break;
        default:
            mailtoLink = `mailto:${emailList}?cc=${ccEmail}&bcc=${bccEmail}&subject=${subject}&body=${body}`;
            break;
    }


    window.open(mailtoLink, '_blank');


    if (navigator.clipboard) {
        navigator.clipboard.writeText(emailList).then(() => {
            console.log("E-Mail-Adresse(n) in den Zwischenspeicher kopiert.");
        }).catch(err => {
            console.error("Fehler beim Kopieren in den Zwischenspeicher:", err);
        });
    } else {
        console.warn("Zwischenspeicher-API nicht verfügbar. E-Mail-Adresse(n) können nicht kopiert werden.");
    }
}


function showEmailMenu(fileName) {
    let validEmails = findValidEmails();

    if (validEmails.length === 0) {
        const userResponse = confirm("Keine gültigen E-Mail-Adressen gefunden. Möchten Sie eine E-Mail-Adresse eingeben?");
        if (userResponse) {
            const emailInput = prompt("Bitte geben Sie eine gültige E-Mail-Adresse ein:");
            if (emailInput && validateEmail(emailInput)) {
                validEmails.push(emailInput);
            } else {
                alert("Die eingegebene E-Mail-Adresse ist ungültig.");
                return;
            }
        } else {
            return;
        }
    }

    const overlay = document.createElement('div');
    overlay.id = 'emailMenuOverlay';
    document.body.appendChild(overlay);

    const emailMenu = document.createElement('div');
    emailMenu.id = 'emailMenu';
    emailMenu.innerHTML = `
        <h3>Gültige E-Mail-Adressen:</h3>
        <ul>
            ${validEmails.map(email => `<li>${email}</li>`).join('')}
        </ul>
        <h3>Wählen Sie ein E-Mail-Programm:</h3>
        <button id="defaultMailClient">Standard-E-Mail-Client</button>
        <button id="gmail">Gmail</button>
        <button id="outlook">Outlook</button>
        <button id="yahoo">Yahoo Mail</button>
        <button id="cancel">Abbrechen</button>
    `;

    document.body.appendChild(emailMenu);

    document.getElementById('defaultMailClient').addEventListener('click', () => {
        sendEmail(fileName, validEmails, 'default');
        closeEmailMenu();
    });

    document.getElementById('gmail').addEventListener('click', () => {
        sendEmail(fileName, validEmails, 'gmail');
        closeEmailMenu();
    });

    document.getElementById('outlook').addEventListener('click', () => {
        sendEmail(fileName, validEmails, 'outlook');
        closeEmailMenu();
    });

    document.getElementById('yahoo').addEventListener('click', () => {
        sendEmail(fileName, validEmails, 'yahoo');
        closeEmailMenu();
    });

    document.getElementById('cancel').addEventListener('click', () => {
        closeEmailMenu();
    });
}


function closeEmailMenu() {
    const emailMenu = document.getElementById('emailMenu');
    const overlay = document.getElementById('emailMenuOverlay');
    if (emailMenu) emailMenu.remove();
    if (overlay) overlay.remove();
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function findValidEmails() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const validEmails = [];

    emailInputs.forEach(input => {
        const email = input.value.trim();
        if (validateEmail(email)) {
            validEmails.push(email);
        }
    });

    return validEmails;
}

document.getElementById('sendEmailButton').addEventListener('click', function () {
    const fileName = localStorage.getItem('lastGeneratedPdfName'); 
    showEmailMenu(fileName);
});
