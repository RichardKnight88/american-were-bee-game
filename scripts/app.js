function init() {


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
  const startGame = document.querySelector('#startGame')

  const rules = document.querySelector('.rules')
  const rulesBackButton = document.querySelector('#rulesBackButton')


  const gameOverCard = document.querySelector('#gameOver')

  const resultsScoreFromDOM = document.querySelector('#resultsScoreFromDOM')
  const waspsDOM = document.querySelector('#waspsDOM')
  const acornsDOM = document.querySelector('#acornsDOM')

  const gameOverReturnButton = document.querySelector('#gameOverReturnButton')
  const playAgainButton = document.querySelector('#playAgainButton')


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


  let scrolling = null
  let newWaspTimer = null
  let waspFlying = null
  let honeyFiring = null
  let newPlantTimer = null
  let newPollenTimer = null
  let newAcornTimer = null
  let newLifeTimer = null
  let fallingAcorn = null
  let checkingForSuccessfulHitTimer = null
  let canCheckCollision = true


  let scrollTimer = 150
  let gravityTimer = 650
  let collisionTimer = null
  let gravity = null



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
        cells[this.currentPosition[this.currentPosition.length - 1] - width].classList.remove(flowerClass)
        this.currentPosition = this.currentPosition.map(indexValue => {
          indexValue--
          return indexValue
        })
      } else if (this.currentPosition.length > 0 && this.currentPosition[0] % width === 0) {
        this.currentPosition = []
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
  const waspSix = new GeneratedItem('waspSixPosition', null)
  const waspSeven = new GeneratedItem('waspSevenPosition', null)
  const waspEight = new GeneratedItem('waspEightPosition', null)
  const waspNine = new GeneratedItem('waspNinePosition', null)
  const waspTen = new GeneratedItem('waspFivePosition', null)


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



  const waspArray = [waspOne, waspTwo, waspThree, waspFour, waspFive, waspSix, waspSeven, waspEight, waspNine, waspTen]


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



  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    for (let i = (width * 2) - 1; i < width * (height - 1); i += width) {
      endColumns.push(i)
    }

    for (let i = 8; i < width; i++) {
      topRow.push(i)
    }

    for (let i = width - 1; i < width * (height / 2); i += width) {
      endColumnsUpper.push(i)
    }

    createBackgroundGrid()
    livesGraphicUpdate()
    addBee()
    startTimers()
    startCollisionCheck()
    themeTune.load()
    themeTune.play()


    score.innerText = currentScore

    document.addEventListener('keydown', navigate)

  }

  function createBackgroundGrid() {
    for (let i = 0; i < 5; i++) {
      const backgroundCell = document.createElement('div')
      // cell.innerText = i
      backgroundGrid.appendChild(backgroundCell)
      bgCells.push(backgroundCell)
    }
  }


  function restartGame() {

    currentLives = ['life', 'life', 'life']
    currentScore = 0
    waspCount = 0
    acornCount = 0

    score.innerText = currentScore

    firstWaspNull = null
    firstHoneyNull = null
    firstPlantNull = null
    firstPollenNull = null
    firstAcornNull = null
    firstLifeNull = null

    beeCurrentPosition[0] = width * (height / 4) + 3
    addBee()

    scrollTimer = 150
    gravityTimer = 650
    collisionTimer = null
    gravity = null

    livesGraphicUpdate()
    clearTimers()
    startTimers()
    startCollisionCheck()

    wipingArrays(waspArray, waspClass)
    wipingArrays(honeyArray, honeyClass)
    wipingArrays(pollenArray, pollenClass)
    wipingArrays(acornArray, acornClass)
    wipingArrays(lifeArray, livesFullClass)

    cells.forEach(cell => {
      if (cell.classList.contains(flowerClass)) {
        cell.classList.remove(flowerClass)
      }
    })

    cells.forEach(cell => {
      if (cell.classList.contains(plantClass)) {
        cell.classList.remove(plantClass)
      }
    })

    plantArray.forEach(item => item.currentPosition = [])

    themeTune.load()
    themeTune.play()

    document.addEventListener('keydown', navigate)

  }

  function startGameDecision() {

    if (cells.length > 0) {
      restartGame()
    } else {
      createGrid()
    }
  }

  function wipingArrays(arrayType, classType) {

    arrayType.forEach(item => {
      if (item.currentPosition) {
        cells[item.currentPosition].classList.remove(classType)
      }
      item.currentPosition = null
    })

  }


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
    firstPlantNull.currentPosition[0] = width * height - 1

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
    // } else if (key === 'Escape') {
    //   themeTune.pause()
    }
    addBee(beeCurrentPosition)
  }


  function scrollStart() {
    if (!scrolling) {
      scrolling = setInterval(() => {

        plantArray.forEach(plant => {
          plant.removePlant()
          plant.addPlant()
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
    } else {
      clearInterval(scrolling)
      scrolling = null
    }
  }





  function applyGravity() {
    if (!gravity) {
      gravity = setInterval(() => {
        removeBee()
        if ((beeCurrentPosition[0] + width) < (width * height)) {
          beeCurrentPosition[0] += width
          addBee()
        } else {
          while (currentLives.length > 0) {
            currentLives.pop()
            updateLives()
          }
        }
      }, gravityTimer)
    } else {
      clearInterval(gravity)
      gravity = null
    }
  }


  function waspFlyingTimer() {
    if (!waspFlying) {
      waspFlying = setInterval(() => {
        waspArray.forEach(wasp => {
          wasp.removeLeftMoving(waspClass)
          wasp.addLeftMoving(waspClass)
        })
      }, scrollTimer * 0.65)
    } else {
      clearInterval(waspFlying)
      waspFlying = null
    }
  }

  function honeyFiringTimer() {
    if (!honeyFiring) {
      honeyFiring = setInterval(() => {
        honeyArray.forEach(honey => {
          honey.removeHoney()
          honey.addHoney()
        })
      }, scrollTimer * 0.6)
    } else {
      clearInterval(honeyFiring)
      honeyFiring = null
    }
  }

  function fallingAcornTimer() {
    if (!fallingAcorn) {
      fallingAcorn = setInterval(() => {
        acornArray.forEach(acorn => {
          acorn.removeAcorn()
          acorn.addAcorn()
        })
      }, gravityTimer * 0.4)
    } else {
      clearInterval(fallingAcorn)
      fallingAcorn = null
    }
  }


  function newPlantTimerStart() {
    if (!newPlantTimer) {
      newPlantTimer = setInterval(() => {
        generatePlant()
      }, scrollTimer * 7)
    } else {
      clearInterval(newPlantTimer)
      newPlantTimer = null
    }
  }


  function newWaspTimerStart() {
    if (!newWaspTimer) {
      newWaspTimer = setInterval(() => generateLeftMoving(firstWaspNull, waspArray, waspClass), scrollTimer * 10)
    } else {
      clearInterval(newWaspTimer)
      newWaspTimer = null
    }
  }

  function newPollenTimerStart() {
    if (!newPollenTimer) {
      newPollenTimer = setInterval(() => generateLeftMoving(firstPollenNull, pollenArray, pollenClass), scrollTimer * 15)
    } else {
      clearInterval(newPollenTimer)
      newPollenTimer = null
    }
  }

  function newAcornTimerStart() {
    if (!newAcornTimer) {
      newAcornTimer = setInterval(() => generateLeftMoving(firstAcornNull, acornArray, acornClass), scrollTimer * 11)
    } else {
      clearInterval(newAcornTimer)
      newAcornTimer = null
    }
  }

  function newLifeTimerStart() {
    if (!newLifeTimer) {
      newLifeTimer = setInterval(() => generateLeftMoving(firstLifeNull, lifeArray, livesFullClass), scrollTimer * 100)
    } else {
      clearInterval(newLifeTimer)
      newLifeTimer = null
    }
  }




  function startTimers() {

    scrollStart()
    // resetGravityTimer()
    applyGravity()
    newWaspTimerStart()
    newPollenTimerStart()
    newAcornTimerStart()
    newLifeTimerStart()
    waspFlyingTimer()
    honeyFiringTimer()
    fallingAcornTimer()
    newPlantTimerStart()
    checkingForHit()

  }

  function clearTimers() {
    clearInterval(scrolling)
    scrolling = null
    clearInterval(gravity)
    gravity = null
    clearInterval(waspFlying)
    waspFlying = null
    clearInterval(newWaspTimer)
    newWaspTimer = null
    clearInterval(newPlantTimer)
    newPlantTimer = null
    clearInterval(newPollenTimer)
    newPollenTimer = null
    clearInterval(newAcornTimer)
    newAcornTimer = null
    clearInterval(newLifeTimer)
    newLifeTimer = null
    clearInterval(honeyFiring)
    honeyFiring = null
    clearInterval(collisionTimer)
    collisionTimer = null
    clearInterval(fallingAcorn)
    fallingAcorn = null
    clearInterval(checkingForSuccessfulHitTimer)
    checkingForSuccessfulHitTimer = null
  }


  function resetGravityTimer() {
    clearInterval(gravity)
    gravity = null
    applyGravity()
  }


  function beeCollision(arr1, arr2, class2) {

    const filteredArray = arr2.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })


    const positionsArrray = filteredArray.map(item => item.currentPosition)


    const mergedArray = beeCurrentPosition.concat(positionsArrray)


    const uniqueArray = []
    const duplicates = []

    mergedArray.filter(item => {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item)
      } else {
        duplicates.push(item)
      }
    })


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



    const filteredArray = mergedArray.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })



    const positionsArrray = filteredArray.map(item => item.currentPosition)


    const uniqueArray = []
    const duplicates = []



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
          }, 100)
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

  function checkingForHit() {

    if (!checkingForSuccessfulHitTimer) {
      checkingForSuccessfulHitTimer = setInterval(() => {
        honeyArray.forEach(item => {
          if (item.currentPosition && cells[item.currentPosition].classList.contains(waspClass) || item.currentPosition && cells[item.currentPosition].classList.contains(acornClass)) {
            honeyCheck(honeyArray, waspArray, honeyClass, waspClass)
            honeyCheck(honeyArray, acornArray, honeyClass, acornClass)
          }
        })
      }, 10)
    } else {
      clearInterval(checkingForSuccessfulHitTimer)
      checkingForSuccessfulHitTimer = null
    }

  }

  function startCollisionCheck() {

    if (!collisionTimer && currentLives.length > 0) {
      collisionTimer = setInterval(() => {
        beeCurrentPosition.forEach(item => {
          if (canCheckCollision) {
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
              toggleCollision(plantClass)
            }
          }
        })

      }, 25)
    }
  }

  function updateLives(classType) {
    if (classType === waspClass || classType === plantClass || classType === acornClass) {
      currentLives.pop()
      ouch.play()
    } else if (classType === livesFullClass && currentLives.length < 4) {
      currentLives.push('life')
    }
    if (currentLives.length <= 0) {
      setTimeout(() => {
        gameOver()
      }, 20)
    }
    livesGraphicUpdate()
  }


  function toggleCollision(classType) {
    if (classType === waspClass || classType === plantClass || classType === acornClass) {
      beePic.classList.toggle('collision')
      updateLives(classType)
      canCheckCollision = false
      setTimeout(() => {
        canCheckCollision = true
        beePic.classList.toggle('collision')
        startCollisionCheck()
      }, 1000)
    } else {
      updateLives(classType)
    }
  }


  function livesGraphicUpdate() {
    // console.log('CURRENT LIFE', currentLives)
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



  function scoreUpdate(itemClass) {
    if (itemClass === flowerClass) {
      currentScore++
      ding.play()
    } else if (itemClass === waspClass) {
      currentScore += 20
      splat.play()
      waspCount++
    } else if (itemClass === acornClass) {
      currentScore += 30
      splat.play()
      acornCount++
    } else if (itemClass === pollenClass) {
      currentScore += 10
      ding.play()
    } else if (itemClass === livesFullClass) {
      currentScore += 50
      oneUp.play()
    }
    score.innerText = currentScore
  }



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


  function runStartGame() {

    mainMenu.classList.toggle(hiddenClass)
    // mainMenuToggle.classList.toggle(hiddenClass)
    setTimeout(() => {
      header.classList.toggle(hiddenClass)
      main.classList.toggle(hiddenClass)
      startGameDecision()
    }, 500)

  }

  function returnToMainMenu() {
    gameOverCard.classList.toggle(hiddenClass)
    mainMenu.classList.toggle(hiddenClass)
    if (mainMenuToggle.classList.contains(hiddenClass)) {
      mainMenuToggle.classList.remove(hiddenClass)
    }
  }


  function playAgain() {
    gameOverCard.classList.toggle(hiddenClass)
    setTimeout(() => {
      header.classList.toggle(hiddenClass)
      main.classList.toggle(hiddenClass)
      startGameDecision()
    }, 500)
  }


  function gameOver() {
    // console.log('GAME OVER')
    clearTimers()
    waspsDOM.innerText = waspCount
    acornsDOM.innerText = acornCount
    gameOverCard.classList.toggle(hiddenClass)
    main.classList.toggle(hiddenClass)
    header.classList.toggle(hiddenClass)
    themeTune.pause()
    resultsScoreFromDOM.innerText = currentScore
    document.removeEventListener('keydown', navigate)
  }

  // document.addEventListener('keydown', navigate)

  startButton.addEventListener('click', openMain)

  howToPlay.addEventListener('click', openHowToPlay)

  startGame.addEventListener('click', runStartGame)

  rulesBackButton.addEventListener('click', backToMain)

  gameOverReturnButton.addEventListener('click', returnToMainMenu)

  playAgainButton.addEventListener('click', playAgain)



}

window.addEventListener('DOMContentLoaded', init)