const circleEl = document.querySelector(".circle");

function init() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    circleEl.style.strokeDashoffset = 180 - (scrollY / maxScrollY) * 180;
  });
}

init();
