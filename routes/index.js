const { Storage } = require('@google-cloud/storage');
const express = require('express');
const router = express.Router();
const debug = require('debug');

const log = debug('gsauth:credentials');

const GS_BUCKET = process.env['GS_BUCKET'] || 'bucket';

/* GET home page. */
router.get('/', async function (req, res, next) {
    const gs = new Storage();
    const credentials = await gs.authClient.getCredentials();
    log(`Client email: ${credentials.client_email}`);
    const [url] = await gs.bucket('kwik-e-mart').file('3rdpartylicenses.txt').getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 60_000,
        contentType: 'text/plain',
    });
    res.render('index', { title: 'Express', ...credentials, url });
});

module.exports = router;
