'use strict'

import Elem from './elem.js'

export default class Wall extends Elem {

    constructor(matrix, wallElem) {
        super(matrix)

        this.valueElem = wallElem
        this.value
        this.coords
        this.length = 6
    }

    setStartPosition() {
        this.value = []
        this.coords = []

        const direction = this.getRandomIntInclusive(0, 1)
        let startPointX = this.getRandomIntInclusive(1, 20)
        let startPointY = this.getRandomIntInclusive(1, 20)

        while (this.matrix.getCell([startPointX, startPointY]) !== 'grass') {
            startPointX = this.getRandomIntInclusive(1, 20)
            startPointY = this.getRandomIntInclusive(1, 20)
        }

        this.coords.push([startPointX, startPointY])
        this.value.push(this.valueElem)

        if (direction === 0) {
            let lastCell = startPointY
            for (let i = 1; i < this.length; i++) {
                if (lastCell === 20) {
                    this.length += (this.length - i)
                    break
                }
                let newElem = [startPointX, lastCell + 1]
                lastCell++
                if (this.matrix.getCell(newElem) !== 'grass') {
                    continue
                }
                this.coords.push(newElem)
                this.value.push(this.valueElem)
            }
        } else {
            let lastCell = startPointX
            for (let i = 1; i < this.length; i++) {
                if (lastCell === 20) {
                    this.length += (this.length - i)
                    break
                }
                let newElem = [lastCell + 1, startPointY]
                lastCell++
                if (this.matrix.getCell(newElem) !== 'grass') {
                    continue
                }
                this.coords.push(newElem)
                this.value.push(this.valueElem)
            }
        }

    }

}
