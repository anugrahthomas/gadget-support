import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaRobot, FaSearch, FaComments, FaChartBar } from 'react-icons/fa';

export default function Home() {
  const { colorMode } = useColorMode();

  const features = [
    {
      icon: FaRobot,
      title: 'AI-Powered Reviews',
      description: 'Get instant, accurate reviews powered by advanced AI technology',
    },
    {
      icon: FaSearch,
      title: 'Smart Comparisons',
      description: 'Compare different gadgets side by side with detailed analysis',
    },
    {
      icon: FaComments,
      title: 'Interactive Chat',
      description: 'Engage in natural conversations to get personalized recommendations',
    },
    {
      icon: FaChartBar,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with comprehensive data and analytics',
    },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={10} align="stretch">
        <Box textAlign="center" py={10}>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Welcome to Gadget Review Assistant
          </Heading>
          <Text fontSize="xl" color={colorMode === 'light' ? 'gray.600' : 'gray.400'} mb={8}>
            Your AI-powered companion for making informed tech purchase decisions
          </Text>
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="blue"
            size="lg"
            px={8}
          >
            Get Started
          </Button>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <Box
              key={index}
              p={6}
              borderRadius="lg"
              boxShadow="lg"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              borderWidth="1px"
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            >
              <VStack spacing={4} align="start">
                <Icon
                  as={feature.icon}
                  w={10}
                  h={10}
                  color="blue.500"
                />
                <Heading size="md">{feature.title}</Heading>
                <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                  {feature.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
} 