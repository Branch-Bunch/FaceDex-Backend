const express = require('express');
const rp = require('request-promise')
const router = express.Router();

router.post('/', (req, res) => {
  const options = {
    method: 'POST',
    uri: 'http://api.kairos.com/gallery/remove',
    headers: {
      'content-type': 'application/json',
      app_id: process.env.KAIROS_ID,
      app_key: process.env.KAIROS_KEY
    },
    body: {
      gallery_name: 'facedex'
    },
    json: true
  }

  rp(options)
    .then(response => res.send(response))
    .catch(err => res.status(500).send(err))
})

module.exports = router
