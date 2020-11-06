'use strict'

import Elem from './elem.js'

export default class Fruit extends Elem {

    constructor(matrix, coords) {
        super(matrix, coords)
        this.valueCollection = [{
            name: 'apple',
            src: 'img/apple.png',
            alt: 'apple',
            direction: 0,
        }, {
            name: 'pineapple',
            src: 'img/pineapple.png',
            alt: 'pineapple',
            direction: 0,
        },
        {
            name: 'watermelon',
            src: 'img/watermelon.png',
            alt: 'watermelon',
            direction: 0,
        },
        {
            name: 'cherry',
            src: 'img/cherry.png',
            alt: 'cherry',
            direction: 0,
        },
        {
            name: 'bananas',
            src: 'img/bananas.png',
            alt: 'bananas',
            direction: 0,
        },
        ]
        this.value = [this.valueCollection[_getRandomIntInclusive(0, 4)]]
    }

}

function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}