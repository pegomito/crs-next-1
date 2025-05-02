import { Table, Button, Stack } from "@chakra-ui/react";
import { MdDelete, MdMode } from "react-icons/md";


export default function TabelaCrud({ items, headers, onEdit, onDelete, acoes }) {
  return (
    <Table.Root width="50%" size="sm" striped variant="outline">
      <Table.Header>
        <Table.Row>
          {headers.map((header, index) => (
            <Table.ColumnHeader key={index}>{header}</Table.ColumnHeader>
          ))}
          {acoes && <Table.ColumnHeader textAlign="center">Ações</Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((task, i) => (
          <Table.Row key={i}>
            <Table.Cell>{task}</Table.Cell>
            {acoes && (
              <Table.Cell textAlign="center">
                <Stack direction="row">
                  <Button
                    background="Blue"
                    color="white"
                    variant="subtle"
                    size="xs"
                    onClick={() => onEdit(i)}
                  >
                    <MdMode />
                  </Button>
                  <Button
                    background="red"
                    color="white"
                    variant="subtle"
                    size="xs"
                    onClick={() => onDelete(i)}
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
  );
}