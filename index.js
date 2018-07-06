'use strict';

let questionCount = 0;
let correctCount = 0;

const questions = [{
        q: 'How many pins are used?',
        a1: '8',
        a2: '10',
        a3: '12',
        a4: '15',
        answerText: '10',
        answerKey: 'a2'
    },
    {
        q: 'What is it called when you knock down all the pins in 1 shot?',
        a1: 'Strike',
        a2: 'Spare',
        a3: 'Gutterball',
        a4: 'Foul',
        answerText: 'Strike',
        answerKey: 'a1'
    },
    {
        q: 'How many fingers do you put in to hold the ball?',
        a1: '2',
        a2: '3',
        a3: '4',
        a4: '5',
        answerText: '3',
        answerKey: 'a2'
    },
    {
        q: 'What is a perfect score?',
        a1: '150',
        a2: '250',
        a3: '300',
        a4: '500',
        answerText: '300',
        answerKey: 'a3'
    },
    {
        q: 'How many frames are played in a game?',
        a1: '5',
        a2: '10',
        a3: '15',
        a4: '20',
        answerText: '10',
        answerKey: 'a2'
    },
    {
        q: 'What is it called when your foot crosses the line in front of the lane?',
        a1: 'Strike',
        a2: 'Spare',
        a3: 'Gutterball',
        a4: 'Foul',
        answerText: 'Foul',
        answerKey: 'a4'
    },
    {
        q: 'What is it called when your ball falls into the side without hitting any pins?',
        a1: 'Strike',
        a2: 'Spare',
        a3: 'Gutterball',
        a4: 'Foul',
        answerText: 'Gutterball',
        answerKey: 'a3'
    },
    {
        q: 'What is it called when you knock down all the pins with 2 throws within a frame?',
        a1: 'Strike',
        a2: 'Spare',
        a3: 'Gutterball',
        a4: 'Foul',
        answerText: 'Spare',
        answerKey: 'a2'
    },
    {
        q: 'What is the maximum legal weight of a bowling ball?',
        a1: '13',
        a2: '14',
        a3: '15',
        a4: '16',
        answerText: '16',
        answerKey: 'a4'
    },
    {
        q: 'What is it called when you get 3 strikes in a row?',
        a1: 'Turkey',
        a2: '3-bagger',
        a3: 'Triple',
        a4: 'Triple play',
        answerText: 'Turkey',
        answerKey: 'a1'
    }
];

function handleStartButton() {
    $('#js-start-button').click(function() {
        renderQuestion();
    });
}

function renderQuestion() {
    $('#js-main').html(generateQuestion(questionCount));
    handleRadioClick();
}

function generateQuestion(questionNumber) {
    let qNumber = questionNumber + 1;
    return (`
    <form id="js-question-form">
      <h1>Question ${qNumber}</h1>
      <fieldset>
        <legend class="question">${questions[questionNumber].q}</legend>
        <label for="answer-1">
          <input type="radio" name="bowl-answer" id="answer-1" value="a1" required>
          <span>${questions[questionNumber].a1}</span>
        </label>
        <br>
        <label for="answer-2">
          <input type="radio" name="bowl-answer" id="answer-2" value="a2" required>
          <span>${questions[questionNumber].a2}</span>
        </label>
        <br>
        <label for="answer-3">
          <input type="radio" name="bowl-answer" id="answer-3" value="a3" required>
          <span>${questions[questionNumber].a3}</span>
        </label>
        <br>
        <label for="answer-4">
          <input type="radio" name="bowl-answer" id="answer-4" value="a4" required>
          <span>${questions[questionNumber].a4}</span>
        </label>
      </fieldset>
      <button type="submit" id="js-submit-button" class="submit-button-red">Submit</button>
    </form>
    <h2>Question: ${questionCount+1} of 10<br>Score: ${correctCount}</h2>
  `);
}

function handleSubmitButton() {
    $('#js-main').on('submit', '#js-question-form', function(event) {
        event.preventDefault();
        if (questions[questionCount].answerKey === $('input:checked').val()) {
            incrementScore();
            renderFeedback('Right!');
        } else {
            renderFeedback('Wrong!');
        }
    });
}

function generateFeedback(feedback) {
    return (`
    <h1>${feedback}</h1>
    <p>The correct answer is: ${questions[questionCount].answerText}</p>
    <button type="button" id="js-next-button" class="green-button">Next</button>
    <h2>Question: ${questionCount+1} of 10<br>Score: ${correctCount}</h2>
  `);
}

function renderFeedback(feedback) {
    $('#js-main').html(generateFeedback(feedback));
}

function handleNextButton() {
    $('#js-main').on('click', '#js-next-button', function() {
        incrementQuestion();
        if (questionCount < 10) {
            renderQuestion();
        } else {
            renderResults();
        }
    });
}

function renderResults() {
    $('#js-main').html(generateResults);
}

function generateResults() {
    let headerText = 'Great Job!'
    switch (correctCount) {
        case 0:
        case 1:
        case 2:
            headerText = 'Too Bad!'
            break;
        case 3:
        case 4:
        case 5:
        case 6:
            headerText = 'Not Bad!'
            break;
        default:
            headerText = 'Great Job!'
    }
    return (`
  <h1>${headerText}</h1>
  <p>You got ${correctCount} out of ${questionCount} correct</p>
  <button type="button" id="js-restart-button" class="green-button">Restart</button>
  `);
}

function handleRestartButton() {
    $('#js-main').on('click', '#js-restart-button', function() {
        location.reload();
    });
}

function incrementQuestion() {
    questionCount++;
}

function incrementScore() {
    correctCount++;
}

function handleRadioClick() {
    $('input[type=radio]').on("change", function() {
        $('.radio-selected').removeClass('radio-selected');
        $(this).parent().addClass('radio-selected');
        $('#js-submit-button').removeClass('submit-button-red');
        $('#js-submit-button').addClass('selected-submit-green');
    });
}

function handleQuiz() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
}

$(handleQuiz);