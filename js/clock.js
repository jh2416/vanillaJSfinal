const clockContainer = document.querySelector(".dateAndClock");
const clockTitle = clockContainer.querySelector(".clock");
const today_date = clockContainer.querySelector(".date");

function get_date() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const day_of_week = getDayOfWeek(date.getDay());
  today_date.innerText = year + "." + month + "." + day + "   " + day_of_week;
}

function getDayOfWeek(num) {
  day_of_week = ["일", "월", "화", "수", "목", "금", "토"];
  return day_of_week[num] + "요일";
}

function get_time() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  let seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  get_time();
  get_date();
  setInterval(get_time, 1000);
}

init();
