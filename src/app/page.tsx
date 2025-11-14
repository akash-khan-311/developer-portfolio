import dynamic from "next/dynamic";
import ScrollLoader from "@/components/ScrollLoader/ScrollLoader";
import LazyLoad from "@/components/LazyLoad";
const HeroSection = dynamic(
  () => import("@/components/homepage/hero-section"),
  {
    ssr: true,
  }
);
const ContactSection = dynamic(() => import("@/components/homepage/contact"), {
  ssr: true,
});
const Education = dynamic(() => import("@/components/homepage/education"), {
  ssr: true,
});
const Projects = dynamic(() => import("@/components/homepage/projects"), {
  ssr: true,
});
const Skills = dynamic(() => import("@/components/homepage/skills"), {
  ssr: true,
});
const AboutSection = dynamic(() => import("@/components/homepage/about"), {
  ssr: true,
});
const Experience = dynamic(() => import("@/components/homepage/experience"), {
  ssr: true,
});
const ParticlesComponent = dynamic(() => import("@/components/Particles"), {
  ssr: true,
});
export default function Home() {
  return (
    <main className="bg-[#030400]">
      <ScrollLoader />
      <HeroSection />
      <div className="container relative py-0 mx-auto my-0">
        <ParticlesComponent />
        <LazyLoad>
          <AboutSection />
        </LazyLoad>
        <LazyLoad>
          <Experience />
        </LazyLoad>
        <LazyLoad>
          <Skills />
        </LazyLoad>
        <LazyLoad>
          <Projects />
        </LazyLoad>
        <LazyLoad>
          <Education />
        </LazyLoad>
        <LazyLoad>
          <ContactSection />
        </LazyLoad>
      </div>
    </main>
  );
}
