import { Table, Button, Stack, Tooltip } from "@chakra-ui/react";
import { MdDelete, MdMode } from "react-icons/md";
import { useState } from "react";
import EditDialog from "@/components/EditDialog";

export default function TabelaCrudAll({ items, headers, onEdit, onDelete, acoes }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const editStart = (item) => {
    console.log("Editando item:", item); 
    setCurrentEditItem(item); 
    setIsEditDialogOpen(true); 
  };

  const editSave = (updatedItem) => {
    console.log("Dados recebidos para edição:", updatedItem); // Depuração
    onEdit(updatedItem); // Chama a função de edição no componente pai
    setIsEditDialogOpen(false); // Fecha o Dialog
  };

  const handleSave = (updatedItem) => {
    console.log("Item atualizado enviado para edição:", updatedItem); // Depuração
    onEdit(updatedItem);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        item={currentEditItem}
        headers={headers}
        onSave={editSave}
      />
      <Table.Root width="75%" size="sm" striped variant="outline">
        <Table.Header>
          <Table.Row>
            {headers.map((header, i) => (
              <Table.ColumnHeader key={i}>{header.label}</Table.ColumnHeader>
            ))}
            {acoes && <Table.ColumnHeader textAlign="center">Ações</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              {headers.map((header, i) => (
                <Table.Cell key={i}>{item[header.key]}</Table.Cell>
              ))}
              {acoes && (
                <Table.Cell textAlign="center">
                  <Stack direction="row">
                    {/* <Tooltip label="Editar"> */}
                      <Button
                        background="Blue"
                        color="white"
                        variant="subtle"
                        size="xs"
                        onClick={() => editStart(item)}
                      >
                        <MdMode />
                      </Button>
                    {/* </Tooltip> */}
                    {/* <Tooltip label="Excluir"> */}
                      <Button
                        background="red"
                        color="white"
                        variant="subtle"
                        size="xs"
                        onClick={() => onDelete(item.id)}
                      >
                        <MdDelete />
                      </Button>
                    {/* </Tooltip> */}
                  </Stack>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}