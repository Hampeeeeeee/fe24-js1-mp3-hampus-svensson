let amountOfQuestions = 0, correctGuesses = 0;

const questionForm = document.querySelector('#questionForm');
const questionPrompt = document.querySelector('#questionHidden');
const fetchBtn = document.querySelector('#fetchBtn');
const resetBtn = document.querySelector('#resetBtn');
const submitBtn = document.querySelector('#submitBtn');

questionForm.addEventListener('submit', handleQuestionInput);

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

function displayError(error) {
    const errorP = document.querySelector('#errorMessage');
    errorP.innerText = error;
}

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
        h3.innerText = `${i + 1}. ${question.question}`;
        questionDiv.appendChild(h3);

        document.body.append(questionDiv);

        console.log(question.incorrect_answers);
        console.log(question.correct_answer);

        const allAnswers = [question.incorrect_answers[0],
                            question.incorrect_answers[1],
                            question.incorrect_answers[2],
                            question.correct_answer];
        allAnswers.sort(() => Math.random() - 0.5);

        for (const answer of allAnswers) {
            const radioContainer = document.createElement('p');

            const radioEl = document.createElement('input');
            radioEl.type = 'radio';
            radioEl.name = question.question;
            radioEl.value = answer;

            const labelEl = document.createElement('label');
            labelEl.innerText = answer;

            radioContainer.append(radioEl, labelEl);
            questionDiv.appendChild(radioContainer);
        }

        questionContainer.appendChild(questionDiv);

    }
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    amountOfQuestions = 0;
    correctGuesses = 0;
    
    questionForm.classList.remove('hidden');
    questionPrompt.classList.remove('visible');
    resetBtn.classList.remove('visible');
    submitBtn.classList.remove('visible');
    
    const questionContainer = document.querySelector('#questionContainer');
    questionContainer.innerHTML = '';

    console.clear();
}