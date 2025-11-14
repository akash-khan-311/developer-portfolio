import { Inter } from "next/font/google";
import "../css/card.scss";
import "../css/globals.scss";
import "../css/globals.css";
import Preloader from "@/components/UI/PreLoader";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/helper/scroll-to-top";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Akash Khan - Web Developer",
  description:
    "This is the portfolio of Akash Khan. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${inter.className}`}>
        <Preloader>
          <header>
            <Navbar />
          </header>
          <>{children}</>
          <ScrollToTop />
          <Footer />
        </Preloader>
      </body>
    </html>
  );
}
