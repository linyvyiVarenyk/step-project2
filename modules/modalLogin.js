const MODAL_ACTIVE_CLASS = 'modal-active';

const loginFormBtn = document.querySelector('.header-btn-login');
const modalForm = document.querySelector('#modal-login-form');

function closeModals(e) {
    e.preventDefault();

    modalForm.classList.remove(MODAL_ACTIVE_CLASS);

    document.body.classList.remove ('body-fixed');
  }

loginFormBtn.addEventListener('click', function () {
    modalForm.classList.add(MODAL_ACTIVE_CLASS);

    const modalFormClose = document.querySelector('#modal-form-close');
    modalFormClose.addEventListener('click', closeModals);
    
    document.body.classList.add ('body-fixed');
    
    modalForm.addEventListener('submit', sendUserInfo);
});