const textEl = document.querySelector('h1')

let count = 0

function glitch() {
  setInterval(() => {
    count++

    /* 에러 효과 */
    textEl.style.setProperty('--topBefore', `${Math.random() * 100}%`)
    textEl.style.setProperty('--bottomBefore', `${Math.random() * 100}%`)
    textEl.style.setProperty('--topAfter', `${Math.random() * 100}%`)
    textEl.style.setProperty('--bottomAfter',`${Math.random() * 100}%`)

    /* 기울기 */
    textEl.style.setProperty('--skew', `${Math.random() * 20 - 10}deg`)

    /* 큰 폭으로 기울기 */
    if (count % 15 === 0) {
      textEl.style.setProperty('--skew', `${Math.random() * 180 - 90}deg`)
      count = 0
    }
  }, 0.1 * 1000)
}

glitch()
