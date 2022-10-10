import FormValidation from "../app/formValid.js";
import SearchController from '../app/searchSorting.js'

export default class Data extends FormValidation {
  constructor() {
    super();

    let data = [];
    let form__inputs = Array.from(this.getForm().querySelectorAll("input")).concat(Array.from(this.getForm().querySelectorAll("select")));
    let table__std__slide = document.querySelector(".std-slide");
    let table__formater = document.querySelector(".table .head .controlls #formater");
    let mess__valider = document.querySelector('.valid-mess');
    let search__controller = new SearchController();
    let options__stage__filter = document.querySelector('.all-st-opt #opt')
    let options__search__filter = document.querySelector('.search #opt');
    let search__input = document.querySelector('#search-inp-data');



    window.addEventListener('load', () => {
      if (JSON.parse(localStorage.getItem('data')).length > 0) {
        data = JSON.parse(localStorage.getItem('data'));
        this.dom__insert__data(data);
        this.edit();
        this.slide__elements();
        this.filter__data__sender();
        this.warn();
        search__controller.appender(data);
      }
    })

    this.data__seter__fun = (name, age, phone, dateAtt, datePay, dateExp, stage, status) => {
      return { name, age, phone, dateAtt, datePay, dateExp, stage, status };
    }

    this.append = _ => {

      let inp__val__test = form__inputs.every((e) => e.value !== "" && e.style.border != "2px solid red");

      if (inp__val__test) {
        let newData = this.data__seter__fun(
          form__inputs[0].value,
          form__inputs[1].value,
          form__inputs[2].value,
          form__inputs[3].value,
          form__inputs[4].value,
          form__inputs[5].value,
          form__inputs[6].value,
          form__inputs[7].value
        )

        let old__data__test = data.some((e) => e.phone == newData.phone);

        if (!old__data__test) {
          data.push(newData);
          form__inputs.slice(0, 6).forEach((e) => {
            e.value = "";
          });
          this.getMessAlret().parentElement.setAttribute("mess", "norm");
          this.getMessAlret().parentElement.classList.remove("active-form");
          this.getMessAlret().innerText = "Enter Data";
          form__inputs.forEach((e) => {
            e.style.border = "none";
          });
          this.dom__insert__data(data);
        } else {
          this.getMessAlret().parentElement.setAttribute("mess", "false");
          this.getMessAlret().innerText = "This Student Exist";
        }
      }

      this.warn();
      this.slide__elements();
      search__controller.appender(data);
      this.filter__data__sender();
      this.data__saver__base(data);
    }


    this.slide__elements = _ => {
      (function data_ele_controll() {
        let content = document.querySelectorAll('.content');
        content.forEach(e => {
          e.addEventListener('click', ({ target }) => {
            if (target.parentElement.classList.contains('content')) {
              target.parentElement.classList.toggle('active-slide');
            }
          })
        })
      })();
    }

    this.dom__insert__data = (data) => {
      table__std__slide.innerHTML = "";
      data.forEach((e) => {
        table__std__slide.insertAdjacentHTML(
          "beforeend",
          `
                <div class ="content">
                    <div class="slide">
                        <p id="slide-name">${e.name}</p>
                        <span><ion-icon name="chevron-down-outline"></ion-icon></span>
                        </div>
                        <div class="std-info">
                        <div class="name">
                            <label for="name"><span>#</span> Student Name</label>
                            <input type="text" value="${e.name}"  valid="true" id="name" disabled />
                        </div>
                        <div class="age">
                            <label for="number"><span>#</span> Student Age</label>
                            <input type="number" value="${e.age}" id="number" valid="true" disabled />
                        </div>
                        <div class="phone">
                            <label for="number-phone"><span>#</span> Student Number</label>
                            <input type="number" value="${e.phone}" id="number-phone" valid="true" disabled/>
                        </div>
                        <div class="date-at">
                            <label for="date-at"> <span>#</span> Date of Attended </label>
                            <input type="date" value="${e.dateAtt}" id="data-at" disabled />
                        </div>
                        <div class="date-pay">
                            <label for="date-pay"><span>#</span> Date of Payment</label>
                            <input type="date" value="${e.datePay}" id="date-pay" disabled />
                        </div>
                        <div class="date-exp">
                            <label for="date-exp"> <span>#</span> Date of Expire </label>
                            <input type="date" value="${e.dateExp}" id="date-exp" disabled />
                        </div>
                        <div class="date-stage">
                            <label for="date-stage"><span>#</span> Student Stage</label>
                                  <select name="" id="opt" disabled>
                                        <option value="${e.stage}">${e.stage}</option>
                                        <option value="Primary">Primary</option>
                                        <option value="Junior high">Junior high</option>
                                        <option value="high school">high school</option>
                                  </select>
                        </div>
                        <div class="exp">
                            <label for="exp"> <span>#</span>Student Status </label>
                            <select name="" disabled>
                                <option value="${e.status}">${e.status}</option>
                                <option value="${e.status == 'active' ? 'not active' : 'active'}">${e.status == 'active' ? 'not active' : 'active'}</option>
                            </select>
                        </div>
                        <div class="controlles">
                            <div class="btn">
                            <button><ion-icon name="create-outline"></ion-icon></button>
                            <button><ion-icon name="save-outline"></ion-icon></button>
                            <button><ion-icon name="trash-outline"></ion-icon></button>
                            </div>
                        </div>
                    </div> 
                </div>
            `
        );
      });
    }

    this.edit = _ => {
      let students__edit__inputs = document.querySelectorAll('.content');
      students__edit__inputs.forEach((element, index) => {
        let edit__btns = element.querySelectorAll('button')[0];
        let save__btns = element.querySelectorAll('button')[1];
        let delete__btns = element.querySelectorAll('button')[2];
        let content__inputs = Array.from(element.querySelectorAll('input')).concat(Array.from(element.querySelectorAll('select')));
        let content__inputs__number = element.querySelector('input[type="number"]');
        let content__inputs__valid = element.querySelectorAll('input[valid="true"]');
        let valid__form__obj = new FormValidation(Array.from(content__inputs__valid), mess__valider, content__inputs__number);
        let new__name__setter = document.querySelector('#slide-name');

        delete__btns.addEventListener('click', () => {
          this.elements__deleter(index);
        })

        edit__btns.addEventListener('click', () => {
          valid__form__obj.validation();
          content__inputs.forEach(e => {
            e.removeAttribute('disabled');
          })
        })

        save__btns.addEventListener('click', () => {
          data[index] = this.data__seter__fun(
            content__inputs[0].value,
            content__inputs[1].value,
            content__inputs[2].value,
            content__inputs[3].value,
            content__inputs[4].value,
            content__inputs[5].value,
            content__inputs[6].value,
            content__inputs[7].value
          );

          content__inputs.forEach(e => {
            if (e.value !== '' && getComputedStyle(e).border !== '2px solid red') {
              e.setAttribute('disabled', '');
              e.style.border = 'none';
              new__name__setter.innerText = content__inputs[0].value;
            } else {
              e.style.border = '2px solid red';
              mess__valider.innerText = `Please Enter ${e.previousElementSibling.innerText}`;
              mess__valider.parentElement.setAttribute('mess', 'false');
            }
          })

          if (valid__form__obj.status) {
            if (valid__form__obj.status[0]) {
              content__inputs[valid__form__obj.status[1]].style.border = 'none';
              mess__valider.parentElement.setAttribute('mess', 'none');
              content__inputs[valid__form__obj.status[1]].setAttribute('disabled', '');
            } else {
              content__inputs[valid__form__obj.status[1]].style.border = '2px solid red';
              mess__valider.innerText = `Please Enter ${content__inputs[valid__form__obj.status[1]].previousElementSibling.innerText}`;
              mess__valider.parentElement.setAttribute('mess', 'false');
              content__inputs[valid__form__obj.status[1]].removeAttribute('disabled', '');
            }
          }
          if (!Array.from(content__inputs).some(e => e.style.border == "2px solid red")) {
            mess__valider.parentElement.setAttribute('mess', 'none');
          }
          search__controller.appender(data);
          this.data__saver__base(data);
        })
      })
    }

    this.elements__deleter = (index) => {
      data = data.filter((e, i) => i !== index);
      this.dom__insert__data(data);
      this.slide__elements();
      this.edit();
      search__controller.appender(data);
      this.data__saver__base(data);
    }

    this.warn = _ => {
      table__formater.addEventListener('click', _ => {
        mess__valider.innerHTML = '';
        mess__valider.insertAdjacentHTML('afterbegin', `
          <div>You Will Delete All Data !</div>
          <button id = "formater-yes">Yes</button>
          <button id = "formater-del">Cancle</button>
          `)
        if (data.length > 0) {
          mess__valider.parentElement.setAttribute('mess', 'warn')
          this.formater();
        }
      })
    }

    this.formater = () => {
      let formater__yes = document.querySelector('#formater-yes');
      let formater__del = document.querySelector('#formater-del');

      formater__yes.addEventListener('click', () => {
        data = [];
        this.dom__insert__data(data);
        mess__valider.parentElement.setAttribute('mess', 'none')
        mess__valider.innerHTML = '';
        search__controller.appender(data);
        this.data__saver__base(data);
      })

      formater__del.addEventListener('click', () => {
        mess__valider.parentElement.setAttribute('mess', 'none')
        mess__valider.innerHTML = '';
      })
    }

    this.filter__data__sender = () => {
      options__stage__filter.addEventListener('change', ({ target }) => {
        let newData = data.filter(e => {
          switch (e.stage) {
            case target.value:
              return e
              break;
          }
          switch (target.value) {
            case 'all':
              return data;
              break;
          }

        });
        this.dom__insert__data(newData);
        this.slide__elements();
        this.edit();
      })

      function input_tester(search__key = 'name') {
        search__input.addEventListener('input', ({ target }) => {
          let newData = data.filter(e => e[search__key].includes(target.value));
          this.dom__insert__data(newData);
          this.slide__elements();
          this.edit();
        })
      }
      input_tester.call(this);
      options__search__filter.addEventListener('change', ({ target }) => {
        let search__key = target.value;
        input_tester.call(this, search__key);
      })
    }

    this.data__saver__base = (data) => {
      localStorage.setItem('data', JSON.stringify(data));
    }

  }
}

