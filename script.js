'use strict';
// build the question set 
const questionSet = [
  { 
    number: 1,
    text: `How many broomsticks are flown in<br> a full game of Quidditch?</br>`,
    ans1: `Fourteen`,
    ans2: `Two hundred and sixty-seven`, 
    ans3: `Fifteen`, 
    ans4: `Sixteen` 
  },
  {
    number: 2,
    text: ` Of which Hogwarts house is Terry Boot a member?`,
    ans1: `Slytherin`,
    ans2: `Gryffindor `, 
    ans3: `Hufflepuff `, 
    ans4: `Ravenclaw` 
  },
  {
    number: 3,
    text: `Which Polyjuice Potion ingredients must<br> be acquired at the full moon?</br>`,
    ans1: `Knotgrass`,
    ans2: `A bit of whoever you wish to turn into`,
    ans3: `Fluxweed`, 
    ans4: `Newt spleen`
  },
  {
    number: 4,
    text: `What type of creature is an Ashwinder?`,
    ans1: `Dog`,
    ans2: `Serpent`,
    ans3: `Fish`, 
    ans4: `Bird`
  },
  {
    number: 5,
    text: `Which team from the Ministry of Magic is responsible for modifying<br> the memories of Muggles who have been exposed to magic?</br>`,
    ans1: `Unspeakables`,
    ans2: `Aurors`,
    ans3: `The Wizengamot`, 
    ans4: `Oblivators`
  },
  {
    number: 6,
    text: `Where can the Demiguise be found (with difficulty)?`,
    ans1: `Russia`,
    ans2: `Far East`,
    ans3: `North Sea`, 
    ans4: `South America`
  },
  {
    number: 7,
    text: `What house was Moaning Myrtle sorted into?`,
    ans1: `Slytherin`,
    ans2: `Gryffindor `, 
    ans3: `Hufflepuff `, 
    ans4: `Ravenclaw` 
  },
  {
    number: 8,
    text: `What year was Ollivanders founded?`,
    ans1: `465 BC`,
    ans2: `382 BC`, 
    ans3: `57 BC`, 
    ans4: `712 BC` 
  },
  {
    number: 9,
    text: `What number is Harry's vault at the Gringotts Wizarding Bank?`,
    ans1: `713`,
    ans2: `687`, 
    ans3: `627`, 
    ans4: `711` 
  },
  {
    number: 10,
    text: ` Who says this: "I wouldn't touch a filthy little blood<br> traitor like her whatever she looked like."?</br>`,
    ans1: `Barty Crouch Jr.`,
    ans2: `Marcus Flint `, 
    ans3: `Lucius Malfoy`, 
    ans4: `Blaise Zabini` 
  }
];
// build the answers set

const ANSWERS = [
  'Fifteen',
  'Ravenclaw',
  'Fluxweed',
  'Serpent',
  'Oblivators',
  'Far East',
  'Ravenclaw',
  '382 BC',
  '687',
  'Blaise Zabini'
];
//question template
let questionNum = 1;
let rightAnswers = 0 ;

function generateQuestions(rightAnswers, question, questionAnswered) {
  return `
  <section id="question-page" role="main">
  <div id="status-bar"
    <span id="question-count">Question:${question.number}/10</span>
    <span id ="score-count"> Score: ${rightAnswers}/${questionAnswered}</span>
  </div>
  <h3 id="question"> ${question.text} </h3>
  <form>
    <fieldset>
    <label for="user answers" class="error">Answers:</label>
    <label> 
        <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans1}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans2}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans3}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button class="btn-hover color-3" id="js-submit-button">Submit</button>
    </form>
  </section>
  `;
}

function startButton() {
$('#js-start-button').click(function(event){
  goToNeXT();
});
}

function nextButton() {
   $('#container').on('click', '#js-next-button', function(event) {
      if(questionNum === 10) { 
      renderResults();
    } else {
     iterateQuestion();
     goToNeXT();
}
});
}

function goToNeXT() {
  const question = questionSet[questionNum -1 ];
  const questionAnswered = questionNum - 1;
  $('#container').html(generateQuestions(rightAnswers, question, questionAnswered));
}

function submitButton() {
$('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()
    const answer = $('input:checked').siblings('span');
    const userRight = checkAnswer(answer);
    if (userRight) {
      goodFeedback();
    } else {
     badFeedback();
    }
});
}

function checkAnswer(answer)  {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}
function goodFeedback() {
  let goodFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img class="animated" src ="https://media1.tenor.com/images/6f03e32f56fe93eaae38252cbf5cd063/tenor.gif?itemid=10684186">
    <p> <button class="btn-hover color-3" id="js-next-button">Next</button> </p>
  </section>
`;
  $('#container').html(goodFeedback);
  iterateRightAnswers();
}

function badFeedback() {
  function badFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Wrong! It was ${ANSWERS[questionNum - 1]}!</h2>
   <img src="https://pa1.narvii.com/7008/f31522300d0fc00df564608780a3d90b32aa89d6r1-327-200_hq.gif" alt="It's leviosa">
     <p> <button class="btn-hover color-3" id="js-next-button">Next</button></p>
    </section>
`;}
  $('#container').html(badFeedbackTemplate(questionNum));
}


 function iterateRightAnswers() {
  rightAnswers++;
 }

 function iterateQuestion() {
  questionNum++;
}


function renderResults () {
  if (rightAnswers >= 8) {
    $('#container').html(`<div class="results goodFeedback"><h3>A true wizard!</h3><img class=
    "animated" src="https://media1.tenor.com/images/0f8588a031f9aaa157df4f519b65180e/tenor.gif?itemid=5453410" alt="You're a wizard harry"/><p>You got ${rightAnswers} / 10</p><p>You've got that magic in you!!</p><button class="btn-hover color-3" type ="restartButton" button id="js-restart-button">Restart Quiz</button></div>`);
  } else if (rightAnswers < 8 && rightAnswers >= 5) {
    $('#container').html(`<div class="results goodFeedback"><h3>Not that bad! But you can do better!</h3><img class="animated" src="https://media.giphy.com/media/l2JhL6uaJY7WzPbMs/giphy.gif" alt="slow clap Hermione"/><p>You got ${rightAnswers} / 10</p><p>You were so close!</p><button type ="restartButton" button class="btn-hover color-3" id="js-restart-button">Restart Quiz</button></div>`);
  } else {
    $('#container').html(`<div class="results goodFeedback"><h3>You might want to read the books again </h3><img class ="animated" src="https://media.giphy.com/media/GUhiBgU0DbWsU/giphy.gif" alt="Snape disapointed"/><p>You got ${rightAnswers} / 10</p><p>I'm sure you will do better next time!</p><button class"btn-hover color-3"  type ="restartButton" button id="js-restart-button">Restart Quiz</button></div>`);
  }
}

function restartQuiz() {
  $('#container').on('click', '#js-restart-button', function(event) {
    questionNum = 1;
    rightAnswers = 0;
    goToNeXT();
  });
}

function runButtons() {
  startButton();
  submitButton();
  nextButton();
  restartQuiz();
}
runButtons();