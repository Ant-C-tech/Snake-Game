'use strict'

export default class Matrix {

    constructor(element, rows = 20, cols = 20) {
        this.element = element
        this.cellsArr = []
        this.rows = rows
        this.cols = cols
    }

    create() {
        for (let i = 0; i < this.rows * this.cols; i++) {
            let div = document.createElement('div')

            let bg = document.createElement('img')
            bg.setAttribute('src', 'img/grass.png')
            bg.setAttribute('alt', 'grass')
            bg.classList.add('bg')
            div.appendChild(bg)

            this.element.appendChild(div)
            this.cellsArr[i] = 'grass'
        }
    }

    render() {
        const cellCollection = document.querySelectorAll('.field div')
        let cellDim = 0

        for (let elem of cellCollection) {
            elem.style.width = 100 / this.cols + '%'
            cellDim = elem.offsetWidth + 'px'
        }

        console.log(cellDim);

        for (let elem of cellCollection) {
            elem.style.height = cellDim
        }
    }

    getCell(x, y) {
        const cellNum = _calcElement(x, y, this.cols)
        return this.cellsArr[cellNum]
    }

    setCell(x, y, val) {
        const cellNum = _calcElement(x, y, this.cols)
        this.cellsArr[cellNum] = val.name

        this.element.childNodes[cellNum].firstChild.setAttribute('src', val.src)
        this.element.childNodes[cellNum].firstChild.setAttribute('alt', val.alt)
        this.element.childNodes[cellNum].firstChild.style.transform = `rotate(${val.direction}deg)`
    }
}

function _calcElement(x, y, colsNum) {
    return (x - 1) + (colsNum * y - colsNum)
}