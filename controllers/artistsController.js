const express = require('express');
const router = express.Router();

const Artist = require('../models/artists');

router.get('/', async (req, res)=>{
    console.log(req.session);
    const artists = await Artist.find({});
    res.json(artists);
})

router.get('/:id/edit', async (req, res)=>{
    //ARTISTS ONLY
    //If they're not logged in, redirect to login page
    //give them a message saying "hey buddy log in"
    if(!req.session.loggedIn){
        req.session.message = "HEY BUDDY LOG IN"
        return res.redirect('/auth/login')
    } else {
        console.log(req.session);
        const artist = await Artist.findById(req.params.id);
        res.render('artists/edit.ejs', {
        artist: artist
    });
    }
    
})

router.get('/new', (req, res)=>{
    res.render('artists/new.ejs');
})

router.get('/:id', async (req, res)=>{
    const artist = await Artist.findById(req.params.id).populate('albums');
    res.render('artists/show.ejs', {
        artist: artist
    });
})

router.post('/', async (req, res)=>{
    console.log(req.body);
    const newArtist = await Artist.create(req.body)
    res.json(newArtist)
})


module.exports = router;