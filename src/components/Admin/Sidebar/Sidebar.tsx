"use client";
import { useState } from "react";
// Components
import MenuItem from "./MenuItem/MenuItem";
import { signOut } from "next-auth/react";
// Icons
import { MdLogout } from "react-icons/md";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { GiSkills } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { PiMonitorFill } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
    const [isActive, setActive] = useState(false);
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive);
    };
    return (
        <>
            {/* Small Screen Navbar */}
            <div className="text-gray-100 flex justify-between lg:hidden relative z-[9]">
                <button
                    onClick={handleToggle}
                    className="absolute right-0 top-0 p-4 focus:outline-none"
                >
                    <AiOutlineBars className="h-8 w-8" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 lg:fixed flex flex-col justify-between overflow-x-hidden backdrop-blur-md bg-white/10 w-64 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"
                    } lg:translate-x-0 transition duration-200 ease-in-out`}
            >
                {/* লোগো/নাম একদম টপে */}
                <div className="flex flex-col items-center justify-center mb-4">
                    <Link
                        href="/"
                        className="text-[#16f2b3] text-xl md:text-2xl lg:text-3xl font-bold uppercase"
                    >
                        akash <span className="text-pink-600">khan</span>
                    </Link>
                    <div className="flex flex-col flex-1 justify-center space-y-2 mt-10">
                        <MenuItem icon={FaHome} label={"Hero Section"} path={"/admin/hero"} />
                        <MenuItem icon={FcAbout} label={"About Section"} path={"/admin/about"} />
                        <MenuItem icon={FaCode} label={"Experience Section"} path={"/admin/experience"} />
                        <MenuItem icon={GiSkills} label={"Skills Section"} path={"/admin/skills"} />
                        <MenuItem icon={PiMonitorFill} label={"Project Section"} path={"/admin/project"} />
                        <MenuItem icon={FaUserGraduate} label={"Education Section"} path={"/admin/education"} />
                        <MenuItem icon={MdContactMail} label={"Contact Section"} path={"/admin/contact"} />
                    </div>
                </div>

                {/* মেনু আইটেম মাঝখানে */}


                {/* Logout একদম নিচে */}
                <div className="mb-2">
                    <hr className="border-white/20 mb-2" />
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center px-4 py-2 hover:backdrop-blur-sm  text-white transition-colors duration-300 transform"
                    >
                        <MdLogout className="w-5 h-5" color="white" />
                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );

};

export default Sidebar;