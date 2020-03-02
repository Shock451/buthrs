require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const garagesRouter = require("./routes/garages")
app.use("/garages", garagesRouter)

app.listen(process.env.PORT, () => console.log(`Server started.\nListening on port ${process.env.PORT}`))