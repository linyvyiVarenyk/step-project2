import crete from "../functions/classUtils.js";
import functions from '../functions/API.js'
import ModalVisit from "./modalVisit.js";
import card from './visitCard.js'

export class VisitForm extends ModalVisit.Modal {
    constructor(container) {
        super()
        this.container = container
        this.formElem = new crete.Element({name: 'form', cssClass: 'card-form'}).render()
        this.title = new crete.Element({name: 'h3', cssClass: 'form-title', textContent: 'VISIT INFORMATION'}).render()
        this.name = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your name', value: '', inputName: 'name',}).render()
        this.surname = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your surname', value: '', inputName: 'surname'}).render()
        this.purpose = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your purpose', value: '', inputName: 'purpose'}).render()
        this.description = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your description', value: '', inputName: 'description'}).render()
        this.selectDoctor = new crete.Element({name: 'select', cssClass: 'form-select',}).render()
        this.selectEmergency = new crete.Element({name: 'select', cssClass: 'form-select',}).render()
        this.submit = new crete.Element({name: 'button', cssClass: 'form-btn', textContent: 'submit', type: 'submit'}).render()
        this._additionalContainer = new crete.Element({name: 'div', cssClass: 'form-additional-container',}).render()
    }

    get additionalContainer() {
        return this._additionalContainer
    }

    getDoctorOption() {
        if (this.selectDoctor.children.length === 0) {

            this.selectDoctor.insertAdjacentHTML('afterbegin', `
            <option value="">Chose doctors</option>
            <option value="dentist">Dentist</option>
            <option value="therapist">Therapist</option>
            <option value="cardiologist">Cardiologist</option>`)
        }
    }

    getEmergencyOption() {
        if (this.selectEmergency.children.length === 0) {

            this.selectEmergency.insertAdjacentHTML('afterbegin', `
            <option value="">Chose emergency</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>`)
        }
    }

    formGetContent() {
        this.getDoctorOption()
        this.getEmergencyOption()
        const content = [this.title, this.name, this.surname, this.purpose, this.description, this.selectDoctor, this.selectEmergency, this._additionalContainer, this.submit]
        content.forEach(item => {
            this.formElem.insertAdjacentElement('beforeend', item)
        })
    }

    listener() {
        this.formElem.addEventListener('click', this.submitForm.bind(this))
        this.selectDoctor.addEventListener('change', this.showAdditionalFields.bind(this))
        this.modal.addEventListener('click', this.clearListener)
    }

    clearListener(e) {
        e.preventDefault()
        if (e.target === this) {
            this.remove()
        }
    }

    showAdditionalFields(e) {

        e.preventDefault()
        const doctor = e.target.value
        const DentistForm = new VisitDentistForm()
        const CardiologistForm = new VisitCardiologistForm()
        const TherapistForm = new VisitTherapistForm()

        if (this.additionalContainer.children.length > 0) {
            [...this.additionalContainer.children].forEach(item => item.remove())
        }
        switch (doctor) {
            case 'dentist':
                DentistForm.render(this.additionalContainer)
                break;
            case 'cardiologist':
                CardiologistForm.render(this.additionalContainer)
                break;
            case 'therapist':
                TherapistForm.render(this.additionalContainer)
                break;
        }
    }


    async submitForm(e) {
        e.preventDefault()

        let validation = undefined
        if (e.target === this.submit) {
            validation = this.additionalContainer.children.length > 0 ? [...this.additionalContainer.children].some(item => (item.value.length >= 3)) : false

            const additionalInfo = this.getAdditionalInfo()

            if(validation){
                const userInfo = {
                    name: this.name.value,
                    email: this.surname.value,
                    doctor: this.selectDoctor.value,
                    emergency: this.selectEmergency.value,
                    ...additionalInfo
                }
                const cardCreate = await functions.submitForm(userInfo)
                if (cardCreate){
                    const Card  = new card.VisitCard({...userInfo, id:'-'}, this.container)
                    Card.render()
                    super.close()
                    this.formElem.remove()
                }
            }
        }
    }

    getAdditionalInfo() {
        let additionalInfo = {}
        const formChildren = [...this.additionalContainer.children] || []

        formChildren.forEach(item => {
            const name = item.name
            const value = item.value
            additionalInfo = {...additionalInfo, [name]:value}
        })
        return additionalInfo
    }


    render() {
        super.render()

        this.formGetContent()
        this.modal.append(this.formElem)
        this.listener()
    }


}

class VisitDentistForm extends VisitForm {

    constructor() {
        super()
        this.laseVisit = new crete.Element(
            {name: 'input', cssClass: 'form-input', placeholder: 'enter your last visit', value: '', inputName: 'lastVisit'}).render()
    }

    render(additionalContainer) {
        additionalContainer.append(this.laseVisit)
    }
}

class VisitCardiologistForm extends VisitForm {
    constructor() {
        super()
        this.imb = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your imb', value: '', inputName: 'imb'}).render()
        this.pressure = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your normal pressure', value: '', inputName: 'pressure'}).render()
        this.disease = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your disease', value: '', inputName: 'disease'
        }).render()
        this.age = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your age', value: '', inputName: 'age'}).render()
    }

    render(additionalContainer) {
        const inputs = [this.imb, this.pressure, this.disease, this.age]
        inputs.forEach(input => {
            additionalContainer.append(input)
        })
    }
}

class VisitTherapistForm extends VisitForm {
    constructor() {
        super()
        this.age = new crete.Element({name: 'input', cssClass: 'form-input', placeholder: 'enter your age', value: ''}).render()
    }

    render(additionalContainer) {
        additionalContainer.append(this.age)
    }

}

export default {
    VisitTherapistForm,
    VisitCardiologistForm,
    VisitDentistForm,
    VisitForm,
}
