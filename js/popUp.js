'use strict'

export default class PopUp {

    constructor(obj) {
        this.obj = obj
        this.container = obj.container
        this.content = obj.content || 'NO CONTENT'
        this.closeBtn = obj.closeBtn || false
        this.maskColor = obj.maskColor || '#343a40'
        this.popupBgColor = obj.bgColor || '#FFFFFF'
        this.maskOpacity = obj.maskOpacity || '0.7'

        this.popupMaskName = `${this.container}-popupMask`
        this.popupWindowName = `${this.container}-popupWindow`
        this.btnCloseName = `${this.container}-popupClose`

        this.popupMask
        this.popupWindow
    }

    render() {
        //Create and add elements to page:
        this.addPopupToPage()

        // Set main variables:
        this.popupMask = document.querySelector(`.${this.popupMaskName}`)
        this.popupWindow = document.querySelector(`.${this.popupWindowName}`)

        //  Styles for elements:
        this.addStartStyleToMask()
        this.addStartStyleToPopupWindow()

        if (this.closeBtn) {
            let div = document.createElement('div')
            div.innerHTML = `<div class="${this.btnCloseName} d-flex justify-content-center align-items-center border border-dark rounded-circle ml-auto mb-3" type="button" style="width: 30px; height: 30px; transition: transform ease-in-out 0.3s"><p class="mb-0" style="font-size:18px; font-family:'Montserrat', sans-serif;">&#10006</p></div>`
            const closeBtnBlockTarget = document.querySelector(`.${this.container} .${this.popupWindowName} .row .col`)
            closeBtnBlockTarget.prepend(div)

            document.querySelector(`.${this.btnCloseName}`).addEventListener('click', () => {
                this.hidePopup()
            })

            document.querySelector(`.${this.btnCloseName}`).addEventListener('mouseover', btnAnimationOn)
            document.querySelector(`.${this.btnCloseName}`).addEventListener('mouseout', btnAnimationOut)

            function btnAnimationOn() {
                this.style.transform = 'rotate(180deg)'
            }

            function btnAnimationOut() {
                this.style.transform = 'rotate(-180deg)'
            }
        }

    }

    showPopup() {
        const windowHeight = document.documentElement.clientHeight

        //Определяем высоту невидимого элемента:
        this.popupWindow.style.display = 'block'
        const popupWindowHeight = this.popupWindow.offsetHeight
        this.popupWindow.style.display = 'none'

        let popupWindowTop

        if (windowHeight > popupWindowHeight) {
            popupWindowTop = ((windowHeight - popupWindowHeight) / 2)
        } else {
            popupWindowTop = 0
        }

        document.querySelector('body').style.overflow = 'hidden'
        this.popupMask.style.display = 'block'
        this.popupWindow.style.display = 'block'

        if (popupWindowTop === 0) {
            this.popupWindow.style.height = windowHeight - 10 + 'px'
            this.popupWindow.style.top = popupWindowTop + 5 + 'px'
            this.popupWindow.style.overflowY = 'scroll';
        } else {
            this.popupWindow.style.overflowY = 'hidden';
        }

        const maskOpacity = this.maskOpacity
        const popupMask = this.popupMask
        const popupWindow = this.popupWindow

        _raf( //Асинхронная работа
            function () {
                popupMask.style.opacity = maskOpacity
                popupWindow.style.top = popupWindowTop + 5 + 'px'
                if (popupWindowTop === 0) {
                    popupWindow.style.height = windowHeight - 10 + 'px'
                }
            }
        )
    }

    resize() {
        if (this.popupMask.style.display != 'none') {
            const windowHeight = document.documentElement.clientHeight
            const popupWindowHeight = this.popupWindow.offsetHeight

            let popupWindowTop

            if (windowHeight > popupWindowHeight) {
                popupWindowTop = ((windowHeight - popupWindowHeight) / 2)
            } else {
                popupWindowTop = 0
            }

            if (popupWindowTop === 0) {
                this.popupWindow.style.height = windowHeight - 10 + 'px'
                this.popupWindow.style.top = popupWindowTop + 5 + 'px'
                this.popupWindow.style.overflowY = 'scroll';
            } else {
                this.popupWindow.style.top = popupWindowTop + 5 + 'px'
                this.popupWindow.style.overflowY = 'hidden';
            }
        }
    }

    hidePopup() {
        const popupMask = this.popupMask
        const popupWindow = this.popupWindow

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

    addPopupToPage() {
        document.querySelector(`.${this.container}`).innerHTML = `<div class="${this.popupMaskName}"></div>
                        <div class="container ${this.popupWindowName} shadow-lg text-center rounded pt-2 pr-2 pb-4 pl-2">
                            <div class="row">
                                <div class="col">
                                    
                                    ${this.content}
                                </div>
                            </div>
                        </div>`
    }

    addStartStyleToMask() {
        const maskStyles = `position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000; transition: opacity ease-in-out 0.5s; background-color: ${this.maskColor}; opacity: 0; display: none;`
        this.popupMask.setAttribute('style', maskStyles)
    }

    addStartStyleToPopupWindow() {
        const popupStyles = `position: fixed; left: 50%; transform:translateX(-50%); top: 3000px; z-index: 2000; background-color: ${this.popupBgColor};  transition: top ease-in-out 0.5s; display: none; overflow-x: hidden;`
        this.popupWindow.setAttribute('style', popupStyles)
    }

}

function _raf(fn) {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            fn()
        })
    })
}