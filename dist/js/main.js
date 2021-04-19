'use strict';

document.addEventListener('DOMContentLoaded',()=>{
    //переключение табов в _preview
    let tabsWrapper = document.querySelector(".tabheader__items"),
        tabs = tabsWrapper.querySelectorAll(".tabheader__item"),
        tabcontents = document.querySelectorAll(".tabcontent");

    function tabClassToggle(){
        tabsWrapper.addEventListener('click',(e)=>{
            if (e.target && e.target.classList.contains("tabheader__item")){
                
                tabs.forEach((item, i)=>{
                    if (e.target == item){
                        hideTabContent();
                        showTabContent (i);
                    }
                });
            }
        });
    }

    function hideTabContent(){
        tabcontents.forEach((elem)=>{
            elem.style.display = 'none';
        });

        tabs.forEach((elem)=>{
            elem.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabcontents[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent ();
    tabClassToggle();

    // Создание таймера в _promotion
    let deadline = '2021-04-20';

    countdown(deadline);
    function countdown(endTime){
        let myDate = new Date().getTime()+(3*60*60*1000),//московское время
            dateOfDiscount = new Date(endTime).getTime(),
            msUntilEnd = dateOfDiscount - myDate,
            daysUntilEnd = Math.floor(msUntilEnd/(24*60*60*1000)),
            hoursUntilEnd = Math.floor(msUntilEnd/(1000*60*60)%24),
            minutesUntilEnd = Math.floor(msUntilEnd/(1000*60)%60),
            secondesUntilEnd =Math.floor(msUntilEnd/1000%60);
        return {
            'total': msUntilEnd,
            'days': daysUntilEnd,
            'hours': hoursUntilEnd,
            'minutes': minutesUntilEnd,
            'seconds': secondesUntilEnd
        };
    }
    function getZero(num){
        if(num>=0 && num<10){
            return ('0'+ num);
        } else{
            return num;
        }
    }
    showTimer(".timer .timer__block span",deadline);
    function showTimer(selector, endTime){
        let timerList = document.querySelectorAll(selector),
            timeInterval = setInterval(updateTimer,1000);
        updateTimer();

        function updateTimer(){
            let t = countdown(endTime);
            timerList[0].textContent = getZero(t.days);
            timerList[1].textContent = getZero(t.hours);
            timerList[2].textContent = getZero(t.minutes);
            timerList[3].textContent = getZero(t.seconds);
            if (t.total<=0 ){
                clearInterval(timeInterval);
                timerList[0].textContent = "00";
                timerList[1].textContent = "00";
                timerList[2].textContent = "00";
                timerList[3].textContent = "00";
            }

        }
    }

    //создание модального окна
    const modal = document.querySelector(".modal"),
        btnsModal = document.querySelectorAll("[data-modal]"),
        btnModalClose = document.querySelector(".modal__close");

    function modalClose(){
        modal.style.display = "none";
        document.body.style.overflow = "scroll";
    }
    function modalShow(){
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        // clearInterval(timeInterval);
    }

    btnsModal.forEach(btn=>{
        btn.addEventListener('click',modalShow);
    });

    btnModalClose.addEventListener('click',modalClose);

    modal.addEventListener('click',e=>{
        if (e.target == modal){
            modalClose();
        }
    });

    document.addEventListener('keydown',e=>{
        if (e.code === "Escape" && modal.style.display == "block"){
            modalClose();
        }
    });

    //появление модального окна, через определенное время
    // const timeInterval = setTimeout(modalShow, 10000);

    //появление модального окна, при прокрктке до конца страницы
    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight>=document.documentElement.scrollHeight){
            modalShow();
            window.removeEventListener("scroll",showModalByScroll);
        }
    }
    window.addEventListener("scroll",showModalByScroll);

    //Создаем таблички меню, с помощью классов
    class MenuCard{
        constructor(srcIMG, alt, subtitle, descr, price, parentSelector) {
            this.srcIMG = srcIMG;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = +this.price * this.transfer;
        }
        render(){

            const item = document.createElement("div");
            item.innerHTML = `
            <div>
                <img src=${this.srcIMG} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parentSelector.append(item);
            
        }
    }

    new MenuCard("img/tabs/post.jpg",
    "post",
    'Меню "Постное"', 
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 
    "18", 
    ".menu .container").render();
    
});