export const drivenAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";

export const altMsg = "quizz photo";

export function allowReturnHome() {
  const buttonHome = document.querySelector(".return");
  buttonHome.addEventListener("click", e => {
    e.preventDefault();
    window.location.replace("./index.html");
  });
}

export function appendExtraContainers(minNumContainers, numContainers, containerTemplate) {
	let lastQuestion = document.getElementById("last-container");
	let newQuestion;
	for (let i = minNumContainers + 1; i <= numContainers; i++) {
		newQuestion = createQuestionDiv(i, containerTemplate);
		lastQuestion.insertAdjacentElement("afterend", newQuestion);
		lastQuestion = newQuestion;
	}
}

function createQuestionDiv(containerNumber, containerTemplate) {
	const newQuestion = document.createElement("div");
	newQuestion.classList.add("entire-question");
	newQuestion.innerHTML = containerTemplate(containerNumber);
	return newQuestion;
}

export function kickIntruder() {
	if (!localStorage.getItem("body") ||
			!localStorage.getItem("numQuestions") ||
			!localStorage.getItem("numLevels")) {
		window.location.replace("./index.html");
	}
}

function openDrawer(drawer, drawerOpen) {
	if (drawerOpen.img === drawer) {
		return ;
	}
	drawerOpen.img.classList.remove("hidden");
	drawerOpen.img.parentElement.nextElementSibling.classList.add("hidden");
	drawer.classList.add("hidden");
	drawer.parentElement.nextElementSibling.classList.remove("hidden");
	drawerOpen.img = drawer;
}

export function addDrawerListeners() {
	const imgs = document.forms.form.querySelectorAll("img");
	const  drawerOpen = {};
	drawerOpen.img  = document.getElementById("1");
	for (const img of imgs) {
		img.addEventListener("click", e => {
			openDrawer(e.currentTarget, drawerOpen);
		});
	}
}
