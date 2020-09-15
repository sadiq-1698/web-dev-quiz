const easyQuestions = [{
        id: 1,
        question: 'Which value to choose if you want to fill an entire background with an image without distoring the aspect ratio?',
        op1: 'cover',
        op2: 'fill',
        op3: '100%',
        op4: 'contain',
        answer: this.op1,
    },

    {
        id: 2,
        question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
        op1: 'At the end of the document',
        op2: 'In the &lttitle&gt section',
        op3: 'In the &lthead&gt section',
        op4: 'In the &ltbody&gt section',
        answer: this.op3,
    },

    {
        id: 3,
        question: 'Which HTML tag is used to define an internal style sheet?',
        op1: '&ltcss&gt',
        op2: '&ltstyle&gt',
        op3: '&ltscript&gt',
        op4: '&ltcascade&gt',
        answer: this.op2,
    },

    {
        id: 4,
        question: 'Which HTML attribute is used to define inline styles?',
        op1: 'style',
        op2: 'cascade',
        op3: 'class',
        op4: 'font',
        answer: this.op1,
    },

    {
        id: 5,
        question: 'How do you define a custom property in CSS?',
        op1: '$custom-property = 10',
        op2: 'custom-property = 10',
        op3: '$custom-property : 10',
        op4: 'custom-property : 10',
        answer: this.op4,
    },

    {
        id: 6,
        question: 'How do you add a background color for all &lth1&gt elements?',
        op1: 'h1{ background-color : black;}',
        op2: 'h1.all{ background-color : black; }',
        op3: 'all.h1 { background-color : black; } ',
        op4: 'h1 { background-color = black; }',
        answer: this.op1,
    },

    {
        id: 7,
        question: 'What does HTML stand for?',
        op1: 'Hyper Text Markup Language',
        op2: 'Hyperlinks and Text Markup Language',
        op3: 'Home Tool Markup Language',
        op4: 'Header Tool Markup Language',
        answer: this.op1,
    },

    {
        id: 8,
        question: 'What is the correct HTML element to define emphasized text',
        op1: '&ltitalic&gt',
        op2: '&ltbold&gt',
        op3: '&ltem&gt',
        op4: '&lti&gt',
        answer: this.op3,
    },

    {
        id: 9,
        question: 'Which character is used to indicate an end tag?',
        op1: '*',
        op2: '<',
        op3: '/',
        op4: '^',
        answer: this.op3,
    },

    {
        id: 10,
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        op1: 'src',
        op2: 'longdesc',
        op3: 'title',
        op4: 'alt',
        answer: this.op4,
    },

    {
        id: 11,
        question: 'Inside which HTML element do we put the JavaScript?',
        op1: '&ltjavascript&gt',
        op2: '&ltscript&gt',
        op3: '&ltscripting&gt',
        op4: '&ltjs&gt',
        answer: this.op2,
    },

    {
        id: 12,
        question: `What is the output of the following code?<br><br>var a;<br>console.log(a === 1)`,
        op1: 'error',
        op2: 'true',
        op3: 'undefined',
        op4: 'false',
        answer: this.op4,
    },

    {
        id: 13,
        question: 'Which event occurs when the user clicks on an HTML element?',
        op1: 'onchange',
        op2: 'onmouseover',
        op3: 'onmouseclick',
        op4: 'onclick',
        answer: this.op4,
    },

    {
        id: 14,
        question: `What is the output of the following code?<br><br>Boolean(10>9)`,
        op1: 'error',
        op2: 'false',
        op3: 'true',
        op4: 'undefined',
        answer: this.op3,
    },

    {
        id: 15,
        question: 'Which of these will throw a SyntaxError?',
        op1: 'if (x == 1) { }',
        op2: 'if (x = 1) { }',
        op3: 'if (x ==== 1) { }',
        op4: 'if (x === 1) { }',
        answer: this.op3,
    },

];

var ASKED_QUESTIONS = [];
var CURRENT_QUESTION_NUMBER = 0;
var CURRENT_CORRECT_OPTION = "";
var CHOSE_FIFTY_FIFTY = false;
var CHOSE_SECOND_CHANCE = false;
var HOLD_FOR_SECOND_OPTION = false;
var HOLD_ELEMENT_ID = '';

var START_GAME_BUTTON = document.getElementById('start-game');
START_GAME_BUTTON.addEventListener('click', startGame);

