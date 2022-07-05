/* 내용
 * * 카드 위의 상대적인 마우스 위치 구하기
 *   : 카드의 위치 정보는 getBoundingClientRect 함수 이용
 *     마우스의 실시간 좌표는 마우스 무브 이벤트 객체의 clientX, clientY 이용
 *     left = clientX - x
 *     top = clientY - y
 * * 카드의 중앙점 기준으로 마우스 위치 구하기
 *   : leftFromCenter = left - (width / 2)
 *     topFromCenter = top - (height / 2)
 * * 중심에서 멀리 떨어질 수록 더 기울이기 위해 각도 구하기
 *   : degree = Math.sqrt(topFromCenter**2 + leftFromCenter**2)
 * * 기울이기 
 *   : rotate3d 이용
 *     한자리수의 x,y 좌표로 나오도록 값 수정
 *     중심에서 멀리 떨어질 수록 더 기울이기 위해 각도는 거리에 의존
 *     rotate((-topFromCenter / 100), (leftFromCenter / 100), 0, (degree)deg)
 * * 그라디언트 빛 효과 주기
 *   : background-iamge에 radial-gradient 사용
 * * 그림자 주기
 *   : box-shadow 이용
*/

const wrapperEl = document.querySelector('.wrapper')
const cardEl = document.querySelector('.card')
const lightEl = document.querySelector('.light')

function handleMouseEnter() {
  wrapperEl.addEventListener('mousemove', handleMouseMove)
} 

function handleMouseMove(e) {
  const {x, y, width, height } = wrapperEl.getBoundingClientRect()
  
  /* 카드 위의 상대적인 마우스 위치 구하기 */
  const left = e.clientX - x
  const top = e.clientY - y

  /* 카드의 중앙점 기준으로 마우스 위치 구하기 */
  const leftFromCenter = left - (width / 2)
  const topFromCenter = top - (height / 2)

  /* 중심에서 멀리 떨어질 수록 더 기울이기 위해 각도 구하기 */
  const degree = Math.sqrt(leftFromCenter**2 + topFromCenter**2)

  /* 기울이기  */
  cardEl.style.setProperty(
    'transform', 
    `rotate3d(${-1 * topFromCenter / 100}, ${leftFromCenter / 100}, 0, ${degree / 10}deg)`
  )

  /* 그라디언트 빛 효과 주기 */
  lightEl.style.setProperty(
    'background-image', 
    `radial-gradient(circle at ${left}px ${top}px, #00000010, #ffffff00, #ffffff70)`
  )

  /* 그림자 주기 */
  cardEl.style.setProperty(
    'box-shadow',
    `${-1 * leftFromCenter / 7}px ${-1 * topFromCenter / 7}px 10px rgba(0, 0, 0, 0.1)`
  )
}

function handleMouseLeave() {
  /* 초기화 */
  wrapperEl.removeEventListener('mousemove', handleMouseMove)
  cardEl.style.setProperty('transform', 'initial')
  cardEl.style.setProperty('box-shadow', 'initial')
  lightEl.style.setProperty('background-image', 'initial')
}

function initEvent() {
  wrapperEl.addEventListener('mouseenter', handleMouseEnter)
  wrapperEl.addEventListener('mouseleave', handleMouseLeave)
}

initEvent()