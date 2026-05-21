/* ================= FIREBASE ================= */
window.onerror = function(msg, url, line) {
    console.log("ERROR:", msg, "LINE:", line);
};

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "the-third-eye-69578.firebaseapp.com",
    projectId: "the-third-eye-69578",
    storageBucket: "the-third-eye-69578.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================= SAVE ================= */
function saveToFirebase(data){
    if (!db) return;

    db.collection("thirdEyeResults")
    .add(data)
    .then(() => console.log("Saved ✔"))
    .catch(err => console.error("Save error:", err));
}

/* ================= ELEMENTS ================= */
const intro = document.getElementById("intro");
const groupScreen = document.getElementById("groupScreen");
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

const questionText = document.getElementById("questionText");
const options = document.getElementById("options");

const resultText = document.getElementById("resultText");
const extraResult = document.getElementById("extraResult");

const usernameInput = document.getElementById("username");
const selectedGroupTitle = document.getElementById("selectedGroupTitle");

/* ================= STATE ================= */
let selectedGroup = "";
let selectedPair = [];
let currentQuestion = 0;
let score = {A:0,B:0};
let directChoice = "";

/* ================= SCREEN ================= */
function showScreen(screen){
    [intro, groupScreen, memberScreen, quiz, loading, result]
        .forEach(s => s.classList.remove("active"));

    if(screen) screen.classList.add("active");
}

/* ================= START ================= */
startBtn.onclick = () => {
    if(!usernameInput.value.trim()){
        alert("Enter name");
        return;
    }
    generateGroups();
    showScreen(groupScreen);
};

/* ENTER FIX */
usernameInput?.addEventListener("keydown", (e) => {
    if(e.key === "Enter") startBtn.click();
});

/* ================= GROUPS ================= */
function generateGroups(){
    groupButtons.innerHTML = "";

    Object.keys(groups).forEach(group => {
        const div = document.createElement("div");
        div.className = "pairOption";
        div.innerText = group;

        div.onclick = () => {
            selectedGroup = group;

            document.querySelectorAll("#groupButtons .pairOption")
                .forEach(b => b.classList.remove("selected"));

            div.classList.add("selected");
        };

        groupButtons.appendChild(div);
    });
}

/* ================= GROUP CONTINUE ================= */
groupContinueBtn.onclick = () => {
    if(!selectedGroup) return alert("Choose group");
    showMemberScreen();
};

/* ================= MEMBER SCREEN ================= */
function showMemberScreen(){
    showScreen(memberScreen);

    selectedGroupTitle.innerText = selectedGroup;
    memberButtons.innerHTML = "";
    selectedPair = [];

    Object.keys(groups[selectedGroup]).forEach(name => {

        const div = document.createElement("div");
        div.className = "pairOption";
        div.innerText = name;

        div.onclick = () => {
            if(selectedPair.includes(name)){
                selectedPair = selectedPair.filter(n => n !== name);
                div.classList.remove("selected");
            } else if(selectedPair.length < 2){
                selectedPair.push(name);
                div.classList.add("selected");
            }
        };

        memberButtons.appendChild(div);
    });
}

/* ================= CONTINUE ================= */
memberContinueBtn.onclick = () => {

    if(selectedPair.length !== 2){
        alert("Choose 2 members");
        return;
    }

    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(quiz);
    loadQuestion();
};

/* ================= QUESTIONS (UNCHANGED) ================= */
function getQuestions(){
    const A = groups[selectedGroup][selectedPair[0]];
    const B = groups[selectedGroup][selectedPair[1]];

    return [
        { q:"What attracts you the most?", a:[{t:A.attractive,v:"A"},{t:B.attractive,v:"B"}] },
        { q:"What comforts you the most?", a:[{t:A.comfort,v:"A"},{t:B.comfort,v:"B"}] },
        { q:"How do you define trust?", a:[{t:A.trust,v:"A"},{t:B.trust,v:"B"}] },
        { q:"What do you need the most?", a:[{t:A.miss,v:"A"},{t:B.miss,v:"B"}] },
        { q:"How do you define emotion?", a:[{t:A.emotional,v:"A"},{t:B.emotional,v:"B"}] },
        { q:"How do you define love?", a:[{t:A.lovable,v:"A"},{t:B.lovable,v:"B"}] },
        { q:"What energy you like?", a:[{t:A.energy,v:"A"},{t:B.energy,v:"B"}] },
        { q:"Who is you most preffered choice?", a:[
            {t:selectedPair[0],v:"AD"},
            {t:selectedPair[1],v:"BD"}
        ]}
    ];
}

/* ================= LOAD ================= */
function loadQuestion(){

    if(selectedPair.length !== 2) return;

    const q = getQuestions()[currentQuestion];
    questionText.innerText = q.q;

    options.innerHTML = "";

    q.a.forEach(ans => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = ans.t;

        div.onclick = () => {
            if(ans.v === "A") score.A++;
            if(ans.v === "B") score.B++;

            if(ans.v === "AD") directChoice = selectedPair[0];
            if(ans.v === "BD") directChoice = selectedPair[1];

            currentQuestion++;

            if(currentQuestion < 8) loadQuestion();
            else analyze();
        };

        options.appendChild(div);
    });
}

/* ================= ANALYZE ================= */
function analyze(){
    showScreen(loading);
    setTimeout(showResult, 2000);
}

/* ================= RESULT (UNCHANGED LOGIC) ================= */
function showResult(){

    showScreen(result);

    const subconscious =
        score.A > score.B ? selectedPair[0] : selectedPair[1];

    const diff = Math.abs(score.A - score.B);
    let percent = Math.min(95, 50 + diff * 10);

    const indirect =
        score.A >= score.B ? selectedPair[0] : selectedPair[1];

    const conscious = directChoice || "Not chosen";

    let statement = "";

    if(subconscious !== conscious){

        statement =
`${usernameInput.value}

Conscious Choice: ${conscious}
Subconscious Preference: ${subconscious} — ${percent}%`;

    } else {

        statement =
`${usernameInput.value}

Conscious Choice: ${conscious}
Subconscious Preference: ${subconscious} — ${percent}%`;
    }

    resultText.innerText = statement;

    extraResult.innerHTML = `
        <b>Most Indirectly Preferred:</b> ${indirect}
        <br><b>Deep Match:</b> ${subconscious}
    `;

    saveToFirebase({
        name: usernameInput.value,
        group: selectedGroup,
        pair: selectedPair,
        conscious,
        subconscious,
        indirect,
        percent,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });
}

/* ================= RESTART ================= */
restartBtn.onclick = () => {
    selectedGroup = "";
    selectedPair = [];
    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(intro);
};
