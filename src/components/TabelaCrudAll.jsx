import { Table, Button, Stack, Input } from "@chakra-ui/react";
import { MdDelete, MdMode } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

export default function TabelaCrudAll({ items, headers, onEdit, onDelete, acoes }) {
  const [editId, setEditId] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const editStart = (item) => {
    setEditId(item.id); 
    setEditedValue(item[headers[1].key]); 
  };

  const editSave = (item) => {
    if (!editedValue.trim()) {
      alert("O campo de edição está vazio.");
      return;
    }

    onEdit({ ...item, [headers[1].key]: editedValue }); 
    setEditId(null); 
  };

  return (
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
                {editId === item.id && header.key === headers[1].key ? (
                  <Input
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    onBlur={() => editSave(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") editSave(item);
                    }}
                    autoFocus
                  />
                ) : (
                  item[header.key]
                )}
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
  );
}