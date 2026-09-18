/*==========================================
            STICKY NAVBAR
==========================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});


/*==========================================
            SMOOTH SCROLL
==========================================*/

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*==========================================
        ACTIVE NAVIGATION LINK
==========================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*==========================================
            BACK TO TOP BUTTON
==========================================*/

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
/*==========================================
            ANIMATED COUNTERS
==========================================*/

const counters = document.querySelectorAll(".stat-card h2");

const speed = 80;

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const targetText = counter.innerText;

            const target = parseInt(targetText.replace(/\D/g, ""));

            let count = 0;

            const updateCounter = () => {

                const increment = Math.ceil(target / speed);

                if (count < target) {

                    count += increment;

                    if (count > target) count = target;

                    if (targetText.includes("+")) {

                        counter.innerText = count + "+";

                    } else {

                        counter.innerText = count;

                    }

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = targetText;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*==========================================
            SCROLL REVEAL
==========================================*/

const revealElements = document.querySelectorAll(

".about, .categories, .best-sellers, .recipes, .statistics, .export, .follow"

);

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.15});

revealElements.forEach(section=>{

    section.classList.add("hidden");

    revealObserver.observe(section);

});


/*==========================================
            FAVORITE BUTTON
==========================================*/

const favorites = document.querySelectorAll(".favorite");

favorites.forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.classList.toggle("liked");

        const icon = btn.querySelector("i");

        if(btn.classList.contains("liked")){

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            icon.style.color="red";

        }

        else{

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

            icon.style.color="";

        }

    });

});


/*==========================================
        RECIPE PLAY BUTTON
==========================================*/

const recipeButtons = document.querySelectorAll(".play-btn");

recipeButtons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        alert("Recipe video will open here.");

        /*
        Later we'll replace this
        with a popup containing
        an embedded YouTube video.
        */

    });

});


/*==========================================
            PRODUCT BUTTON
==========================================*/

const productButtons = document.querySelectorAll(".product-btn");

productButtons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.preventDefault();

        alert("Product Details Page");

    });

});
/*==========================================
            MOBILE MENU
==========================================*/

const menuBtn = document.createElement("div");

menuBtn.className = "menu-btn";

menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

document.querySelector(".navbar").appendChild(menuBtn);

menuBtn.addEventListener("click", () => {

    document.querySelector(".nav-links").classList.toggle("mobile-active");

});


/*==========================================
            SCROLL PROGRESS BAR
==========================================*/

const progress = document.createElement("div");

progress.id = "progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight -
                   document.documentElement.clientHeight;

    const progressWidth = (scrollTop / height) * 100;

    progress.style.width = progressWidth + "%";

});


/*==========================================
            LOADING SCREEN
==========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(()=>{

            loader.style.display="none";

        },600);

    }

});


/*==========================================
            PRODUCT CARD HOVER
==========================================*/

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});


/*==========================================
            RECIPE CARD HOVER
==========================================*/

const recipeCards=document.querySelectorAll(".recipe-card");

recipeCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});


/*==========================================
            BUTTON RIPPLE EFFECT
==========================================*/

const buttons=document.querySelectorAll(

".btn-primary,.btn-secondary,.product-btn"

);

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const radius=diameter/2;

        circle.style.width=

        circle.style.height=

        `${diameter}px`;

        circle.style.left=

        `${e.clientX-this.offsetLeft-radius}px`;

        circle.style.top=

        `${e.clientY-this.offsetTop-radius}px`;

        circle.classList.add("ripple");

        const ripple=this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/*==========================================
            PREVENT EMPTY LINKS
==========================================*/

document.querySelectorAll('a[href="#"]').forEach(link=>{

    link.addEventListener("click",e=>{

        e.preventDefault();

    });

});


/*==========================================
            CONSOLE MESSAGE
==========================================*/

console.log(

"%cWelcome to Panda Brand Experience",

"color:#008C5A;font-size:20px;font-weight:bold;"

);

console.log(

"Developed by Rawan Ahmed"

);
/*==========================================
            VIDEO MODAL
==========================================*/

const openVideo = document.getElementById("openVideo");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.querySelector(".close-video");
const video = document.getElementById("brandVideo");

openVideo.addEventListener("click", function (e) {

    e.preventDefault();

    videoModal.style.display = "flex";

    video.play();

});

closeVideo.addEventListener("click", function () {

    video.pause();

    video.currentTime = 0;

    videoModal.style.display = "none";

});

window.addEventListener("click", function (e) {

    if (e.target === videoModal) {

        video.pause();

        video.currentTime = 0;

        videoModal.style.display = "none";

    }

});


/*====================================================
                BEST SELLERS CAROUSEL
====================================================*/

const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".carousel-track .product-card");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const dots = document.querySelectorAll(".carousel-dots .dot");

if(track && cards.length){

    let currentIndex = 0;

    const cardWidth = cards[0].offsetWidth + 30;

    function updateSlider(){

        track.scrollTo({

            left: currentIndex * cardWidth,

            behavior:"smooth"

        });

        dots.forEach(dot=>dot.classList.remove("active"));

        if(dots[currentIndex]){

            dots[currentIndex].classList.add("active");

        }

    }

    nextBtn.addEventListener("click",()=>{

        currentIndex++;

        if(currentIndex >= cards.length){

            currentIndex = 0;

        }

        updateSlider();

    });

    prevBtn.addEventListener("click",()=>{

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = cards.length-1;

        }

        updateSlider();

    });

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            currentIndex=index;

            updateSlider();

        });

    });

    let autoSlide = setInterval(()=>{

        currentIndex++;

        if(currentIndex >= cards.length){

            currentIndex=0;

        }

        updateSlider();

    },4000);

    track.addEventListener("mouseenter",()=>{

        clearInterval(autoSlide);

    });

    track.addEventListener("mouseleave",()=>{

        autoSlide=setInterval(()=>{

            currentIndex++;

            if(currentIndex>=cards.length){

                currentIndex=0;

            }

            updateSlider();

        },4000);

    });

}
