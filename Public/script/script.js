
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo("#feature",
    { opacity: 0 },
    {
        x: '-100',
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#feature",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            markers: false,
        }
    },
)

gsap.fromTo("#iphone",
    { opacity: 0 },
    {
        opacity: 1,
        x: 100,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#iphone",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            markers: false,
        }
    },
)


let video = document.getElementById("displayVideo");
let video1 = document.getElementById("batteryVideo");

gsap.fromTo("#displayVideo",
    { scale: 1 },  // initial scale
    {
        scale: 1.9,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#displayVideo",
            start: "top 80%",    // when video enters viewport
            end: "bottom 20%",   // until it leaves
            scrub: true,         // smooth scroll-linked animation
            markers: false,       // remove later

            // 👇 video controls
            onEnter: () => video.play(),
            onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
            onLeaveBack: () => video.pause()
        }
    }
);
gsap.fromTo("#batteryVideo",
    { opacity: 0 },  // initial scale
    {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#batteryVideo",
            start: "top 80%",    // when video enters viewport
            end: "bottom 40%",   // until it leaves
            scrub: true,         // smooth scroll-linked animation
            markers: false,       // remove later

            // 👇 video controls
            onEnter: () => video1.play(),
            onLeave: () => video1.pause(),
            onEnterBack: () => video1.play(),
            onLeaveBack: () => video1.pause()
        }
    }
);


// Top image from top
gsap.from(".animate-top", {
    y: -100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: ".animate-top",
        start: "top 80%", // when image enters viewport
        toggleActions: "play reverse play reverse"
    }
});

// Bottom-left image from left
gsap.from(".animate-left", {
    x: -100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: ".animate-left",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

// Bottom-right image from right
gsap.from(".animate-right", {
    x: 100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: ".animate-right",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});




// Swiper Init
const swiper = new Swiper(".swiper", {
    slidesPerView: 1.2,      // show slightly more than 1 card
    centeredSlides: true,    // keep active slide in the center
    spaceBetween: 10,        // reduce gap between cards
    loop: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2.2,  // on tablet show ~2 slides
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,    // on desktop show 3 slides
            spaceBetween: 30,
        }
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