/**
 * 커스텀 마우스 구현 목록
 * * 위치 설정
 * * 커서 텍스트 설정
 * * 커서 크기 설정
 * * 커서 클릭 
 * * 색상 반전
 */

const mouseCursorEl  = document.getElementById('mouse-cursor')
const mouseCursorStylerEl = mouseCursorEl.children[0]

const ELEMENT_TYPE = {
  CAROUSEL: 'carousel',
  DEFAULT: 'default',
  IMAGE: 'image',
  LINK: 'link',
}
const CURSOR_TEXT_MODE_CLASS_NAME = 'cursor-text-mode'

let cursorX = 0
let cursorY = 0
let cursorName = ''
let cursorScale = 1
let hoveredType = ELEMENT_TYPE.DEFAULT

function handleMouseUp(e) {
  /* 커서 클릭 */
  cursorScale *= 1.25
  mouseCursorStylerEl.style.setProperty('--cursor-scale', cursorScale)
}

function handleMouseDown(e) {
  /* 커서 클릭 */
  cursorScale *= 0.8
  mouseCursorStylerEl.style.setProperty('--cursor-scale', cursorScale)
}

function handleMouseMove(e) {
  /* 마우스 위치 설정 */
  cursorX = e.clientX - mouseCursorEl.offsetWidth / 2
  cursorY = e.clientY - mouseCursorEl.offsetHeight / 2
  mouseCursorEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`

  /* 호버 요소에 따른 동작
   * * 커서 텍스트
   * * 커서 크기 
   */
  const hoveredElementType = e.target.getAttribute('data-cursor') ?? ELEMENT_TYPE.DEFAULT
  if (hoveredType === hoveredElementType) return
  switch (hoveredElementType) {
    case ELEMENT_TYPE.CAROUSEL: {
      hoveredType = ELEMENT_TYPE.CAROUSEL
      cursorName = cursorX < window.innerWidth / 2 ? 'Prev' : 'Next' 
      cursorScale = 5
      !mouseCursorEl.classList.contains(CURSOR_TEXT_MODE_CLASS_NAME) && mouseCursorEl.classList.add(CURSOR_TEXT_MODE_CLASS_NAME)
      break
    }
    case ELEMENT_TYPE.LINK: {
      hoveredType = ELEMENT_TYPE.LINK
      cursorName = e.target.getAttribute('data-name')
      cursorScale = 5
      !mouseCursorEl.classList.contains(CURSOR_TEXT_MODE_CLASS_NAME) && mouseCursorEl.classList.add(CURSOR_TEXT_MODE_CLASS_NAME)
      break
    }
    case ELEMENT_TYPE.IMAGE: {
      hoveredType = ELEMENT_TYPE.IMAGE
      cursorName = ''
      cursorScale = 1
      mouseCursorEl.classList.contains(CURSOR_TEXT_MODE_CLASS_NAME) && mouseCursorEl.classList.remove(CURSOR_TEXT_MODE_CLASS_NAME)
      break
    }
    default:
      hoveredType = ELEMENT_TYPE.DEFAULT
      cursorName = ''
      cursorScale = 1
      mouseCursorEl.classList.contains(CURSOR_TEXT_MODE_CLASS_NAME) && mouseCursorEl.classList.remove(CURSOR_TEXT_MODE_CLASS_NAME)
  }
  mouseCursorStylerEl.style.setProperty('--cursor-scale', cursorScale)
  mouseCursorStylerEl.setAttribute('data-name', cursorName)
}

function initEvent() {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
}

function init() {
  initEvent()
}

init()
