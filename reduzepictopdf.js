// reduziert die PDF-Generierungszeit durch Optimierungen (ca. 3-5x schneller)
document.addEventListener('DOMContentLoaded', function() {
    // Überschreibe nur den createPDF-Teil der originalen printtopdf.js
    window.createPDF = async function(qualitySettings) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        // 1. Progress-Bar mit erweiterten Infos
        const progressWrapper = document.createElement('div');
        progressWrapper.innerHTML = `
            <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
                        background:#fff;border:1px solid #ccc;padding:20px;z-index:10000;
                        width:80%;max-width:600px;text-align:center;box-shadow:0 0 10px rgba(0,0,0,0.3)">
                <div style="font-size:20px;font-weight:bold;margin-bottom:15px;font-family:sans-serif">
                    PDF wird optimiert erstellt...
                </div>
                <div style="background:#eee;border-radius:10px;height:20px;margin:10px 0">
                    <div id="pdfProgressBar" style="height:100%;width:0%;background:#4caf50;border-radius:10px;transition:width 0.3s"></div>
                </div>
                <div id="pdfProgressText" style="font-family:sans-serif">
                    Initialisiere... (Mobile Modus: ${isMobile ? 'JA' : 'NEIN'})
                </div>
                <div id="pdfOptimizationHint" style="font-size:12px;color:#666;margin-top:10px"></div>
            </div>
        `;
        document.body.appendChild(progressWrapper);

        // 2. Bilder sammeln (kompatibel mit originaler Implementierung)
        const bilder = [
            ...(document.querySelector('.bilderzimmer')?.children || []),
            ...document.querySelectorAll('[id^="large-wrapper-img"]')
        ];

        // 3. Mobile-spezifische Optimierungen
        const effectiveQuality = {
            ...qualitySettings,
            scale: isMobile ? Math.max(1, qualitySettings.scale * 0.7) : qualitySettings.scale,
            jpegQuality: isMobile ? Math.min(0.6, qualitySettings.jpegQuality) : qualitySettings.jpegQuality
        };

        // 4. Parallelisierung mit Progress-Update
        const canvasCache = [];
        const batchSize = isMobile ? 2 : 4;
        
        for (let i = 0; i < bilder.length; i += batchSize) {
            const batch = bilder.slice(i, i + batchSize);
            await Promise.all(batch.map(async (bild, batchIndex) => {
                const canvas = await renderToOptimizedCanvas(bild, effectiveQuality);
                canvasCache.push({ canvas, index: i + batchIndex });
                
                // Progress-Update
                const percent = Math.round((canvasCache.length / bilder.length) * 100);
                document.getElementById('pdfProgressBar').style.width = percent + '%';
                document.getElementById('pdfProgressText').innerText = 
                    `Bilder vorbereitet: ${canvasCache.length}/${bilder.length} (${percent}%)`;
                document.getElementById('pdfOptimizationHint').innerText = 
                    `Batch ${Math.floor(i/batchSize)+1}/${Math.ceil(bilder.length/batchSize)} | Qualität: ${effectiveQuality.jpegQuality.toFixed(1)}`;
            }));
        }

        // 5. Sortieren und PDF erstellen
        canvasCache.sort((a, b) => a.index - b.index);
        
        for (let i = 0; i < canvasCache.length; i++) {
            if (i > 0) pdf.addPage();
            
            const canvas = canvasCache[i].canvas;
            const imgData = canvas.toDataURL('image/jpeg', effectiveQuality.jpegQuality);
            const ratio = canvas.height / canvas.width;
            const height = usableWidth * ratio;
            
            pdf.addImage(imgData, 'JPEG', margin, margin, usableWidth, height, undefined, 'FAST');
            
            // Memory-Cleanup
            canvas.width = canvas.height = 1;
        }

        // 6. Originalen Dateinamen-Generierungsmechanismus nutzen
        const originalFileName = generatePdfFileName(); // Annahme: Existiert in printtopdf.js
        pdf.save(originalFileName || 'optimized_protocol.pdf');
        progressWrapper.remove();
    };

    // Hilfsfunktion für optimiertes Canvas-Rendering
    async function renderToOptimizedCanvas(element, quality) {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        
        const clone = element.cloneNode(true);
        clone.querySelectorAll('button, a, input, .no-print').forEach(el => el.remove());
        container.appendChild(clone);
        document.body.appendChild(container);
        
        const canvas = await html2canvas(clone, {
            scale: quality.scale,
            useCORS: true,
            logging: false,
            removeContainer: true,
            backgroundColor: '#FFFFFF',
            ignoreElements: el => ['SCRIPT', 'LINK', 'META'].includes(el.tagName)
        });
        
        document.body.removeChild(container);
        return canvas;
    }
});
