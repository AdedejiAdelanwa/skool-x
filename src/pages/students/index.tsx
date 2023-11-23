import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import NewStudent from "./NewStudent";
import AppButton from "@/components/Button";
import { useEffect, useState } from "react";
import { fetchStudents } from "@/utils/api";
import { AppToast } from "@/components/AppToast";
import { toast } from "react-toastify";
import NewTeacher from "../teachers/Newteacher";
import LayoutWapper from "@/components/LayoutWrapper";

export default function Students() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{

    const getStudents = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetchStudents();
        if ("error" in response) {
          const { error } = response;
          AppToast({
            type: "error",
            message: error,
            placement: toast.POSITION.TOP_LEFT,
          });
          setIsLoading(false);
        } else {
          console.log(response);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`, { position: toast.POSITION.TOP_LEFT });
      }
    };
    getStudents();

  },[])

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
      <LayoutWapper
        breadCrumbList={[
          { name: "Home", url: "/" },
          { name: "Students", url: "/students" },
        ]}
      >
        <Heading fontSize="2xl" mb="20px">
          All Students
        </Heading>
        <AppButton
          appButtonType="peabuxblue"
          isIcon={true}
          icon={<FaPlus />}
          onClick={onOpen}
        >
          Add Your Details
        </AppButton>
        <NewStudent addOpen={isOpen} onCloseAddDrawer={onClose} />
      </LayoutWapper>
    </>
  );
}
