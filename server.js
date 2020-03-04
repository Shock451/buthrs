require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

var bodyParser = require('body-parser')

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

// parse application/json
app.use(bodyParser.json())

// parse application/url encoded
app.use(bodyParser.urlencoded({ extended: true }))

// Virtual Path Prefix '/static'
app.use('/static', express.static('public'))

app.use(express.static('public'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('fonts'));
app.use(express.static('vendors'));

const patientsRouter = require("./routes/patients")
app.use("/patients", patientsRouter)

const unitsRouter = require("./routes/units")
app.use("/units", unitsRouter)

const defaultRouter = require("./routes/routes")
app.use("/", defaultRouter)

app.listen(process.env.PORT || 3000, () => console.log(`Server started.\nListening on port ${process.env.PORT || 3000}`))