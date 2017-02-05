const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const enroll = require('./routes/enroll')
const recognize = require ('./routes/recognize')
const remove = require('./routes/remove')

const app = express();

dotenv.config({ silent: true })
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = Promise

const PORT = process.env.PORT

app.use(bodyParser.json({limit: '500mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/enroll', enroll)
app.use('/recognize', recognize)
app.use('/remove', remove)
app.use('/test', (req, res) => res.send({ success: true }))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
