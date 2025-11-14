
import Image from 'next/image'
import Link from 'next/link';

function ProjectCard({ project }) {

  const {title,image,description,codeLink,liveLink,technologies} = project

  return (
 <section className="my-10 bg-[#1C133A] p-5 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-x-10 ">
        <div className="cursor-pointer border border-pink-600 overflow-hidden  w-full lg:w-2/4 md:w-3/4 md:h-96  rounded-md">
          <Image
            src={image}
            className="hover:scale-105 transition-all duration-500 w-full h-full "
            alt={title}
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white capitalize  font-semibold mt-5 md:mt-0">
            {title}
          </h2>
          <p className="text-gray-400 text-lg lg:my-6 my-1 text-center md:text-left">
            {description}
          </p>
          <div className="flex gap-5 flex-wrap justify-center items-center md:items-start md:justify-start">
            {" "}
            {technologies.map((tech) => (
              <p
                key={tech}
                className="text-gray-600  bg-gray-300 p-1 rounded-lg"
              >
                {tech}
              </p>
            ))}
          </div>
          <div className="flex gap-x-5 mt-5">
            {/* Live Link */}
            <Link
              href={liveLink}
              target="_blank"
              className=" text-white uppercase bg-pink-600 py-2 px-8 rounded-md text-sm"
            >
              Live Link
            </Link>

            {/* Code Link */}
            <Link
              href={codeLink}
              target="_blank"
              className=" text-white  uppercase bg-pink-600 py-2 px-8 rounded-md text-sm">
              Code Link
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;