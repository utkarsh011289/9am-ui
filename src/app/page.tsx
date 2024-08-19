import Image from "next/image";
import styles from "./page.module.css";
import { Register } from "@/Register/Register";
import { Users } from "@/Users"

export default function Home() {
  return <div>
            <Register />
            <Users />
            
        </div>
}
