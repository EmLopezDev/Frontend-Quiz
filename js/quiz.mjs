const quizHeaderEl = document.getElementsByTagName("header")[0];
const quizTitleEL = document.getElementById("quiz-title");
const quizContentEl = document.getElementById("quiz-content");

const optionLetters = ["A", "B", "C", "D"];

const quizHeader = (icon, title) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const h1 = document.createElement("h1");

    h1.innerText = `${title}`;

    img.setAttribute("src", `.${icon}`);
    img.setAttribute("alt", "");

    span.className = `icon__bg ${title.toLowerCase()}__bg`;

    div.setAttribute("id", "header-title");
    div.className = "header__title";

    span.appendChild(img);
    div.appendChild(span);
    div.appendChild(h1);

    quizHeaderEl.prepend(div);
};

const quizContent = (questions) => {
    const currentQuestion = questions[0];
    quizTitleEL.innerHTML = `
        <div class="question__view--title">
            <h2>
                <span>Question 1 of ${questions.length}</span>
                ${currentQuestion.question}
            </h2>
            <div class="question__view--title-progress-container">
                <span
                    id="progress-bar"
                    class="question__view--title-progress-bar"
                ></span>
            </div>
        </div>
    `;
    quizContentEl.innerHTML = `
        <div class="question__view--content">
            <div class="question__view--content-answers">
            ${currentQuestion.options
                .map(
                    (option, idx) => `
                    <button id=${optionLetters[idx]} class="answer-buttons">
                    <span class="icon__bg answer__letter">${optionLetters[idx]}</span>
                    ${option}
                    </button>`
                )
                .join("")}
            </div>
            <button
                id="submit-button"
                class="submit__button"
                disabled
            >
                Submit Answer
            </button>
            <span
                id="error-message"
                class="error__message hidden"
            >
                <img
                    src="assets/images/icon-error.svg"
                    alt=""
                />
                Please select an answer
            </span>
        </div>
    `;
};

const showQuiz = (quizObj) => {
    quizHeader(quizObj.icon, quizObj.title);
    quizContent(quizObj.questions);
};

export default showQuiz;
