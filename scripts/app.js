function init() {

  console.log('linked')

  const grid = document.querySelector('.grid')
  const lives = document.querySelector('#livesNum')
  const score = document.querySelector('#scoreNum')

  const beePic = document.createElement('img')
  beePic.src = 'assets/bee2.gif'
  beePic.setAttribute('class', 'beeImage')

  const waspPic = document.createElement('img')
  waspPic.setAttribute('class', 'waspImage')
  waspPic.src = 'assets/angry_wasp.gif'

  const timeCheck = new Date()
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
  let scrollTimer = 200
  let gravityTimer = 550
  let gravity = 0
  const endColumnsUpper = []
  let plantHeights = []
  let currentLives = 3

  let currentScore = 0
  score.innerText = currentScore

  const beeStartingPosition = width * (height / 4) + 2
  let beeCurrentPosition = width * (height / 4) + 2

  const obstacleOneStartingPosition = width * height - 1
  let obstacleOneCurrentPosition = width * height - 1

  const flowerStartingPosition = obstacleOneCurrentPosition - (width * 2)
  let flowerCurrentPosition = obstacleOneCurrentPosition - (width * 2)

  let waspStartingPosition = width * height
  let waspCurrentPosition = waspStartingPosition


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
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
    // cells[(position) - width].style.transform = 'scaleX(-1)'
    // cells[position].appendChild(obstaclePic1)
  }

  function removeObstacle(position) {
    cells[obstacleOneCurrentPosition].classList.remove(obstacleClass)
    cells[obstacleOneCurrentPosition - width].classList.remove(obstacleClass)
    // cells[obstacleOneCurrentPosition - width].style.transform = 'none'

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
    // collisionDetectionNav()
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
    console.log('DELAY IN HOLD>>>>', new Date().getMilliseconds())
    addBee(beeCurrentPosition)
  }

  // * nav collision detection isn't checking until key press - need to figure out a way to get the nav 

  const scrolling = setInterval(() => {
    // collisionDetectionScroll()
    removeObstacle()
    removeFlower()
    if (obstacleOneCurrentPosition % width !== 0) {
      obstacleOneCurrentPosition--
      flowerCurrentPosition--
      addObstacle(obstacleOneCurrentPosition)
      addFlower(flowerCurrentPosition)
    }
    // console.log(Math.floor(Math.random() * 5) * 1000)
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
      if ((beeCurrentPosition + width) < (width * height)) {
        beeCurrentPosition += width
        addBee(beeCurrentPosition)
      } else {
        console.log('BANG FLOOR')
        currentLives--
        console.log('LIVES>>>', currentLives)
        gameOver()
      }
      console.log(beeCurrentPosition)

    }, gravityTimer)
  }


  const waspFlying = setInterval(() => {
    // collisionDetectionScroll()
    removeWasp()
    if (waspCurrentPosition % width !== 0) {
      waspCurrentPosition--
      addWasp(waspCurrentPosition)
    } else {
      generateWasp()
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


  // const collisionCheck = setInterval(() => {
  //   if (cells[beeCurrentPosition].classList.contains(waspClass) || cells[beeCurrentPosition + 1].classList.contains(waspClass) || cells[beeCurrentPosition - width].classList.contains(waspClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(waspClass)) {
  //     console.log('BANG WASP')
  //     currentLives--
  //     console.log('LIVES>>>', currentLives)
  //     clearInterval(collisionCheck)
  //     setTimeout(1000)
  //   }
  //   if (cells[beeCurrentPosition].classList.contains(obstacleClass) || cells[beeCurrentPosition + 1].classList.contains(obstacleClass) || cells[beeCurrentPosition - width].classList.contains(obstacleClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(obstacleClass)) {
  //     console.log('BANG PLANT')
  //     currentLives--
  //     console.log('LIVES>>>', currentLives)
  //     setTimeout(2000)
  //   }

  // }, 75)

  let collisionTimer = null

  function startCollisionCheck() {
    console.log('COLLISION TIMER AT START OF CHECK', collisionTimer)
    console.log('STARTING CHECK')
    if (!collisionTimer) {
      collisionTimer = setInterval(() => {
        console.log('COLLISION TIMER AFTER INITIATION', collisionTimer)
        if (cells[beeCurrentPosition].classList.contains(waspClass) || cells[beeCurrentPosition + 1].classList.contains(waspClass) || cells[beeCurrentPosition - width].classList.contains(waspClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(waspClass)) {
          collisionDetected()
        }
        if (cells[beeCurrentPosition].classList.contains(obstacleClass) || cells[beeCurrentPosition + 1].classList.contains(obstacleClass) || cells[beeCurrentPosition - width].classList.contains(obstacleClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(obstacleClass)) {
          collisionDetected()
        }
      }, 75)
    }
  }

  function collisionDetected() {
    currentLives--
    console.log('LIVES>>>', currentLives)
    console.log('COLLISION DETECTED')
    grid.classList.toggle('collision')
    clearInterval(collisionTimer)
    console.log('COLLISION TIMER AFTER COLLISION', collisionTimer)
    collisionTimer = null
    console.log('COLLISION TIMER SHOULD BE NULL', collisionTimer)
    setTimeout(() => {
      grid.classList.toggle('collision')
      console.log('......AND')
      startCollisionCheck()
    }, 1000)
  }


  function collisionCheck() {
    startCollisionCheck()
    //   if (cells[beeCurrentPosition].classList.contains(obstacleClass) || cells[beeCurrentPosition + 1].classList.contains(obstacleClass) || cells[beeCurrentPosition - width].classList.contains(obstacleClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(obstacleClass)) {
    //     console.log('BANG PLANT')
    //     currentLives--
    //     console.log('LIVES>>>', currentLives)
    //     setTimeout(2000)
    //   }

    // }, 75)
  }

  collisionCheck()

  function gameOver() {
    console.log('GAME OVER')
    clearInterval(gravity)
    // window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)
}

window.addEventListener('DOMContentLoaded', init)