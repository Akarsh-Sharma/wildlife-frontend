
import cors from "cors";
import "dotenv/config";
import SignIn from "./routes/SignIn.js";
import bodyParser from 'body-parser';
import express from "express";
import {db} from './db.js'

//Initialising Express
const app = express();

// Configuring Express
/* app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.get("/", SignIn); // change this to app.get


// Detect port number from the Node Server or use 5000
const PORT = process.env.PORT || 3001;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));