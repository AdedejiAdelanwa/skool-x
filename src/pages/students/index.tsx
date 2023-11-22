import AppDrawer from "@/components/Drawer";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export default function Students() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Head>
        <title>Skool-X | Students</title>
        <meta
          name="description"
          content="The database for students and teachers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Flex w="full" bg="white">
          <VStack
            w={["0%", "20%"]}
            h={"100vh"}
            display={["none", "flex"]}
            bg="whitesmoke"
          >
            Hi
          </VStack>
          <Box py="20px" px="15px" w={["100%", "80%"]}>
            <Breadcrumb
              spacing="8px"
              separator={<FaChevronRight color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/students">Students</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Box mt="20px">
              <Heading fontSize="2xl" mb="20px">All Students</Heading>
              <Button onClick={onOpen} bg={"brand.peabuxblue"} color="white">Add Your Details</Button>
              <AppDrawer title="Student Details" isOpen={isOpen} onClose={onClose}><form><Input type="text" placeholder="Type here..." /></form></AppDrawer>
          
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
