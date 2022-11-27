const { Storage } = require('@google-cloud/storage');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const gs = new Storage();
    const credentials = await gs.authClient.getCredentials();
    res.render('index', { title: 'Express', ...credentials });
});

module.exports = router;
