import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { ToastContainer } from 'react-toastify';
import "./css/card.scss";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Akash Khan - Web Developer",
  description:
    "This is the portfolio of Akash Khan. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export default function RootLayout({ children }) {
  // This is the root layout for the application
  
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${inter.className} bg-[#030400]`}>
        <header>
          <Navbar />
        </header>
        <ToastContainer position="bottom-right" />
        <main
          id="#home"
          className=""
        >
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
