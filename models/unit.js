const mongoose = require('mongoose')

const personSchema = require("./person")

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    head: {
        type: personSchema,
        required: true
    },
    others: {
        type: [personSchema]
    }
})

module.exports = mongoose.model('Unit', unitSchema)