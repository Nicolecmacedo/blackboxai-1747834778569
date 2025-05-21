// @ts-check

/** @typedef {{ 
    ageGroup: string | null, 
    subject: string | null, 
    score: number, 
    currentExercise: number, 
    isTransitioning: boolean 
}} GameState */

/** @typedef {{
    type: string,
    question?: string,
    operation?: string,
    answer: number,
    hint?: string,
    title?: string,
    text?: string,
    questions?: Array<{
        question: string,
        options: string[],
        answer: number
    }>,
    words?: Array<{
        word: string,
        options: string[],
        answer: string
    }>,
    story?: string[],
    correctOrder?: number[],
    steps?: string[]
}} Exercise */

/** @typedef {{
    [subject: string]: {
        exercises: Exercise[]
    }
}} Subject */

/** @typedef {{
    [ageGroup: string]: Subject
}} Activities */

// Declare global types
/** @type {Activities} */
const activities = {};

// Export types for use in other files
module.exports = {
    activities
};
