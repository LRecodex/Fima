import { Button, Box } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "@/components/ui/color-mode"
function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("white", "gray.900")}>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/FIMA/transactions" />} />
        <Route path="/FIMA/transactions" element={<Homepage />} />
        <Route path="/FIMA/transaction/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
