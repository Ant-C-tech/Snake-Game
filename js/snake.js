'use strict'

export default class Snake {

    constructor(matrix, x, y, direction) {
        this.matrix = matrix
        this.x = x
        this.y = y
        this.direction = direction
        this.alive = true
        this.animationDirect = 270
    }



    render() {
        // this.matrix.setCell(this.x, this.y, 'snake')

        this.matrix.setCell(this.x, this.y, {
            name: 'snake',
            src: 'img/snake.png',
            alt: 'snake head',
            direction: this.animationDirect,
        })
    }

    move() {
        if (this.alive === false) {
            return false
        }

        let lastX = this.x
        let lastY = this.y

        switch (this.direction) {
            case 'right':
                this.x++
                this.animationDirect = 270
                break
            case 'left':
                this.x--
                this.animationDirect = 90
                break
            case 'bottom':
                this.y++
                this.animationDirect = 0
                break
            case 'top':
                this.y--
                this.animationDirect = 180
                break
        }

        if (!_isAlive(this.x, this.y, this.matrix.rows, this.matrix.cols)) {
            this.alive = false
            return false
        }

        this.matrix.setCell(lastX, lastY, {
            name: 'grass',
            src: 'img/grass.png',
            alt: 'grass',
            direction: 0,
        })
        this.matrix.setCell(this.x, this.y, {
            name: 'snake',
            src: 'img/snake.png',
            alt: 'snake head',
            direction: this.animationDirect,
        })
    }

}

function _isAlive(x, y, rowsNum, colsNum) {
    return x >= 1 && x <= colsNum && y >= 1 && y <= rowsNum
}