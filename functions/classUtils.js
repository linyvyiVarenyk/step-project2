export class Element {
    constructor(elementInfo) {
        const {name, cssClass, value, placeholder, textContent,type,inputName} = elementInfo
        this.cssClass = cssClass
        this.text = textContent
        this.value = value
        this.placeholder = placeholder
        this.name = name
        this.type = type
        this.inputName = inputName
    }

    get element() {
        return document.createElement(`${this.name}`)
    }

    setElemProperty() {
        const element = this.element
        element.classList.add(this.cssClass)
        this.text ? element.textContent = this.text : null
        this.value ? element.value = this.value : null
        this.placeholder ? element.placeholder = this.placeholder : null
        this.type? element.type = this.type :null
        this.inputName? element.name = this.inputName : null

        return element
    }


    render() {
        return this.setElemProperty()
    }
}

export default {
    Element
}