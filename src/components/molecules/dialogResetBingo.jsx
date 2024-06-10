import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { collection, deleteDoc, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { UserAuth } from "../../context/authContext";
 
export function DialogResetBingo() {

  const { user } = UserAuth();

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  async function deleteAllBalls() {
    const ballsCollection = collection(db, `users/${user?.uid}/bingo`);
    const ballsSnapshot = await getDocs(ballsCollection);
    ballsSnapshot.forEach((doc) => deleteDoc(doc.ref));
    handleOpen();
  }

  return (
    <>
      <Button size="lg" className="mb-5 h-20 " onClick={handleOpen}>
       RECOMEÇAR BINGO
      </Button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Alerta!</DialogHeader>
        <DialogBody>
         Você tem certeza que deseja recomeçar o bingo? Todos os números serão resetados!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteAllBalls}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
