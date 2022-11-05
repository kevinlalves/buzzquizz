let question_level_title;
let question_level_percentage;
let question_level_url;
let question_level_description;
let check1;
let check2;
let check3;
let check4;




function createQuiz() {
    question_level_title = document.querySelector('#question_level_title').value
    question_level_percentage = document.querySelector('#question_level_percentage').value
    question_level_url = document.querySelector('#question_level_url').value
    question_level_description = document.querySelector('#question_level_description').value

    if (question_level_title === '') {
    var element = document.getElementById('question_level_title')
    element.classList.add("wrong");
    check1 = 0;
    } else {
        check1 = 1;
    }

    if (question_level_percentage === '') {
        var element = document.getElementById('question_level_percentage')
        element.classList.add("wrong");
        check2 = 0;
        } else {
            check2 = 1; 
        }


    if (!question_level_url.includes('http') || question_level_url === '') {
    var element = document.getElementById('question_level_url')
    element.classList.add("wrong");
    check3 = 0;
    } else {
        check3 = 1;
    }

    if (question_level_description === '') {
        var element = document.getElementById('question_level_description')
        element.classList.add("wrong");
        check4 = 0;
        } else {
            check4 = 1; 
        }


    if(check1 + check2 + check3 + check4 === 4) {
        window.location.replace("./new_fourth.html");
    }
}


function remove_wrong(element) {
    element.classList.remove("wrong");
}