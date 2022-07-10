const express = require('express')
const app = express()
var cors = require("cors")
var BackendSignInRouter = require('./routes/SignIn')

require('dotenv').config()

app.use("/", BackendSignInRouter)
app.use(cors());

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})