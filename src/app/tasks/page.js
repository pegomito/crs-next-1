"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Text,
  Pagination,
  ButtonGroup,
  IconButton,
  HStack,
  VStack,
  InputGroup
} from "@chakra-ui/react";

import { MdEdit, MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); 
  const [search, setSearch] = useState("");

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage; 
  const tasksAtuais = tasks.slice(indexPrimeiroItem, indexUltimoItem)

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(search.toLowerCase())
  );

  const criarTask = () => {
    if (!input.trim()) {
      alert("Nada foi digitado");   
      return;
    }
    setTasks([...tasks, input]);
    setInput("");
  };

  const excluirTask = (index) => {
    const taskExcluido = tasks.filter((_, i) => i !== index);
    setTasks(taskExcluido);
  };

  const editarTask = (index) => {
    setEditIndex(index); 
  };

  const salvarEdicao = (index, novoValor) => {
    if (!novoValor.trim()) {
      return;
    }
    const tasksAtualizado = tasks.map((task, i) => {
      if (i === index) {
        return novoValor; 
      }
      return task;
    });
    setTasks(tasksAtualizado);
    setEditIndex(null); 
  };

  return (
    <Box p={8} bg="gray.100" borderRadius="md" boxShadow="lg">
        <Heading mb={4}>Lista de Tarefas
      <FiActivity />
      </Heading>
  <Input 
    placeholder="Pesquisar Tarefa" 
    variant="outline"     
    backgroundColor="white"   
    mb={4} 
    value={search} 
    onChange={(e) => setSearch(e.target.value)}
  />
      <Flex mb={4}>
        <Input
          p={5}
          variant="outline"
          mr={3}
          placeholder="Qual sua Tarefa do dia?"
          value={input}
          onChange={(valor) => setInput(valor.target.value)}
        />
        <Button onClick={criarTask}>Adicionar</Button>
      </Flex>
      <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Table.Root width="50%" mr={3} borderRadius="md" boxShadow="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight="bold" textStyle="md">Tarefa</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="bold" textStyle="md">Editar/Cancelar</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
          {tasksAtuais.map((task, i) => (
              <Table.Row key={i} striped>
                <Table.Cell>
                  {editIndex === i + indexPrimeiroItem ? ( 
                    <Input
                      value={task}
                      onChange={(e) => {
                        const tasksAtualizado = [...tasks];
                        tasksAtualizado[i + indexPrimeiroItem] = e.target.value; 
                        setTasks(tasksAtualizado);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          salvarEdicao(i + indexPrimeiroItem, e.target.value); 
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <Text fontWeight="bold">{task}</Text>
                  )}
                </Table.Cell>


                <Table.Cell textAlign="center" fontWeight="bold">
                  <Stack direction="row" spacing={4}>
                    <Button
                      variant="outline"
                      onClick={() => editarTask(i + indexPrimeiroItem)}
                    >
                      <MdEdit color="blue" size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => excluirTask(i + indexPrimeiroItem)} 
                    >
                      <FaDeleteLeft color="red" size={20} />
                    </Button>
                  </Stack>
                </Table.Cell>
              </Table.Row>
            ))} 
          </Table.Body>
        </Table.Root>
        <Pagination.Root 
          count={tasks.length} 
          pageSize={itemsPerPage} 
          defaultPage={1}
          page={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <MdChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton 
                  onClick={() => setCurrentPage(page.value)} 
                  variant={{ base: "ghost", _selected: "outline" }}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <MdChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Box>
  );
}