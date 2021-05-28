function init() {

  console.log('linked')
  const grid = document.querySelector('.grid')

  const width = 20
  const height = 10
  const cellCount = width * height
  const cells = []
  const beeClass = 'bee'
  const waspClass = 'wasp'
  const obstacleClass = 'obstacle'
  let scrollTimer = 300
  let gravityTimer = 300
  let gravity = 0
  let endColumns = []

  const beeStartingPosition = 100
  let beeCurrentPosition = 100

  const obstacleOneStartingPosition = 199
  let obstacleOneCurrentPosition = 199

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let j = width - 1; j < (width * height); j += width) {
      endColumns.push(j)
      console.log(endColumns)
    }

    addBee(beeStartingPosition)
    addObstacle(obstacleOneStartingPosition)
    // addObstacle(obstacleOneStartingPosition - width)
    // addObstacle(obstacleOneStartingPosition - (width * 2))

  }

  createGrid()
  applyGravity()

  function addBee(position) {
    cells[position].classList.add(beeClass)
    // cells[position + 1].classList.add('around')
  }

  function removeBee(position) {
    cells[beeCurrentPosition].classList.remove(beeClass)
    // cells[beeCurrentPosition+ 1].classList.remove('around')

  }

  function addObstacle(position) {
    cells[position].classList.add(obstacleClass)
  }

  function removeObstacle(position) {
    cells[obstacleOneCurrentPosition].classList.remove(obstacleClass)
  }

  function navigate(event) {
    const key = event.code
    console.log(key)
    collisionDetectionNav()
    removeBee()
    if (key === 'ArrowUp' && beeCurrentPosition >= width) {
      if (cells[beeCurrentPosition - width].classList.contains(obstacleClass)) {
        gameOver()
      } else {
        beeCurrentPosition -= width
        resetGravityTimer()

      }
    } else if (key === 'ArrowRight' && beeCurrentPosition % width !== width - 1) {
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
      clearInterval(scrolling, gravity)
    }
    console.log(beeCurrentPosition)
    addBee(beeCurrentPosition)
  }

  // * nav collision detection isn't checking until key press - need to figure out a way to get the nav 

  const scrolling = setInterval(() => {
    collisionDetectionScroll()
    removeObstacle()
    if (obstacleOneCurrentPosition % width !== 0) {
      obstacleOneCurrentPosition--
      addObstacle(obstacleOneCurrentPosition)
    }
    console.log(obstacleOneCurrentPosition)
  }, scrollTimer)

  function applyGravity() {
    gravity = setInterval(() => {
      removeBee()
      if (beeCurrentPosition + width <= (width * height) - 1) {
        beeCurrentPosition += width
      }
      addBee(beeCurrentPosition)

    }, gravityTimer)
  }

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
    window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)
}

window.addEventListener('DOMContentLoaded', init)