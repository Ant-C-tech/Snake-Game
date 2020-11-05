'use strict'

import Elem from './elem.js'

export default class Wall extends Elem {

    constructor(matrix, x, y) {
        super(matrix, x, y)

        this.value = {
            name: 'wall',
            src: 'img/brick-wall.png',
            alt: 'wall',
            direction: 0,
        }
    }

}
