const quizData = [
  {
    question: "What is JavaScript used for?",
    options: [
      "Styling Webpages",
      "Formatting Webpages",
      "Programming Webpages",
      "Designing Webpages"
    ],
    answer: "Programming Webpages"
  },

  {
    question: "Which tag is used for defining functions in html?",
    options: [
      "<java>",
      "<>",
      "<js>",
      "<script>"
    ],
    answer: "<script>"
  },

  {
    question: "Which variable declaration is incorrect?",
    options: [
	"let z = 12;", 
	"let k: 13;", 
	"const l = 4;", 
	"let q = i - 1;"
	],
    answer: "let k: 13;",
    explanation: 'Colons are not used for declaring variables.'
  },

  {
    question: "True or False? Variables declared by const can not be changed.",
    options: [
      "True",
      "False",
    ],
    answer: "True"
  },

  {
    question: "Consider the following code and compute the value for x: let x = 12; x = 1; x = x * 7;",
    options: [
      "x = 7",
      "x = 12",
      "Error",
      "x = 1"
    ],
    answer: "x = 7"
  },

  {
    question: "What isn't declared in a function header?",
    options: [
      "Return statement",
      "Function name",
      "Parameters"
    ],
    answer: "Return statement"
  },

  {
    question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id=\"demo\">This is a demonstration.</p>",
    options: [
      "document.getElementById(\"demo\").innerHTML = 'Hello, World!';",
      "document.getElementByName('demo').innerHTML = 'Hellow, World!';",
      "#demo.innerHTML = \"Hello, World!\";",
      "document.getElement(\"p\").innerHTML = \"Hello, World!\";"
    ],
    answer: "document.getElementById(\"demo\").innerHTML = 'Hello, World!';"
  },

  {
    question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
    options: [
      "<script name=\"xxx.js\">",
      "<script src=\"xxx.js\">",
      "<script href=\"xxx.js\">",
      "<script file=\"xxx.js\">"
    ],
    answer: "<script src=\"xxx.js\">"
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: [
      "onchange",
      "onload",
      "onclick",
      "onmouseover"
    ],
    answer: "onclick"
  },

  {
    question: "Is JavaScript case-sensitive?",
    options: [
      "Yes",
      "No"
    ],
    answer: "Yes"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer = null;
let selectedAnswer = null;

const timeEl = document.getElementById("time");
const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const finalMessageEl = document.getElementById("final-message");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const feedbackBox = document.getElementById("feedback-box");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackCorrectAnswer = document.getElementById("feedback-correct-answer");
const feedbackExplanationLabel = document.getElementById("feedback-explanation-label");
const feedbackText = document.getElementById("feedback-text");

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockQuestion();
      nextBtn.style.display = "inline-block";
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  selectedAnswer = null;
  nextBtn.style.display = "none";

  feedbackBox.style.display = "none";
  feedbackTitle.textContent = "";
  feedbackCorrectAnswer.textContent = "";
  feedbackText.textContent = "";
  feedbackExplanationLabel.style.display = "none";
  feedbackBox.classList.remove("feedback-wrong");

  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  const q = quizData[currentQuestion];
  questionNumberEl.textContent = currentQuestion + 1;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(btn, option));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function handleAnswer(button, option) {
  if (selectedAnswer !== null) return;

  selectedAnswer = option;
  clearInterval(timer);

  const current = quizData[currentQuestion];
  const correctAnswer = current.answer;
  const explanation = current.explanation;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }

    if (btn.textContent === option && option !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (option === correctAnswer) {
    score++;
  } else if (explanation) {
    feedbackTitle.textContent = "Incorrect Answer!";
    feedbackCorrectAnswer.textContent = `Correct answer: ${correctAnswer}`;
    feedbackText.textContent = explanation;
    feedbackExplanationLabel.style.display = "block";
    feedbackBox.style.display = "block";
    feedbackBox.classList.add("feedback-wrong");
  }

  nextBtn.style.display = "inline-block";
}

function lockQuestion() {
/* This function locks the question and reveals the correct answer when timer runs out.*/

  const current = quizData[currentQuestion];
  const correctAnswer = current.answer;
  const explanation = current.explanation;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (explanation) {
    feedbackTitle.textContent = "Time's up!";
    feedbackCorrectAnswer.textContent = `Correct answer: ${correctAnswer}`;
    feedbackText.textContent = explanation;
    feedbackExplanationLabel.style.display = "block";
    feedbackBox.style.display = "block";
    feedbackBox.classList.add("feedback-wrong");
  }

  nextBtn.style.display = "inline-block";
}

function endQuiz() {
  clearInterval(timer);
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";
  restartBtn.style.display = "inline-block";
  scoreEl.textContent = `${score} / ${quizData.length}`;

  if (score === quizData.length) {
    finalMessageEl.textContent = "Excellent work!";
  } else if (score >= 3) {
    finalMessageEl.textContent = "Nice job — you understand the basics well.";
  } else {
    finalMessageEl.textContent = "Good start — review the HTML page and try again.";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;

  questionEl.style.display = "block";
  optionsEl.style.display = "flex";
  resultEl.style.display = "none";
  restartBtn.style.display = "none";

  loadQuestion();
});

loadQuestion();
