
import { FlipWords } from "@/components/ui/flip-words";
import { getHeroData } from "@/lib/getHeroData";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

async function  HeroSection() {
  const data = await getHeroData();

  const {greet,introText,name,backgroundImage} = data.data;

  return (
    <section
      id="/"
      className={`relative overflow-x-hidden  py-4 lg:py-12 flex items-center justify-center    bg-black bg-[url('https://res.cloudinary.com/dtvnmf35l/image/upload/v1750328342/jlcm8kzjp4py3hespkgp.jpg')] bg-no-repeat bg-right bg-contain h-screen w-full `}
    >
      {/* <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      /> */}

      <div className="flex flex-col justify-start items-start lg:flex-row lg:gap-12 gap-y-8 container mx-auto">
        <div className="w-full flex flex-col items-start justify-start p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl lg:text-6xl font-bold  text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[4.5rem]">
            {greet}, <br />
            This is
            <span>
              <FlipWords words={[name]} />
            </span>
            <br />
            <span className=" text-white">
              {`I'm a `}
              <FlipWords words={introText} className="text-[#16f2b3]" />
            </span>
          </h1>

          <div className="my-12 flex items-center gap-5">
            <Link
              href={personalData.github}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.facebook}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaFacebook size={30} />
            </Link>

            <Link
              href={personalData.twitter}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaTwitterSquare size={30} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
            >
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              target="_blank"
              href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>
          </div>
        </div>
       
      </div>
    </section>
  );
}

export default HeroSection;
