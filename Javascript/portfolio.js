document.addEventListener('DOMContentLoaded', () => {
    nav();
    headerHide();
});

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

    const homeBtn = document.querySelector('.leftheader');
    homeBtn.addEventListener('click', ()=>{
        nav.classList.remove('show');
    });

    const mainBody = document.querySelector('.center');
    mainBody.addEventListener('click', ()=>{
        nav.classList.remove('show');
    });
};
// nav();

function headerHide() {
    const doc = document.documentElement;
    const w = window;
    const header = document.getElementById('site-header');

    let prevScroll = w.scrollY || doc.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;

    const checkScroll = ()=>{
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            direction = 2;
        } else {
            direction = 1;
        }
        if(direction !== prevDirection) {
            toggleHeader(direction, curScroll)
        }
        prevScroll = curScroll;
    }
    const toggleHeader = (direction, curScroll) => {
        if (direction === 2 && curScroll > 111) {
            header.classList.add('hide');
            prevDirection = direction;
        } else if(direction === 1){
            header.classList.remove('hide');
            prevDirection = direction
        }
    }
    w.addEventListener('scroll', checkScroll);
}

const resumeTabs = document.querySelectorAll('.tablist-item');
const resumePanels = document.querySelectorAll('.tab-panel');

for(let i = 0; i < resumeTabs.length; i++) {
    let tab = resumeTabs[i];
    let panel = resumePanels[i];
    tab.addEventListener('click', function(){
        openPanel(`${tab.id}`, `${panel.id}`);
    });
};

function openPanel(tabName, panelName) {
    for (let i = 0; i < resumePanels.length; i++) {
      resumePanels[i].style.display = "none";
    }
    for (let i = 0; i < resumeTabs.length; i++) {
        let tab = resumeTabs[i];
        tab.className = tab.className.replace(" active", "");
    }
    document.getElementById(panelName).style.display = "block";
    document.getElementById(tabName).className += " active";
};

document.getElementById("tab-1").click();

const swiper = new Swiper('.swiper', {
    speed: 800,
    effect: 'coverflow',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
        },

    pagination: {
        el: '.swiper-pagination',
      },
});