let xPos = 0;

// 각 이미지의 background-position 값 설정 함수
function getBgPos(i) {
  return `${
    100 -
    (gsap.utils.wrap(
      0,
      360,
      gsap.getProperty(".ring", "rotationY") - 180 - i * 36
    ) /
      360) *
      500
  }px 0px`;
}

function dragStart(e) {
  xPos = Math.round(e.clientX);
  gsap.set(".ring", { cursor: "grabbing" });
  window.addEventListener("mousemove", drag);
}

function drag(e) {
  gsap.to(".ring", {
    rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
    onUpdate: () => {
      gsap.set(".img", { backgroundPosition: (i) => getBgPos(i) });
    },
  });

  xPos = Math.round(e.clientX);
}

function dragEnd(e) {
  window.removeEventListener("mousemove", drag);
  gsap.set(".ring", { cursor: "grab" });
}

function init() {
  gsap
    .timeline()
    .set(".ring", {
      rotationY: 180, // 화면 밖에서 보는 시각에서 시차 점프가 발생하도록 초기 rotationY 설정
      cursor: "grab",
    })
    .set(".img", {
      // 각 이미지의 위치 설정 (회전 형식)
      rotateY: (i) => i * -36,
      transformOrigin: "50% 50% 500px",
      z: -500,
      backgroundImage: (i) =>
        "url(https://picsum.photos/id/" + (i + 32) + "/600/400/)",
      backgroundPosition: (i) => getBgPos(i),
      backfaceVisibility: "hidden",
    })
    .from(".img", {
      duration: 1.5,
      y: 200,
      opacity: 0,
      stagger: 0.1,
      ease: "expo",
    })
    .add(() => {
      const imgEls = document.querySelectorAll(".img");
      imgEls.forEach((imgEl) => {
        imgEl.addEventListener("mouseenter", (e) => {
          let current = e.currentTarget;
          gsap.to(".img", {
            opacity: (i, t) => (t == current ? 1 : 0.5),
            ease: "power3",
          });
        });
        imgEl.addEventListener("mouseleave", (e) => {
          gsap.to(".img", { opacity: 1, ease: "power2.inOut" });
        });
      });
    }, "-=0.5");

  window.addEventListener("mousedown", dragStart);
  window.addEventListener("mouseup", dragEnd);
}

init();
