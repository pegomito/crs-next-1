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
    task.observacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;   
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const buscarUsuario = async () => {
      try {
        const response = await api.get('/salas')
        setTasks(response.data.data);
      } catch (error) {
        
      }
    }
  useEffect(() => {
    buscarUsuario();
  }, [])

  const criarTask = async (formValues) => {
    console.log("Form Values recebidos em criarTask:", formValues); // Depuração
  
    if (!formValues.observacao || !formValues.idPadraoLugares) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    try {
      const response = await api.post('/salas', {
        observacao: formValues.observacao,
        idPadraoLugares: formValues.idPadraoLugares,
      });
  
      console.log("Resposta do backend:", response.data); // Depuração
  
      toaster.create({
        title: "Sala criada com sucesso",
        description: `Sala com observação "${formValues.observacao}" foi criada.`,
        type: "success",
      });
  
      await buscarUsuario(); // Atualiza a lista de salas
      setOpenDialog({ open: false });
    } catch (error) {
      console.error("Erro ao criar sala:", error.response?.data || error.message);
      toaster.create({
        title: "Erro ao criar sala",
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
    console.log("Dados recebidos para edição:", task); // Depuração
  
    if (!task.observacao || !task.idPadraoLugares) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    try {
      const response = await api.patch(`/salas/${task.id}`, {
        observacao: task.observacao,
        idPadraoLugares: task.idPadraoLugares,
      });
  
      console.log("Resposta do backend ao editar sala:", response.data); // Depuração
  
      // Atualiza o estado com os dados editados
      const salasAtualizadas = tasks.map((t) =>
        t.id === task.id ? { ...t, ...response.data } : t
      );
      setTasks(salasAtualizadas);
  
      toaster.create({
        title: "Sala atualizada com sucesso!",
        description: `Sala com observação "${task.observacao}" foi atualizada.`,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao editar sala:", error.response?.data || error.message);
      toaster.create({
        title: "Erro ao editar sala",
        description: `Erro = ${error.response?.data?.message || error.message}`,
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
      await api.delete(`/salas/${id}`);

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
         <Heading mb={12} gapX={2} display='flex'> CRUD Salas <MdMoreTime/></Heading>
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
                { name: "observacao", placeholder: "Ex: sala grande" ,title: "Observaco" },
                { name: "idPadraoLugares", placeholder: "Ex: 1", title: "Id Padrão Lugar" },
                
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
            { key: "observacao", label: "observacao" },
            { key: "idPadraoLugares", label: "idPadraoLugares" },
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