const quizHeaderEl = document.getElementsByTagName("header")[0];
const quizTitleEL = document.getElementById("quiz-title");
const quizContentEl = document.getElementById("quiz-content");

const quizQuestionsContainer = document.createElement("div");
const quizQuestionsAnswers = document.createElement("div");

const submitButton = document.createElement("button");
const nextButton = document.createElement("button");

const optionLetters = ["A", "B", "C", "D"];

let allQuestions = [];

let currentQuestionIdx = 0;
let currentUserAnswer = "";

let numberOfCorrect = 0;

const removePreviousContent = () => {
    quizTitleEL.innerHTML = "";
    quizQuestionsAnswers.innerHTML = "";
};

const selectedAnswer = (selected) => {
    const answerButtons = document.querySelectorAll(".answer-buttons");

    answerButtons.forEach((button) => {
        if (button.id === selected) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
};

const setUserAnswer = (evt) => {
    currentUserAnswer = evt.currentTarget.value;
    submitButton.removeAttribute("disabled");
    selectedAnswer(currentUserAnswer);
};

const checkUserAnswer = (correctAnswer) => {
    const correctButton = document.getElementById(correctAnswer);
    const userButton = document.getElementById(currentUserAnswer);
    const correctImg = document.createElement("img");
    const incorrectImg = document.createElement("img");
    correctImg.setAttribute("src", "assets/images/icon-correct.svg");
    incorrectImg.setAttribute("src", "assets/images/icon-incorrect.svg");
    if (correctAnswer === currentUserAnswer) {
        userButton.classList.remove("selected");
        userButton.classList.remove("incorrect");
        userButton.classList.add("correct");

        userButton.appendChild(correctImg);
        numberOfCorrect++;
    } else {
        userButton.classList.remove("selected");
        userButton.classList.remove("correct");
        userButton.classList.add("incorrect");

        correctButton.classList.add("correct");

        correctButton.appendChild(correctImg);
        userButton.appendChild(incorrectImg);
    }
    submitButton.remove();
    nextButton.className = "submit__button";
    nextButton.innerText = "Next Question";
    quizQuestionsContainer.appendChild(nextButton);
};

const quizHeader = (icon, title) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const h1 = document.createElement("h1");

    h1.innerText = `${title}`;
    img.setAttribute("src", `${icon}`);
    img.setAttribute("alt", "");

    span.className = `icon__bg ${title.toLowerCase()}__bg`;

    div.setAttribute("id", "header-title");
    div.className = "header__title";

    span.appendChild(img);
    div.appendChild(span);
    div.appendChild(h1);

    quizHeaderEl.prepend(div);
};

const quizTitle = (question, questionNumber, total) => {
    const questionTitleDiv = document.createElement("div");
    const questionTitleH2 = document.createElement("h2");
    const questionTitleSpan = document.createElement("span");
    const progressBarContainer = document.createElement("div");
    const progressBar = document.createElement("div");

    questionTitleSpan.innerText = `Question ${questionNumber + 1} of ${total}`;
    questionTitleH2.innerText = `${question}`;
    progressBar.setAttribute("id", "progress-bar");
    progressBar.className = "question__view--title-progress-bar";
    progressBarContainer.className = "question__view--title-progress-container";
    questionTitleDiv.className = "question__view--title";

    questionTitleH2.prepend(questionTitleSpan);
    progressBarContainer.appendChild(progressBar);

    questionTitleDiv.appendChild(questionTitleH2);
    questionTitleDiv.appendChild(progressBarContainer);

    quizTitleEL.appendChild(questionTitleDiv);

    const progress = ((questionNumber + 1) / total) * 100;
    progressBar.style.width = `${progress}%`;
};

const quizSubmitButton = (answer) => {
    submitButton.className = "submit__button";
    submitButton.innerText = "Submit Answer";
    submitButton.setAttribute("id", "submit-button");
    submitButton.setAttribute("disabled", true);

    submitButton.addEventListener("click", () => checkUserAnswer(answer));
    quizQuestionsContainer.appendChild(submitButton);
};

const quizQuestions = (options) => {
    quizQuestionsContainer.className = "question__view--content";
    quizQuestionsAnswers.className = "question__view--content-answers";

    quizQuestionsContainer.appendChild(quizQuestionsAnswers);

    quizContentEl.appendChild(quizQuestionsContainer);

    options.map((option, idx) => {
        const button = document.createElement("button");
        const span = document.createElement("span");

        span.className = "icon__bg answer__letter";
        span.innerText = `${optionLetters[idx]}`;

        button.className = "answer-buttons";
        button.innerText = `${option}`;
        button.setAttribute("id", option);
        button.setAttribute("value", option);
        button.addEventListener("click", setUserAnswer);

        button.prepend(span);
        quizQuestionsAnswers.appendChild(button);
    });
};

const quizContent = () => {
    const { question, options, answer } = allQuestions[currentQuestionIdx];
    const totalQuestions = allQuestions.length;
    removePreviousContent();
    nextButton.remove();
    quizTitle(question, currentQuestionIdx, totalQuestions);
    quizQuestions(options);
    quizSubmitButton(answer);
};

nextButton.addEventListener("click", () => {
    currentQuestionIdx++;
    currentUserAnswer = "";
    quizContent();
});

const showQuiz = (quizObj) => {
    allQuestions = [...quizObj.questions];
    quizHeader(quizObj.icon, quizObj.title);
    quizContent(allQuestions);
};

export default showQuiz;

// quizContentEl.innerHTML = `
//     <div class="question__view--content">
//         <span
//             id="error-message"
//             class="error__message hidden"
//         >
//             <img
//                 src="assets/images/icon-error.svg"
//                 alt=""
//             />
//             Please select an answer
//         </span>
//     </div>
// `;
