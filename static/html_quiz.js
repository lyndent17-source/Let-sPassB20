const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What might happen if a DOCTYPE declaration is omitted from an HTML document?",
    options: ["The document will render with errors.", "The document will automatically be treated as HTML5.", "The document will trigger Quirks Mode in the browser.", "The document will not display any content cookies."],
    answer: "The document will trigger Quirks Mode in the browser.",
    explanation: 'If the DOCTYPE declaration is omitted, the browser defaults to Quirks Mode, which can cause inconsistent rendering, mimicking older browsers\' behaviors.'
  },
  {
    question: "What is the purpose of using div tags in HTML?",
    options: ["To create a division or section in the page", "To display an image", "To create a hyperlink", "To specify the title of the page"],
    answer: "To create a division or section in the page"
  },
  {
    question: "Which of the following is the correct way to add background color in HTML?",
    options: ["<body color=\"red\">", "<background color=\"red\">", "<body style=\"background-color=red\">", "<body style=\"background-color:red;\">"],
    answer: "<body style='background-color: red;'>"
  },
  {
    question: "How do you merge two or more columns in a table cell?",
    options: ["merge", "rowspan", "colspan", "span"],
    answer: "colspan",
    explanation: 'colspan is used to merge two or more columns in a table cell, while rowspan is used to merge rows.'
  },
  {
    question: "Where is HTML document is the conventionally correct place to put reference to an external style sheet?",
    options: ["In the HEAD section", "In the BODY section", "Both of the above", "None of the above"],
    answer: "In the HEAD section"
  },
  {
    question: "Which is the correct syntax to set the unordered-list item marker to a square?",
    options: ["<ul style=\"list-style-type: square;\">", "<ul style=\"square\">", "<ul list-style=\"square;\">", "<ul style=square>"],
    answer: "<ul style=\"list-style-type: square;\">"
  },
  {
    question: "If \"padding: 10px 5px 20px 0px\" is given. What does this represent?",
    options: ["Top: 10px, Right: 5px, Bottom: 20px, Left: 0px", "Top: 10px, Right: 20px, Bottom: 5px, Left: 0px", "Top: 0px, Right: 5px, Bottom: 20px, Left: 10px", "Top: 10px, Right: 5px, Bottom: 0px, Left: 20px"],
    answer: "Top: 10px, Right: 5px, Bottom: 20px, Left: 0px"
  },
  {
    question: "Select the correct among the following for linking an external style sheet.",
    options: ["<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">", "<style rel=“stylesheet” type=“text/css” href=“style.css”>", "<link>stylesheet", "<link href=“style.css”>stylesheet"],
    answer: "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">"  
  },
  {
    question: "Which is an example of an absolute path?",
    options: ["./index.html", "/images/pic.jpg", "https://example.com/image.png", "../file.txt"],
    answer: "https://example.com/image.png",
    explanation: 'An absolute path includes the full URL and domain name.'
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

  timer = setInterval(() => { /* setInterval runs the given function repeatedly
here, it runs every 1000 milliseconds, which is 1 second*/
    timeLeft--;
    timeEl.textContent = timeLeft; /* after decreasing the number, this updates the display again so the page shows the remaining time*/

    if (timeLeft <= 0) {
      clearInterval(timer); /* once time is up, stop the repeating interval*/
      lockQuestion();
      nextBtn.style.display = "inline-block"; /*shows the next question btn*/
    }
  }, 1000);
}

function loadQuestion() {
  /*The loadQuestion function refreshes the interface for the current question. 
  It removes old state from the previous question, checks whether the quiz is over, 
  displays the next question and its answer options, and then starts the countdown timer.*/
  clearInterval(timer);
  selectedAnswer = null;
  nextBtn.style.display = "none";

  /*Reset old feedback*/
  feedbackBox.style.display = "none";
  feedbackTitle.textContent = "";
  feedbackCorrectAnswer.textContent = "";
  feedbackText.textContent = "";
  feedbackExplanationLabel.style.display = "none";
  feedbackBox.classList.remove("feedback-wrong");

  /*Check whether the quiz is finished*/
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  /*Load the current question data*/
  const q = quizData[currentQuestion];
  questionNumberEl.textContent = currentQuestion + 1;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  /*Create option buttons*/
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(btn, option));
    optionsEl.appendChild(btn); /*This adds the newly created button into the options container on the page.
Without this line, the button would exist in memory but would not appear on screen.*/
  });

  startTimer();
}

function handleAnswer(button, option) {
  /*The handleAnswer function processes the user’s selected answer, stops further interaction with the question, 
  updates the visual feedback, and prepares the quiz to move to the next question*/
  if (selectedAnswer !== null) return;

  selectedAnswer = option;
  clearInterval(timer); /*stops the countdown timer as soon as the user answers*/

  const current = quizData[currentQuestion];
  const correctAnswer = current.answer;
  const explanation = current.explanation;
  const buttons = document.querySelectorAll(".option-btn"); /*selects all option buttons so we can disable them appropriately*/

  /*loops through all option buttons*/
  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct"); /*if correct answer, the button gets the CSS class correct which styles the correct answer in green*/
    }

    if (btn.textContent === option && option !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (option === correctAnswer) {
    score++;
  } else if (explanation) { /*if the answer is wrong, this checks whether the question has an explanation*/
    feedbackTitle.textContent = "Incorrect Answer!";
    feedbackCorrectAnswer.textContent = `Correct answer: ${correctAnswer}`;
    feedbackText.textContent = explanation;
    feedbackExplanationLabel.style.display = "block"; /*shows the explanation label*/
    feedbackBox.style.display = "block"; /*makes the feedback box visible*/
    feedbackBox.classList.add("feedback-wrong"); /*add styling for wrong answer feedback*/
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
    btn.disabled = true; /*this disables every answer button. if time is up the user should not still be allowed to answer*/
    if (btn.textContent === correctAnswer) {
      /*checks if current button's text content matches the correct answer*/
      btn.classList.add("correct");
    }
  });

  if (explanation) { /*checks whether the current question has explanation text*/
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
  /*runs when there are no more questions left. it stops the quiz interface and switch the page into result page*/
  clearInterval(timer);

  /*hides all quiz interfaces */
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  /*shows all result interfaces*/
  resultEl.style.display = "block";
  restartBtn.style.display = "inline-block";
  scoreEl.textContent = `${score} / ${quizData.length}`;

  /*choose a final message based on the user's score*/
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