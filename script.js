const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const start = document.getElementById("start");
const restart = document.getElementById("restart");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const output = document.getElementById("output");

let index = 0;

let score = {
    pink: 0,
    red: 0,
    memory: 0,
    dream: 0,
    self: 0
};

const questions = [
    {
        q: "What feels most comforting?",
        o: ["Pink", "Red", "Dreams", "Memory"]
    },
    {
        q: "What affects you most?",
        o: ["Past", "People", "Myself", "Future"]
    },
    {
        q: "What feels more real?",
        o: ["Dreams", "Reality", "Memories", "Nothing"]
    }
];

function show(screen){
    screens.forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

start.onclick = () => {
    show(quiz);
    load();
};

function load(){

    optionsEl.innerHTML = "";

    let q = questions[index];

    questionEl.innerText = q.q;

    q.o.forEach(opt => {

        let div = document.createElement("div");
        div.classList.add("option");
        div.innerText = opt;

        div.onclick = () => {

            if(opt === "Pink") score.pink++;
            if(opt === "Red") score.red++;
            if(opt === "Dreams") score.dream++;
            if(opt === "Memory") score.memory++;
            if(opt === "Myself") score.self++;

            index++;

            if(index < questions.length){
                load();
            } else {
                analyze();
            }

        };

        optionsEl.appendChild(div);

    });

}

function analyze(){

    show(loading);

    setTimeout(() => {
        final();
    }, 3000);

}

function final(){

    show(result);

    let highest = "pink";
    let max = score.pink;

    for(let k in score){
        if(score[k] > max){
            max = score[k];
            highest = k;
        }
    }

    let text = "";

    if(highest === "pink"){
        text = "You think you moved on. But the original still defines you.";
    }
    else if(highest === "red"){
        text = "You chose change. But your emotions still remember before.";
    }
    else if(highest === "dream"){
        text = "You trust dreams more than reality.";
    }
    else if(highest === "memory"){
        text = "You live more in memory than present.";
    }
    else{
        text = "You are still searching for yourself.";
    }

    output.innerText = text;

}

restart.onclick = () => {
    index = 0;
    score = {pink:0, red:0, memory:0, dream:0, self:0};
    show(intro);
};
