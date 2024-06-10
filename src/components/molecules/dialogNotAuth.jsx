// import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../../context/authContext";
 
DialogNotAuth.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
  };

export function DialogNotAuth({open, setOpen, handleOpen}) {

  const { googleSignIn } = UserAuth();

  const handleSignIn = async () => {

    try {
      await googleSignIn()
      setOpen(false);
    } catch (error) {
      console.log(error);

    }
  }


//   const [open, setOpen] = React.useState(false);
 
//   const handleOpen = () => setOpen(!open);
 
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog
      size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Olá, boas vindas!</DialogHeader>
        <DialogBody>
         Para começar o sorteio do seu bingo, primeiro entre ou crie sua conta na Bingo Brasil!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            // color="red"
            onClick={() => {setOpen(false)}}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="outlined" color="black" className="flex items-center gap-5" onClick={handleSignIn}>
          <FcGoogle className="w-5 h-5" /> <span>Entrar ou Criar conta</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}