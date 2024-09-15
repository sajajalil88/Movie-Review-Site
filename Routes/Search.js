const express = require('express');
const Review = require('../Models/Review')
const Movie = require('../Models/Movie');
const router = require('./Review');

//search movie by title or genre

router.get('/', async(req,res) =>{
    const {title, genre} = req.body;
    try{

        const query = {};
        if(title) query.title = new RegExp(title,i);
        if(genre) query.genre = genre;

        const movies = await Movie.find(query);
        res.json(movies);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;