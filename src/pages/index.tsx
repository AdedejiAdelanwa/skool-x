import { Button } from '@chakra-ui/react'
import Head from 'next/head'



export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome To Skool-X</title>
        <meta name="description" content="The database for students and teachers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Button bg={"brand.peabuxblue"} color={"white"}>Click me</Button>
      </main>
    </>
  )
}
