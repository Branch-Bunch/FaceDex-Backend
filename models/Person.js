const mongoose = require('mongoose')

const Schema = mongoose.Schema

const githubSchema = new Schema({
  handle: { type: String, required: true },
  url: { type: String, required: true }
})
const PersonSchema = new Schema({
  name: { type: String, required: true },
  github: { type: githubSchema, required: true } 
})

const Person = mongoose.model('Person', PersonSchema, 'Person')

module.exports = Person
