"use client";
// import TabelaCrudOriginal from "@/components/TabelaCrudOriginal";
import TabelaCrudAll from "@/components/TabelaCrudAll";
import InputCreate from "@/components/InputCreate";
import api from "@/utils/axios";
import { toaster } from "@/components/ui/toaster"
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import React, { useState, useEffect } from "react";
import InputPesquisa from "@/components/InputPesquisa";
import { MdMoreTime } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Pagination,
  ButtonGroup,
  IconButton,
  HStack,
  VStack,
  InputGroup, 
  GridItem,
  Grid,
  createSystem,
  defineConfig, 
  defineLayerStyles  
} from "@chakra-ui/react";



export default function TasksUsuario() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');	
  const [openDialog, setOpenDialog] = useState({open: false});
  const [loadingSave, setLoadingSave] = useState(false);
  
  // const filteredTasks = tasks.filter(task =>
  //   task.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredTasks = tasks.filter(task =>
    task.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;   
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const buscarUsuario = async () => {
      try {
        const response = await api.get('/usuarios')
        setTasks(response.data.data);
      } catch (error) {
        
      }
    }
  useEffect(() => {
    buscarUsuario();
  }, [])

  const criarTask = async (formValues) => {
    console.log("Form Values recebidos em criarTask:", formValues); 
  
    
    if (!formValues.nome || !formValues.cpf || !formValues.email || !formValues.password) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    try {
      const response = await api.post('/usuarios', {
        nome: formValues.nome,
        cpf: formValues.cpf,
        email: formValues.email,
        idCargo: formValues.idCargo || null, 
        password: formValues.password,
        estudante: formValues.estudante === "true", 
      });
  
      console.log("Resposta do backend:", response.data); 
  
      toaster.create({
        title: "Usuário criado com sucesso",
        description: `Usuário ${formValues.nome} foi criado.`,
        type: "success",
      });
  
      await buscarUsuario(); 
      setOpenDialog({ open: false }); 
    } catch (error) {
      console.error("Erro ao criar usuário:", error.response?.data || error.message); 
      toaster.create({
        title: "Erro ao criar usuário",
        description: `Erro = ${error.response?.data?.message || error.message}`,
        type: "error",
      });
    }
  };

  // const editarTask = async ({

  // }) => {
   
  //   // setInput(tasks[index]); 
  //   // setEditIndex(index); 
  // };

  const editarUsuario = async (task) => {
    if (!task.descricao.trim()) {
      alert("O campo de descrição está vazio.");
      return;
    }
  
    try {
      const response = await api.patch(`/usuarios/${task.id}`, {
        nome: task.nome, 
      });
  
      const tasksAtualizado = tasks.map((t) =>
        t.id === task.id ? { ...t, nome: task.nome } : t
      );
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Usuario foi atualizado com sucesso!",
        description: `Usuario foi atualizado para ${task.nome}`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar usuario",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };

  // const excluirTask = (index) => {
  //   const taskExcluido = tasks.filter((_, i) => i !== index);
  //   setTasks(taskExcluido);
    
  // };

  const excluirUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);

      const tasksAtualizado = tasks.filter((task) => task.id !== id);
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Usuario excluído com sucesso",
        description: `Usuario com ID ${id} foi removido.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "erro ao excluir usuario",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };
  
  return (
    <Box 
    p={8}  
    borderRadius="md" 
    boxShadow="lg"
    data-state="open"
    animationDuration="slow"
    animationStyle={{ _open: "slide-fade-in", _closed: "slide-fade-out" }}
    >
      <Flex justifyContent="center">
         <Heading mb={12} gapX={2} display='flex'> CRUD Usuários <MdMoreTime/></Heading>
    </Flex>
    <Flex justifyContent="center">
      <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
      >
        <GridItem rowSpan={3}>  
          <InputPesquisa
            searchTerm={searchTerm}
            SetSeachTerm={setSearchTerm}

          />
        </GridItem>
        <GridItem rowSpan={1}>
            <InputCreate
              fields={[
                { name: "nome", placeholder: "Ex: Joka Maloka", title: "Nome:" },
                { name: "cpf", placeholder: "Ex: 123.456.789-00", title: "CPF:" },
                { name: "email", placeholder: "Ex: sholinmatadordeporco@email.com", title: "Email:" },
                { name: "idCargo", placeholder: "Ex: 1" ,title: "ID Cargo:"},
                { name: "password", placeholder: "Digite uma senha", title: "Senha:" },
                { name: "estudante", placeholder: "É estudante? (true/false)", title: "É estudante?" },
              ]}
              submit={(formValues) => criarTask(formValues)} 
              loadingSave={loadingSave}
              open={openDialog}
              setOpen={setOpenDialog}
            />
        </GridItem>
      </Grid>
      </Flex>
      <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TabelaCrudAll
          items={tasksAtuais}
          headers={[
            { key: "id", label: "ID" },
            { key: "nome", label: "Nome" },
            { key: "cpf", label: "CPF" },
            { key: "email", label: "Email" },
            { key: "idCargo", label: "ID Cargo"},
            { key: "estudante", label: "É estudante?" },
          ]}
          onEdit={editarUsuario}
          onDelete={excluirUsuario}
          acoes={true}
        />
        <Pagination.Root
          count={filteredTasks.length}
          pageSize={itemsPerPage}
          defaultPage={1}
          page={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton onClick={() => setCurrentPage(currentPage - 1)}>
                <MdChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(page) => (
                <IconButton
                  key={page.value}
                  onClick={() => setCurrentPage(page.value)}
                  variant={{ base: "ghost", _selected: "outline" }}
                >
                  {page.value}
                </IconButton>
              )}
            />
            <Pagination.NextTrigger asChild>
              <IconButton onClick={() => setCurrentPage(currentPage + 1)}>
                <MdChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Box>
  );
}