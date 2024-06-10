// import React from 'react'

import { Typography } from "@material-tailwind/react";
// import { BingoBalls } from "../components/molecules/ball";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, query, orderBy, limit, collection, doc } from "firebase/firestore";
import { UserAuth } from "../context/authContext";
import { IoMdArrowDropdown } from "react-icons/io";
import BingoWinner from "../components/molecules/bingoWinner";

export default function WatchBingo() {

  const { user, setBingo, bingo } = UserAuth();

  // const [bingo, setBingoo] = useState(false);

  useEffect(() => {
    const bingoDoc = doc(db, `users/${user?.uid}/bingo/winner`);
    const unsubscribe = onSnapshot(bingoDoc, (doc) => {
      // setBingoo(doc.data().bingo);
      setBingo(doc.data().bingo);
    });

    return unsubscribe;
  }, []);


  const [selectedBall, setSelectedBall] = useState({ letter: '', number: '' });

  useEffect(() => {
    const ballsCollection = collection(db, `users/${user?.uid}/bingo`);
    const q = query(ballsCollection, orderBy("timestamp", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const balls = querySnapshot.docs.map(doc => doc.data());
      setSelectedBall(balls[0] || { letter: '', number: '' });
    });

    return unsubscribe;
  }, []);



  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 px-6   bg-cover bg-center h-screen overflow-x-hidden">

      {

        bingo ?
          <BingoWinner />
          : null
      }

      <main className="gap-5 md:gap-0 grid  md:grid-cols-[1fr_auto] absolute top-0 right-0 left-0 bottom-0 px-6 bg-gradient-to-r from-teal-400 to-yellow-200  bg-cover bg-center h-screen overflow-x-hidden">

        {
          bingo ?

            <Typography variant="h1" className="m-auto z-[99] text-4xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              BINGO
            </Typography>

            :

            <div className="flex items-center justify-center  flex-col mt-0 z-[999]">

              <div className="bg-red-500 relative mb-10 sm:mb-20 rounded-lg">

                <Typography className=" top-0  bg-white p-3 rounded-lg border-2 border-black" variant="h2">Número sorteado</Typography>
                <IoMdArrowDropdown className="absolute w-24 h-24 text-black top-[2.28rem] right-0 left-28 bottom-0" />

              </div>

              <div className="bg-white text-center drop-shadow-xl shadow-2xl rounded-full  h-60 w-60 flex items-center justify-center z-[999]   border-4 border-black ">

                <div>


                  <span className="text-7xl text-center">{selectedBall.letter}</span> <br />
                  <span className="text-7xl text-center">{selectedBall.number}</span>

                </div>

              </div>

            </div>

        }

        {/* <div className=" py-5 max-h-[90%] overflow-y-auto">

        <BingoBalls />

      </div> */}

      </main>
    </div>

  )
}
