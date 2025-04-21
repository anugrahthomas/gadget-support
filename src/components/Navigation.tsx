import {
  Box,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1000}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderBottom="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      boxShadow="sm"
      width="100%"
    >
      <Box maxW="100%" mx="auto">
        <Flex
          justify="space-between"
          align="center"
          px={{ base: 4, md: 6 }}
          py={4}
          maxW="container.xl"
          mx="auto"
          width="100%"
        >
          <Button
            as={RouterLink}
            to="/"
            variant="ghost"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color={colorMode === 'light' ? 'gray.800' : 'white'}
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
            }}
            px={4}
          >
            Gadget Review Assistant
          </Button>

          <HStack spacing={{ base: 2, md: 4 }}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
              _hover={{
                bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
              }}
              size={{ base: "sm", md: "md" }}
            />

            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                  color={colorMode === 'light' ? 'gray.700' : 'white'}
                  _hover={{
                    bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                  }}
                  size={{ base: "sm", md: "md" }}
                >
                  <HStack spacing={2}>
                    <Avatar
                      size={{ base: "xs", md: "sm" }}
                      name={user.name}
                      bg="blue.500"
                      color="white"
                    />
                    <Text display={{ base: "none", md: "block" }}>{user.name}</Text>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                >
                  <MenuItem
                    as={RouterLink}
                    to="/chat"
                    _hover={{
                      bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                    }}
                  >
                    Chat
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    _hover={{
                      bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={{ base: 2, md: 4 }}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  colorScheme="blue"
                  _hover={{
                    bg: colorMode === 'light' ? 'blue.50' : 'blue.900',
                  }}
                  size={{ base: "sm", md: "md" }}
                >
                  Login
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
} 