import card  from '../modules/visitCard.js'

const isSomeThing = (value) => value !== undefined
const isFetchValid = (value) => value.status !== 200

const showAllCard = (container, cardArr) => {
    if (cardArr.length === 0) {
        container.insertAdjacentHTML('afterbegin', `<h2>No visit</h2>`)
    }else {
        cardArr.forEach(item =>{
            new card.VisitCard(item, container).render()
        })
    }
}

export default {
    isSomeThing,
    isFetchValid,
    showAllCard
}