/* 내용
 * * 텍스트가 끊김없이 무한으로 흐르기
 *   : 화면의 너비를 초과하는 요소에 텍스트 삽입
 *     동일한 요소를 이어 첨부
 *     translateX(-length) 사용해서 왼쪽으로 흐르기
 *     length를 0부터 끝지점(element.scrollWidth/2)까지 변경
 *     끝지점에 도달한 경우 0으로 변경해 무한으로 흐르게 하기 
 * * 스크롤하면 더 빨리 흐르기
 *   : length에 가중치 더하기
*/

const marqueeText1El = document.querySelector('.marquee_text_1')
const marqueeText2El = document.querySelector('.marquee_text_2')

const text1 = `우리 인생에는 각자가 진짜로 원하는 무언가가 있다. 분명 나만의 다른 길이 있다.`
const text2 = `내 안에는 아직 스스로도 알지 못하고 느끼지 못한 신비와 미지가 너무 많다.`

let length1 = 0
let length2 = 0

function marqueeText(length, element, direction) {
  if(length > element.scrollWidth / 2) {
    element.style.transform = 'translateX(0)'
    length = 0
  }
  element.style.transform = `translateX(${length * direction}px)`
  
  return length
}

function animate() {
  length1++
  length2++

  length1 = marqueeText(length1, marqueeText1El, -1)
  length2 = marqueeText(length2, marqueeText2El, 1)

  window.requestAnimationFrame(animate)
}

function initText(element, text) {
  const textArr = text.split(' ')
  textArr.push(...textArr)
  textArr.map((char) => {
    element.innerText += `${char}\u00a0\u00a0\u00a0\u00a0`
  })
}

function init() {
  initText(marqueeText1El, text1)
  initText(marqueeText2El, text2)
  animate()
}

init()
