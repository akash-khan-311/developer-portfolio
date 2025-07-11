'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";

function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith('/login')
  return (
    <div className={`${(isAdmin || isLogin) && "hidden"} relative border-t bg-[#0d1224] border-[#353951] text-white`}>
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <p className="text-sm">
            © Developer Portfolio by{" "}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/md-akash-ali-9585a02a0/"
              className="text-[#16f2b3]"
            >
              Akash Khan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
