'use strict'

import Matrix from './matrix.js'
import Snake from './snake.js'
import PopUp from './popUp.js'

const gameField = document.querySelector('.field')
const startBtn = document.querySelector('.startBtn')

const matrix = new Matrix(gameField)
const snake = new Snake(matrix, 10, 10, 'right')

const gameplay = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameplay.mp3')
document.querySelector('#gameplay').innerHTML = '<audio><source src="https://ant-c-tech.github.io/Snake-Game/audio/gameplay.mp3"></audio>'
gameplay.loop = true
gameplay.volume = 1

const gameover = new Audio('https://ant-c-tech.github.io/Snake-Game/audio/gameover.mp3')
document.querySelector('#gameover').innerHTML = '<audio><source src="https://ant-c-tech.github.io/Snake-Game/audio/gameover.mp3"></audio>'
gameover.volume = 1

//Matrix
matrix.create()
matrix.render()
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

})

// matrix.setCell(1, 2, 'fruit')


//Snake
snake.render()


//Modal - Game Over
const modal = new PopUp({
    openBtn: 'openPopUp',
    container: 'modalGameOver',
    content: `<div class="animTarget-anim p-3 rounded mb-3">
            <h1 class="text-light">Game Over</h1>
            <button class="btn btn-primary startNewGameBtn" type="button">Start new game</button>
        </div>`,
    maskColor: `#d6e6f9`,
    maskOpacity: '0.8',
})

window.addEventListener('load', () => {
    modal.render()
})

window.addEventListener('resize', function () {
    modal.resize()
})


//Gameplay
startBtn.addEventListener('click', function () {
    let gameInterval = setInterval(() => {
        snake.move()
        if (snake.alive === false) {
            clearInterval(gameInterval)
            matrix.gameOverAnimation()
            gameplay.pause()
            gameover.play()
        }
    }, 500)

    gameplay.play()
}, { once: true })

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