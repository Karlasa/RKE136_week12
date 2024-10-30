const slides = document.getElementsByClassName("carousel__item");
const slidesTotal = slides.length;
const nextBtn = document.querySelector("#carousel__button--next");
const prevBtn = document.querySelector("#carousel__button--prev");

let slidePosition = 0;

nextBtn.addEventListener("click", () => {
  for (let slide of slides) {
    slide.classList.remove("carousel__item--visible");
  }

  if (slidePosition == slidesTotal - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  slides[slidePosition].classList.add("carousel__item--visible");
});

prevBtn.addEventListener("click", () => {
  for (let slide of slides) {
    slide.classList.remove("carousel__item--visible");
  }

  if (slidePosition == 0) {
    slidePosition = slidesTotal - 1;
  } else {
    slidePosition--;
  }

  slides[slidePosition].classList.add("carousel__item--visible");
});
