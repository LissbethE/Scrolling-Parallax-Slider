'use strict';

let imgs = [...document.querySelectorAll('.slider__img')];
let slider = document.querySelector('.slider');

let sliderWidth;
let imgWidth;
let current = 0;
let target = 0;
let ease = 0.05;

imgs.forEach(
  (e, i) => (e.style.backgroundImage = `url('./imgs/img-${i + 1}.jpg')`)
);

const lerp = (start, end, t) => start * (1 - t) + end * t;
const setTransform = (el, transform) => (el.style.transform = transform);

const init = function () {
  sliderWidth = slider.getBoundingClientRect().width;
  imgWidth = sliderWidth / imgs.length;

  document.body.style.height = `${
    sliderWidth - (window.innerWidth - window.innerHeight)
  }px`;
};

const animateImages = function () {
  let ratio = current / imgWidth;
  let intersectionRatioValue;

  imgs.forEach((e, i) => {
    intersectionRatioValue = ratio - i * 0.7;
    setTransform(e, `translateX(${intersectionRatioValue * 70}px)`);
  });
};

const animate = function () {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
  setTransform(slider, `translateX(-${current}px)`);

  animateImages();
  requestAnimationFrame(animate);
};

init();
animate();
