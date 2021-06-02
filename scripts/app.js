function init() {

  console.log('linked')

  const grid = document.querySelector('.grid')
  const backgroundGrid = document.querySelector('.backgroundGrid')
  const livesGraphic = document.querySelectorAll('.honeycomb')
  const lives = document.querySelector('#livesNum')
  const score = document.querySelector('#scoreNum')
  const gameOverCard = document.querySelector('#gameOver')
  const themeTune = document.querySelector('#themeTune').play()
  const ouch = document.querySelector('#ouch')
  const ding = document.querySelector('#ding')
  const splat = document.querySelector('#splat')
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
  const honeySplatClass = 'honeySplat'
  const livesFullClass = 'livesFull'
  const livesEmptyClass = 'livesEmpty'
  const beeCurrentPosition = []
  let scrollTimer = 150
  let gravityTimer = 650
  let waspInterval = 1000
  let collisionTimer = null
  let gravity = 0
  const endColumns = []
  const endColumnsUpper = []
  const topRow = []
  const plantHeightOptions = [1, 2, 3, 4, 5]
  let currentLives = ['life', 'life', 'life']

  let currentScore = 0
  score.innerText = currentScore

  beeCurrentPosition[0] = width * (height / 4) + 2


  class GeneratedItem {

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
      } else if (this.currentPosition % width === 0) {
        this.currentPosition = null
      }
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


  }

  // * Old Classes

  // class Honey {

  //   constructor(name, currentPosition) {

  //     this.name = name
  //     this.currentPosition = currentPosition

  //   }

  //   addHoney() {
  //     if (this.currentPosition && this.currentPosition % width !== width - 1) {
  //       cells[this.currentPosition].classList.add(honeyClass)
  //     }
  //   }

  //   removeHoney() {
  //     if (this.currentPosition && this.currentPosition % width !== width - 1) {
  //       cells[this.currentPosition].classList.remove(honeyClass)
  //       this.currentPosition++
  //     } else if (this.currentPosition % width === width - 1) {
  //       this.currentPosition = null
  //     }
  //   }
  // }


  // class Plant {

  //   constructor(name, currentPosition) {

  //     this.name = name
  //     this.currentPosition = currentPosition

  //   }

  //   addPlant() {
  //     if (this.currentPosition.length > 0 && this.currentPosition[0] % width !== 0) {
  //       this.currentPosition.forEach(index => cells[index].classList.add(plantClass))

  //       cells[this.currentPosition[this.currentPosition.length - 1] - width].classList.add(flowerClass)

  //     }

  //   }

  //   removePlant() {
  //     if (this.currentPosition.length > 0 && this.currentPosition[0] % width !== 0) {
  //       this.currentPosition.forEach(index => cells[index].classList.remove(plantClass))
  //       // console.log('THIS IS THE LENGTH', this.name, this.currentPosition.length)
  //       // console.log('GOING AS EXPECTED', this.name, this.currentPosition[0])
  //       cells[this.currentPosition[this.currentPosition.length - 1] - width].classList.remove(flowerClass)
  //       this.currentPosition = this.currentPosition.map(indexValue => {
  //         indexValue--
  //         return indexValue
  //       })
  //     } else if (this.currentPosition.length > 0 && this.currentPosition[0] % width === 0) {
  //       this.currentPosition = []
  //       // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!HERE!!!!!!', this.currentPosition)
  //     }
  //   }
  // }


  // class Pollen {

  //   constructor(name, currentPosition) {

  //     this.name = name
  //     this.currentPosition = currentPosition

  //   }

  //   addPollen() {
  //     if (this.currentPosition && this.currentPosition % width !== 0) {
  //       cells[this.currentPosition].classList.add(pollenClass)
  //     }
  //   }

  //   removePollen() {
  //     if (this.currentPosition && this.currentPosition % width !== 0) {
  //       cells[this.currentPosition].classList.remove(pollenClass)
  //       this.currentPosition--
  //     } else if (this.currentPosition % width === 0) {
  //       this.currentPosition = null
  //     }
  //   }
  // }

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

  const lifeOne = new GeneratedItem('lifeOnePosition', null)
  const lifeTwo = new GeneratedItem('lifeTwoPosition', null)


  const waspArray = [waspOne, waspTwo, waspThree, waspFour, waspFive]

  const honeyArray = [honeyOne, honeyTwo, honeyThree, honeyFour, honeyFive, honeySix, honeySeven, honeyEight, honeyNine, honeyTen]

  const plantArray = [plantOne, plantTwo, plantThree, plantFour, plantFive, plantSix]

  const pollenArray = [pollenOne, pollenTwo, pollenThree, pollenFour, pollenFive]

  const lifeArray = [lifeOne, lifeTwo]

  console.log(honeyArray)

  let firstWaspNull = null
  let firstHoneyNull = null
  let firstPlantNull = null
  let firstPollenNull = null
  let firstLifeNull = null

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
      // console.log('UPPER>>>', endColumnsUpper)
    }

    console.log(plantOneCurrentPosition)


    livesGraphicUpdate()
    addBee()
    // generatePlant()
    // addPlant()
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

  // function addPlant() {
  //   console.log(plantOneCurrentPosition)
  //   if (plantOneCurrentPosition.length === 0) {
  //     plantOneCurrentPosition[0] = width * height - 1
  //     for (let p = 1; p < plantHeights[Math.floor(Math.random() * plantHeights.length)]; p++) {
  //       plantOneCurrentPosition.push(plantOneCurrentPosition[0] - (width * p))
  //       console.log(plantOneCurrentPosition)
  //     }
  //   }
  //   plantOneCurrentPosition.forEach(index => cells[index].classList.add(plantClass))
  //   cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.add(flowerClass)

  // }

  // // function addPlant(position) {
  // //   plantOneCurrentPosition.forEach(index => cells[index].classList.add(plantClass))
  // //   cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.add(flowerClass)
  // // }

  // function removePlant(position) {
  //   plantOneCurrentPosition.forEach(index => cells[index].classList.remove(plantClass))
  //   cells[plantOneCurrentPosition[plantOneCurrentPosition.length - 1] - width].classList.remove(flowerClass)
  // }


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

  function generatePollen() {
    firstPollenNull = pollenArray.find(pollen => {
      return !pollen.currentPosition
    })
    firstPollenNull.currentPosition = endColumnsUpper[Math.floor(Math.random() * endColumns.length)]
  }

  function generateLeftMoving(nullType, arrayType) {
    nullType = arrayType.find(item => {
      return !item.currentPosition
    })
    nullType.currentPosition = endColumnsUpper[Math.floor(Math.random() * endColumns.length)]
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

  // function addHoney() {
  //   if (!honeyOneCurrentPosition) {
  //     honeyOneCurrentPosition = beeCurrentPosition[1] + 1
  //     console.log('HONEY POS>>', honeyOneCurrentPosition)
  //   }
  //   cells[honeyOneCurrentPosition].classList.add(honeyClass)
  // }

  // function removeHoney() {
  //   cells[honeyOneCurrentPosition].classList.remove(honeyClass)
  // }


  // function addPollen() {
  //   if (!pollenOneCurrentPosition) {
  //     pollenOneCurrentPosition = endColumnsUpper[Math.floor(Math.random() * endColumnsUpper.length)]
  //   }
  //   cells[pollenOneCurrentPosition].classList.add(pollenClass)

  // }

  // function removePollen(position) {
  //   cells[pollenOneCurrentPosition].classList.remove(pollenClass)
  // }

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
      console.log('WASPS', waspArray, 'HONEY', honeyArray)
    } else if (key === 'Escape') {
      clearInterval(scrolling)
      clearInterval(gravity)
      clearInterval(waspFlying)
      clearInterval(newWaspTimer)
      clearInterval(newPlantTimer)
      clearInterval(newPollenTimer)
      clearInterval(honeyFiring)
      clearInterval(collisionTimer)
      clearInterval(fallingAcorn)
      clearInterval(newLifeTimer)

    }
    console.log('CURRENT BEE', beeCurrentPosition)
    // console.log('DELAY IN HOLD>>>>', new Date().getMilliseconds())
    addBee(beeCurrentPosition)
  }


  const scrolling = setInterval(() => {
    // removePlant()
    removeAcorn()

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

    // if (plantOneCurrentPosition[0] % width !== 0) {
    //   plantOneCurrentPosition = plantOneCurrentPosition.map(value => {
    //     value--
    //     console.log('VALUE>>', value)
    //     return value
    //   })
    //   console.log('NEW ARRAY>>', plantOneCurrentPosition)
    // } else {
    //   plantOneCurrentPosition = []
    // }
    // addPlant()

    // if (acornCurrentPosition % width !== 0) {
    //   acornCurrentPosition--
    //   addAcorn(acornCurrentPosition)
    // }

    // if (honeyOneCurrentPosition) {
    //   removeHoney()

    //   if (honeyOneCurrentPosition % width !== width - 1) {
    //     honeyOneCurrentPosition++
    //     addHoney()
    //   } else {
    //     honeyOneCurrentPosition = null
    //   }
    // }

    // if (pollenOneCurrentPosition) {
    //   removePollen()

    //   if (pollenOneCurrentPosition % width !== 0) {
    //     pollenOneCurrentPosition--
    //     addPollen()
    //   } else {
    //     pollenOneCurrentPosition = null
    //   }
    // }
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
        currentLives.pop()
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
  }, scrollTimer * 0.65)


  const honeyFiring = setInterval(() => {
    honeyArray.forEach(honey => {
      honey.removeHoney()
      honey.addHoney()
    })

  }, scrollTimer * 0.6)


  const newPlantTimer = setInterval(() => generatePlant(), scrollTimer * 7)


  const newPollenTimer = setInterval(() => generatePollen(), scrollTimer * 15)


  const newLifeTimer = setInterval(() => generateLeftMoving(firstLifeNull, lifeArray), scrollTimer * 60)



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




  function beeCollision(arr1, arr2, class2) {

    const filteredArray = arr2.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })

    console.log('FILTERED>>>', filteredArray)

    const positionsArrray = filteredArray.map(item => item.currentPosition)

    console.log('POSITIONS ONLY>>>', positionsArrray)

    const mergedArray = beeCurrentPosition.concat(positionsArrray)

    console.log('MERGED>>>>', mergedArray)

    const uniqueArray = []
    const duplicates = []

    mergedArray.filter(item => {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item)
      } else {
        duplicates.push(item)
      }
    })

    console.log('UNIQUE VALUES>>>>', uniqueArray)
    console.log('DUPLICATE VALUES>>>>', duplicates)

    duplicates.forEach(item => {
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].currentPosition === item) {
          arr2[i].currentPosition = null
          cells[item].classList.remove(class2)

          if (class2 === waspClass) {
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

    console.log('MERGED>>>>', mergedArray)


    const filteredArray = mergedArray.filter(item => {
      if (item.currentPosition) {
        return item.currentPosition
      }
    })

    console.log('FILTERED>>>', filteredArray)


    const positionsArrray = filteredArray.map(item => item.currentPosition)

    console.log('POSITIONS ONLY>>>', positionsArrray)

    const uniqueArray = []
    const duplicates = []

    console.log('UNIQUE VALUES>>>>', uniqueArray)
    console.log('DUPLICATE VALUES>>>>', duplicates)


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

      scoreUpdate(waspClass)
    })

  }

  function startCollisionCheck() {
    // console.log('COLLISION TIMER AT START OF CHECK', collisionTimer)
    // console.log('STARTING CHECK')

    if (!collisionTimer) {
      collisionTimer = setInterval(() => {
        // console.log('COLLISION TIMER AFTER INITIATION', collisionTimer)
        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(waspClass))
            beeCollision(beeCurrentPosition, waspArray, waspClass)
        })

        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(pollenClass))
            beeCollision(beeCurrentPosition, pollenArray, pollenClass)
        })

        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(livesFullClass))
            beeCollision(beeCurrentPosition, lifeArray, livesFullClass)
        })

        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(flowerClass))
            scoreUpdate(flowerClass)
        })

        beeCurrentPosition.forEach(item => {
          if (cells[item].classList.contains(plantClass))
            toggleCollision(waspClass)
        })

        honeyArray.forEach(item => {
          if (item.currentPosition && cells[item.currentPosition].classList.contains(waspClass)) {
            console.log('<<<<<<<<<<<<<<<<<<<SPLAT>>>>>>>>>>>>>>>>')
            honeyCheck(honeyArray, waspArray, honeyClass, waspClass)
          }
        })

        // beeCurrentPosition.forEach(indexValue => {
        //   if (cells[indexValue].classList.contains(typeOne) || cells[indexValue].classList.contains(typeTwo) || cells[indexValue].classList.contains(typeThree)) {
        //     collisionDetectedBad()
        //   } else if (cells[indexValue].classList.contains(typeFour) || cells[indexValue].classList.contains(typeFive)) {
        //     collisionDetectedGood()
        //   }
        // }
        // )

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
      }, 10)
    }
  }

  function updateLives(classType) {
    if (classType === waspClass || classType === plantClass) {
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
    if (classType === waspClass || classType === plantClass) {
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

  function scoreUpdate(itemClass) {
    if (itemClass === flowerClass) {
      currentScore++
      ding.play()
    } else if (itemClass === waspClass) {
      currentScore += 20
      splat.play()
    } else if (itemClass === pollenClass) {
      currentScore += 10
      ding.play()
    } else if (itemClass === livesFullClass) {
      currentScore += 50
      ding.play()
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
    clearInterval(scrolling)
    clearInterval(gravity)
    clearInterval(waspFlying)
    clearInterval(newWaspTimer)
    clearInterval(newPlantTimer)
    clearInterval(honeyFiring)
    clearInterval(collisionTimer)
    clearInterval(fallingAcorn)
    clearInterval(newLifeTimer)
    gameOverCard.classList.toggle('hidden')
    grid.classList.toggle('hidden')
    backgroundGrid.classList.toggle('hidden')
    // window.alert('GAME OVER')
  }

  document.addEventListener('keydown', navigate)
}

window.addEventListener('DOMContentLoaded', init)