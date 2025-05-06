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



export default function TasksSala() {
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

  const buscarSala = async () => {
      try {
        const response = await api.get('/salas')
        setTasks(response.data.data);
      } catch (error) {
        
      }
    }
  useEffect(() => {
    buscarSala();
  }, [])

  const criarTask = async () => {
    if (!input.trim()) {
      alert("Nada foi digitado");
      return;
    }

    try {
      if (editIndex !== null) {

        const tasksAtualizado = tasks.map((task, i) =>
          i === editIndex ? input : task
        );
        setTasks(tasksAtualizado);
        setEditIndex(null); 
      } 
        
        //setTasks([...tasks, input]);
        const response = await api.post('/salas', {
          nome: input
        });
        toaster.create({
          title: "Sala criado com sucesso",
          description: `Sala ${input} foi criado `,
          type: "success",
        });
        await buscarCargo();
        setOpenDialog({open: false});
    } catch (error) {
      toaster.create({
        title: "Erro ao criar Sala",
          description: `Erro = ${error}`,
          type: "error",
      });
    }

    setInput("");
  };  

  // const editarTask = async ({

  // }) => {
   
  //   // setInput(tasks[index]); 
  //   // setEditIndex(index); 
  // };

  const editarSala = async (task) => {
    if (!task.observacao.trim()) {
      alert("O campo de observacao está vazio.");
      return;
    }
  
    try {
      const response = await api.patch(`/salas/${task.id}`, {
        nome: task.nome, 
      });
  
      const tasksAtualizado = tasks.map((t) =>
        t.id === task.id ? { ...t, nome: task.nome } : t
      );
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Sala foi atualizado com sucesso!",
        description: `Sala foi atualizado para ${task.nome}`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar Sala",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };

  // const excluirTask = (index) => {
  //   const taskExcluido = tasks.filter((_, i) => i !== index);
  //   setTasks(taskExcluido);
    
  // };

  const excluirSala = async (id) => {
    try {
      await api.delete(`/salas/${id}`);

      const tasksAtualizado = tasks.filter((task) => task.id !== id);
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Sala excluído com sucesso",
        description: `Sala com ID ${id} foi removido.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "erro ao excluir Sala",
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
            input={input}
            setInput={setInput}
            submit={criarTask}
            editIndex={editIndex}
            loadingSave={loadingSave}
            setOpen={setOpenDialog}
            open={openDialog}
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
            { key: "idCargo", label: "ID Cargo"}
          ]}
          onEdit={editarSala}
          onDelete={excluirSala}
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