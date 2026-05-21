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
    return db.collection("thirdEyeResults")
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

/* ================= DATA ================= */
const groups = {
  BLACKPINK: {
    Lisa: { attractive:"Confident", comfort:"Fun", trust:"Loyal", miss:"Energy", emotional:"Protective", lovable:"Chaotic", energy:"Fearless" },
    Jennie: { attractive:"Elegant", comfort:"Soft", trust:"Reliable", miss:"Aura", emotional:"Deep", lovable:"Stylish", energy:"Classy" },
    Rosé: { attractive:"Gentle", comfort:"Calm", trust:"Sensitive", miss:"Emotion", emotional:"Soft", lovable:"Sweet", energy:"Dreamy" },
    Jisoo: { attractive:"Balanced", comfort:"Stable", trust:"Loyal", miss:"Presence", emotional:"Warm", lovable:"Funny calm", energy:"Graceful" }
},

  BTS: {
    Jungkook: { attractive:"Intense", comfort:"Playful", trust:"Loyal", miss:"Attention", emotional:"Deep", lovable:"Sweet chaos", energy:"Powerful" },
    V: { attractive:"Artistic", comfort:"Calm", trust:"Gentle", miss:"Presence", emotional:"Soft", lovable:"Unique", energy:"Dreamy" },
    Jimin: { attractive:"Charming", comfort:"Supportive", trust:"Caring", miss:"Warmth", emotional:"Emotional", lovable:"Cute", energy:"Sweet" },
    RM: { attractive:"Intelligent", comfort:"Mature", trust:"Wise", miss:"Conversation", emotional:"Deep", lovable:"Clumsy", energy:"Leader" },
    Jin: { attractive:"Funny", comfort:"Warm", trust:"Reliable", miss:"Presence", emotional:"Soft", lovable:"Dad jokes", energy:"Bright" },
    Suga: { attractive:"Cold calm", comfort:"Silent", trust:"Honest", miss:"Quiet", emotional:"Deep", lovable:"Savage soft", energy:"Chill" },
    JHope: { attractive:"Energetic", comfort:"Bright", trust:"Loyal", miss:"Joy", emotional:"Pure", lovable:"Funny", energy:"Sunshine" }
}

 TWICE: {
    Nayeon: { attractive:"Bright", comfort:"Cute", trust:"Friendly", miss:"Smile", emotional:"Happy", lovable:"Playful", energy:"Cheerful" },
    Jeongyeon: { attractive:"Cool", comfort:"Calm", trust:"Stable", miss:"Balance", emotional:"Strong", lovable:"Soft smile", energy:"Steady" },
    Momo: { attractive:"Powerful", comfort:"Fun", trust:"Energetic", miss:"Dance", emotional:"Wild", lovable:"Funny", energy:"Explosive" },
    Sana: { attractive:"Cute charm", comfort:"Sweet", trust:"Soft", miss:"Voice", emotional:"Warm", lovable:"Aegyo", energy:"Sparkle" },
    Jihyo: { attractive:"Leader aura", comfort:"Strong", trust:"Reliable", miss:"Strength", emotional:"Deep", lovable:"Caring", energy:"Powerful" },
    Mina: { attractive:"Elegant", comfort:"Quiet", trust:"Gentle", miss:"Grace", emotional:"Soft", lovable:"Calm beauty", energy:"Smooth" },
    Dahyun: { attractive:"Funny charm", comfort:"Bright", trust:"Honest", miss:"Laugh", emotional:"Playful", lovable:"Goofy", energy:"Cheerful" },
    Chaeyoung: { attractive:"Artistic", comfort:"Cool", trust:"Unique", miss:"Creativity", emotional:"Deep", lovable:"Creative", energy:"Free" },
    Tzuyu: { attractive:"Visual", comfort:"Calm", trust:"Reserved", miss:"Presence", emotional:"Soft", lovable:"Gentle", energy:"Quiet" }
}

   STRAYKIDS: {
    BangChan: { attractive:"Leader energy", comfort:"Protective", trust:"Strong", miss:"Guidance", emotional:"Deep", lovable:"Warm", energy:"Power" },
    LeeKnow: { attractive:"Cool", comfort:"Quiet", trust:"Mysterious", miss:"Silence", emotional:"Hidden", lovable:"Funny shock", energy:"Controlled" },
    Changbin: { attractive:"Powerful", comfort:"Strong", trust:"Reliable", miss:"Intensity", emotional:"Deep", lovable:"Tough soft", energy:"Aggressive" },
    Hyunjin: { attractive:"Artistic", comfort:"Emotional", trust:"Deep", miss:"Presence", emotional:"Intense", lovable:"Drama cute", energy:"Flow" },
    Han: { attractive:"Funny charm", comfort:"Playful", trust:"Loyal", miss:"Chaos", emotional:"Mixed", lovable:"Cute chaos", energy:"Fast" },
    Felix: { attractive:"Soft voice", comfort:"Gentle", trust:"Kind", miss:"Sunshine", emotional:"Pure", lovable:"Angel", energy:"Bright" },
    Seungmin: { attractive:"Calm", comfort:"Stable", trust:"Honest", miss:"Balance", emotional:"Soft", lovable:"Sweet", energy:"Steady" },
    I.N: { attractive:"Cute", comfort:"Shy", trust:"Pure", miss:"Youth", emotional:"Soft", lovable:"Baby charm", energy:"Light" }
}

    ITZY: {
    Yeji: { attractive:"Leader aura", comfort:"Strong", trust:"Reliable", miss:"Focus", emotional:"Determined", lovable:"Cool cute", energy:"Sharp" },
    Lia: { attractive:"Soft beauty", comfort:"Calm", trust:"Gentle", miss:"Warmth", emotional:"Sensitive", lovable:"Sweet", energy:"Light" },
    Ryujin: { attractive:"Cool swag", comfort:"Neutral", trust:"Confident", miss:"Attitude", emotional:"Hidden soft", lovable:"Chill funny", energy:"Bold" },
    Chaeryeong: { attractive:"Graceful", comfort:"Soft", trust:"Kind", miss:"Dance", emotional:"Gentle", lovable:"Shy cute", energy:"Flow" },
    Yuna: { attractive:"Bright visual", comfort:"Cute", trust:"Friendly", miss:"Smile", emotional:"Happy", lovable:"Aegyo queen", energy:"High" }
}
};

