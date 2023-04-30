const initScreen = document.querySelector(".initialize");
const mainScreen = document.querySelector(".header");
const todo = document.querySelector(".todo");

const getname = document.querySelector(".getName");
const input = getname.querySelector("input");
const greeting = document.querySelector(".greeting");

const storeName = localStorage.getItem("username");

function showContent() {
  initScreen.classList.remove("showing");
  mainScreen.classList.add("showing");
  todo.classList.add("showing");
  greeting.innerText = `Hello, ${storeName}!`;
}

function getNamefn(event) {
  const name = input.value;
  event.preventDefault();
  localStorage.setItem("username", name);
  showContent();
}

if (getname) {
  getname.addEventListener("submit", getNamefn);
}

function init() {
  if (storeName) {
    showContent();
  }
}

init();
