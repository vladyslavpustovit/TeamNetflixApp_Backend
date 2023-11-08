const moviesModel = require('../models/moviesModel')


const getMovies = (req,res) =>{
    moviesModel.find()
    .sort( {title:1})
    .then(movies => {
        res.status(200).json(movies)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const getMovie = (req,res) =>{
    moviesModel.findById(req.params.id)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const deleteMovie = (req,res) =>{
    moviesModel.findByIdAndDelete(req.params.id)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const addMovie = (req,res) =>{
    const movie = new moviesModel(req.body)
    movie.save()
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}

const updateMovie = (req,res) =>{
    moviesModel.findByIdAndUpdate(req.params.id, req.body)
    .then(movie =>{
        res.status(200).json(movie)
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}


const getMoviesByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const movies = await moviesModel.find({ genre: genre }); // Use genres as an array of strings
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "No movies found" });
    }
}


module.exports = {getMovies, getMovie, deleteMovie, addMovie, updateMovie, getMoviesByGenre}