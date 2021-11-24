var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next) {
    res.render('contacto') // galeria.hbs
    })

   

module.exports = router;