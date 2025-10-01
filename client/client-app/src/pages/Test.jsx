import { Box, Card, CardHeader, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useState } from 'react';


export function Test()
{
    return(
        <Box sx={{margin:20}}>
            <Typography variant='h2'>Test</Typography>
            <Card>
                <CardHeader>Welcome to the ...</CardHeader>
                <CardContent>It's a great place to have hang out and eat</CardContent>
                <CardActions><Button variant='contained'>Ok</Button></CardActions>
            </Card>
        </Box>
    )
}