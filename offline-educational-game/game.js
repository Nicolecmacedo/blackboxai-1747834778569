// @ts-check

// Declare global interfaces
/** @typedef {{ type: string, question?: string, operation?: string, answer: number, hint?: string }} Exercise */
/** @typedef {{ exercises: Exercise[] }} SubjectData */
/** @typedef {{ [key: string]: { [key: string]: SubjectData } }} Activities */

// Extend Window interface
/** @type {Activities} */
window.activities = window.activities || {};

/** @type {(button: HTMLElement) => void} */
window.showHint = function(button) {
    const hintText = button.nextElementSibling;
    if (hintText instanceof HTMLElement) {
        hintText.classList.toggle('hidden');
    }
};

/** @type {(button: HTMLElement) => void} */
window.checkAnswer = function(button) {
    if (!button || !window.activities) return;
    // Implementation will go here
};

// Game state
/** @type {{ ageGroup: string | null, subject: string | null, score: number, currentExercise: number, isTransitioning: boolean }} */
const gameState = {
    ageGroup: null,
    subject: null,
    score: 0,
    currentExercise: 0,
    isTransitioning: false
};

// Export for use in other files
window.gameState = gameState;
