import { Table, Button, Stack, Input } from "@chakra-ui/react";
import { MdDelete, MdMode } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

export default function TabelaCrudOriginal({ items, headers, onEdit, onDelete, acoes, }) {
  const [editId, setEditId] = useState(null); 
  const [editedValue, setEditedValue] = useState("");

  const editStart = (cargo) => {
    setEditId(cargo.id); 
    setEditedValue(cargo.descricao); 
  };

  const editSave = (cargo) => {
    if (!editedValue.trim()) {
      alert("O campo de descrição está vazio.");
      return;
    }

    onEdit({ ...cargo, descricao: editedValue }); 
    setEditId(null); 
  };


  return (
    <Table.Root width="75%" size="sm" striped variant="outline">
      <Table.Header>
        <Table.Row>
          {headers.map((header, i) => (
            <Table.ColumnHeader key={i}>{header}</Table.ColumnHeader>
          ))}
          {acoes && <Table.ColumnHeader textAlign="center"></Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((cargo) => (
          <Table.Row key={cargo.id}>
            <Table.Cell>{cargo.id}</Table.Cell>
            <Table.Cell>
              {editId === cargo.id ? (
                <Input
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)} 
                  onBlur={() => editSave(cargo)} 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") editSave(cargo); 
                  }}
                  autoFocus
                />
              ) : (
                cargo.descricao
              )}
            </Table.Cell>
            <Table.Cell textAlign="center">
              {acoes && (
                <Stack direction="row">
                  <Tooltip content="Editar">
                    <Button
                      background="Blue"
                      color="white"
                      variant="subtle"
                      size="xs"
                      onClick={() => editStart(cargo)} 
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
                      onClick={() => onDelete(cargo.id)} 
                    >
                      <MdDelete />
                    </Button>
                  </Tooltip>
                </Stack>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}