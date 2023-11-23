import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, VStack } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";

interface BreadCrumbItem{
    url: string;
    name: string;
}

interface LayoutWrapperProps{
    breadCrumbList: BreadCrumbItem[]
    children: React.ReactNode
}
export default function LayoutWapper({children,breadCrumbList}: LayoutWrapperProps){
    return(
        <Box>
        <Flex w="full" bg="white">
          <VStack
            w={["0%", "20%"]}
            h={"100vh"}
            display={["none", "flex"]}
            bg="whitesmoke"
          ></VStack>
          <Box py="20px" px="15px" w={["100%", "80%"]}>
          <Breadcrumb
              spacing="8px"
              separator={<FaChevronRight color="gray.500" />}
            >
                {breadCrumbList.map((item,i) => (
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
            <Box mt="20px">
              {children}
            
            </Box>
          </Box>
        </Flex>
      </Box>
    )
}