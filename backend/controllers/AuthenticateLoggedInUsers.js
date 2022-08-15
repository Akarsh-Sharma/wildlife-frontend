import {db} from '../db.js';
import bcrypt from "bcrypt";


// method to authenticate user log in by checking hashed password 
// and also to check if user already exists
export const AuthenticateLoggedInUsers = async (req, res) => {
    
    // TESTING PURPOSE
    try{
        let userData = {userName: req.body.userName, userPassword: req.body.userPassword}
        if(userData.userName === "Akarsh"){
            console.log("it works!")
        }
    } catch (error){
        // Handle error
        console.log(error);
        return res.status(500).send(error);
    }
    

};
