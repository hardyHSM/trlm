

class PopUp {

    constructor() {
        this.popup = document.querySelector(".page-popup");
        this.sign_button = document.querySelector(".user-nav__item_sign");
        this.close_button = document.querySelector("[data-close]");
        this.overlay = document.querySelector(".page-overlay");
        this.tel_input = document.querySelector('.page-popup__input_tel');
        this.email_input = document.querySelector(".page-popup__input_email");
        this.pass_input = document.querySelector(".page-popup__input_pass");
        this.button_to_email = document.querySelector(".page-popup__link_email");
        this.button_to_tel = document.querySelector(".page-popup__link_tel");
        this.block_tel = document.querySelector(".page-popup__block_tel");
        this.block_email = document.querySelector(".page-popup__block_email");
        this.submit = document.querySelector(".page-popup__button");
        this.errors = document.querySelector(".page-popup__errors");
        this.forget_pass = document.querySelector(".page-popup__link-forget");
        this.rememb_pass = document.querySelector(".page-popup__link-remember");
        this.container_sign = document.querySelector(".page-popup__container_sign");
        this.container_forget = document.querySelector(".page-popup__container_forget");
        this.button_pass = document.querySelector(".page-popup__button-pass");
        this.validateBool = true;
        this.tel = true;
        this.init();
    }
    init() {

        let phoneMask = IMask(this.tel_input, {
            mask: '+{7} (000) 000-00-00',
            lazy: false,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
          });
        
  
        this.sign_button.addEventListener("click", (e) => {
            e.preventDefault();
            this.show();
        });
        this.close_button.addEventListener("click", (e) => {
            e.preventDefault();
            this.remove();
        });
        document.body.addEventListener("mousedown", (e) => {
            if(!(e.target.closest(".page-popup")) && this.popup.classList.contains("page-popup_active")) {
                this.remove();
            }
        });
        this.button_to_email.addEventListener("click", (e) => {
            e.preventDefault();
            this.block_tel.classList.remove("page-popup__block_active");
            this.block_email.classList.add("page-popup__block_active");
            this.tel = false;
        });
        this.button_to_tel.addEventListener("click", (e) => {
            e.preventDefault();
            this.block_tel.classList.add("page-popup__block_active");
            this.block_email.classList.remove("page-popup__block_active");
            this.tel = true;
        });
        this.submit.addEventListener("click",(e) => {
            e.preventDefault();
            this.validation();
        });

        this.forget_pass.addEventListener("click", (e) => {
            e.preventDefault();
            this.container_sign.classList.remove("page-popup__container_active");
            this.container_forget.classList.add("page-popup__container_active");
        });
        this.rememb_pass.addEventListener("click", (e) => {
            e.preventDefault();
            this.container_sign.classList.add("page-popup__container_active");
            this.container_forget.classList.remove("page-popup__container_active");
        });
        this.button_pass.addEventListener("click", (e) => {
            e.preventDefault();
            this.validation_forgetpass();
        }); 
    }
    show() {
        this.popup.classList.add("page-popup_active");
        this.overlay.classList.add("page-overlay_active");
    }
    remove() {
        this.popup.classList.remove("page-popup_active");
        this.overlay.classList.remove("page-overlay_active");
    }
    validation() {
        this.errors.innerHTML = "";
        if(this.tel) {
            if(!(this.tel_input.value.indexOf("_") == -1)) {
                this.validateBool = false;
                this.errors.innerHTML += `<div class="page-popup__error message message_error">
                Некорректный ввод телефона. Повторите попытку.
                </div>`;
            }
        } else {
            const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if(regEmail.test(this.email_input.value)) {
                this.validateBool = true;
            } else {
                this.errors.innerHTML += `<div class="page-popup__error message message_error">
                Некорректный ввод почты. Повторите попытку.
                </div>`;
                this.validateBool = false;
            }
        }
        if(!(this.pass_input.value.length >= 6)) {
            this.validateBool = false;
            this.errors.innerHTML += `<div class="page-popup__error message message_error">
                Некорректный ввод пароля. Пароль должен иметь как минимум 6 символов.
            </div>`;
        }

        if(this.validateBool) {
            console.log(true);
            window.location.reload();
        }
        
    }
    validation_forgetpass() {
        this.container_forget.querySelector(".page-popup__errors").innerHTML = "";
        const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        const value = this.container_forget.querySelector(".page-popup__input_email").value;
            if(regEmail.test(value)) {
                this.container_forget.querySelector(".page-popup__input_email").style.display = "none";
                this.container_forget.querySelector(".page-popup__link-remember").style.display = "none";
                this.container_forget.querySelector(".page-popup__button-pass").innerHTML = "Закрыть окно";
               
                


                this.container_forget.querySelector(".page-popup__descr").innerHTML
                 = `Ссылка для смены пароля отправлена на почту <b>${value.substr(0,4)}***${value.substr(value.search("@"))}</b>`
                 this.button_pass.addEventListener("click",() => {
                     this.remove();
                     window.location.reload();
                 });
            } else {
                this.container_forget.querySelector(".page-popup__errors").innerHTML += `<div class="page-popup__error message message_error">
                Некорректный ввод почты. Повторите попытку.
                </div>`;
        }
    }
}


let popup = new PopUp();

