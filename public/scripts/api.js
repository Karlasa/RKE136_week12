const movieTitle = document.querySelector(".movie-title");
const releaseDate = document.querySelector(".release-date");
const movieGenres = document.querySelector(".genres");
const movieDuration = document.querySelector(".movie-duration");
const moviePosterImage = document.querySelector(".movie-poster");
const movieQuote = document.querySelector(".movie-info-quote");
const movieOverview = document.querySelector(".movie-info-overview");
const movieRating = document.querySelector(".movie-rating");

const movieId = 889737;

window.onload = () => {
  /*
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b5ed8cede022fe9ef61ae22cc6a4dda1`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      movieTitle.textContent = data.title;
      let date = new Date(data.release_date);
      releaseDate.textContent = `${date.getFullYear()} ${
        data.production_countries[0].iso_3166_1
      }`;
      movieDuration.textContent = `${data.runtime} minutes`;
      movieQuote.textContent = data.tagline;
      movieOverview.textContent = data.overview;

      let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
      moviePosterImage.src = posterUrl;
      moviePosterImage.alt = `${data.title} Poster`;

      let genres = "";
      data.genres.forEach((genre) => {
        genres += genre.name + ", ";
      });

      let genresUpdated = genres.slice(0, -2) + ".";
      movieGenres.textContent = genresUpdated;
    }); */

  let releaseUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=b5ed8cede022fe9ef61ae22cc6a4dda1`;
  fetch(releaseUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const usReleaseDates = data.results.filter(
        (item) => item.iso_3166_1 === "US"
      );

      movieRating.textContent =
        usReleaseDates[0].release_dates[0].certification;
    });
};
