import additionalFunction from "./additionalFunction.js";
export const getHeadersTemplate = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + `${ token? token : JSON.parse(sessionStorage.getItem('userData'))}`
    }
}

const getToken = async (arg) => {
    try {
        const fetchData = fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arg)
        })
        const checkResult = await fetchData
        if (additionalFunction.isFetchValid(checkResult)) return new Error()
        const result = await checkResult.text()
        return {status: true, token: result}

    } catch (e) {
        return {status: false}
    }
}

export const getCards = async (token) => {
    try {
        const getCard = fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: getHeadersTemplate(token)
        })
        const resultJson = await getCard
        const result = await resultJson.json()

        if (additionalFunction.isFetchValid(resultJson)) {
            return new Error()
        }
        return  result

    } catch (e) {
        return false
    }
}

export const submitForm = async (userInfo) => {
    try {
        const submitData = fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: getHeadersTemplate(),
            body: JSON.stringify(userInfo)
        })
        const checkResult = await submitData
        if (additionalFunction.isFetchValid(checkResult)) {
            return new Error()
        }
        return true

    } catch (e) {
        console.log('submit false')
    }
}

const deleteCards = (id) => {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'DELETE',
        headers: getHeadersTemplate()
    })
}

export default {
    getToken,
    submitForm,
    getCards,
    getHeadersTemplate,
    deleteCards
}