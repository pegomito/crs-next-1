import { Flex, Input, Button, Dialog, Heading, Text, Box } from "@chakra-ui/react";
import { MdCheck, MdAdd } from "react-icons/md";


// export default function InputCreate({ input, setInput, submit, editIndex }) {
//   return (
// <Flex mb={4}>
//   <Input
//     placeholder="Qual sua tarefa?"
//     variant="subtle"
//     mr={2}
//     value={input}
//     onChange={(valor) => setInput(valor.target.value)}
//   />
//   <Button 
// onClick={submit}
// background={editIndex !== null ? "blue" : "green"} 
// color="white"
//   >
//     {editIndex !== null ? <MdCheck /> : <MdAdd    />}
//   </Button>
// </Flex>
//   );
// }

export default function InputCreate({ input, setInput, submit, editIndex, loadingSave, openDialog, setOpenDialog }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    colorScheme="teal"
                >Adicionar Cargo +</Button>
            </Dialog.Trigger>

            <Dialog.Backdrop bg="blackAlpha.600" />

            <Dialog.Positioner>
                <Dialog.Content p={4}>
                    <Dialog.CloseTrigger asChild>
                        <Button position="absolute" size="sm">
                            X
                        </Button>
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title>
                            <Heading size="md">Qual o nome do cargo?</Heading>
                            {/* <Heading size="md">Qual o nome da sua Tarefa?</Heading> */}
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>

                        <Flex mb={4}>
                            <Input
                                //placeholder="Ex: Descascar mandioca (18:00)"
                                placeholder="Ex: Pipoqueiro Sênior"
                                variant="subtle"
                                mr={2}
                                value={input}
                                onChange={(valor) => setInput(valor.target.value)}

                            />
                        </Flex>

                    </Dialog.Body>

                    <Dialog.Footer>
                        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                            <Dialog.CloseTrigger asChild>
                                <Button variant="ghost"></Button>
                            </Dialog.CloseTrigger>

                            <Button
                                isLoading={loadingSave} loadingText="Salvando"
                                onClick={submit}
                                colorScheme="teal"
                                background={editIndex !== null ? "blue" : "green"}
                                color="white"
                            >
                                {editIndex !== null ? <MdCheck /> : <MdAdd />}
                            </Button>

                        </Box>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );

}