import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
// import Home from '../pages/home';
import '../index.css'
import PageBase from '../components/template/layout';
import Home from '../pages/home';
import Bingo from '../pages/bingo';
import WatchBingo from '../pages/watch-bingo';



const router = createBrowserRouter([

  {
    path: "/",
    element: <PageBase />,
    errorElement: <div className='h-screen flex flex-col items-center justify-center'> <p className='font-bold text-3xl mb-5'>Error 404</p> <Link className='bg-gray-800 text-white px-10 py-4 hover:bg-gray-900 duration-200 rounded-xl' to={'/'}>Voltar para página principal</Link></div>,
    
    children: [
      
      {
        index: true,
        element: <Home />,
      },

      {
        path: '/sorteio',
        element: <Bingo />,
      },


      {
        path: '/versorteio',
        element: <WatchBingo />,
      },


  


  


    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);