// @ts-check

/** @typedef {Object} GameState
 * @property {string | null} ageGroup
 * @property {string | null} subject
 * @property {number} score
 * @property {number} currentExercise
 * @property {boolean} isTransitioning
 */

/** @typedef {Object} Exercise
 * @property {string} type
 * @property {string} [question]
 * @property {string} [operation]
 * @property {number} answer
 * @property {string} [hint]
 * @property {string} [title]
 * @property {string} [text]
 */

/** @typedef {Object} Activities
 * @property {Object.<string, { exercises: Exercise[] }>} [key: string]
 */

/** @type {GameState} */
let currentState = {
    ageGroup: null,
    subject: null,
    score: 0,
    currentExercise: 0,
    isTransitioning: false
};

// DOM Elements
/** @type {NodeListOf<HTMLElement>} */
const ageGroups = document.querySelectorAll('.age-group');
/** @type {HTMLElement | null} */
const subjectsSection = document.getElementById('subjects');

// Declare global functions
/** @type {(button: HTMLElement) => void} */
window.showHint = function(button) {
    const hintText = button.nextElementSibling;
    if (hintText) {
        hintText.classList.toggle('hidden');
    }
};

/** @type {(button: HTMLElement) => void} */
window.checkAnswer = function(button) {
    if (currentState.isTransitioning) return;
    const input = /** @type {HTMLInputElement | null} */ (button.parentElement?.querySelector('input'));
    if (!input || !currentState.ageGroup || !currentState.subject) return;
    
    const answer = parseInt(input.value);
    const currentExercise = window.activities?.[currentState.ageGroup]?.[currentState.subject]?.exercises?.[currentState.currentExercise];
    if (!currentExercise) return;

    if (answer === currentExercise.answer) {
        button.innerHTML = '<i class="fas fa-star text-yellow-400 mr-2"></i> Correto! Parabéns!';
        button.classList.remove('from-blue-500', 'to-blue-600');
        button.classList.add('from-green-500', 'to-green-600');
        currentState.score++;

        setTimeout(() => {
            currentState.currentExercise++;
            if (currentState.ageGroup && currentState.subject && 
                currentState.currentExercise < (window.activities?.[currentState.ageGroup]?.[currentState.subject]?.exercises?.length || 0)) {
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

// Helper function to add active state to buttons
function setActiveButton(button, buttons) {
    buttons.forEach(btn => {
        btn.classList.remove('ring-2', 'scale-105');
        btn.style.transform = '';
    });
    button.classList.add('ring-2', 'scale-105');
}

// Add click event listeners to age group buttons
ageGroups.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentState.isTransitioning) return;
        currentState.isTransitioning = true;

        setActiveButton(button, ageGroups);
        const ageText = button.querySelector('h3').textContent;
        currentState.ageGroup = ageText;

        if (!subjectsSection.classList.contains('hidden')) {
            subjectsSection.style.opacity = '0';
            subjectsSection.style.transform = 'translateY(20px)';
        }

        setTimeout(() => {
            subjectsSection.classList.remove('hidden');
            requestAnimationFrame(() => {
                subjectsSection.style.opacity = '1';
                subjectsSection.style.transform = 'translateY(0)';
                subjectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                currentState.isTransitioning = false;
            });
        }, 300);
    });
});

// Add click event listeners to subject buttons
const subjects = document.querySelectorAll('.subject');
subjects.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentState.isTransitioning) return;
        currentState.isTransitioning = true;

        setActiveButton(button, subjects);
        const subjectText = button.querySelector('h3').textContent;
        currentState.subject = subjectText;

        const main = document.querySelector('main');
        main.style.transition = 'all 0.3s ease';
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';

        setTimeout(() => {
            loadGameModule();
        }, 300);
    });
});

// Function to load game module
function loadGameModule() {
    const main = document.querySelector('main');
    const loading = document.createElement('div');
    loading.className = 'text-center py-12 opacity-0 transform translate-y-4';
    
    const steps = ['Preparando o conteúdo...', 'Carregando exercícios...', 'Quase pronto...'];
    let currentStep = 0;
    
    function updateLoadingContent() {
        const progressPercent = ((currentStep + 1) / steps.length) * 100;
        loading.innerHTML = `
            <div class="flex flex-col items-center space-y-8">
                <div class="relative">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                        <div class="animate-spin rounded-full h-24 w-24 border-4 border-blue-500 border-t-transparent"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">
                                ${Math.round(progressPercent)}%
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-center space-y-2">
                    <p class="text-2xl font-bold text-gray-700">${steps[currentStep]}</p>
                    <p class="text-gray-500">Preparando atividades para ${currentState.ageGroup}</p>
                </div>
                <div class="w-80 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out transform origin-left" 
                         style="width: ${progressPercent}%"></div>
                </div>
                <div class="text-sm text-gray-500 animate-pulse">
                    <i class="fas fa-magic mr-2"></i>Criando uma experiência divertida...
                </div>
            </div>
        `;
    }
    
    main.innerHTML = '';
    main.appendChild(loading);
    
    requestAnimationFrame(() => {
        loading.style.transition = 'all 0.5s ease';
        loading.style.opacity = '1';
        loading.style.transform = 'translateY(0)';
    });
    
    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateLoadingContent();
            setTimeout(nextStep, 800);
        } else {
            setTimeout(() => {
                loading.style.opacity = '0';
                loading.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    loadGameContent();
                    currentState.isTransitioning = false;
                }, 300);
            }, 500);
        }
    }
    
    updateLoadingContent();
    setTimeout(nextStep, 800);
}

