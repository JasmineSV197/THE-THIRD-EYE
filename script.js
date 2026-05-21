/* 🔥 FIREBASE INIT */
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
function saveToFirebase(data){
    try {
        db.collection("thirdEyeResults").add(data)
        .catch(err => console.log("Firebase error:", err));
    } catch (e) {
        console.log("Firebase not ready:", e);
    }
}

/* ELEMENTS */
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

/* DATA */
const groups = {
    BLACKPINK: {
        Lisa: { attractive:"Confident", comfort:"Funny", trust:"Honest", miss:"Energy", emotional:"Protective", lovable:"Chaotic", energy:"Fearless" },
        Jennie: { attractive:"Classy", comfort:"Soft", trust:"Reliable", miss:"Warmth", emotional:"Deep", lovable:"Soft inside", energy:"Elegant" },
        Rosé: { attractive:"Gentle", comfort:"Sweet", trust:"Sensitive", miss:"Emotion", emotional:"Soft", lovable:"Cute", energy:"Dreamy" },
        Jisoo: { attractive:"Calm", comfort:"Stable", trust:"Loyal", miss:"Presence", emotional:"Safe", lovable:"Funny calm", energy:"Balanced" }
    },

    BTS: {
        Jungkook: { attractive:"Intense", comfort:"Playful", trust:"Loyal", miss:"Attention", emotional:"Deep", lovable:"Sweet chaos", energy:"Passionate" },
        V: { attractive:"Artistic", comfort:"Calm", trust:"Gentle", miss:"Presence", emotional:"Soft", lovable:"Strange cute", energy:"Dreamy" },
        Jimin: { attractive:"Charming", comfort:"Supportive", trust:"Caring", miss:"Warmth", emotional:"Attachment", lovable:"Cute", energy:"Sweet" },
        RM: { attractive:"Intelligent", comfort:"Mature", trust:"Wise", miss:"Conversation", emotional:"Support", lovable:"Clumsy", energy:"Leader" },
        Jin: { attractive:"Funny", comfort:"Warm", trust:"Reliable", miss:"Presence", emotional:"Sensitive", lovable:"Dad jokes", energy:"Bright" },
        Suga: { attractive:"Cold warm", comfort:"Silent", trust:"Honest", miss:"Quiet", emotional:"Deep", lovable:"Savage soft", energy:"Calm" },
        "J-Hope": { attractive:"Energetic", comfort:"Bright", trust:"Loyal", miss:"Joy", emotional:"Pure", lovable:"Funny", energy:"Sunshine" }
    }
};

/* STATE */
let selectedGroup = "";
let selectedPair = [];
let currentQuestion = 0;
let score = { A: 0, B: 0 };
let directChoice = "";

/* SCREEN SWITCH */
function showScreen(screen){
    [intro, groupScreen, memberScreen, quiz, loading, result]
        .forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

/* START */
startBtn.onclick = () => {
    if(!usernameInput.value.trim()){
        alert("Enter name");
        return;
    }
    generateGroups();
    showScreen(groupScreen);
};

/* GROUPS */
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

/* GROUP CONTINUE */
groupContinueBtn.onclick = () => {
    if(!selectedGroup) return alert("Choose group");
    showMemberScreen();
};

/* MEMBERS */
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
                return;
            }

            if(selectedPair.length < 2){
                selectedPair.push(name);
                div.classList.add("selected");
            }
        };

        memberButtons.appendChild(div);
    });
}

/* CONTINUE */
memberContinueBtn.onclick = () => {
    if(selectedPair.length !== 2) return alert("Choose 2");

    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(quiz);
    loadQuestion();
};

/* QUESTIONS */
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
        { q:"Final?", a:[{t:selectedPair[0],v:"AD"},{t:selectedPair[1],v:"BD"}] }
    ];
}

