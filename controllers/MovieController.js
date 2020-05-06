const { Movie } = require("../models/movie.model");

//retrieve all movies from database in LIFO manner
exports.list = async (req, res) => {
  try {
    let movies = await Movie.find().sort({ _id: -1 });
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//create a new movie
exports.create = async (req, res) => {
  try {
    let movie = await new Movie(req.body).save();
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//read a movie
exports.read = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    } else {
      return res.status(200).json(movie);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//update a movie
exports.update = async (req, res) => {
  try {
    let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    } else {
      return res.status(200).json(movie);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//delete a movie
exports.delete = async (req, res) => {
  try {
    let movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    } else {
      return res.status(200).json(movie);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
