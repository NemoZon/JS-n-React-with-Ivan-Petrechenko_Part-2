'use strict';

document.addEventListener('DOMContentLoaded',()=>{
    let tabheaderBtns = document.querySelector("tabheader__items");
    function tabheaderToggle(){
        tabheaderBtns.addEventListener('click',(e)=>{
            if (e.target && e.target.matches("tabheader__item")){
                console.dir(e.target);
            }
        });
    }
});