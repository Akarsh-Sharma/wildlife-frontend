import React from 'react'
import { useState } from 'react';


export default function Login() {

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const authenticatePreExistingUser = async () => {
    
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
      }

  return (
    <div>
      <button onClick={authenticatePreExistingUser}>Create User</button>
      <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
      <input placeholder='Password...' onChange={(event) => {setNewPassword(event.target.value)}}/>
    </div>
  )
}

