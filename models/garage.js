const mongoose = require('mongoose')

const garageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    leader: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{11}/.test(v);
                },
                message: '{VALUE} is not a valid 11 digit number!'
            },
            required: [true, 'User phone number required']
        },

    },
    deadline: {
        // using 24hr time. eg 18 means 6pm
        type: Number,
    }

})

module.exports = mongoose.model("Garage", garageSchema)