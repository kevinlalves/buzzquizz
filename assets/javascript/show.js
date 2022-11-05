import { altMsg, drivenAPI } from "./app.js";

if (!localStorage.getItem("selectedQuizz")) {
  alert("You shouldn't be here!");
  window.location.replace("./index.html");
}

const quizzID = localStorage.getItem("selectedQuizz");
let correctAnswer = [];


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
  quizzTitle.innerHTML = `
    <p>${quizz.title}</p>
  `;
  for (const question of quizz.questions) {
    listQuestion(question);
  }
}

function listQuestion(question) {
  const newQuestion = document.createElement("div");
  newQuestion.classList.add("question");
  newQuestion.innerHTML = `
    <div style="background-color: ${question.color}" class="question-header">
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
  const answers = e.currentTarget.parentElement;
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
