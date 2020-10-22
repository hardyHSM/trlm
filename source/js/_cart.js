class Cart {
    constructor(cart) {
        this.cart = cart;
        if(this.cart) {
            this.output = cart.querySelector(".cart-table");
        this.total = cart.querySelector(".section-cart__total-price");
        this.init();
        }
    }
    init() {
        this.getItems();
        document.querySelector(".promo__button").addEventListener("click", (e) => {
            if(document.querySelector(".promo__input").value.length > 3) {
                document.querySelector(".promo__right").classList.add("promo__right_active");

            } else {
                document.querySelector(".promo__right").classList.remove("promo__right_active");
            }
            this.changeSelected();
        });
        this.cart.querySelectorAll(".number-select__delete").forEach(item => {
            item.addEventListener("click", (e) => {
                item.closest(".product-table").querySelector(".number-select__value").innerHTML = 0;
                this.onCountChange(item.closest(".product-table").querySelector(".number-select__left-button"));
            });
        });
        this.numberCheckboxes();
    }
    numberCheckboxes() {
        let number_select_buttons = document.querySelectorAll(".number-select__button");


        number_select_buttons.forEach(element => {
            element.addEventListener("click", () => {
                let select = element.closest(".number-select");
                let select_value = +select.querySelector(".number-select__value").innerHTML;
                if(element.innerHTML.trim() == "+") {
                    select.querySelector(".number-select__value").innerHTML = select_value + 1;
                } else {
                    if(select_value !== 0) {
                        select.querySelector(".number-select__value").innerHTML = select_value - 1;
                    }
                }
                this.onCountChange(element);
            });
        });
    }
    onCountChange(element) {
        let product = element.closest(".product-table");
        product.querySelector(".product-table__summa").innerHTML = `${parseInt(product.querySelector(".product-table__price").innerHTML) * parseInt(product.querySelector(".number-select__value").innerHTML)} ₽`;
        this.changeSelected();


        let products_data = JSON.parse(localStorage.products);
        let index = products_data.findIndex(item => {
            if(parseInt(item.price.trim()) == parseInt(product.querySelector(".product-table__price").innerHTML.trim().replace("₽","")) 
            && item.specs == product.querySelector(".product-table__descr").innerHTML) {
                return item;
            }
        });
        products_data[index].count = parseInt(product.querySelector(".number-select__value").innerHTML);
        localStorage.products = JSON.stringify(products_data);
    }
    getItems() {
        let products = JSON.parse(localStorage.products);
        products.forEach(element => {
            this.drawItem(element);
        });
    }
    drawItem(item) {
        let node = `
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
        `;
        this.output.innerHTML += node;
        this.output.querySelectorAll(".checkbox__input").forEach(checkbox => {
            this.changeSelected();
        });
        let checkboxes = this.cart.querySelectorAll(".checkbox__input");
        checkboxes.forEach(item => {
            item.addEventListener("change", (e) => {
                this.changeSelected();
            });
        });
        this.changeSelected();
    }
    changeSelected() {
        let total = 0;
        this.output.querySelectorAll(".product-table").forEach(element => {
            let checkbox = element.querySelector(".checkbox__input");
            if(checkbox.checked) {
                let price = parseInt(element.querySelector(".product-table__summa").innerHTML);
                total += price;
            }
        });
        document.querySelector(".section-cart__total-price").innerHTML = `${total} ₽`;
        if(document.querySelector(".promo__right").classList.contains("promo__right_active")) {
            if(total > 0) {
                document.querySelector(".arrange__price").innerHTML = `${total + parseInt(document.querySelector(".promo__money").innerHTML)} ₽`;
            } else {
                document.querySelector(".arrange__price").innerHTML = `0 ₽`;
            }
        } else {
            document.querySelector(".arrange__price").innerHTML = `${total} ₽`;
        }
    

        let summa = 0;

        this.output.querySelectorAll(".product-table").forEach(element => {
            let checkbox = element.querySelector(".checkbox__input");
                let price = parseInt(element.querySelector(".product-table__summa").innerHTML);
                summa += price;
        });


        localStorage.summa = summa;
        
    }
}



let cart_node = document.querySelector(".section-cart__table");

let cart = new Cart(cart_node)




