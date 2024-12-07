import { Box, Image, Heading, Text, HStack, Button, VStack } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { format } from 'date-fns';

export const TransactionCard = ({ transaction }) => {
    const textColor = useColorModeValue('gray.700', 'gray.300'); // Adjusted for better contrast
    const bg = useColorModeValue('white', 'gray.800');
    const formattedDate = format(new Date(transaction.createdAt), 'dd MMMM yyyy hh:mm a');

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow="hidden"
            transition={"all 0.2s ease-in-out"}
            _hover={{
                transform: "scale(1.05)",
                shadow: "xl",
            }}
            bg={bg}
        >
            <Image src={transaction.image} alt={transaction.sender} h={180} w="100%" objectFit="cover" />

            <Box p={6}>
                <VStack align="start" spacing={3}>
                    <Heading as="h3" size="lg" mb={2} color={textColor}>
                        {transaction.sender}
                    </Heading>
                    <Text fontWeight="bold" fontSize="2xl" color="teal.400">
                        RM {transaction.amount}
                    </Text>
                    <Text fontSize="md" color={textColor} fontStyle="italic">
                        {transaction.description}
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                        {formattedDate}
                    </Text>
                </VStack>

                <HStack spacing={4} mt={6}>
                    <Button
                        _hover={{ bg: "blue.500" }}
                        colorPalette="blue"
                        variant="surface"
                    >
                        <CiEdit />Edit
                    </Button>
                    <Button
                        _hover={{ bg: "red.500" }}
                        colorPalette="red"
                        variant="surface"
                    >
                        <MdDelete />Delete
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default TransactionCard;
