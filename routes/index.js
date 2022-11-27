const { Storage } = require('@google-cloud/storage');
const express = require('express');
const router = express.Router();

const GS_BUCKET = process.env['GS_BUCKET'] || 'bucket';

/* GET home page. */
router.get('/', async function (req, res, next) {
    const gs = new Storage();
    const credentials = await gs.authClient.getCredentials();
    const [url] = await gs.bucket(GS_BUCKET).file('0.txt').getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 60_000,
        contentType: 'text/plain',
    });
    res.render('index', { title: 'Express', ...credentials, url });
});

module.exports = router;
