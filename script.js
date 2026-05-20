const intro = document.getElementById("intro");
const groupScreen = document.getElementById("groupScreen");
const modeScreen = document.getElementById("modeScreen");
const memberScreen = document.getElementById("memberScreen");
const quiz = document.getElementById("quiz");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const groupButtons = document.getElementById("groupButtons");
const memberButtons = document.getElementById("memberButtons");

const groupContinueBtn = document.getElementById("groupContinueBtn");
const memberContinueBtn = document.getElementById("memberContinueBtn");

const groupModeBtn = document.getElementById("groupModeBtn");
const memberModeBtn = document.getElementById("memberModeBtn");

const questionText = document.getElementById("questionText");
const options = document.getElementById("options");

const resultText = document.getElementById("resultText");
const extraResult = document.getElementById("extraResult");

const usernameInput = document.getElementById("username");

const selectedGroupTitle = document.getElementById("selectedGroupTitle");

/* DATA */
const groups = {
    BLACKPINK: { /* same as yours */ },
    BTS: { /* same as yours */ }
};

/* STATE */
let currentQuestion = 0;
let score = { A: 0, B: 0 };

let selectedGroup = "";
let selectedPair = [];
let mode = "";
let directChoice = "";

/* SCREEN SWITCH */
function showScreen(screen){
    [intro, groupScreen, modeScreen, memberScreen, quiz, loading, result]
    .forEach(s => s.classList.remove("active"));

    screen.classList.add("active");
}

/* START */
startBtn.addEventListener("click", () => {

    if(usernameInput.value.trim() === ""){
        alert("Enter your name.");
        return;
    }

    resetAll();
    showScreen(groupScreen);
});

/* GENERATE GROUPS */
function generateGroups(){

    groupButtons.innerHTML = "";

    for(let group in groups){

        const div = document.createElement("div");
        div.classList.add("pairOption");
        div.innerText = group;

        div.addEventListener("click", () => {

            document.querySelectorAll("#groupButtons .pairOption")
            .forEach(b => b.classList.remove("selected"));

            div.classList.add("selected");
            selectedGroup = group;

        });

        groupButtons.appendChild(div);
    }
}

generateGroups();

/* GROUP CONTINUE */
groupContinueBtn.addEventListener("click", () => {

    if(!selectedGroup){
        alert("Choose a group.");
        return;
    }

    showScreen(modeScreen);
});

/* MODE */
groupModeBtn.addEventListener("click", () => {
    alert("Group mode coming soon 👁️");
});

memberModeBtn.addEventListener("click", () => {
    showMemberScreen();
});

/* MEMBER SCREEN */
function showMemberScreen(){

    showScreen(memberScreen);

    selectedGroupTitle.innerText = selectedGroup;

    memberButtons.innerHTML = "";
    selectedPair = [];

    for(let idol in groups[selectedGroup]){

        const div = document.createElement("div");
        div.classList.add("pairOption");
        div.innerText = idol;

        div.addEventListener("click", () => {

            if(selectedPair.includes(idol)){
                selectedPair = selectedPair.filter(n => n !== idol);
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

    currentQuestion = 0;
    score = { A: 0, B: 0 };
    directChoice = "";

    showScreen(quiz);
    loadQuestion();
});

/* QUESTIONS */
function getQuestions(){

    const A = groups[selectedGroup][selectedPair[0]];
    const B = groups[selectedGroup][selectedPair[1]];

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
            question: "What feels more emotional?",
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
            question: "What energy do you prefer?",
            answers: [
                { text: A.energy, type: "A" },
                { text: B.energy, type: "B" }
            ]
        },
        {
            question: "What do you REALLY choose?",
            answers: [
                { text: selectedPair[0], type: "ADirect" },
                { text: selectedPair[1], type: "BDirect" }
            ]
        }
    ];
}

/* LOAD */
function loadQuestion(){

    options.innerHTML = "";

    const q = getQuestions()[currentQuestion];
    questionText.innerText = q.question;

    q.answers
    .sort(() => Math.random() - 0.5)
    .forEach(answer => {

        const div = document.createElement("div");
        div.classList.add("option");
        div.innerText = answer.text;

        div.onclick = () => {

            if(answer.type === "A") score.A++;
            if(answer.type === "B") score.B++;

            if(answer.type === "ADirect") directChoice = selectedPair[0];
            if(answer.type === "BDirect") directChoice = selectedPair[1];

            currentQuestion++;

            if(currentQuestion < 8) loadQuestion();
            else analyze();
        };

        options.appendChild(div);
    });
}

/* ANALYZE */
function analyze(){
    showScreen(loading);

    setTimeout(showResult, 2500);
}

/* RESULT */
function showResult(){

    showScreen(result);

    const subconscious =
        score.A > score.B ? selectedPair[0] : selectedPair[1];

    const difference = Math.abs(score.A - score.B);

    let percent = 50 + difference * 10;
    if(percent > 95) percent = 95;

    const indirect =
        score.A >= score.B ? selectedPair[0] : selectedPair[1];

    resultText.innerText =
        `${usernameInput.value}

Conscious Choice: ${directChoice}
Subconscious Preference: ${subconscious} — ${percent}%`;

    extraResult.innerHTML = `
        <br><b>Most Indirectly Preferred:</b> ${indirect}
        <br><b>Deep Subconscious Bias:</b> ${subconscious}
    `;
}

/* RESET */
function resetAll(){

    currentQuestion = 0;
    score = { A: 0, B: 0 };
    selectedGroup = "";
    selectedPair = [];
    mode = "";
    directChoice = "";
    extraResult.innerHTML = "";

    document.querySelectorAll(".pairOption")
    .forEach(b => b.classList.remove("selected"));
}

restartBtn.addEventListener("click", () => {

    resetAll();
    showScreen(intro);
    generateGroups();

});
