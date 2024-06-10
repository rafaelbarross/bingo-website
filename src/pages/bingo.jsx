// import React from 'react'

import { Button, Typography } from "@material-tailwind/react";
import { BingoBalls } from "../components/molecules/ball";
import { DialogResetBingo } from "../components/molecules/dialogResetBingo";
import { UserAuth } from "../context/authContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Bingo() {
  const { user, bingo, setBingo } = UserAuth();

  // const handleClick = async () => {
  //   const bingoDoc = doc(db, `users/${user?.uid}/bingo/winner`);
  //   await setDoc(bingoDoc, { bingo: !bingo }, { merge: true });
  // };

  const handleClick = async () => {
    const bingoDoc = doc(db, `users/${user?.uid}/bingo/winner`);
    const docSnap = await getDoc(bingoDoc);

    if (docSnap.exists()) {
      const currentBingoValue = docSnap.data().bingo;
      setBingo(!currentBingoValue);
      await setDoc(bingoDoc, { bingo: !currentBingoValue }, { merge: true });
    } else {
      // Document doesn't exist, initialize it to true
      setBingo(true);
      await setDoc(bingoDoc, { bingo: true }, { merge: true });
    }
  };


  return (
    <main className={' absolute right-0 left-0 top-16 bottom-0  sm:max-w-5xl mx-auto py-10 px-2 flex flex-col '}>

      {/* <Button  size="lg" variant="" className="!mx-auto !mb-5 h-20">

Recomeçar bingo
      </Button> */}
      <div className=" gap-5 flex w-fit mx-auto">

        <DialogResetBingo />

        <Button size="lg" className={`mb-5 h-20 mx-auto ${bingo ? 'border-2 bg-white border-black text-black ' : null}`} onClick={handleClick}>
          bingo
        </Button>
      </div>


      <Typography variant="h3" className="text-center mb-5" >Selecione o número sorteado</Typography>

      <BingoBalls />



    </main>
  )
}
