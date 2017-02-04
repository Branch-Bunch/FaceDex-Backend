let express = require('express');
let rp = require('request-promise')

let router = express.Router();

enroll(name, img) {
  let options = {
    uri: 'api.kairos.com',
    headers: {
      'app_id': process.env.KAIROS_ID,
      'app_key': process.env.KAIROS_KEY
    },
    body: {
      image: img,
      subject_id: name,
      gallery_name: 'facedex'
    }
    json: true
  }

  rp(options) {
    .then((APIresponse) => {
      res.send(APIresponse)
    })
    .catch((err) => {
      res.send(err)
    })
  }
}

router.post('/enroll', function(req, res, next) {
	let name = req.param('name', null)
  let img = req.param('img', null)
	let links = req.param('links', null)
  enroll(name, img)
})

module.exports = router;
