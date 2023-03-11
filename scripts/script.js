// GLOBAL ////////////////////////////////

const titles = document.querySelectorAll(".section-title");
let target = [];
let i = 0;
titles.forEach(function(e){target[i] = e.getAttribute("id"); i++;})

// FUNCTIONS ////////////////////////////////

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
};

const currentLanguage = function () {
    let navLanguage = "en-US";
    if(sessionStorage.getItem('language') !== 'null') navLanguage = 'storage';
     if(navigator.language.includes('pt-')) navLanguage = 'pt-BR';
    else if(navigator.language.includes('en-')) navLanguage = 'en-US';
    console.log(navLanguage);
    let language = new Language(navLanguage);
    language.changePageLanguage();
    loadAllTitles();
    animeScroll();
}

const portugueseLanguage = function(){
    let language = new Language("pt-BR");
    language.changePageLanguage();
    loadAllTitles();
    animeScroll()
}

const englishLanguage = function(){
    let language = new Language("en-US");
    language.changePageLanguage();
    loadAllTitles();
    animeScroll()
}

const nameAnimation = function(name){
    let i = 0;
    name.split('').forEach(element => {
        const letter = document.createElement("h2");
        letter.innerHTML = element;        
        letter.classList.add("name");
        if(i > 0) letter.style.borderStyle = 'solid solid solid none';
        letter.style.animationDelay = 0.2+0.1*i+"s";
        document.querySelector("#name").appendChild(letter);
        i++;

    });
    const element = document.getElementsByClassName("name")[0];
    const cssObj = window.getComputedStyle(element, null);
    
    let letterWidth = cssObj.getPropertyValue("width");
    let hrWidth = document.getElementsByClassName("name").length*parseInt(letterWidth)+"px";
    document.getElementsByClassName("name-hr")[0].style.width = hrWidth;
    document.getElementsByClassName("name-hr")[1].style.width = hrWidth;
}

const loadAllTitles = function (){
    titleStructure('profileTitle');
    titleStructure('educationTitle');
    titleStructure('experienceTitle');
    titleStructure('skillsTitle');
    titleStructure('contactsTitle');
}

const titleStructure = function(tagId){
    //TITLE
    let i = 0;
    const name = document.querySelector("#"+tagId+" > h1").textContent;
    document.getElementById(tagId).innerHTML = "<h1 class='title-content'>"+name+"</h1>";
    document.querySelector("#"+tagId+" .title-content").style.display = "none";
    name.split('').forEach(element => {
        const letter = document.createElement("h1");
        letter.textContent = element;
        letter.classList.add("section-title-letters");
        let size = (100/name.length)+"%";
        letter.style.height = size;
        letter.style.animationDelay = 0.1+0.1*i+"s";
        letter.style.translate = "-1px -"+ i + "px";
        document.getElementById(tagId).appendChild(letter);
        i++;
    });

    let boxWidth = document.querySelectorAll("#"+tagId+" .section-title-letters")[0].offsetHeight;
    for (let j = 0; j < name.length; j++) {
        document.querySelectorAll("#"+tagId+" .section-title-letters")[j].style.width = boxWidth+"px";
        document.querySelectorAll("#"+tagId+" .section-title-letters")[j].style.fontSize = boxWidth * 0.8 +"px";
        
    }
    //NUMBER
    i = 0;
    let sectionNumber = document.querySelector("#"+tagId).parentElement.querySelector(".section-number");
    let sectionNumberH1 = document.querySelector("#"+tagId).parentElement.querySelector(".section-number h1");
    let sectionNumberValue = sectionNumberH1.textContent;
    sectionNumber.innerHTML = "<h1 class='title-content' style='display:none'>"+sectionNumberValue+"</h1>";
    // sectionNumberH1.style.display = "none";

    let spaces = name.length - sectionNumberValue.length;
    for (let index = 0; index < spaces; index++) sectionNumberValue += " ";
    sectionNumberValue.split('').forEach(element => {
        const snumber = document.createElement("h1");
        snumber.textContent = element;
        snumber.classList.add("section-title-letters");
        let size = (100/name.length)+"%";
        snumber.style.height = size;
        snumber.style.backgroundImage = "linear-gradient(to right, transparent, var(--text-color))";
        // letter.style.animationDelay = 0.1+0.1*i+"s";
        snumber.style.translate = "0px -"+ i + "px";
        snumber.style.width = (boxWidth+1)+"px";
        snumber.style.fontSize = boxWidth * 0.8 +"px";
        sectionNumber.appendChild(snumber);
        i++;
    });
    document.querySelector("#"+tagId).style.backgroundClip = "content-box";
}

function animeScroll() {
    const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
    for (let i = 0; i < target.length; i++) {
        if((windowTop) > document.getElementById(target[i]).offsetTop) {
            menuSelection(i+1);
            for (let j = 0; j < document.querySelectorAll("#"+target[i]+" .section-title-letters").length; j++) {
                document.querySelectorAll("#"+target[i]+" .section-title-letters")[j].classList.add('section-title-animated');
            }
        } else if((window.pageYOffset + window.innerHeight) < document.getElementById(target[i]).offsetTop){
            for (let j = 0; j < document.querySelectorAll("#"+target[i]+" .section-title-letters").length; j++) {
                document.querySelectorAll("#"+target[i]+" .section-title-letters")[j].classList.remove('section-title-animated');
            }
        }
    }
}

const menuSelection = function(value,elementId){
    const element = (typeof elementId !== 'undefined') ? elementId : document.getElementById('menu-item-'+value);
    const menu = document.querySelectorAll("#menu ul li").length;
    for (let i = 1; i <= menu; i++) {
        document.getElementById('menu-item-'+i).classList.remove('menu-active');
    }
    element.classList.add('menu-active');
}

function scrollToIdOnClick(event) {
    event.preventDefault();
    const to = getScrollTopByHref(event.target);
    menuSelection(0,event.target.parentElement);
    scrollToPosition(to);
}

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
    window.scroll({
        top: to,
        behavior: "smooth",
    });
    // smoothScrollTo(0, to);
}

const smoothScrollTo = function (endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== 'undefined' ? duration : 400;
  
    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  };

// EXECUTED ON LOAD ////////////////////////////////

loadAllTitles();
animeScroll();

// EVENTS ////////////////////////////////

const menuItems = document.querySelectorAll('.menu a[href^="#"]');
menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
})

window.addEventListener('scroll', debounce(function() {
    animeScroll();
  }, 200));