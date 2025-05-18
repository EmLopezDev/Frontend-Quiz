const bodyTag = document.getElementById("body");
const themeCheckbox = document.getElementById("theme");

themeCheckbox.addEventListener("input", () => {
    bodyTag.classList.toggle("darkmode");
});
