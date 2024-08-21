"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import { appStore } from "../redux/store";
import React ,{ useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {Modal} from '../Modal'
const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch= useDispatch();
  
  useEffect( ()=>{
    if(typeof window !== 'undefined' && sessionStorage?.user){
     dispatch({type:"LOGIN",payload:{ isLoggedIn:true,user:sessionStorage?.user }})
 
    }
   },[])

 const isLoggedIn= useSelector( (state:any)=>{
        return state?.appReducer?.isLoggedIn
  })
  const user= useSelector( (state:any)=>{
    return state?.appReducer?.user
})
  const isShowModal= useSelector( (state:any)=>{
  return state?.appReducer?.isShowModal
})
const handleLogout = () => {
                const bool=confirm("Are You Sure ...");
                if(bool){
                  sessionStorage.clear();
                  dispatch({type:"LOGIN",payload:{ isLoggedIn:false ,user:"" }})
                }
                
 }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
               {isLoggedIn ? <div>
                <h3> {user} </h3>
                <div><button onClick={handleLogout}>Logout</button></div>
                {children}
                </div> : <Login /> }
                { isShowModal && <Modal />}
        </Provider>
         </body>
    </html>
  );
}
