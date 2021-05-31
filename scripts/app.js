function init() {

  console.log('linked')

  const grid = document.querySelector('.grid')
  const livesGraphic = document.querySelectorAll('.honeycomb')
  const lives = document.querySelector('#livesNum')
  const score = document.querySelector('#scoreNum')
  const gameOverCard = document.querySelector('#gameOver')
  const ouch = document.querySelector('#ouch')
  const ding = document.querySelector('#ding')
  // console.log(ouch)
  // console.log(livesGraphic)


  const beePic = document.createElement('img')
  beePic.src = 'assets/bee2.gif'
  beePic.setAttribute('class', 'beeImage')

  const waspPic = document.createElement('img')
  waspPic.setAttribute('class', 'waspImage')
  waspPic.src = 'assets/angry_wasp.gif'

  const timeCheck = new Date()
  // const flowerPic = document.createElement('img')
  // flowerPic.setAttribute('class', 'flowerImage')

  // const plantPic1 = document.createElement('img')
  // plantPic1.setAttribute('class', 'plantImage')
  // plantPic1.src = 'assets/stem2.png'



  const width = 25
  const height = 12
  const cellCount = width * height
  const cells = []
  const beeClass = 'bee'
  const waspClass = 'wasp'
  const plantClass = 'plant'
  const flowerClass = 'flower'
  const acornClass = 'acorn'
  let scrollTimer = 150
  let gravityTimer = 550
  let collisionTimer = null
  let gravity = 0
  const endColumns = []
  const topRow = []
  let plantHeights = [1, 2, 3, 4, 5, 6]
  let currentLives = 3

  let currentScore = 0
  score.innerText = currentScore

  const beeStartingPosition = width * (height / 4) + 2
  let beeCurrentPosition = width * (height / 4) + 2

  let newPlant = null

  let plantOneStartingPosition = []
  let plantOneCurrentPosition = plantOneStartingPosition

  let plantTwoStartingPosition = []
  let plantTwoCurrentPosition = plantTwoStartingPosition

  let flowerStartingPosition = plantOneCurrentPosition - (width * 2)
  let flowerCurrentPosition = plantOneCurrentPosition - (width * 2)

  let waspStartingPosition = width * height
  let waspCurrentPosition = waspStartingPosition

  let acornStartingPosition = width * height
  let acornCurrentPosition = acornStartingPosition


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let j = width - 1; j < width * height; j += width) {
      endColumns.push(j)
      // console.log(endColumns)
    }

    for (let k = 1; k < width; k++) {
      topRow.push(k)
      // console.log(topRow)
    }

    console.log(plantOneCurrentPosition)
    console.log(plantHeights[Math.floor(Math.random() * plantHeights.length)])


    livesGraphicUpdate()
    addBee(beeStartingPosition)
    generatePlant()
    addPlant()
    // addFlower(flowerStartingPosition)
    generateWasp()
    addWasp(waspStartingPosition)
    generateAcorn()
    addAcorn(acornStartingPosition)
    // addplant(plantOneStartingPosition - width)
    // addplant(plantOneStartingPosition - (width * 2))
  }

  createGrid()
  applyGravity()

  // const firstBeePosition = cells[position].classList
  // console.log('TRYING TO REFACTOR>>', firstBeePosition)

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

  function generatePlant() {
    newPlant = plantHeights[Math.floor(Math.random() * plantHeights.length)]
    console.log(plantOneCurrentPosition)
    if (plantOneCurrentPosition.length === 0) {
      plantOneCurrentPosition[0] = width * height - 1
      for (let p = 1; p < newPlant; p++) {
        plantOneCurrentPosition.push(plantOneCurrentPosition[0] - (width * p))
        console.log(plantOneCurrentPosition)
      }
    } else if (!plantTwoCurrentPosition) {
      plantTwoCurrentPosition = width * height - 1
      cells[plantTwoCurrentPosition].classList.add(plantClass)
    }
  }

  function addPlant(position) {
    plantOneCurrentPosition.forEach(index => cells[index].classList.add(plantClass))
    cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.add(flowerClass)
  }

  function removePlant(position) {
    plantOneCurrentPosition.forEach(index => cells[index].classList.remove(plantClass))
    cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.remove(flowerClass)
  }


  function generateWasp() {
    waspStartingPosition = endColumns[Math.floor(Math.random() * endColumns.length)]
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

  function generateAcorn() {
    acornStartingPosition = topRow[Math.floor(Math.random() * topRow.length)]
    console.log('ACORN', acornStartingPosition)
    acornCurrentPosition = acornStartingPosition
    cells[acornStartingPosition].classList.add(acornClass)
  }

  function addAcorn(position) {
    cells[position].classList.add(acornClass)
  }

  function removeAcorn(position) {
    cells[acornCurrentPosition].classList.remove(acornClass)
  }

  function navigate(event) {
    const key = event.code
    console.log(key)
    // collisionDetectionNav()
    removeBee()

    if (key === 'ArrowUp' && (beeCurrentPosition - width) >= width) {
      beeCurrentPosition -= width
      resetGravityTimer()
    } else if (key === 'ArrowRight' && (beeCurrentPosition + 1) % width !== width - 1) {
      beeCurrentPosition++
      resetGravityTimer()
    } else if (key === 'ArrowDown' && beeCurrentPosition + width <= (width * height) - 1) {
      beeCurrentPosition += width
      resetGravityTimer()
    } else if (key === 'ArrowLeft' && beeCurrentPosition % width !== 0) {
      beeCurrentPosition--
      resetGravityTimer()
    } else if (key === 'Escape') {
      clearInterval(scrolling)
      clearInterval(gravity)
      clearInterval(waspFlying)
      clearInterval(collisionTimer)
      clearInterval(fallingAcorn)

    }
    console.log('CURRENT BEE', beeCurrentPosition)
    // console.log('DELAY IN HOLD>>>>', new Date().getMilliseconds())
    addBee(beeCurrentPosition)
  }

  // * nav collision detection isn't checking until key press - need to figure out a way to get the nav 

  const scrolling = setInterval(() => {
    // collisionDetectionScroll()
    removePlant()
    // removeFlower()
    removeAcorn()

    if (plantOneCurrentPosition[0] % width !== 0) {
      plantOneCurrentPosition = plantOneCurrentPosition.map(value => {
        value--
        console.log('VALUE>>', value)
        return value
      })
      console.log('NEW ARRAY>>', plantOneCurrentPosition)

      // flowerCurrentPosition--
      addPlant()
      // addFlower(flowerCurrentPosition)
    }
    if (acornCurrentPosition % width !== 0) {
      acornCurrentPosition--
      addAcorn(acornCurrentPosition)
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
        livesGraphicUpdate()

        // gameOver()
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

  const fallingAcorn = setInterval(() => {
    // collisionDetectionScroll()
    removeAcorn()
    if (acornCurrentPosition + width < width * height) {
      acornCurrentPosition += width
      addAcorn(acornCurrentPosition)
    } else {
      generateAcorn()
    }
  }, gravityTimer * .5)

  function resetGravityTimer() {
    clearInterval(gravity)
    applyGravity()
  }

  function collisionDetectionScroll() {
    setTimeout(() => {
      if (cells[plantOneCurrentPosition - 1].classList.contains(beeClass) && plantOneCurrentPosition % width !== 0) {
        gameOver()
      }
    }, scrollTimer - 20)
  }

  function collisionDetectionNav() {
    if (cells[beeCurrentPosition].classList.contains(plantClass)) {
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
  //   if (cells[beeCurrentPosition].classList.contains(plantClass) || cells[beeCurrentPosition + 1].classList.contains(plantClass) || cells[beeCurrentPosition - width].classList.contains(plantClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(plantClass)) {
  //     console.log('BANG PLANT')
  //     currentLives--
  //     console.log('LIVES>>>', currentLives)
  //     setTimeout(2000)
  //   }

  // }, 75)


  function startCollisionCheck(typeOne, typeTwo, typeThree, typeFour) {
    console.log('COLLISION TIMER AT START OF CHECK', collisionTimer)
    console.log('STARTING CHECK')
    if (!collisionTimer) {
      collisionTimer = setInterval(() => {
        console.log('COLLISION TIMER AFTER INITIATION', collisionTimer)
        if (cells[beeCurrentPosition].classList.contains(typeOne) || cells[beeCurrentPosition + 1].classList.contains(typeOne) || cells[beeCurrentPosition - width].classList.contains(typeOne) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeOne)) {
          collisionDetectedBad()
        }
        if (cells[beeCurrentPosition].classList.contains(typeTwo) || cells[beeCurrentPosition + 1].classList.contains(typeTwo) || cells[beeCurrentPosition - width].classList.contains(typeTwo) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeTwo)) {
          collisionDetectedBad()
        }
        if (cells[beeCurrentPosition].classList.contains(typeThree) || cells[beeCurrentPosition + 1].classList.contains(typeThree) || cells[beeCurrentPosition - width].classList.contains(typeThree) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeThree)) {
          collisionDetectedBad()
        }
        if (cells[beeCurrentPosition].classList.contains(typeFour) || cells[beeCurrentPosition + 1].classList.contains(typeFour) || cells[beeCurrentPosition - width].classList.contains(typeFour) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeFour)) {
          collisionDetectedGood()
        }
      }, 75)
    }
  }

  function collisionDetectedBad() {
    currentLives--
    livesGraphicUpdate()
    ouch.play()
    if (currentLives <= 0) {
      setTimeout(() => {
        gameOver()
      }, 20)
    } else {
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
        startCollisionCheck(waspClass, plantClass, acornClass, flowerClass)
      }, 1000)
    }
  }

  function collisionDetectedGood() {
    currentScore += 5
    score.innerText = currentScore
    ding.play()
  }

  function livesGraphicUpdate() {
    livesGraphic.forEach(item => {
      console.log('LIFE>>', item)
      if (parseInt(item.id) <= currentLives) {
        item.classList.add('livesFull')
      } else {
        item.classList.add('livesEmpty')
      }
      // })
    })
  }

  function collisionCheck() {
    startCollisionCheck(waspClass, plantClass, acornClass, flowerClass)
    //   if (cells[beeCurrentPosition].classList.contains(plantClass) || cells[beeCurrentPosition + 1].classList.contains(plantClass) || cells[beeCurrentPosition - width].classList.contains(plantClass) || cells[beeCurrentPosition - (width + 1)].classList.contains(plantClass)) {
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
    clearInterval(scrolling)
    clearInterval(collisionTimer)
    clearInterval(waspFlying)
    clearInterval(fallingAcorn)
    gameOverCard.classList.toggle('hidden')
    grid.classList.toggle('hidden')
    // window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)
}

window.addEventListener('DOMContentLoaded', init)