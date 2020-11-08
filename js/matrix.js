'use strict'

export default class Matrix {

    constructor(element, matrixElem) {
        this.element = element
        this.cellsArr = []
        this.rows = 20
        this.cols = 20
        this.matrixElem = matrixElem

        this.gameoverTimer
    }

    create() {
        for (let i = 0; i < this.rows * this.cols; i++) {
            let div = document.createElement('div')

            let bg = document.createElement('img')
            bg.classList.add('animate__animated')
            bg.setAttribute('src', this.matrixElem.src)
            bg.setAttribute('alt', this.matrixElem.alt)
            bg.classList.add('bg')
            div.appendChild(bg)

            this.element.appendChild(div)
            this.cellsArr[i] = this.matrixElem.name
        }
    }

    clear() {
        const cellCollection = document.querySelectorAll('.field div')
        for (let item of cellCollection) {
            item.remove()
        }
    }

    render() {
        const cellCollection = document.querySelectorAll('.field div')
        let cellDim = 0

        for (let elem of cellCollection) {
            elem.style.width = 100 / this.cols + '%'
            cellDim = elem.offsetWidth + 'px'
        }

        for (let elem of cellCollection) {
            elem.style.height = cellDim
        }
    }

    setCell(x, y, val) {
        const cellNum = _calcElement(x, y, this.cols)
        this.cellsArr[cellNum] = val
    }

    getCell(coords) {
        const cellNum = _calcElement(coords[0], coords[1], this.cols)
        return this.cellsArr[cellNum]
    }

    renderElement(x, y, val) {
        const cellNum = _calcElement(x, y, this.cols)

        this.element.childNodes[cellNum].firstChild.setAttribute('src', val.src)
        this.element.childNodes[cellNum].firstChild.setAttribute('alt', val.alt)
        this.element.childNodes[cellNum].firstChild.style.transform = `rotate(${val.direction}deg)`

        this.setCell(x, y, val.name)
    }


    gameOverAnimation() {
        const imgCollection = document.querySelectorAll('.bg')
        for (let item of imgCollection) {
            const timer = _getRandomIntInclusive(0, 10000)
            this.gameoverTimer = setTimeout(() => {
                item.classList.add('animate__hinge')
            }, timer);
        }
    }
}

function _calcElement(x, y, colsNum) {
    return (x - 1) + (colsNum * y - colsNum)
}

function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}