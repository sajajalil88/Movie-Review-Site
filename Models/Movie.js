const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    director: String,
    releaseDate: Date,
    avgRating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
