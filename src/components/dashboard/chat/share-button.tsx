/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */


import * as React from 'react';
import { Button } from '@mui/material';
import { UpscopeProvider, useUpscope } from '@upscopeio/react';

export default function ShareButton(): React.JSX.Element {

  const upscope = useUpscope();

  return (

    <Button onClick ={()=> { console.log(JSON.stringify(upscope)); }}>
       Share Screen
    </Button>



  );
}
