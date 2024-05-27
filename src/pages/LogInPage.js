import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Flex,
  HStack,
  Stack,
  Avatar,
  Heading,
  Box,
  Input,
  InputGroup,
  FormControl,
  Button,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/logIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      w="100vw"
      h='100%'
      justifyContent="center"
      alignItems="center"
    >
      <VStack mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="#98B9F2" />
        <Heading color="#98B9F2">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p={35}
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius={10}
            >
              <Heading textAlign={'center'}>Log In</Heading>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser />
                  </InputLeftElement>
                  <Input
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    borderRadius={10}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <RiLockPasswordFill />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderRadius={10}
                  />
                  <InputRightElement>
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      bg={'ghost'}
                      icon={showPassword? <FaEye /> : <FaEyeSlash />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                // color="#98B9F2"
                width="full"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Login
              </Button>
              {error && <Text className="error">{error}</Text>}
            </Stack>
          </form>
        </Box>
      </VStack>
      <Box>
        New to us?{" "}
        <Link to="/signup">
          <Text color={"blue.300"} as={"span"}>
            Sign Up
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

// const LogInPage = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { dispatch } = useAuthContext();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:4000/api/users/logIn", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const json = await response.json();

//     if (!response.ok) {
//       setIsLoading(false);
//       setError(json.error);
//     }

//     if (response.ok) {
//       localStorage.setItem("user", JSON.stringify(json));
//       dispatch({ type: "LOGIN", payload: json });
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Login />
//       <form className="login" onSubmit={handleSubmit}>
//         <h3>Log In</h3>

//         <label>username address:</label>
//         <input
//           type="username"
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//         <label>Password:</label>
//         <input
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />

//         <button disabled={isLoading}>Log in</button>
//         {error && <div className="error">{error}</div>}
//       </form>
//     </>
//   );
// };

export default LogInPage;
