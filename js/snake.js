'use strict'

import Elem from './elem.js'

export default class Snake extends Elem {

    constructor(matrix, snakeElem, matrixElem) {
        super(matrix)

        this.direction = 'right'
        this.alive = true

        this.valueCollection = snakeElem
        this.matrixElem = matrixElem

        this.value
        this.coords
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

        if (!_isAlive(snakeHead[0], snakeHead[1], this.matrix.rows, this.matrix.cols) || this.matrix.getCell([snakeHead[0], snakeHead[1]]) === 'wall') {

            this.value = [this.valueCollection[3], this.valueCollection[1], this.valueCollection[1], this.valueCollection[2]]

            this.alive = false
            return false
        }

        if (this.matrix.getCell([snakeHead[0], snakeHead[1]]) === 'fruit') {
            console.log('Niam!!!');
        }

        this.coords.pop()
        this.coords.unshift([snakeHead[0], snakeHead[1]])
        this.matrix.renderElement(snakeTail[0], snakeTail[1], this.matrixElem) // Clear last tail position

    }

    setStartPosition() {
        this.value = [this.valueCollection[0], this.valueCollection[1], this.valueCollection[1], this.valueCollection[2]]
        this.coords = [[4, 10], [3, 10], [2, 10], [1, 10]]
        this.alive = true
        this.valueCollection[0].direction = 270
        this.direction = 'right'
    }

}

function _isAlive(x, y, rowsNum, colsNum) {
    return x >= 1 && x <= colsNum && y >= 1 && y <= rowsNum
}