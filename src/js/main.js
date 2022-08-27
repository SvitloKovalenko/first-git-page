let burger = document.querySelector(".burger");
let burgerLine1 = document.querySelector(".burger__line1");
let burgerLine2 = document.querySelector(".burger__line2");
let burgerLine3 = document.querySelector(".burger__line3");
let nav = document.querySelector(".nav__list");
burger.addEventListener("click", ()=>{
    burger.classList.toggle("burger--active");
    nav.classList.toggle("nav__list--active");
    burgerLine1.classList.toggle("burger__line1--active");
    burgerLine2.classList.toggle("burger__line2--active");
    burgerLine3.classList.toggle("burger__line3--active");
})