//code for the footer
const today = new Date();
const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;

//code for the hamburguer menu

const mainnav = document.querySelector('.navigation');
// The ID of the hamburger button was updated from #hidden-menu to #humbutton
const hambutton = document.querySelector('#humbutton'); 

hambutton.addEventListener('click', () => 
{
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});
