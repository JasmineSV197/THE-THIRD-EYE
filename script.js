const intro = document.getElementById("intro");
const groupScreen =
document.getElementById("groupScreen");

const modeScreen =
document.getElementById("modeScreen");

const memberScreen =
document.getElementById("memberScreen");

const quiz =
document.getElementById("quiz");

const loading =
document.getElementById("loading");

const result =
document.getElementById("result");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const groupButtons =
document.getElementById("groupButtons");

const memberButtons =
document.getElementById("memberButtons");

const groupContinueBtn =
document.getElementById("groupContinueBtn");

const memberContinueBtn =
document.getElementById("memberContinueBtn");

const groupModeBtn =
document.getElementById("groupModeBtn");

const memberModeBtn =
document.getElementById("memberModeBtn");

const questionText =
document.getElementById("questionText");

const options =
document.getElementById("options");

const resultText =
document.getElementById("resultText");

const extraResult =
document.getElementById("extraResult");

const usernameInput =
document.getElementById("username");

const selectedGroupTitle =
document.getElementById("selectedGroupTitle");

/* GROUP DATA */

const groups = {

    BLACKPINK: {

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
        }

    },

    BTS: {

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

}

};

/* VARIABLES */

let currentQuestion = 0;

let score = {
    A: 0,
    B: 0
};

let selectedGroup = "";
let selectedPair = [];
let mode = "";
let directChoice = "";

/* SCREEN SWITCH */

function showScreen(screen){

    [
        intro,
        groupScreen,
        modeScreen,
        memberScreen,
        quiz,
        loading,
        result
    ]
    .forEach(s =>
        s.classList.remove("active")
    );

    screen.classList.add("active");

}

/* START */

startBtn.addEventListener("click", () => {

    if(usernameInput.value.trim() === ""){

        alert("Enter your name.");
        return;

    }

    showScreen(groupScreen);

});

/* GENERATE GROUPS */

function generateGroups(){

    groupButtons.innerHTML = "";

    for(let group in groups){

        const div =
        document.createElement("div");

        div.classList.add("pairOption");

        div.innerText = group;

        div.addEventListener("click", () => {

            document
            .querySelectorAll("#groupButtons .pairOption")
            .forEach(btn => {
                btn.classList.remove("selected");
            });

            div.classList.add("selected");

            selectedGroup = group;

        });

        groupButtons.appendChild(div);

    }

}

generateGroups();

/* GROUP CONTINUE */

groupContinueBtn.addEventListener("click", () => {

    if(selectedGroup === ""){

        alert("Choose a group.");
        return;

    }

    showScreen(modeScreen);

});

/* MODE */

groupModeBtn.addEventListener("click", () => {

    alert(
        "Group comparison mode will unlock in next update 👁️"
    );

});

memberModeBtn.addEventListener("click", () => {

    mode = "member";

    showMemberScreen();

});

/* MEMBER SCREEN */

function showMemberScreen(){

    showScreen(memberScreen);

    selectedGroupTitle.innerText =
    selectedGroup;

    memberButtons.innerHTML = "";

    selectedPair = [];

    for(let idol in groups[selectedGroup]){

        const div =
        document.createElement("div");

        div.classList.add("pairOption");

        div.innerText = idol;

        div.addEventListener("click", () => {

            if(selectedPair.includes(idol)){

                selectedPair =
                selectedPair.filter(
                    n => n !== idol
                );

                div.classList.remove("selected");

                return;

            }

            if(selectedPair.length < 2){

                selectedPair.push(idol);

                div.classList.add("selected");

            }

        });

        memberButtons.appendChild(div);

    }

}

/* MEMBER CONTINUE */

memberContinueBtn.addEventListener("click", () => {

    if(selectedPair.length !== 2){

        alert("Choose exactly 2.");
        return;

    }

    showScreen(quiz);

    loadQuestion();

});

/* QUESTIONS */

function getQuestions(){

    const A =
    groups[selectedGroup][selectedPair[0]];

    const B =
    groups[selectedGroup][selectedPair[1]];

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
            question: "What do you like more?",
            answers: [
                {
                    text: selectedPair[0],
                    type: "ADirect"
                },

                {
                    text: selectedPair[1],
                    type: "BDirect"
                }
            ]
        }

    ];

}

/* LOAD QUESTION */

function loadQuestion(){

    options.innerHTML = "";

    const q =
    getQuestions()[currentQuestion];

    questionText.innerText =
    q.question;

    const shuffled =
    q.answers.sort(
        () => Math.random() - 0.5
    );

    shuffled.forEach(answer => {

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

    const subconscious =
    score.A > score.B
    ? selectedPair[0]
    : selectedPair[1];

    const difference =
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

        "\n\nContradiction detected.";

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

    extraResult.innerHTML =

    "<br><b>Most Indirectly Preferred:</b> "
    + subconscious +

    "<br><br><b>Subconscious Match:</b> "
    + subconscious;

}

/* RESTART */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = {
        A: 0,
        B: 0
    };

    selectedGroup = "";

    selectedPair = [];

    directChoice = "";

    usernameInput.value = "";

    extraResult.innerHTML = "";

    showScreen(intro);

});
