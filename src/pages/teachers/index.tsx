import AppButton from "@/components/Button";
import LayoutWapper from "@/components/LayoutWrapper";
import { Heading, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { FaPlus } from "react-icons/fa6";
import NewTeacher from "./Newteacher";
import { useEffect, useState } from "react";
import { fetchTeachers } from "@/utils/api";
import { AppToast } from "@/components/AppToast";
import { toast } from "react-toastify";
import TeachersTable from "./teachersTable";

export default function Students() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  return (
    <>
      <Head>
        <title>Skool-X | Teachers</title>
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
          { name: "Teachers", url: "/teachers" },
        ]}
      >
        <Heading fontSize="2xl" mb="20px">
          All Teachers
        </Heading>
        <AppButton
          appButtonType="peabuxblue"
          isIcon={true}
          icon={<FaPlus />}
          onClick={onOpen}
        >
          Add Your Details
        </AppButton>
        <NewTeacher addOpen={isOpen} onCloseAddDrawer={onClose} />
      <TeachersTable />
      </LayoutWapper>
    </>
  );
}
