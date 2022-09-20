import {addVisit} from '../functions/sendRequests.js';
import {addedVisitSuccess,addedVisitError} from "../functions/alert.js";
import {visitCard, visitTherapistCard, visitDentistCard, visitCardiologistCard} from '../modules/visitCard.js';

export class visitForm {

    sendVisitData(form,wrapper) { // метод который навешивает слушатель для сабмита, и при сабмите собираем все данные для создания нового визита
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let doctorTitle = event.target.querySelector('[name="doctortitle"]').value;
            let purpose = event.target.querySelector('[name="purpose"]').value;
            let description = event.target.querySelector('[name="description"]').value;
            let priority = event.target.querySelector('[name="priority"]').value;
            let patientName = event.target.querySelector('[name="patientname"]').value;
            let lastVisitDate = event.target.querySelector('[name="lastvisitdate"]').value;
            let age = event.target.querySelector('[name="age"]').value;
            let pressure = event.target.querySelector('[name="pressure"]').value;
            let BMI = event.target.querySelector('[name="BMI"]').value;
            let diseases = event.target.querySelector('[name="diseases"]').value;

            let background = document.querySelector('.modal-backdrop') // Находим элементы по модалкам что бы его убрать после отправки данных
            let modal = document.querySelector('.modal') // Находим элементы по модалкам что бы его убрать после отправки данных

            if (document.body.classList.contains('modal-open') || background || modal) { // проверям и удаляем все что связано по модалке
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            }
switch (doctorTitle) {
    case 'Dentist':
        if (purpose !== '' && description !== '' && priority !== '' && patientName !== '' && lastVisitDate !== '') {// проверям наши инуты на пустоту и если не пустые то создаем визит
            addVisit(JSON.stringify({
                title: 'Visit to Dentist',
                doctor: doctorTitle,
                purpose: purpose,
                description: description,
                priority: priority,
                patient: patientName,
                lastvisitdate: lastVisitDate
                }))
                .then(patient => {
                    if(patient){ // проверяем отправленые обьект если он есть значит генерим новую карточку пользователя и показываем алерт что все хорошо, а если нет то показываем ошибку алерт
                        const card = new visitDentistCard(patient);
                        card.renderCard(wrapper);
                        addedVisitSuccess()
                    } else  {
                        addedVisitError()
                    }
                })
            }
        break;
        case 'Therapist':
            if (purpose !== '' && description !== '' && priority !== '' && patientName !== '' && age !== '') {// проверям наши инуты на пустоту и если не пустые то создаем визит
                addVisit(JSON.stringify({
                    title: 'Visit to Therapist',
                    doctor: doctorTitle,
                    purpose: purpose,
                    description: description,
                    priority: priority,
                    patient: patientName,
                    age: age
                    }))
                    .then(patient => {
                        if(patient){ // проверяем отправленые обьект если он есть значит генерим новую карточку пользователя и показываем алерт что все хорошо, а если нет то показываем ошибку алерт
                            const card = new visitTherapistCard(patient);
                            card.renderCard(wrapper);
                            addedVisitSuccess()
                        } else  {
                            addedVisitError()
                        }
                    })
                }
            break;
            case 'Cardiologist':
            if (purpose !== '' && description !== '' && priority !== '' && patientName !== '' && pressure !== '' && BMI !== '' && diseases !== '' && age !== '') {// проверям наши инуты на пустоту и если не пустые то создаем визит
                addVisit(JSON.stringify({
                    title: 'Visit to Cardiologist',
                    doctor: doctorTitle,
                    purpose: purpose,
                    description: description,
                    priority: priority,
                    patient: patientName,
                    age: age
                    }))
                    .then(patient => {
                        if(patient){ // проверяем отправленые обьект если он есть значит генерим новую карточку пользователя и показываем алерт что все хорошо, а если нет то показываем ошибку алерт
                            const card = new visitCardiologistCard(patient);
                            card.renderCard(wrapper);
                            addedVisitSuccess()
                        } else  {
                            addedVisitError()
                        }
                    })
                }
            break;

    default:
        break;
}
            // if (doctorTitle == 'Dentist' && purpose !== '' && description !== '' && priority !== '' && patientName !== '') {// проверям наши инуты на пустоту и если не пустые то создаем визит
            //     addVisit(JSON.stringify({
            //         title: 'Visit to Dentist',
            //         doctor: doctorTitle,
            //         description: description,
            //         purpose: purpose,
            //         priority: priority,
            //         patient: patientName,
            //         lastvisitdate: lastVisitDate
            //         }))
            //         .then(patient => {
            //             if(patient){ // проверяем отправленые обьект если он есть значит генерим новую карточку пользователя и показываем алерт что все хорошо, а если нет то показываем ошибку алерт
            //                 const card = new VisitDentistCard(patient);
            //                 card.renderCard(wrapper);
            //                 addedVisitSuccess()
            //             } else  {
            //                 addedVisitError()
            //             }
            //         })
            //     }
        })
    }

    render(wrapper) {
        this.formElem = document.createElement('form')
        this.formElem.insertAdjacentHTML("afterbegin", `
            <div class="form-group">
            <select name="doctortitle" class="form-select" id="doctor">
                <option value="">All doctors</option>
                <option value="dentist">Dentist</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="therapist">Therapist</option>
            </select>
            </div>
            <div class="form-group">
                <input id="purpose" class="form-control" name="purpose" placeholder="Purpose">
            </div>
            <div class="form-group">
                <input id="description" class="form-control" name="description" placeholder="Description">
            </div>
            <div class="form-group">
            <select name="priority" class="form-select" id="priority">
                <option value="all">All doctors</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
            </select>
            </div>
            <div class="form-group-additional">     
            </div>
            <button class="btn form-btn-create">Create</button>
            <button class="btn form-btn-close">Close</button>  
        `)

        this.sendVisitData(this.formElem,wrapper)

        return this.formElem;
    }
}

