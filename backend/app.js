const express = require('express')
const app = express()

require('dotenv').config()

app.use('/', require('./routes/SignIn'))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})