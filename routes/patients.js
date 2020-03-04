const express = require("express")
const router = express.Router()

const Patient = require('../models/patient')

// Get all patients
router.get('/', async(req, res) => {
    try {
        const patient = await Patient.find()
        res.json(patient)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Get one patient
router.get('/:id', getPatient, async(req, res) => {
    res.json(res.patient)
})

// Create one patient
router.post('/', async(req, res) => {
    const patient = new Patient({
        name: req.body.name,
        category: req.body.category,
        card: req.body.card,
        id: req.body.id,
        address: req.body.address,
        marital: req.body.marital,
        age: req.body.age,
        occupation: req.body.occupation,
        contact: req.body.contact,
        nok: {
            name: req.body.nok_name,
            address: req.body.nok_address,
            contact: req.body.nok_contact
        },
        additional: req.body.additional,
        vitals: {
            sugarlevel: req.body.sugarlevel,
            temperature: req.body.temperature,
            BMI: req.body.BMI,
            respiratory: req.body.respiratory,
            pulse: req.body.pulse,
            height: req.body.height
        },
        medicals: {
            genotype: req.body.genotype,
            bloodgroup: req.body.bloodgroup,
            allergies: req.body.allergies,
            asthmatic: req.body.asthmatic,
            handicap: req.body.handicap,
            addiction: req.body.addiction,
        }, 
        medicalhistory: []
    })

    try {
        const newPatient = await patient.save()
        res.status(201).redirect('/person/' + req.body.category)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Update one patient
router.patch('/:id', getPatient, async(req, res) => {
    if (req.body.name != null) {
        res.patient.name = req.body.name
    }

    if (req.body.category != null) {
        res.patient.category = req.body.category
    }

    if (req.body.card != null) {
        res.patient.card = req.body.card
    }

    if (req.body.id != null) {
        res.patient.id = req.body.id
    }
        
    if (req.body.address != null) {
        res.patient.address = req.body.address
    }

    if (req.body.marital != null) {
        res.patient.marital = req.body.marital
    }

    if (req.body.age != null) {
        res.patient.age = req.body.age
    }

    if (req.body.contact != null) {
        res.patient.contact = req.body.contact
    }

    if (req.body.occupation != null) {
        res.patient.occupation = req.body.occupation
    }

    if (req.body.nok_name != null) {
        res.patient.nok.name = req.body.nok_name
    }

    if (req.body.nok_address != null) {
        res.patient.nok.address = req.body.nok_name
    }

    if (req.body.nok_contact != null) {
        res.patient.contact = req.body.nok_name
    }

    if (req.body.additional != null) {
        res.patient.additional = res.patient.additional.push(req.body.additional)
    }

    if (req.body.sugarlevel != null) {
        res.patient.vitals.sugarlevel = req.body.sugarlevel
    }

    if (req.body.temperature != null) {
        res.patient.vitals.temperature = req.body.temperature
    }

    if (req.body.BMI != null) {
        res.patient.vitals.BMI = req.body.BMI
    }

    if (req.body.respiratory != null) {
        res.patient.vitals.respiratory = req.body.respiratory
    }

    if (req.body.pulse != null) {
        res.patient.vitals.pulse = req.body.pulse
    }

    if (req.body.height != null) {
        res.patient.vitals.height = req.body.height
    }
    
    if (req.body.genotype != null) {
        res.patient.medicals.genotype = req.body.genotype
    }

    if (req.body.bloodgroup != null) {
        res.patient.medicals.bloodgroup = req.body.bloodgroup
    }

    if (req.body.allergies != null) {
        updated_allergies = [req.body.allergies].concat(res.patient.medicals.allergies)
        res.patient.medicals.allergies = updated_allergies
    }

    if (req.body.asthmatic != null) {
        res.patient.medicals.asthmatic = req.body.asthmatic
    }

    if (req.body.handicap != null) {
        res.patient.medicals.handicap = req.body.handicap
    }

    if (req.body.addictions != null) {
        updated_addictions = [req.body.addictions].concat(res.patient.medicals.addictions)
        res.patient.medicals.addictions = updated_addictions
    }

    if (req.body.medicalhistory != null) {
        const history = {
            pastillness: req.body.pastillness,
            familyhealthhistory: req.body.familyhealthhistory,
            sti: req.body.pastillness,
            complaints: req.body.complaints,
            diagnosis: req.body.diagnosis,
            recommendatino: req.body.recommendatino,
            treatment: req.body.treatment
        }
        res.patient.medicalhistory = res.patient.medicalhistory.push(history)
    }

    try {
        const updatedPatient = await res.patient.save()
        res.json(updatedPatient)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }
})

// Delete one patient
router.delete('/:id', getPatient, async(req, res) => {
    try {
        await res.patient.remove()
        res.json({
            message: 'Patient has been deleted'
        })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})

async function getPatient(req, res, next) {
try {
        patient = await Patient.findById(req.params.id)
        if (patient == null) {
            return res.status(404).json({
                message: "Can't find patient"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.patient = patient

    next()
}

module.exports = router