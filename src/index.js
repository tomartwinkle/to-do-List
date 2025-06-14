import './styles.css';

const theme = document.querySelector(".changeTheme");
const container = document.querySelector(".container");

let isDark = true;

theme.addEventListener("click", () => {
  if (!isDark) {
    theme.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`;
    isDark = true;
    container.classList.remove("light-theme");
    container.classList.add("dark-theme");
  } else {
    theme.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`;
    isDark = false;
    container.classList.remove("dark-theme");
    container.classList.add("light-theme");
  }
});
const Tasks=[];
function Task(heading,details,deadline,status,label){
    this.heading=heading;
    this.details=details;
    this.deadline=deadline;
    this.status=this.status;
    this.label=label;
};
const addTaskbtn=document.querySelector(".AddTaskBtn");
const taskContainer=document.querySelector(".tasks");
addTaskbtn.addEventListener("click",()=>{
    if(document.querySelector(".form-card")) return;
    const formCard=document.createElement("div");
    formCard.classList.add("form-card");
    formCard.innerHTML=`
    <form id="taskForm">
    <input type="text" id="heading" placeholder="Task Title" required>
    <input type="text" id="details" placeholder="Task Details">
    <input type="datetime-local" id="deadline">
    
    <div class="checkbox-group">
      <input type="checkbox" id="status">
      <label for="status">Completed</label>
    </div>

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

    const taskForm=document.getElementById("taskForm");
    const cancelBtn=document.querySelector(".cancelBtn");

    cancelBtn.addEventListener("click", () => formCard.remove());

    taskForm.addEventListener("submit",function(e){


    const heading=document.querySelector("#heading").value;
    const details=document.querySelector("#details").value;
    const deadline=document.querySelector("#deadline").value;
    const status=document.querySelector("#status").value;
    const label=document.querySelector("#label").value;

    const newTask=new Task(heading,detials,deadline,status,label);
    Tasks.push(newTask);
    console.log(Tasks);
    formCard.remove();
    Tasks.display(newTask);
    });
});
function display(task){
    //display in a card form
};