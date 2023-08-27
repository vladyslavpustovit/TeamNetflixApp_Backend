const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const movieSchema = new mongoose.Schema({
    actors: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    thumb_url: {
        type: String,
        required: true
    },
    imdb_url: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()  // Assuming the current year is the maximum
    }
});


movieSchema.plugin(uniqueValidator);

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = MovieModel;