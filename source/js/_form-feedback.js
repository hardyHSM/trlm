
(function () {
    
let button_submit = document.querySelector(".feedback-form__button");

let name = document.querySelector(".page-input-icon_name .page-input-icon__input");
let tel = document.querySelector(".page-input-icon_tel .page-input-icon__input");
let mail = document.querySelector(".page-input-icon_mail .page-input-icon__input");
let area = document.querySelector(".page-input-icon_area .page-input-icon__input");
let inputs = document.querySelectorAll(".page-input-icon .page-input-icon__input");




if(inputs) {
    inputs.forEach(element => {
        element.addEventListener("focus", (e) => {
            element.closest(".page-input-icon").classList.add("page-input-icon_focus");
        });
        element.addEventListener("blur", (e) => {
            element.closest(".page-input-icon").classList.remove("page-input-icon_focus");
        });
    });
}


if(name) {
    console.log(name);
    name.addEventListener("input", (e) => {
        let input = e.target;
        let regName = /\d+/;
    
        if(input.value.length > 1 && input.value.match(regName) == null) {
            input.closest(".page-input-icon").classList.add("page-input-icon_active");
            input.closest(".page-input-icon").classList.remove("page-input-icon_error");
        } else {
            input.closest(".page-input-icon").classList.remove("page-input-icon_active");
        }
    });
}






if(tel) {
    IMask(tel, {
        mask: '+{7} (000) 000-00-00',
        lazy: false,  // make placeholder always visible
        placeholderChar: '_'     // defaults to '_'
    });
    tel.addEventListener("input", (e) => {
        let input = e.target;
    
        if(input.value.indexOf("_") == -1) {
            input.closest(".page-input-icon").classList.add("page-input-icon_active");
            input.closest(".page-input-icon").classList.remove("page-input-icon_error");
    
        } else {
            input.closest(".page-input-icon").classList.remove("page-input-icon_active");
        }
    });
    
}

if(mail) {
    mail.addEventListener("input", (e) => {
        let input = e.target;
        const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    
        if(regEmail.test(input.value)) {
            console.log(true);
            input.closest(".page-input-icon").classList.add("page-input-icon_active");
            input.closest(".page-input-icon").classList.remove("page-input-icon_error");
        } else {
            input.closest(".page-input-icon").classList.remove("page-input-icon_active");
        }
    
    });
    
}

if(area) {
    area.addEventListener("input", (e) => {
        let input = e.target;
    
        if(input.value.length > 5) {
            input.closest(".page-input-icon").classList.add("page-input-icon_active");
            input.closest(".page-input-icon").classList.remove("page-input-icon_error");
        } else {
            input.closest(".page-input-icon").classList.remove("page-input-icon_active");
        }
    
    });
}



if(button_submit) {
    button_submit.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(0);
        if(
            name.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
            tel.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
            mail.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
            area.closest(".page-input-icon").classList.contains("page-input-icon_active")
        ) {
           window.location.reload();
        } else {
            let form_inputs = document.querySelectorAll(".feedback-form .page-input-icon");
            form_inputs.forEach(element => {
                if(!(element.classList.contains("page-input-icon_active"))) {
                    element.classList.add("page-input-icon_error");
                }
            });
        }
    });
}
}());