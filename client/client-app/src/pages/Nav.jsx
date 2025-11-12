import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Link } from 'react-router';

import "./Nav.css";
// import "./nav.css";

export default function Nav(props) {
  let  data = props.links;
  return (
    <Box sx={{ flexGrow: 1, mb:1}}>
      <AppBar position="static" className='appBar'>
        <Toolbar sx={{m:0}} className='toolBar'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 , marginRight: "90%"}}>
            <DensityMediumIcon/>
          </IconButton> 
        {
          data.map (item =>{ return (
          <Typography key={item.label} variant="h7" component="div" sx={{ flexGrow: 1 }}> 
          <Link style={{color:"white"}} to={item.url}>{item.label}</Link>
          </Typography>
          )})
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
