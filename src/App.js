import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";
import PersonalGallery from "./containers/personalGallery/PersonalGallery";
import PublicGallery from "./containers/publicGallery/PublicGallery";
import Profile from "./containers/profile/Profile";
import Navbar from './components/navbar/Navbar';

function App() {

  return (
    
      <Router> 
      {  /* Whatever is written between outside the <Routes> tag will be shown on every page. */ }

        <Navbar></Navbar>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/personalGallery' element={<PersonalGallery/>} />
          <Route path='/publicGallery' element={<PublicGallery/>} />
          <Route path='/Profile' element={<Profile/>} />
        </Routes>
      </Router>
    
  );
}

export default App;
