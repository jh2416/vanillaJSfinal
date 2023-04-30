const addToday = document.querySelector(".addToday");
const todayInput = document.querySelector(".addToday input");
const todayList = document.querySelector(".todoList_today ul");

const addTommorw = document.querySelector(".addTommorow");
const tommorowInput = document.querySelector(".addTommorow input");
const tommorwList = document.querySelector(".todoList_tommorow ul");

function getDateFn() {
  const date = new Date();
  const d = date.getDate();
  return d;
}

function deleteTodo(event, day) {
  const li = event.target.parentNode;
  const thing = li.childNodes[0].innerText;
  let store;
  if (day === "today") {
    store = "todo-today";
    todayList.removeChild(li);
  } else {
    store = "todo-tommorow";
    tommorwList.removeChild(li);
  }
  let cleantoDoList = JSON.parse(localStorage.getItem(store));
  const idx = cleantoDoList.indexOf(thing);
  cleantoDoList.splice(idx, 1);
  console.log(cleantoDoList);
  localStorage.setItem(store, JSON.stringify(cleantoDoList));
}

function makeTodo(data, day) {
  const li = document.createElement("li");
  const text = document.createElement("span");
  text.innerText = data;
  const delbtn = document.createElement("button");
  delbtn.addEventListener("click", function (event) {
    deleteTodo(event, day);
  });
  delbtn.innerText = "❌";
  if (day === "today") {
    todayList.appendChild(li);
    li.appendChild(text);
    li.appendChild(delbtn);
  } else {
    tommorwList.appendChild(li);
    li.appendChild(text);
    li.appendChild(delbtn);
  }
}

function saveTodo(data, day) {
  let store;
  if (day === "today") {
    store = "todo-today";
  } else {
    store = "todo-tommorow";
  }
  todoList = JSON.parse(localStorage.getItem(store));
  todoList.push(data);
  localStorage.setItem(store, JSON.stringify(todoList));
  todayInput.value = "";
  tommorowInput.value = "";
}

function getValue(event, day) {
  const d = getDateFn();
  localStorage.setItem("date", d);
  event.preventDefault();
  let todoValue;
  if (day === "today") {
    todoValue = todayInput.value;
  } else {
    todoValue = tommorowInput.value;
  }
  saveTodo(todoValue, day);
  makeTodo(todoValue, day);
}

function checkTodoList(list, day) {
  if (list) {
    const arr = JSON.parse(list);
    arr.forEach(function (job) {
      makeTodo(job, day);
    });
  } else {
    const arr = [];
    if (day === "today") {
      localStorage.setItem("todo-today", JSON.stringify(arr));
    } else {
      localStorage.setItem("todo-tommorow", JSON.stringify(arr));
    }
  }
}

function init() {
  const getTodayList = localStorage.getItem("todo-today");
  const getTommorwList = localStorage.getItem("todo-tommorow");
  const d = getDateFn();
  const last_d = localStorage.getItem("date");
  if (d !== last_d * 1) {
    checkTodoList(getTommorwList, "today");
    const arr = [];
    localStorage.setItem("todo-tommorow", JSON.stringify(arr));
  } else {
    checkTodoList(getTodayList, "today");
    checkTodoList(getTommorwList, "tommorow");
  }

  addToday.addEventListener("submit", function (event) {
    getValue(event, "today");
  });
  addTommorw.addEventListener("submit", function (event) {
    getValue(event, "tommorow");
  });
}

init();
