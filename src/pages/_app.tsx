import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}
