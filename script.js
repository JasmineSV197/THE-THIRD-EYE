const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const pairSelect = document.getElementById("pairSelect");
const continueBtn = document.getElementById("continueBtn");

let pairOptions;

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

        attractive: "Confident and bold",
        comfort: "Funny and energetic",
        trust: "Honest and straightforward",
        miss: "Constant excitement",
        emotional: "Protective energy",
        lovable: "Chaotic but caring",
        energy: "Independent and fearless"

    },

    Jennie: {

        attractive: "Calm and classy",
        comfort: "Soft and understanding",
        trust: "Quiet and reliable",
        miss: "Warm emotional support",
        emotional: "Deep understanding",
        lovable: "Cold outside, soft inside",
        energy: "Elegant and selective"

    },

    Rosé: {

        attractive: "Gentle and emotional",
        comfort: "Sweet and comforting",
        trust: "Sensitive and honest",
        miss: "Emotional attention",
        emotional: "Soft-hearted warmth",
        lovable: "Cute and caring",
        energy: "Dreamy and emotional"

    },

    Jisoo: {

        attractive: "Mature and calm",
        comfort: "Peaceful and stable",
        trust: "Patient and loyal",
        miss: "Quiet presence",
        emotional: "Safe and comforting",
        lovable: "Funny in a calm way",
        energy: "Warm and balanced"

    },

    Jungkook: {

        attractive: "Confident and intense",
        comfort: "Playful and caring",
        trust: "Protective and loyal",
        miss: "Constant attention",
        emotional: "Hidden emotional depth",
        lovable: "Chaotic but sweet",
        energy: "Fearless and passionate"

    },

    V: {

        attractive: "Mysterious and artistic",
        comfort: "Quiet and understanding",
        trust: "Gentle and thoughtful",
        miss: "Deep emotional presence",
        emotional: "Warm hidden softness",
        lovable: "Strange but lovable",
        energy: "Dreamy and calm"

    },

    Jimin: {

        attractive: "Charming and affectionate",
        comfort: "Emotionally supportive",
        trust: "Sensitive and caring",
        miss: "Soft emotional warmth",
        emotional: "Deep attachment",
        lovable: "Cute and clingy",
        energy: "Sweet and emotional"

    },

    RM: {

        attractive: "Intelligent and calm",
        comfort: "Mature understanding",
        trust: "Wise and reliable",
        miss: "Meaningful conversations",
        emotional: "Quiet emotional support",
        lovable: "Clumsy but caring",
        energy: "Peaceful leadership"

    },

    Jin: {

        attractive: "Funny and stable",
        comfort: "Warm and protective",
        trust: "Reliable and honest",
        miss: "Comforting presence",
        emotional: "Hidden sensitivity",
        lovable: "Dad jokes and care",
        energy: "Bright and comforting"

    },

    Suga: {

        attractive: "Cold but caring",
        comfort: "Silent understanding",
        trust: "Straightforward honesty",
        miss: "Quiet emotional safety",
        emotional: "Deep hidden emotions",
        lovable: "Savage but soft",
        energy: "Calm and intense"

    },

    "J-Hope": {

        attractive: "Positive and energetic",
        comfort: "Bright emotional support",
        trust: "Optimistic and loyal",
        miss: "Happy energy",
        emotional: "Pure-hearted warmth",
        lovable: "Funny and affectionate",
        energy: "Sunshine chaos"

    }

};

/* DYNAMIC QUESTIONS */

function getQuestions(){

    const A = characters[selectedPair[0]];
    const B = characters[selectedPair[1]];

    return [

        {
            question: "What feels more attractive?",
            answers: [
                { text: A.attractive, type: "A" },
                { text: B.attractive, type: "B" }
            ]
        },

        {
            question: "What feels more comforting?",
            answers: [
                { text: A.comfort, type: "A" },
                { text: B.comfort, type: "B" }
            ]
        },

        {
            question: "What feels easier to trust?",
            answers: [
                { text: A.trust, type: "A" },
                { text: B.trust, type: "B" }
            ]
        },

        {
            question: "What would you miss more?",
            answers: [
                { text: A.miss, type: "A" },
                { text: B.miss, type: "B" }
            ]
        },

        {
            question: "What feels more emotionally close?",
            answers: [
                { text: A.emotional, type: "A" },
                { text: B.emotional, type: "B" }
            ]
        },

        {
            question: "What feels more lovable?",
            answers: [
                { text: A.lovable, type: "A" },
                { text: B.lovable, type: "B" }
            ]
        },

        {
            question: "What kind of energy do you naturally prefer?",
            answers: [
                { text: A.energy, type: "A" },
                { text: B.energy, type: "B" }
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

/* LOAD PAIR OPTIONS */

pairOptions =
document.querySelectorAll(".pairOption");

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

            if(answer.type === "A"){
                score.A++;
            }

            if(answer.type === "B"){
                score.B++;
            }

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

    let percent =
    50 + (difference * 10);

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
