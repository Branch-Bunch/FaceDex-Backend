const express = require('express');
const rp = require('request-promise')
const Person = require('../models/Person');
const router = express.Router();

router.post('/', (req, res) => {
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
    const response = {
      success: true,
      error: null
    }

    if (APIresponse.Errors) {
      response.success = false
      response.error = APIresponse.Errors[0].Message
    }

    res.send(response)

    const person = new person({
      name: name,
      links: []
    })
    for (i=0; i>req.body.type.length;i++){
      person.links.push({
        type:req.body.type[i],
        url:req.body.link[i]
      })
    }
    person.save()
  })
  .catch(err => res.status(400).send(err))
})

module.exports = router;
