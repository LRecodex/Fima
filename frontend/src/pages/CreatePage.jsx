import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useTransactionStore } from "../store/transaction";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";

const CreatePage = () => {
  const [newTransaction, setNewTransaction] = useState({
    sender: "Dudu",
    amount: "",
    description: "",
    image: "",
  });

  const { createTransaction } = useTransactionStore();

  const handleAddTransaction = async () => {
    if (newTransaction.image === "") {
      newTransaction.image =
        newTransaction.sender === "Dudu"
          ? "/images/dudu.gif"
          : newTransaction.sender === "Bubu"
            ? "/images/bubu.gif"
            : "/images/bubududulogo.png"; // Default image
    }

    const { success, message } = await createTransaction(newTransaction);
    toaster.create({
      size: "sm",
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      type: success ? "success" : "error",
      action: {
        label: "X",
        onClick: () => console.log("Close Toast"),
      },
    });
    setNewTransaction({ sender: "", amount: "", description: "", image: "" });
  };
  const senders = createListCollection({
    items: [
      { label: "Dudu", value: "Dudu" },
      { label: "Bubu", value: "Bubu" },
    ],
  });
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create Transaction
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <SelectRoot
              collection={senders}
              size="sm"
              width="full"
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  sender: e.target.value,
                })
              }
              borderColor={useColorModeValue("gray.300", "white")}
              borderWidth={1}
              borderRadius="sm"
            >
              <SelectTrigger clearable>
                <SelectValueText placeholder="Select Sender" />
              </SelectTrigger>
              <SelectContent>
                {senders.items.map((sender) => (
                  <SelectItem item={sender} key={sender.value}>
                    {sender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Input
              placeholder="Amount"
              name="amount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: e.target.value,
                })
              }
              borderColor={useColorModeValue("gray.300", "white")}
            />
            <Input
              placeholder="Description"
              name="description"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
              borderColor={useColorModeValue("gray.300", "white")}
            />
            <Input
              placeholder="Image"
              name="image"
              value={newTransaction.image}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  image: e.target.value,
                })
              }
              borderColor={useColorModeValue("gray.300", "white")}
            />
            <Button
              colorPalette={"blue"}
              onClick={handleAddTransaction}
              w={"full"}
            >
              Create Transaction
            </Button>
          </VStack>
        </Box>
        <Toaster />
      </VStack>
    </Container>
  );
};

export default CreatePage;
