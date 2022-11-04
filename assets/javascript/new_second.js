let question_text;
let question_correct_answer;
let question_correct_url;
let question_incorrect_answer;
let question_incorrect_url;
let check1;
let check2;
let check3;
let check4;
let check5;




function createLevels() {
    question_text = document.querySelector('#question_text').length
    question_correct_answer = document.querySelector('#question_correct_answer').value
    question_correct_url = document.querySelector('#question_correct_url').value
    question_incorrect_answer = document.querySelector('#question_incorrect_answer').value
    question_incorrect_url = document.querySelector('#question_incorrect_url').value

    if (question_text === '') {
    var element = document.getElementById('question_text')
    element.classList.add("wrong");
    check1 = 0;
    } else {
        check1 = 1;
    }

    if (question_correct_answer === '') {
        var element = document.getElementById('question_correct_answer')
        element.classList.add("wrong");
        check2 = 0;
        } else {
            check2 = 1; 
        }


    

    if (!question_correct_url.includes('http') || question_correct_url === '') {
    var element = document.getElementById('question_correct_url')
    element.classList.add("wrong");
    check3 = 0;
    } else {
        check3 = 1;
    }

    if (!question_incorrect_url.includes('http') || question_incorrect_url === '') {
        var element = document.getElementById('question_incorrect_url')
        element.classList.add("wrong");
        check4 = 0;
        } else {
            check4 = 1;
        }

    if ((question_incorrect_answer === '0') || (question_incorrect_answer === '')) {
        var element = document.getElementById('question_incorrect_answer')
        element.classList.add("wrong");
        check5 = 0;
    } else {
        check5 = 1;
    }

    if(check1 + check2 + check3 + check4 + check5 === 5) {
        window.location.replace("./new_third.html");
    }
}


function remove_wrong(element) {
    element.classList.remove("wrong");
}