// @ts-check

/** @typedef {{ ageGroup: string | null, subject: string | null, score: number, currentExercise: number, isTransitioning: boolean }} GameState */

/** @type {GameState} */
const currentState = {
    ageGroup: null,
    subject: null,
    score: 0,
    currentExercise: 0,
    isTransitioning: false
};

// DOM Elements
const ageGroups = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.age-group'));
const subjectsSection = /** @type {HTMLElement | null} */ (document.getElementById('subjects'));

/**
 * Helper function to add active state to buttons
 * @param {HTMLElement} button
 * @param {NodeListOf<Element>} buttons
 */
function setActiveButton(button, buttons) {
    buttons.forEach(btn => {
        if (btn instanceof HTMLElement) {
            btn.classList.remove('ring-2', 'scale-105');
            btn.style.transform = '';
        }
    });
    button.classList.add('ring-2', 'scale-105');
}

// Add click event listeners to age group buttons
ageGroups.forEach(button => {
    button.addEventListener('click', () => {
        if (currentState.isTransitioning) return;
        currentState.isTransitioning = true;

        setActiveButton(button, ageGroups);
        const ageText = button.querySelector('h3')?.textContent || '';
        currentState.ageGroup = ageText;

        if (subjectsSection) {
            if (!subjectsSection.classList.contains('hidden')) {
                subjectsSection.style.opacity = '0';
                subjectsSection.style.transform = 'translateY(20px)';
            }

            setTimeout(() => {
                if (subjectsSection) {
                    subjectsSection.classList.remove('hidden');
                    requestAnimationFrame(() => {
                        if (subjectsSection) {
                            subjectsSection.style.opacity = '1';
                            subjectsSection.style.transform = 'translateY(0)';
                            subjectsSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                        currentState.isTransitioning = false;
                    });
                }
            }, 300);
        }
    });
});

// Add click event listeners to subject buttons
const subjects = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.subject'));
subjects.forEach(button => {
    button.addEventListener('click', () => {
        if (currentState.isTransitioning) return;
        currentState.isTransitioning = true;

        setActiveButton(button, subjects);
        const subjectText = button.querySelector('h3')?.textContent || '';
        currentState.subject = subjectText;

        const main = /** @type {HTMLElement | null} */ (document.querySelector('main'));
        if (main) {
            main.style.transition = 'all 0.3s ease';
            main.style.opacity = '0';
            main.style.transform = 'translateY(20px)';
        }

        setTimeout(() => {
            loadGameModule();
        }, 300);
    });
});

// Global functions for game interaction
window.showHint = function(button) {
    const hintText = button.nextElementSibling;
    if (hintText instanceof HTMLElement) {
        hintText.classList.toggle('hidden');
    }
};

window.checkAnswer = function(button) {
    if (currentState.isTransitioning) return;
    const input = /** @type {HTMLInputElement | null} */ (button.parentElement?.querySelector('input'));
    if (!input || !currentState.ageGroup || !currentState.subject) return;

    const answer = parseInt(input.value);
    const activities = window.activities || {};
    const currentExercise = activities[currentState.ageGroup]?.[currentState.subject]?.exercises?.[currentState.currentExercise];
    if (!currentExercise) return;

    if (answer === currentExercise.answer) {
        button.innerHTML = '<i class="fas fa-star text-yellow-400 mr-2"></i> Correto! Parabéns!';
        button.classList.remove('from-blue-500', 'to-blue-600');
        button.classList.add('from-green-500', 'to-green-600');
        currentState.score++;

        setTimeout(() => {
            currentState.currentExercise++;
            if (currentState.ageGroup && currentState.subject && 
                currentState.currentExercise < (activities[currentState.ageGroup]?.[currentState.subject]?.exercises?.length || 0)) {
                loadGameContent();
            } else {
                showCompletionMessage();
            }
        }, 1500);
    } else {
        button.innerHTML = '<i class="fas fa-redo mr-2"></i> Tente novamente';
        button.classList.add('animate-shake');
        setTimeout(() => {
            button.classList.remove('animate-shake');
            button.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Verificar Resposta';
        }, 1000);
    }
};
