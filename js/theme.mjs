const bodyTag = document.getElementById("body");
const themeCheckbox = document.getElementById("theme");

let darkmode = localStorage.getItem("darkmode");

const enableDarkmode = () => {
    themeCheckbox.setAttribute("checked", true);
    bodyTag.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
    themeCheckbox.removeAttribute("checked");
    bodyTag.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

const setTheme = () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
};

export default setTheme;
