import { allowReturnHome } from "./app.js";

allowReturnHome();

document.forms.generalInfoForm.addEventListener("submit", e => {
  e.preventDefault();
  const body = {
    "title": e.currentTarget.title.value,
    "image": e.currentTarget.url.value,
  };
  localStorage.setItem("body", JSON.stringify(body));
  localStorage.setItem("numQuestions", e.currentTarget.numQuestions.value);
  localStorage.setItem("numLevels", e.currentTarget.numLevels.value);
  e.currentTarget.submit();
});
