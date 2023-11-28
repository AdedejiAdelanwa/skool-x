import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: string;
  label?: string;
  register?: any;
  errors: any;
  name: string;
}
interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
  label: string;
  errors?: FieldErrors<FieldValues>;
  cssClass?: string;
}

interface Option {
  name: string;
  value: string;
}

interface SelectProps extends InputProps {
  options?: Option[] | undefined;
  cssClass?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ required, errors, name, type, cssClass, label, ...props }, ref) => {
    return (
      <div className={`col-span-6 ${cssClass ? cssClass : "sm:col-full mb-5"}`}>
        <FormLabel
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>

        <Input
          name={name}
          type={type}
          ref={ref}
          {...props}
          size="md"
          data-testid={name}
          className={twMerge(
            "shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5",
            errors?.[name] && "border-red-400 bg-red-100"
          )}
        />

        {errors && (
          <small className="text-red-500">
            <ErrorMessage errors={errors} name={name} />
          </small>
        )}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

export const AppSelect = ({
  label,
  required,
  options,
  errors,
  name,
  register,
  cssClass,
  ...props
}: SelectProps) => {
  return (
    <div className={`col-span-6  ${cssClass ? cssClass : "sm:col-full mb-5"}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Select
        placeholder="Select Title"
        required
        className={twMerge(
          "shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5",
          errors?.[name] && "border-red-400 bg-red-100"
        )}
        data-testid={name}
      
      >
        {options?.map(({ name, value }) => (
          <option key={value} value={name}>
            {name}
          </option>
        ))}
      </Select>

      {/* <input list={label} data-testid={name}  className={twMerge(
            "shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5",
            errors?.[name] && "border-red-400 bg-red-100"
          )} name={name} id={name}   {...props} />

      <datalist id={label}>
        {options?.map(({name, value}) => (<option key={value} value={value}/>))}
      
     
    </datalist> */}
      {errors[name] && (
        <small className="text-red-500">{errors[name].message}</small>
      )}
    </div>
  );
};
