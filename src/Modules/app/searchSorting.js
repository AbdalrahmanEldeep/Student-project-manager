export default class SearchController {
    appender(data) {
        let filter__active = data.filter(e => e.status == 'active');
        let filter__not__active = data.filter(e => e.status == 'not active');
        let number__all__st = document.querySelector('.number-all-st');
        let number__active__st = document.querySelector('.number-active-st');
        let number__notactive__st = document.querySelector('.number-notactive-st');

        number__all__st.innerHTML = `All Student <span>${data.length}</span>`;
        number__active__st.innerHTML = `Active Student <span>${filter__active.length} / ${data.length}</span>`;
        number__notactive__st.innerHTML = `Not Active Student <span>${filter__not__active.length} / ${data.length}</span>`;
    }
}
new SearchController();