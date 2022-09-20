const alert = (text,status) => {
    document.body.insertAdjacentHTML('beforebegin', `
        <div class="alert alert-${status}" role="alert">
            ${text}
        </div>
    `)

    setTimeout(()=>{
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove()
        }
    },2000)
}

export const addedVisitSuccess = () => alert('Added Visit success', 'success')
export const addedVisitError = () => alert('Added Visit error', 'danger')
