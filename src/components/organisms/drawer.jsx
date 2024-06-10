import  { useEffect, useState } from "react";
import {
  Drawer,
  
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
// import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../../context/authContext";
import { GiPodiumWinner } from "react-icons/gi";
import { PiPresentationDuotone } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { DialogNotAuth } from "../molecules/dialogNotAuth";
// import { redirect } from "react-router-dom";

DrawerNav.propTypes = {
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
};

export function DrawerNav({ open, closeDrawer }) {

  const { user, googleSignIn } = UserAuth();

  const [openDialog, setOpenDialog] = useState(false);
 
  const handleOpen = () => setOpenDialog(!open);
 

  const handleSignIn = async () => {

    try {
      await googleSignIn()
      closeDrawer()
    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Rola para o topo da página
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpeza ao desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]); // Verifique 'open', não 'closeDrawer'

  return (
    <>
    <DialogNotAuth open={openDialog} setOpen={setOpenDialog} handleOpen={handleOpen} />
      {/* <Button variant={'text'} className={' p-1'} onClick={openDrawer}><Bars3BottomLeftIcon className="h-8 w-8 text-white" /></Button> */}
      <Drawer open={open} onClose={closeDrawer} className="flex flex-col z-[99999999999]">
        
        <div className="mb-2 flex items-center justify-between p-4">
          {/* <div>{user?.displayName}</div> */}
          <Typography variant="h5" color="blue-gray">
            Bingo Brasil
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <Link onClick={closeDrawer} to={'/'}>

            <ListItem>
              <ListItemPrefix>
                <FaHome className="w-5 h-5" />

              </ListItemPrefix>
              Página principal
            </ListItem>
          </Link>

          {/* <ListItem>
            <ListItemPrefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                  clipRule="evenodd"
                />
              </svg>
            </ListItemPrefix>
            Analytics
            <ListItemSuffix>
              <Chip
                value="5"
                size="sm"
                color="green"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem> */}
          <Link onClick={() => {user ? closeDrawer() : setOpenDialog(true)}} to={'/sorteio'}>

            <ListItem>
              <ListItemPrefix>
                <GiPodiumWinner className="w-5 h-5" />
              </ListItemPrefix>
              Começar bingo
            </ListItem>
          </Link>

          <Link onClick={() => {user ? closeDrawer() : setOpenDialog(true)}} to={'versorteio'}>

            <ListItem>
              <ListItemPrefix>
                <PiPresentationDuotone className="w-5 h-5" />

              </ListItemPrefix>
              Exibir sorteio
            </ListItem>
          </Link>

          {!user ?
            <ListItem onClick={handleSignIn}>
              <ListItemPrefix>
                <FcGoogle className="w-5 h-5" />
              </ListItemPrefix>
              Entrar ou criar conta
            </ListItem>

            :
            null
          }


        </List>

        {/* <Button className="mt-3 ml-5" size="sm">
          Documentation
        </Button> */}

        <footer className=" pr-2 mb-3 mt-auto flex">
          <Typography variant="paragraph" className="mx-auto">
              Desenvolvido por <a target="_blank" rel="noreferrer" href="https://github.com/rafaelbarross"  className="font-bold cursor-pointer hover:underline">Rafael Barros</a>
          </Typography>
        </footer>

        
      </Drawer>
    </>
  );
}