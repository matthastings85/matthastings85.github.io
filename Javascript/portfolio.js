document.addEventListener('DOMContentLoaded', nav);

function nav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('header');
    burger.addEventListener('click', ()=>{
        nav.classList.toggle('show');
    });
    
    const navMenu = document.querySelector('.rightheader');
    navMenu.addEventListener('click', ()=>{
        nav.classList.remove('show');
    });

    const mainBody = document.querySelector('.center');
    mainBody.addEventListener('click', ()=>{
        nav.classList.remove('show');
    });
};

function openPanel(evt, panelName) {
    var i, tabPanel, tablistItem;
    tabPanel = document.getElementsByClassName("tab-panel");
    for (i = 0; i < tabPanel.length; i++) {
      tabPanel[i].style.display = "none";
    }
    tablistItem = document.getElementsByClassName("tablist-item");
    for (i = 0; i < tablistItem.length; i++) {
      tablistItem[i].className = tablistItem[i].className.replace(" active", "");
    }
    document.getElementById(panelName).style.display = "block";
    evt.currentTarget.className += " active";
};

document.getElementById("tab-1").click();

const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 100,
    effect: 'cards',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
        },

    pagination: {
        el: '.swiper-pagination',
      },
});