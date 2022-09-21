import Modal from "./modalVisit.js";
import {visitForm, visitCardiologistForm, visitDentistForm, visitTherapistForm} from "./visitForm.js";
import {getVisits, amendVisit} from '../functions/sendRequest.js';

export class visitCard {
    constructor({id, doctorTitle, purpose, description, description, priority, patientName}) {
        this.doctor = doctorTitle;
        this.purpose = purpose;
        this.description = description;
        this.priority = priority;
        this.patient = patientName;
        this.visitId = id;
    }
    renderBody() {
        this.body = document.createElement("div");
        this.body.classList.add("card-body");

        getVisits(this.doctor && this.priority && this.status) //делаем запрос на получение визита по doctor 
            .then(data => {
                if (Boolean(data)) {
                    this.body.prepend(this.renderVisit(data))  //добавляем в наш боди карточку visit пользователя
                }
            })
        return this.body;
    }
    renderVisit(visit) {
        const searchTarget = document.querySelector('.filter-search-btn');
        const visitList = document.createElement('div');
        visitList.classList.add('list-group', 'visit-list');
        
        searchTarget.addEventListener('click', function () {
            visit.forEach(({id, patient, doctor}, index) => {
                if (index <= 3) { /// показываем первые 4 visit
                    visitList.insertAdjacentHTML('beforeend', `
                        <div class="list-group-item visit-list--item list-group-item-action pr-5" data-visit-id="${id}">
                            <div class="list-group-item-info">
                                <input id="${id}" class="form-control" name="patientname" placeholder="${patient}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${doctor}" class="form-control" name="doctortitle" placeholder="${doctor}">
                            </div>
                            <button class="btn btn-visit-show">Show Visit</button>
                            <button class="btn btn-visit-ament">Amend Visit</button>
                        </div>
                    `)
                }
            })
    
            if (visit.length >= 4) { // показываем все остальные 
                const btnMore = document.createElement('button');
                btnMore.classList.add('btn', 'btn-info')
                btnMore.innerText = 'Show More';
                this.body.prepend(btnMore)
    
                btnMore.addEventListener('click', () => {
                    visit.forEach(({id, patient, doctor}, index) => {
                        if (index > 3) {
                            visitList.insertAdjacentHTML('afterbegin', `
                            <div class="list-group-item visit-list--item list-group-item-action pr-5" data-visit-id="${id}">
                                <div class="list-group-item-info">
                                    <input id="${id}" class="form-control" name="patientname" placeholder="${patient}">
                                </div>
                                <div class="list-group-item-info">
                                    <input id="${doctor}" class="form-control" name="doctortitle" placeholder="${doctor}">
                                </div>
                                <button class="btn btn-visit-show">Show Visit</button>
                                <button class="btn btn-visit-ament">Amend Visit</button>
                            </div>
                        `)
                        }
                    })
                    btnMore.remove();
                })
                return visitList
            }
        })
    }
}

export class visitTherapistCard extends visitCard {
    constructor({id, doctorTitle, purpose, description, priority, patientName, age}) {
        super({id, doctorTitle, purpose, description, priority, patientName});
        this.age = age;
      }
      renderVisit() {
        visitList.addEventListener('click', (event) => {
            const showTarget = event.target.closest('.btn-visit-show');// делаем поиск нужного элемента в евенте
            const amendTarget = event.target.closest('.btn-visit-amend');// делаем поиск нужного элемента в евенте
            const id = liTarget.getAttribute('data-visit-id');

            if (amendTarget) {
                const newVisitForm = new visitTherapistForm()
                const newVisitModal = new Modal({
                    body: newVisitForm.render(),
                    closeOutside: true
                });
                document.body.insertAdjacentElement('beforeend', newVisitModal.render())
            }

            if (showTarget) {
                showVisit(id)
                .then(({id, doctorTitle, purpose, description, priority, patientName, age}) => {
                    visitList.insertAdjacentHTML('afterbegin', `
                        <div class="list-group-item visit-list--item list-group-item-action" data-visit-id="${id}">
                            <div class="list-group-item-info">
                                <input id="${id}" class="form-control" name="patientname" placeholder="${patientName}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${doctorTitle}" class="form-control" name="doctortitle" placeholder="${doctorTitle}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${purpose}" class="form-control" name="purpose" placeholder="${purpose}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${description}" class="form-control" name="description" placeholder="${description}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${priority}" class="form-control" name="priority" placeholder="${priority}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${age}" class="form-control" name="priority" placeholder="${age}">
                            </div>
                        </div>
                    `)
                })
            }
        })
    }
}

