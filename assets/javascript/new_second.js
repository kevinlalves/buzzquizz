import { allowReturnHome, appendExtraContainers, kickIntruder } from "./app.js";

kickIntruder();
const numQuestions = Number(localStorage.getItem("numQuestions"));
const minNumQuestions = 3;
allowReturnHome();

function delay(miliseconds) {
	return new Promise(resolve => {
		setTimeout(resolve, miliseconds);
	});
}

appendExtraContainers(minNumQuestions, Number(numQuestions), questionTemplate);

document.forms.questionsForm.addEventListener("submit", e => {
	e.preventDefault();
	addQuestionsToBody(e.currentTarget);
	e.currentTarget.submit();
});

function questionTemplate(questionNumber) {
	return `
		<div class="entire-question">
			<p>Pergunta ${questionNumber}</p>
			<div class="input-div">
				<input type="text" name="question${questionNumber}" required minlength="20" placeholder="Texto da pergunta">
        <input type="color" name="color${questionNumber}" required placeholder="Cor de fundo da pergunta">
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
}

function addQuestionsToBody(form) {
	const body = JSON.parse(localStorage.getItem("body"));
	const questions = [];
	console.log("numQuestions", numQuestions);
	for (let i = 1; i <= numQuestions; i++) {
		questions.push(createQuestionJSON(form, i));
	}
	body["questions"] = questions;
	localStorage.setItem("body", JSON.stringify(body));
}

function createQuestionJSON(form, questionNum) {
	const question = {};
	const answers = [];
	question["title"] = form[`question${questionNum}`].value;
	question["color"] = form[`color${questionNum}`].value;
	const rightAnswer = {
		"text": form[`rightAnswer${questionNum}`].value,
		"image": form[`rightAnswerUrl${questionNum}`].value,
		"isCorrectAnswer": true
	};
	answers.push(rightAnswer);
	for (let i = 1; i <= 3 && form[`wrongAnswer${numQuestions}${i}`].value; i++) {
		answers.push(createAnswerJSON(form, i, questionNum));
	}
	question["answers"] = answers;
	return question;
}

function createAnswerJSON(form, answerNum, questionNum) {
	const answer = {
		"text": form[`wrongAnswer${questionNum}${answerNum}`].value,
		"image": form[`wrongAnswerUrl${questionNum}${answerNum}`].value,
		"isCorrectAnswer": false
	};
	return answer;
}
