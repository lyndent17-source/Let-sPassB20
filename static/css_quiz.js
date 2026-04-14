const quizData = [
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What is the correct HTML for referring to an external style sheet??",
    options: [
      "<stylesheet>mystyle.css</stylesheet>  ",
      "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
      "<style src=\"mystyle.css\">"
    ],
    answer: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
  },
  {
    question: "Which CSS property changes the text color?",
    options: [
      "font-color",
      "text-color",
      "color",
      "background-color"
    ],
    answer: "color"
  },
  {
    question: "In the CSS box model, which property controls the space outside the border?",
    options: [
      "padding",
      "spacing",
      "margin",
      "outline"
    ],
    answer: "margin",
    explanation: "Margin is the space outside the border, while padding is the space inside the border between the content and the border."
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: [
      "/* This is a comment */",
      "// This is a comment //",
      "<!-- This is a comment -->",
      "! This is a comment !"
    ],
    answer: "/* This is a comment */"
  },
  {
    question: "How do you display hyperlinks without an underline?",
    options: [
      "a { text-decoration: none; }",
      "a { underline: none; }",
      "a { text-style: no-underline; }",
      "a { text-decoration: hidden; }"
    ],
    answer: "a { text-decoration: none; }"
  },
  {
    question: "When using the padding property; are you allowed to use negative values?",
    options: [
      "Yes",
      "No",
      "Only in certain browsers",
      "It depends on the context"
    ],
    answer: "No"
  },
  {
    question: "How do you select an element with the id 'myId' in CSS?",
    options: [
      "myId { }",
      "#myId { }",
      ".myId { }",
      "element#myId { }"
    ],
    answer: "#myId { }"
  },
  {
    question: "How do you group selectors in CSS?",
    options: [
      "Separate each selector with a plus sign (+)",
      "Separate each selector with a comma (,)",
      "Separate each selector with a space ( )",
    ],
    answer: "Separate each selector with a comma (,)"
  },
  {
    question: "What is the default value of the position property?",
    options: [
      "static",
      "relative",
      "absolute",
      "fixed"
    ],
    answer: "static"
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
  questionEl.style.display = "block";
  optionsEl.style.display = "flex";
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(option));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function handleAnswer(option) {
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
  feedbackBox.style.display = "none";
  resultEl.style.display = "block";
  restartBtn.style.display = "inline-block";
  scoreEl.textContent = `${score} / ${quizData.length}`;

  if (score === quizData.length) {
    finalMessageEl.textContent = "Excellent work!";
  } else if (score >= 3) {
    finalMessageEl.textContent = "Nice job — your CSS foundation is getting strong.";
  } else {
    finalMessageEl.textContent = "Good start — review the CSS page and try again.";
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