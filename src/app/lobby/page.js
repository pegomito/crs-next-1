"use client";

import { Box, Stack, Avatar, Button, Heading, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Lobby() {
  const router = useRouter();

  const cruds = [
    {
      title: "CRUD Usuários",
      description: "Gerencie os usuários do sistema.",
      avatar: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_hybrid&w=740",
      route: "/tasksUsuario",
    },
    {
      title: "CRUD Filmes",
      description: "Gerencie os filmes disponíveis.",
      avatar: "https://img.freepik.com/fotos-premium/carretel-de-filme-de-oculos-3d-de-pipoca-voadora-e-ripa-em-fundo-amarelo-conceito-de-filme-de-cinema-3d_989822-1302.jpg?semt=ais_hybrid&w=740",
      route: "/tasksFilme",
    },
    {
      title: "CRUD Cargos",
      description: "Gerencie os cargos disponíveis.",
      avatar: "https://api.aecweb.com.br/cls/anuncios/pes_31998/ford_cargo_1723_gran.webp",
      route: "/tasksCargo",
    },
    {
      title: "Crud Salas",
      description: "Gerencie as  salas disponíveis.",
      avatar: "https://guiaderodas.com/wp-content/uploads/2018/05/cinema.jpg",
      route: "/tasksSala",
    },
    {
      title: "CRUD Sessões",
      description: "Gerencie as sessões disponíveis.",
      avatar: "https://media.istockphoto.com/id/497857462/pt/foto/pipoca-no-balde.jpg?s=612x612&w=0&k=20&c=N1eoQKVmQWslRdLAS0WaM-TjmZXMurU8DolTgOPCv_Y=",
      route: "/tasksSessao",
    },
  ];

  return (
    <Box
      p={8}
      borderRadius="md"
      boxShadow="lg"
      maxW="1200px"
      mx="auto"
      mt={12}
      textAlign="center"
    >
      <Heading mb={6} fontSize="3xl" >Lobby dos CRUD</Heading>
      <Stack gap="4" direction="row" wrap="wrap" justify="center">
        {cruds.map((crud, index) => (
          <Box
            key={index}
            width="320px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
          >
            <Stack spacing={4} align="center">
            <Image boxSize="100px" src={crud.avatar} alt={crud.title} />
              <Heading size="md">{crud.title}</Heading>
              <Text>{crud.description}</Text>
              <Button
                colorScheme="teal"
                onClick={() => router.push(crud.route)}
              >
                Acessar
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}