"use client";

import TabelaCrud from "@/components/TabelaCrud";
import InputCreate from "@/components/InputCreate";

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
  InputGroup,
  GridItem,
  Grid
} from "@chakra-ui/react";

import { MdEdit, MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { BsAlarm } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import InputPesquisa from "@/components/InputPesquisa";
import { MdMoreTime } from "react-icons/md";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');	

  const filteredTasks = tasks.filter(task =>
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // useEffect(() => {
  //   const buscarCargo = async () => {
  //     try {  
  //       const response = await ap
  //     }
  //   }
  // })

  const criarTask = () => {
    if (!input.trim()) {
      alert("Nada foi digitado");
      return;
    }

    if (editIndex !== null) {

      const tasksAtualizado = tasks.map((task, i) =>
        i === editIndex ? input : task
      );
      setTasks(tasksAtualizado);
      setEditIndex(null); 
    } else {
      
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const editarTask = (index) => {
    setInput(tasks[index]); 
    setEditIndex(index); 
  };

  const excluirTask = (index) => {
    const taskExcluido = tasks.filter((_, i) => i !== index);
    setTasks(taskExcluido);
  };

  return (
    <Box p={8}  borderRadius="md" boxShadow="lg">
      <Flex justifyContent="center">
         <Heading mb={12} gapX={2} display='flex'>CRUD Cargos <MdMoreTime/></Heading>
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
          />
        </GridItem>
      </Grid>
      </Flex>
      <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TabelaCrud
          items={tasksAtuais}
          headers={['Tarefa']}
          onEdit={editarTask}
          onDelete={excluirTask}
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