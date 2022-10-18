var express = require('express');
var router = express.Router();
var task1Controller = require('../controller/task1.controller');

/* GET home page. */
router.get(['/','/:slug'], task1Controller.getCSVData);



module.exports = router;
