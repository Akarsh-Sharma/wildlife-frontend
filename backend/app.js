const express = require('express')
const app = express()
var cors = require("cors")
var BackendSignInRouter = require('./routes/SignIn')

const bodyParser = require("body-parser");
require('dotenv').config()

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());
app.use(cors());
app.use("/", BackendSignInRouter)

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})