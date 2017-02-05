const express = require('express');
const rp = require('request-promise')
const Person = require('../models/Person');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, image, github } = req.body
  const options = {
    method: 'POST',
    uri: 'http://api.kairos.com/enroll',
    headers: {
      'content-type': 'application/json',
      'app_id': process.env.KAIROS_ID,
      'app_key': process.env.KAIROS_KEY
    },
    body: {
      'image': image,
      'subject_id': name,
      'gallery_name': 'facedex'
    },
    json: true
  }

  rp(options) 
  .then((APIresponse) => {
    if (APIresponse.Errors) {
      res.send({
        success: false,
        error: APIresponse.Errors[0].Message
      })
      return
    }
    return Person.findOne({ name }).lean()
  })
  .then((person) => {
    if (!person) {
      const newPerson = new Person({
        name,
        github: {
          handle: name,
          url: `https://github.com/${handle}`
        }, 
      })
      return newPerson.save()
    }
    res.send({
      success: true,
      error: null
    })
  })
  .then(() => res.send({
    success: true,
    error: null
  }))
  .catch(err => res.status(400).send(err))
})

module.exports = router;
