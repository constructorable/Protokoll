// progressbar.js - Finale optimierte Version
let progressBar;
let progressText;
let animationInterval;
const phases = [
    { duration: 10000, target: 70 },   
    { duration: 9000, target: 21 },   
    { duration: 30000, target: 6 },
    { duration: 30000, target: 2 },
    { duration: 45000, target: 1 }  
];

function initializeProgressBar() {
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
    
    // Reset Zustand
    progressBar.style.width = '0%';
    progressText.textContent = '0% abgeschlossen';
    progressBar.style.backgroundColor = '#8BC34A';
    progressBar.style.boxShadow = '0 0 5px rgba(139, 195, 74, 0.3)';
    progressBar.classList.remove('progress-complete');
    
    clearInterval(animationInterval);
    
    const startTime = Date.now();
    let lastPercentage = 0;
    
    animationInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
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
            updateProgressDisplay(percentage);
            
            if (percentage >= 100) {
                clearInterval(animationInterval);
                progressBar.classList.add('progress-complete');
            }
        }
    }, 30);
}

function updateProgressDisplay(percentage) {
    const rounded = Math.round(percentage);
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${rounded}% abgeschlossen`;
    
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
    updateProgressDisplay(100);
    progressBar.classList.add('progress-complete');
}
