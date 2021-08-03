# American Were-Bee in London
Software Engineering Immersive Course - Project-1

[American Were-Bee in London - Deployed Game](https://richardknight88.github.io/project-1/)

<p align="center" >
  <img width="80%" src="./assets/screenshots/gameplay/gameplay_gif_2.gif" alt="gameplay gif"/>
</p>

## Table of Contents
 [The Brief](#the-brief) <br>
 [The Build](#the-build) <br>
 [How To Play](#how-to-play) <br>


## The Brief

The project brief was to create a game that used a grid as the environment for gameplay.

Of the example games suggested to create, space invaders, tetris, pacman and frogger intrigued me most.

I wondered if I could combine concepts from all of these into one game. Obstacle avoidance, 'gravity', projectiles, point scoring. 

Then add an autoscroll.
<br>

## The Build

Creating a grid was the first step. Defining a width and height in JavaScript and using a for loop to add divs through the DOM means a quick change to size can be applied in JavaScript instead of hard coding individual divs in HTML.
With this built all divs ('cells') are accessed with arguments related to the width and/or height variables.

By adding and removing classes with different background images it gives the impression that an item is moving through the gameplay environment.

My process was to add individual components to test the theory before expanding on this. Starting from making one thing autoscroll very quickly changes to multiple components and automation.

One of the big initial steps was to create the 'plants' - stems topped by a flower. These span a number of 'cells' and need to be accessed as a single unit. Dropping them into arrays was no problem and after this it was just a little trickier to move them as a single cell.
<br>


### Our Protaganist || The Were-Bee
With a gameplay environment and some moving components there was an issue with the scale of the main character. The lessons learned in fine-tuning control of a 'plant' could be applied here. An ```<img>``` element of the bee applied to the first index of the position array meant the bee could be much larger and be the focus of the game.
<br>


## Code Examples
By creating a new Object Class for the automatically generated components, different functions could be defined to update the position of each item based on the relevant movement of that item through the game play environment.

As an example, 'wasps', 'pollen' and 'lives' all move right-to-left through the gameplay environment. Building the functions as below allowed me to reuse these functions.

```js

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

```

At set intervals new items would be generated and added to arrays. The movement of all of these items could be controlled with array methods like below.

```js

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

```
<br>


## Wins

```js

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

```

At first my collision detection to remove lives was just 'if there is a certain CSS style class attached to any of my bee position then remove a life'.

To add complexity and apply the same principles to remove 'enemies' when hit by projectiles I needed to know which enemy was hit or which enemy hit the main character.

 I used array methods to cycle through the arrays of each extract the duplicates and remove the specific enemy.


## Styling

The style is deliberately cartoonish as I felt attempting to apply realistic visual could detract from the game.

The title and story explained in the how to are an amusing step away from the jovial nature of the game.

For the screens/cards HTML elements are accessed through the DOM - styled in CSS and have a 'hidden' class toggled as needed.

## Future Improvements

With more time I would have liked to add a leaderboard using the localStorage.

I would like to have gradually increased the speed of scroll to increase difficulty as time prgressed and add random bursts of wasps.

A 'boss' character that enters after a certain period of time, needs to be struck a set number of times and who moves in 2 dimensions - similar to the main character.


## How to Play

You are an American Were-Bee in London. You only have two thirsts; pollen & revenge!

Navigate around London's gardens using the arrow keys looking to quench these thirsts.

Flowers are a great source of pollen. The longer you spend on a flower the more pollen you collect! Be careful not to touch their stems, they are dangerous to were-bees!

You will also find a great deal of pollen has been stirred up into the air at this time of year.

Be on the look out for the vampire wasps that massacred your colony. 

It's a well known fact that acorns sided with the vampires in the war.

When you see either you can fire your garlic-honey infusion with the SPACE bar. Let them taste your vengeance.

Make sure you are actively flying! You're a little chunkier than you used to be so you'll find yourself starting to drop if you stop flying.

You don't want to get too low. Someone seems to have spilled London tap water on the grass as it's laced with quicksilver - instantly deadly!