import { Spinner } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import {twMerge} from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appButtonType:
      
      | "gray-outline"
      | "red-outline"
      | "peabuxblue"
      | "grey-button";
    height?: "default" | "small";
    isIcon?: boolean;
    props?: any;
    icon?: ReactNode;
    isLoading?: boolean;
  }
  
  const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    isLoading = false,
    appButtonType,
    height = "default",
    isIcon = false,
    icon = <></>,
    children,
    className,
    disabled,
    ...rest
  }, ref) => {
    let colorCss = "";
  
    switch (appButtonType) {
     
      case "gray-outline":
        colorCss =
          "text-gray-700 border border-gray-400 focus:outline-none hover:text-green-800 hover:border-green-600 ";
        break;
      case "red-outline":
        colorCss =
          "text-red-500 border border-red-500 focus:outline-none hover:bg-gray-100 ";
        break;
        case "peabuxblue": colorCss = "text-white bg-blue-900 hover:bg-white hover:text-blue-900";
        break;
      case "grey-button":
        colorCss = "text-slate-700 bg-slate-100 hover:bg-slate-200";
        break;
    }
  
    let heightCss = "";
  
    switch (height) {
      case "default":
        heightCss = "px-5 py-2.5";
        break;
      case "small":
        heightCss = "px-3 py-2";
        break;
    }
  
    return (
      <button
        className={twMerge(
        "focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 whitespace-nowrap cursor-pointer",
        isIcon && "w-full md:w-auto flex items-center justify-center",
        heightCss,
        colorCss,
        className
        )}
        {...rest}
        disabled={disabled || isLoading}
        ref={ref}>
        {isLoading ? <Spinner className="mr-1" /> : isIcon && icon}
        {children}
      </button>
    );
    }
  );
  AppButton.displayName = 'AppButton'
  
  
  export default AppButton;