const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LinkSchema = new Schema({
  type: { type: String, required: true },
  url: { type: [String], required: false }
})

const PersonSchema = new Schema({
  name: { type: String, required: true },
  links: { type: LinkSchema, required: false } 
})

const Person = mongoose.model('Person', PersonSchema, 'Persons')

module.exports = Person
