function init() {

  console.log('linked')

  const grid = document.querySelector('.grid')
  const backgroundGrid = document.querySelector('.backgroundGrid')
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
  const waspPlantClass = 'waspPlant'
  const waspFlowerClass = 'waspFlower'
  const pollenClass = 'pollen'
  const honeyClass = 'honey'
  const beeCurrentPosition = []
  let scrollTimer = 150
  let gravityTimer = 550
  let waspInterval = 1000
  let collisionTimer = null
  let gravity = 0
  const endColumns = []
  const endColumnsUpper = []
  const topRow = []
  let plantHeights = [1, 2, 3, 4, 5, 6]
  let currentLives = 3

  let currentScore = 0
  score.innerText = currentScore

  beeCurrentPosition[0] = width * (height / 4) + 2


  class Wasp {

    constructor(name, currentPosition) {

      this.name = name
      this.currentPosition = currentPosition

    }

    addWasp() {
      if (this.currentPosition && this.currentPosition % width !== 0) {
        cells[this.currentPosition].classList.add(waspClass)
      }
    }

    removeWasp() {
      if (this.currentPosition && this.currentPosition % width !== 0) {
        cells[this.currentPosition].classList.remove(waspClass)
        this.currentPosition--
      } else if (this.currentPosition && this.currentPosition % width === 0) {
        this.currentPosition = null
      }
    }
  }

  const waspOne = new Wasp('waspOnePosition', null)
  const waspTwo = new Wasp('waspTwoPosition', null)
  const waspThree = new Wasp('waspThreePosition', null)
  const waspFour = new Wasp('waspFourPosition', null)
  const waspFive = new Wasp('waspFivePosition', null)


  class Honey {

    constructor(name, currentPosition) {

      this.name = name
      this.currentPosition = currentPosition

    }

    addHoney() {
      if (this.currentPosition && this.currentPosition % width !== width - 1) {
        cells[this.currentPosition].classList.add(honeyClass)
      }
    }

    removeHoney() {
      if (this.currentPosition && this.currentPosition % width !== width - 1) {
        cells[this.currentPosition].classList.remove(honeyClass)
        this.currentPosition++
      } else if (this.currentPosition && this.currentPosition % width === width - 1) {
        this.currentPosition = null
      }
    }
  }

  const honeyOne = new Honey('honeyOnePosition', null)
  const honeyTwo = new Honey('honeyTwoPosition', null)
  const honeyThree = new Honey('honeyThreePosition', null)
  const honeyFour = new Honey('honeyFourPosition', null)
  const honeyFive = new Honey('honeyFivePosition', null)
  const honeySix = new Honey('honeySixPosition', null)
  const honeySeven = new Honey('honeySevenPosition', null)
  const honeyEight = new Honey('honeyEightPosition', null)
  const honeyNine = new Honey('honeyNinePosition', null)
  const honeyTen = new Honey('honeyTenPosition', null)

  const waspArray = [waspOne, waspTwo, waspThree, waspFour, waspFive]
  const honeyArray = [honeyOne, honeyTwo, honeyThree, honeyFour, honeyFive, honeySix, honeySeven, honeyEight, honeyNine, honeyTen]

  console.log(honeyArray)

  let firstWaspNull = null
  let firstHoneyNull = null

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

  let honeyOneCurrentPosition = null

  let pollenOneCurrentPosition = null


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let i = width - 1; i < width * height; i += width) {
      endColumns.push(i)
      // console.log(endColumns)
    }

    for (let i = 8; i < width; i++) {
      topRow.push(i)
      // console.log(topRow)
    }

    for (let i = width - 1; i < width * (height / 2); i += width) {
      endColumnsUpper.push(i)
      console.log('UPPER>>>', endColumnsUpper)
    }

    console.log(plantOneCurrentPosition)
    console.log(plantHeights[Math.floor(Math.random() * plantHeights.length)])


    livesGraphicUpdate()
    addBee()
    // generatePlant()
    addPlant()
    // addFlower(flowerStartingPosition)
    // generateWasp()
    // addWasp(waspStartingPosition)
    generateAcorn()
    addAcorn(acornStartingPosition)
    // addplant(plantOneStartingPosition - width)
    // addplant(plantOneStartingPosition - (width * 2))
  }

  let bgCells = []
  function createBackgroundGrid() {
    for (let i = 0; i < 5; i++) {
      const backgroundCell = document.createElement('div')
      // cell.innerText = i
      backgroundGrid.appendChild(backgroundCell)
      bgCells.push(backgroundCell)

    }
    console.log('BG GRID', bgCells)
  }

  createGrid()
  createBackgroundGrid()
  applyGravity()

  // const firstBeePosition = cells[position].classList
  // console.log('TRYING TO REFACTOR>>', firstBeePosition)

  function addBee(position) {

    beeCurrentPosition[1] = (beeCurrentPosition[0] + 1)
    beeCurrentPosition[2] = (beeCurrentPosition[0] - width)
    beeCurrentPosition[3] = (beeCurrentPosition[2] + 1)
    beeCurrentPosition.forEach(indexValue => cells[indexValue].classList.add(beeClass))
    cells[beeCurrentPosition[0]].appendChild(beePic)
  }

  function removeBee(position) {
    beeCurrentPosition.forEach(indexValue => cells[indexValue].classList.remove(beeClass))
  }

  // function plantCheck() {
  //   if (plantOneCurrentPosition.length === 0) {
  //     plant = plantOneCurrentPosition
  //   }
  // }

  function addPlant() {
    console.log(plantOneCurrentPosition)
    if (plantOneCurrentPosition.length === 0) {
      plantOneCurrentPosition[0] = width * height - 1
      for (let p = 1; p < plantHeights[Math.floor(Math.random() * plantHeights.length)]; p++) {
        plantOneCurrentPosition.push(plantOneCurrentPosition[0] - (width * p))
        console.log(plantOneCurrentPosition)
      }
    }
    plantOneCurrentPosition.forEach(index => cells[index].classList.add(plantClass))
    cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.add(flowerClass)

  }

  // function addPlant(position) {
  //   plantOneCurrentPosition.forEach(index => cells[index].classList.add(plantClass))
  //   cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.add(flowerClass)
  // }

  function removePlant(position) {
    plantOneCurrentPosition.forEach(index => cells[index].classList.remove(plantClass))
    cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.remove(flowerClass)
  }

  function generateWasp() {
    firstWaspNull = waspArray.find(wasp => {
      return !wasp.currentPosition
    })
    console.log('FIRST NULL', firstWaspNull)
    firstWaspNull.currentPosition = endColumns[Math.floor(Math.random() * endColumns.length)]
    console.log('FIRST NULL CURRENT POSITION', firstWaspNull.currentPosition)
  }

  function generateHoney() {
    firstHoneyNull = honeyArray.find(honey => {
      return !honey.currentPosition
    })
    firstHoneyNull.currentPosition = beeCurrentPosition[1] + 1
  }

  // function generateWasp() {
  //   waspStartingPosition = endColumns[Math.floor(Math.random() * endColumns.length)]
  //   console.log('WASP>>>>>', waspStartingPosition)
  //   waspCurrentPosition = waspStartingPosition
  //   cells[waspStartingPosition].classList.add(waspClass)
  // }


  // function addWasp(position) {
  //   if (cells[position].classList.contains(plantClass)) {
  //     cells[position].classList.add(waspPlantClass)
  //   } else if (cells[position].classList.contains(flowerClass)) {
  //     cells[position].classList.add(waspFlowerClass)
  //   } else {
  //     cells[position].classList.add(waspClass)
  //   }
  // }

  // function removeWasp(position) {
  //   if (cells[waspCurrentPosition].classList.contains(waspPlantClass)) {
  //     cells[waspCurrentPosition].classList.remove(waspPlantClass)
  //   } else if (cells[waspCurrentPosition].classList.contains(waspFlowerClass)) {
  //     cells[waspCurrentPosition].classList.remove(waspFlowerClass)
  //   }
  //   cells[waspCurrentPosition].classList.remove(waspClass)

  // }

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

  function addHoney() {
    if (!honeyOneCurrentPosition) {
      honeyOneCurrentPosition = beeCurrentPosition[1] + 1
      console.log('HONEY POS>>', honeyOneCurrentPosition)
    }
    cells[honeyOneCurrentPosition].classList.add(honeyClass)
  }

  function removeHoney() {
    cells[honeyOneCurrentPosition].classList.remove(honeyClass)
  }


  function addPollen() {
    if (!pollenOneCurrentPosition) {
      pollenOneCurrentPosition = endColumnsUpper[Math.floor(Math.random() * endColumnsUpper.length)]
    }
    cells[pollenOneCurrentPosition].classList.add(pollenClass)


  }

  function removePollen(position) {
    cells[pollenOneCurrentPosition].classList.remove(pollenClass)
  }

  function navigate(event) {
    const key = event.code
    console.log(key)
    // collisionDetectionNav()
    removeBee()

    if (key === 'ArrowUp' && (beeCurrentPosition[0] - width) >= width) {
      beeCurrentPosition[0] -= width
      resetGravityTimer()
    } else if (key === 'ArrowRight' && (beeCurrentPosition[1]) % width !== width - 1) {
      beeCurrentPosition[0]++
      resetGravityTimer()
    } else if (key === 'ArrowDown' && beeCurrentPosition[0] + width <= (width * height) - 1) {
      beeCurrentPosition[0] += width
      resetGravityTimer()
    } else if (key === 'ArrowLeft' && beeCurrentPosition[0] % width !== 0) {
      beeCurrentPosition[0]--
      resetGravityTimer()
    } else if (key === 'Space') {
      generateHoney()
      resetGravityTimer()
    } else if (key === 'Enter') {
      addPollen()
    } else if (key === 'Escape') {
      clearInterval(scrolling)
      clearInterval(gravity)
      clearInterval(waspFlying)
      clearInterval(newWaspTimer)
      clearInterval(honeyFiring)
      clearInterval(collisionTimer)
      clearInterval(fallingAcorn)

    }
    console.log('CURRENT BEE', beeCurrentPosition)
    // console.log('DELAY IN HOLD>>>>', new Date().getMilliseconds())
    addBee(beeCurrentPosition)
  }


  const scrolling = setInterval(() => {
    removePlant()
    removeAcorn()


    if (plantOneCurrentPosition[0] % width !== 0) {
      plantOneCurrentPosition = plantOneCurrentPosition.map(value => {
        value--
        console.log('VALUE>>', value)
        return value
      })
      console.log('NEW ARRAY>>', plantOneCurrentPosition)
    } else {
      plantOneCurrentPosition = []
    }
    addPlant()

    if (acornCurrentPosition % width !== 0) {
      acornCurrentPosition--
      addAcorn(acornCurrentPosition)
    }

    // if (honeyOneCurrentPosition) {
    //   removeHoney()

    //   if (honeyOneCurrentPosition % width !== width - 1) {
    //     honeyOneCurrentPosition++
    //     addHoney()
    //   } else {
    //     honeyOneCurrentPosition = null
    //   }
    // }

    if (pollenOneCurrentPosition) {
      removePollen()

      if (pollenOneCurrentPosition % width !== 0) {
        pollenOneCurrentPosition--
        addPollen()
      } else {
        pollenOneCurrentPosition = null
      }
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
      if ((beeCurrentPosition[0] + width) < (width * height)) {
        beeCurrentPosition[0] += width
        addBee()
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

  const newWaspTimer = setInterval(() => generateWasp(), waspInterval)

  const waspFlying = setInterval(() => {
    // collisionDetectionScroll()
    waspArray.forEach(wasp => {
      wasp.removeWasp()
      wasp.addWasp()
    })
  }, scrollTimer * 0.6)


  const honeyFiring = setInterval(() => {
    honeyArray.forEach(honey => {
      honey.removeHoney()
      honey.addHoney()
    })

  }, scrollTimer * 0.6)


  // const waspFlying = setInterval(() => {
  //   // collisionDetectionScroll()
  //   removeWasp()
  //   if (waspCurrentPosition % width !== 0) {
  //     waspCurrentPosition--
  //     addWasp(waspCurrentPosition)
  //   } else {
  //     generateWasp()
  //   }
  // }, scrollTimer * 0.6)

  const fallingAcorn = setInterval(() => {
    // collisionDetectionScroll()
    removeAcorn()

    if (acornCurrentPosition + width < width * height) {
      acornCurrentPosition += width
      if (cells[acornCurrentPosition + width].classList.contains(flowerClass) || cells[acornCurrentPosition + width].classList.contains(waspClass)) {
        acornCurrentPosition++
      }
      addAcorn(acornCurrentPosition)
    } else {
      generateAcorn()
    }
  }, gravityTimer * .4)

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



  function startCollisionCheck(typeOne, typeTwo, typeThree, typeFour, typeFive) {
    console.log('COLLISION TIMER AT START OF CHECK', collisionTimer)
    console.log('STARTING CHECK')

    if (!collisionTimer) {
      collisionTimer = setInterval(() => {
        console.log('COLLISION TIMER AFTER INITIATION', collisionTimer)

        beeCurrentPosition.forEach(indexValue => {
          if (cells[indexValue].classList.contains(typeOne) || cells[indexValue].classList.contains(typeTwo) || cells[indexValue].classList.contains(typeThree)) {
            collisionDetectedBad()
          } else if (cells[indexValue].classList.contains(typeFour) || cells[indexValue].classList.contains(typeFive)) {
            collisionDetectedGood()
          }
        }
        )

        // beeCurrentPosition.forEach(indexValue => {
        //   if (cells[indexValue].classList.contains(typeTwo)) {
        //   collisionDetectedBad()
        // }

        // beeCurrentPosition.forEach(indexValue => {
        //   if (cells[indexValue].classList.contains(typeThree)) {
        //   collisionDetectedBad()
        // }

        // if (cells[beeCurrentPosition].classList.contains(typeTwo) || cells[beeCurrentPosition + 1].classList.contains(typeTwo) || cells[beeCurrentPosition - width].classList.contains(typeTwo) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeTwo)) {
        //   collisionDetectedBad()
        // }

        // if (cells[beeCurrentPosition].classList.contains(typeThree) || cells[beeCurrentPosition + 1].classList.contains(typeThree) || cells[beeCurrentPosition - width].classList.contains(typeThree) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeThree)) {
        //   collisionDetectedBad()
        // }

        // if (cells[beeCurrentPosition].classList.contains(typeFour) || cells[beeCurrentPosition + 1].classList.contains(typeFour) || cells[beeCurrentPosition - width].classList.contains(typeFour) || cells[beeCurrentPosition - (width + 1)].classList.contains(typeFour)) {
        //   collisionDetectedGood()
        // }


        // if (cells[beeCurrentPosition].classList.contains(typeFive)) {
        //   console.log('YES POLLEN!')
        //   collisionDetectedGood()
        //   cells[beeCurrentPosition].classList.remove(typeFive)
        // } else if (cells[beeCurrentPosition + 1].classList.contains(typeFive)) {
        //   console.log('YES POLLEN!')
        //   collisionDetectedGood()
        //   cells[beeCurrentPosition + 1].classList.remove(typeFive)
        // } else if (cells[beeCurrentPosition - width].classList.contains(typeFive)) {
        //   console.log('YES POLLEN!')
        //   collisionDetectedGood()
        //   cells[beeCurrentPosition - width].classList.remove(typeFive)
        // } else if (cells[beeCurrentPosition - width + 1].classList.contains(typeFive)) {
        //   console.log('YES POLLEN!')
        //   collisionDetectedGood()
        //   cells[beeCurrentPosition - width + 1].classList.remove(typeFive)
        // }
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
      beePic.classList.toggle('collision')
      clearInterval(collisionTimer)
      console.log('COLLISION TIMER AFTER COLLISION', collisionTimer)
      collisionTimer = null
      console.log('COLLISION TIMER SHOULD BE NULL', collisionTimer)
      setTimeout(() => {
        beePic.classList.toggle('collision')
        console.log('......AND')
        startCollisionCheck(waspClass, plantClass, acornClass, flowerClass, pollenClass)
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
    startCollisionCheck(waspClass, plantClass, acornClass, flowerClass, pollenClass)
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