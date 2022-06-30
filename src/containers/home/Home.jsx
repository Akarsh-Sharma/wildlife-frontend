import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();
  return (
    <div>
      
      Home

    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() =>{navigate("/publicGallery");}}>View Gallery</Button>
    </Stack>
    </div>
  );
};

export default Home