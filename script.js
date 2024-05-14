// Info date
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

const addNewTask = (event) => {
  event.preventDefault();
  const { value } = event.target.taskText;
  if (!value) return;
  const task = document.createElement("article");
  task.classList.add("task", "roundBorder");
  //task.addEventListener("click", changeTaskState);
  // task.textContent = value;
  // tasksContainer.prepend(task);

  const task1 = document.createElement("div");
  task1.classList.add("taskComent", "roundBorder");
  task1.addEventListener("click", changeTaskState);
  task1.textContent = value;
  task.prepend(task1);

  const task2 = document.createElement("div");
  task2.classList.add("taskNum", "roundBorder");
  task2.textContent = 1;
  task.prepend(task2);

  const taskModNum = document.createElement("article");
  taskModNum.classList.add("taskModNum", "roundBorder");
  task.prepend(taskModNum);

  const taskSum = document.createElement("div");
  taskSum.classList.add("taskSum", "roundBorder");
  taskSum.addEventListener("click", sumaNum);
  taskSum.textContent = "+";
  taskModNum.prepend(taskSum);

  const taskRes = document.createElement("div");
  taskRes.classList.add("taskRes", "roundBorder");
  taskRes.addEventListener("click", restaNum);
  taskRes.textContent = "-";
  taskModNum.prepend(taskRes);

  tasksContainer.prepend(task);

  event.target.reset();
};

const changeTaskState = (event) => {
  event.target.classList.toggle("done");
  const $task = event.target.closest(".task");
  $task.querySelector(".taskNum").classList.toggle("done");
  $task.querySelector(".taskRes").classList.toggle("done");
  $task.querySelector(".taskSum").classList.toggle("done");
  $task.classList.toggle("doneTask");
};

const sumaNum = (event) => {
  ModificaNum(event, 1);
};
const restaNum = (event) => {
  ModificaNum(event, -1);
};
function ModificaNum(event, valor) {
  const $task = event.target.closest(".task"),
    $num = $task.querySelector(".taskNum");
  if ($task.classList.contains("doneTask")) {
    return;
  }
  let cant = parseInt($num.innerText) + valor;

  if (cant < 0) {
    cant = 0;
  }
  $num.innerHTML = cant;
}

const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("doneTask") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};

const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
};

setDate();
