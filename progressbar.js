/* Copyright - Oliver Acker, acker_oliver@yahoo.de
progressbar.js
Version 3.34_beta */

let progressBar;
let progressText;
let animationInterval;
let startTime;
let currentProgress = 0;
let targetProgress = 0;

function initializeProgressBar() {
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
    
    document.getElementById('loadingOverlay').style.display = 'block';
    /* document.getElementById('closeLoadingOverlay').style.display = 'block'; */

    // Reset Zustand
    progressBar.style.width = '0%';
    progressText.innerHTML = '0% <span class="time-display">(0s)</span>';
    progressBar.style.backgroundColor = '#ff4d4d'; // Rot für Anfang
    progressBar.style.boxShadow = '0 0 5px rgba(255, 77, 77, 0.3)';
    progressBar.classList.remove('progress-complete');
    
    currentProgress = 0;
    targetProgress = 0;
    startTime = Date.now();
    
    clearInterval(animationInterval);
    
    // Update-Intervall für Zeit-Anzeige
    animationInterval = setInterval(updateTimeDisplay, 200);
}

function updateProgress(completed, total) {
    targetProgress = Math.round((completed / total) * 100);
    
    // Sanfte Animation zum Zielwert
    const animationInterval = setInterval(() => {
        if (currentProgress < targetProgress) {
            currentProgress = Math.min(currentProgress + 1, targetProgress);
            updateProgressDisplay(currentProgress);
        } else {
            clearInterval(animationInterval);
        }
    }, 50);
}

function updateProgressDisplay(percentage) {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${percentage}% <span class="time-display">(${seconds}s)</span>`;
    progressText.style.fontSize = '22px';
    
    // Farbverlauf basierend auf Fortschritt
    if (percentage < 30) {
        progressBar.style.backgroundColor = '#ff4d4d'; // Rot
        progressBar.style.boxShadow = '0 0 5px rgba(255, 77, 77, 0.3)';
    } else if (percentage < 70) {
        progressBar.style.backgroundColor = '#ffcc00'; // Gelb
        progressBar.style.boxShadow = '0 0 10px rgba(255, 204, 0, 0.4)';
    } else {
        progressBar.style.backgroundColor = '#4CAF50'; // Grün
        progressBar.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
    }
    
    if (percentage >= 100) {
        completeProgressBar();
    }
}

function updateTimeDisplay() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const percentage = currentProgress;
    progressText.innerHTML = `${percentage}% <span class="time-display">(${seconds}s)</span>`;
}

function completeProgressBar() {
    clearInterval(animationInterval);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    progressText.innerHTML = `100% <span class="time-display">(${elapsed}s)</span>`;
    progressText.style.fontSize = '22px';
    progressBar.style.backgroundColor = '#2E7D32'; // Dunkelgrün
    progressBar.style.boxShadow = '0 0 20px rgba(46, 125, 50, 0.7)';
    progressBar.classList.add('progress-complete');
}

// Close-Button Funktion
/* document.getElementById('closeLoadingOverlay').addEventListener('click', () => {
    // 1. Lade-Overlay ausblenden
    document.getElementById('loadingOverlay').style.display = 'none';

    // 2. Fortschrittsanzeige zurücksetzen
    progressBar.style.width = '0%';
    progressText.innerHTML = '0% <span class="time-display">(0s)</span>';
    clearInterval(animationInterval);

    // 3. Close-Button verstecken
    document.getElementById('closeLoadingOverlay').style.display = 'none';

    // 4. Abbruch-Modal sofort anzeigen
    const abortModal = document.getElementById('abortProgressModal');
    abortModal.style.display = 'flex';  // Modal wird direkt angezeigt

    // 5. Nach 3 Sekunden automatisch Modal ausblenden
    setTimeout(() => {
        abortModal.style.display = 'none';  // Nach 3 Sekunden Modal ausblenden
    }, 3000);
}); */
