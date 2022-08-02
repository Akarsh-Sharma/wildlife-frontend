import React, {Component} from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from '../personalGallery/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function SignIn(){

  const [response, setResponse] = useState([])
  /* useEffect(() =>{
       fetch("http://localhost:3001/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
       })
  .then(response => response.json())
  .then(response => {setResponse(response)
                })
  }) */
  useEffect(() => {
    const fetchSignedInUserData = async () => {
      const result = await fetch('http://localhost:3001')
      const jsonResult = await result.json()

      setResponse(jsonResult)
      console.log("Sharma")
      
    }

    fetchSignedInUserData()
  }, [])

  const userCollectionRef = collection(db, "galleryUsers");

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  // Sending data to the api from the frontend
  const createUser  = async () => {
      await addDoc(userCollectionRef, {userName: newName, userAge: newAge});
  };

return (  <div className='SignIn'>

        <p>{JSON.stringify(response)}</p>

        <button onClick={createUser}>Create User</button>
        <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
        <input placeholder='Age...' onChange={(event) => {setNewAge(event.target.value)}}/>
    </div>)
}