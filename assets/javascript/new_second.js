import { allowReturnHome, getFormData } from "./app.js";

const formsData = getFormData();
const minNumQuestions = 3;
allowReturnHome();
appendExtraQuestions(Number(formsData.numQuestions));

function appendExtraQuestions(numQuestions) {
	let lastQuestion = document.getElementById("last-question");
	let newQuestion;
	for (let i = minNumQuestions + 1; i <= numQuestions; i++) {
		newQuestion = createQuestionDiv(i);
		lastQuestion.insertAdjacentElement("afterend", newQuestion);
		lastQuestion = newQuestion;
	}
}

function createQuestionDiv(questionNumber) {
	const newQuestion = document.createElement("div");
	newQuestion.classList.add("entire-question");
	newQuestion.innerHTML = `
		<div class="entire-question">
			<p>Pergunta ${questionNumber}</p>
			<div class="input-div">
				<input type="text" name="question${questionNumber}" required minlength="20" placeholder="Texto da pergunta">
				<p>Resposta correta</p>
				<input type="text" name="rightAnswer${questionNumber}" required minlength="1" placeholder="Resposta correta">
				<input type="url" name="rightAnswerUrl${questionNumber}" required placeholder="URL da imagem">
				<p>Resposta incorretas</p>
				<input type="text" name="wrongAnswer${questionNumber}1" required minlength="1" placeholder="Resposta incorreta 1">
				<input type="url" name="wrongAnswerUrl${questionNumber}1" required placeholder="URL da imagem 1">
				<p></p>
				<input type="text" name="wrongAnswer${questionNumber}2" required minlength="1" placeholder="Resposta incorreta 2">
				<input type="url" name="wrongAnswerUrl${questionNumber}2" required placeholder="URL da imagem 2">
				<p></p>
				<input type="text" name="wrongAnswer${questionNumber}3" minlength="1" placeholder="Resposta incorreta 3">
				<input type="url" name="wrongAnswerUrl${questionNumber}3" placeholder="URL da imagem 3">
			</div>
		</div>
	`;
	return newQuestion;
}
