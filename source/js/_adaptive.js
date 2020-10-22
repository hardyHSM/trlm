
appendElements(".page-header__nav", ".page-header__tel", 2048,"afterend");
appendElements(".page-header__nav",".page-header__content", 1280,"afterend");


appendElements(".page-header__search-wrapper", ".page-header__row_last", 2048,"beforeend");
appendElements(".page-header__search-wrapper",".page-header__bottom > .page-content", 960,"afterbegin");
appendElements(".page-header__search-wrapper",".page-header__row-top", 640,"afterbegin");

appendElements(".button-catalog",".page-header__column", 2048,"beforeend");
appendElements(".button-catalog",".page-header__bottom > .page-content", 960,"afterbegin");


appendElements(".page-header__tel",".page-header__row-top", 2048,"afterbegin");
appendElements(".page-header__tel",".page-header__bottom > .page-content", 960,"beforeend");

appendElements(".page-header__adress", ".page-header__column", 2048,"afterbegin");
appendElements(".page-header__adress",".page-header__bottom > .page-content", 640,"afterbegin");








function appendElements(what, where,breakpoint, pos) {
    window.addEventListener("resize", () => {
        let element = document.querySelector(what);
        let where_element = document.querySelector(where);

    
        if(window.innerWidth  < breakpoint) {
            where_element.insertAdjacentElement(pos, element);
        }
        
    });
    window.addEventListener("load", () => {
        let element = document.querySelector(what);
        let where_element = document.querySelector(where);

        if(window.innerWidth  < breakpoint) {

            where_element.insertAdjacentElement(pos, element);
        }0
    });
}