const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


const JWT_SECRET = process.env.SECRET_KEY

//register a new user

router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body;

    try{

        const user = new User({username, email, password});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;