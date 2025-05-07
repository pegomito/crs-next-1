import { Table, Button, Stack, Input, Dialog, Text } from "@chakra-ui/react";
import { MdDelete, MdMode } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
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

  const editSave = (item) => {
    if (!item) {
      alert("Nenhum item para salvar.");
      return;
    }

    onEdit(item); 
    setIsEditDialogOpen(false); 
  };

  return (
    <>
    <EditDialog placement="top"
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
                <Table.Cell key={i}>
                  {header.key === "estudante"
                    ? item[header.key] === true
                      ? "Sim"
                      : "Não"
                    : item[header.key]}
                </Table.Cell>
              ))}
              {acoes && (
                <Table.Cell textAlign="center">
                  <Stack direction="row">
                    <Tooltip content="Editar">
                      <Button
                        background="Blue"
                        color="white"
                        variant="subtle"
                        size="xs"
                        onClick={() => editStart(item)}
                      >
                        <MdMode />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Excluir">
                      <Button
                        background="red"
                        color="white"
                        variant="subtle"
                        size="xs"
                        onClick={() => onDelete(item.id)}
                      >
                        <MdDelete />
                      </Button>
                    </Tooltip>
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