'use strict'

export default class Elem {

    constructor(matrix, x, y) {
        this.matrix = matrix
        this.x = x
        this.y = y
        this.value = ''
    }

    render() {
        this.matrix.setCell(this.x, this.y, this.value)
    }
}