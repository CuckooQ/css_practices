/* 내용
 * * div 버튼 위로 가상요소::after 속성으로 원 그리기
 * * 원의 반지름을, 버튼의 한쪽 끝부터 반대쪽 대각선 끝으로 지정
 *   : 피타고라스 정의 이용, Math.sqrt(w*w + h*h)
 * * 원의 중심을 버튼 내 마우스를 클릭한 위치로 오도록 지정
 *   : 버튼이 relative, 원이 absolute 관계,  
 *     원의 중심으로 오기 위해 left는 { ((마우스의 clientX - 버튼 왼쪽 여백 - 원의 반지름) / 버튼 가로길이) * 100 }%로 지정
 *     원의 중심으로 오기 위해 top은 { ((마우스의 clientY - 버튼 위 여백 - 원의 반지름) / 버튼 세로길이) * 100 }%로 지정
 * * 애니메이션 입히기
*/

const btnEl = document.querySelector('.btn')

const handleClick = (e) => {
  /* 원의 지름을 버튼의 대각선 길이 2배로 지정 */
  const { x, y, width, height } = btnEl.getBoundingClientRect()
  const radius = Math.sqrt(width*width + height*height)
  btnEl.style.setProperty('--diameter', `${radius * 2}px`)

  /* 원의 중심 위치를 클릭한 지점으로 지정 */
  const { clientX, clientY } = e
  const left = `${(clientX - x - radius) / width * 100}%`
  const top = `${(clientY - y - radius) / height * 100}%`
  btnEl.style.setProperty('--left', left)
  btnEl.style.setProperty('--top', top)
 
  /* 애니메이션 지정 */
  btnEl.classList.remove('rippling')
  setTimeout(() => {
    btnEl.classList.add('rippling')
  })
}

function initEvent() {
  btnEl.addEventListener('click', handleClick)
}

initEvent()
