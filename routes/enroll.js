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
    console.log('aaa')
    if(APIresponse.Errors){
      console.log('123')
      response = {
        success: false,
        error: APIresponse.Errors[0].Message
      }
      console.log('456')
      person = new Person({
        name: name,
        links: []
      })
      console.log('456')
      for (i=0; i>req.body.type.length;i++){
        person.links.push({
          type: req.body.type[i],
          url: req.body.link[i]
        })
      }
      console.log(122223)
      person.save()
    } else{
      response = {
        success: true,
        error: null
      }
    }
      res.send(response)
    })
    .catch((err) => {
      console.log('ERROR')
      res.send(err)
    })
})

module.exports = router;
