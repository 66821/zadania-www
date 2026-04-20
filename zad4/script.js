const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleSkillsBtn");
const skillsSection = document.getElementById("skillsSection");

const themeLink = document.getElementById("themeStylesheet");

let isGreen = false;


themeBtn.addEventListener("click", () => {
  if (isGreen) {
    themeLink.href = "red.css";
  } else {
    themeLink.href = "green.css";
  }
  isGreen = !isGreen;
});

toggleBtn.addEventListener("click", () => {
  if (skillsSection.style.display === "none") {
    skillsSection.style.display = "block";
  } else {
    skillsSection.style.display = "none";
  }
});
