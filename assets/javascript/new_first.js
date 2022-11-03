let quiz_title;
let quiz_url;
let quiz_question;
let quiz_level;
let check1 = 0;
let check2 = 0;
let check3 = 0;
let check4 = 0;




function createQuestions() {
    quiz_title = document.querySelector('#quiz_title').value
    quiz_url = document.querySelector('#quiz_url').value
    quiz_question = document.querySelector('#quiz_question').value
    quiz_level = document.querySelector('#quiz_level').value

    if (quiz_title === '') {
    var element = document.getElementById('quiz_title')
    element.classList.add("wrong");
    check1 = 0;
    } else {
        check1 = 1;
    }

    if (!quiz_url.includes('http') || quiz_url === '') {
    var element = document.getElementById('quiz_url')
    element.classList.add("wrong");
    check2 = 0;
    } else {
        check2 = 1;
    }

    if ((quiz_question === '0') || (quiz_question === '')) {
        var element = document.getElementById('quiz_question')
        element.classList.add("wrong");
        check3 = 0;
    } else {
        check3 = 1;
    }


    if (quiz_level === '') {
        var element = document.getElementById('quiz_level')
        element.classList.add("wrong");
        check4 = 0;

    } else {
        check4 = 1;
    }

    if(check1 + check2 + check3 + check4 === 4) {
        window.location.replace("./new_second.html");
    }
}


function remove_wrong(element) {
    element.classList.remove("wrong");
}


