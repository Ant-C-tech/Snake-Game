'use strict'

export default class PopUp {

    constructor(obj) {
        this.obj = obj
        this.openBtn = obj.openBtn
        this.container = obj.container
        this.reloadBtn = obj.reload
        this.content = obj.content || 'NO CONTENT'
        this.maskColor = obj.maskColor || '#343a40'
        this.maskOpacity = obj.maskOpacity || '0.7'

        this.popupMaskName = `${this.openBtn}-popupMask`
        this.popupWindowName = `${this.openBtn}-popupWindow`
        this.btnCloseName = `${this.openBtn}-popupClose`
    }

    render() {
        //Create and add elements to page:
        this.addPopupToPage()

        // //Set main variables:
        const popupMask = document.querySelector(`.${this.popupMaskName}`)
        const popupWindow = document.querySelector(`.${this.popupWindowName}`)

        // // Styles for elements:
        this.addStartStyleToMask(popupMask)
        this.addStartStyleToPopupWindow(popupWindow)

        // // Show popup buttons:
        for (let item of document.querySelectorAll(`.${this.openBtn}`)) {
            item.addEventListener('click', () => {
                this.showPopup(popupMask, popupWindow)
            })
        }


        // // Reload btn
        if (this.reloadBtn) {
            document.querySelector(`.${this.reloadBtn}`).addEventListener('click', () => {
                for (let item of document.querySelectorAll(`.${this.openBtn}`)) {
                    item.addEventListener('click', () => {
                        this.showPopup(popupMask, popupWindow)
                    })
                }
            })
        }


        // // Hide popup buttons:
        document.querySelector(`.${this.btnCloseName}`).addEventListener('click', () => {
            for (let item of document.querySelectorAll(`.${this.openBtn}`)) {
                item.addEventListener('click', () => {
                    this.showPopup(popupMask, popupWindow)
                })
            }

            this.hidePopup(popupMask, popupWindow)
        })
        document.querySelector(`.${this.btnCloseName}`).addEventListener('mouseover', this.btnAnimationOn)
        document.querySelector(`.${this.btnCloseName}`).addEventListener('mouseout', this.btnAnimationOut)

    }

    resize() {
        const popupMask = document.querySelector(`.${this.popupMaskName}`)
        const popupWindow = document.querySelector(`.${this.popupWindowName}`)

        if (popupMask.style.display != 'none') {
            const windowHeight = document.documentElement.clientHeight
            const popupWindowHeight = popupWindow.offsetHeight

            let popupWindowTop

            if (windowHeight > popupWindowHeight) {
                popupWindowTop = ((windowHeight - popupWindowHeight) / 2)
            } else {
                popupWindowTop = 0
            }

            if (popupWindowTop === 0) {
                popupWindow.style.height = windowHeight - 10 + 'px'
                popupWindow.style.top = popupWindowTop + 5 + 'px'
                popupWindow.style.overflowY = 'scroll';
            } else {
                popupWindow.style.top = popupWindowTop + 5 + 'px'
                popupWindow.style.overflowY = 'hidden';
            }
        }

    }

    createPopupElements() {
        return `<div class="${this.popupMaskName}"></div>
                        <div class="container ${this.popupWindowName} shadow-lg text-center rounded pt-2 pr-2 pb-4 pl-2">
                            <div class="row">
                                <div class="col">
                                    <div class="${this.btnCloseName} d-flex justify-content-center align-items-center border border-dark rounded-circle ml-auto mb-3" type="button" style="width: 30px; height: 30px; transition: transform ease-in-out 0.3s"><p class="mb-0" style="font-size:18px; font-family:'Montserrat', sans-serif;">&#10006</p></div>
                                    ${this.content}
                                </div>
                            </div>
                        </div>`
    }

    addPopupToPage() {
        document.querySelector(`.${this.container}`).innerHTML = this.createPopupElements()
    }

    addStartStyleToMask(popupMask) {
        const maskStyles = `position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000; transition: opacity ease-in-out 0.5s; background-color: ${this.maskColor}; opacity: 0; display: none;`
        popupMask.setAttribute('style', maskStyles)
    }

    addStartStyleToPopupWindow(popupWindow) {
        const popupStyles = 'position: fixed; left: 50%; transform:translateX(-50%); top: 3000px; z-index: 2000; background-color: #ffffff;  transition: top ease-in-out 0.5s; display: none; overflow-x: hidden;'
        popupWindow.setAttribute('style', popupStyles)
    }

    showPopup(popupMask, popupWindow) {

        const windowHeight = document.documentElement.clientHeight

        //Определяем высоту невидимого элемента:
        popupWindow.style.display = 'block'
        const popupWindowHeight = popupWindow.offsetHeight
        popupWindow.style.display = 'none'

        let popupWindowTop

        if (windowHeight > popupWindowHeight) {
            popupWindowTop = ((windowHeight - popupWindowHeight) / 2)
        } else {
            popupWindowTop = 0
        }

        document.querySelector('body').style.overflow = 'hidden'
        popupMask.style.display = 'block'
        popupWindow.style.display = 'block'

        if (popupWindowTop === 0) {
            popupWindow.style.height = windowHeight - 10 + 'px'
            popupWindow.style.top = popupWindowTop + 5 + 'px'
            popupWindow.style.overflowY = 'scroll';
        } else {
            popupWindow.style.overflowY = 'hidden';
        }

        const maskOpacity = this.maskOpacity

        this.raf( //Асинхронная работа
            function () {
                popupMask.style.opacity = maskOpacity
                popupWindow.style.top = popupWindowTop + 5 + 'px'
                if (popupWindowTop === 0) {
                    popupWindow.style.height = windowHeight - 10 + 'px'
                }
            }
        )

    }


    raf(fn) {
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                fn()
            })
        })
    }

    hidePopup(popupMask, popupWindow) {
        document.querySelector('body').style.overflow = 'auto'
        popupMask.addEventListener('transitionend', handlerMask)
        popupWindow.addEventListener('transitionend', handlerWindow)
        popupWindow.style.top = 3000 + 'px'
        popupMask.style.opacity = 0

        function handlerMask() {
            popupMask.removeEventListener('transitionend', handlerMask)
            popupMask.style.display = 'none'
        }

        function handlerWindow() {
            popupWindow.removeEventListener('transitionend', handlerWindow)
            popupWindow.style.display = 'none'
        }
    }

    btnAnimationOn() {
        this.style.transform = 'rotate(180deg)'
    }

    btnAnimationOut() {
        this.style.transform = 'rotate(-180deg)'
    }


}