import setTheme from "./theme.mjs";

document.addEventListener("input", (e) => {
    if (e.target.matches("#theme")) {
        setTheme();
    }
});
