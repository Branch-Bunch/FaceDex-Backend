const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PersonSchema = new Schema({
  name: { type: String, required: true },
  links: { type: LinkSchema, required: false } 
})

const LinkSchema = new Schema({
  type: { type: String, required: true },
  url: [{ type: String, required: true }]
})

const Users = mongoose.model('Person', personSchema, 'Persons')

module.exports = Users
