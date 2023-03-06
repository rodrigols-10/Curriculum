const currentLanguage = function () {
    if(sessionStorage.getItem('language') !== undefined){
        let language = new Language('storage');
        language.changePageLanguage();
    }
}

const portugueseLanguage = function(){
    let language = new Language("pt-br");
    language.changePageLanguage();
}

const englishLanguage = function(){
    let language = new Language("en");
    language.changePageLanguage();
}

const nameAnimation = function(name){
    console.log("Animation working...");
    
    let i = 0;
    name.split('').forEach(element => {
        const letter = document.createElement("h1");
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