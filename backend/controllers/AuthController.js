import {db} from '../db.js';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


// the list of users that have already created an account. 
let response = []; 

let query = db.collection('galleryUsers');
await query.get().then(querySnapshot => {
    let docs = querySnapshot.docs; // result of the query

    for(let doc of docs) {
        const selectedItem = {
            userPassword: doc.data().userPassword,
            userName: doc.data().userName 
        };
        response.push(selectedItem);
    }
    })

// method to add users to the firestore api 
export const UserRegister = async (req, res) => {

    try{
        let data = {userName: req.body.userName, userPassword: req.body.userPassword}
        console.log(data)
        for(let i = 0; i < response.length; i++){
            console.log(i)
            if(!(response[i].userName === data.userName)){
                continue; 
            }
            else {
                throw new Error("Username already exists!")
            }
        }
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
    const user = response.find(user => user.userName === req.body.userName)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    
    try {

        if(await bcrypt.compare(req.body.userPassword, user.userPassword)){
            console.log('TEST2')
        }
        else{
            console.log("TEST")
        }

    } catch{
        // Handle error
        return res.status(500).send()
    }
    
    // if user has been authenticated we serialize the user using jwt tokens
    const jwt = jsonwebtoken; 
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // if the user is authenticated properly then we will return an access token that contains the 
    // user information
    res.json({accessToken: accessToken});
    console.log(accessToken)

}
