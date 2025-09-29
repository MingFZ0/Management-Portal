import { Box, Card, CardHeader, CardContent, CardActions, Button, Typography, autocompleteClasses } from '@mui/material';
import { useState } from 'react';

import coverImg from "../assets/coverImg.png";
import "./Welcome.css";

export function Welcome()
{
    return(
        <Box sx={{marginLeft:20, marginRight:20}}>
            <Typography variant='h3' className='welcomeText'>Welcome to Pharamacy HR Header Quarters</Typography>
            <img src={coverImg} className='coverImg'></img>
            <Card className="welcomeDescriptionCard">
                <CardContent className="welcomeDescription">This is the HR department of the Pharmaceutical. To get started, consider clicking on the records link on the navigation bar.</CardContent>
            </Card>
        </Box>
    )
}