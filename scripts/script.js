
// Todos os links da página.
var allLinks = document.querySelectorAll("a");

const LIGHT_THEME = "__LIGHT__";
const DARK_THEME = "__DARK__";

// Obtém o tema atual do localStorage ou define um tema padrão
var currentTheme = localStorage.getItem('theme') || LIGHT_THEME;

document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();

    let text = document.getElementById("search-text").value;
    if (text !== "")
        findTextOnPage(text);
    else {
        deleteAllElementChildren("modal_search_body");
        document.getElementById("modal_search_body").innerHTML = "<h5 id=\"modal_search_text\">O campo não pode ser vazio!</h5>";
        showModal('modal_search');
    }
});


document.getElementById("dark-mode-btn").addEventListener("click", (e) => {
    e.preventDefault();
    switchTheme();
});


document.querySelector('.sub-nav-btn').addEventListener('click', (e) => {
    showModal('modal_sub_navbar');
});


window.onscroll = function () {
    showElement(document.getElementById("sub-navbar"), (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50));
};


function showElement(element, show) {
    if (show)
        element.classList.add("d-none");
    else
        element.classList.remove("d-none");
};


function findTextOnPage(string) {
    string = string.toLowerCase();
    string = accentFold(string);

    let names = [];
    let links = [];
    let lengh = allLinks.length;
    console.log(allLinks.length + " - " + allLinks + "\n\n\n");
    for (let i = 0; i < lengh; i++) {
        let nametext = allLinks[i].textContent;
        let cleantext = nametext.replace(/\s+/g, ' ').trim();

        nametext = accentFold(cleantext).toLowerCase();

        if (nametext.includes(string)) {
            if (!(names.indexOf(cleantext) >= 0)) {
                let cleanlink = allLinks[i].href;

                if (!cleanlink.toLowerCase().includes("#null")) {
                    names.push(cleantext);
                    links.push(cleanlink);
                }
            }
        }
    };

    deleteAllElementChildren("modal_search_body");
    let body = document.getElementById("modal_search_body");

    lengh = names.length;
    if (lengh > 0) {
        for (let i = 0; i < lengh; i++) {
            let new_element = document.createElement("a");
            new_element.classList.add("nav-link");
            new_element.classList.add("detail-link");
            new_element.textContent = names[i];
            new_element.href = links[i];
            body.appendChild(new_element);
        }
    } else
        body.innerHTML = "<h5 id=\"modal_search_text\">Nenhum link encontrado!</h5>";

    showModal('modal_search');
};


function deleteAllElementChildren(element) {
    let parent = document.getElementById(element);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};


function showModal(idModal) {
    let modal = document.getElementById(idModal);
    let myModal = new bootstrap.Modal(modal, {});
    myModal.show();
};


function accentFold(inStr) {
    return inStr.replace(
        /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
        function (str, a, c, e, i, n, o, s, u, y, ae) {
            if (a) return 'a';
            if (c) return 'c';
            if (e) return 'e';
            if (i) return 'i';
            if (n) return 'n';
            if (o) return 'o';
            if (s) return 's';
            if (u) return 'u';
            if (y) return 'y';
            if (ae) return 'ae';
        }
    );
};


function switchTheme() {
    if(currentTheme === LIGHT_THEME) {
        loadDarkTheme();
    } else {
        loadLightTheme();
    }
};

function loadCurrentTheme() {
    if(currentTheme === LIGHT_THEME) {
        loadLightTheme();
    } else {
        loadDarkTheme();
    }
};

function loadDarkTheme() {
    document.documentElement.style.setProperty('--std-component-color', '#202124');
    document.documentElement.style.setProperty('--std-component-font-color', '#FFF');
    document.documentElement.style.setProperty('--std-main-background-color', '#3c4042');
    document.documentElement.style.setProperty('--std-detail-link-color', '#FFF');
    document.documentElement.style.setProperty('--std-sub-navbar-color', '#2e2e2e');
    document.documentElement.style.setProperty('--std-underline-animation-color', '#FFF');
    document.documentElement.style.setProperty('--std-button-hover-color', '#494949');
    document.documentElement.style.setProperty('--std-links-background-color', '#03dac5');
    document.documentElement.style.setProperty('--std-links-font-color', '#202124');
    document.documentElement.style.setProperty('--hover-links-background-color', '#FFF');
    document.documentElement.style.setProperty('--hover-links-font-color', '#202124');

    document.querySelector("#banner-img").style.webkitFilter = "grayscale(40%)";
    document.querySelector("#dark-mode-icon").innerHTML = "light_mode";
    document.querySelectorAll(".card").forEach((element) => {
        element.classList.add("bg-dark");
    });
    document.querySelectorAll(".btn-outline-success").forEach((element) => {
        element.classList.remove("btn-outline-success");
        element.classList.add("btn-outline-light");
    });

    changeAllColors(".card-title", "#FFF");
    changeAllColors(".card-text", "#FFF");
    currentTheme = DARK_THEME;
    localStorage.setItem('theme', currentTheme);
};


function loadLightTheme() {
    document.documentElement.style.removeProperty('--std-component-color');
    document.documentElement.style.removeProperty('--std-component-font-color');
    document.documentElement.style.removeProperty('--std-main-background-color');
    document.documentElement.style.removeProperty('--std-detail-link-color');
    document.documentElement.style.removeProperty('--std-sub-navbar-color');
    document.documentElement.style.removeProperty('--std-underline-animation-color');
    document.documentElement.style.removeProperty('--std-button-hover-color');
    document.documentElement.style.removeProperty('--std-links-background-color');
    document.documentElement.style.removeProperty('--std-links-font-color');
    document.documentElement.style.removeProperty('--hover-links-background-color');
    document.documentElement.style.removeProperty('--hover-links-font-color');

    document.querySelector("#banner-img").style.webkitFilter = "grayscale(0%)";
    document.querySelector("#dark-mode-icon").innerHTML = "dark_mode";
    document.querySelectorAll(".card").forEach((element) => {
        element.classList.remove("bg-dark");
    });
    document.querySelectorAll(".btn-outline-light").forEach((element) => {
        element.classList.remove("btn-outline-light");
        element.classList.add("btn-outline-success");
    });
    changeAllColors(".card-title", "#212529");
    changeAllColors(".card-text", "#212529");
    
    currentTheme = LIGHT_THEME;
    localStorage.setItem('theme', currentTheme);
};

function changeAllColors(identifier, newColor) {
    document.querySelectorAll(identifier).forEach((element) => {
        element.style.color = newColor;
    });
};

loadCurrentTheme();