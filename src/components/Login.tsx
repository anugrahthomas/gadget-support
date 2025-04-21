import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Link,
  Container,
  useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/chat');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
      >
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" mb={6}>
            Login to Gadget Review Assistant
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  bg={colorMode === 'light' ? 'white' : 'gray.700'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                  borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg={colorMode === 'light' ? 'white' : 'gray.700'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                  borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
                loadingText="Logging in..."
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
}
