import { Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { UserAuth } from '../../context/authContext'

export function BingoBalls() {
  const { user } = UserAuth();

  const [selectedBalls, setSelectedBalls] = useState([]);
  const bingoLetters = ['B', 'I', 'N', 'G', 'O'];

  const handleClick = async (letter, number) => {
    const ball = { letter, number, timestamp: Date.now() };
    const ballsCollection = collection(db, `users/${user?.uid}/bingo`);
  
    // Verifica se a bola já foi selecionada
    const alreadySelected = selectedBalls.find(b => b.number === number && b.letter === letter);
  
    if (alreadySelected) {
      // Se a bola já foi selecionada, remova-a da lista
      setSelectedBalls(prev => prev.filter(b => !(b.number === number && b.letter === letter)));
      // Remova a bola do banco de dados
     if (alreadySelected.id) {
    await deleteDoc(doc(db, `users/${user?.uid}/bingo`, alreadySelected.id));
  }
    } else {
      // Se a bola não foi selecionada, adicione-a à lista
      const docRef = await addDoc(ballsCollection, ball);
      setSelectedBalls(prev => [{ id: docRef.id, ...ball }, ...prev]);
    }
  }
  
  // useEffect(() => {
  //   const ballsCollection = collection(db, `users/${user?.uid}/bingo`);
  //   const q = query(ballsCollection, orderBy("timestamp", "desc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const balls = querySnapshot.docs.map(doc => doc.data());
  //     setSelectedBalls(balls);
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const ballsCollection = collection(db, `users/${user?.uid}/bingo`);
    const q = query(ballsCollection, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const balls = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSelectedBalls(balls);
    });
  
    return unsubscribe;
  }, []);
  




  return (
    <div className="bingo-balls gap-5 flex flex-wrap  mx-auto  py-7 items-center justify-center rounded-3xl bg-white drop-shadow-md shadow-md  m  overflow-y-auto px-4">
      <div className="flex flex-row  w-full justify-around gap-3">
        {bingoLetters.map((letter, index) => {
          const balls = Array.from({ length: 15 }, (_, i) => i + 1 + index * 15);
          return (
            <div key={letter} className="flex flex-col items-center gap-3 ">
              <Typography className="sticky -top-7 border-b z-[999] bg-white w-full text-center px-5 py-3 " variant="h5" >{letter}</Typography>
              {balls.map((number) => (
                <Button
                  className="rounded-full  p-0 h-12 w-12 border-2 flex flex-col items-center justify-center"
                  color={selectedBalls.some(b => b.number === number) ? 'black' : 'white'}
                  key={number}
                  onClick={() => handleClick(letter, number)}
                >
                  <span> {letter}</span>
                  <span> {number}</span>
                </Button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
