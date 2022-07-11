import React, {Component} from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from '../personalGallery/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function SignIn(){

  const [response, setResponse] = useState("")
  useEffect(() =>{
       fetch("http://localhost:3001/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"email":"akarsh@gmail.com", "password": "akarsh"})
       })
  .then(res => res.json())
  .then(res => setResponse(res))
  })
return (  <div className='SignIn'>

        <p>{JSON.stringify(response)}</p>
        <p>
          Test
        </p>
    </div>)
}