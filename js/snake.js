'use strict'

import Elem from './elem.js'

export default class Snake extends Elem {

    constructor(matrix, coords, length) {
        super(matrix, coords)

        this.matrix = matrix
        this.length = length

        this.direction = 'right'
        this.alive = true

        this.valueCollection = [{
            name: 'snake head',
            src: 'img/snake.png',
            alt: 'snake head',
            direction: 270,
        }, {
            name: 'snake body',
            src: 'img/tennis-ball.png',
            alt: 'snake body',
            direction: 0,
        },
        {
            name: 'snake tail',
            src: 'img/tennis-ball.png',
            alt: 'snake tail',
            direction: 0,
        }, {
            name: 'explosion',
            src: 'img/shockwave.png',
            alt: 'explosion',
            direction: 0,
        },
        {
            name: 'grass',
            src: 'img/grass.png',
            alt: 'grass',
            direction: 0,
        },
        ]

        this.value = []
    }

    move() {
        if (this.alive === false) {
            return false
        }

        let snakeHead = this.coords[0].slice()
        let snakeTail = this.coords[this.coords.length - 1].slice()

        switch (this.direction) {
            case 'right':
                snakeHead[0]++
                this.valueCollection[0].direction = 270
                break
            case 'left':
                snakeHead[0]--
                this.valueCollection[0].direction = 90
                break
            case 'bottom':
                snakeHead[1]++
                this.valueCollection[0].direction = 0
                break
            case 'top':
                snakeHead[1]--
                this.valueCollection[0].direction = 180
                break
        }

        if (!_isAlive(snakeHead[0], snakeHead[1], this.matrix.rows, this.matrix.cols)) {

            this.value = [this.valueCollection[3], this.valueCollection[1], this.valueCollection[1], this.valueCollection[2]]

            this.alive = false
            return false
        }

        this.coords.pop()
        this.coords.unshift([snakeHead[0], snakeHead[1]])
        this.matrix.renderElement(snakeTail[0], snakeTail[1], this.valueCollection[4]) // Clear last tail position

    }

    setStartSettings() {
        this.valueCollection[0].direction = 270
        this.createSnake()
    }

    createSnake() {
        this.coords.push([this.length, 10])
        this.value.push(this.valueCollection[0])
        for (let i = 1; i < this.length - 1; i++) {
            this.coords.push([this.length - i, 10])
            this.value.push(this.valueCollection[1])
        }
        this.coords.push([1, 10])
        this.value.push(this.valueCollection[2])
    }

}

function _isAlive(x, y, rowsNum, colsNum) {
    return x >= 1 && x <= colsNum && y >= 1 && y <= rowsNum
}