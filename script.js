// Lineas compra
let lista = localStorage.getItem("listaComra") || "";
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

  const str = lista;
  lista = `1,${value},0`;
  if (str.length > 0) {
    lista += "|" + str;
  }

  //lista = [{ cant: 1, desc: value }];
  localStorage.setItem("listaComra", lista);

  creaLinea(value, 1, 0);
  event.target.reset();
};
function creaLinea(value, cant, anulado) {
  const task = document.createElement("article");
  task.classList.add("task", "roundBorder");
  if (anulado === "1") task.classList.add("doneTask");
  //task.addEventListener("click", changeTaskState);
  // task.textContent = value;
  // tasksContainer.prepend(task);

  const task1 = document.createElement("div");
  task1.classList.add("taskComent", "roundBorder");
  if (anulado === "1") task1.classList.add("done");

  task1.addEventListener("click", changeTaskState);
  task1.textContent = value;
  task.prepend(task1);

  const task2 = document.createElement("div");
  task2.classList.add("taskNum", "roundBorder");
  if (anulado === "1") task2.classList.add("done");
  task2.textContent = cant;
  task.prepend(task2);

  const taskModNum = document.createElement("article");
  taskModNum.classList.add("taskModNum", "roundBorder");
  task.prepend(taskModNum);

  const taskSum = document.createElement("div");
  taskSum.classList.add("taskSum", "roundBorder");
  if (anulado === "1") taskSum.classList.add("done");
  taskSum.addEventListener("click", sumaNum);
  taskSum.textContent = "+";
  taskModNum.prepend(taskSum);

  const taskRes = document.createElement("div");
  taskRes.classList.add("taskRes", "roundBorder");
  if (anulado === "1") taskRes.classList.add("done");
  taskRes.addEventListener("click", restaNum);
  taskRes.textContent = "-";
  taskModNum.prepend(taskRes);

  tasksContainer.prepend(task);
}

const changeTaskState = (event) => {
  event.target.classList.toggle("done");
  const $task = event.target.closest(".task");
  $task.querySelector(".taskNum").classList.toggle("done");
  $task.querySelector(".taskRes").classList.toggle("done");
  $task.querySelector(".taskSum").classList.toggle("done");
  $task.classList.toggle("doneTask");
  let lis = lista.split("|");
  let i = obternerLinea($task, lis);
  let lmod = lis[i].split(",");
  lmod[2] = $task.classList.contains("doneTask") ? 1 : 0;

  lis[i] = lmod.toString();
  lista = lis.join("|");
  localStorage.setItem("listaComra", lista);
};

const sumaNum = (event) => {
  ModificaNum(event, 1);
};
const restaNum = (event) => {
  ModificaNum(event, -1);
};
function obternerLinea(task, lis) {
  return lis.indexOf(
    lis.find(
      (elemento) =>
        elemento.indexOf(
          `,${task.querySelector(".taskComent").innerText.toLowerCase()},`
        ) !== -1
    )
  );
}
function ModificaNum(event, valor) {
  const $task = event.target.closest(".task"),
    $num = $task.querySelector(".taskNum");
  if ($task.classList.contains("doneTask")) {
    return;
  }
  let cant = parseInt($num.innerText) + valor;

  let lis = lista.split("|");
  let i = obternerLinea($task, lis);

  if (cant < 0) {
    if (window.confirm("¿Confirma borrar definitvament el producto?")) {
      console.log("Posicion", i);
      if (i > -1) {
        lis.splice(i, 1);
        lista = lis.join("|");
        localStorage.setItem("listaComra", lista);
        $task.remove();
        return;
      }
    } else {
      cant = 0;
      return;
    }
  }
  $num.innerHTML = cant;
  let lmod = lis[i].split(",");
  lmod[0] = cant;

  lis[i] = lmod.toString();
  lista = lis.join("|");

  localStorage.setItem("listaComra", lista);
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

function pintaLista() {
  if (lista.length === 0) return;
  lista.split("|").forEach((el) => {
    console.log(el);
    const item = el.split(",");
    creaLinea(item[1], item[0], item[2]);
  });
}

setDate();
pintaLista();
