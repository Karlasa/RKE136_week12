let getMoviePoster = document.querySelector(".movie-poster");
let getMovieTitle = document.querySelector(".movie-title");
let modal = document.querySelector("#myModal");
let closeBtn = document.querySelector(".closeBtn");
let modalImage = document.querySelector(".movie-poster-modal");
let modalTitle = document.querySelector(".movie-title-modal");

getMoviePoster.addEventListener("click", () => {
  modal.style.display = "block";
  modalImage.src = getMoviePoster.src;
  modalTitle.textContent = getMovieTitle.textContent;
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
