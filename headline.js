/* Copyright - Oliver Acker, acker_oliver@yahoo.de
connection.js
Version 3.34_beta */

document.addEventListener('DOMContentLoaded', function() {
    function handleTenantChange(buttonId, headingId, newText, extraStyles = {}) {
        const button = document.getElementById(buttonId);
        const heading = document.getElementById(headingId);
        let buttonClicked = false;

        if (button && heading) {
            button.addEventListener('click', function() {
                if (!buttonClicked) {
                    buttonClicked = true;
                    // Symbol + Text für beide Mieter-Typen
                    heading.innerHTML = `<i class="fas fa-user"></i> ${newText}`;
                    heading.style.color = '#000000';

                    for (const [property, value] of Object.entries(extraStyles)) {
                        heading.style[property] = value;
                    }
                }
            });
        }
    }

    // Einziehender Mieter mit Symbol
    handleTenantChange(
        'addeinziehenderMieter', 
        'einzugtenant', 
        'einziehender Mieter',
        { 'borderBottom': '0px' } 
    );

    // Ausziehender Mieter mit dem gleichen Symbol
    handleTenantChange(
        'addausziehenderMieter', 
        'auszugtenant', 
        'ausziehender Mieter',
        { 'borderBottom': '0px' } 
    );
});
