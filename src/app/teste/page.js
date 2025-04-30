// 'use client';
// import React, { useState } from 'react';

// export default function Teste() {
//     const[oi, setOi] = useState('oi');
//     setOi('tchau');

//   return (
//     <div>
//       <h1 style={{ color: 'red' }} 

//       >Teste</h1>
//       <p>Teste</p>
//     </div>
//   );
// }

'use client'
import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}   
export default Demo;