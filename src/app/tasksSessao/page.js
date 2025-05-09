"use client";

import TabelaCrudAll from "@/components/TabelaCrudAll";
import InputCreate from "@/components/InputCreate";
import api from "@/utils/axios";
import { toaster } from "@/components/ui/toaster";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import React, { useState, useEffect } from "react";
import InputPesquisa from "@/components/InputPesquisa";
import { MdMoreTime } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Pagination,
  ButtonGroup,
  IconButton,
  GridItem,
  Grid,
  Input
} from "@chakra-ui/react";

export default function TasksSessao() {
  const [tasks, setTasks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState({ open: false });
  const [loadingSave, setLoadingSave] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    task.filme?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const buscarSessao = async () => {
    try {
      const response = await api.get("/sessoes");
      console.log("Dados recebidos do backend:", response.data);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Erro ao buscar sessões:", error.message);
    }
  };

  useEffect(() => {
    buscarSessao();
  }, []);

  const criarTask = async (formValues) => {
    console.log("Form Values recebidos em criarTask:", formValues);

    // if (!formValues.idSala || !formValues.idFilme || !formValues.dataInicio || !formValues.dataFim) {
    //   alert("Todos os campos obrigatórios devem ser preenchidos.");
    //   return;
    // }

    try {
      const response = await api.post("/sessoes", {
        idSala: formValues.idSala,
        idFilme: formValues.idFilme,
        dataInicio: formValues.dataInicio,
        dataFim: formValues.dataFim,
        preco: formValues.preco || null,
        lugares: formValues.lugares || [],
      });

      console.log("Resposta do backend:", response.data);

      toaster.create({
        title: "Sessão criada com sucesso",
        description: `Sessão para o filme foi criada.`,
        type: "success",
      });

      await buscarSessao();
      setOpenDialog({ open: false });
    } catch (error) {
      console.error("Erro ao criar sessão:", error.response?.data || error.message);
      toaster.create({
        title: "Erro ao criar sessão",
        description: `Erro = ${error.response?.data?.message || error.message}`,
        type: "error",
      });
    }
  };

  const editarSessao = async (task) => {
    console.log("Dados recebidos para edição na API:", task);

    try {
      const response = await api.patch(`/sessoes/${task.id}`, {
        idSala: task.idSala,
        idFilme: task.idFilme,
        dataInicio: task.dataInicio,
        dataFim: task.dataFim,
        preco: task.preco,
        lugares: task.lugares,
      });

      const sessoesAtualizadas = tasks.map((t) =>
        t.id === task.id ? { ...t, ...task } : t
      );
      setTasks(sessoesAtualizadas);

      toaster.create({
        title: "Sessão atualizada com sucesso!",
        description: `Sessão foi atualizada.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar sessão",
        description: `Erro = ${error.message}`,
        type: "error",
      });
    }
  };

  const excluirSessao = async (id) => {
    try {
      await api.delete(`/sessoes/${id}`);

      const sessoesAtualizadas = tasks.filter((task) => task.id !== id);
      setTasks(sessoesAtualizadas);

      toaster.create({
        title: "Sessão excluída com sucesso",
        description: `Sessão com ID ${id} foi removida.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Erro ao excluir sessão",
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
        <Heading mb={12} gapX={2} display="flex">
          CRUD Sessões <MdMoreTime />
        </Heading>
      </Flex>
      <Flex justifyContent="center">
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem rowSpan={3}>
            <InputPesquisa searchTerm={searchTerm} SetSeachTerm={setSearchTerm} />
          </GridItem>
          <GridItem rowSpan={1}>
            <InputCreate
              fields={[
                { name: "idSala", placeholder: "Ex: 1", title: "ID Sala:" },
                { name: "idFilme", placeholder: "Ex: 1", title: "ID Filme:" },
                {
                  name: "dataInicio",
                  placeholder: "Selecione a data e hora",
                  title: "Data Início:",
                  render: () => (
                    <Input
                      type="datetime-local"
                      onChange={(e) => dinamicInput("dataInicio", e.target.value)}
                    />
                  ),
                },
                {
                  name: "dataFim",
                  placeholder: "Selecione a data e hora",
                  title: "Data Fim:",
                  render: () => (
                    <Input
                      type="datetime-local"
                      onChange={(e) => dinamicInput("dataFim", e.target.value)}
                    />
                  ),
                },
                { name: "preco", placeholder: "Ex: 25", title: "Preço:" },
                { name: "lugares", placeholder: "Ex: [1, 2, 3]", title: "Lugares (JSON):" },
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
            { key: "idSala", label: "ID Sala" },
            { key: "idFilme", label: "ID Filme" },
            { key: "dataInicio", label: "Data Início" },
            { key: "dataFim", label: "Data Fim" },
            { key: "preco", label: "Preço" },
            { key: "lugares", label: "Lugares" },
          ]}
          onEdit={editarSessao}
          onDelete={excluirSessao}
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