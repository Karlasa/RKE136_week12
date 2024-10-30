const axios = require("axios");
const http = require("http");
require("dotenv").config();

exports.getMainPage = (req, res) => {
  const movieId = 889737;

  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`;

  axios.get(url).then((response) => {
    let data = response.data;

    let releaseDate = new Date(data.release_date).getFullYear();
    let currentYear = new Date().getFullYear();

    let genres = "";
    data.genres.forEach((genre) => {
      genres += genre.name + ", ";
    });

    let genresUpdated = genres.slice(0, -2) + ".";

    let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

    res.render("index", {
      dataToRender: response.data,
      year: currentYear,
      releaseDate: releaseDate,
      genres: genresUpdated,
      posterUrl: posterUrl,
    });
  });
};

exports.getSearchPage = (req, res) => {
  res.render("search", { movieData: "" });
};

exports.getSearchResults = (req, res) => {
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
};

exports.getMovie = (req, res) => {
  const movieToSearch =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.movie
      ? req.body.queryResult.parameters.movie
      : "";

  const reqUrl = encodeURI(
    `http://www.omdbapi.com/?t=${movieToSearch}&apikey=${process.env.OMDB_API_KEY}`
  );
  http.get(
    reqUrl,
    (responseFromAPI) => {
      let completeResponse = "";
      responseFromAPI.on("data", (chunk) => {
        completeResponse += chunk;
      });
      responseFromAPI.on("end", () => {
        const movie = JSON.parse(completeResponse);
        if (!movie || !movie.Title) {
          return res.json({
            fulfillmentText:
              "Sorry, we could not find the movie you are asking for.",
            source: "getmovie",
          });
        }

        let dataToSend = movieToSearch;
        dataToSend = `${movie.Title} was released in the year ${movie.Year}. It is directed by ${movie.Director} and stars ${movie.Actors}.\n Here some glimpse of the plot: ${movie.Plot}.`;

        return res.json({
          fulfillmentText: dataToSend,
          source: "getmovie",
        });
      });
    },
    (error) => {
      return res.json({
        fulfillmentText: "Could not get results at this time",
        source: "getmovie",
      });
    }
  );
};
