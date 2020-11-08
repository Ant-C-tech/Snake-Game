'use strict'

import Matrix from './matrix.js'
import Snake from './snake.js'
import PopUp from './popUp.js'
import Fruit from './fruit.js'
import Wall from './wall.js'

const gameSpace = document.querySelector('html')
const gameField = document.querySelector('.field')
const startBtn = document.querySelector('.startBtn')
const pauseBtn = document.querySelector('.pauseBtn')
let restartBtn
let gameInterval

//Graphics
const matrixElem = {
    name: 'grass',
    src: 'img/grass.png',
    alt: 'grass',
    direction: 0,
}
const snakeElem = [{
    name: 'snake',
    src: 'img/snake.png',
    alt: 'snake head',
    direction: 270,
}, {
    name: 'snake',
    src: 'img/tennis-ball.png',
    alt: 'snake body',
    direction: 0,
},
{
    name: 'snake',
    src: 'img/tennis-ball.png',
    alt: 'snake tail',
    direction: 0,
}, {
    name: 'snake',
    src: 'img/shockwave.png',
    alt: 'explosion',
    direction: 0,
},
]
const wallElem = {
    name: 'wall',
    src: 'img/brick-wall.png',
    alt: 'wall',
    direction: 0,
}
const fruitElem = [{
    name: 'fruit',
    src: 'img/apple.png',
    alt: 'apple',
    direction: 0,
}, {
    name: 'fruit',
    src: 'img/pineapple.png',
    alt: 'pineapple',
    direction: 0,
},
{
    name: 'fruit',
    src: 'img/watermelon.png',
    alt: 'watermelon',
    direction: 0,
},
{
    name: 'fruit',
    src: 'img/cherry.png',
    alt: 'cherry',
    direction: 0,
},
{
    name: 'fruit',
    src: 'img/bananas.png',
    alt: 'bananas',
    direction: 0,
},
]

//New modules
const matrix = new Matrix(gameField, matrixElem)
const snake = new Snake(matrix, snakeElem, matrixElem)
const modal = new PopUp({
    container: 'modalGameOver',
    content: `<div class="gameOver mb-3">
            <h1 class="gameOver__title display-3">Game Over</h1>
                    <img class="gameOver__img mb-1" src="img/emergency-truck.png" alt="emergency-truck">
            <button class="btn btn-primary startNewGameBtn" type="button">Play new game</button>
        </div>`,
    maskColor: `#d6e6f9`,
    maskOpacity: '0.01',
    bgColor: '#795548'
})
const fruit = new Fruit(matrix, fruitElem)
const wall = new Wall(matrix, wallElem)

//Music
const gameplay = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameplay.mp3')
gameplay.loop = true
gameplay.volume = 1
const gameover = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameover.mp3')
gameover.volume = 0.4

// Phone adoptation
const mql = window.matchMedia("(orientation: landscape)");
if (mql.matches && document.documentElement.clientWidth <= 1025) {
    gameSpace.style.width = document.documentElement.clientHeight + 'px'
}

//=====================  Gameplay  ===========================
// Game elements
createNewField()
snake.setStartPosition()
snake.render()
for (let i = 0; i < 3; i++) {
    wall.setStartPosition()
    wall.render()
}

fruit.setStartPosition()
fruit.render()
// console.log(matrix.cellsArr);


// Game control
document.onkeydown = function (event) {
    switch (event.key) {
        case 'ArrowRight':
            if (snake.direction != 'left') {
                snake.direction = 'right'
            }
            break
        case 'ArrowLeft':
            if (snake.direction != 'right') {
                snake.direction = 'left'
            }
            break
        case 'ArrowDown':
            if (snake.direction != 'top') {
                snake.direction = 'bottom'
            }
            break
        case 'ArrowUp':
            if (snake.direction != 'bottom') {
                snake.direction = 'top'
            }
            break
    }
}
startBtn.addEventListener('click', startGame, { once: true })
modal.render()
restartBtn = document.querySelector('.startNewGameBtn')
restartBtn.addEventListener('click', reStartGame)
//===================== /Gameplay  ===========================

//Resize
window.addEventListener('resize', function () {

    if (mql.matches && document.documentElement.clientWidth <= 1025) {
        gameSpace.style.width = document.documentElement.clientHeight + 'px'
    }

    if (window.innerWidth > 768) {
        document.querySelector('.wrapper').classList.add('container')
        document.querySelector('.wrapper').classList.remove('container-fluid')
        matrix.render()
    } else {
        document.querySelector('.wrapper').classList.add('container-fluid')
        document.querySelector('.wrapper').classList.remove('container')
        matrix.render()
    }
    modal.resize()
})


//==========================  Functions  ====================================
function createNewField() {
    matrix.create()
    matrix.render()
}

function startGame() {
    pauseBtn.addEventListener('click', pauseGame, { once: true })
    gameInterval = setInterval(() => {
        snake.move()
        snake.render()
        // console.log(matrix.cellsArr);
        if (snake.alive === false) {
            clearInterval(gameInterval)
            matrix.gameOverAnimation()
            gameplay.pause()
            gameplay.currentTime = 0
            gameover.play()
            setTimeout(
                () => {
                    modal.showPopup()
                }, 1000
            )
        }
    }, 500)

    gameplay.play()
}

function reStartGame() {
    gameover.pause()
    gameover.currentTime = 0
    modal.hidePopup()
    reCreateNewField()
    snake.setStartPosition()
    snake.render()
    for (let i = 0; i < 3; i++) {
        wall.setStartPosition()
        wall.render()
    }
    fruit.setStartPosition()
    fruit.render()
    startBtn.addEventListener('click', startGame, { once: true })
}

function pauseGame() {
    gameplay.pause()
    clearInterval(gameInterval)
    startBtn.addEventListener('click', startGame, { once: true })
}

function reCreateNewField() {
    matrix.clear()
    createNewField()
}


