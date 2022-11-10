/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
var swiperPopular = new Swiper(".popular__container", {
    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    loop: false,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        1024: {
            spaceBetween: 55,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)




/*=============== JIKAN API ===============*/
const urlAnimeon = 'https://api.jikan.moe/v4/seasons/now'
const urlAnimetop = 'https://api.jikan.moe/v4/top/anime'

fetch(urlAnimeon)
    .then(response => response.json())
    .then(response => {
        const content = document.getElementById('animeon')
        for (let i = 0; i < 25; i++) {
            content.innerHTML += `  
                <div class="anime__img">
                    <div class="image__emision">
                        <img loading="lazy" src="${response.data[i].images.jpg.large_image_url}" alt="${response.data[i].title} Poster">
                    </div>
                    <div class="anime__img-info">
                        <h3>${response.data[i].title}</h3>
                        <p>${response.data[i].source}</p>
                    </div>
                </div>
            `
        }
    })
    .catch(err => console.error(err))

fetch(urlAnimetop)
    .then(response => response.json())
    .then(response => {
        const content = document.getElementById('animetop')
        for (let i = 0; i < 10; i++) {
            content.innerHTML += `  
                <div class="anime__top swiper-slide">
                    <div class="anime__top-img">
                        <img loading="lazy" src="${response.data[i].images.jpg.large_image_url}"
                            alt="${response.data[i].title} Poster" class="popular__img">
                    </div>
                    <div class="popular__anime-title">
                        <h2>${response.data[i].title}</h2>
                        <p>#${response.data[i].rank}</p>
                    </div>
                    <div class="popular__anime-subtitle">
                        <h3>${response.data[i].status}</h3>
                        <p>∙</p>
                        <p>${response.data[i].episodes} ep.</p>
                    </div>
                    <p class="popular-anime-description">
                        ${response.data[i].synopsis}
                    </p>
                </div>
            `
        }
    })
    .catch(err => console.error(err))

/*=============== TEXT ANIMATION ===============
let elements = document.querySelectorAll('.anime__img-info');

elements.forEach(element => {
    let innerText = element.innerText;
    element.innerHTML = '';

    let textContainer = document.createElement('div');
    textContainer.classList.add('block');

    for (let letter of innerText) {
        let span = document.createElement('span');
        span.innerText = letter.trim() === '' ? '\xa0' : letter;
        span.classList.add('letter');
        textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
});
*/