 class Language {
    constructor(language) { // 'en' or 'pt-br'
        this._language = language;
    }

    getLang(){
        return this._language;
    }

    _getLanguage() {
        
        if(this._language == sessionStorage.getItem('language')){
            return false;
        } 
        if(this._language == 'storage'){
            this._language = sessionStorage.getItem('language');
        }

        sessionStorage.setItem('language',this._language);
        
        if(this._language == 'en')
        {
            let english = {
                'profileTitle': 'about',
                'profileDescription': 'Hello, world!'
            };
            return english;

        } else if(this._language == 'pt-br'){
            let portuguese = {
                'profileTitle': 'sobre',
                'profileDescription': 'Olá, mundo!'
            };
            return portuguese;

        } else {
            return false;
        }
        // modify the language
    }

    changePageLanguage(){
        const text = this._getLanguage();


        if(text !== false){
        //Modifying DOM elements here
        document.querySelector("#profileTitle").innerHTML = text.profileTitle;
        document.querySelector("#profileDescription").innerHTML = text.profileDescription;
        }
    }
}