export const drivenAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";

export const altMsg = "quizz photo";

export function getFormData() {
  let queryString = window.location.search.substring(1);
  return JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
}

export function allowReturnHome() {
  const buttonHome = document.querySelector(".return");
  buttonHome.addEventListener("click", e => {
    e.preventDefault();
    window.location.replace("./index.html");
  });
}
