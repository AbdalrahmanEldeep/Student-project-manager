import HeadController from "./controlls.js"
export default class FormValidation extends HeadController {
    constructor(input__elements__arg, message__ele__form__arg, num__input__elements__arg) {
        super();
        let input__elements = input__elements__arg || Array.from(this.getForm().querySelectorAll('input[valid="true"]'));
        let message__ele__form = message__ele__form__arg || document.querySelector('#appender-form #alret-mess-form');
        let num__input__elements = num__input__elements__arg || this.getForm().querySelector('input[type="number"]');
        this.status;
        //======== Variables Of Data Form Validation Controlls =========>

        //====== Validation Message ====> 
        this.truesy = (mess) => {
            message__ele__form.innerText = mess;
        }

        this.getMessAlret = () => {
            return message__ele__form;
        }
        //====== Validation Controller ====> 
        this.handeler__ex = (reg, target, messages_ex,index) => {
            if (!reg.test(target.value)) {
                this.truesy(`${target.getAttribute('id')} ${messages_ex.reg.reg__sucess__mess}`);
                message__ele__form.parentElement.setAttribute('mess', 'true');
                target.style.border = '2px solid #273c75';
                this.status = [true, index];
                if (target.value.length <= messages_ex.litter.litter__ex__1 && target.value.length >= messages_ex.litter.litter__ex__2) {
                    this.truesy(`${target.getAttribute('id')} value is succeed`);
                    message__ele__form.parentElement.setAttribute('mess', 'true');
                    target.style.border = '2px solid #273c75';
                    this.status = [true, index];
                } else {
                    this.truesy(`${messages_ex.litter.litter__sucess__not__mess} ${target.getAttribute('id')}`);
                    message__ele__form.parentElement.setAttribute('mess', 'false');
                    target.style.border = '2px solid red';
                    this.status = [false, index];
                }
            } else {
                this.truesy(`${messages_ex.reg.reg__sucess__not__mess} ${target.getAttribute('id')}`);
                message__ele__form.parentElement.setAttribute('mess', 'false');
                target.style.border = '2px solid red';
                this.status = [false, index];
            }
        }

        this.validation = () => {
            //=== Validation Conditions =====>
            let reg__list = [/([^a-z])/, /[^0-9]/, /[^0-9]/,];
            let messages_ex = [
                {
                    reg: {
                        reg__sucess__mess: 'litter is succeed',
                        reg__sucess__not__mess: 'Please enter small litters without numbers at',
                    },
                    litter: {
                        litter__sucess__not__mess: 'Please enter from (5-10) letters at',
                        litter__ex__1: 10,
                        litter__ex__2: 4
                    }
                },
                {
                    reg: {
                        reg__sucess__mess: 'Number is succeed',
                        reg__sucess__not__mess: 'Please enter  only numbers of'
                    },
                    litter: {
                        litter__sucess__not__mess: 'Please enter from (1-2) multy Number at',
                        litter__ex__1: 2,
                        litter__ex__2: 1
                    }
                },
                {
                    reg: {
                        reg__sucess__mess: 'Number is succeed',
                        reg__sucess__not__mess: 'Please enter  only numbers'
                    },
                    litter: {
                        litter__sucess__not__mess: 'Please enter (11) number at',
                        litter__ex__1: 11,
                        litter__ex__2: 11
                    }
                },
                //====== Validation Controller ====> 
            ] // Validation Message depended at case of input

            //=== Age Input Hndeller of value under 1 =====>
            num__input__elements.addEventListener('input', ({ target }) => {
                if (+target.value < 1) {
                    target.value = '';
                }
            })

            //========= Send Data To Test Conditions and message of process ========>
            input__elements.forEach((e, index) => {
                e.addEventListener('input', ({ target }) => {
                    this.handeler__ex(reg__list[index], target, messages_ex[index],index);
                })
            })
        }

    }
}

new FormValidation().validation();