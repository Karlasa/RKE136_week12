const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.getMainPage);

router.get("/search", mainController.getSearchPage);

router.post("/search", mainController.getSearchResults);

router.post("/getmovie", mainController.getMovie);

module.exports = router;
