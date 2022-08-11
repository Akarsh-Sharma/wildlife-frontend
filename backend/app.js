
import cors from "cors";
import "dotenv/config";
import bodyParser from 'body-parser';
import express from "express";
import {db} from './db.js'
import UserSignInRouter  from "./routes/UserSignInRouter.js";
import ShowUsersRouter from "./routes/ShowUsersRouter.js";

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
app.get("/", ShowUsersRouter); 
app.post("/", UserSignInRouter);


// Detect port number from the Node Server or use 3001
const PORT = process.env.PORT || 3001;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));