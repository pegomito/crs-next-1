import { defineLayerStyles } from "@chakra-ui/react"

const layerStyles = defineLayerStyles({
  container: {
    description: "container styles",
    value: {
      background: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
  },
});

export default layerStyles;