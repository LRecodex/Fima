import { Container, Flex, Text, Button, HStack, Image } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1920px"}
      px={4}
      bg={useColorModeValue("black", "gray.800")}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{
            base: "22",
            sm: "28",
          }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          testAlign={"center"}
          bgGradient="to-r"
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
        >
          <Link to={"/"}>
            <HStack spacing={2} align="center">
              <Image
                src="/images/bubududulogo.png"
                alt="Logo"
                boxSize="30px"
                objectFit="contain"
              />
              <Text fontWeight="bold" fontSize="lg">
                FIMA
              </Text>
            </HStack>
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/"}>
            <Button>
              <FcHome fontSize={20} />
            </Button>
          </Link>
          <Link to={"/FIMA/transaction/create"}>
            <Button>
              <FaPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
