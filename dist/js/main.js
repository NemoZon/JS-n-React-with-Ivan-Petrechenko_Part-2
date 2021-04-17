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
    let deadline = '2021-04-18';

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

    btnsModal.forEach(btn=>{
        btn.addEventListener('click',()=>{
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            
        });
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
});