import { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Flex,
  useToast,
  IconButton,
  Tooltip,
  Badge,
  useColorMode,
  Divider,
  Spinner,
  HStack,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FaRobot, FaUser } from 'react-icons/fa';
import { generateResponse } from '../config/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from the AI',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: 'Chat cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <Box w="100%" maxW="container.md" mx="auto" h="calc(100vh - 100px)" py={4} px={4}>
      <VStack h="100%" spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <HStack>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
              {messages.length} messages
            </Badge>
          </HStack>
          {messages.length > 0 && (
            <Tooltip label="Clear chat">
              <IconButton
                aria-label="Clear chat"
                icon={<DeleteIcon />}
                size="sm"
                onClick={clearChat}
                variant="ghost"
                colorScheme="red"
              />
            </Tooltip>
          )}
        </Flex>
        
        <Divider />
        
        <Box
          flex="1"
          overflowY="auto"
          p={4}
          borderRadius="md"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          boxShadow="sm"
          borderWidth="1px"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          minH="400px"
          maxH="calc(100vh - 250px)"
        >
          {messages.length === 0 ? (
            <Flex align="center" justify="center" h="100%" direction="column">
              <VStack spacing={6} w="full" maxW="600px" textAlign="center">
                <Icon as={FaRobot} w={12} h={12} color="blue.500" />
                <VStack spacing={2}>
                  <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? 'gray.700' : 'white'}>
                    Welcome to Gadget Review Assistant!
                  </Text>
                  <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                    Ask me about gadgets, reviews, or comparisons. I can help you find the best products for your needs.
                  </Text>
                </VStack>
                <VStack spacing={3} w="full">
                  <Text fontWeight="medium" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                    Try asking about:
                  </Text>
                  <Flex wrap="wrap" gap={2} justify="center">
                    <Badge 
                      colorScheme="blue" 
                      p={2} 
                      borderRadius="md" 
                      cursor="pointer" 
                      onClick={() => handleSuggestionClick("What are the best laptops under Rs.20000?")}
                      _hover={{ opacity: 0.8 }}
                    >
                      Best laptops under Rs.20000
                    </Badge>
                    <Badge 
                      colorScheme="green" 
                      p={2} 
                      borderRadius="md" 
                      cursor="pointer" 
                      onClick={() => handleSuggestionClick("Compare iPhone 14 Pro and Samsung Galaxy S23")}
                      _hover={{ opacity: 0.8 }}
                    >
                      iPhone vs Samsung
                    </Badge>
                    <Badge 
                      colorScheme="purple" 
                      p={2} 
                      borderRadius="md" 
                      cursor="pointer" 
                      onClick={() => handleSuggestionClick("Review the Sony WH-1000XM4 headphones")}
                      _hover={{ opacity: 0.8 }}
                    >
                      Headphone reviews
                    </Badge>
                  </Flex>
                </VStack>
              </VStack>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <Box key={index} w="full">
                  <Flex
                    justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                    align="flex-start"
                    gap={2}
                  >
                    {message.role === 'assistant' && (
                      <Icon 
                        as={FaRobot} 
                        w={6} 
                        h={6} 
                        color="blue.500" 
                        flexShrink={0}
                      />
                    )}
                    <Box
                      maxW={["85%", "75%", "70%"]}
                      p={3}
                      borderRadius="md"
                      bg={message.role === 'user' ? 'blue.500' : colorMode === 'light' ? 'gray.100' : 'gray.700'}
                      color={message.role === 'user' ? 'white' : colorMode === 'light' ? 'black' : 'white'}
                      boxShadow="sm"
                      borderWidth={message.role === 'assistant' ? "1px" : "0"}
                      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                    >
                      <Text whiteSpace="pre-wrap">{message.content}</Text>
                    </Box>
                    {message.role === 'user' && (
                      <Icon 
                        as={FaUser} 
                        w={6} 
                        h={6} 
                        color="gray.500" 
                        flexShrink={0}
                      />
                    )}
                  </Flex>
                </Box>
              ))}
              {isLoading && (
                <Box w="full">
                  <Flex justify="flex-start" align="center" gap={2}>
                    <Icon 
                      as={FaRobot} 
                      w={6} 
                      h={6} 
                      color="blue.500" 
                      flexShrink={0}
                    />
                    <Box
                      p={3}
                      borderRadius="md"
                      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                      color={colorMode === 'light' ? 'black' : 'white'}
                      boxShadow="sm"
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                    >
                      <HStack spacing={2}>
                        <Spinner size="sm" />
                        <Text>Thinking...</Text>
                      </HStack>
                    </Box>
                  </Flex>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          )}
        </Box>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <InputGroup size="lg">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gadgets, reviews, or comparisons..."
              disabled={isLoading}
              borderRadius="md"
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
              color={colorMode === 'light' ? 'black' : 'white'}
              borderWidth="1px"
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
              _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              _placeholder={{ color: colorMode === 'light' ? 'gray.500' : 'gray.400' }}
              pr="4.5rem"
            />
            <InputRightElement h="100%" width="4.5rem">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="..."
                size="sm"
                h="1.75rem"
                mr="0.5rem"
                isDisabled={!input.trim() || isLoading}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </VStack>
    </Box>
  );
} 