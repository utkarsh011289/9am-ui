"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import { appStore } from "../redux/store";
import { Provider, useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const isLoggedIn= useSelector( (state:any)=>{
        return state?.appReducer?.isLoggedIn
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
               {isLoggedIn ? children : <Login /> }
        </Provider>
         </body>
    </html>
  );
}
