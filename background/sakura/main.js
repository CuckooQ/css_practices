const canvasEl = document.querySelector('canvas')
const ctx = canvasEl.getContext('2d')
const totalPetalCount = 100
let petalImg
let petals

/* 클래스 영역 */
class Petal {
  constructor() {
    /** 
     * 꽃잎 위치 
     * x: 0 ~ 캔버스 너비
     * y: 캔버스 2배 위 ~ 캔버스 가장 밑
     */
    this.x = Math.random() * canvasEl.width
    this.y = Math.random() * canvasEl.height * 2 - canvasEl.height

    /** 
     * 꽃잎 크기 
     * 너비: 30 ~ 45
     * 높이: 20 ~ 30
     */
    this.width = 30 + Math.random() * 15
    this.height = 20 + Math.random() * 10

    /**
     * 원근 거리
     * : 크기에 따라 0.6 ~ 1
     */
    this.opacity = this.width / 45

    /**
     * 낙하 속도
     * x: 1 ~ 2
     * y: 1 ~ 1.5
     */
    this.xSpeed = 1 + Math.random()
    this.ySpeed = 1 + Math.random() * 0.5

    /**
     * 흔들림 효과
     * 초기값: 0 ~ 1
     * 변동값: 0 ~ 0.03 
     */
    this.flip = Math.random()
    this.flipSpeed = Math.random() * 0.03
  }

  draw() {
    /* 꽃잎의 위치가 캔버스를 벗어난 경우 꽃잎의 위치와 속도, 흔들림 초기화 */
    if(this.x > canvasEl.width || this.y > canvasEl.height) {
      this.x = -1 * petalImg.width
      this.y = Math.random() * canvasEl.height * 2 - canvasEl.height
      this.xSpeed = 1 + Math.random()
      this.ySpeed = 1 + Math.random() * 0.5
      this.flip = Math.random()
    }
    
    /* 원근거리 부여 */
    ctx.globalAlpha = this.opacity

    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.width * (0.66 + Math.abs(Math.cos(this.flip)) / 3),
      this.height * (0.8 + Math.abs(Math.sin(this.flip)) / 2),
    )
  }

  animate() {
    /* 움직임과 흔들림 효과 */
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}

/* 함수 영역 */
function render() {
  /* 캔버스를 지우고 다시 그리기 반복 */
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
  petals.forEach(petal => petal.animate())
  window.requestAnimationFrame(render)
}

function initPetal() {
  petals = Array.from({length: totalPetalCount}, () => new Petal())
  render()
}

function initImage() {
  petalImg = new Image()
  petalImg.src = './petal.png'
  petalImg.onload = () => initPetal()
}

function setCanvasSize() {
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
}

function handleResize() {
  setCanvasSize()
}

function initEvent() {
  window.addEventListener('resize', handleResize)
}

function init() {
  setCanvasSize()
  initEvent()
  initImage()
}

init()
