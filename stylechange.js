document.addEventListener('DOMContentLoaded', function() {
    // Beim Laden der Seite den gespeicherten Stil anwenden (oder Standard: desktop)
    const initialStyle = localStorage.getItem('currentStyle') || 'stylesdesktop.css';
    applyStyle(initialStyle);
    updateButtonText(initialStyle);
   
    // Button-Event hinzufügen
    document.getElementById('stylechange').addEventListener('click', toggleStyle);
});

function toggleStyle() {
    const currentStyle = localStorage.getItem('currentStyle') || 'stylesdesktop.css';
    let newStyle;
   
    // Rotiere durch die verfügbaren Styles
    switch(currentStyle) {
        case 'stylesdesktop.css':
            newStyle = 'stylesmobile.css';
            break;
        case 'stylesmobile.css':
            newStyle = 'stylespdf.css';
            break;
        case 'stylespdf.css':
            newStyle = 'stylesdesktop.css';
            break;
        default:
            newStyle = 'stylesdesktop.css';
    }
   
    // Neuen Stil speichern und anwenden
    localStorage.setItem('currentStyle', newStyle);
    applyStyle(newStyle);
    updateButtonText(newStyle);
}

function applyStyle(styleFile) {
    // Alle vorhandenen Stylesheets entfernen
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (link.href.includes('stylesdesktop.css') ||
            link.href.includes('stylesmobile.css') ||
            link.href.includes('stylespdf.css')) {
            link.remove();
        }
    });
   
    // Neues Stylesheet hinzufügen
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleFile;
    document.head.appendChild(link);
}

function updateButtonText(styleFile) {
    const styleButton = document.getElementById('stylechange');
    
    // Bestimme den Anzeigetext basierend auf der CSS-Datei
    switch(styleFile) {
        case 'stylesdesktop.css':
            styleButton.textContent = 'Mieteransicht';
            break;
        case 'stylesmobile.css':
            styleButton.textContent = 'Ansicht für Tableteingabe';
            break;
        case 'stylespdf.css':
            styleButton.textContent = 'PDF Ansicht';
            break;
        default:
            styleButton.textContent = 'Mieteransicht';
    }
}