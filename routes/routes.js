const express = require("express")
const router = express.Router()

const Person = require('../models/patient')

function categorize(data) {
    let name = '', url = ''
    switch (data) {
        case 'student': {
            name = "Student"
            url = "student"
            break
        }
        case 'tstaff': {
            name = "Teaching Staff"
            url = "tstaff"
            break
        }
        case 'nontstaff': {
            name = "Non Teaching Staff"
            url = "nontstaff"
            break
        }
        case 'community': {
            name = "Community Member"
            url = "community"
            break
        }
    }

    return { name, url }
}

// Get Homepage
router.get('/', async (req, res) => {
    res.render('index')
})

// Get contact
router.get('/contact', async (req, res) => {
    res.render('contact')
})

// Get about
router.get('/about', async (req, res) => {
    res.render('about')
})


// Get person page
router.get('/person/:category', async (req, res) => {
    const category = categorize(req.params.category)

    try {
        const query = {
            category: category.url
        }
        const persons = await Person.find(query)

        data = persons.map((p) => p.toObject()),

            res.render('person', {
                people: data,
                category: category
            })
    } catch (err) {
        res.status(500).render('error', {
            message: err.message
        })
    }
})

// find person page 
router.get('/person/find/:category', async (req, res) => {
    const category = categorize(req.params.category)
    res.render('findperson', {
        category: category
    })
})

router.post('/person/find/:category', async (req, res) => {
    const category = categorize(req.params.category)

    const query = {
        category: category.url,
        card: req.body.card
    }
    try {
        const patient = await Person.find(query)
        
        data = patient.map((p) => p.toObject()),
        res.render('findperson', {
            category: category,
            patient: data[0]
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

// create person page
router.get('/person/create/:category', async (req, res) => {
    const category = categorize(req.params.category)
    res.render('createperson', {
        category: category
    })
})

// create unit page
router.get('/unit/:category', async (req, res) => {

    let head = '', img = ''
    switch (req.params.category) {
        case 'dentistry': {
            img = "/img/banner/alt1.jpg"
            head = "Dr. Yusuf, Adegbola"
            break
        }
        case 'radiology': {
            img = "/img/banner/alt2.jpg"
            head = "Adams Simbiat"
            break
        }
        case 'surgery': {
            img = "/img/banner/alt1.jpg"
            head = "James Mary"
            break
        }
        case 'medicine': {
            head = "Folarin Mary"
            img = "/img/banner/alt2.jpg"
            break
        }
        case 'laboratory': {
            head = "Abiodun Taiwo"
            img = "/img/banner/alt1.jpg"
            break
        }
    }

    res.render('unit', {
        category: req.params.category.toUpperCase(),
        img: img,
        head: head
    })
})

module.exports = router