import setTheme from "./theme.mjs";
import showQuiz from "./quiz.mjs";

const startViewTitleDiv =
    document.getElementsByClassName("start__view--title")[0];
const startViewContentDiv = document.getElementsByClassName(
    "start__view--content"
)[0];

const allButtons = document.querySelectorAll(".quiz-button");

const showHideStartView = (boolean) => {
    if (boolean) {
        startViewTitleDiv.classList.add("hidden");
        startViewContentDiv.classList.add("hidden");
    } else {
        startViewTitleDiv.classList.remove("hidden");
        startViewContentDiv.classList.remove("hidden");
    }
};

const getQuiz = (evt) => {
    const value = evt.currentTarget.value;
    fetch("../data.json")
        .then((res) => res.json())
        .then(({ quizzes }) => {
            showHideStartView(true);
            const [filteredQuiz] = quizzes.filter(
                (quiz) => quiz.title === value
            );
            showQuiz(filteredQuiz);
        })
        .catch((error) => console.error(error));
};

document.addEventListener("input", (e) => {
    if (e.target.matches("#theme")) {
        setTheme();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches("#theme")) {
        setTheme();
    }
});

allButtons.forEach((button) => {
    button.addEventListener("click", getQuiz);
});
