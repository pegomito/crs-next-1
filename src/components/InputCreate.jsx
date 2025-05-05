import { Flex, Input, Button, Dialog, Heading, Text, Box, Portal, CloseButton } from "@chakra-ui/react";
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

export default function InputCreate({ input, setInput, submit, editIndex, loadingSave, open, setOpen }) {
    return (
        <Dialog.Root open={open.open} onOpenChange={setOpen} placement="top" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Button
                    colorScheme="teal"
                >Adicionar Cargo +</Button>
            </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
            <Dialog.Positioner>
                <Dialog.Content p={4}>
                    <Dialog.Header>
                        <Dialog.Title>
                            <Heading size="md">Qual o nome do cargo?</Heading>
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>

                        <Flex mb={4}>
                            <Input
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
                    
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size='sm' />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
    );

}