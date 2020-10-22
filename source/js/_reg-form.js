
(function() {
    let button_submit = document.querySelector(".reg-form__submit");

    let name_input = document.querySelector(".reg-form .page-input-icon_name input");
    let family_input = document.querySelector(".reg-form .page-input-icon_family input");
    let tel_input = document.querySelector(".reg-form .page-input-icon_tel input");
    let mail_input = document.querySelector(".reg-form .page-input-icon_mail input");
    let pass_input = document.querySelector(".reg-form .page-input-count_pass input");
    let repass_input = document.querySelector(".reg-form .page-input-count_repass input");


    if(name_input) {
        name_input.addEventListener("input", e => {
            let input = e.target;

            let regName = /\d+/;
        
            if(input.value.length > 1 && input.value.match(regName) == null) {
                e.target.closest(".page-input-icon").classList.add("page-input-icon_active")
            }
        });
    }
    if(tel_input) {
        IMask(tel_input, {
            mask: '+{7} (000) 000-00-00',
            lazy: false,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
        });
        tel_input.addEventListener("input", (e) => {
            let input = e.target;
        
            if(input.value.indexOf("_") == -1) {
                input.closest(".page-input-icon").classList.add("page-input-icon_active");
                input.closest(".page-input-icon").classList.remove("page-input-icon_error");
        
            } else {
                input.closest(".page-input-icon").classList.remove("page-input-icon_active");
            }
        });
        
    }
    if(mail_input) {
        mail_input.addEventListener("input", (e) => {
            let input = e.target;
            const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        
            if(regEmail.test(input.value)) {
                input.closest(".page-input-icon").classList.add("page-input-icon_active");
                input.closest(".page-input-icon").classList.remove("page-input-icon_error");
            } else {
                input.closest(".page-input-icon").classList.remove("page-input-icon_active");
            }
        
        });
    }
    if(pass_input) {
        pass_input.addEventListener("input", (e) => {
            let input = e.target;
            let input_count = input.closest(".page-input-count").querySelector(".page-input-count__number-left");
            input_count.innerHTML = input.value.length;
            if(input.value.length >= 6) {
                input.closest(".page-input-count").classList.remove("page-input-count_error");
                input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: none");
                input.closest(".page-input-count").classList.add("page-input-count_active");


                if(repass_input.value.length >= 6 && pass_input.value == repass_input.value) {
                    repass_input.closest(".page-input-count").classList.remove("page-input-count_error");
                    repass_input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: none");
                    repass_input.closest(".page-input-count").classList.add("page-input-count_active");
                } else {
                    repass_input.closest(".page-input-count").classList.add("page-input-count_error");
                    repass_input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: block");
                    repass_input.closest(".page-input-count").classList.remove("page-input-count_active");
                }
            } else {
                input.closest(".page-input-count").classList.add("page-input-count_error");

             
                input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: block");
                input.closest(".page-input-count").classList.remove("page-input-count_active");
            }
        
        });
    }
    if(repass_input) {
        repass_input.addEventListener("input", (e) => {
            let input = e.target;
            let input_count = input.closest(".page-input-count").querySelector(".page-input-count__number-left");
            input_count.innerHTML = input.value.length;
            if(input.value.length > 6 && pass_input.value == repass_input.value) {
                input.closest(".page-input-count").classList.remove("page-input-count_error");
                input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: none");
                input.closest(".page-input-count").classList.add("page-input-count_active");
            } else {
                input.closest(".page-input-count").classList.add("page-input-count_error");
                input.closest(".reg-form__item").querySelector(".reg-form__undertext_error").setAttribute("style", "display: block");
                input.closest(".page-input-count").classList.remove("page-input-count_active");
            }
        });
    }

    if(button_submit) {
        button_submit.addEventListener("click", (e) => {
            e.preventDefault();
            if(
                name_input.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
                tel_input.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
                mail_input.closest(".page-input-icon").classList.contains("page-input-icon_active") &&
                !(pass_input.closest(".page-input-count").classList.contains("page-input-count_error")) &&
                !(repass_input.closest(".page-input-count").classList.contains("page-input-count_error"))
            ) {
                window.location.reload();
                console.log("read");
            } else {
                let form_inputs = document.querySelectorAll(".reg-form .page-input-icon");
                form_inputs.forEach(element => {
                    if(!(element.classList.contains("page-input-icon_active"))) {
                        element.classList.add("page-input-icon_error");
                    }
                });
                let pass_inputs = [pass_input,repass_input];

                pass_inputs.forEach(element => {
                    if(!(element.closest(".page-input-count").classList.contains("page-input-count_active"))) {
                        element.closest(".page-input-count").classList.add("page-input-count_error");
                        element.closest(".reg-form__item").querySelector(".reg-form__undertext_error").style.dispaly = "block";
                    };
                });
                
            }
        });
    }

}());