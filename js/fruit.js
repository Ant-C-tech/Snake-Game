'use strict'

import Elem from './elem.js'

export default class Fruit extends Elem {

    constructor(matrix, fruitElem) {
        super(matrix)
        this.valueCollection = fruitElem


        this.value
        this.coords = []
    }

    setStartPosition() {
        this.value = [this.valueCollection[this.getRandomIntInclusive(0, 4)]]

        let startPointX = this.getRandomIntInclusive(1, 20)
        let startPointY = this.getRandomIntInclusive(1, 20)

        while (this.matrix.getCell([startPointX, startPointY]) !== 'grass') {
            startPointX = this.getRandomIntInclusive(1, 20)
            startPointY = this.getRandomIntInclusive(1, 20)
        }

        this.coords.push([startPointX, startPointY])
    }

}
