import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";
import PersonalGallery from "./containers/personalGallery/PersonalGallery";
import PublicGallery from "./containers/publicGallery/PublicGallery";
import Profile from "./containers/profile/Profile";
import Navbar from './components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function App() {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if(imageUpload==null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      })
      
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
      <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url) => {
        return <img src = {url} />
      })}
      <Router> 
      {  /* Whatever is written between outside the <Routes> tag will be shown on every page. */ }

        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/personalGallery' element={<PersonalGallery/>} />
          <Route path='/publicGallery' element={<PublicGallery/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
