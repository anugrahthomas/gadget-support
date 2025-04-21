import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" w="100%" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Navigation />
      <Box 
        as="main"
        pt={{ base: "72px", md: "80px" }}
        minH="calc(100vh - 80px)"
        w="100%"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
