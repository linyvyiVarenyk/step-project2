import functions from './functions/API.js'
import visitForm from "./modules/visitForm.js";
import additionalFunction from "./functions/additionalFunction.js";

const MODAL_ACTIVE_CLASS = 'modal-active';

//elements

const modal = document.querySelector('.modal-container')
const loginForm = document.querySelector('.modal-login-form')
const loginFormBtn = document.querySelector('#login');
const createVisit = document.querySelector('#visit')
const cardContainer = document.querySelector('#CardContainer')
const mainAboutElement = document.querySelector('.main-about')
const mainFilterBlock = document.querySelector('.main-filter')
const mainCardBoard = document.querySelector('.main-card-board')

//Listeners

const LoginBtn = (e) => {
    e.preventDefault()
    modal.classList.add(MODAL_ACTIVE_CLASS);
    document.body.classList.add('body-fixed');
    modal.addEventListener('click', (closeModals))
}


const login = async (e) => {
    e.preventDefault();
    const cursorTarget = e.target
    if (cursorTarget.nodeName === "BUTTON") {
        const inputArr = [...loginForm.children].map(children => {
            if (children.classList.contains('modal-login-form-field')) {
                return children.firstElementChild.value
            }
        }).filter(result => additionalFunction.isSomeThing(result))
        const userInfo = {email: inputArr[0], password: inputArr[1]}

        const result = await functions.getToken(userInfo)

        if (await result.status) {
            sessionStorage.setItem('userData', JSON.stringify(result.token))
            loginFormBtn.classList.toggle('hide')
            createVisit.classList.toggle('hide')
            mainAboutElement.classList.toggle('hide')
            mainFilterBlock.classList.toggle('hide')
            mainCardBoard.classList.toggle('hide')

            closeModalLayer()
            const getCards = await functions.getCards(result.token)
            additionalFunction.showAllCard(cardContainer, getCards)
        }
    }
}

const showVisitModal = (e) => {
    e.preventDefault()
    const visit = new visitForm.VisitForm(cardContainer)
    visit.render()
}

loginFormBtn.addEventListener('click', LoginBtn)
loginForm.addEventListener('click', login)
createVisit.addEventListener('click', showVisitModal)


const clearEvents = (action) => {
    modal.removeEventListener('click', action)
}

const closeModalLayer = () => {
    modal.classList.remove(MODAL_ACTIVE_CLASS)
    document.body.classList.remove('body-fixed');
    clearEvents(closeModals)
}

function closeModals(e) {
    e.preventDefault();
    const cursorTarget = e.target
    if (cursorTarget === e.currentTarget) {
        closeModalLayer()
    }
}