import React from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './personalGallery.css'
import { collapseClasses, ImageList, ImageListItem } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';


function PersonalGallery() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // reference to our firestore database collection
  const userCollectionRef = collection(db, "galleryUsers");

  const uploadImage = () => {
    if(imageUpload==null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
      
    });
  };

  // uploading the imageList in the "images/" folder on our firebase storage to our react app
  useEffect(() => {
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          })
        })
      })
  }, []);   

  // Configuring CRUD (Create, Read, Update, Delete) operations for our firestore database
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    // Step 1: create an asynchronous function
    // Everytime you make a request to an API it will always return a promise which is
    // just data that needs to be resolved. 
    // Whenever you make an API call in JavaScript you need to use async keyword or .then/.catch notation. 
    
    // creating the async function
    const getUsers = async() => {
      const data = await getDocs(userCollectionRef);
      // returning our data in a readable format
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsers(); 
  }, [])

  return (
    <div>
      <div className='Main-header'> Your Gallery </div>
      {users.map((user) => {
        return ( 
          <div>
            <h1> Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
          </div>
        )
      })}

      <div className='Image-List'>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {imageList.map((url) => (
          <ImageListItem key={url}>
            <img
              src={`${url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      </div>
      <input type="file" onChange={(event) => {
        setImageUpload(event.target.files[0])
        console.log(event.target.files[0].name);
        }
      }/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  )
}

export default PersonalGallery;