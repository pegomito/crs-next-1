import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";


const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const putFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file); 
      console.log("Arquivo selecionado:", file);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="file-upload"
        onChange={putFileChange}
      />
      <label htmlFor="file-upload">
        <Button as="span"  variant="outline" size="sm">
          Adicionar Imagem <HiUpload />
        </Button>
      </label>
      {selectedFile && (
        <Box mt={2}>
          <strong>Arquivo selecionado:</strong> {selectedFile.name}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;