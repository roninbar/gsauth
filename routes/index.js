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
    const [buckets] = await gs.getBuckets();
    res.render('index', { title: 'Google Cloud Platform', ...credentials, buckets });
});

module.exports = router;
