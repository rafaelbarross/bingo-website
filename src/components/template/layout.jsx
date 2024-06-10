// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../organisms/header";
import { useState } from "react";
import { DrawerNav } from "../organisms/drawer";
import { AuthContextProvider } from "../../context/authContext";
import { checkIsPublicRoute } from "../../functions/check-is-public-route";
import PrivateRoute from "../private";
// import { DrawerNavigation } from "../organisms/drawer";
// import { AuthContextProvider } from "../../context/authContext";

export default function PageBase() {

    // function closeDiv() {
    //     const div = document.querySelector('#banner');
    //     div.style.display = 'none';
    // }

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const location = useLocation();
    const isPublicPage = checkIsPublicRoute(location.pathname);
    // console.log('pagina atual: ', location.pathname);
    
    return (
        <>
        <AuthContextProvider>

        <main className="min-h-screen flex-col bg-gray-200 bg-gradient-to-r from-teal-400 to-yellow-200">

            <Header openDrawer={openDrawer} open={open} />
            <DrawerNav open={open} closeDrawer={closeDrawer} />

            {isPublicPage &&     <Outlet />}

            {!isPublicPage && <PrivateRoute><Outlet /></PrivateRoute>}
        
        </main>
        </AuthContextProvider>
            
            {/* <SectionFooter/>
            <Footer /> */}

        </>

    );

}