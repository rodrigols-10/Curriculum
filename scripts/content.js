 // Para adicionar um elemento a ser traduzido,
 // adicione os textos em inglês e em Português na função _getLanguage()
 // e adicione o elemento que receberá os textos em changePageLanguage().
 // Não esqueça de usar um id nos elementos que terão os textos traduzidos.

 class Language {
    constructor(language) { // 'en-US' or 'pt-br'
        this._language = language;
    }

    getLang(){
        return this._language;
    }

    _getLanguage() {
        
        if(this._language == sessionStorage.getItem('language')){
            console.log("é igual a sessão?");
            return false;
        } 
        if(this._language == 'storage'){
            console.log("vai dar erro");
            this._language = sessionStorage.getItem('language');
        }

        sessionStorage.setItem('language',this._language);
        
        if(this._language == 'en-US')
        {
            let english = {
                'aboutMenu': 'About',
                'educationMenu': 'Education',
                'experienceMenu': 'Experience',
                'skillsMenu': 'Skills',
                'contactsMenu': 'Contacts',
                // '': '',
                'profileTitle': 'ABOUT',
                'profileDescription': 'Hello, world!',
                'educationTitle': 'EDUCATION',
                'experienceTitle': 'EXPERIENCE',
                'skillsTitle': 'SKILLS',
                'contactsTitle': 'CONTACTS'
            };
            return english;

        } else if(this._language == 'pt-BR'){
            let portuguese = {
                'aboutMenu': 'Sobre',
                'educationMenu': 'Educação',
                'experienceMenu': 'Experiência',
                'skillsMenu': 'Habilidades',
                'contactsMenu': 'Contatos',
                'profileTitle': 'SOBRE',
                'profileDescription': 'Olá, mundo!',
                'educationTitle': 'EDUCAÇÃO',
                'experienceTitle': 'EXPERIÊNCIA',
                'skillsTitle': 'HABILIDADES',
                'contactsTitle': 'CONTATOS'
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
        //MENU
        document.querySelector("#aboutMenu").textContent = text.aboutMenu;
        document.querySelector("#educationMenu").textContent = text.educationMenu;
        document.querySelector("#experienceMenu").textContent = text.experienceMenu;
        document.querySelector("#skillsMenu").textContent = text.skillsMenu;
        document.querySelector("#contactsMenu").textContent = text.contactsMenu;
        //SECTIONS
        document.querySelector("#profileTitle > h1").textContent = text.profileTitle;
        document.querySelector("#profileDescription").innerHTML = text.profileDescription;
        document.querySelector("#educationTitle > h1").textContent = text.educationTitle;
        document.querySelector("#experienceTitle > h1").textContent = text.experienceTitle;
        document.querySelector("#skillsTitle > h1").textContent = text.skillsTitle;
        document.querySelector("#contactsTitle > h1").textContent = text.contactsTitle;
        }
    }
}