function startGame() {
    setTimeout(() => {
        document.getElementById('temp-body').style.display = 'none';
        displayQuestion();
        document.getElementById('game-container').style.display = 'block';
    }, 250);
}

function onOptionChoose(id) {
    var chosenElement = document.getElementById(id);
    var chosenOption = chosenElement.innerText.trim();
    var correctOption = CURRENT_CORRECT_OPTION.innerText.trim();
    var correctOptionID = getCorrectAnswerId();
    if (CHOSE_SECOND_CHANCE === true) {
        if (!isEqual(chosenOption, correctOption)) {
            chosenElement.classList.add("hold");
            HOLD_ELEMENT_ID = id;
            CHOSE_SECOND_CHANCE = false;
            HOLD_FOR_SECOND_OPTION = true;
            return;
        } else {
            disableOptions();
            updateBackgroundUponCorrect(id);
            onChosenCorrectOption();
            CHOSE_SECOND_CHANCE = false;
            return;
        }
    }
    disableOptions();
    if (isEqual(chosenOption, correctOption)) {
        updateBackgroundUponCorrect(id);
        onChosenCorrectOption();
    } else {
        updateBackgroundUponCorrect(correctOptionID);
        updateBackgroundUponWrong(id);
        onChosenWrongOption();
    }
}

function onChosenCorrectOption() {
    setTimeout(() => {
        markCompletedQuestions();
        displayQuestion();
        enableOptions();
    }, 1500);
}

function onChosenWrongOption() {
    setTimeout(() => {
        hideGameContainer();
        updateVictoryText();
        showCompleteModal();
        markCompletedQuestions();
        enableOptions();
    }, 1500);
}

function displayQuestion() {
    setOptionsColorActive();
    CURRENT_QUESTION_NUMBER++;
    if (isSixteenthQuestion()) {
        updateVictoryText();
        hideGameContainer();
        showCompleteModal();
        return;
    }
    var randomQuestion = Math.floor(Math.random() * easyQuestions.length);
    while (ASKED_QUESTIONS.includes(randomQuestion)) {
        randomQuestion = Math.floor(Math.random() * easyQuestions.length);
    }
    setDefaultOptionBackground();
    setQuestionNumber();
    setQuestion(randomQuestion);
    setOptions(randomQuestion);
    CURRENT_CORRECT_OPTION = easyQuestions[randomQuestion].answer;
    ASKED_QUESTIONS.push(randomQuestion);
}

function markCompletedQuestions() {
    var element = document.getElementById('circle-' + String(CURRENT_QUESTION_NUMBER));
    element.style.color = 'green';
    element.style.border = '2px solid green';
}

function setDefaultOptionBackground() {
    var array = ['op1-container', 'op2-container', 'op3-container', 'op4-container'];
    array.forEach(element => {
        var temp = document.getElementById(element);
        temp.classList.remove('correct');
        temp.classList.remove('wrong');
        temp.classList.remove('hold');
        temp.classList.add("option");
    });
}

function setQuestionNumber() {
    document.getElementById('question-number').innerHTML = CURRENT_QUESTION_NUMBER;
}

function setQuestion(index) {
    document.getElementById('question').innerHTML = easyQuestions[index].question;
}

function setOptions(index) {
    var array = ['op1','op2','op3','op4'];
    document.getElementById('op1').innerHTML = easyQuestions[index].op1;
    document.getElementById('op2').innerHTML = easyQuestions[index].op2;
    document.getElementById('op3').innerHTML = easyQuestions[index].op3;
    document.getElementById('op4').innerHTML = easyQuestions[index].op4;
    array.forEach(element => {
        var temp = document.getElementById(element);
        temp.classList.remove('white-text');
    });
}

function updateBackgroundUponCorrect(id) {
    var element = document.getElementById(id);
    element.classList.add("correct");
    element.classList.remove("option");
    var elementTextID = id.split("-")[0];
    var elementText = document.getElementById(elementTextID);
    elementText.style.color = 'white';
    elementText.style.fontWeight = 'bold';
}

function updateBackgroundUponWrong(id) {
    var element = document.getElementById(id);
    element.classList.add("wrong");
    element.classList.remove("option");
    var elementTextID = id.split("-")[0];
    var elementText = document.getElementById(elementTextID);
    elementText.style.color = 'white';
    elementText.style.fontWeight = 'bold';
}

