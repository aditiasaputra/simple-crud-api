const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get("/", homeController.hello);

router.get("/about", homeController.about);

module.exports = router;