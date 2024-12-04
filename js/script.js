let amountOfQuestions = 0, correctGuesses = 0;

const questionForm = document.querySelector('#questionForm');

const fetchBtn = document.querySelector('#fetchBtn');
//fetchBtn.disabled = true;

questionForm.addEventListener('submit', handleQuestionInput);



function handleQuestionInput(event) {
    event.preventDefault();
    const userSubject = document.querySelector('#subject').value;
    const userDifficulty = document.querySelector('#difficulties').value;
    amountOfQuestions = questionForm.querySelector('input').value;
    console.log(amountOfQuestions);

    const url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${userSubject}&difficulty=${userDifficulty}&type=multiple`;
    fetch(url).then(response => response.json()).then(displayQuestions)
        // .catch(displayError);

    questionForm.reset();
}

function displayError(error) {
    const errorP = document.querySelector('#errorMessage');
    errorP.innerText = error;
}

function displayQuestions(questions) {
    console.log(questions.results);

    const questionContainer = document.querySelector('#questionContainer');
    document.querySelector('#errorMessage').innerText = '';
    questionContainer.innerHTML = '';

    for (const question of questions.results) {
        console.log(question.question)

        const questionDiv = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.innerText = question.question;
        questionDiv.appendChild(h3);

        document.body.append(questionDiv);

        console.log(question.incorrect_answers);
        console.log(question.correct_answer);

        /*const wrongRadioEl = document.createElement('radio');
        wrongRadioEl.innerText = question.incorrect_answers;

        const rightRadioEl = document.createElement('radio');
        rightRadioEl.innerText = question.correct_answer;

        questionDiv.appendChild(wrongRadioEl);
        questionDiv.appendChild(rightRadioEl);*/
    }

}