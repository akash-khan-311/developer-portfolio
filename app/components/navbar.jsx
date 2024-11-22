"use client";
// @flow strict
import Link from "next/link";
import { Turn as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHander] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  console.log(activeSection);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const scrollHandler = () => {
    if (window.scrollY > 1) {
      setHander(true);
    } else {
      setHander(false);
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-transparent transition-all duration-500 ${
        header && "w-full backdrop-blur-2xl bg-black/30 border-b-[#353951]"
      } z-[999] fixed w-full mx-auto text-white top-0`}
    >
      <div className="flex items-center justify-between py-5 container ">
        <div className="flex flex-shrink-0 items-center ml-3 lg:ml-6">
          <Link
            href="/"
            className="text-[#16f2b3] text-xl md:text-2xl lg:text-3xl font-bold uppercase"
          >
            akash khan
          </Link>
        </div>

        <ul className="hidden lg:flex h-screen max-h-0 w-full flex-col items-start md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-4 md:opacity-100">
          {[
            { id: "/", name: "Home" },
            { id: "about", name: "About" },
            { id: "experience", name: "Experience" },
            { id: "skills", name: "Skills" },
            { id: "projects", name: "Projects" },
            { id: "education", name: "Education" },
            { id: "contact", name: "Contact" },
          ].map((link) => (
            <li className="text-sm font-light" key={link.id}>
              <Link
                href={`${link.id === "/" ? "/" : "#" + link.id}`}
                className={`inline-block after:contents[""] after:block after:w-0 after:h-[2px] after:bg-[#16f2b3] after:transition-all after:duration-300 after:hover:w-full  transition-colors uppercase hover:text-[#16f2b3]  p-2 ${
                  activeSection === link.id
                    ? "text-[#16f2b3] after:w-full"
                    : "white hover:text-[#16f2b3]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="fixed z-[999] right-10 items-center space-x-4 lg:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={handleToggle}
            size={25}
            toggledClassName="text-white"
          />
          <div className="relative">
            {/* Drawer */}
            <div
              className={`fixed top-0 left-0 bottom-0 z-[120] bg-[#101123] h-80 text-white p-6 w-full transition-transform duration-500 ${
                isOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 fill-white p-4 inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 50 50"
                >
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
              </button>
              <ul className="flex flex-col items-center justify-center space-y-4">
                {[
                  { id: "home", name: "Home" },
                  { id: "about", name: "About" },
                  { id: "experience", name: "Experience" },
                  { id: "skills", name: "Skills" },
                  { id: "projects", name: "Projects" },
                  { id: "education", name: "Education" },
                  { id: "contact", name: "Contact" },
                ].map((link) => (
                  <li
                    key={link.id}
                    className="text-xl uppercase hover:text-[#16f2b3] transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={`#${link.id}`}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Overlay */}
            {isOpen && (
              <div
                className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/10 z-[100]"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
