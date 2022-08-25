import React from 'react'
import { useState } from 'react';


export default function Register() {

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* const authenticatePreExistingUser = async () => {
    
    const userData = { userName: newName, userPassword: newPassword}
    const userResult = await fetch('http://localhost:3001', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
        
        const userResultInJson = await userResult.json(); 
        console.log(userResultInJson);
      } */
  
    // Sending the data of the newly created user to localhost:3001/auth/register
  const sendUserData = async () => {
      //await addDoc(userCollectionRef, {userName: newName, userAge: newAge});
        const userData = {userName: newName, userPassword: newPassword}; 
        
        // fetch localhost:3001/auth/register
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

  return (
    <div>
      <button onClick={sendUserData}>Create User</button>
      <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
      <input placeholder='Password...' onChange={(event) => {setNewPassword(event.target.value)}}/>
    </div>
  )
}

