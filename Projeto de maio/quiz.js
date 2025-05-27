const quizData = [
    {
        question: "O que é a cultura afro-brasileira?",
        options: [
            "Apenas festas populares",
            "Conjunto de manifestações culturais herdadas das tradições africanas e afrodescendentes no Brasil",
            "Somente religiões de matriz africana",
            "Apenas culinária típica"
        ],
        answer: 1
    },
    {
        question: "Qual dessas manifestações NÃO é de origem afro-brasileira?",
        options: [
            "Capoeira",
            "Samba",
            "Jongo",
            "Quadrilha"
        ],
        answer: 3
    },
    {
        question: "Qual lenda capixaba fala de um pássaro que brilha no céu durante as noites de São João?",
        options: [
            "O lagarto azul",
            "Serpente do cemitério",
            "Pássaro de Fogo",
            "A pedra de Inhanguetá"
        ],
        answer: 2
    },
    {
        question: "O que representa a importância da cultura afro-brasileira?",
        options: [
            "Apenas entretenimento",
            "Enriquecimento da identidade nacional e combate ao racismo",
            "Somente culinária",
            "Apenas festas religiosas"
        ],
        answer: 1
    },
    {
        question: "Qual dessas comidas NÃO tem origem afro-brasileira?",
        options: [
            "Acarajé",
            "Feijoada",
            "Mungunzá",
            "Pizza"
        ],
        answer: 3
    }
];

let shuffledQuizData = [];
let currentQuestion = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffledQuizData = quizData.map(q => ({...q}));
    shuffle(shuffledQuizData);
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    if (currentQuestion < shuffledQuizData.length) {
        const q = shuffledQuizData[currentQuestion];
        quizContainer.innerHTML = `
            <h2>${q.question}</h2>
            <form id="quiz-form">
                ${q.options.map((opt, idx) => `
                    <label>
                        <input type="radio" name="option" value="${idx}" required>
                        ${opt}
                    </label><br>
                `).join('')}
                <button type="submit">Responder</button>
            </form>
        `;
        document.getElementById('quiz-form').onsubmit = handleAnswer;
    } else {
        showResult();
    }
}

function handleAnswer(event) {
    event.preventDefault();
    const form = event.target;
    const selected = parseInt(form.option.value, 10);
    if (selected === shuffledQuizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2>Quiz finalizado!</h2>
        <p>Você acertou ${score} de ${shuffledQuizData.length} perguntas.</p>
        <button onclick="restartQuiz()">Tentar novamente</button>
    `;
}

function restartQuiz() {
    startQuiz();
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-container')) {
        startQuiz();
    }
});