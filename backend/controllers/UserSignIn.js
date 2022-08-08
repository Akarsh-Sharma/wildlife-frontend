import {db} from '../db.js';

// method to add users to the firestore api 
export const UserSignIn = async (req, res) => {
    try{
        let data = {userName: req.body.userName, userAge: req.body.userAge}
        console.log(data)
        let query = db.collection('galleryUsers');
        query.add(data);
    }
    catch(error){
        // Handle error
        console.log(error);
        return res.status(500).send(error);
    }
};
