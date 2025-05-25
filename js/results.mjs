import { removeElements, quizTitleEL, quizContentEl } from "./quiz.mjs";
import { showHideStartView } from "./main.mjs";

const resultsTitle = () => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");

    span.innerText = "You Scored...";
    h2.innerText = "Quiz completed";
    div.className = "score__view--title";

    h2.appendChild(span);
    div.appendChild(h2);

    quizTitleEL.appendChild(div);
};

const playAgain = () => {
    const headerTitle = document.getElementById("header-title");
    headerTitle.remove();
    removeElements(quizTitleEL);
    removeElements(quizContentEl);
    showHideStartView(false);
};

const resultsContent = (quiz, correctNumber) => {
    const { title, icon, questions } = quiz;
    const quizLength = questions.length;
    const iconTitle = title.toLowerCase();
    const div = document.createElement("div");
    div.className = "score__view--content";
    div.innerHTML = `
        <div class="score__view--content-card">
            <h3>
                <span class="icon__bg ${iconTitle}__bg">
                    <img
                        src=${icon}
                        alt=""
                    />
                </span>
                ${title}
            </h3>
            <span class="score">${correctNumber}</span>
            <span class="out-of">out of ${quizLength}</span>
        </div>
        <button
            id="play-again-button"
            class="submit__button"
        >
            Play Again
        </button>
    `;
    quizContentEl.appendChild(div);
    const playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", playAgain);
};

const showResults = (quiz, numberOfCorrect) => {
    resultsTitle();
    resultsContent(quiz, numberOfCorrect);
};

export default showResults;
