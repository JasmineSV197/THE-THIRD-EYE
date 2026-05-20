const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const pairSelect = document.getElementById("pairSelect");
const continueBtn = document.getElementById("continueBtn");

const pairOptions =
document.querySelectorAll(".pairOption");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText =
document.getElementById("questionText");

const options =
document.getElementById("options");

const resultText =
document.getElementById("resultText");

const usernameInput =
document.getElementById("username");

/* CHARACTER DATA */

const characters = {

    Lisa: {
        aesthetic: "Luxury black aesthetic",
        trait: "Sharp confidence",
        energy: "Powerful independence",
        place: "City lights at midnight",
        emotion: "Bold ambition",
        animal: "Black Panther",
        vibe: "Dark neon night"
    },

    Jennie: {
        aesthetic: "Soft elegant aesthetic",
        trait: "Quiet charm",
        energy: "Warm mystery",
        place: "Soft sunset café",
        emotion: "Emotional comfort",
        animal: "Cat",
        vibe: "Soft pastel evening"
    },

    Rosé: {
        aesthetic: "Soft vintage aesthetic",
        trait: "Gentle sensitivity",
        energy: "Dreamy emotion",
        place: "Rainy window evening",
        emotion: "Quiet attachment",
        animal: "Swan",
        vibe: "Emotional rainy night"
    },

    Jisoo: {
        aesthetic: "Classic royal aesthetic",
        trait: "Warm elegance",
        energy: "Calm confidence",
        place: "Moonlight garden",
        emotion: "Peaceful warmth",
        animal: "Rabbit",
        vibe: "Royal peaceful evening"
    }

};

/* DYNAMIC QUESTIONS */

function getQuestions(){

    const A = characters[selectedPair[0]];
    const B = characters[selectedPair[1]];

    return [

        {
            question: "Choose one.",
            answers: [
                { text: A.aesthetic, type: "A" },
                { text: B.aesthetic, type: "B" }
            ]
        },

        {
            question: "Which feels more attractive?",
            answers: [
                { text: A.trait, type: "A" },
                { text: B.trait, type: "B" }
            ]
        },

        {
            question: "Choose an energy.",
            answers: [
                { text: A.energy, type: "A" },
                { text: B.energy, type: "B" }
            ]
        },

        {
            question: "Choose a visual.",
            answers: [
                { text: A.place, type: "A" },
                { text: B.place, type: "B" }
            ]
        },

        {
            question: "Which feels closer to you?",
            answers: [
                { text: A.emotion, type: "A" },
                { text: B.emotion, type: "B" }
            ]
        },

        {
            question: "Choose one animal.",
            answers: [
                { text: A.animal, type: "A" },
                { text: B.animal, type: "B" }
            ]
        },

        {
            question: "Which atmosphere feels stronger?",
            answers: [
                { text: A.vibe, type: "A" },
                { text: B.vibe, type: "B" }
            ]
        },

        {
            question: "Who do you like more?",
            answers: [
                { text: selectedPair[0], type: "ADirect" },
                { text: selectedPair[1], type: "BDirect" }
            ]
        }

    ];

}

let currentQuestion = 0;

let score = {
    A: 0,
    B: 0
};

let directChoice = "";

let selectedPair = [];

/* SCREEN SWITCH */

function showScreen(screen){

    [intro, pairSelect, quiz, loading, result]
    .forEach(s => s.classList.remove("active"));

    screen.classList.add("active");
}

/* START */

startBtn.addEventListener("click", () => {

    if(usernameInput.value.trim() === ""){
        alert("Enter your name.");
        return;
    }

    showScreen(pairSelect);

});

/* PAIR SELECT */

pairOptions.forEach(option => {

    option.addEventListener("click", () => {

        const name =
        option.getAttribute("data-name");

        if(selectedPair.includes(name)){

            selectedPair =
            selectedPair.filter(n => n !== name);

            option.classList.remove("selected");

        }

        else{

            if(selectedPair.length < 2){

                selectedPair.push(name);

                option.classList.add("selected");
            }

        }

    });

});

/* CONTINUE */

continueBtn.addEventListener("click", () => {

    if(selectedPair.length !== 2){

        alert("Choose exactly 2.");
        return;
    }

    showScreen(quiz);

    loadQuestion();

});

/* LOAD QUESTION */

function loadQuestion(){

    options.innerHTML = "";

    let q =
    getQuestions()[currentQuestion];

    questionText.innerText =
    q.question;

   let shuffledAnswers =
q.answers.sort(() => Math.random() - 0.5);

shuffledAnswers.forEach(answer => {

        const div =
        document.createElement("div");

        div.classList.add("option");

        div.innerText =
        answer.text;

        div.addEventListener("click", () => {

            /* INDIRECT */

            if(answer.type === "A"){
                score.A++;
            }

            if(answer.type === "B"){
                score.B++;
            }

            /* DIRECT */

            if(answer.type === "ADirect"){
                directChoice =
                selectedPair[0];
            }

            if(answer.type === "BDirect"){
                directChoice =
                selectedPair[1];
            }

            currentQuestion++;

            if(currentQuestion < 8){

                loadQuestion();

            }

            else{

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
    score.A > score.B
    ? selectedPair[0]
    : selectedPair[1];

  let difference =
Math.abs(score.A - score.B);

let percent = 50 + (difference * 10);

if(percent > 95){
    percent = 95;
}

    let finalMessage = "";

    if(subconscious !== directChoice){

        finalMessage =

        usernameInput.value +

        "\n\nConscious Choice: " +

        directChoice +

        "\n\nSubconscious Preference: " +

        subconscious +

        " — " +

        percent +

        "%" +

        "\n\nContradiction detected.\nYour emotional pattern did not match your final answer.";

    }

    else{

        finalMessage =

        usernameInput.value +

        "\n\nConscious Choice: " +

        directChoice +

        "\n\nSubconscious Preference: " +

        subconscious +

        " — " +

        percent +

        "%" +

        "\n\nYour choices remained consistent.";

    }

    resultText.innerText =
    finalMessage;

}

/* RESTART */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = {
        A: 0,
        B: 0
    };

    directChoice = "";

    selectedPair = [];

    document
    .querySelectorAll(".pairOption")
    .forEach(option => {
        option.classList.remove("selected");
    });

    usernameInput.value = "";

    showScreen(intro);

});
