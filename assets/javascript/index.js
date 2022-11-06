import { drivenAPI, altMsg } from "./app.js";

localStorage.removeItem("body");
localStorage.removeItem("numQuestions");
localStorage.removeItem("numLevels");
localStorage.removeItem("finishedQuizz");
if (!localStorage.getItem("myQuizzes")) {
	localStorage.setItem("myQuizzes", "{}");
}

const buttonCreateQuizz = document.getElementById("create-quizz");
const circleCreateQuizz = document.getElementById("create-quizz-circle");
const myQuizzesContainer = document.getElementById("my-quizzes");
const otherQuizzesContainer = document.getElementById("other-quizzes");
const myQuizzes = JSON.parse(localStorage.getItem("myQuizzes"));

buttonCreateQuizz.addEventListener("click", () => {
  window.location.replace("./new_first.html");
});

getQuizzes();

function getQuizzes() {
	fetch(drivenAPI).then(response => response.json())
		.then(listQuizzes).catch(() => {
			console.log("Problem with get Quizzes");
		});
}

function listQuizzes(quizzes) {
	let quizzContainer;
	let newQuizz;
	myQuizzesContainer.innerHTML = "";
	otherQuizzesContainer.innerHTML = "";
	for (const quizz of quizzes) {
    newQuizz = createQuizzDiv(quizz);
		quizzContainer = myQuizzes[quizz.id] ? myQuizzesContainer : otherQuizzesContainer;
		quizzContainer.appendChild(newQuizz);
	}
	if (myQuizzesContainer.childElementCount > 0) {
		showMyQuizzes();
		circleCreateQuizz.addEventListener("click", () => {
			window.location.replace("./new_first.html");
		});
	}
}

function createQuizzDiv(quizz) {
	const newQuizz = document.createElement("div");
	newQuizz.classList.add("quizz");
	newQuizz.id = quizz.id;
	newQuizz.innerHTML = `
		<img src=${quizz.image} alt=${altMsg} />
		<p>${quizz.title}</p>
	`;
	newQuizz.addEventListener("click", e => {
		localStorage.setItem("selectedQuizz", e.currentTarget.id);
		window.location.replace("./show.html");
	});
	return newQuizz;
}


function showMyQuizzes() {
	const emptyList = document.querySelector(".empty-list");
	const myListTitle = document.querySelector(".list-header");
	myQuizzesContainer.classList.remove("hidden");
	myListTitle.classList.remove("hidden");
	emptyList.classList.add("hidden");
}
