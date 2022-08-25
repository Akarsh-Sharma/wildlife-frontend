import React, {Component} from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from '../personalGallery/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function SignIn(){

  const [response, setResponse] = useState([])
  
  useEffect(() => {
    const fetchSignedInUserData = async () => {
      const result = await fetch('http://localhost:3001')
      const jsonResult = await result.json()

      setResponse(jsonResult)
    }

    fetchSignedInUserData()
  }, [])

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // TO BE CHANGED **
  // Sending data to the api from the frontend
  
  const sendUserData = async () => {
      //await addDoc(userCollectionRef, {userName: newName, userAge: newAge});
        const userData = {userName: newName, userPassword: newPassword}; 
        
        // fetch localhost:3001/auth/SignIn
        const userResult = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
        
        const userResultInJson = await userResult.json(); 
        console.log(userResultInJson);
      }
  

return (  <div className='SignIn'>

        <p>{JSON.stringify(response)}</p>

        <button onClick={sendUserData}>Create User</button>
        <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
        <input placeholder='Password...' onChange={(event) => {setNewPassword(event.target.value)}}/>
    </div>)
}