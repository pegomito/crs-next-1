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


export default function TasksCargo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');	
  const [openDialog, setOpenDialog] = useState({open: false});
  const [loadingSave, setLoadingSave] = useState(false);
  
  const buscarCargo = async () => {
      try {
        const response = await api.get('/cargos')
        setTasks(response.data.data);
      } catch (error) {
        
      }
    }
  useEffect(() => {
    buscarCargo();
  }, [])

  // const filteredTasks = tasks.filter(task =>
  //   task.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredTasks = tasks.filter(task =>
    task.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;   
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const criarTask = async () => {
    
    console.log("Form Values:", formValues); 

    if (!input.trim()) {
      alert("Nada foi digitado");
      return;
    }

    try {
      // if (editIndex !== null) {

      //   const tasksAtualizado = tasks.map((task, i) =>
      //     i === editIndex ? input : task
      //   );
      //   setTasks(tasksAtualizado);
      //   setEditIndex(null); 
      // } 
        
        //setTasks([...tasks, input]);
        const response = await api.post('/cargos', {
          descricao: formValues.descricao,
        });
    
        toaster.create({
          title: "Cargo criado com sucesso",
          description: `Cargo ${formValues.descricao} foi criado.`,
          type: "success",
        });
    
        await buscarCargo(); 
        setOpenDialog({ open: false }); 
      } catch (error) {
        toaster.create({
          title: "Erro ao criar cargo",
          description: `Erro = ${error.message}`,
          type: "error",
        });
      }
  };  

  // const editarTask = async ({

  // }) => {
   
  //   // setInput(tasks[index]); 
  //   // setEditIndex(index); 
  // };

  const editarCargo = async (task) => {
    if (!task.descricao.trim()) {
      alert("O campo de descrição está vazio.");
      return;
    }
  
    try {
      const response = await api.patch(`/cargos/${task.id}`, {
        descricao: task.descricao, 
      });
  
      const tasksAtualizado = tasks.map((t) =>
        t.id === task.id ? { ...t, descricao: task.descricao } : t
      );
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Cargo foi atualizado com sucesso!",
        description: `Cargo foi atualizado para ${task.descricao}`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar cargo",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };

  // const excluirTask = (index) => {
  //   const taskExcluido = tasks.filter((_, i) => i !== index);
  //   setTasks(taskExcluido);
    
  // };

  const excluirCargo = async (id) => {
    try {
      await api.delete(`/cargos/${id}`);

      const tasksAtualizado = tasks.filter((task) => task.id !== id);
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "cargo excluído com sucesso",
        description: `cargo com ID ${id} foi removido.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "erro ao excluir cargo",
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
         <Heading mb={12} gapX={2} display='flex'> CRUD Cargos <MdMoreTime/></Heading>
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
                { name: "descricao", placeholder: "Ex: Pipoqueiro Sênior" },
              ]}
              submit={(formValues) => criarTask(formValues)}
              editIndex={editIndex}
              loadingSave={loadingSave}
              open={openDialog}
              setOpen={setOpenDialog} />
          </GridItem>
      </Grid>
      </Flex>
      <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* <TabelaCrudOriginal
          items={tasksAtuais}
          onEdit={editarTask}
          onDelete={excluirTask}
          acoes={true}
           headers={[
            'ID',
            'Descrição'
          ]}
        /> */}
        <TabelaCrudAll
          items={tasksAtuais}
          headers={[
            { key: "id", label: "ID" },
            { key: "descricao", label: "Descrição" },
          ]}
          onEdit={editarCargo}
          onDelete={excluirCargo}
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