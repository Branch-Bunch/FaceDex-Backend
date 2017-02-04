const dotenv = require('dotenv')
let express = require('express');
const bodyParser = require('body-parser');

const enroll = require('./routes/enroll');
//const recognize = require ('./routes/recognize');

dotenv.config({ silent: true })
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/enroll', enroll);
app.use('/tesst', (req, res) => res.send({ success: true }))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
