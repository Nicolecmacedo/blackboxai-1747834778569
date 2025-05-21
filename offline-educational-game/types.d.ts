interface Exercise {
    type: string;
    question?: string;
    operation?: string;
    answer: number;
    hint?: string;
    title?: string;
    text?: string;
    questions?: Question[];
    words?: Word[];
    story?: string[];
    correctOrder?: number[];
    steps?: string[];
}

interface Question {
    question: string;
    options: string[];
    answer: number;
}

interface Word {
    word: string;
    options: string[];
    answer: string;
}

interface Activities {
    [ageGroup: string]: {
        [subject: string]: {
            exercises: Exercise[];
        };
    };
}

interface GameState {
    ageGroup: string | null;
    subject: string | null;
    score: number;
    currentExercise: number;
    isTransitioning: boolean;
}

declare const activities: Activities;