/* LOAD */
function loadQuestion(){
    const q = getQuestions()[currentQuestion];
    questionText.innerText = q.q;

    options.innerHTML = "";

    q.a.sort(() => Math.random() - 0.5).forEach(ans => {
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

/* ANALYZE */
function analyze(){
    showScreen(loading);
    setTimeout(showResult, 2000);
}

/* RESULT + FIREBASE */
/* 🔥 FIREBASE INIT */
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ELEMENTS */
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

/* DATA */
const groups = {
    BLACKPINK: {
        Lisa: { attractive:"Confident", comfort:"Funny", trust:"Honest", miss:"Energy", emotional:"Protective", lovable:"Chaotic", energy:"Fearless" },
        Jennie: { attractive:"Classy", comfort:"Soft", trust:"Reliable", miss:"Warmth", emotional:"Deep", lovable:"Soft inside", energy:"Elegant" },
        Rosé: { attractive:"Gentle", comfort:"Sweet", trust:"Sensitive", miss:"Emotion", emotional:"Soft", lovable:"Cute", energy:"Dreamy" },
        Jisoo: { attractive:"Calm", comfort:"Stable", trust:"Loyal", miss:"Presence", emotional:"Safe", lovable:"Funny calm", energy:"Balanced" }
    },

    BTS: {
        Jungkook: { attractive:"Intense", comfort:"Playful", trust:"Loyal", miss:"Attention", emotional:"Deep", lovable:"Sweet chaos", energy:"Passionate" },
        V: { attractive:"Artistic", comfort:"Calm", trust:"Gentle", miss:"Presence", emotional:"Soft", lovable:"Strange cute", energy:"Dreamy" },
        Jimin: { attractive:"Charming", comfort:"Supportive", trust:"Caring", miss:"Warmth", emotional:"Attachment", lovable:"Cute", energy:"Sweet" },
        RM: { attractive:"Intelligent", comfort:"Mature", trust:"Wise", miss:"Conversation", emotional:"Support", lovable:"Clumsy", energy:"Leader" },
        Jin: { attractive:"Funny", comfort:"Warm", trust:"Reliable", miss:"Presence", emotional:"Sensitive", lovable:"Dad jokes", energy:"Bright" },
        Suga: { attractive:"Cold warm", comfort:"Silent", trust:"Honest", miss:"Quiet", emotional:"Deep", lovable:"Savage soft", energy:"Calm" },
        "J-Hope": { attractive:"Energetic", comfort:"Bright", trust:"Loyal", miss:"Joy", emotional:"Pure", lovable:"Funny", energy:"Sunshine" }
    }
};

/* STATE */
let selectedGroup = "";
let selectedPair = [];
let currentQuestion = 0;
let score = { A: 0, B: 0 };
let directChoice = "";

/* SCREEN SWITCH */
function showScreen(screen){
    [intro, groupScreen, memberScreen, quiz, loading, result]
        .forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

/* START */
startBtn.onclick = () => {
    if(!usernameInput.value.trim()){
        alert("Enter name");
        return;
    }
    generateGroups();
    showScreen(groupScreen);
};

/* GROUPS */
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

/* GROUP CONTINUE */
groupContinueBtn.onclick = () => {
    if(!selectedGroup) return alert("Choose group");
    showMemberScreen();
};

/* MEMBERS */
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
                return;
            }

            if(selectedPair.length < 2){
                selectedPair.push(name);
                div.classList.add("selected");
            }
        };

        memberButtons.appendChild(div);
    });
}

/* CONTINUE */
memberContinueBtn.onclick = () => {
    if(selectedPair.length !== 2) return alert("Choose 2");

    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(quiz);
    loadQuestion();
};

/* QUESTIONS */
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
        { q:"Final?", a:[{t:selectedPair[0],v:"AD"},{t:selectedPair[1],v:"BD"}] }
    ];
}

/* LOAD */
function loadQuestion(){
    const q = getQuestions()[currentQuestion];
    questionText.innerText = q.q;

    options.innerHTML = "";

    q.a.sort(() => Math.random() - 0.5).forEach(ans => {
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

/* ANALYZE */
function showResult(){

    showScreen(result);

    const subconscious =
        score.A > score.B ? selectedPair[0] : selectedPair[1];

    const diff = Math.abs(score.A - score.B);
    let percent = Math.min(95, 50 + diff * 10);

    const indirect =
        score.A >= score.B ? selectedPair[0] : selectedPair[1];

    const conscious = directChoice || "Not selected";

    /* CLEAR EVERYTHING FIRST */
    resultText.innerText = "";
    extraResult.innerHTML = "";

    /* FINAL STATEMENT (ONLY ONE PLACE FOR IT) */
    let statement = "";

    if(subconscious !== conscious){

        statement =
`${usernameInput.value}

Conscious Choice: ${conscious}
Subconscious Preference: ${subconscious} — ${percent}%

⚠️ Contradiction detected.
Your inner pattern differs from your final decision.`;

    } else {

        statement =
`${usernameInput.value}

Conscious Choice: ${conscious}
Subconscious Preference: ${subconscious} — ${percent}%

✔ Alignment detected.
Your decision matches your subconscious pattern.`;
    }

    resultText.innerText = statement;

    extraResult.innerHTML = `
        <div><b>Most Indirectly Preferred:</b> ${indirect}</div>
        <div><b>Deep Pattern Match:</b> ${subconscious}</div>
    `;

    /* SAVE */
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

/* RESTART */
restartBtn.onclick = () => {
    selectedGroup = "";
    selectedPair = [];
    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(intro);
};

/* RESTART */
restartBtn.onclick = () => {
    selectedGroup = "";
    selectedPair = [];
    currentQuestion = 0;
    score = {A:0,B:0};
    directChoice = "";

    showScreen(intro);
};
