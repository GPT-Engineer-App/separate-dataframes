import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const parseCSV = (csv) => {
  const lines = csv.split("\n");
  const result = [];
  let currentTable = [];

  lines.forEach((line) => {
    if (line.trim() === "") {
      if (currentTable.length > 0) {
        result.push(currentTable);
        currentTable = [];
      }
    } else {
      const values = line.split(",");
      currentTable.push(values);
    }
  });

  if (currentTable.length > 0) {
    result.push(currentTable);
  }

  return result;
};

const Index = () => {
  const [tables, setTables] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsedTables = parseCSV(text);
      setTables(parsedTables);
    };
    reader.readAsText(file);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">CSV Table Splitter</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} display="none" id="file-upload" />
        <label htmlFor="file-upload">
          <Button as="span" leftIcon={<FaUpload />}>
            Upload CSV
          </Button>
        </label>
        {fileName && <Text>Uploaded File: {fileName}</Text>}
        {tables.map((table, index) => (
          <Table variant="simple" key={index} mt={4}>
            <Thead>
              <Tr>
                {table[0].map((header, i) => (
                  <Th key={i}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {table.slice(1).map((row, i) => (
                <Tr key={i}>
                  {row.map((cell, j) => (
                    <Td key={j}>{cell}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
