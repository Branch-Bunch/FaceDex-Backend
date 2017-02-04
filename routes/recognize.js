const express = require('express');
const rp = require('request-promise')
const router = express.Router();

router.post('/', (req, res) => {
  const options = {
    method: 'POST',
    uri: 'http://api.kairos.com/recognize',
    headers: {
      'content-type': 'application/json',
      'app_id': process.env.KAIROS_ID,
      'app_key': process.env.KAIROS_KEY
    },
    body: {
      'image': req.body.img,
      'gallery_name': 'facedex'
    },
    json: true
  }
  rp(options) 
    .then((APIresponse) => {
      res.send(APIresponse)
    })
    .catch((err) => {
      return err
    })
})

module.exports = router;
