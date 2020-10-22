class Select {
    constructor(selectNode, cb = false) {
        this.selectNode = selectNode;
        this.cb = cb;
        this.select = document.querySelector(selectNode);
        this.header = this.select.querySelector(".select__header");
        this.body = this.select.querySelector(".select__body");
        this.items = document.querySelectorAll(".select__item")
        this.init();
    }
    init() {
        this.select.addEventListener("click", (e) => {
            this.open();
        });
        document.body.addEventListener("click", (e) => {
            if(!(e.target.closest(this.selectNode))) {
                this.close();
            }
        });
        this.items.forEach(element => {
            element.addEventListener("click", () => {
                this.items.forEach(element => {
                    element.classList.remove("select__item_current");
                });
                element.classList.add("select__item_current");
                this.header.textContent = element.innerHTML;
                this.close();
                if(this.cb) {
                    this.cb(this.header.textContent);
                }
            });
        });
    }
    open() {
        this.select.classList.add("select_active");
    }
    close() {
        this.select.classList.remove("select_active");
    }
}




