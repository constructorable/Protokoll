/* Copyright - Oliver Acker, acker_oliver@yahoo.de
printjs.js
Version 3.32_beta */

document.addEventListener('DOMContentLoaded', function () {
});

const checkboxState = storeCheckboxState();

function storeCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const states = [];
    checkboxes.forEach(checkbox => {
        states.push({
            id: checkbox.id,
            checked: checkbox.checked,
            type: checkbox.type
        });
    });
    return states;
}

function restoreCheckboxState(states) {
    states.forEach(state => {
        const checkbox = document.getElementById(state.id);
        if (checkbox) {
            checkbox.checked = state.checked;
        }
    });
}

function prepareDOMForPDF() {
    const changes = [];

    document.querySelectorAll('.no-print, button').forEach(el => {
        changes.push({ element: el, property: 'display', original: el.style.display });
        el.style.display = 'none';
    });

    document.querySelectorAll('*').forEach(el => {
        changes.push({ element: el, property: 'animation', original: el.style.animation });
        el.style.animation = 'none';
    });

    return changes;
}

function restoreDOM(changes) {
    changes.forEach(({ element, property, original }) => {
        element.style[property] = original;
    });
}

async function preloadImages() {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    });

    await Promise.all(promises);
}

async function renderElementsInParallel(elements) {
    const promises = elements.map(element =>
        html2canvas(element, {
            scale: 1,
            useCORS: true,
            logging: false,
            allowTaint: true,
            letterRendering: true
        })
    );
    return await Promise.all(promises);
}

