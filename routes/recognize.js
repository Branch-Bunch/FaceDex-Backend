const express = require('express');
const rp = require('request-promise')
const Person = require('../models/Person')
const router = express.Router();

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
      if (APIresponse.Errors) {
        res.send({
          people: [],
          error: APIresponse.Errors[0].Message
        })
        return
      }

      const namesList = APIresponse.images.map(face => face.transaction.subject)
      console.log(namesList)
      const peopleList = namesList.map((name) => {
        console.log(name)
        return Person.findOne({ name }).lean()
      })
      return Promise.all(peopleList)
    })
    .then(people => res.send({ people, error: null}))
    .catch(err => res.status(400).send(err))
})

module.exports = router;
