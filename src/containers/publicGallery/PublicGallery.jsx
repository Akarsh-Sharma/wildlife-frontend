import React from 'react'
import { ImageListItemBar, ImageList, ImageListItem } from '@mui/material';
import owl from '../../assets/owl.jpg';
import blackcrownednightheron from '../../assets/blackcrownednightheron.jpg';
import bluechestedhummingbird from '../../assets/bluechestedhummingbird.jpg';
import hornbill from '../../assets/hornbill.jpg';
import longtailedducks from '../../assets/longtailedducks.jpg';
import orangefrog from '../../assets/orangefrog.jpg';
import peregrinefalcon from '../../assets/peregrinefalcon.jpg';
import philippine_eagle from '../../assets/philippine_eagle.jpg';
import posiondartfrog from '../../assets/posiondartfrog.jpg';
import white_eagle from '../../assets/white_eagle.jpg';



function PublicGallery() {
  const imageList = 
  [
    {img: owl, title: "owl", }, 
    {img: blackcrownednightheron, title: "blackcrownednightheron", },
    {img: bluechestedhummingbird, title: "bluechestedhummingbird", },
    {img: hornbill, title: "hornbill", },
    {img: longtailedducks, title: "longtailedducks", },
    {img: orangefrog, title: "orangefrog", },
    {img: philippine_eagle, title: "philippine_eagle", },
    {img: peregrinefalcon, title: "peregrinefalcon", },
    {img: posiondartfrog, title: "posiondartfrog", },
    {img: white_eagle, title: "white_eagle", }
  ]
  return (
    <div>
      PublicGallery
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {imageList.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
      </ImageListItem>
  ))}
</ImageList>
    </div>
  )
}

export default PublicGallery