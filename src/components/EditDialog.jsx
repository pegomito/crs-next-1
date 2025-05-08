import { Dialog, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function EditDialog({ isOpen, onClose, item, headers, onSave }) {
  const [localItem, setLocalItem] = useState({});

  useEffect(() => {
    if (item) {
      console.log("Item recebido no EditDialog:", item);
      setLocalItem(item); // Inicializa o estado local com o item recebido
    }
  }, [item]);

  const handleSave = () => {
    console.log("Dados enviados para salvar:", localItem); // Depuração
    onSave(localItem); // Envia o item atualizado para o componente pai
    onClose(); // Fecha o Dialog
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Editar Usuário</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          {headers.map((header) => (
            <Stack key={header.key} mb={4}>
              <Text>{header.label}</Text>
              {header.key === "id" ? (
                <Text>{localItem[header.key]}</Text> // Exibe o ID como texto somente leitura
              ) : header.key === "estudante" ? (
                <Input
                  value={localItem[header.key] ? "Sim" : "Não"} // Exibe "Sim" ou "Não"
                  isReadOnly // Torna o campo somente leitura
                />
              ) : (
                <Input
                  value={localItem[header.key] || ""}
                  onChange={(e) =>
                    setLocalItem((prev) => ({
                      ...prev,
                      [header.key]: e.target.value,
                    }))
                  }
                />
              )}
            </Stack>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={handleSave}>
            Salvar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}