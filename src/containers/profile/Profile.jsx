import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

function Profile() {

  let navigate = useNavigate(); 
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={() => navigate('/personalGallery')}>Go to Personal Gallery</Button>
    
    </Stack>
  );
}

export default Profile