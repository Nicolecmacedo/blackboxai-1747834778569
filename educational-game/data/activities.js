const activities = {
    "7-9 anos": {
        "Matemática": {
            exercises: [
                {
                    type: "addition",
                    question: "João tem 3 maçãs e ganhou mais 2 maçãs. Quantas maçãs ele tem agora?",
                    operation: "3 + 2 = ?",
                    answer: 5,
                    hint: "Conte usando os dedos ou desenhe as maçãs!"
                },
                {
                    type: "subtraction",
                    question: "Maria tinha 7 balas e deu 3 para sua irmã. Quantas balas sobraram?",
                    operation: "7 - 3 = ?",
                    answer: 4,
                    hint: "Desenhe 7 balas e risque 3!"
                },
                {
                    type: "multiplication",
                    question: "Em uma cesta há 4 grupos com 2 laranjas cada. Quantas laranjas há no total?",
                    operation: "4 × 2 = ?",
                    answer: 8,
                    hint: "Desenhe os grupos de laranjas!"
                }
            ]
        },
        "Leitura": {
            exercises: [
                {
                    type: "reading",
                    title: "O Gatinho Curioso",
                    text: "Era uma vez um gatinho muito curioso. Ele gostava de explorar o jardim. Um dia, viu uma borboleta azul e decidiu segui-la. A borboleta o levou até um lindo canteiro de flores.",
                    questions: [
                        {
                            question: "De que cor era a borboleta?",
                            options: ["Amarela", "Azul", "Verde", "Vermelha"],
                            answer: 1
                        },
                        {
                            question: "Para onde a borboleta levou o gatinho?",
                            options: ["Para a rua", "Para o telhado", "Para um canteiro de flores", "Para a casa"],
                            answer: 2
                        }
                    ]
                }
            ]
        },
        "Escrita": {
            exercises: [
                {
                    type: "complete",
                    title: "Complete as Palavras",
                    words: [
                        { word: "CA__", options: ["SA", "MA", "LA"], answer: "SA" },
                        { word: "BO__", options: ["LA", "NE", "CA"], answer: "LA" },
                        { word: "ME__", options: ["SA", "DA", "NA"], answer: "SA" }
                    ]
                }
            ]
        },
        "Interpretação": {
            exercises: [
                {
                    type: "sequence",
                    title: "Organize a História",
                    story: [
                        "O menino acordou cedo.",
                        "Ele tomou café da manhã.",
                        "Depois, escovou os dentes.",
                        "Por fim, foi para a escola."
                    ],
                    correctOrder: [0, 1, 2, 3]
                }
            ]
        }
    },
    "10-12 anos": {
        "Matemática": {
            exercises: [
                {
                    type: "multiplication",
                    question: "Uma loja vende cadernos por R$ 12,00 cada. Quanto custam 5 cadernos?",
                    operation: "12 × 5 = ?",
                    answer: 60,
                    hint: "Pense em quanto custam 2 cadernos, depois 4, e então 5"
                },
                {
                    type: "division",
                    question: "Pedro tem 45 figurinhas e quer dividir igualmente entre seus 5 amigos. Quantas figurinhas cada amigo receberá?",
                    operation: "45 ÷ 5 = ?",
                    answer: 9,
                    hint: "Tente distribuir as figurinhas uma a uma para cada amigo"
                }
            ]
        }
    },
    "13-14 anos": {
        "Matemática": {
            exercises: [
                {
                    type: "equation",
                    question: "Resolva a equação: 2x + 5 = 13",
                    steps: [
                        "Subtraia 5 dos dois lados",
                        "2x = 8",
                        "Divida os dois lados por 2"
                    ],
                    answer: 4,
                    hint: "Isole o x movendo os outros números para o outro lado da equação"
                }
            ]
        }
    }
};
