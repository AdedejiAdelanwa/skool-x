import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import { SideBarItem } from "./SideBarItem";

interface BreadCrumbItem {
  url: string;
  name: string;
}

interface LayoutWrapperProps {
  breadCrumbList: BreadCrumbItem[];
  children: React.ReactNode;
}
export default function LayoutWapper({
  children,
  breadCrumbList,
}: LayoutWrapperProps) {
 
  return (
    <Box>
      <Flex w="full" bg="white">
        <VStack
          w={["0%", "20%"]}
          h={"100vh"}
          display={["none", "flex"]}
          bg="white"
        >
          <VStack w="100%" h="10%" pl="10px" color="brand.peabuxblue" justifyContent={"center"} alignItems={"start"} >
            <Heading>Skool-X</Heading>
          </VStack>
          <nav className="w-full h-[90%] py-4 bg-gray-200">
            <ul className="100% cursor-pointer mt-3">
            <SideBarItem url={"/"} name={"Home"} />
           <SideBarItem url={"/students"} name={"Students"} />
           <SideBarItem url={"/teachers"} name={"Teachers"} />
            </ul>
          </nav>
        </VStack>
        <Box py="20px" px="15px" w={["100%", "80%"]}>
          <Breadcrumb
            spacing="8px"
            separator={<FaChevronRight color="gray.500" />}
          >
            {breadCrumbList.map((item, i) => (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
            {/* <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/students">Students</BreadcrumbLink>
              </BreadcrumbItem> */}
          </Breadcrumb>
          <Box mt="20px">{children}</Box>
        </Box>
      </Flex>
    </Box>
  );
}
