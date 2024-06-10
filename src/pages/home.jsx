// import React from 'react'

import { Typography } from "@material-tailwind/react";

// import BingoBalls from "../components/ballss";


export default function Home() {
  return (
    <main className="grid place-content-center place-items-center bg-center absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-r from-teal-400 to-yellow-200 bg-cover h-screen">
      {/* <img src="./1.png" className="absolute top-0 right-0 left-0 h-[10rem] w-full" alt="" />
      <img src="./2.png" className="absolute  bottom-0 right-0  h-full w-[10rem]" alt="" />
      <img src="./3.png" className="absolute  bottom-0 right-0 h-[10rem] w-full " alt="" />
      <img src="./4.png" className="absolute bottom-0 left-0  h-full w-[10rem]" alt="" />
   */}
      {/* <img src="./icon.svg" className="w-[16rem] " alt="" /> */}
      <Typography variant="h1" color="white" className="text-4xl md:text-9xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        BINGO BRASIL
      </Typography>
      {/* <BingoBalls/> */}
    </main>
  )
}
