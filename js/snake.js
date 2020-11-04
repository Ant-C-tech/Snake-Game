'use strict'

export default class Snake {

    constructor(matrix, direction) {
        this.matrix = matrix

        this.direction
        this.alive
        this.x
        this.y
        this.animationDirect
        this.explosionPoint
    }



    render() {
        this.direction = 'right'
        this.alive = true
        this.x = this.matrix.rows / 2
        this.y = this.matrix.cols / 2
        this.animationDirect = 270

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

            switch (this.animationDirect) {
                case 270: this.x--
                    break
                case 90: this.x++
                    break
                case 0: this.y--
                    break
                case 180: this.y++
                    break
            }

            this.matrix.setCell(this.x, this.y, {
                name: 'explosion',
                src: 'img/shockwave.png',
                alt: 'explosion',
                direction: 0,
            })

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