// Function to load game content
function loadGameContent() {
    const main = document.querySelector('main');
    const gameContent = document.createElement('div');
    gameContent.className = 'container mx-auto px-4 py-8 opacity-0 transform translate-y-4 transition-all duration-500 ease-out';

    // Map displayed subject names to data keys
    const subjectMap = {
        'Matemática': 'Matemática',
        'Leitura': 'Leitura',
        'Escrita': 'Escrita',
        'Interpretação': 'Interpretação'
    };

    // Get the correct subject key from the map
    const subjectKey = subjectMap[currentState.subject];

    // Get activities for the current age group and subject
    const currentActivities = activities[currentState.ageGroup]?.[subjectKey]?.exercises || [];

    if (currentActivities && currentActivities.length > 0) {
        const exercise = currentActivities[currentState.currentExercise];
        gameContent.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Vamos praticar ${currentState.subject}!</h2>
                    <p class="text-gray-600">Resolva os problemas e ganhe estrelas ⭐</p>
                </div>
                <div class="space-y-6">
                    <div class="bg-blue-50 rounded-xl p-6">
                        <p class="text-lg text-gray-700 mb-4">${exercise.question}</p>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-blue-600">${exercise.operation}</div>
                            <input type="number" class="w-24 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-xl" placeholder="?">
                        </div>
                        <div class="mt-4">
                            <button class="text-blue-500 text-sm hover:text-blue-600" onclick="showHint(this)">
                                <i class="fas fa-lightbulb mr-1"></i> Preciso de uma dica
                            </button>
                            <p class="hidden text-sm text-blue-600 mt-2 bg-blue-100 p-3 rounded-lg">${exercise.hint}</p>
                        </div>
                    </div>
                    <button onclick="checkAnswer(this)" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-102 transition-all duration-200 text-lg font-bold shadow-lg">
                        <i class="fas fa-check-circle mr-2"></i>
                        Verificar Resposta
                    </button>
                </div>
            </div>
        `;
    } else {
        gameContent.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">🎨</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Em construção!</h2>
                <p class="text-gray-600">Estamos preparando atividades incríveis para você.</p>
            </div>
        `;
    }

    const backButton = document.createElement('button');
    backButton.className = 'fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-110 group';
    backButton.innerHTML = `
        <i class="fas fa-home text-2xl text-blue-500 group-hover:text-blue-600"></i>
        <span class="absolute right-full mr-3 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Voltar ao Menu
        </span>
    `;
    backButton.addEventListener('click', () => {
        backButton.classList.add('scale-90', 'opacity-0');
        setTimeout(() => window.location.reload(), 200);
    });

    main.innerHTML = '';
    main.appendChild(gameContent);
    main.appendChild(backButton);

    requestAnimationFrame(() => {
        gameContent.style.transition = 'all 0.5s ease';
        gameContent.style.opacity = '1';
        gameContent.style.transform = 'translateY(0)';
    });
}

// Global functions for game interaction
window.showHint = function(button) {
    const hintText = button.nextElementSibling;
    hintText.classList.toggle('hidden');
};

window.checkAnswer = function(button) {
    if (currentState.isTransitioning) return;

    const input = button.parentElement.querySelector('input');
    const answer = parseInt(input.value);
    const currentExercise = activities[currentState.ageGroup][currentState.subject].exercises[currentState.currentExercise];

    if (answer === currentExercise.answer) {
        button.innerHTML = '<i class="fas fa-star text-yellow-400 mr-2"></i> Correto! Parabéns!';
        button.classList.remove('from-blue-500', 'to-blue-600');
        button.classList.add('from-green-500', 'to-green-600');
        currentState.score++;

        setTimeout(() => {
            currentState.currentExercise++;
            if (currentState.currentExercise < activities[currentState.ageGroup][currentState.subject].exercises.length) {
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

function showCompletionMessage() {
    const main = document.querySelector('main');
    const message = document.createElement('div');
    message.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
    message.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md mx-4 transform scale-0 transition-transform duration-300">
            <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Parabéns!</h2>
                <p class="text-gray-600 mb-6">Você completou todas as atividades!</p>
                <p class="text-xl font-bold text-blue-600 mb-8">Pontuação: ${currentState.score} ⭐</p>
                <button onclick="window.location.reload()" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Voltar ao Menu
                </button>
            </div>
        </div>
    `;

    main.appendChild(message);
    requestAnimationFrame(() => {
        message.querySelector('div > div').style.transform = 'scale(1)';
    });
}
</create_file>
