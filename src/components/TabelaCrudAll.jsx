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
    console.log("Dados recebidos para edição:", updatedItem); 
    onEdit(updatedItem);
    setIsEditDialogOpen(false); 
  };

  console.log("Itens recebidos pela tabela:", items); 
  console.log("Cabeçalhos recebidos pela tabela:", headers); 

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
                <Table.Cell key={i}>
                  {typeof item[header.key] === "object" && item[header.key] !== null
                    ? Array.isArray(item[header.key])
                      ? item[header.key]
                          .map(
                            (lugar, index) =>
                              `Lugar ${lugar.lugar}, Linha ${lugar.linha}, Coluna ${lugar.coluna}, Alocado: ${lugar.alocado}`
                          )
                          .join("; ") // bagui de JSONB
                      : JSON.stringify(item[header.key]) 
                    : item[header.key]}
                </Table.Cell>
              ))}
              {acoes && (
                <Table.Cell textAlign="center">
                  <Stack direction="row">
                    <Button
                      background="Blue"
                      color="white"
                      variant="subtle"
                      size="xs"
                      onClick={() => editStart(item)}
                    >
                      <MdMode />
                    </Button>
                    <Button
                      background="red"
                      color="white"
                      variant="subtle"
                      size="xs"
                      onClick={() => onDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>
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