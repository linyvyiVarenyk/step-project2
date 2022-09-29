import crete from "../functions/classUtils.js";
const BODY_SCROLL = 'modal-open'

class Modal {

    constructor() {
        this._modal = new crete.Element({name:'div', cssClass:'modal-wrapper'}).render()
    }
    get modal(){
        return this._modal
    }

    close() {
        document.body.classList.remove(BODY_SCROLL);
        this.modal.removeEventListener('click', this.close, false)
        this.modal.remove()
    }

    listener() {
        this.modal.addEventListener('click', this.close.bind(this))
    }


    getModalContentStyle() {
        document.body.classList.add(BODY_SCROLL);
    }

    render() {
        this.getModalContentStyle()
        document.body.insertAdjacentElement('afterbegin', this.modal)

    }
}

export default {
    Modal
}
