'use strict';

document.addEventListener('DOMContentLoaded',()=>{
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
});