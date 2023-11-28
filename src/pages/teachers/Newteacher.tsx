import AppDrawer from "@/components/Drawer";
import { AppSelect, TextInput } from "@/components/FormElements/Inputs";
import { Flex } from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppButton from "@/components/Button";
import { createNewTeacher } from "@/utils/api";
import { formatToISOString } from "@/utils/helpers";
import { useState } from "react";
import { toast } from "react-toastify";
import { AppToast } from "@/components/AppToast";
import { formattedMaxDate, teacherSchema } from "./teacherSchema";
import { titleList } from "./util";

type FormData = Yup.InferType<typeof teacherSchema>;

interface NewTeacherProps {
  addOpen: boolean;
  onCloseAddDrawer: () => void;
}

const NewTeacher = ({ addOpen, onCloseAddDrawer }: NewTeacherProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(teacherSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);


  const onSubmit = async ({
    firstname,
    surname,
    nationalId,
    dateOfBirth,
    title,
    teacherNumber,
    salary,
  }: FormData) => {
    const formattedDate = formatToISOString(dateOfBirth);
    const newTeacher = {
      firstname,
      surname,
      nationalId,
      teacherNumber,
       title,
      dateOfBirth: formattedDate,
      salary,
    };
    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await createNewTeacher(newTeacher);
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
          message: "Teacher added successfully",
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
      title="Teacher Details"
      isOpen={addOpen}
      onClose={onCloseAddDrawer}
    >
      <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
        <AppSelect
          register={register}
          {...register("title")}
          errors={errors}
          label="Title"
          cssClass="sm:col-span-3"
          required={true}
          options={titleList}
        />
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
          max={formattedMaxDate}
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
          label="Teacher Number"
          type="text"
          required={true}
          placeholder="tn001"
          {...register("teacherNumber")}
          errors={errors}
        />
        <TextInput
          label="Salary"
          type="number"
          required={true}
          {...register("salary")}
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
export default NewTeacher;
