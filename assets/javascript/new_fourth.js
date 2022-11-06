import { allowReturnHome, kickIntruder } from "./app.js";

kickIntruder();
allowReturnHome();

const finishedQuizz = JSON.parse(localStorage.getItem("finishedQuizz"));

const showQuizzButton = document.querySelector(".restart");
showQuizzButton.addEventListener("click", () => {
  localStorage.setItem("selectedQuizz", finishedQuizz.id);
  window.location.replace("./show.html");
});

fillQuizzFrame();

function fillQuizzFrame() {
	const quizzFrame = document.querySelector(".finished-quizz");
	quizzFrame.firstElementChild.src = finishedQuizz.image;
	quizzFrame.lastElementChild.innerText = finishedQuizz.title;
}
