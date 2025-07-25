// @flow strict

import { FlipWords } from '@/components/ui/flip-words';
import { getAboutData } from '@/lib/getAboutData';
import { personalData } from '@/utils/data/personal-data';
import Image from 'next/image';

async function AboutSection() {
  const data = await getAboutData();
  const { description, profileImage } = data.data;
  return (
    <section id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5  text-xl uppercase">
            <FlipWords className="text-[#16f2b3]" words={['Who I am']} />
          </p>
          <p className=" text-sm lg:text-lg">
            <FlipWords
              duration={500}
              className="text-white"
              words={[description]}
            />
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <Image
            src={profileImage}
            width={280}
            height={280}
            loading="lazy"
            alt="Akash Khan"
            className="rounded-lg transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-110 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
