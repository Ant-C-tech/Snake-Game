'use strict'
import Matrix from './matrix.js'
import Snake from './snake.js'

const gameField = document.querySelector('.field')
const startBtn = document.querySelector('.startBtn')

const matrix = new Matrix(gameField)
const snake = new Snake(matrix, 10, 10, 'right')

const gameplay = new Audio('/audio/gameplay.mp3')
document.querySelector('#gameplay').innerHTML = '<audio><source src="/audio/gameplay.mp3"></audio>'
const gameover = new Audio('/audio/gameover.mp3')
document.querySelector('#gameover').innerHTML = '<audio><source src="/audio/gameover.mp3"></audio>'
gameplay.loop = true
gameplay.volume = 1
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