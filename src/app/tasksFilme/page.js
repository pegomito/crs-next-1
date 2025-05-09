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
import FileUpload from "@/components/FileUpload";

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
  useFileUploadContext, 
} from "@chakra-ui/react";

export default function TasksFilme() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');	
  const [openDialog, setOpenDialog] = useState({open: false});
  const [loadingSave, setLoadingSave] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
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

  const buscarFilme = async () => {
    try {
      const response = await api.get('/filme');
      console.log("Filmes recebidos do backend:", response.data); 
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error.message);
    }
  };

  useEffect(() => {
    buscarFilme();
  }, [])

  const criarTask = async (formValues) => {
    console.log("Valores recebidos no formulário:", formValues);
    console.log("Arquivo selecionado:", uploadedFile);

    if (!formValues.nome || !formValues.descricao || !formValues.autor || !formValues.duracao || !uploadedFile) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", formValues.nome);
      formData.append("descricao", formValues.descricao);
      formData.append("autor", formValues.autor);
      formData.append("duracao", formValues.duracao);
      formData.append("imagemCartaz", uploadedFile);

      const response = await api.post('/filme', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resposta do backend:", response.data);

      toaster.create({
        title: "Filme criado com sucesso",
        description: `Filme ${formValues.nome} foi criado.`,
        type: "success",
      });

      await buscarFilme();
      setOpenDialog({ open: false });
    } catch (error) {
      console.error("Erro ao criar Filme:", error.response?.data || error.message);
      toaster.create({
        title: "Erro ao criar Filme",
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

  const editarFilme = async (task) => {
    if (!task.descricao.trim()) {
      alert("O campo de descrição está vazio.");
      return;
    }
  
    try {
      const response = await api.patch(`/filme/${task.id}`, {
        nome: task.nome, 
      });
  
      const tasksAtualizado = tasks.map((t) =>
        t.id === task.id ? { ...t, nome: task.nome } : t
      );
      setTasks(tasksAtualizado);
  
      toaster.create({
        title: "Filme foi atualizado com sucesso!",
        description: `Filme foi atualizado para ${task.nome}`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar Filme",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };

  // const excluirTask = (index) => {
  //   const taskExcluido = tasks.filter((_, i) => i !== index);
  //   setTasks(taskExcluido);
    
  // };

  const excluirFilme = async (id) => {
    try {
      console.log("ID enviado para exclusão:", id);
      await api.delete(`/filme/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      toaster.create({
        title: "Filme excluído com sucesso",
        description: `Filme com ID ${id} foi removido.`,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir filme:", error.message);
      toaster.create({
        title: "Erro ao excluir filme",
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
         <Heading mb={12} gapX={2} display='flex'> CRUD Filmes <MdMoreTime/></Heading>
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
      { name: "nome", placeholder: "Ex: Oppenheimer", title: "Título:" },
      { name: "descricao", placeholder: "Ex: O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas dur...", title: "Sinopse:" },
      { name: "autor", placeholder: "Ex: Diretor", title: "Diretor:" },
      { name: "duracao", placeholder: "Ex: 180 (em minutos)", title: "Duração:" },
      {
        name: "imagemCartaz",
        title: "Imagem:",
        type: "file",
        render: () => (
          <FileUpload
            onFileSelect={(file) => setUploadedFile(file)} 
          />
        ),
      },
    ]}
    submit={(formValues) => criarTask(formValues)}
    loadingSave={loadingSave}
    open={openDialog}
    setOpen={setOpenDialog}
    header
  />
</GridItem>
      </Grid>
      </Flex>
      <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TabelaCrudAll
          items={tasksAtuais} 
          headers={[
            { key: "id", label: "ID" },
            { key: "nome", label: "Título" },
            { key: "descricao", label: "Sinopse" },
            { key: "autor", label: "Diretor" },
            { key: "duracao", label: "Duração (min)" },
            {
              key: "imagemCartaz",
              label: "Imagem",
              render: (item) => item.imagemCartaz,
            }
          ]}
          onEdit={editarFilme}
          onDelete={excluirFilme}
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