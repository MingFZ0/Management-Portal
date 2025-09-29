import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage()
{
  function clickHandler()
  {
    alert('button click')
  }
  return <Button variant="contained" onClick={clickHandler}>Hello world</Button>;
}