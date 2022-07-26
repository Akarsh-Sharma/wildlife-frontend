import React from 'react'
import { useEffect, useState } from 'react';
import { storage, db } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './personalGallery.css'
import { collapseClasses, ImageList, ImageListItem } from '@mui/material';
import { collection, getDocs, addDoc } from 'firebase/firestore';


function PersonalGallery() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // reference to our firestore database collection
  const userCollectionRef = collection(db, "galleryUsers");

  const uploadImage = () => {
    if(imageUpload==null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    console.log("Sharma" + imageRef.getDownloadURL + "Sharmaa")
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // Getting the url for the image firestore api here!
        setImageUrl(JSON.stringify(url))
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
      console.log(data)
      // returning our data in a readable format
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsers(); 
  }, []);

  // Adding image details to image database on firestore when we upload an image
  const imageCollectionRef = collection(db, "galleryImages")
  const [imageName, setImageName] = useState("");
  const [imageDate, setImageDate] = useState(0);
  const [imageUrl, setImageUrl] = useState(""); 


  const sendImageToDatabase  = async () => {
      await addDoc(imageCollectionRef, {imageName: imageName, imageDate: imageDate, imageUrl: imageUrl});
  };


  return (
    <div>
      <div className='Main-header'> Your Gallery </div>
      {users.map((user) => {
        return ( 
          <div>
            <h1> Name: {user.userName}</h1>
            <h1>Age: {user.userAge}</h1>
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
      <button onClick={()=>{uploadImage(); sendImageToDatabase();}}>Upload Image</button>
      <input placeholder='Image Name...' onChange={(event) => {setImageName(event.target.value)}}/>
      <input placeholder='Image Date...' onChange={(event) => {setImageDate(event.target.value)}}/>
    </div>
  )
}

export default PersonalGallery;