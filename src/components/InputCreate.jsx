
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

// export default function InputCreate({ input, setInput, submit, editIndex, loadingSave, open, setOpen }) {
//     return (
//         <Dialog.Root open={open.open} onOpenChange={setOpen} placement="top" motionPreset="slide-in-bottom">
//             <Dialog.Trigger asChild>
//                 <Button
//                     colorScheme="teal"
//                 >Adicionar Cargo +</Button>
//             </Dialog.Trigger>
//     <Portal>
//         <Dialog.Backdrop bg="blackAlpha.600" />
//             <Dialog.Positioner>
//                 <Dialog.Content p={4}>
//                     <Dialog.Header>
//                         <Dialog.Title>
//                             <Heading size="md">Qual o nome do cargo?</Heading>
//                         </Dialog.Title>
//                     </Dialog.Header>

//                     <Dialog.Body>

//                         <Flex mb={4}>
//                             <Input
//                                 placeholder="Ex: Pipoqueiro Sênior"
//                                 variant="subtle"
//                                 mr={2}
//                                 value={input}
//                                 onChange={(valor) => setInput(valor.target.value)}

//                             />
//                         </Flex>

//                     </Dialog.Body>

//                     <Dialog.Footer>
//                         <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
//                             <Dialog.CloseTrigger asChild>
//                                 <Button variant="ghost"></Button>
//                             </Dialog.CloseTrigger>

//                             <Button
//                                 isLoading={loadingSave} loadingText="Salvando"
//                                 onClick={submit}
//                                 colorScheme="teal"
//                                 background={editIndex !== null ? "blue" : "green"}
//                                 color="white"
//                             >
//                                 {editIndex !== null ? <MdCheck /> : <MdAdd />}
//                             </Button>

//                         </Box>
//                     </Dialog.Footer>
                    
//                     <Dialog.CloseTrigger asChild>
//                         <CloseButton size='sm' />
//                     </Dialog.CloseTrigger>
//                 </Dialog.Content>
//             </Dialog.Positioner>
//         </Portal>
//     </Dialog.Root>
//     );

// }

import { Flex, Input, Button, Dialog, Heading, Text, Box, Portal, CloseButton,} from "@chakra-ui/react";
import { MdCheck, MdAdd } from "react-icons/md";
import { useState } from "react";

export default function InputCreate({ fields, submit, editIndex, loadingSave, open, setOpen }) {
  const [formValues, setFormValues] = useState({});

  const dinamicInput = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const dinamicChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setFormValues({});
    }
  };

  return (
    <Dialog.Root open={open.open} onOpenChange={dinamicChange} placement="top" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button colorScheme="teal">
          {/* {editIndex !== null ? "Editar Registro" : "Adicionar Registro"} */}
          Adicionar Registro
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner>
          <Dialog.Content p={4}>
                      <Dialog.Header>
                          <Dialog.Title>
                              <Text fontSize="lg" fontWeight="bold">
                                  {/* {editIndex !== null ? "Editar Registro" : "Adicionar Novo Registro"} */}
                                Adicionar Registro
                              </Text>
                          </Dialog.Title>
                      </Dialog.Header>
            <Dialog.Body>
              {Array.isArray(fields) &&
                fields.map((field) => (
                  <Flex mb={4} key={field.name}>
                    <Text fontSize="sm" mr={2} width="30%">
                      {field.title}
                    </Text>
                    {field.render ? (
                      field.render() 
                    ) : (
                      <Input
                        placeholder={field.placeholder}
                        variant="subtle"
                        mr={2}
                        value={formValues[field.name] || ""}
                        onChange={(e) => dinamicInput(field.name, e.target.value)}
                      />
                    )}
                  </Flex>
                ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}> 
                <Dialog.CloseTrigger asChild>
                  <Button variant="ghost">Cancelar</Button>
                </Dialog.CloseTrigger>
                <Button
                  isLoading={loadingSave}
                  loadingText="Salvando"
                  onClick={() => {
                    console.log("Form Values antes do submit:", formValues); 
                    submit(formValues);
                  }}
                  colorScheme="teal"
                  background={editIndex !== null ? "blue" : "green"}
                  color="white"
                >
                  {editIndex !== null ? <MdCheck /> : <MdAdd />}
                </Button>
              </Box>
            </Dialog.Footer>
            {/* <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger> */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}