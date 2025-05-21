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

const quizTitle = (question, questionNumber, total) => {
    const questionTitleDiv = document.createElement("div");
    const questionTitleH2 = document.createElement("h2");
    const questionTitleSpan = document.createElement("span");
    const progressBarContainer = document.createElement("div");
    const progressBar = document.createElement("div");

    questionTitleSpan.innerText = `Question ${questionNumber} of ${total}`;
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

    const progress = (questionNumber / total) * 100;
    progressBar.style.width = `${progress}%`;
};

const quizQuestions = (options) => {
    const quizQuestionsContainer = document.createElement("div");
    const quizQuestionsAnswers = document.createElement("div");

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

        button.prepend(span);
        quizQuestionsAnswers.appendChild(button);
    });

    // quizContentEl.innerHTML = `
    //     <div class="question__view--content">
    //         <button
    //             id="submit-button"
    //             class="submit__button"
    //             disabled
    //         >
    //             Submit Answer
    //         </button>
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
};

const quizContent = (questions) => {
    const currentQuestionIdx = 1;
    const currentQuestion = questions[currentQuestionIdx].question;
    const currentQuestionOptions = questions[currentQuestionIdx].options;
    const totalQuestions = questions.length;
    quizTitle(currentQuestion, currentQuestionIdx, totalQuestions);
    quizQuestions(currentQuestionOptions);
};

const showQuiz = (quizObj) => {
    quizHeader(quizObj.icon, quizObj.title);
    quizContent(quizObj.questions);
};

export default showQuiz;
