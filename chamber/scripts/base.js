//code for the footer
const today = new Date();
const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;

//code for the hamburguer menu

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#hidden-menu');

hambutton.addEventListener('click', () =>
{
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

