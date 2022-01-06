const transitionBtnEl = document.querySelector("button");
const transitionScreenEl = document.querySelector(".transition");

function load() {
  transitionScreenEl.classList.add("active");
}

function init() {
  transitionBtnEl.addEventListener("click", () => {
    load();

    const unloadTimer = setTimeout(() => {
      (function unload() {
        transitionScreenEl.classList.remove("active");
        transitionScreenEl.classList.add("inactive");
        const unloadCompleteTimer = setTimeout(() => {
          (function unloadComplete() {
            transitionScreenEl.classList.remove("inactive");
            clearTimeout(unloadTimer);
            clearTimeout(unloadCompleteTimer);
          })();
        }, 500);
      })();
    }, 1000);
  });
}

init();
