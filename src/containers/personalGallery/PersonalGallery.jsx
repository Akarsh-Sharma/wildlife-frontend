import React from 'react'
import { useEffect, useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './personalGallery.css'
import { ImageList, ImageListItem } from '@mui/material';



function PersonalGallery() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

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
  return (
    <div>
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