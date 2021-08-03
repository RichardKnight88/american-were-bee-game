# American Were-Bee in London
Software Engineering Immersive Course - Project-1

[American Were-Bee in London - Deployed Game](https://richardknight88.github.io/project-1/){:target="_blank" rel="noopener"}
<!-- <a href="https://richardknight88.github.io/project-1/" target="_blank">American Were-Bee in London - Deployed Game</a> -->

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


## The Build

Creating a grid was the first step. Defining a width and height in Javascript and using a for loop to add divs through the DOM means a quick change to size can be applied in javascript instead of hard coding individual divs in html.
With this built all divs ('cells') are accessed with arguments related to the width and/or height variables.

By adding and removing classes with different background images it gives the impression that an item is moving through the gameplay environment.

My process was to add individual components to test the theory before expanding on this. Starting from making one thing autoscroll very quickly changes to multiple components and automation.

One of the big initial steps was to create the 'plants' - stems topped by a flower. These span a number of 'cells' and need to be accessed as a single unit. Dropping them into arrays was no problem and after this it was just a little trickier to move them as a single cell.


#### Our Protaganist || The Were-Bee
With a gameplay environment and some moving components there was an issue with the scale of the main character. The lessons learned in fine-tuning control of a 'plant' could be applied here. An ```<img>``` element of the bee applied to the first index of the position array meant the bee could be much larger and be the focus of the game.


With building and testing individual components it became clear that each moving element had the same key features to control it. I built a new Class for generated components, created a number of each and applied them to arrays.

With this is place I could control the whole area with array methods.


## Fine Tuning / Wins

```js

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

```

At first my collision detection to remove lives was just 'if there is a certain CSS style class attached to any of my bee position then remove a life'.

To add complexity and apply the same principles to remove 'enemies' when hit by projectiles I needed to know which enemy was hit or which enemy hit the main character.

 I used array methods to cycle through the arrays of each extract the duplicates and remove the specific enemy.


## Styling

The style is deliberately cartoonish as I felt attempting to apply realistic visual could detract from the game.

The title and story explained in the how to are an amusing step away from the jovial nature of the game.

For the screens/cards Html elements are accessed through the DOM - styled in CSS and have a 'hidden' class toggled as needed.

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