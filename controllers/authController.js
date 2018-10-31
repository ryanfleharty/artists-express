const express = require("express");
const router = express.Router();
const User = require('../models/users');

router.post('/', (req, res)=>{
    req.session.username = req.body.username;
    req.session.loggedIn = true;
    res.redirect("/artists")
})

router.get('/login', (req, res)=>{
    //IF THERES A MESSAGE, SHOW IT
    if(req.session.message){
        let message = req.session.message;
        //reset so session isn't holding onto old messages
        delete req.session.message;
        res.render('auth/login.ejs', {
            message: message
        })
    } else {
        res.render('auth/login.ejs');
    }
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/auth/login');
    });
})

module.exports = router;