document.getElementById('savePdfButton').addEventListener('click', async function (event) {
    /* if (!validateStrasseeinzug() || !validateNumberInputs()) { */
    if (!validateStrasseeinzug()) {
        event.preventDefault();
        return;
    }

    const bilderVorhanden =
        document.querySelector('.bilderzimmer')?.children.length > 0 ||
        document.querySelectorAll('[id^="large-wrapper-img"]').length > 0;

    let includeImages = false;

    if (bilderVorhanden) {
        includeImages = await showImageModal();

        if (includeImages === null) {

            return;
        }
    }
    exportPDF(includeImages);

    let domChanges = [];

    async function exportPDF(includeImages) {
        if (exportInProgress) {
            console.log("Ein Export läuft bereits.");
            return;
        }
        exportInProgress = true;
        const domChanges = prepareDOMForPDF();
        const progressBarContainer = document.getElementById('progress-bar');
        progressBarContainer.style.display = 'block';

        const bar = new ProgressBar.Line(progressBarContainer, {
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: { width: '100%', height: '100%' },
            text: {
                style: {
                    color: '#999',
                    position: 'absolute',
                    right: '0',
                    top: '30px',
                    padding: 0,
                    margin: 0,
                    transform: null,
                },
                autoStyleContainer: false,
            },
            from: { color: '#FFEA82' },
            to: { color: '#ED6A5A' },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            },

        });

        bar.animate(1.0, async function () {
            try {
                if (includeImages) {
                    await printJS({
                        printable: 'printable',
                        type: 'html',
                        style: '@page { size: auto;  margin: 20mm; }',
                        targetStyles: ['*'],
                        scanStyles: false,
                    });
                } else {
                    const printableElement = document.getElementById('printable').cloneNode(true);
                    const images = printableElement.querySelectorAll('img');
                    images.forEach(img => img.remove());

                    const printContainer = document.createElement('div');
                    printContainer.appendChild(printableElement);
                    document.body.appendChild(printContainer);

                    await printJS({
                        printable: printContainer.innerHTML,
                        type: 'raw-html',
                        style: '@page { size: auto;  margin: 20mm; }',
                        scanStyles: false,
                    });

                    document.body.removeChild(printContainer);
                }
            } catch (error) {
                console.error("Fehler beim PDF-Export:", error);
            } finally {

                restoreCheckboxState(checkboxState);

                progressBarContainer.style.display = 'none';
                progressBarContainer.innerHTML = '';
                restoreDOM(domChanges);
                exportInProgress = false;
            }
        });

        try {

            const currentTheme = themeElement.getAttribute("href");

            const bilderVorhanden = checkForImages();

            if (bilderVorhanden) {

                const includeImages = await showImageModal();

                if (includeImages === null) {
                    themeElement.setAttribute("href", currentTheme);
                    restoreDOM(domChanges);
                    return;
                }

                domChanges = prepareDOMForPDF();

                const pdf = await generatePDF(domChanges, includeImages);
                savePDF(pdf);

                themeElement.setAttribute("href", currentTheme);
            }

        } catch (error) {
            console.error("Fehler beim PDF-Export:", error);
        } finally {

            restoreDOM(domChanges);
            themeElement.setAttribute("href", currentTheme);
        }
    }

    function prepareDOMForPDF() {

        const changes = [];

        changes.push(...document.querySelectorAll('.important-element'));

        return changes;
    }

    function restoreDOM(changes) {

        changes.forEach(element => {

            element.style = "";
        });
    }

    function checkForImages() {
        return document.querySelectorAll('img').length > 0;
    }

    function showImageModal() {
        return new Promise((resolve) => {
            const modal = document.getElementById('imageModal');
            const withImagesBtn = document.getElementById('withImagesBtn');
            const withoutImagesBtn = document.getElementById('withoutImagesBtn');
            const cancelModalBtn = document.getElementById('cancelModalBtn');

            modal.style.display = 'flex';

            function closeModal() {
                modal.style.display = 'none';
                withImagesBtn.removeEventListener('click', onWithImages);
                withoutImagesBtn.removeEventListener('click', onWithoutImages);
                cancelModalBtn.removeEventListener('click', onCancel);
            }

            function onWithImages() {
                closeModal();
                resolve(true);
            }

            function onWithoutImages() {
                closeModal();
                resolve(false);
            }

            function onCancel() {
                closeModal();
                resolve(null);
            }

            withImagesBtn.addEventListener('click', onWithImages);
            withoutImagesBtn.addEventListener('click', onWithoutImages);
            cancelModalBtn.addEventListener('click', onCancel);
        });
    }

    async function generatePDF(domChanges, includeImages) {

        const pdf = {};
        return pdf;
    }

    function savePDF(pdf) {
        console.log("PDF wurde gespeichert", pdf);
    }

    initializeProgressBar();

    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    const inputsWithPlaceholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    const originalPlaceholders = [];
    inputsWithPlaceholders.forEach(input => {
        originalPlaceholders.push({
            element: input,
            placeholder: input.getAttribute('placeholder')
        });
        input.removeAttribute('placeholder');
    });

    const closeButton = document.getElementById('closeLoadingOverlay');
    closeButton.addEventListener('click', function () {
        loadingOverlay.style.display = 'none';
    });

    const stickyContainer = document.querySelector('.sticky-container');
    if (stickyContainer) {
        stickyContainer.style.display = 'none';
    }

    const elements = {
        allgemein: document.querySelector('#zzzallgemein'),
        kueche: document.querySelector('#zzzkueche'),
        bad: document.querySelector('#zzzbad'),
        wc: document.querySelector('#zzzwc'),
        flur: document.querySelector('#zzzflur'),
        abstellraum: document.querySelector('#abstellContainer'),
        roomContainers: document.querySelectorAll('.room-container'),
        nebenraum: document.querySelector('#nebenraumContainer'),
        weitereBemerkungen: document.querySelector('#weitereBemerkungenContainer'),
        hauptBemerkungen: document.querySelector('#hauptBemerkungenContainer'),
        signtoggle: document.querySelector('#signtoggle'),
        bilderzimmer: includeImages ? document.querySelector('.bilderzimmer') : null,
        largeImages: includeImages ? document.querySelectorAll('[id^="large-wrapper-img"]') : [],
        print1: document.querySelector('#zzzprint1'),
        stammdupli: document.querySelector('.stammdupli')
    };

    if (!elements.allgemein || !elements.kueche || !elements.bad || !elements.wc || !elements.flur || !elements.abstellraum) {
        console.error("Fehler: Ein oder mehrere erforderliche Elemente wurden nicht gefunden.");
        loadingOverlay.style.display = 'none';
        if (stickyContainer) {
            stickyContainer.style.display = '';
        }
        return;
    }

    const themeElement = document.getElementById("theme-style");
    const currentTheme = themeElement.getAttribute("href");
    themeElement.setAttribute("href", "stylesprint.css");

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        async function renderElementToPDF(element, yOffset = margin) {
            try {

                if (!includeImages) {
                    element.querySelectorAll('img').forEach(img => {
                        img.style.display = 'none';
                    });
                }




                const originalStyles = {
                    animation: element.style.animation,
                    transition: element.style.transition,
                    boxShadow: element.style.boxShadow
                };
                element.style.animation = 'none';
                element.style.transition = 'none';
                element.style.boxShadow = 'none';

                if (!includeImages) {
                    element.querySelectorAll('img').forEach(img => {
                        img.style.display = 'none';
                    });
                }


                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    letterRendering: true
                });

                element.style.animation = originalStyles.animation;
                element.style.transition = originalStyles.transition;
                element.style.boxShadow = originalStyles.boxShadow;

                if (!includeImages) {
                    element.querySelectorAll('img').forEach(img => {
                        img.style.display = '';
                    });
                }

                const imgData = canvas.toDataURL('image/jpeg', 0.7);
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                const maxPageHeight = pageHeight - 2 * margin;
                let scaledHeight = (imgHeight * usableWidth) / imgWidth;

                if (scaledHeight > maxPageHeight) {
                    const scaleFactor = maxPageHeight / scaledHeight;
                    scaledHeight *= scaleFactor;
                    const scaledWidth = usableWidth * scaleFactor;

                    pdf.addImage(
                        imgData,
                        'JPEG',
                        margin + (usableWidth - scaledWidth) / 2,
                        yOffset,
                        scaledWidth,
                        scaledHeight,
                        undefined,
                        'FAST'
                    );
                } else {
                    pdf.addImage(imgData, 'JPEG', margin, yOffset, usableWidth, scaledHeight, undefined, 'SLOW');
                }

                return yOffset + scaledHeight + margin;
            } catch (error) {
                console.warn("Fehler beim Rendern des Elements:", element, error);
                return yOffset;
            }
        }

        const totalElements = [
            elements.allgemein,
            elements.kueche,
            elements.bad,
            elements.wc,
            elements.flur,
            elements.abstellraum,
            ...elements.roomContainers,
            elements.nebenraum,
            elements.weitereBemerkungen,
            elements.hauptBemerkungen,
            elements.print1,
            elements.signtoggle,
            ...(includeImages && elements.bilderzimmer ? Array.from(elements.bilderzimmer.children) : []),
            ...(includeImages ? Array.from(elements.largeImages) : [])
        ].length;

        let currentElement = 0;

        await renderElementToPDF(elements.allgemein);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        const roomsToRender = [
            { condition: !document.querySelector('#kitch2')?.checked, element: elements.kueche },
            { condition: !document.querySelector('#bath2')?.checked, element: elements.bad },
            { condition: !document.querySelector('#guestwc2')?.checked, element: elements.wc },
            { condition: !document.querySelector('#dieleflur2')?.checked, element: elements.flur },
            { condition: !document.querySelector('#abstell2')?.checked, element: elements.abstellraum }
        ];

        for (const room of roomsToRender) {
            if (room.condition) {

                let totalPages = 0;
                const tempPdf = new jsPDF('p', 'mm', 'a4');

                pdf.addPage();
                await renderElementToPDF(room.element);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        if (elements.roomContainers.length > 0) {
            for (const room of elements.roomContainers) {
                pdf.addPage();
                await renderElementToPDF(room);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        const neinElements = [];
        if (document.querySelector('#kitch2')?.checked) neinElements.push(elements.kueche);
        if (document.querySelector('#bath2')?.checked) neinElements.push(elements.bad);
        if (document.querySelector('#guestwc2')?.checked) neinElements.push(elements.wc);
        if (document.querySelector('#dieleflur2')?.checked) neinElements.push(elements.flur);
        if (document.querySelector('#abstell2')?.checked) neinElements.push(elements.abstellraum);

        if (neinElements.length > 0) {
            pdf.addPage();
            let yOffset = margin;
            for (const element of neinElements) {
                yOffset = await renderElementToPDF(element, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);
            }
        }

        pdf.addPage();
        let yOffset = margin;
        if (elements.nebenraum) yOffset = await renderElementToPDF(elements.nebenraum, yOffset);
        if (elements.weitereBemerkungen) yOffset = await renderElementToPDF(elements.weitereBemerkungen, yOffset);
        if (elements.hauptBemerkungen) yOffset = await renderElementToPDF(elements.hauptBemerkungen, yOffset);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        pdf.addPage();
        let yOffset2 = margin;
        if (elements.print1) yOffset2 = await renderElementToPDF(elements.print1, yOffset2);
        if (elements.signtoggle) yOffset2 = await renderElementToPDF(elements.signtoggle, yOffset2);
        currentElement++;
        window.updateProgress(currentElement, totalElements);

        if (includeImages && elements.bilderzimmer) {
            const children = Array.from(elements.bilderzimmer.children);
            for (let i = 0; i < children.length; i += 2) {
                pdf.addPage();
                const firstImage = children[i];
                const secondImage = children[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    window.updateProgress(currentElement, totalElements);
                }
            }
        }

        if (includeImages && elements.largeImages.length > 0) {
            const largeImages = Array.from(elements.largeImages);
            for (let i = 0; i < largeImages.length; i += 2) {
                pdf.addPage();
                const firstImage = largeImages[i];
                const secondImage = largeImages[i + 1];

                let yOffset = margin;
                yOffset = await renderElementToPDF(firstImage, yOffset);
                currentElement++;
                window.updateProgress(currentElement, totalElements);

                if (secondImage) {
                    yOffset = await renderElementToPDF(secondImage, yOffset + 10);
                    currentElement++;
                    window.updateProgress(currentElement, totalElements);
                }
            }
        }

        const inputs = document.querySelectorAll("input");
        const originalHeights = [];
        inputs.forEach(input => {
            originalHeights.push(input.style.height);
            input.style.height = "24px";
        });

        function generateFileName() {
            const strasse = document.getElementById('strasseeinzug').value;
            const now = new Date();
            const datumZeit = now.toLocaleString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(/, /, '_').replace(/\./g, '-').replace(/:/g, '-');

            const protokollDropdown = document.querySelector('.dropdown-style');
            let protokollTyp = protokollDropdown ? protokollDropdown.value : '';

            if (!protokollTyp) {
                const isAbnahme = document.getElementById('abn01')?.checked || false;
                const isUebergabe = document.getElementById('ueb01')?.checked || false;

                if (isAbnahme && isUebergabe) {
                    protokollTyp = 'Abnahme- und Übergabeprotokoll';
                } else if (isAbnahme) {
                    protokollTyp = 'Abnahmeprotokoll';
                } else if (isUebergabe) {
                    protokollTyp = 'Übergabeprotokoll';
                }
            }

            const cleanStrasse = strasse.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
            const cleanProtokollTyp = protokollTyp.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');

            let fileName = `${cleanStrasse}_${datumZeit}`;
            if (cleanProtokollTyp && cleanProtokollTyp !== '-') {
                fileName += `_${cleanProtokollTyp}`;
            }
            fileName += '.pdf';

            return fileName;
        }

        const fileName = generateFileName();
        totalPages = pdf.internal.getNumberOfPages();
                // Aufruf direkt vor pdf.save()
                addPageNumbers(pdf, totalPages);
        pdf.save(fileName);

        function addPageNumbers(pdf, total) {
            for (let i = 1; i <= total; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(100);
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.text(`Seite ${i} von ${total}`, pageWidth - 30, pdf.internal.pageSize.getHeight() - 7);
            }
        }
        


        inputs.forEach((input, index) => {
            input.style.height = originalHeights[index];
        });

    } catch (error) {
        console.error("Fehler beim Generieren des PDFs:", error);
    } finally {

        restoreDOM(domChanges);

        originalPlaceholders.forEach(item => {
            item.element.setAttribute('placeholder', item.placeholder);
        });

        themeElement.setAttribute("href", currentTheme);

        buttons.forEach(button => button.style.display = '');

        if (stickyContainer) stickyContainer.style.display = '';

        loadingOverlay.style.display = 'none';

    }

    async function renderInBatches(elementsToRender) {
        const batchSize = getOptimalBatchSize();
        let currentY = margin;
        let needsNewPage = true;
        let renderStartTime = performance.now();
        let qualityFactor = 0.7;

        for (let i = 0; i < elementsToRender.length; i += batchSize) {
            const batch = elementsToRender.slice(i, i + batchSize);

            if (needsNewPage) {
                pdf.addPage();
                currentY = margin;
                needsNewPage = false;
            }

            try {
                const elementHeightEstimate = batch.reduce((sum, el) => sum + (el.clientHeight * (usableWidth / el.clientWidth)), 0);
                needsNewPage = (currentY + elementHeightEstimate) > (pageHeight - margin - 20);
                if (needsNewPage) continue;

                const renderResults = await Promise.all(
                    batch.map(async (element, index) => {
                        const clone = element.cloneNode(true);
                        clone.style.position = 'absolute';
                        clone.style.visibility = 'hidden';
                        document.body.appendChild(clone);

                        try {
                            const result = await renderElementToPDF(clone, currentY, qualityFactor);
                            return { success: true, y: result };
                        } catch (error) {
                            qualityFactor = Math.max(0.3, qualityFactor - 0.1);
                            return { success: false, y: currentY };
                        } finally {
                            document.body.removeChild(clone);
                            if (index % 2 === 0 && typeof gc === 'function') gc();
                        }
                    })
                );

                for (const result of renderResults) {
                    if (result.success) {
                        currentY = result.y;
                        currentElement++;
                        window.updateProgress(currentElement, totalElements);

                        if (/Mobi|Android/i.test(navigator.userAgent)) {
                            const renderTime = performance.now() - renderStartTime;
                            await new Promise(resolve => setTimeout(resolve, Math.min(300, renderTime * 0.5)));
                            renderStartTime = performance.now();
                        }
                    }
                }
            } catch (error) {
                console.error("Batch-Rendering fehlgeschlagen:", error);
            }
        }
    }

});
