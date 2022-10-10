import formValid from './formValid.js';
import Data from '../data/data.js';

export default class DataAppender extends formValid {
    constructor() {
        super();
        let form__inputs = Array.from(this.getForm().querySelectorAll('input'))
            .concat(Array.from(this.getForm().querySelectorAll('select')));
        let form__btn = this.getForm().querySelector('button');

        let data = new Data();

        this.appender = () => {
            form__btn.addEventListener('click', (e) => {
                e.preventDefault();
                form__inputs.forEach(e => {
                    if (e.value == '') {
                        e.style.border = '2px solid red';
                    }
                })
                data.append();
                data.edit();
            })

            form__inputs.slice(3, 6).forEach(e => {
                e.addEventListener('input', ({ target }) => {
                    if (target.value != '') {
                        target.style.border = '2px solid #273c75';
                    }
                })
            })
        }
    }
}

new DataAppender().appender();