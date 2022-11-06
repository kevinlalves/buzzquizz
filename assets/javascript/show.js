import { altMsg, drivenAPI } from "./app.js";

if (!localStorage.getItem("selectedQuizz")) {
  alert("You shouldn't be here!");
  window.location.replace("./index.html");
}

const quizzID = localStorage.getItem("selectedQuizz");
let correctAnswer = [];
let numRightAnswers = 0;
let numAnsweredQuestions = 0;
let numQuestions;
let levels;

getQuizz();

function getQuizz() {
  fetch(drivenAPI+quizzID).then(response => response.json())
    .then(body => {
      renderInfo(body);
    }).catch(() => {
      console.log("Problem with getQuizz");
    });
}


function renderInfo(quizz) {
  const quizzTitle = document.querySelector(".quizz-title");
  quizzTitle.style.backgroundImage = `url(${quizz.image})`;
  quizzTitle.innerHTML += `
    <p>${quizz.title}</p>
  `;
  numQuestions = quizz.questions.length;
  levels = quizz.levels;
  for (const question of quizz.questions) {
    listQuestion(question);
  }
}

function listQuestion(question) {
  const newQuestion = document.createElement("div");
  newQuestion.classList.add("question");
  question.color = question.color.toUpperCase() === "#FFFFFF" ? "#000000" : question.color;
  newQuestion.innerHTML = `
    <div style="background-color: ${question.color};" class="question-header">
      <p>${question.title}</p>
    </div>
  `;
  appendAnswers(question, newQuestion);
  document.body.appendChild(newQuestion);
}

function appendAnswers(question, container) {
  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answers");
  for (const answer of question.answers) {
    appendAnswer(answer, answersContainer);
  }
  container.appendChild(answersContainer);
}

function appendAnswer(answer, container) {
  const newAnswer = document.createElement("div");
  newAnswer.classList.add("answer");
  newAnswer.id = correctAnswer.length;
  correctAnswer.push(answer.isCorrectAnswer);
  newAnswer.innerHTML = `
    <img src="${answer.image}" alt="${altMsg}">
    <p>${answer.text}</p>
  `;
  newAnswer.addEventListener("click", chooseAnswer);
  container.appendChild(newAnswer);
}

function chooseAnswer(e) {
  numAnsweredQuestions++;
  if (correctAnswer[e.currentTarget.id]) {
    numRightAnswers++;
  }
  const answers = e.currentTarget.parentElement;
  if (numAnsweredQuestions === numQuestions) {
    createResult();
  }
  revealAnswers(answers.children);
  e.currentTarget.classList.remove("not-selected");
}

function revealAnswers(answers) {
  for (const answer of answers) {
    if (correctAnswer[answer.id]) {
      answer.classList.add("correct");
    } else {
      answer.classList.add("incorrect");
    }
    answer.classList.add("not-selected");
    answer.removeEventListener("click", chooseAnswer);
  }
}

function createResult() {
  const score = (numRightAnswers*100)/numQuestions;
  const level = getLevel(score);
  if (!level) {
    alert("Perdão, o gênio que fez esse quizz esqueceu que o nível zero é obrigatório!");
    window.location.replace("./index.html");
  }
  const result = document.createElement("div");
  result.classList.add("question");
  result.innerHTML = `
    <div style="background-color: var(--main-color);" class="question-header">
      <p>${Math.round(score)}% de acerto: ${level.title}</p>
    </div>
    <div class="result">
      <img src="${level.image}" alt="${altMsg}" />
      <p>${level.text}</p>
    </div>
    <button id="restart">
      <p>Reiniciar Quizz</p>
    </button>
    <button id="return">
      <p>Voltar pra home</p>
    </button>
  `;
  document.body.appendChild(result);
  addButtonListeners();
}

function getLevel(score) {
  let currentValue = -1;
  let currentLevel = null;
  console.log(numRightAnswers);
  for (const level of levels) {
    if (score >= Number(level.minValue) && currentValue < level.minValue) {
      currentLevel = level;
      currentValue = Number(level.minValue);
    }
  }
  return currentLevel;
}

function addButtonListeners() {
  const buttonReturn = document.getElementById("return");
  const buttonRestart = document.getElementById("restart");
  buttonRestart.addEventListener("click", () => {
    window.location.reload();
  });
  buttonReturn.addEventListener("click", () => {
    window.location.replace("./index.html");
  });
}
