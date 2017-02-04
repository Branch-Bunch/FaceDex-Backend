let express = require('express');
let rp = require('request-promise')

let router = express.Router();

function enroll(name, img) {
  const options = {
    uri: 'api.kairos.com',
    headers: {
      'app_id': process.env.KAIROS_ID,
      'app_key': process.env.KAIROS_KEY
    },
    body: {
      image: img,
      subject_id: name,
      gallery_name: 'facedex'
    },
    json: true
  }

  rp(options) 
    .then((APIresponse) => {
      res.send(APIresponse)
    })
    .catch((err) => {
      res.send(err)
    })
}

router.post('/', (req, res) => {
	const { name, img, links } = req.params
  enroll(name, img)
})

module.exports = router;
