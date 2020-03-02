const express = require("express")
const router = express.Router()

const Garage = require('../models/garage')

// Get all garages
router.get('/', async(req, res) => {
    try {
        const garages = await Garage.find()
        res.json(garages)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Get one garage
router.get('/:id', getGarage, async(req, res) => {
    res.json(res.garage)
})

// Create one garage
router.post('/', async(req, res) => {
    const garage = new Garage({
        name: req.body.name,
        location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.lng]
        },
        leader: {
            name: req.body.leader,
            contact: req.body.phone
        },
        deadline: req.body.deadline
    })

    try {
        const newGarage = await garage.save()
        res.status(201).json(newGarage)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Update one garage
router.patch('/:id', getGarage, async(req, res) => {
    if (req.body.name != null) {
        res.garage.name = req.body.name
    }

    if (req.body.leader != null) {
        res.garage.leader.name = req.body.leader
    }

    if (req.body.phone != null) {
        res.garage.leader.contact = req.body.phone
    }

    if (req.body.deadline != null) {
        res.garage.deadline = req.body.deadline
    }

    // ISSUE WHEN LAT SUPPLIED WITHOUT LONG
    if (req.body.lat != null && req.body.lng != null) {
        res.garage.location.coordinates = [req.body.lat, req.body.lng]
    }

    try {
        const updatedGarage = await res.garage.save()
        res.json(updatedGarage)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }
})

// Delete one garage
router.delete('/:id', getGarage, async(req, res) => {
    try {
        await res.garage.remove()
        res.json({
            message: 'Garage has been deleted'
        })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})

async function getGarage(req, res, next) {
    try {
        garage = await Garage.findById(req.params.id)
        if (garage == null) {
            return res.status(404).json({
                message: "Can't find garage"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.garage = garage

    next()
}

module.exports = router