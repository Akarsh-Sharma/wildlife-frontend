import express from 'express'
import cors from "cors";
import "dotenv/config";
import SignIn from "./routes/SignIn.js";
import bodyParser from 'body-parser';
const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/", SignIn);


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})