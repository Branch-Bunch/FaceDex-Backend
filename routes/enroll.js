const express = require('express');
const rp = require('request-promise')
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body)
  const options = {
    method: 'POST',
    uri: 'http://api.kairos.com/enroll',
    headers: {
      'content-type': 'application/json',
      'app_id': process.env.KAIROS_ID,
      'app_key': process.env.KAIROS_KEY
    },
    body: {
      'image': req.body.image,
      'subject_id': req.body.name,
      'gallery_name': 'facedex'
    },
    json: true
  }
  rp(options) 
  .then((APIresponse) => {
    if(APIresponse.Errors){
      response = {
        success: false,
        error: APIresponse.Errors[0].Message
      }
    } else{
      response = {
        success: true,
        error: null
      }
    }
      res.send(response)
    })
    .catch((err) => {
      return err
    })
})

module.exports = router;
