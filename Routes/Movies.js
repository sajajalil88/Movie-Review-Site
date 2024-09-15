const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../Models/Movie')
const {verifyToken, verifyAdmin} = require('../Middleware/Auth');

const router = express.Router()

// Add a new movie (Admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    const { title, genre, description, director, releaseDate } = req.body;
    try {
        const movie = new Movie({ title, genre, description, director, releaseDate });
        await movie.save();
        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().populate('reviews');
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('reviews');
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;