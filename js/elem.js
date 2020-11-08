'use strict'

export default class Elem {

    constructor(matrix) {
        this.matrix = matrix
        this.value = []
    }

    render() {
        for (let i = 0; i < this.coords.length; i++) {
            this.matrix.renderElement(this.coords[i][0], this.coords[i][1], this.value[i])
        }

    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}