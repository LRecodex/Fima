import React, { useState } from "react";
import {
  Box,
  Button,
  Fieldset,
  Stack,
  Input,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

const AIForm = ({ totalAmount }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isVisible, setIsVisible] = useState(false); // State to toggle form visibility

  const handleToggleForm = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/Fima/api/v1/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error generating response");
    }
  };

  const handleEstimate = async () => {
    if (typeof totalAmount === "undefined") {
      console.error("totalAmount is not defined");
      return;
    }

    const estimatePrompt = `Estimate the amount each month to reach RM 10000 if total now is ${totalAmount} and today is ${new Date().toLocaleDateString(
      "en-GB"
    )}. I want to reach this goal by the end of 2025 before 2026.`;

    try {
      const res = await fetch("/Fima/api/v1/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: estimatePrompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error generating response");
    }
  };

  return (
    <Box
      maxW="full"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="md"
    >
      <Button
        colorPalette="blue"
        onClick={handleToggleForm}
        mb={4}
        variant={"outline"}
      >
        {isVisible ? "Hide Form" : "Show Form"}
      </Button>

      {isVisible && ( // Conditional rendering of the form
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend>FIMA AI</Fieldset.Legend>
            <Fieldset.HelperText>
              Submit a prompt or estimate the amount needed to reach a goal
              before 2026.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Enter Prompt">
              <Input
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </Field>
            <Field label="AI Response">
              <Textarea
                value={response}
                isReadOnly
                placeholder="AI response will appear here..."
                minHeight="190px"
              />
            </Field>
          </Fieldset.Content>
          <HStack spacing={4} mt={6}>
            <Button
              colorPalette="blue"
              onClick={handleSubmit}
              type="submit"
              variant={"outline"}
              alignSelf="flex-start"
            >
              Generate
            </Button>
            <Button
              colorPalette="teal"
              variant="outline"
              onClick={handleEstimate}
              alignSelf="flex-start"
            >
              Estimate Amount
            </Button>
          </HStack>
        </Fieldset.Root>
      )}
    </Box>
  );
};

export default AIForm;
