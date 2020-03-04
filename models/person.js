const mongoose = require('mongoose')

const mhistorySchema = new mongoose.Schema({
    history: {
        pastillness: {
            type: String
        },
        familyhealthhistory: {
            type: String
        },
        sti: {
            type: String
        },
        complaints: {
            type: String
        },
        diagnosis: {
            type: String
        },
        recommendatino: {
            type: String
        },
        treatment: {
            type: String
        }
    }
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['student', 'nontstaff', 'tstaff', 'community'],
        required: true
    },
    card: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    marital: {
        type: String,
        enum: ['Married', 'Divorced', "Single", ""],
    },
    age: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
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
    nok: {
        name: {
            type: String,
            // required: true
        },
        address: {
            type: String,
            // required: true
        },
        contact: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{11}|^$/.test(v);
                },
                message: '{VALUE} is not a valid 11 digit number!'
            },
            // required: [true, 'User phone number required']
        }

    },
    additional: {
        type: [String]
    },
    vitals: {
        type: {
            sugarlevel: {
                type: Number
            },
            temperature: {
                type: Number
            },
            BMI: {
                type: Number
            },
            respiratory: {
                type: Number
            },
            pulse: {
                type: Number
            },
            height: {
                type: Number
            }
        }, default: {}
    },
    medicals: {
        genotype: {
            type: String
        },
        bloodgroup: {
            type: String
        },
        allergies: {
            type: [String]
        },
        asthmatic: {
            type: String
        },
        handicap: {
            type: String
        },
        addictions: {
            type: [String]
        },
    },
    medicalhistory: {
        type: [mhistorySchema],
        default: null
    }
})

module.exports = personSchema