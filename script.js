const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText = document.getElementById("questionText");
const options = document.getElementById("options");

const resultText = document.getElementById("resultText");

const usernameInput = document.getElementById("username");

/* QUESTIONS */

const questions = [

    {
        question: "Choose one.",
        answers: [
            { text: "Luxury black aesthetic", type: "lisa" },
            { text: "Soft elegant aesthetic", type: "jennie" }
        ]
    },

    {
        question: "Which feels more attractive?",
        answers: [
            { text: "Sharp confidence", type: "lisa" },
            { text: "Quiet charm", type: "jennie" }
        ]
    },

    {
        question: "Choose an energy.",
        answers: [
            { text: "Powerful independence", type: "lisa" },
            { text: "Warm mystery", type: "jennie" }
        ]
    },

    {
        question: "Choose a visual.",
        answers: [
            { text: "City lights at midnight", type: "lisa" },
            { text: "Soft sunset café", type: "jennie" }
        ]
    },

    {
        question: "Which feels closer to you?",
        answers: [
            { text: "Bold ambition", type: "lisa" },
            { text: "Emotional comfort", type: "jennie" }
        ]
    },

    {
        question: "Choose one animal.",
        answers: [
            { text: "Black Panther", type: "lisa" },
            { text: "Cat", type: "jennie" }
        ]
    },

    {
        question: "Which atmosphere feels stronger?",
        answers: [
            { text: "Dark neon night", type: "lisa" },
            { text: "Soft pastel evening", type: "jennie" }
        ]
    },

    /* FINAL DIRECT QUESTION */

    {
        question: "Who do you like more?",
        answers: [
            { text: "Lisa", type: "lisaDirect" },
            { text: "Jennie", type: "jennieDirect" }
        ]
    }

];

let currentQuestion = 0;

let score = {
    lisa: 0,
    jennie: 0
};

let directChoice = "";

/* SCREEN SWITCH */

function showScreen(screen){

    [intro, quiz, loading, result]
    .forEach(s => s.classList.remove("active"));

    screen.classList.add("active");
}

/* START */

startBtn.addEventListener("click", () => {

    if(usernameInput.value.trim() === ""){
        alert("Enter your name.");
        return;
    }

    showScreen(quiz);

    loadQuestion();

});

/* LOAD QUESTION */

function loadQuestion(){

    options.innerHTML = "";

    let q = questions[currentQuestion];

    questionText.innerText = q.question;

    q.answers.forEach(answer => {

        const div = document.createElement("div");

        div.classList.add("option");

        div.innerText = answer.text;

        div.addEventListener("click", () => {

            /* INDIRECT SCORING */

            if(answer.type === "lisa"){
                score.lisa++;
            }

            if(answer.type === "jennie"){
                score.jennie++;
            }

            /* DIRECT ANSWER */

            if(answer.type === "lisaDirect"){
                directChoice = "Lisa";
            }

            if(answer.type === "jennieDirect"){
                directChoice = "Jennie";
            }

            currentQuestion++;

            if(currentQuestion < questions.length){

                loadQuestion();

            } else {

                analyze();

            }

        });

        options.appendChild(div);

    });

}

/* ANALYSIS */

function analyze(){

    showScreen(loading);

    setTimeout(() => {

        showResult();

    }, 3000);

}

/* RESULT */

function showResult(){

    showScreen(result);

    let subconscious =
        score.lisa > score.jennie
        ? "Lisa"
        : "Jennie";

    let highest =
        Math.max(score.lisa, score.jennie);

    let percent =
        Math.round((highest / 7) * 100);

    let finalMessage = "";

    /* CONTRADICTION */

    if(subconscious !== directChoice){

        finalMessage = `

${usernameInput.value},

Conscious Choice:
${directChoice}

Subconscious Preference:
${subconscious} — ${percent}%

Contradiction detected.

Your emotional pattern
did not match your final answer.

`;

    }

    else{

        finalMessage = `

${usernameInput.value},

Conscious Choice:
${directChoice}

Subconscious Preference:
${subconscious} — ${percent}%

Your choices remained consistent.

`;

    }

    resultText.innerText = finalMessage;

}

/* RESTART */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = {
        lisa: 0,
        jennie: 0
    };

    directChoice = "";

    usernameInput.value = "";

    showScreen(intro);

});
