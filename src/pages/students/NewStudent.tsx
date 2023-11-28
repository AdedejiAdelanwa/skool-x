import AppDrawer from "@/components/Drawer";
import { TextInput } from "@/components/FormElements/Inputs";
import { Flex } from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppButton from "@/components/Button";

import { createNewStudent } from "@/utils/api";
import { formatToISOString } from "@/utils/helpers";
import { useState } from "react";
import { toast } from "react-toastify";
import { AppToast } from "@/components/AppToast";
import { formattedMinDate, studentSchema } from "./studentSchema";



type FormData = Yup.InferType<typeof studentSchema>;

interface NewStudentProps {
  addOpen: boolean;
  onCloseAddDrawer: () => void;
}

const NewStudent = ({ addOpen, onCloseAddDrawer }: NewStudentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(studentSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async ({
    firstname,
    surname,
    nationalId,
    dateOfBirth,
    studentNumber,
  }: FormData) => {
    const formattedDate = formatToISOString(dateOfBirth);
    const newStudent = {
      firstname,
      surname,
      nationalId,
      studentNumber,
      dateOfBirth: formattedDate,
    };
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await createNewStudent(newStudent);
      if ("error" in result) {
        const { error } = result;
        AppToast({
          type: "error",
          message: error,
          placement: toast.POSITION.TOP_LEFT,
        });
      
        setIsLoading(false);
      } else {
        reset();
        onCloseAddDrawer();
        AppToast({
          type: "success",
          message: "Student added successfully",
          placement: toast.POSITION.TOP_LEFT,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      AppToast({type: "error", message: error, placement: toast.POSITION.TOP_LEFT,})
      
    }
  };

  return (
    <AppDrawer
      title="Student Details"
      isOpen={addOpen}
      onClose={onCloseAddDrawer}
    >
      <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          type="text"
          required={true}
          {...register("firstname")}
          errors={errors}
        />
        <TextInput
          label="Surname"
          type="text"
          required={true}
          {...register("surname")}
          errors={errors}
        />
        <TextInput
          label="Date of Birth"
          type="date"
          min={formattedMinDate}
          required={true}
          {...register("dateOfBirth")}
          errors={errors}
        />
        <TextInput
          label="National ID"
          type="number"
          required={true}
          {...register("nationalId")}
          errors={errors}
        />
        <TextInput
          label="Student Number"
          type="text"
          required={true}
          placeholder="skx001"
          {...register("studentNumber")}
          errors={errors}
        />
        <Flex className="col-span-6" justifyContent="space-between">
          <AppButton
            type="button"
            appButtonType="gray-outline"
            onClick={onCloseAddDrawer}
          >
            Cancel
          </AppButton>

          <AppButton
            isLoading={isLoading}
            type="submit"
            appButtonType="peabuxblue"
          >
            Submit
          </AppButton>
        </Flex>
      </form>
    </AppDrawer>
  );
};
export default NewStudent;
