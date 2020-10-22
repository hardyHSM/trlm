
appendElements(".page-header__nav",".page-header__tel",2048,"afterend");appendElements(".page-header__nav",".page-header__content",1280,"afterend");appendElements(".page-header__search-wrapper",".page-header__row_last",2048,"beforeend");appendElements(".page-header__search-wrapper",".page-header__bottom > .page-content",960,"afterbegin");appendElements(".page-header__search-wrapper",".page-header__row-top",640,"afterbegin");appendElements(".button-catalog",".page-header__column",2048,"beforeend");appendElements(".button-catalog",".page-header__bottom > .page-content",960,"afterbegin");appendElements(".page-header__tel",".page-header__row-top",2048,"afterbegin");appendElements(".page-header__tel",".page-header__bottom > .page-content",960,"beforeend");appendElements(".page-header__adress",".page-header__column",2048,"afterbegin");appendElements(".page-header__adress",".page-header__bottom > .page-content",640,"afterbegin");function appendElements(what,where,breakpoint,pos){window.addEventListener("resize",()=>{let element=document.querySelector(what);let where_element=document.querySelector(where);if(window.innerWidth<breakpoint){where_element.insertAdjacentElement(pos,element);}});window.addEventListener("load",()=>{let element=document.querySelector(what);let where_element=document.querySelector(where);if(window.innerWidth<breakpoint){where_element.insertAdjacentElement(pos,element);}0});}
class Cart{constructor(cart){this.cart=cart;if(this.cart){this.output=cart.querySelector(".cart-table");this.total=cart.querySelector(".section-cart__total-price");this.init();}}
init(){this.getItems();document.querySelector(".promo__button").addEventListener("click",(e)=>{if(document.querySelector(".promo__input").value.length>3){document.querySelector(".promo__right").classList.add("promo__right_active");}else{document.querySelector(".promo__right").classList.remove("promo__right_active");}
this.changeSelected();});this.cart.querySelectorAll(".number-select__delete").forEach(item=>{item.addEventListener("click",(e)=>{item.closest(".product-table").querySelector(".number-select__value").innerHTML=0;this.onCountChange(item.closest(".product-table").querySelector(".number-select__left-button"));});});this.numberCheckboxes();}
numberCheckboxes(){let number_select_buttons=document.querySelectorAll(".number-select__button");number_select_buttons.forEach(element=>{element.addEventListener("click",()=>{let select=element.closest(".number-select");let select_value=+select.querySelector(".number-select__value").innerHTML;if(element.innerHTML.trim()=="+"){select.querySelector(".number-select__value").innerHTML=select_value+1;}else{if(select_value!==0){select.querySelector(".number-select__value").innerHTML=select_value-1;}}
this.onCountChange(element);});});}
onCountChange(element){let product=element.closest(".product-table");product.querySelector(".product-table__summa").innerHTML=`${parseInt(product.querySelector(".product-table__price").innerHTML) * parseInt(product.querySelector(".number-select__value").innerHTML)} ₽`;this.changeSelected();let products_data=JSON.parse(localStorage.products);let index=products_data.findIndex(item=>{if(parseInt(item.price.trim())==parseInt(product.querySelector(".product-table__price").innerHTML.trim().replace("₽",""))&&item.specs==product.querySelector(".product-table__descr").innerHTML){return item;}});products_data[index].count=parseInt(product.querySelector(".number-select__value").innerHTML);localStorage.products=JSON.stringify(products_data);}
getItems(){let products=JSON.parse(localStorage.products);products.forEach(element=>{this.drawItem(element);});}
drawItem(item){let node=`
        <tr class="cart-table__body product-table">
        <td class="cart-table__col-big">
            <div class="product-table__header">
                <b class="product-table__title">${item.title[1]}</b>
                <svg>
                    <use xlink:href="img/svg/sprite.svg#photo"></use>
                </svg>
            </div>
            <p class="product-table__descr">${item.specs}</p>
        </td>
        <td class="cart-table__col">
            <span class="product-table__day">завтра</span>
            <span class="product-table__data">12.03</span>
        </td>
        <td class="cart-table__col product-table__supplier">
            <span class="product-table__supplier-name">
                Поставщик 2
            </span>
            <span class="product-table__id">3.35</span>
        </td>
        <td class="cart-table__col">
            <span class="product-table__stock">
                RND_DRUGOY
            </span>
        </td>
        <td class="cart-table__col">
            <span class="product-table__price">
               ${item.price.trim()} ₽
            </span>
        </td>
        <td class="cart-table__col">
            <div class="number-select">
                <div class="number-select__body">
                    <div class="number-select__button number-select__left-button">
                        -
                    </div>
                    <div class="number-select__value">${item.count}</div>
                    <div class="number-select__button number-select__right-button">
                        +
                    </div>
                </div>
                <button class="number-select__delete">
                    <svg>
                        <use xlink:href="img/svg/sprite.svg#trash"></use>
                    </svg>
                </button>
            </div>
        </td>
        <td class="cart-table__col">
            <div class="product-table__summa">${+item.price * item.count} ₽</div>
        </td>
        <td class="cart-table__col">
            <div class="product-table__relevance product-table__relevance_high">
                <svg>
                    <use xlink:href="img/svg/sprite.svg#yes"></use>
                </svg>
                <div class="product-table__relevance-text">Высокая</div>
            </div>
        </td>
        <td class="cart-table__col">
            <label class="checkbox cart-table__checkbox">
                <input class="checkbox__input" type="checkbox">
                <span class="checkbox__view">
                    <svg>
                        <use xlink:href="img/svg/sprite.svg#yes-fit"></use>
                    </svg>
                </span>
                <span class="checkbox__title">Отложить</span>
            </label>
        </td>
        </tr>
        `;this.output.innerHTML+=node;this.output.querySelectorAll(".checkbox__input").forEach(checkbox=>{this.changeSelected();});let checkboxes=this.cart.querySelectorAll(".checkbox__input");checkboxes.forEach(item=>{item.addEventListener("change",(e)=>{this.changeSelected();});});this.changeSelected();}
changeSelected(){let total=0;this.output.querySelectorAll(".product-table").forEach(element=>{let checkbox=element.querySelector(".checkbox__input");if(checkbox.checked){let price=parseInt(element.querySelector(".product-table__summa").innerHTML);total+=price;}});document.querySelector(".section-cart__total-price").innerHTML=`${total} ₽`;if(document.querySelector(".promo__right").classList.contains("promo__right_active")){if(total>0){document.querySelector(".arrange__price").innerHTML=`${total + parseInt(document.querySelector(".promo__money").innerHTML)} ₽`;}else{document.querySelector(".arrange__price").innerHTML=`0 ₽`;}}else{document.querySelector(".arrange__price").innerHTML=`${total} ₽`;}
let summa=0;this.output.querySelectorAll(".product-table").forEach(element=>{let checkbox=element.querySelector(".checkbox__input");let price=parseInt(element.querySelector(".product-table__summa").innerHTML);summa+=price;});localStorage.summa=summa;}}
let cart_node=document.querySelector(".section-cart__table");let cart=new Cart(cart_node)
class CitySelect{constructor(){this.adress_current=document.querySelector(".page-adress__current");this.city_drop=document.querySelector(".page-adress__drop");this.city_button_yes=document.querySelector(".page-adress__yes");this.city_button_no=document.querySelector(".page-adress__no");this.city_current=document.querySelector(".page-adress__current-city");this.pick=document.querySelector(".pick-adress");this.search_input=document.querySelector(".pick-adress__input");this.pick_list=document.querySelector(".pick-adress__list");this.state=true;this.init();}
init(){this.adress_current.addEventListener("click",()=>{this.showDrop();});this.city_button_yes.addEventListener("click",(e)=>{this.removeDrop();let text_city=this.city_current.textContent.replace('?','');this.city_drop.classList.remove("page-adress__drop_active");this.adress_current.textContent=text_city;});this.city_button_no.addEventListener("click",(e)=>{this.pickCity();});window.addEventListener("mousedown",(e)=>{if(this.state==true){if(!e.target.closest(".page-adress")){this.removeDrop();};}});}
pickCity(){this.city_button_yes.setAttribute("disabled",true);this.pick.classList.add("pick-adress_active");this.search();}
showDrop(){this.state=true;this.city_drop.classList.add("page-adress__drop_active");}
removeDrop(){this.state=false;this.city_drop.classList.remove("page-adress__drop_active");}
search(){this.search_input.addEventListener("input",()=>{let text=this.search_input.value;if(text.length==0){this.pick_list.innerHTML="";return false;}
let finded_items=[];getRegions().forEach(item=>{if(finded_items.length<5){if(item.indexOf(text)>=0){const search=text;const replaceWith=`<b>${text}</b>`;const selected_text=item.split(search).join(replaceWith);finded_items.push(selected_text);}}});this.pick_list.innerHTML="";finded_items.forEach(item=>{this.pick_list.innerHTML+=`<li class="pick-adress__item">${item}</li>`;});this.pick_list.querySelectorAll(".pick-adress__item").forEach(element=>{element.addEventListener("click",()=>{this.onPick(element.textContent);});});});}
onPick(text){this.pick.classList.remove("pick-adress_active");this.city_current.textContent=text;this.city_button_yes.removeAttribute("disabled");this.pick_list.innerHTML="";}}
let city_drop=new CitySelect();function getRegions(){return["Алтайский край","Забайкальский край","Камчатский край","Краснодарский край","Красноярский край","Пермский край","Приморский край","Ставропольский край","Хабаровский край","Амурская область","Архангельская область","Астраханская область","Белгородская область","Брянская область","Владимирская область","Волгоградская область","Вологодская область","Воронежская область","Ивановская область","Иркутская область","Калининградская область","Калужская область","Кемеровская область","Кировская область","Костромская область","Курганская область","Курская область","Ленинградская область","Липецкая область","Магаданская область","Московская область","Мурманская область","Нижегородская область","Новгородская область","Новосибирская область","Омская область","Оренбургская область","Орловская область","Пензенская область","Псковская область","Ростовская область","Рязанская область","Самарская область","Саратовская область","Сахалинская область","Свердловская область","Смоленская область","Тамбовская область","Тверская область","Томская область","Тульская область","Тюменская область","Ульяновская область","Челябинская область","Ярославская область","Москва","Санкт-Петербург","Еврейская АО","Ненецкий АО","Ханты-Мансийский АО","Чукотский АО","Ямало-Ненецкий АО",];}
(function(){let button_submit=document.querySelector(".feedback-form__button");let name=document.querySelector(".page-input-icon_name .page-input-icon__input");let tel=document.querySelector(".page-input-icon_tel .page-input-icon__input");let mail=document.querySelector(".page-input-icon_mail .page-input-icon__input");let area=document.querySelector(".page-input-icon_area .page-input-icon__input");let inputs=document.querySelectorAll(".page-input-icon .page-input-icon__input");if(inputs){inputs.forEach(element=>{element.addEventListener("focus",(e)=>{element.closest(".page-input-icon").classList.add("page-input-icon_focus");});element.addEventListener("blur",(e)=>{element.closest(".page-input-icon").classList.remove("page-input-icon_focus");});});}
if(name){console.log(name);name.addEventListener("input",(e)=>{let input=e.target;let regName=/\d+/;if(input.value.length>1&&input.value.match(regName)==null){input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(tel){IMask(tel,{mask:'+{7} (000) 000-00-00',lazy:false,placeholderChar:'_'});tel.addEventListener("input",(e)=>{let input=e.target;if(input.value.indexOf("_")==-1){input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(mail){mail.addEventListener("input",(e)=>{let input=e.target;const regEmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;if(regEmail.test(input.value)){console.log(true);input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(area){area.addEventListener("input",(e)=>{let input=e.target;if(input.value.length>5){input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(button_submit){button_submit.addEventListener("click",(e)=>{e.preventDefault();console.log(0);if(name.closest(".page-input-icon").classList.contains("page-input-icon_active")&&tel.closest(".page-input-icon").classList.contains("page-input-icon_active")&&mail.closest(".page-input-icon").classList.contains("page-input-icon_active")&&area.closest(".page-input-icon").classList.contains("page-input-icon_active")){window.location.reload();}else{let form_inputs=document.querySelectorAll(".feedback-form .page-input-icon");form_inputs.forEach(element=>{if(!(element.classList.contains("page-input-icon_active"))){element.classList.add("page-input-icon_error");}});}});}}());class Multiselect{constructor(multiselect,dataselect,add,remove){this.object=document.querySelector(multiselect);if(this.object){this.data=dataselect;this.name=multiselect;this.add=add;this.remove=remove;this.object_complite=this.object.querySelector(".multi-select__complite");this.input=this.object.querySelector(".multi-select__input");this.complite=this.object.querySelector(".multi-select__complite");this.object_added=this.object.querySelector(".multi-select__added-list");this.open=false;this.init();}}
init(){this.initAppend();this.addHandlerOnClick();this.setHandlerOnInput();}
setHandlerOnInput(){this.input.addEventListener("input",(e)=>{let text=this.input.value;this.object_complite.innerHTML="";if(text.length==0){this.initAppend();this.addHandlerOnClick();}else{let finded_items=[];this.data.all.forEach(item=>{if(item.toLowerCase().indexOf(text.toLowerCase())!==-1&&finded_items.length<3){finded_items.push(item);}});finded_items.forEach(element=>{this.object_complite.innerHTML+=`<div class="multi-select__complite-item">${element}</div>`});this.addHandlerOnClick();}});}
addHandlerOnClick(){let complite_items=this.complite.querySelectorAll(".multi-select__complite-item");complite_items.forEach(element=>{element.addEventListener("click",(e)=>{if(!(this.equalItemsAdded(element))){this.object_added.innerHTML+=`
                        <span class="multi-select__added">
                        <span class="multi-select__text">${element.innerHTML}</span>
                            <svg>
                                <use xlink:href="img/svg/sprite.svg#close"></use>
                            </svg>
                        </span>
                    `;let addeds_items=this.object.querySelectorAll(".multi-select__added");addeds_items.forEach(element=>{element.querySelector("svg").addEventListener("click",(event)=>{this.remove(element.closest(".filter-block").querySelector(".filter-block__name"),element.querySelector(".multi-select__text"));this.object_added.removeChild(event.target.closest(".multi-select__added"));});});this.add(element.closest(".filter-block").querySelector(".filter-block__name"),element);}});});}
equalItemsAdded(element){let allItems=this.object_added.querySelectorAll(".multi-select__added");let founded=false;allItems.forEach(item=>{if(item.querySelector(".multi-select__text").innerHTML==element.textContent){founded=true;}});return founded;}
initAppend(){for(let i=0;i<3;i++){let populat_text=this.data.all[i];this.object_complite.innerHTML+=`<div class="multi-select__complite-item">${populat_text}</div>`;}}}
let data_oem={all:["JIS K 2234","TL-774","VW TL-774D (G12)","VW TL-774C (G11)","MAN 324 Type SN",]}
class PopUp{constructor(){this.popup=document.querySelector(".page-popup");this.sign_button=document.querySelector(".user-nav__item_sign");this.close_button=document.querySelector("[data-close]");this.overlay=document.querySelector(".page-overlay");this.tel_input=document.querySelector('.page-popup__input_tel');this.email_input=document.querySelector(".page-popup__input_email");this.pass_input=document.querySelector(".page-popup__input_pass");this.button_to_email=document.querySelector(".page-popup__link_email");this.button_to_tel=document.querySelector(".page-popup__link_tel");this.block_tel=document.querySelector(".page-popup__block_tel");this.block_email=document.querySelector(".page-popup__block_email");this.submit=document.querySelector(".page-popup__button");this.errors=document.querySelector(".page-popup__errors");this.forget_pass=document.querySelector(".page-popup__link-forget");this.rememb_pass=document.querySelector(".page-popup__link-remember");this.container_sign=document.querySelector(".page-popup__container_sign");this.container_forget=document.querySelector(".page-popup__container_forget");this.button_pass=document.querySelector(".page-popup__button-pass");this.validateBool=true;this.tel=true;this.init();}
init(){let phoneMask=IMask(this.tel_input,{mask:'+{7} (000) 000-00-00',lazy:false,placeholderChar:'_'});this.sign_button.addEventListener("click",(e)=>{e.preventDefault();this.show();});this.close_button.addEventListener("click",(e)=>{e.preventDefault();this.remove();});document.body.addEventListener("mousedown",(e)=>{if(!(e.target.closest(".page-popup"))&&this.popup.classList.contains("page-popup_active")){this.remove();}});this.button_to_email.addEventListener("click",(e)=>{e.preventDefault();this.block_tel.classList.remove("page-popup__block_active");this.block_email.classList.add("page-popup__block_active");this.tel=false;});this.button_to_tel.addEventListener("click",(e)=>{e.preventDefault();this.block_tel.classList.add("page-popup__block_active");this.block_email.classList.remove("page-popup__block_active");this.tel=true;});this.submit.addEventListener("click",(e)=>{e.preventDefault();this.validation();});this.forget_pass.addEventListener("click",(e)=>{e.preventDefault();this.container_sign.classList.remove("page-popup__container_active");this.container_forget.classList.add("page-popup__container_active");});this.rememb_pass.addEventListener("click",(e)=>{e.preventDefault();this.container_sign.classList.add("page-popup__container_active");this.container_forget.classList.remove("page-popup__container_active");});this.button_pass.addEventListener("click",(e)=>{e.preventDefault();this.validation_forgetpass();});}
show(){this.popup.classList.add("page-popup_active");this.overlay.classList.add("page-overlay_active");}
remove(){this.popup.classList.remove("page-popup_active");this.overlay.classList.remove("page-overlay_active");}
validation(){this.errors.innerHTML="";if(this.tel){if(!(this.tel_input.value.indexOf("_")==-1)){this.validateBool=false;this.errors.innerHTML+=`<div class="page-popup__error message message_error">
                Некорректный ввод телефона. Повторите попытку.
                </div>`;}}else{const regEmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;if(regEmail.test(this.email_input.value)){this.validateBool=true;}else{this.errors.innerHTML+=`<div class="page-popup__error message message_error">
                Некорректный ввод почты. Повторите попытку.
                </div>`;this.validateBool=false;}}
if(!(this.pass_input.value.length>=6)){this.validateBool=false;this.errors.innerHTML+=`<div class="page-popup__error message message_error">
                Некорректный ввод пароля. Пароль должен иметь как минимум 6 символов.
            </div>`;}
if(this.validateBool){console.log(true);window.location.reload();}}
validation_forgetpass(){this.container_forget.querySelector(".page-popup__errors").innerHTML="";const regEmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;const value=this.container_forget.querySelector(".page-popup__input_email").value;if(regEmail.test(value)){this.container_forget.querySelector(".page-popup__input_email").style.display="none";this.container_forget.querySelector(".page-popup__link-remember").style.display="none";this.container_forget.querySelector(".page-popup__button-pass").innerHTML="Закрыть окно";this.container_forget.querySelector(".page-popup__descr").innerHTML=`Ссылка для смены пароля отправлена на почту <b>${value.substr(0,4)}***${value.substr(value.search("@"))}</b>`
this.button_pass.addEventListener("click",()=>{this.remove();window.location.reload();});}else{this.container_forget.querySelector(".page-popup__errors").innerHTML+=`<div class="page-popup__error message message_error">
                Некорректный ввод почты. Повторите попытку.
                </div>`;}}}
let popup=new PopUp();(function(){let button_submit=document.querySelector(".reg-form__submit");let name_input=document.querySelector(".reg-form .page-input-icon_name input");let family_input=document.querySelector(".reg-form .page-input-icon_family input");let tel_input=document.querySelector(".reg-form .page-input-icon_tel input");let mail_input=document.querySelector(".reg-form .page-input-icon_mail input");let pass_input=document.querySelector(".reg-form .page-input-count_pass input");let repass_input=document.querySelector(".reg-form .page-input-count_repass input");if(name_input){name_input.addEventListener("input",e=>{let input=e.target;let regName=/\d+/;if(input.value.length>1&&input.value.match(regName)==null){e.target.closest(".page-input-icon").classList.add("page-input-icon_active")}});}
if(tel_input){IMask(tel_input,{mask:'+{7} (000) 000-00-00',lazy:false,placeholderChar:'_'});tel_input.addEventListener("input",(e)=>{let input=e.target;if(input.value.indexOf("_")==-1){input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(mail_input){mail_input.addEventListener("input",(e)=>{let input=e.target;const regEmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;if(regEmail.test(input.value)){input.closest(".page-input-icon").classList.add("page-input-icon_active");input.closest(".page-input-icon").classList.remove("page-input-icon_error");}else{input.closest(".page-input-icon").classList.remove("page-input-icon_active");}});}
if(pass_input){pass_input.addEventListener("input",(e)=>{let input=e.target;let input_count=input.closest(".page-input-count").querySelector(".page-input-count__number-left");input_count.innerHTML=input.value.length;if(input.value.length>=6){input.closest(".page-input-count").classList.remove("page-input-count_error");input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: none");input.closest(".page-input-count").classList.add("page-input-count_active");if(repass_input.value.length>=6&&pass_input.value==repass_input.value){repass_input.closest(".page-input-count").classList.remove("page-input-count_error");repass_input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: none");repass_input.closest(".page-input-count").classList.add("page-input-count_active");}else{repass_input.closest(".page-input-count").classList.add("page-input-count_error");repass_input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: block");repass_input.closest(".page-input-count").classList.remove("page-input-count_active");}}else{input.closest(".page-input-count").classList.add("page-input-count_error");input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: block");input.closest(".page-input-count").classList.remove("page-input-count_active");}});}
if(repass_input){repass_input.addEventListener("input",(e)=>{let input=e.target;let input_count=input.closest(".page-input-count").querySelector(".page-input-count__number-left");input_count.innerHTML=input.value.length;if(input.value.length>6&&pass_input.value==repass_input.value){input.closest(".page-input-count").classList.remove("page-input-count_error");input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: none");input.closest(".page-input-count").classList.add("page-input-count_active");}else{input.closest(".page-input-count").classList.add("page-input-count_error");input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style","display: block");input.closest(".page-input-count").classList.remove("page-input-count_active");}});}
if(button_submit){button_submit.addEventListener("click",(e)=>{e.preventDefault();if(name_input.closest(".page-input-icon").classList.contains("page-input-icon_active")&&tel_input.closest(".page-input-icon").classList.contains("page-input-icon_active")&&mail_input.closest(".page-input-icon").classList.contains("page-input-icon_active")&&!(pass_input.closest(".page-input-count").classList.contains("page-input-count_error"))&&!(repass_input.closest(".page-input-count").classList.contains("page-input-count_error"))){window.location.reload();console.log("read");}else{let form_inputs=document.querySelectorAll(".reg-form .page-input-icon");form_inputs.forEach(element=>{if(!(element.classList.contains("page-input-icon_active"))){element.classList.add("page-input-icon_error");}});let pass_inputs=[pass_input,repass_input];pass_inputs.forEach(element=>{if(!(element.closest(".page-input-count").classList.contains("page-input-count_active"))){element.closest(".page-input-count").classList.add("page-input-count_error");element.closest(".reg-form__item").querySelector(".reg-form__undertext_error").style.dispaly="block";};});}});}}());class Select{constructor(selectNode,cb=false){this.selectNode=selectNode;this.cb=cb;this.select=document.querySelector(selectNode);this.header=this.select.querySelector(".select__header");this.body=this.select.querySelector(".select__body");this.items=document.querySelectorAll(".select__item")
this.init();}
init(){this.select.addEventListener("click",(e)=>{this.open();});document.body.addEventListener("click",(e)=>{if(!(e.target.closest(this.selectNode))){this.close();}});this.items.forEach(element=>{element.addEventListener("click",()=>{this.items.forEach(element=>{element.classList.remove("select__item_current");});element.classList.add("select__item_current");this.header.textContent=element.innerHTML;this.close();if(this.cb){this.cb(this.header.textContent);}});});}
open(){this.select.classList.add("select_active");}
close(){this.select.classList.remove("select_active");}}
function getJSON(url,callback,bool){var xml;if(window.XMLHttpRequest){xml=new XMLHttpRequest();}else{xml=new ActiveXObject("Microsoft.XMLHTTP")}
xml.open("GET",url,bool);xml.responseType="json";xml.onreadystatechange=function(){if(xml.status==200){if(xml.readyState==4){callback(xml.response);}}else{console.log(xml.status);}}
xml.send();};class Filter{constructor(){this.data={"марка":[],"тип":[],"цвет":[],"объем":[],"спецификация oem":[]}
this.checkboxes=document.querySelectorAll(".page-filter .checkbox__input");this.filter_list=document.querySelector(".filters__list");this.multi_added=document.querySelector(".multi-select__added-list");this.products;if(this.filter_list){this.reset_button=this.filter_list.querySelector(".filter__item-reset");this.init();}}
init(){let notification=document.querySelector(".cart-notificiation");let filterSelect=new Select(".product__select-sort",(data)=>{this.sortProducts(data);});let change_view=document.querySelectorAll(".sort-view__item");let products_list=document.querySelector(".products__list");change_view.forEach(element=>{element.addEventListener("click",(e)=>{change_view.forEach(item=>{item.classList.remove("sort-view__item_active");});element.classList.add("sort-view__item_active");if(element.classList.contains("sort-view__table")){products_list.classList.add("products__list_table");}else{products_list.classList.remove("products__list_table");}});});window.addEventListener("resize",(e)=>{if(window.innerWidth<960){products_list.classList.remove("products__list_table");}});document.body.addEventListener("click",(e)=>{if(!e.target.closest(".cart-notificiation")&&!e.target.closest(".page-product__button")&&notification.classList.contains("cart-notification_active")){console.log(true);notification.classList.remove("cart-notification_active");}});this.checkboxes.forEach(element=>{element.addEventListener("change",(e)=>{if(element.checked){let category=element.closest(".filter-block").querySelector(".filter-block__name");let type=element.closest(".checkbox").querySelector(".checkbox__title");let text=`
                    <li class="filters__item">
                        <span class="filters__key">${category.innerHTML}</span>
                        <span class="filters__value">${type.innerHTML}</span>
                        <svg>
                            <use xlink:href="img/svg/sprite.svg#close"></use>
                        </svg>
                    </li>
                    
                    `;this.filter_list.insertAdjacentHTML("afterbegin",text);this.data[category.innerHTML.trim().toLowerCase()].push(type.innerHTML);this.onChange();this.afterAdd(element,false);}else{let category=element.closest(".filter-block").querySelector(".filter-block__name");let type=element.closest(".checkbox").querySelector(".checkbox__title");let items=this.filter_list.querySelectorAll(".filters__item");items.forEach(element=>{let el_category=element.querySelector(".filters__key");let el_type=element.querySelector(".filters__value");if(category&&type&&el_category&&el_type){if(category.innerHTML==el_category.innerHTML&&type.innerHTML==el_type.innerHTML){let index=this.data[category.innerHTML.trim().toLowerCase()].findIndex(item=>item==type.innerHTML);this.data[category.innerHTML.trim().toLowerCase()].splice(index,1);this.onChange();this.filter_list.removeChild(element);}}});}});});this.reset_button.addEventListener("click",()=>{this.checkboxes.forEach(element=>{element.checked=false;});this.filter_list.querySelectorAll(".filters__item").forEach(element=>{this.filter_list.removeChild(element);});for(const key in this.data){this.data[key]=[];}
this.onChange();this.multi_added.innerHTML="";});window.addEventListener("load",()=>{getJSON("../json/_products.json",(data)=>{this.products=data;this.onChange();},true);});}
afterAdd(checkbox=false,multiselect=false){let item=this.filter_list.querySelectorAll(".filters__item")[0];let svg_item=item.querySelector("svg");if(svg_item){svg_item.addEventListener("click",(e)=>{let category=item.closest(".filters__item").querySelector(".filters__key").innerHTML;let type=item.closest(".filters__item").querySelector(".filters__value").innerHTML;this.filter_list.removeChild(svg_item.closest(".filters__item"));if(checkbox){this.checkboxes.forEach(el=>{let item_category=el.closest(".filter-block").querySelector(".filter-block__name").innerHTML;let item_type=el.closest(".checkbox").querySelector(".checkbox__title").innerHTML;if(category==item_category&&type==item_type){checkbox.checked=false;let index=this.data[category.trim().toLowerCase()].findIndex(i=>i==type);this.data[category.trim().toLowerCase()].splice(index,1);this.onChange();}});}
if(multiselect){this.multi_added.querySelectorAll(".multi-select__added").forEach(element=>{let element_type=element.querySelector(".multi-select__text").innerHTML;if(element_type==type){this.multi_added.removeChild(element);}});}});}}
addItem(category,type){let text=`
            <li class="filters__item">
                <span class="filters__key">${category.innerHTML}</span>
                <span class="filters__value">${type.innerHTML}</span>
                <svg>
                    <use xlink:href="img/svg/sprite.svg#close"></use>
                </svg>
            </li>
            
            `;this.filter_list.insertAdjacentHTML("afterbegin",text);this.afterAdd(false,true);this.data[category.innerHTML.trim().toLowerCase()].push(type.innerHTML);this.onChange();}
removeItem(category,type){this.filter_list.querySelectorAll(".filters__item").forEach(element=>{let el_category=element.querySelector(".filters__key").innerHTML;let el_type=element.querySelector(".filters__value").innerHTML;if(category.innerHTML==el_category&&type.innerHTML==el_type){this.filter_list.removeChild(element);}});}
changeMulti(category,type){this.addItem(category,type);}
drawProducts(products){let notification=document.querySelector(".cart-notificiation");let products_node=document.querySelector(".products__list");products_node.innerHTML="";products.forEach(product=>{let html=`
            <div class="page-product products__item">
                <div class="page-product__header">
                    <picture>
                        <source media="(max-width: 0px)" srcset="${product['image-min']}">
                        <img class="page-product__img" src="${product['image']}" alt="">
                    </picture>
                </div>
                <div class="page-product__content">
                    <b class="page-product__title">${product['title']}</b>
                    <ul class="page-product__spec spec-product">
                        <li class="spec-product__item">
                            <span class="spec-product__key">Цвет:</span>
                            <span class="spec-product__value">${product['цвет']}</span>
                        </li>
                        <li class="spec-product__item">
                            <span class="spec-product__key">Объем:</span>
                            <span class="spec-product__value">${product['объем']}</span>
                        </li>
                        <li class="spec-product__item">
                            <span class="spec-product__key">Тип:</span>
                            <span class="spec-product__value">${product['тип']}</span>
                        </li>
                        <li class="spec-product__item spec-product__item_price">
                            <span class="spec-product__key">Цена:</span>
                            <span class="spec-product__value">${product['цена']} ₽</span
                        </li>
                    </ul>
                    <button class="page-product__button button button_backwards-accent">Купить</button>
                </div>
            </div>
            `;products_node.innerHTML+=html;});let buttons=document.querySelectorAll(".page-product");buttons.forEach(element=>{element.addEventListener("click",(e)=>{let title=element.querySelector(".page-product__title").textContent.split(" ");let img=element.querySelector(".page-product__img").getAttribute("src");let specs=element.querySelectorAll(".spec-product__item");let price=element.querySelector(".spec-product__item_price .spec-product__value").innerHTML.replace("₽","");let info="";let count=1;let summa_all=+price;if(localStorage.summa){summa_all=+summa_all+ +localStorage.summa;}
localStorage.summa=summa_all;title.forEach((item,index)=>{if(index>1){info+=`${item} `;}});specs.forEach(item=>{let value=item.querySelector(".spec-product__value");if(!value.closest(".spec-product__item_price")){info+=`${item.querySelector(".spec-product__value").innerHTML} `;}});let product={"title":title,"image":img,"specs":info,"price":price,"count":1}
let products;let find=false;if(localStorage.products){products=JSON.parse(localStorage.products);}else{products=[];}
products.forEach(element=>{if(product.specs==element.specs&&product.image==element.image&&product.price==element.price){element.count++;count=element.count;find=true;}});if(!find){products.push(product);}
localStorage.products=JSON.stringify(products);notification.innerHTML=`
                <button class="cart-notification__close">
                <svg>
                    <use xlink:href="img/svg/sprite.svg#close"></use>
                </svg>
                </button>
                <div class="cart-notificiation__top">
                    <div class="cart-notificiation__left">
                        <img src="${img}" alt="" srcset="">
                    </div>
                    <div class="cart-notificiation__right">
                        <div class="cart-notification__info">Добавлено в корзину</div>
                        <b class="cart-notificiation__title">${title[1]}</b>
                        <p class="cart-notificiation__spec">
                            ${info}
                        </p>
                        <div class="cart-notification__summa">
                            <span class="cart-notification__product-price">${price}</span>
                            <span class="cart-notification__add">+</span>
                            <span class="cart-notification__product-count">${count} ед.</span>
                            <span class="cart-notification__equal-sign">=</span>
                            <span class="cart-notification__equal">${price * count}</span>
                        </div>
                        <div class="cart-notification__row">
                            <span>Всего в корзине:</span>
                            <div class="cart-notification__summa-all">${summa_all}₽</div>
                        </div>
                        <a href="cart.html" class="cart-notification__button-cart button button_backwards-accent">Перейти в корзину</a>
                    </div>
                </div>
                `;if(!localStorage.show){notification.innerHTML+=`<div class="cart-notification__bottom">
                    <svg class="cart-notification__icon">
                        <use xlink:href="img/svg/sprite.svg#info"></use>
                    </svg>
                    <p class="cart-notification__warning">Рекомендуем оформлять заказы как можно быстрее: даже если вы будете заказывать товары по одному - это никак не отразится на бесплатной доставке, но зато вас никто не опередит и цена не успеет измениться.</p>
                    <button class="cart-notification__hide-warning button button_accent">Больше не показывать</button>
                    </div>`;}
notification.classList.add("cart-notification_active");let notification_close=notification.querySelector(".cart-notification__close");notification_close.addEventListener("click",(e)=>{notification.classList.remove("cart-notification_active");});let close_warning=notification.querySelector(".cart-notification__hide-warning");if(close_warning){close_warning.addEventListener("click",(e)=>{notification.querySelector(".cart-notification__bottom").style.display="none"
localStorage.show="false";});}});});}
onChange(){let products_node=document.querySelector(".products__list");let products=this.products;let data=this.data;this.filtered_products=products.slice();products_node.innerHTML="";products.forEach((product,index)=>{for(const key in product){if(data[key]&&data[key].length>0){let bool=data[key].find(item=>{return item.trim().toLowerCase()==product[key].trim().toLowerCase();});if(bool==undefined){delete this.filtered_products[index];}}}});this.drawProducts(this.filtered_products);}
sortProducts(data){let products=this.filtered_products;console.log(products);if(data=="По наименованию"){products.sort((first,second)=>{if(first["title"]>second["title"]){return 1;}else{return-1;}});}else if(data=="По популярности"){products.sort((first,second)=>{if(first>second){return 1;}else{return-1;}});}else if(data=="По бренду"){products.sort((first,second)=>{if(first["марка"]>second["марка"]){return-1;}else{return 1;}});}
this.drawProducts(products);console.log(products);}}
let filter=new Filter();let multisel=new Multiselect(".filter-block__multi-select",data_oem,function(category,type){filter.addItem(category,type);},function(category,type){filter.removeItem(category,type);});let mySwiper=new Swiper('.intro-slider',{navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev',},});let button_catalog=document.querySelector(".button-catalog");let catalog_menu=document.querySelector(".catalog-menu");let overlay=document.querySelector(".page-overlay");let search=document.querySelector(".page-search__input");let search_icon=document.querySelector(".page-search__icon");let search_wrapper=document.querySelector(".page-search");let search_button=document.querySelector(".page-search__button");let button_close=document.querySelector(".cookie-info__button");let cookie_info=document.querySelector(".cookie-info");let button_menu=document.querySelector(".button-menu");let header_nav=document.querySelector(".page-header__nav");let page_header=document.querySelector(".page-header");let links=document.querySelectorAll(".catalog-item__link-all");let page_tel=document.querySelector(".page-header__tel");let catalog_item_headers=document.querySelectorAll(".catalog-item__header");let button_filter=document.querySelector(".button-filter");let page_filter=document.querySelector(".page-filter");let filter_close=document.querySelector(".page-filter__close");if(filter_close){filter_close.addEventListener("click",()=>{overlay.classList.remove("page-overlay_active");page_filter.classList.remove("page-filter_active");});}
if(button_filter){button_filter.addEventListener("click",()=>{page_filter.classList.add("page-filter_active");overlay.classList.add("page-overlay_active");});}
links.forEach(element=>{element.addEventListener("click",(e)=>{e.preventDefault();});});button_menu.addEventListener("click",()=>{header_nav.classList.toggle("page-header__nav_active");overlay.classList.toggle("page-overlay_active");button_menu.classList.toggle("button-menu_active");page_header.classList.toggle("page-header_active")});document.body.addEventListener("click",(e)=>{if(e.target.closest(".page-overlay")&&header_nav.classList.contains("page-header__nav_active")){header_nav.classList.remove("page-header__nav_active");overlay.classList.remove("page-overlay_active");button_menu.classList.remove("button-menu_active");page_header.classList.remove("page-header_active")};if(e.target.closest(".page-overlay")&&search_wrapper.classList.contains("page-search_active")){console.log(true);search_wrapper.classList.remove("page-search_active");search_icon.classList.remove("page-search__icon_active");overlay.classList.remove("page-overlay_active");search_wrapper.classList.remove("page-search_active");search_button.classList.remove("page-search__button_active");page_tel.classList.remove("page-header__tel_active");};if(e.target.closest(".page-overlay")&&page_filter.classList.contains("page-filter_active")){overlay.classList.remove("page-overlay_active");page_filter.classList.remove("page-filter_active");}});window.addEventListener("resize",()=>{if(header_nav.classList.contains("page-header__nav_active")&&window.innerWidth>960){overlay.classList.remove("page-overlay_active");page_header.classList.remove("page-header_active")}
if(header_nav.classList.contains("page-header__nav_active")&&window.innerWidth<960){overlay.classList.add("page-overlay_active");page_header.classList.add("page-header_active")}
if(window.innerWidth<960&&window.innerWidth>640&&search_wrapper.classList.contains("page-search_active")){page_tel.classList.add("page-header__tel_active");}
if(page_filter){if(window.innerWidth>1280&&page_filter.classList.contains("page-filter_active")){page_filter.classList.remove("page-filter_active");overlay.classList.remove("page-overlay_active");}}});catalog_item_headers.forEach(element=>{element.addEventListener("click",()=>{if(element.nextSibling.classList.contains("catalog-item__list_active")){element.nextSibling.classList.remove("catalog-item__list_active");element.classList.remove("catalog-item__header_active");return 0;}
catalog_item_headers.forEach(item=>{item.nextSibling.classList.remove("catalog-item__list_active");element.classList.remove("catalog-item__header_active");});element.nextSibling.classList.add("catalog-item__list_active");element.classList.add("catalog-item__header_active");});});if(button_close){button_close.addEventListener("click",()=>{cookie_info.style.display="none";});}
button_catalog.addEventListener("click",function(){toggleCatalog();});overlay.addEventListener("click",function(){if(catalog_menu.classList.contains("catalog-menu_active")){toggleCatalog();};});function toggleCatalog(){button_catalog.classList.toggle("button-catalog_active");overlay.classList.toggle("page-overlay_active");catalog_menu.classList.toggle("catalog-menu_active");}
search.addEventListener("focus",function(){search_icon.classList.add("page-search__icon_active");overlay.classList.add("page-overlay_active");search_wrapper.classList.add("page-search_active");search_button.classList.add("page-search__button_active");if(window.innerWidth<960&&window.innerWidth>640){page_tel.classList.add("page-header__tel_active");}});search_icon.addEventListener("click",(e)=>{e.preventDefault();if(search_icon.classList.contains("page-search__icon_active")){search_wrapper.classList.remove("page-header_active");search_icon.classList.remove("page-search__icon_active");overlay.classList.remove("page-overlay_active");search_wrapper.classList.remove("page-search_active");search_button.classList.remove("page-search__button_active");page_tel.classList.remove("page-header__tel_active");}else{if(window.innerWidth<640){search_wrapper.classList.add("page-header_active");search.focus();search_icon.classList.add("page-search__icon_active");overlay.classList.add("page-overlay_active");search_wrapper.classList.add("page-search_active");search_button.classList.add("page-search__button_active");}}});window.addEventListener("load",()=>{});