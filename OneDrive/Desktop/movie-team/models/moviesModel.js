const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genres: [String],
    rating: Number,
    duration: {
        hours: Number,
        minutes: Number,
    },
    reviews: [{ name: String, text: String }],
});

movieSchema.plugin(uniqueValidator);

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = MovieModel;