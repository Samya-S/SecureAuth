import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SecureAuth",
  description: "SecureAuth - Security Made Simple, Authentication Made Strong",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <div className="h-10"></div>
      </body>
    </html>
  );
}
