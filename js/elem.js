'use strict'

export default class Elem {

    constructor(matrix, coords) {
        this.matrix = matrix
        this.coords = coords
        this.value = []
    }

    render() {
        for (let i = 0; i < this.coords.length; i++) {
            this.matrix.renderElement(this.coords[i][0], this.coords[i][1], this.value[i])
        }

    }
}