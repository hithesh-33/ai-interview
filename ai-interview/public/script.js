let questions = [];
let current = 0;
let answers = [];
let timer;
let timeLeft = 30;

async function startInterview() {
  const res = await fetch("http://localhost:3000/questions");
  questions = await res.json();

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("interviewScreen").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  document.getElementById("question").innerText = questions[current];
  document.getElementById("answer").value = "";
  startTimer();
}

function startTimer() {
  timeLeft = 30;
  document.getElementById("timer").innerText = "Time: " + timeLeft;
  document.getElementById("timer").style.color = "white";

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    if (timeLeft <= 10) {
      document.getElementById("timer").style.color = "red";
    }

    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);

  const ans = document.getElementById("answer").value;
  answers.push(ans);

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    finishInterview();
  }
}

async function finishInterview() {
  document.getElementById("interviewScreen").classList.add("hidden");

  const res = await fetch("http://localhost:3000/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers })
  });

  const data = await res.json();

  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("score").innerText = data.score;
}