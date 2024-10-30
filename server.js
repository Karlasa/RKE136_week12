const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/search", (req, res) => {
  res.render("search", { movieData: "" });
});

app.post("/search", (req, res) => {
  let movieTitle = req.body.movieTitle;

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`;
  let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`;

  let endpoints = [movieUrl, genresUrl];

  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
    axios.spread((movie, genres) => {
      let movieInfo = movie.data.results[0];
      if (movieInfo === undefined) {
        res.render("search", { movieData: "" });
        return;
      }

      let genreNames = movieInfo.genre_ids.map((id) => {
        let genre = genres.data.genres.find((genre) => genre.id === id);
        return genre.name;
      });

      let movieData = {
        title: movieInfo.title,
        year: new Date(movieInfo.release_date).getFullYear(),
        genres: genreNames.join(", ") + ".",
        overview: movieInfo.overview,
        posterUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieInfo.poster_path}`,
      };

      res.render("search", { movieData: movieData });
    })
  );
});

app.listen(3000, () => {
  console.log("Server is running.");
});
