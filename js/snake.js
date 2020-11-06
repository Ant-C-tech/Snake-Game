'use strict'

import Elem from './elem.js'

export default class Snake extends Elem {

    constructor(matrix, coords) {
        super(matrix, coords)

        this.matrix = matrix
        this.explosionPoint

        this.direction = 'right'
        this.alive = true
        this.animationDirect

        this.valueCollection = [{
            name: 'snake head',
            src: 'img/snake.png',
            alt: 'snake head',
            direction: this.animationDirect,
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

        this.value = [this.valueCollection[0], this.valueCollection[1], this.valueCollection[1], this.valueCollection[2]]
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
                this.animationDirect = 270
                console.log("Snake -> move -> this.animationDirect", this.animationDirect)
                break
            case 'left':
                snakeHead[0]--
                this.animationDirect = 90
                console.log("Snake -> move -> this.animationDirect", this.animationDirect)
                break
            case 'bottom':
                snakeHead[1]++
                this.animationDirect = 0
                console.log("Snake -> move -> this.animationDirect", this.animationDirect)
                break
            case 'top':
                snakeHead[1]--
                this.animationDirect = 180
                console.log("Snake -> move -> this.animationDirect", this.animationDirect)
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
        this.value = [this.valueCollection[0], this.valueCollection[1], this.valueCollection[1], this.valueCollection[2]]
        this.coords = [[10, 10], [9, 10], [8, 10], [7, 10]]
    }

}

function _isAlive(x, y, rowsNum, colsNum) {
    return x >= 1 && x <= colsNum && y >= 1 && y <= rowsNum
}