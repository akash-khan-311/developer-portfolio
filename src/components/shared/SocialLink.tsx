import Link from "next/link";
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";

const SocialLink = ({ data }: any) => {
  return (
    <div className=" flex items-center gap-5">
      <Link
        href={data?.socialLinks?.github}
        target="_blank"
        className="transition-all text-pink-500 hover:scale-125 duration-300"
      >
        <BsGithub size={30} />
      </Link>
      <Link
        href={data?.socialLinks?.linkedin}
        target="_blank"
        className="transition-all text-pink-500 hover:scale-125 duration-300"
      >
        <BsLinkedin size={30} />
      </Link>
      <Link
        href={data?.socialLinks?.facebook}
        target="_blank"
        className="transition-all text-pink-500 hover:scale-125 duration-300"
      >
        <FaFacebook size={30} />
      </Link>

      <Link
        href={data?.socialLinks?.twitter}
        target="_blank"
        className="transition-all text-pink-500 hover:scale-125 duration-300"
      >
        <FaTwitterSquare size={30} />
      </Link>
    </div>
  );
};

export default SocialLink;