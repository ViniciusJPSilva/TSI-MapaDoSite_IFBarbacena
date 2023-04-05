
// Todos os links da página.
var allLinks = document.querySelectorAll("a");

document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();

    let text = document.getElementById("search-text").value;
    if (text !== "")
        findTextOnPage(text)
    else {
        deleteAllElementChildren("modal_search_body");
        document.getElementById("modal_search_body").innerHTML = "<h5 id=\"modal_search_text\">O campo não pode ser vazio!</h5>";
        showModal('modal_search');
    }
})


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
}

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
}

function deleteAllElementChildren(element) {
    let parent = document.getElementById(element);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showModal(idModal) {
    let modal = document.getElementById(idModal);
    let myModal = new bootstrap.Modal(modal, {});
    myModal.show();
}

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
}