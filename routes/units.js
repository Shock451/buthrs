const express = require("express")
const router = express.Router()

const Unit = require('../models/unit')
const Patient = require('../models/patient')

// Get all units
router.get('/', async (req, res) => {
    try {
        const unit = await Unit.find()
        res.json(unit)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Get one unit
router.get('/:id', getUnit, async (req, res) => {
    res.json(res.unit)
})

// Create one unit
router.post('/', getPersons, async (req, res) => {
    const unit = new Unit({
        name: req.body.name,
        head: res.members[0],
        others: res.members
    })

    try {
        const newUnit = await unit.save()
        res.status(201).json(newUnit)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Update one unit
router.patch('/:id', getUnit, async (req, res) => {
    if (req.body.name != null) {
        res.patient.name = req.body.name
    }

    if (req.body.card != null) {
        res.patient.card = req.body.card
    }

    if (req.body.matric != null) {
        res.patient.matric = req.body.matric
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
        const updatedUnit = await res.unit.save()
        res.json(updatedUnit)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }
})

// Delete one unit
router.delete('/:id', getUnit, async (req, res) => {
    try {
        await res.unit.remove()
        res.json({
            message: 'Patient has been deleted'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getUnit(req, res, next) {
    try {
        unit = await Unit.findById(req.params.id)
        if (unit == null) {
            return res.status(404).json({
                message: "Can't find unit"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.unit = unit

    next()
}

async function getPersons(req, res, next) {
    const query = {
        id: req.body.head_id
    }
    try {
        members = await Patient.find(query)
        if (members == null) {
            return res.status(404).json({
                message: "Can't find any member"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.members = members

    next()
}

module.exports = router