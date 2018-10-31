const express = require('express');
const router = express.Router();

const Album = require('../models/albums');
const Artist = require('../models/artists');

router.get('/', async (req, res)=>{
    console.log("ALBUM INDEX")
    const albums = await Album.find({})
    res.render('albums/index.ejs', {
            albums: albums
    });
})

router.get('/:id/edit', (req, res)=>{
    res.render('albums/edit.ejs');
})

router.get('/new', async (req, res)=>{
    const artists = await Artist.find({});
    res.render('albums/new.ejs', {
        artists: artists
    });
})

router.get('/:id', async (req, res)=>{
    const album = await Album.findById(req.params.id).populate('artist');
    res.render('albums/show.ejs', {
        album: album
    });
})

router.post('/', async (req, res)=>{
    const newAlbum = await Album.create(req.body);
    const artistDroppingAnAlbum = await Artist.findById(req.body.artist);
    artistDroppingAnAlbum.albums.push(newAlbum._id);
    await artistDroppingAnAlbum.save()
    res.redirect(`artists/${artistDroppingAnAlbum._id}`);
})

module.exports = router;