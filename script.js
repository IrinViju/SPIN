// ================= GLOBAL VARIABLES =================
let currentTopic = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let totalTime = 0;
let startTime;
let timerInterval;

// ================= SCREEN ELEMENTS =================
const welcomeScreen = document.getElementById("welcome-screen");
const wheelScreen = document.getElementById("wheel-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// ================= BUTTONS =================
const startBtn = document.getElementById("start-btn");
const spinBtn = document.getElementById("spin-btn");
const playAgainBtn = document.getElementById("play-again-btn");

// ================= HIDE ALL SCREENS =================
function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });
}

// ================= START GAME =================
startBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Enter your name!");
    return;
  }

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

// ================= SAMPLE QUESTIONS =================
const questions = {
  Arrays: [
    {
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "slice()"],
      answer: "push()"
    }
  ],
  Loops: [
    {
      question: "Which loop runs at least once?",
      options: ["for", "while", "do...while", "foreach"],
      answer: "do...while"
    }
  ],
  Strings: [
    {
      question: "Which method returns string length?",
      options: ["size()", "length", "count()", "len()"],
      answer: "length"
    }
  ],
  Functions: [
    {
      question: "Keyword to declare a function in JS?",
      options: ["def", "func", "function", "method"],
      answer: "function"
    }
  ],
  Variables: [
    {
      question: "Which keyword declares block-scoped variable?",
      options: ["var", "let", "const", "int"],
      answer: "let"
    }
  ],
  Conditions: [
    {
      question: "Which keyword is used for decision making?",
      options: ["loop", "if", "switcher", "case"],
      answer: "if"
    }
  ]
};

// ================= SPIN LOGIC =================
// ================= REAL SPIN LOGIC =================
let currentRotation = 0;
const wheel = document.getElementById("wheel");

spinBtn.addEventListener("click", () => {

  const randomIndex = Math.floor(Math.random() * topics.length);
  const extraRotation = 720; // 2 full spins
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
  }, 4000); // match CSS animation time
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

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

// ================= CHECK ANSWER =================
function checkAnswer(selectedOption) {
  clearInterval(timerInterval);

  let endTime = Date.now();
  let timeTaken = (endTime - startTime) / 1000;
  totalTime += timeTaken;

  if (selectedOption === currentQuestions[currentIndex].answer) {
    score++;
  }

  nextQuestion();
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

// ================= PROGRESS BAR =================
function updateProgressBar() {
  const progress = document.getElementById("progress-bar");
  const percentage =
    ((currentIndex) / currentQuestions.length) * 100;

  progress.style.width = percentage + "%";
}

// ================= SHOW RESULTS =================
function showResults() {
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

  // Save score FIRST
  fetch("http://localhost:5000/save-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("username").value,
      accuracy: accuracy,
      avgTime: avgTime
    })
  })
  .then(() => {
    // THEN fetch leaderboard
    return fetch("http://localhost:5000/leaderboard");
  })
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
  .catch(err => console.error("Leaderboard error:", err));
}


// ================= PLAY AGAIN =================
playAgainBtn.addEventListener("click", () => {
  hideAllScreens();
  welcomeScreen.classList.remove("hidden");
});

