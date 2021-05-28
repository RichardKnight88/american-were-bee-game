function init() {

  console.log('linked')

  const grid = document.querySelector('.grid')
  const lives = document.querySelector('#livesNum')
  const score = document.querySelector('#scoreNum')

  const beePic = document.createElement('img')
  beePic.src = 'assets/bee.gif'
  beePic.setAttribute('class', 'beeImage')

  const waspPic = document.createElement('img')
  waspPic.setAttribute('class', 'waspImage')
  waspPic.src = 'assets/angry_wasp.gif'

  // const flowerPic = document.createElement('img')
  // flowerPic.setAttribute('class', 'flowerImage')

  // const obstaclePic1 = document.createElement('img')
  // obstaclePic1.setAttribute('class', 'obstacleImage')
  // obstaclePic1.src = 'assets/stem2.png'

  

  const width = 25
  const height = 12
  const cellCount = width * height
  const cells = []
  const beeClass = 'bee'
  const waspClass = 'wasp'
  const obstacleClass = 'obstacle'
  const flowerClass = 'flower'
  let scrollTimer = 100
  let gravityTimer = 500
  let gravity = 0
  const endColumnsUpper = []
  let plantHeights = []

  let currentScore = 0
  score.innerText = currentScore

  const beeStartingPosition = width * (height / 2) + 2
  let beeCurrentPosition = width * (height / 2) + 2

  const obstacleOneStartingPosition = width * height - 1
  let obstacleOneCurrentPosition = width * height - 1

  const flowerStartingPosition = obstacleOneCurrentPosition - (width * 2)
  let flowerCurrentPosition = obstacleOneCurrentPosition - (width * 2)

  let waspStartingPosition = width * height
  let waspCurrentPosition = waspStartingPosition


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let j = width - 1; j < (width * (height / 2)); j += width) {
      endColumnsUpper.push(j)
      console.log(endColumnsUpper)
    }

    addBee(beeStartingPosition)
    addObstacle(obstacleOneStartingPosition)
    addFlower(flowerStartingPosition)
    generateWasp()
    addWasp(waspStartingPosition)
    // addObstacle(obstacleOneStartingPosition - width)
    // addObstacle(obstacleOneStartingPosition - (width * 2))

  }

  createGrid()
  applyGravity()

  
  function addBee(position) {
    cells[position].classList.add(beeClass)
    cells[position].appendChild(beePic)
    cells[position + 1].classList.add(beeClass)
    cells[position - width].classList.add(beeClass)
    cells[position - width + 1].classList.add(beeClass)
  }

  function removeBee(position) {
    cells[beeCurrentPosition].classList.remove(beeClass)
    cells[beeCurrentPosition + 1].classList.remove(beeClass)
    cells[beeCurrentPosition - width].classList.remove(beeClass)
    cells[beeCurrentPosition - width + 1].classList.remove(beeClass)
  }

  function addObstacle(position) {
    cells[position].classList.add(obstacleClass)
    cells[(position) - width].classList.add(obstacleClass)
    cells[(position) - width].style.transform = 'scaleX(-1)'
    // cells[position].appendChild(obstaclePic1)
  }

  function removeObstacle(position) {
    cells[obstacleOneCurrentPosition].classList.remove(obstacleClass)
    cells[obstacleOneCurrentPosition - width].classList.remove(obstacleClass)
    cells[obstacleOneCurrentPosition - width].style.transform = 'none'

    // cells[obstacleOneCurrentPosition].removeChild(obstaclePic1)
  }

  function addFlower(position) {
    cells[position].classList.add(flowerClass)
  }

  function removeFlower(position) {
    cells[flowerCurrentPosition].classList.remove(flowerClass)
  }

  function generateWasp() {
    waspStartingPosition = endColumnsUpper[Math.floor(Math.random() * endColumnsUpper.length)]
    console.log('WASP>>>>>', waspStartingPosition)
    waspCurrentPosition = waspStartingPosition
    cells[waspStartingPosition].classList.add(waspClass)
  }

  function addWasp(position) {
    cells[position].classList.add(waspClass)
  }

  function removeWasp(position) {
    cells[waspCurrentPosition].classList.remove(waspClass)
  }

  function navigate(event) {
    const key = event.code
    console.log(key)
    collisionDetectionNav()
    removeBee()

    if (key === 'ArrowUp' && (beeCurrentPosition - width) >= width) {
      if (cells[beeCurrentPosition - width].classList.contains(obstacleClass)) {
        gameOver()
      } else {
        beeCurrentPosition -= width
        resetGravityTimer()
      }

    } else if (key === 'ArrowRight' && (beeCurrentPosition + 1) % width !== width - 1) {
      if (cells[beeCurrentPosition + 1].classList.contains(obstacleClass)) {
        gameOver()
      } else {
        beeCurrentPosition++
        resetGravityTimer()
      }

    } else if (key === 'ArrowDown' && beeCurrentPosition + width <= (width * height) - 1) {
      if (cells[beeCurrentPosition + width].classList.contains(obstacleClass)) {
        gameOver()
      } else {
        beeCurrentPosition += width
        resetGravityTimer()
      }

    } else if (key === 'ArrowLeft' && beeCurrentPosition % width !== 0) {
      if (cells[beeCurrentPosition - 1].classList.contains(obstacleClass)) {
        gameOver()
      } else {
        beeCurrentPosition--
        resetGravityTimer()
      }

    } else if (key === 'Escape') {
      clearInterval(scrolling)
      clearInterval(gravity)
      clearInterval(waspFlying)
    }
    console.log(beeCurrentPosition)
    addBee(beeCurrentPosition)
  }

  // * nav collision detection isn't checking until key press - need to figure out a way to get the nav 

  const scrolling = setInterval(() => {
    collisionDetectionScroll()
    removeObstacle()
    removeFlower()
    if (obstacleOneCurrentPosition % width !== 0) {
      obstacleOneCurrentPosition--
      flowerCurrentPosition--
      addObstacle(obstacleOneCurrentPosition)
      addFlower(flowerCurrentPosition)
    }
    console.log(Math.floor(Math.random() * 5) * 1000)
  }, scrollTimer)


  // let randomTimer = 1000

  // function randomTimeNum() {
  //   randomTimer = Math.floor(Math.random() * 5) * 1000
  // }

  // const randomGeneratorTest = setInterval(() => {
  //   grid.style.backgroundColor = 'red'
  //   setTimeout(() => {
  //     grid.style.backgroundColor = 'skyblue'
  //   },100)
  //   randomTimeNum()
  // }, randomTimer)


  function applyGravity() {
    gravity = setInterval(() => {
      removeBee()
      if (beeCurrentPosition + (width * 2) <= (width * height) - 1) {
        beeCurrentPosition += width
        addBee(beeCurrentPosition)
      } else {
        gameOver()
      }
    }, gravityTimer)
  }


  const waspFlying = setInterval(() => {
    // collisionDetectionScroll()
    removeWasp()
    if (waspCurrentPosition % width !== 0) {
      waspCurrentPosition--
      addWasp(waspCurrentPosition)
    }
  }, scrollTimer * 0.7)


  function resetGravityTimer() {
    clearInterval(gravity)
    applyGravity()
  }

  function collisionDetectionScroll() {
    setTimeout(() => {
      if (cells[obstacleOneCurrentPosition - 1].classList.contains(beeClass) && obstacleOneCurrentPosition % width !== 0) {
        gameOver()
      }
    }, scrollTimer - 20)
  }

  function collisionDetectionNav() {
    if (cells[beeCurrentPosition].classList.contains(obstacleClass)) {
      gameOver()
    }
  }

  function gameOver() {
    console.log('GAME OVER')
    clearInterval(gravity)
    // window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)
}

window.addEventListener('DOMContentLoaded', init)