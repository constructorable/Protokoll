// progressbar.js - Mit integrierter Zeit-Anzeige
let progressBar;
let progressText;
let animationInterval;
const phases = [
    { duration: 15000, target: 30 },
    { duration: 15000, target: 25 },
    { duration: 15000, target: 20 },
    { duration: 20000, target: 15 },
    { duration: 25000, target: 9 },
    { duration: 50000, target: 1 } 
];

function initializeProgressBar() {
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
    
    // Schriftgröße auf 22px setzen
    progressText.style.fontSize = '22px';
    
    // Reset Zustand
    progressBar.style.width = '0%';
    progressText.innerHTML = '0% <span class="time-display">(0s)</span>';
    progressBar.style.backgroundColor = '#8BC34A';
    progressBar.style.boxShadow = '0 0 5px rgba(139, 195, 74, 0.3)';
    progressBar.classList.remove('progress-complete');
    
    clearInterval(animationInterval);
    
    const startTime = Date.now();
    let lastPercentage = 0;
    
    animationInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor(elapsed / 1000);
        
        let totalDuration = 0;
        let percentage = 0;
        
        for (const phase of phases) {
            if (elapsed <= totalDuration + phase.duration) {
                percentage += (elapsed - totalDuration) / phase.duration * phase.target;
                break;
            }
            percentage += phase.target;
            totalDuration += phase.duration;
        }
        
        percentage = Math.min(100, percentage);
        
        if (percentage !== lastPercentage) {
            lastPercentage = percentage;
            updateProgressDisplay(percentage, seconds);
            
            if (percentage >= 100) {
                clearInterval(animationInterval);
                progressBar.classList.add('progress-complete');
            }
        }
    }, 30);
}

function updateProgressDisplay(percentage, seconds) {
    const rounded = Math.round(percentage);
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${rounded}% <span class="time-display">(${seconds} Sekunden)</span>`;
    progressText.style.fontSize = '22px'; // Schriftgröße auch beim Update setzen
    
    if (percentage > 75) {
        progressBar.style.backgroundColor = '#2E7D32';
        progressBar.style.boxShadow = '0 0 15px rgba(46, 125, 50, 0.6)';
    } else if (percentage > 50) {
        progressBar.style.backgroundColor = '#388E3C';
        progressBar.style.boxShadow = '0 0 12px rgba(56, 142, 60, 0.5)';
    }
}

function completeProgressBar() {
    clearInterval(animationInterval);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    progressText.innerHTML = `100% <span class="time-display">(${elapsed} Sekunden)</span>`;
    progressText.style.fontSize = '22px'; // Schriftgröße auch beim Abschluss setzen
    progressBar.classList.add('progress-complete');
}
