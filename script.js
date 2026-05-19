/* THIRD EYE - SCRIPT */

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const screens = document.querySelectorAll(".screen");

const introScreen = document.getElementById("intro-screen");
const questionScreen = document.getElementById("question-screen");
const analysisScreen = document.getElementById("analysis-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");


/* QUESTIONS */

const questions = [
    {
        q: "What color feels most comforting?",
        a: ["Pink", "Red", "Black", "Blue"]
    },
    {
        q: "What memory returns the most?",
        a: ["Childhood", "A person", "A place", "A feeling"]
    },
    {
        q: "What do you avoid thinking about?",
        a: ["Past", "Future", "People", "Myself"]
    },
    {
        q: "What feels more real to you?",
        a: ["Dreams", "Reality", "Memories", "Imagination"]
    }
];

let currentQuestion = 0;


/* SCREEN SWITCH */

function showScreen(screen) {
    screens.forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}


/* START */

startBtn.addEventListener("click", () => {
    showScreen(questionScreen);
    loadQuestion();
});


/* LOAD QUESTION */

function loadQuestion() {

    answersContainer.innerHTML = "";

    let q = questions[currentQuestion];

    questionText.innerText = q.q;

    q.a.forEach(answer => {

        const btn = document.createElement("div");
        btn.classList.add("answer-btn");
        btn.innerText = answer;
btn.addEventListener("click", () => {

    let answer = btn.innerText;

    // 🧠 TRACK SUBCONSCIOUS PATTERNS
    if (answer === "Pink") score.pink++;
    if (answer === "Red") score.red++;

    if (answer === "A person") score.memory++;
    if (answer === "Dreams") score.dream++;

    // 👁️ MOVE NEXT
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showAnalysis();
    }

});

        answersContainer.appendChild(btn);

    });

}


/* ANALYSIS */

function showAnalysis() {

    showScreen(analysisScreen);

    setTimeout(() => {
        showResult();
    }, 3000);

}


/* RESULT */

function showResult() {

    let resultText = "";

    if (score.pink > score.red) {
        resultText =
        "You say you moved on...\nBut your mind still returns to the original.";
    }

    else if (score.red > score.pink) {
        resultText =
        "You chose change.\nBut your patterns still echo the past.";
    }

    else if (score.memory > score.dream) {
        resultText =
        "You live in memory more than reality.";
    }

    else {
        resultText =
        "Your subconscious is fragmented.\nNothing is truly gone.";
    }

    document.getElementById("result-text").innerText = resultText;

    showScreen(resultScreen);
}

/* RESTART */

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    showScreen(introScreen);
});
let score = {
    pink: 0,
    red: 0,
    memory: 0,
    dream: 0
};
