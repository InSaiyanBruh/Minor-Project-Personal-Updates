var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3.5 },
    }
});

const menu = document.querySelector('.menu');
const menuicon = document.querySelector('.menu-icon');
const closeicon = document.querySelector('.close-icon');

// Animation to open menu
function openMenu() {
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    gsap.fromTo(menu,
        { x: '-100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
    );
}

// Animation to close menu
function closeMenu() {
    gsap.to(menu, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        }
    });
}

menuicon.addEventListener('click', openMenu);
closeicon.addEventListener('click', closeMenu);


// canvas animation from here
const canvas = document.querySelector('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');


const frames = {
    currentIndex: 0,
    maxIndex: 188
}

let imagesLoaded = 0
const images = []
function preloadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const image = `pics/iphone-${i.toString().padStart(2, "0")}.png`;
        const img = new Image();
        img.src = image;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                animate();
            }
        }
        images.push(img);
    }
}

function loadImage(index) {
    // Clamp index between 0 and the last available frame
    index = Math.max(0, Math.min(index, images.length - 1));

    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, x, y, newWidth, newHeight);

    frames.currentIndex = index;
}

function animate() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
        }
    })

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex))
        },
    })
}

preloadImages();

const menuIcon = document.querySelector('.menu-icon')
console.log(menuIcon);
menuIcon.addEventListener('click', () => {
    console.log('clicked');
})