


class Multiselect {
    constructor(multiselect,dataselect,add,remove) {
        this.object = document.querySelector(multiselect);
        
        if(this.object) {
            this.data = dataselect;
            this.name = multiselect;
            this.add = add;
            this.remove = remove;

            this.object_complite = this.object.querySelector(".multi-select__complite");
            this.input = this.object.querySelector(".multi-select__input");
            this.complite = this.object.querySelector(".multi-select__complite");
            this.object_added = this.object.querySelector(".multi-select__added-list");
            this.open = false;
            this.init();
        }
    }
    init() {
        this.initAppend();
        this.addHandlerOnClick();
        
        this.setHandlerOnInput();

    }
    setHandlerOnInput ()  {
        this.input.addEventListener("input", (e) => {
            let text = this.input.value;
            this.object_complite.innerHTML = "";
            if(text.length == 0) {
                this.initAppend();
                this.addHandlerOnClick();
            } else {
                let finded_items = [];
                this.data.all.forEach(item => {
                    if(item.toLowerCase().indexOf(text.toLowerCase()) !== -1 && finded_items.length < 3) {
                        finded_items.push(item);
                    }
                });
                finded_items.forEach(element => {
                    this.object_complite.innerHTML += `<div class="multi-select__complite-item">${element}</div>`
                });
                this.addHandlerOnClick();
            }
            
        });
    }
    addHandlerOnClick() {
        let complite_items = this.complite.querySelectorAll(".multi-select__complite-item");
        complite_items.forEach(element => {
            element.addEventListener("click", (e) => {
                
                if(!(this.equalItemsAdded(element))) {
                    this.object_added.innerHTML += `
                        <span class="multi-select__added">
                        <span class="multi-select__text">${element.innerHTML}</span>
                            <svg>
                                <use xlink:href="img/svg/sprite.svg#close"></use>
                            </svg>
                        </span>
                    `;
                    let addeds_items = this.object.querySelectorAll(".multi-select__added");

                    addeds_items.forEach(element => {
                        element.querySelector("svg").addEventListener("click", (event) => {
                            this.remove(element.closest(".filter-block").querySelector(".filter-block__name"),element.querySelector(".multi-select__text"));
                            this.object_added.removeChild(event.target.closest(".multi-select__added"));
                            
    
                        }); 
                    });
                    this.add(element.closest(".filter-block").querySelector(".filter-block__name"),element);
                }
                          
            });
        });
    }
    equalItemsAdded(element) {
        let allItems = this.object_added.querySelectorAll(".multi-select__added");
        let founded = false;
        allItems.forEach(item => {
            if(item.querySelector(".multi-select__text").innerHTML == element.textContent) {
                founded = true;
            } 
        });
        return founded;
    }
    initAppend() {
        for (let i = 0; i < 3; i++) {
            let populat_text = this.data.all[i];
            this.object_complite.innerHTML += `<div class="multi-select__complite-item">${populat_text}</div>`;
           
         }
        
    }
}


let data_oem = {
    all: [
        "JIS K 2234",
        "TL-774",
        "VW TL-774D (G12)",
        "VW TL-774C (G11)",
        "MAN 324 Type SN",
    ]
}







