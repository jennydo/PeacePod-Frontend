import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Flex,
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
import { useAvatarContext } from "../hooks/useAvatarContext";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: avatarDispatch } = useAvatarContext();

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
      avatarDispatch({
        type: "SET_AVATAR_DATA", 
        payload: json.user.avatarData
      });
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      h='100%'
      justifyContent="center"
      w="100vw"
    >
      <VStack alignItems="center" justifyContent="center" mb="2">
        <Avatar bg="#98B9F2" />
        <Heading color="#98B9F2">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              backgroundColor="whiteAlpha.900"
              borderRadius={10}
              boxShadow="md"
              p={35}
              spacing={4}
            >
              <Heading textAlign="center">Log In</Heading>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser />
                  </InputLeftElement>
                  <Input
                    borderRadius={10}
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement color="gray.300" pointerEvents="none">
                    <RiLockPasswordFill />
                  </InputLeftElement>
                  <Input
                    borderRadius={10}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      bg="ghost"
                      h="1.75rem"
                      icon={showPassword? <FaEye /> : <FaEyeSlash />}
                      size="sm"
                      onClick={handleShowClick}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={10}
                disabled={isLoading}
                type="submit"
                variant="solid"
                // color="#98B9F2"
                width="full"
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
          <Text as="span" color="blue.300">
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
