export default class HeadController {
    constructor() {
        let show__form__btn = document.querySelector(".table .head .controlls #appender");
        let form = document.querySelector("#appender-form");
        let form__closer = document.querySelector('#appender-form .form-closer');

        this.getShowFormBtn = _ => {
            return show__form__btn;
        }

        this.setShowFormBtn = (ele) => {
            show__form__btn = ele;
        }

        this.getForm = _ => {
            return form;
        }

        this.setForm = (ele) => {
            form = ele;
        }

        this.getFormCloser = _ => {
            return form__closer;
        }

        this.setFormCloser = (ele) => {
            form__closer = ele;
        }

        this.action = _ => {
            show__form__btn.addEventListener('click', () => {
                form.classList.toggle('active-form')
            })
            form__closer.addEventListener('click', () => {
                form.classList.remove('active-form');
            })
        }
    }


}

new HeadController().action();