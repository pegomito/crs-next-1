import { Dialog, Button, Input, Stack, Text } from "@chakra-ui/react";

export default function EditDialog({ isOpen, onClose, item, headers, onSave }) {
  const handleSave = () => {
    onSave(item);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Editar Registro</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          {item &&
            headers.map((header) => (
              <Stack key={header.key} mb={4}>
                <Text>{header.label}</Text>
                <Input
                  value={item[header.key] || ""}
                  onChange={(e) =>
                    onSave({
                      ...item,
                      [header.key]: e.target.value,
                    })
                  }
                />
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