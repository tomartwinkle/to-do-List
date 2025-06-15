import './styles.css';

const theme = document.querySelector(".changeTheme");
const container = document.querySelector(".container");

let isDark = true;

theme.addEventListener("click", () => {
  isDark = !isDark;
  theme.innerHTML = `<span class="material-symbols-outlined">${isDark ? 'dark_mode' : 'light_mode'}</span>`;
  container.classList.toggle("light-theme", !isDark);
  container.classList.toggle("dark-theme", isDark);
});

const Tasks = [];
function Task(heading, details, deadline, status = false, label) {
  this.heading = heading;
  this.details = details;
  this.deadline = deadline;
  this.status = status;
  this.label = label;
}

const Projects = {
  Default: [],
  Completed: []
};
let currentProject = "Default";

const addTaskbtn = document.querySelector(".AddTaskBtn");
const taskContainer = document.querySelector(".tasks");
const addProjectBtn = document.querySelector(".AddProjectBtn");
const projectsContainer = document.querySelector(".projectsContainer");

addTaskbtn.addEventListener("click", () => {
  if (document.querySelector(".form-card")) return;

  const formCard = document.createElement("div");
  formCard.classList.add("form-card");
  formCard.innerHTML = `
    <form id="taskForm">
      <input type="text" id="heading" placeholder="Task Title" required>
      <input type="text" id="details" placeholder="Task Details">
      <input type="datetime-local" id="deadline">
      <select id="label">
        <option value="Important">Important</option>
        <option value="Not Important">Not Important</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div class="form-actions">
        <button type="submit">Add</button>
        <button type="button" class="cancelBtn">Cancel</button>
      </div>
    </form>
  `;
  taskContainer.prepend(formCard);

  const taskForm = document.getElementById("taskForm");
  const cancelBtn = document.querySelector(".cancelBtn");

  cancelBtn.addEventListener("click", () => formCard.remove());

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const heading = document.querySelector("#heading").value;
    const details = document.querySelector("#details").value;
    const deadline = document.querySelector("#deadline").value;
    const label = document.querySelector("#label").value;

    const newTask = new Task(heading, details, deadline, false, label);
    Tasks.push(newTask);
    Projects[currentProject].push(newTask);
    display(newTask);
    formCard.remove();
  });
});

function display(task) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <header class="labelColor">
      <span class="material-symbols-outlined check_circle">check_circle</span>
    </header>
    <h2>${task.heading}</h2>
    <p>${task.details}</p>
    <p>Deadline: ${task.deadline}</p>
    <p>Status: ${task.status ? "Completed" : "Incomplete"}</p>
    <p>${task.label}</p>
    <div class="align-buttons">
      <button class="completedBtn">completed</button>
      <button class="removeBtn">delete</button>
    </div>
  `;

  const headerCard = card.querySelector(".labelColor");
  headerCard.classList.add(task.label.toLowerCase().replace(" ", "-"));

  taskContainer.appendChild(card);

  // Completed button
  const completedBtn = card.querySelector(".completedBtn");
  completedBtn.addEventListener("click", () => {
    task.status = true;
    Projects["Completed"].push(task);
    card.remove();
  });

  // Delete button
  const removeBtn = card.querySelector(".removeBtn");
  removeBtn.addEventListener("click", () => {
    card.remove();
  });

  // Check circle
  const checkCircle = card.querySelector(".check_circle");
  let checked = false;
  checkCircle.addEventListener("click", () => {
    checkCircle.style.backgroundColor = checked ? "transparent" : "green";
    checked = !checked;
  });
}

function renderProject(name) {
  taskContainer.innerHTML = "";
  Projects[name].forEach((task) => display(task));
}

document.querySelector(".project").addEventListener("click", () => {
  currentProject = "Default";
  renderProject("Default");
});

document.querySelector(".completedProjects").addEventListener("click", () => {
  currentProject = "Completed";
  renderProject("Completed");
});

addProjectBtn.addEventListener("click", () => {
  const name = prompt("Project Name:");
  if (!name || Projects[name]) {
    alert("Invalid or duplicate name");
    return;
  }

  Projects[name] = [];

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project");
  projectBtn.textContent = name;
  projectsContainer.appendChild(projectBtn);

  projectBtn.addEventListener("click", () => {
    currentProject = name;
    renderProject(name);
  });
});
