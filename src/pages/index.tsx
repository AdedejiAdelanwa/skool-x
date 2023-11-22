
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome To Skool-X</title>
        <meta
          name="description"
          content="The database for students and teachers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VStack maxW="full" h="100vh" justifyContent="center" bg="whitesmoke">
          <Card
            p="15px"
            w={["90%", "70%", "35%"]}
            alignItems="center"
            justifyContent="space-around"
            h={"350px"}
            bg="white"
          >
            <Box textAlign="center">
              <Heading mb="15px">Welcome to Skool-X</Heading>
              <Text fontSize="18px">Are you a?</Text>
            </Box>

            <Flex w="full" cursor="pointer" justifyContent="space-around"  alignItems="center">
          
              <Link href="/students">
              <Button bg={"brand.peabuxblue"} _hover={{
                bg: "white",
                color: "brand.peabuxblue",
                boxShadow: "md"
              }} color={"white"}>
                Student
              </Button>
              </Link>
              OR
              <Link href="/teachers">
              <Button border={"1px solid navy"} bg={"white"} _hover={{
                bg: "brand.peabuxblue",
                color: "white",
                boxShadow: "md",
                borderColor: "white"
              }} color={"brand.peabuxblue"}>
                Teacher
              </Button>
              </Link>
            </Flex>
          </Card>
        </VStack>
      </main>
    </>
  );
}
