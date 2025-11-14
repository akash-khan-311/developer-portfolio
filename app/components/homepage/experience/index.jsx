// @flow strict
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import experience from "/public/lottie/code.json";
import { getExperienceData } from "@/lib/getExperienceData";
import { formatDate } from "@/utils/formatDate";

async function Experience() {
  const result = await getExperienceData();
  console.log("this is for expericen index", result);

  const experiences = result?.data || [];
  return (
    <section
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-start justify-center">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map((experience) => (
                <GlowCard
                  key={experience?._id}
                  identifier={`experience-${experience?._id}`}
                >
                  <div className="relative p-3">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        ( {formatDate(experience?.startDate)} -{" "}
                        {experience?.endDate === Date
                          ? formatDate(experience?.endDate)
                          : "Present"}{" "}
                        )
                      </p>
                    </div>
                    <div className="flex items-center px-3 py-5 gap-x-8">
                      <div className="transition-all duration-300 text-violet-500 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="mb-2 text-base font-medium uppercase sm:text-xl">
                          {experience?.role}
                        </p>
                        <p className="text-sm sm:text-base">
                          {experience?.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
