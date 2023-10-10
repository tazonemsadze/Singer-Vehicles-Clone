"use strict";

// alert(
//   "this is a clone of the website singervehicles all the credit of design goes to singervehicle group"
// );
const hamburgerBtn = document.querySelector(".hamburger-btn");
const connectBtn = document.querySelector(".connect-btn");
const leftMenu = document.querySelector(".menu__window--left");
const rightMenu = document.querySelector(".menu__window--right");
const closeBtn = document.querySelectorAll(".menu__close--btn");
const menuItems = document.querySelectorAll(".menu__item");
const overlay = document.querySelector(".overlay");

// Menu JS
const openMenu = (x) => {
  x.classList.toggle("is-active");
};

const closeMenu = () => {
  leftMenu.classList.remove("is-active");
  rightMenu.classList.remove("is-active");
  overlay.classList.remove("is-active");
};

hamburgerBtn.addEventListener("click", () => {
  openMenu(leftMenu);
  openMenu(overlay);
});

connectBtn.addEventListener("click", () => {
  openMenu(rightMenu);
  openMenu(overlay);
});

for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener("click", closeMenu);
}

overlay.addEventListener("click", closeMenu);

for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", closeMenu);
}

// Nav-scrolled JS

const navBar = document.querySelector("nav");
const header = document.querySelector("header");
const logoBtn = document.querySelector(".logo-btn");

const options = {
  threshold: 0.9,
};

const stickyNav = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      navBar.classList.add("nav-scrolled");
      logoBtn.classList.add("scrolled");
      hamburgerBtn.classList.add("scrolled");
    } else if (entry.isIntersecting) {
      navBar.classList.remove("nav-scrolled");
      logoBtn.classList.remove("scrolled");
      hamburgerBtn.classList.remove("scrolled");
    }
  });
};

const navBarObserver = new IntersectionObserver(stickyNav, options);
navBarObserver.observe(header);

// SPLIDE

let splide = new Splide(".splide", {
  arrows: false,
  type: "loop",
  perPage: 1,
  padding: "1.5rem",
  gap: "1rem",
  pagination: false,
  flickPower: "500",
  waitForTransition: true,
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  mediaQuery: "min",
  breakpoints: {
    500: {
      gap: "1.7rem",
      perPage: 1,
    },
    890: {
      gap: "3.5rem",
      perPage: 2,
    },
  },
});
splide.mount();

let splide2 = new Splide("#second__slider", {
  arrows: false,
  type: "loop",
  perPage: 1,
  focus: "center",
  padding: "1.5rem",
  gap: "1rem",
  pagination: false,
  flickPower: "500",
  waitForTransition: true,
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  mediaQuery: "min",
  breakpoints: {
    500: {
      gap: "1.7rem",
    },
    768: {
      gap: "3.5rem",
    },
  },
});
splide2.mount();

const nextBtn = document.querySelector(".slider__button--right");
const prevtBtn = document.querySelector(".slider__button--left");
const secondNext = document.querySelector(".second__right");
const secondPrev = document.querySelector(".second__left");

nextBtn.addEventListener("click", () => {
  splide.go("+1");
});

prevtBtn.addEventListener("click", () => {
  splide.go("-1");
});

secondNext.addEventListener("click", () => {
  splide2.go("+1");
});

secondPrev.addEventListener("click", () => {
  splide2.go("-1");
});

// Secondary Sliders
const createSlider = function (sliderSelector) {
  const sliderElement = document.querySelector(sliderSelector);
  const slides = sliderElement.querySelectorAll(".image-slide");
  const btnLeft = sliderElement.querySelector(".image-slider__button--left");
  const btnRight = sliderElement.querySelector(".image-slider__button--right");
  const dotContainer = sliderElement.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  let autoPlayInterval;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    dotContainer
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    dotContainer
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const startAutoPlay = function () {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  startAutoPlay();

  const stopAutoPlay = function () {
    clearInterval(autoPlayInterval);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide, stopAutoPlay);
  btnLeft.addEventListener("click", prevSlide, stopAutoPlay);

  // Add event listeners when hovering
  sliderElement.addEventListener("mouseenter", () => {
    stopAutoPlay();
  });
  sliderElement.addEventListener("mouseleave", () => {
    startAutoPlay();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    stopAutoPlay();
    if (e.key === "ArrowRight") nextSlide();
    stopAutoPlay();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

// Initialize sliders
createSlider(".luxury__slider--container");
createSlider(".design__slider--container");
