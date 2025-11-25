import { Box, Card, CardHeader, CardContent, CardActions, Button, Typography, autocompleteClasses } from '@mui/material';
import { useState } from 'react';

import coverImg from "../assets/coverImg.png";
import "./Welcome.css";
import { Link } from 'react-router';
import Footer from './footer';
import ChartDisplay from './ChartDisplay';

export function Welcome()
{

    return(
        <Box>
            <Box sx={{marginLeft:20, marginRight:20}}>
                <Typography variant='h3' className='welcomeText'>Welcome to Pharamacy HR Header Quarters</Typography>
                <Typography variant='body1' className='welcomeBody'>
                    This is the HR department of the Pharmaceutical. To get started, consider clicking on the records button below.
                </Typography>
                <img src={coverImg} className='coverImg'></img>
                <div className='buttonGroup'>
                    <div className='actionButton'>
                        <Button variant="contained">
                            <Link style={{color:"white"}} to={"/dashboard"}>Dashboard</Link>
                        </Button>
                    </div>
                    <div className='actionButton'>
                        <Button variant="contained">
                        <Link style={{color:"white"}} to={"/record"}>Record</Link>
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    )
}