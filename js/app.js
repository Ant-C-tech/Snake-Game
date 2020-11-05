'use strict'

import Matrix from './matrix.js'
import Snake from './snake.js'
import PopUp from './popUp.js'

const gameField = document.querySelector('.field')
const startBtn = document.querySelector('.startBtn')
const pauseBtn = document.querySelector('.pauseBtn')
let restartBtn
let gameInterval

//New modules
const matrix = new Matrix(gameField)
const snake = new Snake(matrix)
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

//Music
const gameplay = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameplay.mp3')
// document.querySelector('#gameplay').innerHTML = '<audio><source src="https://ant-c-tech.github.io/Snake-Game/audio/gameplay.mp3"></audio>'
gameplay.loop = true
gameplay.volume = 1
const gameover = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameover.mp3')
// document.querySelector('#gameover').innerHTML = '<audio><source src="https://ant-c-tech.github.io/Snake-Game/audio/gameover.mp3"></audio>'
gameover.volume = 0.4


//=====================  Gameplay  ===========================
// Game elements
createNewField()
snake.render()

// Game control
document.onkeydown = function (event) {
    switch (event.key) {
        case 'ArrowRight':
            snake.direction = 'right'
            break
        case 'ArrowLeft':
            snake.direction = 'left'
            break
        case 'ArrowDown':
            snake.direction = 'bottom'
            break
        case 'ArrowUp':
            snake.direction = 'top'
            break
    }
}
startBtn.addEventListener('click', startGame, { once: true })
modal.render()
restartBtn = document.querySelector('.startNewGameBtn')
restartBtn.addEventListener('click', reStartGame)


//Resize
window.addEventListener('resize', function () {
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


//Functions
function createNewField() {
    matrix.create()
    matrix.render()
}

function startGame() {
    pauseBtn.addEventListener('click', pauseGame, { once: true })
    gameInterval = setInterval(() => {
        snake.move()
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
    snake.render()
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

// matrix.setCell(1, 2, 'fruit')
