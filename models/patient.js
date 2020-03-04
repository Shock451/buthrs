const mongoose = require('mongoose')
const personSchema = require("./person")

const patientSchema = new mongoose.Schema(personSchema)

module.exports = mongoose.model("Patient", patientSchema) 