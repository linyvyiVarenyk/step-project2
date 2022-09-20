const BODY_SCROLL = 'modal-open'

export default class Modal {
    constructor({body, closeOutside = false}) {
        this.body = body;
        this.closeOutside = closeOutside;
    }

    attachListener() { // метод который отвечает за то что был проверить где производится клик и убирает нашу модалку если клик происходит вне модалки и крестик
        document.body.addEventListener("click", (event) => {
            let modal = event.target.classList.contains('modal');
            let close = event.target.classList.contains('close');

            if (modal && this.closeOutside || close) {
                this.close()
            }
        })
    }

    close() { // метод который удаляет темный беграунд подложку модалки, удаляет модалку и возращаят скрол
        this.background.remove()
        document.body.classList.remove(BODY_SCROLL);
        this.modal.remove()
    }

    renderBackground() { // метод который добавляет темную подложку под попапом
        this.background = document.createElement("div")
        this.background.classList.add('modal-backdrop');
        document.body.append(this.background)
    }


    render() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.modal.style.display = "block";
        document.body.classList.add(BODY_SCROLL);
        this.modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">VISIT INFORMATION</h1>
                    </div>
                    <div class="modal-body">
<!--                       ${this.body ? this.body : ''} так не работает потому что это умные кавычки и там получаем не стуртуру html а обьект --> 
                    </div>
                </div>
            </div>
        `
        if (this.body) {
             this.modal.querySelector('.modal-body').append(this.body);
        }

        this.renderBackground();
        this.attachListener();
        return this.modal
    }
}
