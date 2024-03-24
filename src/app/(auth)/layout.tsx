"use client";
import Link from "next/link"
import {usePathname} from "next/navigation";
import "./style.css";

const navLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Forgot Password", href: "/forgot-password" },
]
export default function AuthLayout({
   children,
}: {
   children: React.ReactNode
}) {
    const pathname = usePathname();
    return (
        <html lang="en">
        <body>
        <header
            style={{

            }}>
        </header>
        {children}</body>
        </html>
    )}
