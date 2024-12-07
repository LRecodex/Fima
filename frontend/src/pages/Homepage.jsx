import { Container, VStack, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTransactionStore } from "../store/transaction";
import { useEffect } from "react";
import { TransactionCard } from "../components/TransactionCard";
import AIForm from "../components/AIForm";

const Homepage = () => {
  const { fetchTransactions, transactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  console.log("Transactions", transactions);
  // Calculate total amount
  const totalAmount = transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.amount || 0);
  }, 0);

  return (
    <Container maxW={"container.xl"}>
      <VStack spacing={8}>
        <Text fontSize={30}>
          🐻💸{" "}
          <Text
            as="span"
            fontSize={30}
            fontWeight={"bold"}
            bgGradient="to-r"
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
            bgClip={"text"}
            textTransform={"uppercase"}
          >
            Bubu & Dudu Finance{" "}
            <Box as="span" fontSize={30} color={"initial"}>
              💸🐼
            </Box>
          </Text>
        </Text>
        <Text
          fontSize={20}
          fontWeight={"bold"}
          bgGradient="to-r"
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textTransform={"uppercase"}
        >
          Total Amount: RM {totalAmount.toFixed(2)}
        </Text>
        <Box w="full">
          <AIForm totalAmount={totalAmount.toFixed(2)}/>
        </Box>
        <Box
          w="full"
          h="2px"
          bgGradient="to-r"
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          borderRadius="md"
        />
        <br />
        <SimpleGrid
          columns={{ base: 1, sm: 3, lg: 5 }}
          spacing={10}
          gap={4}
          w={"half"}
        >
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </SimpleGrid>
        {transactions.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Transaction Found 😭{" "}
            <Link to={"/FIMA/transaction/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create Transaction
              </Text>
            </Link>
          </Text>
        )}
        <br />
        <Box
          w="full"
          h="2px"
          bgGradient="to-r"
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          borderRadius="md"
        />
      </VStack>
    </Container>
  );
};

export default Homepage;
