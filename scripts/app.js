function init() {

  // console.log('linked')

  const header = document.querySelector('header')
  const main = document.querySelector('main')
  const grid = document.querySelector('.grid')
  const backgroundGrid = document.querySelector('.backgroundGrid')
  const livesGraphic = document.querySelectorAll('.honeycomb')
  const lives = document.querySelector('#livesNum')
  const score = document.querySelector('#scoreNum')
  const themeTune = document.querySelector('#themeTune')
  themeTune.volume = 0.4
  const ouch = document.querySelector('#ouch')
  const ding = document.querySelector('#ding')
  const oneUp = document.querySelector('#oneUp')
  const splat = document.querySelector('#splat')
  const hadouken = document.querySelector('#hadouken')
  const howl = document.querySelector('#howl')


  const startScreen = document.querySelector('.startScreen')
  const startButton = document.querySelector('.startButton')

  const mainMenu = document.querySelector('.mainMenu')
  const mainMenuToggle = document.querySelector('.menuTextContainer')

  const howToPlay = document.querySelector('#howToPlay')
  const leaderboard = document.querySelector('#leaderboard')
  const startGame = document.querySelector('#startGame')

  const rules = document.querySelector('.rules')
  const rulesBackButton = document.querySelector('#rulesBackButton')


  const gameOverCard = document.querySelector('#gameOver')

  const resultsScoreFromDOM = document.querySelector('#resultsScoreFromDOM')

  const gameOverReturnButton = document.querySelector('#gameOverReturnButton')


  const beePic = document.createElement('img')
  beePic.src = 'assets/bee2.gif'
  beePic.setAttribute('class', 'beeImage')


  const width = 25
  const height = 12
  const cellCount = width * height
  const cells = []
  const bgCells = []
  const hiddenClass = 'hidden'
  const fadeOutClass = 'fadeOut'
  const beeClass = 'bee'
  const waspClass = 'wasp'
  const plantClass = 'plant'
  const flowerClass = 'flower'
  const acornClass = 'acorn'
  // const waspPlantClass = 'waspPlant'
  // const waspFlowerClass = 'waspFlower'
  const pollenClass = 'pollen'
  const honeyClass = 'honey'
  const honeySplatClass = 'honeySplat'
  const livesFullClass = 'livesFull'
  const livesEmptyClass = 'livesEmpty'
  const beeCurrentPosition = []
  const endColumns = []
  const endColumnsUpper = []
  const topRow = []
  const plantHeightOptions = [1, 2, 3, 4, 5]
  let currentLives = ['life', 'life', 'life']
  let currentScore = 0
  let waspCount = 0
  let acornCount = 0
  let pollenCount = 0


  let scrollTimer = 150
  let gravityTimer = 650
  let waspInterval = 1000
  let collisionTimer = null
  let gravity = 0

  score.innerText = currentScore

  beeCurrentPosition[0] = width * (height / 4) + 3


  class GeneratedItem {

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
      } else if (this.currentPosition % width === width - 1) {
        this.currentPosition = null
      }
    }

    addPlant() {
      if (this.currentPosition.length > 0 && this.currentPosition[0] % width !== 0) {
        this.currentPosition.forEach(index => cells[index].classList.add(plantClass))

        cells[this.currentPosition[this.currentPosition.length - 1] - width].classList.add(flowerClass)
      }
    }

    removePlant() {
      if (this.currentPosition.length > 0 && this.currentPosition[0] % width !== 0) {
        this.currentPosition.forEach(index => cells[index].classList.remove(plantClass))
        // console.log('THIS IS THE LENGTH', this.name, this.currentPosition.length)
        // console.log('GOING AS EXPECTED', this.name, this.currentPosition[0])
        cells[this.currentPosition[this.currentPosition.length - 1] - width].classList.remove(flowerClass)
        this.currentPosition = this.currentPosition.map(indexValue => {
          indexValue--
          return indexValue
        })
      } else if (this.currentPosition.length > 0 && this.currentPosition[0] % width === 0) {
        this.currentPosition = []
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!HERE!!!!!!', this.currentPosition)
      }
    }

    addLeftMoving(classType) {
      if (this.currentPosition && this.currentPosition % width !== 0) {
        cells[this.currentPosition].classList.add(classType)
      }
    }

    removeLeftMoving(classType) {
      if (this.currentPosition && this.currentPosition % width !== 0) {
        cells[this.currentPosition].classList.remove(classType)
        this.currentPosition--
      } else if (this.currentPosition % width === 0) {
        this.currentPosition = null
      }
    }

    addAcorn() {
      if (this.currentPosition && this.currentPosition + width < width * height) {
        cells[this.currentPosition].classList.add(acornClass)
      }
    }

    removeAcorn() {
      if (this.currentPosition && this.currentPosition + width < width * height) {
        cells[this.currentPosition].classList.remove(acornClass)
        this.currentPosition += width
      } else if (this.currentPosition + width >= width * height) {
        this.currentPosition = null
      }
    }

  }


  const waspOne = new GeneratedItem('waspOnePosition', null)
  const waspTwo = new GeneratedItem('waspTwoPosition', null)
  const waspThree = new GeneratedItem('waspThreePosition', null)
  const waspFour = new GeneratedItem('waspFourPosition', null)
  const waspFive = new GeneratedItem('waspFivePosition', null)



  const honeyOne = new GeneratedItem('honeyOnePosition', null)
  const honeyTwo = new GeneratedItem('honeyTwoPosition', null)
  const honeyThree = new GeneratedItem('honeyThreePosition', null)
  const honeyFour = new GeneratedItem('honeyFourPosition', null)
  const honeyFive = new GeneratedItem('honeyFivePosition', null)
  const honeySix = new GeneratedItem('honeySixPosition', null)
  const honeySeven = new GeneratedItem('honeySevenPosition', null)
  const honeyEight = new GeneratedItem('honeyEightPosition', null)
  const honeyNine = new GeneratedItem('honeyNinePosition', null)
  const honeyTen = new GeneratedItem('honeyTenPosition', null)



  const plantOne = new GeneratedItem('plantOnePosition', [])
  const plantTwo = new GeneratedItem('plantTwoPosition', [])
  const plantThree = new GeneratedItem('plantThreePosition', [])
  const plantFour = new GeneratedItem('plantFourPosition', [])
  const plantFive = new GeneratedItem('plantFivePosition', [])
  const plantSix = new GeneratedItem('plantSixPosition', [])



  const pollenOne = new GeneratedItem('pollenOnePosition', null)
  const pollenTwo = new GeneratedItem('pollenTwoPosition', null)
  const pollenThree = new GeneratedItem('pollenThreePosition', null)
  const pollenFour = new GeneratedItem('pollenFourPosition', null)
  const pollenFive = new GeneratedItem('pollenFivePosition', null)


  const acornOne = new GeneratedItem('acornOnePosition', null)
  const acornTwo = new GeneratedItem('acornTwoPosition', null)
  const acornThree = new GeneratedItem('acornThreePosition', null)
  const acornFour = new GeneratedItem('acornFourPosition', null)
  const acornFive = new GeneratedItem('acornFivePosition', null)



  const lifeOne = new GeneratedItem('lifeOnePosition', null)
  const lifeTwo = new GeneratedItem('lifeTwoPosition', null)



  const waspArray = [waspOne, waspTwo, waspThree, waspFour, waspFive]


  const honeyArray = [honeyOne, honeyTwo, honeyThree, honeyFour, honeyFive, honeySix, honeySeven, honeyEight, honeyNine, honeyTen]


  const plantArray = [plantOne, plantTwo, plantThree, plantFour, plantFive, plantSix]


  const pollenArray = [pollenOne, pollenTwo, pollenThree, pollenFour, pollenFive]


  const acornArray = [acornOne, acornTwo, acornThree, acornFour, acornFive]


  const lifeArray = [lifeOne, lifeTwo]


  let firstWaspNull = null
  let firstHoneyNull = null
  let firstPlantNull = null
  let firstPollenNull = null
  let firstAcornNull = null
  let firstLifeNull = null

  let newPlant = null


  // * I have no idea why, but when I delete this variable even though nothing active is attached to it
  const plantOneStartingPosition = []


  // const plantOneCurrentPosition = plantOneStartingPosition


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let i = (width * 2) - 1; i < width * (height - 1); i += width) {
      endColumns.push(i)
      // console.log(endColumns)
    }

    for (let i = 8; i < width; i++) {
      topRow.push(i)
      // console.log(topRow)
    }

    for (let i = width - 1; i < width * (height / 2); i += width) {
      endColumnsUpper.push(i)
    }

    livesGraphicUpdate()
    addBee()

  }

  function createBackgroundGrid() {
    for (let i = 0; i < 5; i++) {
      const backgroundCell = document.createElement('div')
      // cell.innerText = i
      backgroundGrid.appendChild(backgroundCell)
      bgCells.push(backgroundCell)
    }
    // console.log('BG GRID', bgCells)
  }


  createGrid()
  createBackgroundGrid()
  applyGravity()


  function addBee() {
    beeCurrentPosition[1] = (beeCurrentPosition[0] + 1)
    beeCurrentPosition[2] = (beeCurrentPosition[0] - width)
    beeCurrentPosition[3] = (beeCurrentPosition[2] + 1)
    beeCurrentPosition.forEach(indexValue => cells[indexValue].classList.add(beeClass))
    cells[beeCurrentPosition[0]].appendChild(beePic)
  }

  function removeBee() {
    beeCurrentPosition.forEach(indexValue => cells[indexValue].classList.remove(beeClass))
  }


  function generateHoney() {
    firstHoneyNull = honeyArray.find(honey => {
      return !honey.currentPosition
    })
    firstHoneyNull.currentPosition = beeCurrentPosition[1] + 1
  }

  function generatePlant() {
    firstPlantNull = plantArray.find(plant => {
      return plant.currentPosition.length === 0
    })
    // console.log('-----PLANT NULL-----', firstPlantNull.name)
    firstPlantNull.currentPosition[0] = width * height - 1
    // console.log('-----PLANT NULL POS-----', firstPlantNull.currentPosition[0])

    for (let p = 1; p < plantHeightOptions[Math.floor(Math.random() * plantHeightOptions.length)]; p++) {
      firstPlantNull.currentPosition.push(firstPlantNull.currentPosition[0] - (width * p))
    }
  }

  function generateLeftMoving(nullType, arrayType, classType) {
    nullType = arrayType.find(item => {
      return !item.currentPosition
    })
    if (arrayType === waspArray) {
      nullType.currentPosition = endColumns[Math.floor(Math.random() * endColumns.length)]
    } else if (arrayType === acornArray) {
      nullType.currentPosition = topRow[Math.floor(Math.random() * topRow.length)]
    } else {
      nullType.currentPosition = endColumnsUpper[Math.floor(Math.random() * endColumnsUpper.length)]
    }
    cells[nullType.currentPosition].classList.add(classType)
  }


  function navigate(event) {
    const key = event.code
    console.log(key)
    removeBee()

    if (key === 'ArrowUp' && (beeCurrentPosition[0] - width) >= width) {
      beeCurrentPosition[0] -= width
      resetGravityTimer()
    } else if (key === 'ArrowRight' && (beeCurrentPosition[1]) % width !== width - 1) {
      beeCurrentPosition[0]++
      resetGravityTimer()
    } else if (key === 'ArrowDown' && beeCurrentPosition[0] + width < width * height) {
      beeCurrentPosition[0] += width
      resetGravityTimer()
    } else if (key === 'ArrowDown' && beeCurrentPosition[0] + width >= width * height) {
      gameOver()
    } else if (key === 'ArrowLeft' && beeCurrentPosition[0] % width !== 0) {
      beeCurrentPosition[0]--
      resetGravityTimer()
    } else if (key === 'Space') {
      hadouken.play()
      generateHoney()
      resetGravityTimer()
    } else if (key === 'Enter') {
      themeTune.pause()
    } else if (key === 'KeyG') {
      gameOver()
    } else if (key === 'Escape') {
      clearTimers()
    }
    // console.log('CURRENT BEE', beeCurrentPosition)
    // console.log('DELAY IN HOLD>>>>', new Date().getMilliseconds())
    addBee(beeCurrentPosition)
  }

  function clearTimers() {
    clearInterval(scrolling)
    clearInterval(gravity)
    clearInterval(waspFlying)
    clearInterval(newWaspTimer)
    clearInterval(newPlantTimer)
    clearInterval(newPollenTimer)
    clearInterval(newAcornTimer)
    clearInterval(newLifeTimer)
    clearInterval(honeyFiring)
    clearInterval(collisionTimer)
    clearInterval(fallingAcorn)
  }

  const scrolling = setInterval(() => {

    // removeAcorn()

    plantArray.forEach(plant => {
      plant.removePlant()
      plant.addPlant()
      // console.log('--PLANT NAME--', plant.name, 'PLANT LENGTHS>>', plant.currentPosition)
    })


    pollenArray.forEach(pollen => {
      pollen.removeLeftMoving(pollenClass)
      pollen.addLeftMoving(pollenClass)
    })


    lifeArray.forEach(life => {
      life.removeLeftMoving(livesFullClass)
      life.addLeftMoving(livesFullClass)
    })

  

  }, scrollTimer)



  function applyGravity() {
    gravity = setInterval(() => {
      removeBee()
      if ((beeCurrentPosition[0] + width) < (width * height)) {
        beeCurrentPosition[0] += width
        addBee()
      } else {
        // console.log('BANG FLOOR')
        currentLives.pop()
        console.log('LIVES>>>', currentLives)
        livesGraphicUpdate()
        gameOver()
      }
      // console.log(beeCurrentPosition)

    }, gravityTimer)
  }

  const newWaspTimer = setInterval(() => generateLeftMoving(firstWaspNull, waspArray, waspClass), waspInterval)

  const waspFlying = setInterval(() => {
    // collisionDetectionScroll()
    waspArray.forEach(wasp => {
      wasp.removeLeftMoving(waspClass)
      wasp.addLeftMoving(waspClass)
    })
  }, scrollTimer * 0.65)


  const honeyFiring = setInterval(() => {
    honeyArray.forEach(honey => {
      honey.removeHoney()
      honey.addHoney()
    })

  }, scrollTimer * 0.6)


  const newPlantTimer = setInterval(() => generatePlant(), scrollTimer * 7)


  const newPollenTimer = setInterval(() => generateLeftMoving(firstPollenNull, pollenArray, pollenClass), scrollTimer * 15)

  const newAcornTimer = setInterval(() => generateLeftMoving(firstAcornNull, acornArray, acornClass), scrollTimer * 11)

  const newLifeTimer = setInterval(() => generateLeftMoving(firstLifeNull, lifeArray, livesFullClass), scrollTimer * 60)



  const fallingAcorn = setInterval(() => {
  
    acornArray.forEach(acorn => {
      acorn.removeAcorn()
      acorn.addAcorn()
    })
    
  }, gravityTimer * .4)

  function resetGravityTimer() {
    clearInterval(gravity)
    applyGravity()
  }



  function beeCollision(arr1, arr2, class2) {

    const filteredArray = arr2.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })

    // console.log('FILTERED>>>', filteredArray)

    const positionsArrray = filteredArray.map(item => item.currentPosition)

    // console.log('POSITIONS ONLY>>>', positionsArrray)

    const mergedArray = beeCurrentPosition.concat(positionsArrray)

    // console.log('MERGED>>>>', mergedArray)

    const uniqueArray = []
    const duplicates = []

    mergedArray.filter(item => {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item)
      } else {
        duplicates.push(item)
      }
    })

    // console.log('UNIQUE VALUES>>>>', uniqueArray)
    // console.log('DUPLICATE VALUES>>>>', duplicates)

    duplicates.forEach(item => {
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].currentPosition === item) {
          arr2[i].currentPosition = null
          cells[item].classList.remove(class2)

          if (class2 === waspClass || class2 === acornClass) {
            toggleCollision(class2)
          } else if (class2 === pollenClass) {
            scoreUpdate(class2)
          } else if (class2 === livesFullClass) {
            toggleCollision(class2)
            scoreUpdate(class2)
          }
        }
      }
    })

  }


  function honeyCheck(arr1, arr2, class1, class2) {

    const mergedArray = arr1.concat(arr2)

    // console.log('MERGED>>>>', mergedArray)


    const filteredArray = mergedArray.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })

    // console.log('FILTERED>>>', filteredArray)


    const positionsArrray = filteredArray.map(item => item.currentPosition)

    // console.log('POSITIONS ONLY>>>', positionsArrray)

    const uniqueArray = []
    const duplicates = []

    // console.log('UNIQUE VALUES>>>>', uniqueArray)
    // console.log('DUPLICATE VALUES>>>>', duplicates)


    positionsArrray.filter(item => {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item)
      } else {
        duplicates.push(item)
      }
    })


    duplicates.forEach(item => {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].currentPosition === item) {
          arr1[i].currentPosition = null
          cells[item].classList.remove(class1)
          cells[item].classList.add(honeySplatClass)
          setTimeout(() => {
            cells[item].classList.remove(honeySplatClass)
          }, 80)
        }
      }
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].currentPosition === item) {
          arr2[i].currentPosition = null
          cells[item].classList.remove(class2)
        }
      }

      scoreUpdate(class2)
    })

  }

  function startCollisionCheck() {
    // console.log('COLLISION TIMER AT START OF CHECK', collisionTimer)
    // console.log('STARTING CHECK')

    if (!collisionTimer) {
      collisionTimer = setInterval(() => {
        // console.log('COLLISION TIMER AFTER INITIATION', collisionTimer)
        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(waspClass)) {
            beeCollision(beeCurrentPosition, waspArray, waspClass)
          } else if (cells[item].classList.contains(pollenClass)) {
            beeCollision(beeCurrentPosition, pollenArray, pollenClass)
          } else if (cells[item].classList.contains(livesFullClass)) {
            beeCollision(beeCurrentPosition, lifeArray, livesFullClass)
          } else if (cells[item].classList.contains(acornClass)) {
            beeCollision(beeCurrentPosition, acornArray, acornClass)
          } else if (cells[item].classList.contains(flowerClass)) {
            scoreUpdate(flowerClass)
          } else if (cells[item].classList.contains(plantClass)) {
            toggleCollision(waspClass)
          }


        })

        honeyArray.forEach(item => {
          if (item.currentPosition && cells[item.currentPosition].classList.contains(waspClass) || item.currentPosition && cells[item.currentPosition].classList.contains(acornClass)) {
            // console.log('<<<<<<<<<<<<<<<<<<<SPLAT>>>>>>>>>>>>>>>>')
            honeyCheck(honeyArray, waspArray, honeyClass, waspClass)
            honeyCheck(honeyArray, acornArray, honeyClass, acornClass)
            
          }
        })


      }, 10)
    }
  }

  function updateLives(classType) {
    if (classType === waspClass || classType === plantClass || classType === acornClass) {
      currentLives.pop()
      ouch.play()
      if (currentLives.length <= 0) {
        setTimeout(() => {
          gameOver()
        }, 20)
      }
    } else if (classType === livesFullClass && currentLives.length < 4) {
      currentLives.push('life')
    }
    livesGraphicUpdate()
  }


  function toggleCollision(classType) {
    if (classType === waspClass || classType === plantClass || classType === acornClass) {
      beePic.classList.toggle('collision')
      updateLives(classType)
      clearInterval(collisionTimer)
      collisionTimer = null
      setTimeout(() => {
        beePic.classList.toggle('collision')
        startCollisionCheck()
      }, 1000)
    } else {
      updateLives(classType)
    }
  }



  function scoreUpdate(itemClass) {
    if (itemClass === flowerClass) {
      currentScore++
      ding.play()
    } else if (itemClass === waspClass) {
      currentScore += 20
      splat.play()
      waspCount++
      console.log('WASPS HIT', waspCount)
    } else if (itemClass === acornClass) {
      currentScore += 30
      splat.play()
      acornCount++
      console.log('ACORNS HIT', acornCount)
    } else if (itemClass === pollenClass) {
      currentScore += 10
      ding.play()
      pollenCount++
    } else if (itemClass === livesFullClass) {
      currentScore += 50
      oneUp.play()
    }
    score.innerText = currentScore
  }


  function livesGraphicUpdate() {
    console.log('CURRENT LIFE', currentLives)
    livesGraphic.forEach(item => {
      if (item.classList.contains(livesFullClass)) {
        item.classList.remove(livesFullClass)
      }
      item.classList.add(livesEmptyClass)
    })
    for (let i = 0; i < currentLives.length; i++) {
      livesGraphic[i].classList.add(livesFullClass)
    }
  }



  startCollisionCheck()

  function openMain() {

    howl.play()
    setTimeout(() => {
      startButton.classList.add(fadeOutClass)
      startScreen.classList.toggle(fadeOutClass)

      setTimeout(() => {
        startScreen.classList.toggle(hiddenClass)
        startScreen.classList.toggle(fadeOutClass)
        mainMenu.classList.toggle(hiddenClass)
        mainMenuToggle.classList.toggle(hiddenClass)

      }, 1000)
    }, 1500)


  }

  function openHowToPlay() {

    mainMenuToggle.classList.toggle(hiddenClass)
    setTimeout(() => {
      rules.classList.toggle(hiddenClass)
    }, 500)

  }

  function backToMain() {

    rules.classList.toggle(hiddenClass)
    setTimeout(() => {
      mainMenuToggle.classList.toggle(hiddenClass)
    }, 500)

  }


  function openLeaderboard() {



  }

  function runStartGame() {

    mainMenu.classList.toggle(hiddenClass)
    mainMenuToggle.classList.toggle(hiddenClass)
    setTimeout(() => {
      header.classList.toggle(hiddenClass)
      main.classList.toggle(hiddenClass)
      themeTune.play()
    }, 500)

  }

  function returnToMainMenu() {
    gameOverCard.classList.toggle(hiddenClass)
    mainMenu.classList.toggle(hiddenClass)
    mainMenuToggle.classList.toggle(hiddenClass)
  }


  function gameOver() {
    console.log('GAME OVER')
    clearTimers()
    gameOverCard.classList.toggle(hiddenClass)
    main.classList.toggle(hiddenClass)
    header.classList.toggle(hiddenClass)
    themeTune.pause()
    resultsScoreFromDOM.innerText = currentScore

    // window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)

  startButton.addEventListener('click', openMain)

  howToPlay.addEventListener('click', openHowToPlay)

  leaderboard.addEventListener('click', openLeaderboard)

  startGame.addEventListener('click', runStartGame)

  rulesBackButton.addEventListener('click', backToMain)

  gameOverReturnButton.addEventListener('click', returnToMainMenu)



}

window.addEventListener('DOMContentLoaded', init)