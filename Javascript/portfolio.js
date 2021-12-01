document.addEventListener('DOMContentLoaded', nav)

function nav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('header');
    burger.addEventListener('click', ()=>{
        nav.classList.toggle('show');
    })
    
    const navMenu = document.querySelector('.rightheader')
    navMenu.addEventListener('click', ()=>{
    nav.classList.toggle('show');
    })
    
    const mainBody = document.querySelector('.center')
    mainBody.addEventListener('click', ()=>{
    nav.classList.toggle('show');
    })
}

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
  }

document.getElementById("tab-1").click();


//   function openCity(evt, cityName) {
//     // Declare all variables
//     var i, tabcontent, tablinks;
  
//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
  
//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
  
//     // Show the current tab, and add an "active" class to the link that opened the tab
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }
// document.addEventListener("DOMContentLoaded", () => {
//     const tabs = document.querySelectorAll('[role="tab"]');
//     const tabList = document.querySelector('[role="tablist"]');
  
//     // Add a click event handler to each tab
//     tabs.forEach(tab => {
//       tab.addEventListener("click", changeTabs);
//     });
  
//     // Enable arrow navigation between tabs in the tab list
//     let tabFocus = 0;
  
//     tabList.addEventListener("keydown", e => {
//       // Move right
//       if (e.keyCode === 39 || e.keyCode === 37) {
//         tabs[tabFocus].setAttribute("tabindex", -1);
//         if (e.keyCode === 39) {
//           tabFocus++;
//           // If we're at the end, go to the start
//           if (tabFocus >= tabs.length) {
//             tabFocus = 0;
//           }
//           // Move left
//         } else if (e.keyCode === 37) {
//           tabFocus--;
//           // If we're at the start, move to the end
//           if (tabFocus < 0) {
//             tabFocus = tabs.length - 1;
//           }
//         }
  
//         tabs[tabFocus].setAttribute("tabindex", 0);
//         tabs[tabFocus].focus();
//       }
//     });
//   });
  
//   function changeTabs(e) {
//     const target = e.target;
//     const parent = target.parentNode;
//     const grandparent = parent.parentNode;
  
//     // Remove all current selected tabs
//     parent
//       .querySelectorAll('[aria-selected="true"]')
//       .forEach(t => t.setAttribute("aria-selected", false));
  
//     // Set this tab as selected
//     target.setAttribute("aria-selected", true);
  
//     // Hide all tab panels
//     grandparent
//       .querySelectorAll('[role="tabpanel"]')
//       .forEach(p => p.setAttribute("hidden", true));
  
//     // Show the selected panel
//     grandparent.parentNode
//       .querySelector(`#${target.getAttribute("aria-controls")}`)
//       .removeAttribute("hidden");
//   }