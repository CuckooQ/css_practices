/* 내용
 * * SVG 이미지의 전체 길이를 가진 영역 만들기
 * * 뷰포트의 영역 구하기
 * * 뷰포트가 SVG 영역에 차지하는 비율 구하기 (스크롤 끝에서 좀 더 상위 지점에서 보이게 하기 위해 0.8배로 조정)
 *   : (window.scrollY + window.innerHeight * 0.8 - div.offsetTop) / div.offsetHeight
 * * 차지하는 비율만큼 SVG 이미지 보이기
 *   : length - (length * ratio)
*/

const section1El = document.querySelector('.section1')
const pathNormalEl = section1El.querySelector('.path_normal')
const section2El = document.querySelector('.section2')
const pathReverseEl = section2El.querySelector('.path_reverse')

const pathNormalLen = pathNormalEl.getTotalLength()
const pathReverseLen = pathReverseEl.getTotalLength()

function calcDashOffset(scrollY, element, length) {
  const ratio = (scrollY - element.offsetTop) / element.offsetHeight
  const viewableLen = length - (length * ratio)
  
  if (viewableLen < 0) {
    return 0
  }
  
  if (viewableLen > length) {
    return length
  }

  return viewableLen
}

function handleScroll() {
  const scrollY = window.scrollY + (window.innerHeight * 0.8)
  pathNormalEl.style.strokeDashoffset = calcDashOffset(scrollY, section1El, pathNormalLen)
  pathReverseEl.style.strokeDashoffset = calcDashOffset(scrollY, section2El, pathReverseLen)
}

function initEvent() {
  document.addEventListener('scroll', handleScroll)
}

function initPath() {
  pathNormalEl.style.strokeDasharray = pathNormalLen
  pathNormalEl.style.strokeDashoffset = calcDashOffset(window.scrollY + (window.innerHeight * 0.8), section1El, pathNormalLen)
  pathReverseEl.style.strokeDasharray = pathReverseLen
  pathReverseEl.style.strokeDashoffset = calcDashOffset(window.scrollY + (window.innerHeight * 0.8), section2El, pathReverseLen)
}

function init() {
  initPath()
  initEvent()
}

init()
