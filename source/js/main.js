let mySwiper = new Swiper('.intro-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


let button_catalog = document.querySelector(".button-catalog");
let catalog_menu = document.querySelector(".catalog-menu");

let overlay = document.querySelector(".page-overlay");

let search = document.querySelector(".page-search__input");
let search_icon = document.querySelector(".page-search__icon");
let search_wrapper = document.querySelector(".page-search");
let search_button = document.querySelector(".page-search__button");

let button_close = document.querySelector(".cookie-info__button");
let cookie_info = document.querySelector(".cookie-info");

let button_menu = document.querySelector(".button-menu");
let header_nav = document.querySelector(".page-header__nav");
let page_header = document.querySelector(".page-header");
let links = document.querySelectorAll(".catalog-item__link-all");
let page_tel = document.querySelector(".page-header__tel");

let catalog_item_headers = document.querySelectorAll(".catalog-item__header");

let button_filter = document.querySelector(".button-filter");
let page_filter = document.querySelector(".page-filter");
let filter_close = document.querySelector(".page-filter__close");



if(filter_close) {
    filter_close.addEventListener("click", () => {
        overlay.classList.remove("page-overlay_active");
        page_filter.classList.remove("page-filter_active");
    });
}

if(button_filter) {
    button_filter.addEventListener("click",() => {
        page_filter.classList.add("page-filter_active");
        overlay.classList.add("page-overlay_active");
    });
}


links.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

button_menu.addEventListener("click", () => {
    header_nav.classList.toggle("page-header__nav_active");
    overlay.classList.toggle("page-overlay_active");
    button_menu.classList.toggle("button-menu_active");
    page_header.classList.toggle("page-header_active")
});

document.body.addEventListener("click", (e) => {
    if(e.target.closest(".page-overlay") && header_nav.classList.contains("page-header__nav_active")) {
        header_nav.classList.remove("page-header__nav_active");
        overlay.classList.remove("page-overlay_active");
        button_menu.classList.remove("button-menu_active");
        page_header.classList.remove("page-header_active")
    };
    if(e.target.closest(".page-overlay") && search_wrapper.classList.contains("page-search_active")) {
        console.log(true);
        search_wrapper.classList.remove("page-search_active");
        search_icon.classList.remove("page-search__icon_active");
        overlay.classList.remove("page-overlay_active");
        search_wrapper.classList.remove("page-search_active");
        search_button.classList.remove("page-search__button_active");
        page_tel.classList.remove("page-header__tel_active");
    };
    if(e.target.closest(".page-overlay") && page_filter.classList.contains("page-filter_active")) {
        overlay.classList.remove("page-overlay_active");
        page_filter.classList.remove("page-filter_active");
    }
});

window.addEventListener("resize", () => {
    if(header_nav.classList.contains("page-header__nav_active") && window.innerWidth > 960) {
        overlay.classList.remove("page-overlay_active");
        page_header.classList.remove("page-header_active")
    }
    if(header_nav.classList.contains("page-header__nav_active") && window.innerWidth < 960) {
        overlay.classList.add("page-overlay_active");
        page_header.classList.add("page-header_active")
    }
    if(window.innerWidth < 960 && window.innerWidth > 640 && search_wrapper.classList.contains("page-search_active")) {
        page_tel.classList.add("page-header__tel_active");
    }
    if(page_filter) {
        if(window.innerWidth > 1280 && page_filter.classList.contains("page-filter_active")) {
            page_filter.classList.remove("page-filter_active");
            overlay.classList.remove("page-overlay_active");
        }
    }
});


catalog_item_headers.forEach(element => {
    element.addEventListener("click", () => {
        if (element.nextSibling.classList.contains("catalog-item__list_active")) {
            element.nextSibling.classList.remove("catalog-item__list_active");
            element.classList.remove("catalog-item__header_active");
            return 0;
        } 
        catalog_item_headers.forEach(item => {
            item.nextSibling.classList.remove("catalog-item__list_active");
            element.classList.remove("catalog-item__header_active");
        });
        element.nextSibling.classList.add("catalog-item__list_active");
        element.classList.add("catalog-item__header_active");
    });
});



if(button_close) {
    button_close.addEventListener("click", () => {
        cookie_info.style.display = "none";
    });
}

button_catalog.addEventListener("click", function () {
   toggleCatalog();
});

overlay.addEventListener("click",function () {
    if(catalog_menu.classList.contains("catalog-menu_active")) {
        toggleCatalog();
    };
});


function toggleCatalog() {
   button_catalog.classList.toggle("button-catalog_active");
   overlay.classList.toggle("page-overlay_active");
   catalog_menu.classList.toggle("catalog-menu_active");
}

search.addEventListener("focus", function () {
    search_icon.classList.add("page-search__icon_active");
    overlay.classList.add("page-overlay_active");
    search_wrapper.classList.add("page-search_active");
    search_button.classList.add("page-search__button_active");
    if(window.innerWidth < 960 && window.innerWidth > 640) {
        page_tel.classList.add("page-header__tel_active");
    }
});





search_icon.addEventListener("click", (e) => {
    e.preventDefault();
    if(search_icon.classList.contains("page-search__icon_active")) {
        search_wrapper.classList.remove("page-header_active");
        search_icon.classList.remove("page-search__icon_active");
        overlay.classList.remove("page-overlay_active");
        search_wrapper.classList.remove("page-search_active");
        search_button.classList.remove("page-search__button_active");
        page_tel.classList.remove("page-header__tel_active");
    } else {
        if(window.innerWidth < 640) {
            search_wrapper.classList.add("page-header_active");
            search.focus();
            search_icon.classList.add("page-search__icon_active");
            overlay.classList.add("page-overlay_active");
            search_wrapper.classList.add("page-search_active");
            search_button.classList.add("page-search__button_active");
        }
    }
});



window.addEventListener("load", () => {
    
});