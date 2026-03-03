// ====== STORAGE SETUP ======

// Get saved progress from sessionStorage
let userAnswers = [];
try {
  const savedProgress = sessionStorage.getItem("progress");
  userAnswers = savedProgress ? JSON.parse(savedProgress) : [];
} catch (e) {
  userAnswers = [];
}

// Get questions container
const questionsElement = document.getElementById("questions");

// ====== RENDER QUESTIONS ======
// (Provided Code Uses userAnswers & questionsElement)

// Do not change below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

// ====== SAVE PROGRESS (SESSION STORAGE) ======

questionsElement.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const questionIndex = parseInt(e.target.name.split("-")[1]);
    userAnswers[questionIndex] = e.target.value;

    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// ====== SUBMIT QUIZ ======

const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Restore saved score on load
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});