/* ================= STATE ================= */
let selectedGroup = "";
let selectedPair = [];
let currentQuestion = 0;
let score = {A:0,B:0};
let directChoice = "";

/* ================= SCREEN SWITCH ================= */
function showScreen(screen){
    [intro, groupScreen, memberScreen, quiz, loading, result]
        .forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
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

/* ================= CONTINUE ================= */
groupContinueBtn.onclick = () => {
    if(!selectedGroup) return alert("Choose group");
    showMemberScreen();
};

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

/* ================= QUESTIONS ================= */
function getQuestions(){
    const A = groups[selectedGroup][selectedPair[0]];
    const B = groups[selectedGroup][selectedPair[1]];

    return [
        { q:"Attractive?", a:[{t:A.attractive,v:"A"},{t:B.attractive,v:"B"}] },
        { q:"Comfort?", a:[{t:A.comfort,v:"A"},{t:B.comfort,v:"B"}] },
        { q:"Trust?", a:[{t:A.trust,v:"A"},{t:B.trust,v:"B"}] },
        { q:"Miss?", a:[{t:A.miss,v:"A"},{t:B.miss,v:"B"}] },
        { q:"Emotion?", a:[{t:A.emotional,v:"A"},{t:B.emotional,v:"B"}] },
        { q:"Love?", a:[{t:A.lovable,v:"A"},{t:B.lovable,v:"B"}] },
        { q:"Energy?", a:[{t:A.energy,v:"A"},{t:B.energy,v:"B"}] },
        { q:"Final Choice?", a:[
            {t:selectedPair[0],v:"AD"},
            {t:selectedPair[1],v:"BD"}
        ]}
    ];
}

/* ================= LOAD ================= */
function loadQuestion(){

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
Subconscious Preference: ${subconscious} — ${percent}%

⚠️ Contradiction detected.`;

    } else {

        statement =
`${usernameInput.value}

Conscious Choice: ${conscious}
Subconscious Preference: ${subconscious} — ${percent}%

✔ Alignment detected.`;
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
        time: new Date()
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
