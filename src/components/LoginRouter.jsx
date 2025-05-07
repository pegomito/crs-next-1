'use client'
import React, { use } from 'react';
import axios from 'axios';

export default function LoginPc() {
  const router = useRouter();
  const loginUsuario = async (content) => {
    router.push('/cargo');
    try {
      const response = await axios.post('/usuario/login', {...content});
      if (response.status === 200) {
        toaster.create({
          title: 'Login successful',
          description: 'You have successfully logged in.'
        });
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
}