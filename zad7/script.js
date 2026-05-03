const projectInput = document.getElementById("projectInput");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectsList = document.getElementById("projectsList");
const infoMessage = document.getElementById("infoMessage");

function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function showProjects() {
  const projects = getProjects();

  projectsList.innerHTML = "";

  projects.forEach(function (project, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = project;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
      deleteProject(index);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    projectsList.appendChild(li);
  });
}

function addProject() {
  const projectName = projectInput.value.trim();

  if (projectName === "") {
    infoMessage.textContent = "Wpisz nazwę projektu.";
    infoMessage.className = "error";
    return;
  }

  const projects = getProjects();

  projects.push(projectName);
  saveProjects(projects);

  projectInput.value = "";
  infoMessage.textContent = "Projekt został dodany i zapisany w localStorage.";
  infoMessage.className = "success";

  showProjects();
}

function deleteProject(index) {
  const projects = getProjects();

  projects.splice(index, 1);
  saveProjects(projects);

  infoMessage.textContent = "Projekt został usunięty.";
  infoMessage.className = "success";

  showProjects();
}

addProjectBtn.addEventListener("click", addProject);

projectInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addProject();
  }
});

showProjects();
