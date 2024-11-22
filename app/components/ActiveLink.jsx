"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const ActiveLink = ({ path, children }) => {
  const searchParams = useSearchParams();
  const isActive = searchParams === path;

  return (
    <>
      <Link
        className={`${
          isActive && "text-[#16f2b3] after:w-full"
        } inline-block after:contents[""] after:block after:w-0 after:h-[2px] after:bg-[#16f2b3] after:transition-all after:duration-300 after:hover:w-full  transition-colors hover:text-[#16f2b3] px-4 py-2`}
        href={path}
      >
        <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3] uppercase">
          {children}
        </div>
      </Link>
    </>
  );
};
export default ActiveLink;
