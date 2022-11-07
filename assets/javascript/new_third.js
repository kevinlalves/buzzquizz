import { addDrawerListeners, allowReturnHome, appendExtraContainers, drivenAPI, kickIntruder } from "./app.js";

kickIntruder();
const numLevels = Number(localStorage.getItem("numLevels"));
const numMinLevels = 2;
const levelsForm = document.forms.form;
allowReturnHome();
appendExtraContainers(numMinLevels, Number(numLevels), levelTemplate);
addDrawerListeners();

levelsForm.addEventListener("submit", e => {
	e.preventDefault();
	sendQuizz(e.currentTarget);
});

function levelTemplate(levelNumber) {
  return `
    <div class="input-div-title">
       <p>Nivel ${levelNumber}</p>
       <img src="./assets/images/vector.png" alt="edit image">
    </div>
		<div class="input-div hidden">
			<input type="text" name="title${levelNumber}" required minlength="10" placeholder="Título do nível">
			<input type="number" name="percentage${levelNumber}" required min="0" max="100" placeholder="% de acerto mínima">
			<input type="url" name="url${levelNumber}" required placeholder="URL da imagem do nível">
			<input type="text" name="description${levelNumber}" required minlength="30" placeholder="Descrição do nível">
		</div>
  `;
}

function sendQuizz(form) {
	fetch(drivenAPI, {
		method: "post",
		headers: {
			"content-type": "application/json"
		},
		body: getRequestBody(form)
	}).then(response => response.json())
		.then(body => {
			const myQuizzes = JSON.parse(localStorage.getItem("myQuizzes"));
			myQuizzes[body.id] = true;
			localStorage.setItem("myQuizzes", JSON.stringify(myQuizzes));
			localStorage.setItem("finishedQuizz", JSON.stringify(body));
			form.submit();
		})
		.catch(() => {
			console.log("Problem with sendQuizz");
		});
}

function getRequestBody(form) {
	const body = JSON.parse(localStorage.getItem("body"));
	const levels = [];
	for (let i = 1; i <= numLevels; i++) {
		levels.push(createLevelJSON(form, i));
	}
	body["levels"] = levels;
	return JSON.stringify(body);
}


function createLevelJSON(form, levelNum) {
	const level = {
		"title": form[`title${levelNum}`].value,
		"image": form[`url${levelNum}`].value,
		"text": form[`description${levelNum}`].value,
		"minValue": form[`percentage${levelNum}`].value
	};
	return level;
}
