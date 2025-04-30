'use client';
import {
  Button,
  Dialog,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export default function ExampleDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorScheme="teal">Abrir Diálogo</Button>
      </Dialog.Trigger>

      <Dialog.Backdrop bg="blackAlpha.600" />

      <Dialog.Positioner>
        <Dialog.Content borderRadius="md" boxShadow="lg" bg="white" maxW="md" p={4}>
          <Dialog.CloseTrigger asChild>
            <Button position="absolute"  size="sm">
              X
            </Button>
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title>
              <Heading size="md">Seja bem vindo ao Cinema dos Crias!</Heading>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text>Esse é o conteúdo do corpo do diálogo.</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Dialog.CloseTrigger asChild>
                <Button variant="ghost"></Button>
              </Dialog.CloseTrigger>
              <Button colorScheme="teal">Confirmar</Button>
            </Box>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}