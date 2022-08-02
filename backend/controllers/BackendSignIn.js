import { collection, getDocs, addDoc, QuerySnapshot } from 'firebase/firestore';
import {db} from '../db.js';


// Get all the signed in users from the api and display it on the backend server
export const SignIn = async (req, res) => {
    try{
        let query = db.collection('galleryUsers');
        let response = []; 

        await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs; // result of the query

            for(let doc of docs) {
                const selectedItem = {
                    userAge: doc.data().userAge,
                    userName: doc.data().userName
                };
                response.push(selectedItem);
            }
            return response; // because then should return an item
        })
        // Sucessfully queried data
        return res.status(200).send(response);
    }
    catch(error){
        // Handle error
            console.log(error);
            return res.status(500).send(error);
    }
    // "return" prevents app from crashing by not allowing more than one res.send
};