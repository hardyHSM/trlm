

class CitySelect {

    constructor() {
        this.adress_current = document.querySelector(".page-adress__current");
        this.city_drop = document.querySelector(".page-adress__drop");
        this.city_button_yes = document.querySelector(".page-adress__yes");
        this.city_button_no = document.querySelector(".page-adress__no");
        this.city_current = document.querySelector(".page-adress__current-city");
        this.pick = document.querySelector(".pick-adress");
        this.search_input = document.querySelector(".pick-adress__input");
        this.pick_list = document.querySelector(".pick-adress__list");
        this.state = true;
        this.init();
    }
    init() {
        this.adress_current.addEventListener("click", () => {
            this.showDrop();
        });
        this.city_button_yes.addEventListener("click", (e) => {
            this.removeDrop();
            let text_city = this.city_current.textContent.replace('?', '');
            this.city_drop.classList.remove("page-adress__drop_active");
            this.adress_current.textContent = text_city;
        });
        this.city_button_no.addEventListener("click", (e) => {
            this.pickCity();
        });
        window.addEventListener("mousedown", (e) => {
            if(this.state == true) {
                if(!e.target.closest(".page-adress")) {
                    this.removeDrop();
                };
            }
        });
        // window.addEventListener("load", () => {
        //     setTimeout(() => {
        //         this.showDrop();
        //     }, 3000);
        // });
    }
    pickCity() {
        this.city_button_yes.setAttribute("disabled",true);
        this.pick.classList.add("pick-adress_active");
        this.search();
    }
    showDrop() {
        this.state = true;
        this.city_drop.classList.add("page-adress__drop_active");
    }
    removeDrop() {
        this.state = false;
        this.city_drop.classList.remove("page-adress__drop_active");
    }
    search() {
        this.search_input.addEventListener("input", ()=> {
            let text = this.search_input.value;
            if(text.length == 0) {
                this.pick_list.innerHTML = "";
                return false;
            }
            let finded_items = [];
            getRegions().forEach(item => {
                if(finded_items.length < 5) {
                    if(item.indexOf(text) >= 0) {
                        const search = text;
                        const replaceWith = `<b>${text}</b>`;

                        const selected_text = item.split(search).join(replaceWith);
                        finded_items.push(selected_text);
                    }
                }
            });
            this.pick_list.innerHTML = "";
            finded_items.forEach(item => {
                this.pick_list.innerHTML += `<li class="pick-adress__item">${item}</li>`;
            });
            this.pick_list.querySelectorAll(".pick-adress__item").forEach(element => {
            element.addEventListener("click", () => {
                this.onPick(element.textContent);
            });
        });
        });
    }
    onPick(text) {
        this.pick.classList.remove("pick-adress_active");
        this.city_current.textContent = text;
        this.city_button_yes.removeAttribute("disabled");
        this.pick_list.innerHTML = "";
    }
}


let city_drop = new CitySelect();

  
// window.addEventListener("load", function () {
//     setTimeout(() => {
//         city_drop.classList.add("page-adress__drop_active");
//     }, 0);
// });

// city_button_yes.addEventListener("click", function () {
//     let text_city = city_current.textContent.replace('?', '');
//     city_drop.classList.remove("page-adress__drop_active");
//     adress_current.textContent = text_city;
// });

function getRegions() {
    return [
    "Алтайский край",
    "Забайкальский край",
    "Камчатский край",
    "Краснодарский край",
    "Красноярский край",
    "Пермский край",
    "Приморский край",
    "Ставропольский край",
    "Хабаровский край",
    "Амурская область",
    "Архангельская область",
    "Астраханская область",
    "Белгородская область",
    "Брянская область",
    "Владимирская область",
    "Волгоградская область",
    "Вологодская область",
    "Воронежская область",
    "Ивановская область",
    "Иркутская область",
    "Калининградская область",
    "Калужская область",
    "Кемеровская область",
    "Кировская область",
    "Костромская область",
    "Курганская область",
    "Курская область",
    "Ленинградская область",
    "Липецкая область",
    "Магаданская область",
    "Московская область",
    "Мурманская область",
    "Нижегородская область",
    "Новгородская область",
    "Новосибирская область",
    "Омская область",
    "Оренбургская область",
    "Орловская область",
    "Пензенская область",
    "Псковская область",
    "Ростовская область",
    "Рязанская область",
    "Самарская область",
    "Саратовская область",
    "Сахалинская область",
    "Свердловская область",
    "Смоленская область",
    "Тамбовская область",
    "Тверская область",
    "Томская область",
    "Тульская область",
    "Тюменская область",
    "Ульяновская область",
    "Челябинская область",
    "Ярославская область",
    "Москва",
    "Санкт-Петербург",
    "Еврейская АО",
    "Ненецкий АО",
    "Ханты-Мансийский АО",
    "Чукотский АО",
    "Ямало-Ненецкий АО",];
}