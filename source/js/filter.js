
function getJSON(url,callback, bool) {
    var xml;
    if(window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xml.open("GET", url, bool);
    xml.responseType = "json";
    xml.onreadystatechange = function () {
        if(xml.status == 200) {
            if(xml.readyState == 4) {
                callback(xml.response);
            }
        } else {
            console.log(xml.status);
        }
    }
    xml.send();
};

class Filter {
    constructor() {
        this.data = {
            "марка" : [],
            "тип": [],
            "цвет": [],
            "объем": [],
            "спецификация oem": []
        }
        this.checkboxes = document.querySelectorAll(".page-filter .checkbox__input");
        this.filter_list = document.querySelector(".filters__list");
        this.multi_added = document.querySelector(".multi-select__added-list");
        this.products;
        if(this.filter_list) {
            this.reset_button = this.filter_list.querySelector(".filter__item-reset");
            this.init();
        }
        
    }
    init() {
        let notification = document.querySelector(".cart-notificiation");
        let filterSelect = new Select(".product__select-sort", (data) => {
            this.sortProducts(data);
        });
        let change_view = document.querySelectorAll(".sort-view__item");
        let products_list = document.querySelector(".products__list");
        change_view.forEach(element => {
            element.addEventListener("click", (e) => {
                change_view.forEach(item => {
                   item.classList.remove("sort-view__item_active");
                });
                element.classList.add("sort-view__item_active");
                if(element.classList.contains("sort-view__table")) {
                    products_list.classList.add("products__list_table");
                } else {
                    products_list.classList.remove("products__list_table");
                }
            });
        });
        window.addEventListener("resize", (e) => {
            if(window.innerWidth < 960) {
                products_list.classList.remove("products__list_table");
            }
        });

        document.body.addEventListener("click", (e) => {
            if(!e.target.closest(".cart-notificiation") && !e.target.closest(".page-product__button") && notification.classList.contains("cart-notification_active")) {
                console.log(true);
                notification.classList.remove("cart-notification_active");
            }
        });


        this.checkboxes.forEach(element => {
            element.addEventListener("change", (e) => {
                if(element.checked) {
                    let category = element.closest(".filter-block").querySelector(".filter-block__name");
                    let type = element.closest(".checkbox").querySelector(".checkbox__title");
                    
                    let text = `
                    <li class="filters__item">
                        <span class="filters__key">${category.innerHTML}</span>
                        <span class="filters__value">${type.innerHTML}</span>
                        <svg>
                            <use xlink:href="img/svg/sprite.svg#close"></use>
                        </svg>
                    </li>
                    
                    `;
                    this.filter_list.insertAdjacentHTML("afterbegin", text);

                    
                    
                    this.data[category.innerHTML.trim().toLowerCase()].push(type.innerHTML);
                    this.onChange();
                    this.afterAdd(element,false);
                } else {
                    let category = element.closest(".filter-block").querySelector(".filter-block__name");
                    let type = element.closest(".checkbox").querySelector(".checkbox__title");
                    let items = this.filter_list.querySelectorAll(".filters__item");
                    

                    items.forEach(element => {
                        let el_category = element.querySelector(".filters__key");
                        let el_type = element.querySelector(".filters__value");
                        if(category && type && el_category && el_type) {
                            if(category.innerHTML == el_category.innerHTML && type.innerHTML == el_type.innerHTML) {
                                let index = this.data[category.innerHTML.trim().toLowerCase()].findIndex(item => item == type.innerHTML);
                                this.data[category.innerHTML.trim().toLowerCase()].splice(index, 1);
                                this.onChange();
                                this.filter_list.removeChild(element);
                            }
                        }
                    });
                }
            });
        });   
        this.reset_button.addEventListener("click", () => {
            this.checkboxes.forEach(element => {
                element.checked = false;
            });
            this.filter_list.querySelectorAll(".filters__item").forEach(element => {
                this.filter_list.removeChild(element);
            });
            for (const key in this.data) {
                this.data[key] = [];
            }
            this.onChange();
            this.multi_added.innerHTML = "";
        });
        window.addEventListener("load", () => {
            getJSON("../json/_products.json", (data) => {
                this.products = data;
                this.onChange();
            },true);
        });
    }
    afterAdd(checkbox = false,multiselect = false) {

        let item = this.filter_list.querySelectorAll(".filters__item")[0];
        let svg_item = item.querySelector("svg");



        if(svg_item) {
            svg_item.addEventListener("click", (e) => {
                
                let category = item.closest(".filters__item").querySelector(".filters__key").innerHTML;
                let type = item.closest(".filters__item").querySelector(".filters__value").innerHTML;

                
                this.filter_list.removeChild(svg_item.closest(".filters__item"));

                

                if(checkbox) {
                    this.checkboxes.forEach(el => {
                        let item_category = el.closest(".filter-block").querySelector(".filter-block__name").innerHTML;
                        let item_type =  el.closest(".checkbox").querySelector(".checkbox__title").innerHTML;
    
                        if(category == item_category && type == item_type) {
                            checkbox.checked = false;
                            let index = this.data[category.trim().toLowerCase()].findIndex(i => i == type);
                            this.data[category.trim().toLowerCase()].splice(index, 1);
                            this.onChange();
                        }
                        
                    });
                }
                if(multiselect) {
                    this.multi_added.querySelectorAll(".multi-select__added").forEach(element => {
                        let element_type = element.querySelector(".multi-select__text").innerHTML;
                        if(element_type == type) {
                            this.multi_added.removeChild(element);
                        }
                    });
                }
            });
        }
    }
    addItem(category,type) {
        let text = `
            <li class="filters__item">
                <span class="filters__key">${category.innerHTML}</span>
                <span class="filters__value">${type.innerHTML}</span>
                <svg>
                    <use xlink:href="img/svg/sprite.svg#close"></use>
                </svg>
            </li>
            
            `;
            this.filter_list.insertAdjacentHTML("afterbegin", text);

            
            this.afterAdd(false,true);
            this.data[category.innerHTML.trim().toLowerCase()].push(type.innerHTML);
            this.onChange();
    }
    removeItem(category,type) {
        this.filter_list.querySelectorAll(".filters__item").forEach(element => {
            let el_category = element.querySelector(".filters__key").innerHTML;
            let el_type = element.querySelector(".filters__value").innerHTML;

            if(category.innerHTML == el_category && type.innerHTML == el_type) {
                this.filter_list.removeChild(element);
            }
        });
    }
    changeMulti(category,type) {
        this.addItem(category,type);
    }
    drawProducts(products) {
        let notification = document.querySelector(".cart-notificiation");
        let products_node = document.querySelector(".products__list");
        products_node.innerHTML = "";
        products.forEach(product => {
            let html = `
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
            `;
            products_node.innerHTML += html;
        });
        let buttons = document.querySelectorAll(".page-product");
        

        buttons.forEach(element => {
            element.addEventListener("click", (e) => {

                let title = element.querySelector(".page-product__title").textContent.split(" ");
                let img = element.querySelector(".page-product__img").getAttribute("src");
                let specs = element.querySelectorAll(".spec-product__item");
                let price = element.querySelector(".spec-product__item_price .spec-product__value").innerHTML.replace("₽","");
                let info = "";
                let count = 1;
                
                let summa_all = +price;

                if(localStorage.summa) {
                    summa_all = +summa_all + +localStorage.summa;
                }
                
                localStorage.summa = summa_all;
                
                
                title.forEach((item,index) => {
                    if(index > 1) {
                        info += `${item} `;
                    }
                });
                specs.forEach(item => {
                    let value = item.querySelector(".spec-product__value");
                    if(!value.closest(".spec-product__item_price")) {
                        info += `${item.querySelector(".spec-product__value").innerHTML} `;
                    }
                });
                

                let product = {
                    "title": title,
                    "image": img,
                    "specs": info,
                    "price": price,
                    "count": 1
                }
                let products;
                let find = false;

                if(localStorage.products) {

                    products = JSON.parse(localStorage.products);
                } else {
                    products = [];
                }
                products.forEach(element => {
                    if(product.specs == element.specs && product.image == element.image && product.price == element.price) {
                        element.count++;
                        count = element.count;
                        find = true;
                    }
                });
                if(!find) {
                    products.push(product);
                }

                localStorage.products = JSON.stringify(products);

                notification.innerHTML = `
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
                `;
                if(!localStorage.show) {
                    notification.innerHTML += `<div class="cart-notification__bottom">
                    <svg class="cart-notification__icon">
                        <use xlink:href="img/svg/sprite.svg#info"></use>
                    </svg>
                    <p class="cart-notification__warning">Рекомендуем оформлять заказы как можно быстрее: даже если вы будете заказывать товары по одному - это никак не отразится на бесплатной доставке, но зато вас никто не опередит и цена не успеет измениться.</p>
                    <button class="cart-notification__hide-warning button button_accent">Больше не показывать</button>
                    </div>`;
                }
                notification.classList.add("cart-notification_active");
                let notification_close = notification.querySelector(".cart-notification__close");

                notification_close.addEventListener("click", (e) => {
                    notification.classList.remove("cart-notification_active");
                });
                let close_warning = notification.querySelector(".cart-notification__hide-warning");

                if(close_warning) {
                    close_warning.addEventListener("click", (e) => {
                        notification.querySelector(".cart-notification__bottom").style.display = "none"
                        localStorage.show = "false";
                    });
                }
            }); 
        });
    }
    onChange() {
        let products_node = document.querySelector(".products__list");
        let products = this.products;
        let data = this.data;

        this.filtered_products = products.slice();


        products_node.innerHTML = "";


        products.forEach((product,index) => {
        
            for (const key in product) {
                if(data[key] && data[key].length > 0) {


                    let bool = data[key].find(item => {
                        return item.trim().toLowerCase() == product[key].trim().toLowerCase();
                    });

                    if(bool == undefined) {

                        delete this.filtered_products[index];
                    }
                }
            }
        });
        this.drawProducts(this.filtered_products);
    }
    sortProducts(data) {
        let products = this.filtered_products;
        console.log(products);
        if(data == "По наименованию") {
            products.sort((first,second) => {
                if( first["title"] > second["title"]) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else if(data == "По популярности") {
            products.sort((first,second) => {
                if( first > second) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else if(data == "По бренду") {
            products.sort((first,second) => {
                if(first["марка"] > second["марка"]) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }
        this.drawProducts(products);
        console.log(products);
    }
}

let filter = new Filter();

let multisel = new Multiselect(".filter-block__multi-select",data_oem,function(category,type) {
    filter.addItem(category,type);
},function(category,type) {
    filter.removeItem(category,type);
});

