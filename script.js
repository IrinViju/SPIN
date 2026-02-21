console.log("SCRIPT LOADED");
// ================= GLOBAL VARIABLES =================
let currentTopic = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let totalTime = 0;
let startTime;
let timerInterval;
let answered = false;
let gameStarted = false;

// ================= SCREEN ELEMENTS =================
const welcomeScreen = document.getElementById("welcome-screen");
const wheelScreen = document.getElementById("wheel-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const spinBtn = document.getElementById("spin-btn");
const playAgainBtn = document.getElementById("play-again-btn");

// ================= HIDE SCREENS =================
function hideAllScreens() {
    console.log("Hiding all screens");
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });
}

// ================= START GAME =================
// ================= START GAME =================
startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("START BUTTON TRIGGERED"); // for debugging

  const username = document.getElementById("username").value;

  if (username.trim() === "") {
    alert("Enter your name!");
    return;
  }

  gameStarted = true;

  hideAllScreens();
  wheelScreen.classList.remove("hidden");
});
// ================= TOPICS =================
const topics = [
  "Arrays",
  "Loops",
  "Strings",
  "Functions",
  "Variables",
  "Conditions"
];

// ================= QUESTIONS =================
const questions = {
  Arrays: [
    {
      question: "Which method adds an element to the end?",
      options: ["push()", "pop()", "shift()", "slice()"],
      answer: "push()"
    },
    {
      question: "Which removes last element?",
      options: ["push()", "pop()", "shift()", "splice()"],
      answer: "pop()"
    },
    {
      question: "Which removes first element?",
      options: ["shift()", "unshift()", "pop()", "slice()"],
      answer: "shift()"
    }
  ],
  Loops: [
    {
      question: "Which loop runs at least once?",
      options: ["for", "while", "do...while", "foreach"],
      answer: "do...while"
    },
    {
      question: "Which exits a loop?",
      options: ["stop", "break", "exit", "return"],
      answer: "break"
    },
    {
      question: "Best loop when iterations known?",
      options: ["for", "while", "if", "switch"],
      answer: "for"
    }
  ],
  Strings: [
    {
      question: "Which returns string length?",
      options: ["size()", "length", "count()", "len()"],
      answer: "length"
    },
    {
      question: "Which converts to uppercase?",
      options: ["toUpperCase()", "upper()", "capitalize()", "big()"],
      answer: "toUpperCase()"
    },
    {
      question: "Which joins strings?",
      options: ["concat()", "join()", "merge()", "append()"],
      answer: "concat()"
    }
  ],
  Functions: [
    {
      question: "Keyword to declare function?",
      options: ["def", "func", "function", "method"],
      answer: "function"
    },
    {
      question: "Return keyword is used to?",
      options: ["Stop function", "Repeat function", "Style function", "Import"],
      answer: "Stop function"
    },
    {
      question: "Functions help in?",
      options: ["Reuse code", "Delete code", "Looping only", "Styling"],
      answer: "Reuse code"
    }
  ],
  Variables: [
    {
      question: "Block scoped variable?",
      options: ["var", "let", "const", "int"],
      answer: "let"
    },
    {
      question: "Constant variable?",
      options: ["let", "var", "const", "define"],
      answer: "const"
    },
    {
      question: "Old JS variable keyword?",
      options: ["let", "var", "const", "static"],
      answer: "var"
    }
  ],
  Conditions: [
    {
      question: "Decision making keyword?",
      options: ["loop", "if", "switcher", "case"],
      answer: "if"
    },
    {
      question: "Else runs when?",
      options: ["Condition true", "Condition false", "Always", "Never"],
      answer: "Condition false"
    },
    {
      question: "Multiple conditions use?",
      options: ["if-else", "switch", "loop", "var"],
      answer: "switch"
    }
  ]
};

// ================= SPIN LOGIC =================
let currentRotation = 0;
const wheel = document.getElementById("wheel");

spinBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  const extraRotation = 720;
  const sectionDegree = 360 / topics.length;
  const stopDegree = (topics.length - randomIndex) * sectionDegree;

  currentRotation += extraRotation + stopDegree;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  currentTopic = topics[randomIndex];

  setTimeout(() => {
    hideAllScreens();
    quizScreen.classList.remove("hidden");
    document.getElementById("topic-heading").innerText = currentTopic;
    startQuiz();
  }, 4000);
});

// ================= START QUIZ =================
function startQuiz() {
  currentQuestions = questions[currentTopic]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  currentIndex = 0;
  score = 0;
  totalTime = 0;

  loadQuestion();
}

// ================= LOAD QUESTION =================
function loadQuestion() {
  answered = false;
  clearInterval(timerInterval);

  const questionObj = currentQuestions[currentIndex];
  document.getElementById("question-text").innerText =
    questionObj.question;

  const optionsContainer = document.querySelector(".options");
  optionsContainer.innerHTML = "";

  questionObj.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = option;
    btn.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(btn);
  });

  updateProgressBar();
  startTimer();
}

// ================= TIMER =================
function startTimer() {
  let timeLeft = 30;
  startTime = Date.now();

  const timeElement = document.getElementById("time-left");
  timeElement.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeElement.innerText = timeLeft;

    if (timeLeft <= 0 && !answered) {
      answered = true;
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

// ================= CHECK ANSWER =================
function checkAnswer(selectedOption) {
  if (answered) return;

  answered = true;
  clearInterval(timerInterval);

  const correctAnswer = currentQuestions[currentIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === correctAnswer)
      btn.classList.add("correct");

    if (
      btn.innerText === selectedOption &&
      selectedOption !== correctAnswer
    )
      btn.classList.add("wrong");
  });

  totalTime += (Date.now() - startTime) / 1000;

  if (selectedOption === correctAnswer) score++;

  setTimeout(() => {
    nextQuestion();
  }, 1200);
}

// ================= NEXT QUESTION =================
function nextQuestion() {
  currentIndex++;

  if (currentIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// ================= PROGRESS =================
function updateProgressBar() {
  const progress = document.getElementById("progress-bar");
  progress.style.width =
    (currentIndex / currentQuestions.length) * 100 + "%";
}

// ================= SHOW RESULTS =================
function showResults() {
  console.log("SHOWING RESULTS");
  clearInterval(timerInterval);
  answered = true;

  hideAllScreens();
  resultScreen.classList.remove("hidden");

  const accuracy = (score / currentQuestions.length) * 100;
  const avgTime = totalTime / currentQuestions.length;

  document.getElementById("accuracy").innerText =
    accuracy.toFixed(2) + "%";

  document.getElementById("avg-time").innerText =
    avgTime.toFixed(2) + "s";

  let rating = "Beginner 🌱";
  if (accuracy >= 80 && avgTime < 10) rating = "Code Ninja ⚡";
  else if (accuracy >= 60) rating = "Fast Learner 🚀";

  document.getElementById("speed-rating").innerText = rating;

  fetch("http://localhost:5000/save-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("username").value,
      accuracy,
      avgTime
    })
  })
  .then(() => fetch("http://localhost:5000/leaderboard"))
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("leaderboard");
    list.innerHTML = "";
    data.forEach(player => {
      const li = document.createElement("li");
      li.innerText =
        `${player.name} - ${player.accuracy.toFixed(1)}%`;
      list.appendChild(li);
    });
  })
  .catch(err => console.log("Backend error:", err));
}

// ================= PLAY AGAIN =================
playAgainBtn.addEventListener("click", () => {
  hideAllScreens();
  wheelScreen.classList.remove("hidden");
});
