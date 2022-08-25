import {db} from '../db.js';
import bcrypt from "bcrypt";

// method to add users to the firestore api 
export const UserRegister = async (req, res) => {
    console.log("Akarsh")
    try{
        let data = {userName: req.body.userName, userPassword: req.body.userPassword}
        console.log(data)
        // authentication part for user password before storing info in database
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.userPassword, salt)

        // authenticated user body
        let authenticatedData = {userName: req.body.userName, userPassword: (hashedPassword)}

        let query = db.collection('galleryUsers');
        query.add(authenticatedData);
    }
    catch(error){
        // Handle error
        console.log(error);
        return res.status(500).send(error);
    }
};
