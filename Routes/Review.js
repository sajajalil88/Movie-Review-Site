const express = require('express');
const Review = require('../Models/Review')
const Movie = require('../Models/Movie')
const {verifyToken} = require('../Middleware/Auth');

const router = express.Router()

//add a review for a movie

router.post('/:movieId', verifyToken, async (req,res) =>{
    const {rating, comment} = req.body
    const userId = req.user.id;
    const {movieId} = req.params;

    try{

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        const review = new Review({user:userId, movie:movieId, rating, comment});
        await review.save();

        //update movie rating and reviews
        movie.reviews.push(review._id);
        movie.avgRating = (movie.avgRating * (movie.reviews.length - 1) + rating) / movie.reviews.length;
        await movie.save();
        res.status(201).json({ message: 'Review added', review });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;