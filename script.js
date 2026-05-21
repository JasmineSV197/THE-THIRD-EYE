/* ================= FIREBASE ================= */
const groups = {
    BLACKPINK: {
        Lisa: { attractive:"Confident", comfort:"Fun", trust:"Loyal", miss:"Energy", emotional:"Protective", lovable:"Chaotic", energy:"Fearless" },
        Jennie: { attractive:"Elegant", comfort:"Soft", trust:"Reliable", miss:"Aura", emotional:"Deep", lovable:"Stylish", energy:"Classy" },
        Rosé: { attractive:"Gentle", comfort:"Calm", trust:"Sensitive", miss:"Emotion", emotional:"Soft", lovable:"Sweet", energy:"Dreamy" },
        Jisoo: { attractive:"Balanced", comfort:"Stable", trust:"Loyal", miss:"Presence", emotional:"Warm", lovable:"Funny calm", energy:"Graceful" }
    },
    SEVENTEEN: {
    SCoups: { attractive:"Leader power", comfort:"Protective", trust:"Strong", miss:"Guidance", emotional:"Deep", lovable:"Strong soft", energy:"Commanding" },
    Jeonghan: { attractive:"Angel charm", comfort:"Calm", trust:"Tricky soft", miss:"Smile", emotional:"Gentle", lovable:"Sweet trickster", energy:"Light" },
    Joshua: { attractive:"Gentle elegance", comfort:"Peaceful", trust:"Kind", miss:"Warmth", emotional:"Soft", lovable:"Calm angel", energy:"Smooth" },
    Jun: { attractive:"Mystic aura", comfort:"Quiet", trust:"Reserved", miss:"Silence", emotional:"Deep", lovable:"Unique charm", energy:"Flow" },
    Hoshi: { attractive:"Tiger energy", comfort:"Fun", trust:"Loyal", miss:"Chaos", emotional:"Passion", lovable:"Cute wild", energy:"Explosive" },
    Woozi: { attractive:"Creative genius", comfort:"Silent focus", trust:"Deep", miss:"Music", emotional:"Complex", lovable:"Shy genius", energy:"Controlled" },
    DK: { attractive:"Bright sunshine", comfort:"Happy", trust:"Friendly", miss:"Laugh", emotional:"Joyful", lovable:"Goofy love", energy:"High" },
    Mingyu: { attractive:"Tall charm", comfort:"Warm", trust:"Reliable", miss:"Presence", emotional:"Soft deep", lovable:"Big puppy", energy:"Strong" },
    Vernon: { attractive:"Cool mixed aura", comfort:"Relaxed", trust:"Neutral", miss:"Voice", emotional:"Detached soft", lovable:"Chill funny", energy:"Low cool" },
    Dino: { attractive:"Young energy", comfort:"Playful", trust:"Growing", miss:"Youth", emotional:"Bright", lovable:"Baby energy", energy:"Fast" }
},
    STRAYKIDS: {
    BangChan: { attractive:"Leader strength", comfort:"Protective", trust:"Reliable", miss:"Guidance", emotional:"Deep", lovable:"Warm leader", energy:"Powerful" },
    LeeKnow: { attractive:"Cool mystery", comfort:"Quiet", trust:"Unpredictable", miss:"Silence", emotional:"Hidden", lovable:"Funny shock", energy:"Controlled" },
    Changbin: { attractive:"Strong presence", comfort:"Tough love", trust:"Solid", miss:"Intensity", emotional:"Deep fire", lovable:"Cute savage", energy:"Aggressive" },
    Hyunjin: { attractive:"Artistic beauty", comfort:"Emotional", trust:"Deep", miss:"Presence", emotional:"Intense", lovable:"Drama cute", energy:"Flow" },
    Han: { attractive:"Funny chaos", comfort:"Playful", trust:"Loyal", miss:"Energy", emotional:"Mixed feelings", lovable:"Cute chaos", energy:"Fast" },
    Felix: { attractive:"Soft aura", comfort:"Gentle", trust:"Kind", miss:"Sunshine", emotional:"Pure", lovable:"Angel vibe", energy:"Bright" },
    Seungmin: { attractive:"Calm charm", comfort:"Stable", trust:"Honest", miss:"Balance", emotional:"Soft", lovable:"Sweet calm", energy:"Steady" },
    I.N: { attractive:"Cute innocence", comfort:"Shy warmth", trust:"Pure", miss:"Youth", emotional:"Soft", lovable:"Baby charm", energy:"Light" }
},
    
    ITZY: {
    Yeji: { attractive:"Leader aura", comfort:"Strong", trust:"Reliable", miss:"Focus", emotional:"Determined", lovable:"Cool cute", energy:"Sharp" },
    Lia: { attractive:"Soft elegance", comfort:"Calm", trust:"Gentle", miss:"Warmth", emotional:"Sensitive", lovable:"Sweet", energy:"Light" },
    Ryujin: { attractive:"Cool swag", comfort:"Neutral", trust:"Confident", miss:"Attitude", emotional:"Hidden soft", lovable:"Chill funny", energy:"Bold" },
    Chaeryeong: { attractive:"Graceful", comfort:"Soft", trust:"Kind", miss:"Dance", emotional:"Gentle", lovable:"Shy cute", energy:"Flow" },
    Yuna: { attractive:"Bright visual", comfort:"Cute", trust:"Friendly", miss:"Smile", emotional:"Happy", lovable:"Aegyo queen", energy:"High" }
},
    LESSERAFIM: {
    Sakura: { attractive:"Soft elegance", comfort:"Calm", trust:"Gentle", miss:"Quiet presence", emotional:"Subtle", lovable:"Cute calm", energy:"Light dreamy" },
    Chaewon: { attractive:"Leader charm", comfort:"Supportive", trust:"Reliable", miss:"Warmth", emotional:"Balanced", lovable:"Sweet strong", energy:"Clean power" },
    Yunjin: { attractive:"Bold aura", comfort:"Expressive", trust:"Honest", miss:"Voice", emotional:"Deep", lovable:"Passionate", energy:"Free fire" },
    Kazuha: { attractive:"Graceful beauty", comfort:"Peaceful", trust:"Stable", miss:"Silence", emotional:"Soft", lovable:"Elegant calm", energy:"Flow" },
    Eunchae: { attractive:"Bright innocence", comfort:"Playful", trust:"Pure", miss:"Youth", emotional:"Cheerful", lovable:"Baby charm", energy:"High sparkle" }
},

    BTS: {
        Jungkook: { attractive:"Perfection", comfort:"Actions", trust:"Loyalty", miss:"Attention", emotional:"Deep", lovable:"Sweet chaos", energy:"Quiet devotion" },
        V: { attractive:"Artistic", comfort:"Touch", trust:"Care", miss:"Presence", emotional:"Soft", lovable:"Quiet emotions", energy:"Playfulness" },
        Jimin: { attractive:"Charming", comfort:"Supportive", trust:"Caring", miss:"Warmth", emotional:"Emotional", lovable:"Cute", energy:"Sweet" },
        RM: { attractive:"Intelligent", comfort:"Mature", trust:"Wise", miss:"Conversation", emotional:"Deep", lovable:"Clumsy", energy:"Leader" },
        Jin: { attractive:"Funny", comfort:"Warm", trust:"Reliable", miss:"Presence", emotional:"Soft", lovable:"Dad jokes", energy:"Bright" },
        Suga: { attractive:"Cold calm", comfort:"Silent", trust:"Honest", miss:"Quiet", emotional:"Deep", lovable:"Savage soft", energy:"Chill" },
        JHope: { attractive:"Energetic", comfort:"Bright", trust:"Loyal", miss:"Joy", emotional:"Pure", lovable:"Funny", energy:"Sunshine" }
    },
    NEWJEANS: {
    Minji: { attractive:"Classic beauty", comfort:"Calm leader", trust:"Reliable", miss:"Presence", emotional:"Soft deep", lovable:"Natural charm", energy:"Balanced" },
    Hanni: { attractive:"Cute unique", comfort:"Warm", trust:"Friendly", miss:"Voice", emotional:"Expressive", lovable:"Adorable", energy:"Bright" },
    Danielle: { attractive:"Sunshine aura", comfort:"Happy", trust:"Pure", miss:"Smile", emotional:"Joyful", lovable:"Sweet energy", energy:"Radiant" },
    Haerin: { attractive:"Cat-like charm", comfort:"Quiet", trust:"Reserved", miss:"Silence", emotional:"Soft mysterious", lovable:"Calm cute", energy:"Low smooth" },
    Hyein: { attractive:"Youth beauty", comfort:"Playful", trust:"Pure", miss:"Energy", emotional:"Fresh", lovable:"Baby charm", energy:"High spark" }
},

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
};

window.onerror = function(msg, url, line) {
    console.log("ERROR:", msg, "LINE:", line);
};

/* SAFE INIT */
let db = null;

try {
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "the-third-eye-69578.firebaseapp.com",
        projectId: "the-third-eye-69578",
        storageBucket: "the-third-eye-69578.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();

} catch (e) {
    console.log("Firebase init failed:", e);
}

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

    if(!groups) return; // safety

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
        { q:"What energy do you like?", a:[{t:A.energy,v:"A"},{t:B.energy,v:"B"}] },
        { q:"Who is your most preferred choice?", a:[
            {t:selectedPair[0],v:"AD"},
            {t:selectedPair[1],v:"BD"}
        ]}
    ];
}

/* ================= LOAD ================= */
function loadQuestion(){

    if(!selectedPair || selectedPair.length !== 2) return;
    if(!getQuestions()[currentQuestion]) return; // FIX CRASH

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
        time: firebase?.firestore?.FieldValue?.serverTimestamp?.()
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
