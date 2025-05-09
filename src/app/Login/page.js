'use client'
import { Box, Image, Heading, Text, VStack } from "@chakra-ui/react";
import React from 'react';
import LoginInput from "@/components/LoginInput";
import { Toaster, toaster } from "@/components/ui/toaster"
import axios from "@/utils/axios";
import { useRouter } from 'next/navigation';

export default function LoginPc() {
  const router = useRouter();


  const loginUsuario = async (content) => {
    router.push('/lobby');
    try {
      const response = await axios.post(`/usuario/login`, { ...content });
      if (response.status == 200) {
        toaster.create({
          description: "Login realizado com sucesso! Redirecionando...",
          type: "success",
        });
        

        localStorage.setItem('token', response.data.response);
        router.push('/lobby');
      } else {
        toaster.create({
          description: "Erro ao fazer login!",
          type: "error",
        })
      }
    } catch (error) {
      toaster.create({
        description: "ERROR!",
        type: "error",
      })
    }
  }

  const receberDadosdoFilho = async (content) => {
    await loginUsuario(content)
  };


  return (
    <Box
      w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center" 
      filter="contrast(95%)"
      bgImage={"url(/blawhi.jpg)"}
      bgSize="100% 115%"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box w="50%" display="flex" justifyContent="center" alignItems="center">
        <Image
          w="55%"
          src="https://store.supercell.com/_next/static/media/bs_store_preview_cta_figure.37787d84.png"
          alt="Loading..."
        />
      </Box>

      <Box
        w="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack align="left" >
          <Heading color="white" textAlign="center" as="h1" fontSize={40} fontWeight={600} >
            Bem-Vindo
            <span style={{ fontFamily: "monospace", fontSize: "1.2em", color: "white" }} >!</span>
          </Heading>
          <Text md="6 " fontSize="lg" color="white" opacity={0.8} >
              Ao SGC do Cinema! 
          </Text>
          <LoginInput mandarDadosdofilho={receberDadosdoFilho} />
        </VStack>
      </Box>
      <Toaster />
    </Box>
  );
} 