import React from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from '../personalGallery/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function SignIn() {
    // reference to our firestore database collection
    const userCollectionRef = collection(db, "galleryUsers");

    // Creating a new user and writing it to our fiurestore database. 
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const createNewUser = async () => {
        // adding the new user to our firestore user collection
        await addDoc(userCollectionRef, {name: newName, age: newAge});
    };

  return (
    <div>
        <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
        <input placeholder='Age...' onChange={(event) => {setNewAge(event.target.value)}}/>
        <button onClick={createNewUser}> Create User</button>
    </div>
  )
}

export default SignIn