export class visitDentistCard extends visitCard {
    constructor({id, doctorTitle, purpose, description, priority, patientName, lastVisitDate}) {
        super({id, doctorTitle, purpose,  description, priority, patientName});
        this.lastVisitDate = lastVisitDate;
      }
      renderVisit() {
        visitList.addEventListener('click', (event) => {
            const showTarget = event.target.closest('.btn-visit-show');// делаем поиск нужного элемента в евенте
            const amendTarget = event.target.closest('.btn-visit-amend');// делаем поиск нужного элемента в евенте
            const id = liTarget.getAttribute('data-visit-id');

            if (amendTarget) {
                const newVisitForm = new visitDentistForm()
                const newVisitModal = new Modal({
                    body: newVisitForm.render(),
                    closeOutside: true
                });
                document.body.insertAdjacentElement('beforeend', newVisitModal.render())
            }

            if (showTarget) {
                showVisit(id)
                .then(({id, doctorTitle, purpose, description, priority, patientName, lastVisitDate}) => {
                    visitList.insertAdjacentHTML('afterbegin', `
                        <div class="list-group-item visit-list--item list-group-item-action" data-visit-id="${id}">
                            <div class="list-group-item-info">
                                <input id="${id}" class="form-control" name="patientname" placeholder="${patientName}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${doctorTitle}" class="form-control" name="doctortitle" placeholder="${doctorTitle}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${purpose}" class="form-control" name="purpose" placeholder="${purpose}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${description}" class="form-control" name="description" placeholder="${description}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${priority}" class="form-control" name="priority" placeholder="${priority}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${lastVisitDate}" class="form-control" name="lastvisitdate" placeholder="${lastVisitDate}">
                            </div>
                        </div>
                    `)
                })
            }
        })
    }
}
export class visitCardiologistCard extends visitCard {
    constructor({id, doctorTitle, purpose, description, description, priority, patientName, pressure, BMI, diseases, age}) {
        super({id, doctorTitle, purpose, description, description, priority, patientName});
        this.pressure = pressure;
        this.BMI = BMI;
        this.diseases = diseases;
        this.age = age;
      }
      renderVisit() {
        visitList.addEventListener('click', (event) => {
            const showTarget = event.target.closest('.btn-visit-show');// делаем поиск нужного элемента в евенте
            const amendTarget = event.target.closest('.btn-visit-amend');// делаем поиск нужного элемента в евенте
            const id = liTarget.getAttribute('data-visit-id');

            if (amendTarget) {
                const newVisitForm = new visitCardiologistForm()
                const newVisitModal = new Modal({
                    body: newVisitForm.render(),
                    closeOutside: true
                });
                document.body.insertAdjacentElement('beforeend', newVisitModal.render())
            }

            if (showTarget) {
                showVisit(id)
                .then(({id, doctorTitle, purpose, description, priority, patientName, pressure, BMI, diseases, age}) => {
                    visitList.insertAdjacentHTML('afterbegin', `
                        <div class="list-group-item visit-list--item list-group-item-action" data-visit-id="${id}">
                            <div class="list-group-item-info">
                                <input id="${id}" class="form-control" name="patientname" placeholder="${patientName}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${doctorTitle}" class="form-control" name="doctortitle" placeholder="${doctorTitle}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${purpose}" class="form-control" name="purpose" placeholder="${purpose}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${description}" class="form-control" name="description" placeholder="${description}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${priority}" class="form-control" name="priority" placeholder="${priority}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${pressure}" class="form-control" name="pressure" placeholder="${pressure}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${BMI}" class="form-control" name="BMI" placeholder="${BMI}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${diseases}" class="form-control" name="diseases" placeholder="${diseases}">
                            </div>
                            <div class="list-group-item-info">
                                <input id="${age}" class="form-control" name="priority" placeholder="${age}">
                            </div>
                        </div>
                    `)
                })
            }
        })
    }
}
