const express = require('express');
const router = express.Router();
const User = require('../models/users');
 
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
 
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});
router.post('/users/signup', async (req, res) => {
    const { name, email, password, Confirme_password } = req.body;
    const errors = [];
   
    if (name.length <= 0 ) {
    errors.push({text: 'Ingrese un nombre'});
   }

    if (password != Confirme_password) {
   errors.push({text: 'su contraseña no coinside'});
    }
    if (password.length < 4 ) {
        errors.push({text: 'su contraseña debe ser mayor a 4 digitos'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {errors, name, email, password, Confirme_password });
    } else {
        
     const newUser =  new User({name, email, password});
     
     await newUser.save();
     req.flash('success_msg', 'Te Registraste Con Exito');
    
    }
   
});


module.exports = router;