function getCorrectAnswerId() {
    var getIndex = ASKED_QUESTIONS[ASKED_QUESTIONS.length - 1];
    var correctAnswer = easyQuestions[getIndex].answer;
    var correctAnswerId = correctAnswer.id.trim();
    return correctAnswerId + '-container';
}

function onChosenFiftyFifty() {
    CHOSE_FIFTY_FIFTY = true;
    var fiftyFiftyElement = document.getElementById('temp-fifty');
    fiftyFiftyElement.classList.add('disable');
    document.getElementById('cross-mark-1').style.display = 'block';
    var array = ['op1-container', 'op2-container', 'op3-container', 'op4-container'];
    if (HOLD_FOR_SECOND_OPTION) {
        array = array.filter(function (element) {
            return element != HOLD_ELEMENT_ID;
        });
        HOLD_FOR_SECOND_OPTION = false;
    }
    var correctAnswerID = getCorrectAnswerId();
    var chooseFirstWrongOption = Math.floor(Math.random() * array.length);
    while (array[chooseFirstWrongOption] === correctAnswerID) {
        chooseFirstWrongOption = Math.floor(Math.random() * array.length);
    }
    var chooseSecondWrongOption = Math.floor(Math.random() * array.length);
    while (array[chooseSecondWrongOption] === correctAnswerID || chooseFirstWrongOption === chooseSecondWrongOption) {
        chooseSecondWrongOption = Math.floor(Math.random() * array.length);
    }
    updateOptionBackgroundOnFiftyFifty(array[chooseFirstWrongOption], array[chooseSecondWrongOption]);
}

function updateOptionBackgroundOnFiftyFifty(a, b) {
    var firstOptionTextID = a.split("-")[0];
    var secondOptionTextID = b.split("-")[0];
    var firstOption = document.getElementById(a);
    var secondOption = document.getElementById(b);
    firstOption.classList.add('disable');
    secondOption.classList.add('disable');
    firstOption.style.color = '#040e20';
    secondOption.style.color = "#040e20";
    document.getElementById(firstOptionTextID).style.color = "#040e20";
    document.getElementById(secondOptionTextID).style.color = "#040e20";
}

function setOptionsColorActive() {
    document.getElementById('op1').style.color = "goldenrod";
    document.getElementById('op2').style.color = "goldenrod";
    document.getElementById('op3').style.color = "goldenrod";
    document.getElementById('op4').style.color = "goldenrod";
}

function onChosenSecondChance() {
    CHOSE_SECOND_CHANCE = true;
    var secondChanceElement = document.getElementById('temp-chance');
    secondChanceElement.classList.add('disable');
    document.getElementById('cross-mark-2').style.display = 'block';
}

function disableOptions() {
    var array = ['op1-container', 'op2-container', 'op3-container', 'op4-container'];
    array.forEach(element => {
        var temp = document.getElementById(element);
        temp.classList.add("disable");
    });
}

function enableOptions() {
    var array = ['op1-container', 'op2-container', 'op3-container', 'op4-container'];
    array.forEach(element => {
        var temp = document.getElementById(element);
        temp.classList.remove("disable");
    });
}

var ON_VICTORY_PLAIN_TEXT = "";
var ON_VICTORY_GOLDEN_TEXT = "";

function updateVictoryText() {
    if (CURRENT_QUESTION_NUMBER >= 15) {
        document.getElementById('less-than-seven').style.display = "none";
        document.getElementById('less-than-fifteen').style.display = "none";
    } else if (CURRENT_QUESTION_NUMBER < 15 && CURRENT_QUESTION_NUMBER > 7) {
        document.getElementById('less-than-seven').style.display = "none";
        document.getElementById('victory').style.display = "none";
    } else {
        document.getElementById('less-than-fifteen').style.display = "none";
        document.getElementById('victory').style.display = "none";
    }
}

function showCompleteModal() {
    document.getElementById('temp-body').style.display = 'flex';
    document.getElementById('modal-container').style.display = 'none';
    var modal = document.getElementById('complete-modal-container');
    modal.style.display = 'flex';
}

function hideGameContainer() {
    var container = document.getElementById('game-container');
    container.style.display = 'none';
}

function isSixteenthQuestion() {
    if (CURRENT_QUESTION_NUMBER > 15) return true;
    return false;
}

function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    return false;
}

function onTryAgain() {
    location.reload();
}