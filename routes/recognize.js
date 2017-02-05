const express = require('express');
const rp = require('request-promise')
const mongoose = require('mongoose')
const Person = require('../models/Person')
const router = express.Router();
mongoose.Promise = Promise


router.post('/', (req, res) => {
  const options = {
    method: 'POST',
    uri: 'http://api.kairos.com/recognize',
    headers: {
      'content-type': 'application/json',
      app_id: process.env.KAIROS_ID,
      app_key: process.env.KAIROS_KEY
    },
    body: {
      image: req.body.image,
      gallery_name: 'facedex'
    },
    json: true
  }
  rp(options) 
    .then((APIresponse) => {
      const namesList = APIresponse.images.map(face => {
        return face.transaction.subject_id
      })
      console.log('namesList is: ' + namesList)
      const peoplesList = namesList.map(name => {
        console.log('looking in db for: ' + name)
        Person.findOne({ name })
        .lean()
      })
      console.log(peoplesList)
      res.send(peoplesList)
    })
    .catch((err) => {
      return err
    })
})

module.exports = router;
