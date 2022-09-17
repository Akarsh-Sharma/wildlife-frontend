import {db} from '../db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {collection, query, where} from "firebase/firestore"

// the users from galleryUsers database
const galleryUsers = db.collection('galleryUsers')

// method to add users to the firestore api 
export const UserRegister = async (req, res) => {

    try{
        let data = {userName: req.body.userName, userPassword: req.body.userPassword}
        console.log(data)
        /* for(let i = 0; i < response.length; i++){
            console.log(i)
            if(!(response[i].userName === data.userName)){
                continue; 
            }
            else {
                throw new Error("Username already exists!")
            }
        } */

        const user = await galleryUsers.where('userName', '==', req.body.userName).get()
        user.forEach(doc => {
            if(!(doc.data().userName === data.userName)){
                return; // same as "continue" since forEach does not support breaks
            }
            else { 
                throw new Error("Username already exists!");
            }
        });

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

export const UserLogIn = async (req, res) => {
    // if user exists
    //const user = response.find(user => user.userName === req.body.userName)
    const user = await galleryUsers.where('userName', '==', req.body.userName).get()
    let foundUser;
    user.forEach(doc => {
        foundUser = {userName: doc.data().userName, userPassword: doc.data().userPassword}
        console.log(doc.id, '=>', doc.data());
      });
    if(foundUser == null){
        return res.status(400).send('Cannot find user')
    }
    
    try {
        // if password is valid
        if(await bcrypt.compare(req.body.userPassword, foundUser.userPassword)){
            console.log('Logged in Sucessfully!')
        }
        else{
            console.log("Invalid password!")
        }

    } catch{
        // Handle error
        return res.status(500).send()
    }
    
    // if user has been authenticated we serialize the user using jwt tokens
    const accessToken = jwt.sign(foundUser, process.env.ACCESS_TOKEN_SECRET)
    // if the user is authenticated properly then we will return an access token that contains the 
    // user information
    res.json({accessToken: accessToken});
    console.log(accessToken)
}

export const authenticateToken = async (req, res, next) => {
    const user = response.find(user => user.userName === req.body.userName)
    const dbRef = firebase.database().ref("galleryUsers")
    dbRef.on("value", snap => {
        console.log(snap)
    })
    const authHeader = "Bearer".concat(toString(user.accessToken))
    // if we have authHeader, return token, else return undefined
    const token = authHeader && authHeader.split('')[1] // token portion of bearer header
    // if token is undefined return 401 error code
    if (token == null) return res.sendStatus(401)
    // now we verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user; 
        next(); 
        console.log("TEST3")
    })
}