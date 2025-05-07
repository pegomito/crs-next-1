import { Input } from "@chakra-ui/react"

export default function InputPesquisa({ searchTerm, SetSeachTerm }) {
  return (
    <Input
      placeholder="Pesquisar ..."
      value={searchTerm}
      onChange={(e) => SetSeachTerm(e.target.value)}
      mb={4}
      style={{ width: "100%" }}
    />
  )
}