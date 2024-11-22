// @flow strict
import Link from "next/link";
import ActiveLink from "./ActiveLink";

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#16f2b3] text-xl md:text-2xl lg:text-3xl font-bold uppercase"
          >
            akash khan
          </Link>
        </div>

        <ul
          className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100"
          id="navbar-default"
        >
          <li>
            <ActiveLink path={"/#about"}>about</ActiveLink>
          </li>
          <li>
            <ActiveLink path={"/#experience"}>experience</ActiveLink>
          </li>
          <li>
            <ActiveLink path={"/#skills"}>skills</ActiveLink>
          </li>
          <li>
            <ActiveLink path={"/#education"}>Education</ActiveLink>
          </li>

          <li>
            <ActiveLink path={"/#projects"}>projects</ActiveLink>
          </li>
          <li>
            <ActiveLink path={"/#contact"}>contact</ActiveLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