export class visitDentistForm extends visitForm {
    
    sendVisitData(form,wrapper);

    render()  {
        super.render();
        const formAdditionalElement = document.querySelector('.form-group-additional');
        this.formDivElem = document.createElement('div');
        this.formDivElem.classList.add("form-additional");
        this.formDivElem.innerHTML = `
            <div class="form-group> 
                    <input id="lastVisitDate" class="form-control" name="lastvisitdate" placeholder="Last visit date">
            </div>
        `
        formAdditionalElement.replaceWith(this.render())
    }
};

export class visitCardiologistForm extends visitForm {
 
    sendVisitData(form,wrapper);

    render()  {
        super.render();
        const formAdditionalElement = document.querySelector('.form-group-additional');
        this.formDivElem = document.createElement('div');
        this.formDivElem.classList.add("form-additional");
        this.formDivElem.innerHTML = `
            <div class="form-group> 
                    <input id="lastVisitDate" class="form-control" name="lastvisitdate" placeholder="Last visit date">
            </div>
            <div class="form-group> 
                    <input id="pressure" class="form-control" name="pressure" placeholder="Normal pressure">
            </div>
            <div class="form-group> 
                    <input id="BMI" class="form-control" name="BMI" placeholder="BMI">
            </div>
            <div class="form-group> 
                    <input id="diseases" class="form-control" name="diseases" placeholder="Transferred diseases of the cardiovascular system">
            </div>
            <div class="form-group> 
                    <input id="age" class="form-control" name="age" placeholder="Age">
            </div>
        `
        formAdditionalElement.replaceWith(this.render())
    }
};

export class visitTherapistForm extends visitForm {

    sendVisitData(form,wrapper);

    render()  {
        super.render();
        const formAdditionalElement = document.querySelector('.form-group-additional');
        this.formDivElem = document.createElement('div');
        this.formDivElem.classList.add("form-additional");
        this.formDivElem.innerHTML = `
            <div class="form-group> 
                    <input id="age" class="form-control" name="age" placeholder="Age">
            </div>
        `
        formAdditionalElement.replaceWith(this.render())
    }
};
