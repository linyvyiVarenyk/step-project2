import crete from "../functions/classUtils.js";
import api from '../functions/API.js'

class VisitCard {

    constructor(visitInfo, cardsContainer) {
        this.visitInfo = visitInfo
        this.cardsContainer = cardsContainer
        this.cardContainer = new crete.Element({name: 'div', cssClass: 'card-container',}).render()
        this.removeBtn  = new crete.Element({name: 'button', cssClass: 'removeBtn', textContent:'X',type:'button'}).render()
        this.doctor = new crete.Element({name: 'p', cssClass: 'doctor-container',textContent:`${visitInfo.doctor}`}).render()
        this.emergency = new crete.Element({name: 'p', cssClass: 'emergency-container',textContent:`${visitInfo.emergency}`}).render()
        this.showMore = new crete.Element({name: 'button', cssClass: 'showMore', type:'button', textContent:'show less'}).render()
       // дообити редагувати візит, щоб переходило на вже заповнену форму ->
        this.amendVisit = new crete.Element({name: 'button', cssClass: 'amendVisit', type:'button', textContent:'amendVisit'}).render()
        this.cardAdditionalContainer = new crete.Element({name: 'div', cssClass: 'card-container--additionalInfo',}).render()

        this.aditionalInfo = {}
    }

    getContent(){
        Object.entries(this.visitInfo).forEach(item =>{
            if(item[0] !== 'id' && item[0] !== 'doctor' && item[0] !== 'emergency'){
                return this.aditionalInfo === {...this.aditionalInfo[item[0]] =new crete.Element({name: 'p', cssClass:'card-info', textContent:`${item[1]}`}).render()}
            }
        })
    }

    getId(){
        this.showMore.id = `${this.visitInfo.id}`+'showMore'
        this.cardContainer.id = `${this.visitInfo.id}`+'container'
        this.removeBtn.id  = this.visitInfo.id
    }

    getBaseCardInfo() {
        Object.values(this).forEach(card =>{
            if(card !== this.aditionalInfo && card !== this.visitInfo && card !== this.cardContainer && this.cardsContainer !==card)
            this.cardContainer.insertAdjacentElement('beforeend', card)
            //cardContainer треба запулить сюди const mainCardBoard = document.querySelector('.main-card-board')
        })
    }

    getAdditionalCardInfo() {
        Object.values(this.aditionalInfo).forEach(card =>this.cardAdditionalContainer.insertAdjacentElement('beforeend', card))
    }

    getEventEventListener(){
        this.cardContainer.addEventListener('click', e =>{
            e.preventDefault()
            if (e.target === this.showMore){
                e.target.textContent.toLocaleLowerCase() === 'show more' ? this.showMore.textContent = 'show less':  this.showMore.textContent = 'show more'
                e.target.nextElementSibling.classList.toggle('hide')
            }
            if(e.target === this.removeBtn){
                api.deleteCards(e.target.id)
                e.target.parentElement.remove()
            }
        })

    }

    render(){
        this.getId()
        this.getContent()
        this.getAdditionalCardInfo()
        this.getBaseCardInfo()
        this.getEventEventListener()
        this.cardsContainer.append(this.cardContainer)
    }
}

export default {
    VisitCard,
}
