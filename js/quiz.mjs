import showResults from "./results.mjs";

const quizHeaderEl = document.getElementsByTagName("header")[0];
export const quizTitleEL = document.getElementById("quiz-title");
export const quizContentEl = document.getElementById("quiz-content");

const quizQuestionsContainer = document.createElement("div");
const quizQuestionsAnswers = document.createElement("div");

const correctImg = document.createElement("img");
const incorrectImg = document.createElement("img");

const errorSpan = document.createElement("span");

const nextButton = document.createElement("button");
const resultsButton = document.createElement("button");

const optionLetters = ["A", "B", "C", "D"];

let quizObject;
let allQuestions = [];

let currentQuestionIdx = 0;
let currentUserAnswer = "";

let numberOfCorrect = 0;

export const removeElements = (parent) => {
    if (parent && parent.children.length > 1) {
        for (let i = parent.children.length - 1; i > 0; i--) {
            parent.removeChild(parent.children[i]);
        }
    }
};

const selectedAnswer = (selected) => {
    const answerButtons = document.querySelectorAll(".answer-buttons");

    answerButtons.forEach((button) => {
        button.classList.remove("correct");
        button.classList.remove("incorrect");
        if (button.id === selected) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
};

const setUserAnswer = (evt) => {
    const submitButton = document.getElementById("submit-button");
    currentUserAnswer = evt.currentTarget.value;
    errorSpan.remove();
    submitButton.classList.remove("disabled");
    selectedAnswer(currentUserAnswer);
};

const checkUserAnswer = (evt) => {
    const submitValue = evt.currentTarget.value;
    const correctButton = document.getElementById(submitValue);
    const userButton = document.getElementById(currentUserAnswer);
    correctImg.setAttribute("src", "assets/images/icon-correct.svg");
    incorrectImg.setAttribute("src", "assets/images/icon-incorrect.svg");

    userButton.classList.remove("selected");

    if (submitValue === currentUserAnswer) {
        userButton.classList.add("correct");

        userButton.appendChild(correctImg);
        numberOfCorrect += 1;
    } else {
        userButton.classList.add("incorrect");

        correctButton.classList.add("correct");

        correctButton.appendChild(correctImg);
        userButton.appendChild(incorrectImg);
    }

    if (currentQuestionIdx + 1 < allQuestions.length) {
        nextButton.className = "submit__button";
        nextButton.innerText = "Next Question";
        quizQuestionsContainer.appendChild(nextButton);
    } else {
        resultsButton.className = "submit__button";
        resultsButton.innerText = "Show Results";
        quizQuestionsContainer.appendChild(resultsButton);
    }
};

const quizHeader = (icon, title) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const h1 = document.createElement("h1");

    h1.innerText = title;
    img.setAttribute("src", icon);
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
    questionTitleH2.innerText = question;
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

const showError = () => {
    const img = document.createElement("img");
    img.setAttribute("src", "assets/images/icon-incorrect.svg");

    errorSpan.setAttribute("id", "error-message");
    errorSpan.className = "error__message";
    errorSpan.innerText = "Please select an answer";

    errorSpan.prepend(img);

    quizQuestionsContainer.appendChild(errorSpan);
};

const quizSubmitButton = (answer) => {
    const button = document.createElement("button");
    button.className = "submit__button disabled";
    button.innerText = "Submit Answer";
    button.setAttribute("id", "submit-button");
    button.setAttribute("value", answer);
    button.addEventListener("click", (e) => {
        if (!currentUserAnswer) {
            showError();
        } else {
            button.remove();
            checkUserAnswer(e);
        }
    });
    quizQuestionsContainer.appendChild(button);
};

const quizQuestions = (options) => {
    quizQuestionsContainer.setAttribute("id", "content");
    quizQuestionsContainer.className = "question__view--content";
    quizQuestionsAnswers.className = "question__view--content-answers";

    quizQuestionsContainer.appendChild(quizQuestionsAnswers);

    quizContentEl.appendChild(quizQuestionsContainer);

    quizQuestionsAnswers.innerHTML = "";

    options.map((option, idx) => {
        const button = document.createElement("button");
        const span = document.createElement("span");

        span.className = "icon__bg answer__letter";
        span.innerText = `${optionLetters[idx]}`;

        button.className = "answer-buttons";
        button.innerText = option;
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
    removeElements(quizTitleEL);
    removeElements(quizContentEl);
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

resultsButton.addEventListener("click", () => {
    removeElements(quizTitleEL);
    removeElements(quizContentEl);
    quizQuestionsAnswers.innerHTML = "";
    resultsButton.remove();
    showResults(quizObject, numberOfCorrect);
    numberOfCorrect = 0;
    currentQuestionIdx = 0;
    currentUserAnswer = "";
});

const showQuiz = (quizObj) => {
    allQuestions = [...quizObj.questions];
    quizObject = quizObj;
    quizHeader(quizObj.icon, quizObj.title);
    quizContent(allQuestions);
};

export default showQuiz;
