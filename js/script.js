// Variables declared.
let amountOfQuestions = 0, correctGuesses = 0, correctAnswers = [];

const questionForm = document.querySelector('#questionForm');
const questionPrompt = document.querySelector('#questionHidden');
const result = document.querySelector('#resultPopup');
const fetchBtn = document.querySelector('#fetchBtn');
const resetBtn = document.querySelector('#resetBtn');
const submitBtn = document.querySelector('#submitBtn');

// eventListener for submit to run the function below
questionForm.addEventListener('submit', handleQuestionInput);
// Function handling input.
function handleQuestionInput(event) {
    event.preventDefault();
    amountOfQuestions = questionForm.querySelector('input').value;
    const userSubject = document.querySelector('#subject').value;
    const userDifficulty = document.querySelector('#difficulties').value;
    console.log(amountOfQuestions);
    
    const url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${userSubject}&difficulty=${userDifficulty}&type=multiple`;
    fetch(url).then(response => response.json()).then(displayQuestions)
    .catch(displayError);
    if (amountOfQuestions !== '') {
        questionForm.classList.add('hidden');
        questionPrompt.classList.add('visible');
    }
    else {
        alert('Please enter an amount!');
    }
    resetBtn.classList.add('visible');
    submitBtn.classList.add('visible');
    questionForm.reset();
}
// Function displaying errors if they appear.
function displayError(error) {
    const errorP = document.querySelector('#errorMessage');
    errorP.innerText = error;
}
// displayQuestions runs last in the fetching of the API. Random questions along with their respective answers show up in the DOM.
function displayQuestions(questions) {
    console.log(questions.results);

    const questionContainer = document.querySelector('#questionContainer');
    questionContainer.innerHTML = '';
    document.querySelector('#errorMessage').innerText = '';

    for (let i = 0; i < questions.results.length; i++) {
        const question = questions.results[i];

        console.log(question.question)

        const questionDiv = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.innerHTML = `${i + 1}. ${question.question}`;
        questionDiv.appendChild(h3);

        document.body.append(questionDiv);

        console.log(question.incorrect_answers);
        console.log(question.correct_answer);

        const allAnswers = [question.incorrect_answers[0],
                            question.incorrect_answers[1],
                            question.incorrect_answers[2],
                            question.correct_answer];
        allAnswers.sort(() => Math.random() - 0.5);

        correctAnswers.push(question.correct_answer);

        for (const answer of allAnswers) {
            const radioContainer = document.createElement('p');

            const radioEl = document.createElement('input');
            radioEl.type = 'radio';
            radioEl.name = question.question;
            radioEl.id = answer;
            radioEl.value = answer;

            const labelEl = document.createElement('label');
            labelEl.setAttribute('for', radioEl.id);
            labelEl.innerHTML = answer;

            radioContainer.append(radioEl, labelEl);
            questionDiv.appendChild(radioContainer);
        }

        questionContainer.appendChild(questionDiv);
    }
    
}
// eventListener for 'click', and then userAnswers runs.
submitBtn.addEventListener('click', userAnswers);
// Handles the answers of the user and checks if correct. Spits out feedback and the correct answers if guessed incorrectly.
function userAnswers() {
    submitBtn.disabled = true;

    const questionContainer = document.querySelector('#questionContainer');
    const questions = questionContainer.querySelectorAll('div');

    questions.forEach((questionDiv, index) => {
        const selectedAnswer = questionDiv.querySelector('input[type="radio"]:checked');
        let feedbackDiv = document.querySelector('#feedback');

        feedbackDiv = document.createElement('h2');

        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;

            if (userAnswer === correctAnswers[index]) {
                correctGuesses++;
                feedbackDiv.innerText = 'Correct!';
                feedbackDiv.classList.add('correct')
            }
            else {
                feedbackDiv.innerText = `Incorrect! Correct answer: ${correctAnswers[index]}`;
                feedbackDiv.classList.add('incorrect')
            }
        }
        questionDiv.appendChild(feedbackDiv);
    });

    result.innerText = `Score: You answered ${correctGuesses} out of ${amountOfQuestions} correctly! Click "Reset trivia" to play again.`;
    //console.log(`Score: You scored ${correctGuesses} out of ${amountOfQuestions}`);
}

resetBtn.addEventListener('click', resetGame);
// Resets the game when pressing the reset button.
function resetGame() {
    amountOfQuestions = 0;
    correctGuesses = 0;
    correctAnswers = [];
    
    questionForm.classList.remove('hidden');
    questionPrompt.classList.remove('visible');
    resetBtn.classList.remove('visible');
    submitBtn.classList.remove('visible');
    
    const questionContainer = document.querySelector('#questionContainer');
    questionContainer.innerHTML = '';

    result.innerHTML = '';
    
    submitBtn.disabled = false;
    console.clear();
}