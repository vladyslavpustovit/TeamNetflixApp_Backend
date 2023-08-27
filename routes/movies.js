const verifyToken = require("../middlewares/middelwares");
const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  deleteMovie,
  addMovie,
  updateMovie,
  getMoviesByGenre,
} = require("../controllers/moviesController");

//// start movies
router.get("/", verifyToken, getMovies);
router.get("/:id", verifyToken, getMovie);

router.delete("/:id", verifyToken, deleteMovie);

router.post("/", verifyToken, addMovie);

router.patch("/:id", verifyToken, updateMovie);
//////end movies

///start categories
router.get("/genres/:genre", verifyToken, getMoviesByGenre);
///end categories
module.exports = router;
