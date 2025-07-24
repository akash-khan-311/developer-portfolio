import dynamic from 'next/dynamic';
import ScrollLoader from './components/ScrollLoader/ScrollLoader';
import LazyLoad from '@/components/LazyLoad';
// import HeroSection from './components/homepage/hero-section';
// import ParticlesComponent from './components/Particles';
// import ScrollLoader from './components/ScrollLoader/ScrollLoader';

// import ContactSection from './components/homepage/contact';
// import Education from './components/homepage/education';
// import Experience from './components/homepage/experience';
// import Projects from './components/homepage/projects';
// import Skills from './components/homepage/skills';
// import AboutSection from './components/homepage/about';

const HeroSection = dynamic(
  () => import('./components/homepage/hero-section'),
  {
    ssr: true,
  }
);
const ContactSection = dynamic(() => import('./components/homepage/contact'), {
  ssr: true,
});
const Education = dynamic(() => import('./components/homepage/education'), {
  ssr: true,
});
const Projects = dynamic(() => import('./components/homepage/projects'), {
  ssr: true,
});
const Skills = dynamic(() => import('./components/homepage/skills'), {
  ssr: true,
});
const AboutSection = dynamic(() => import('./components/homepage/about'), {
  ssr: true,
});
const Experience = dynamic(() => import('./components/homepage/experience'), {
  ssr: true,
});
const ParticlesComponent = dynamic(() => import('./components/Particles'), {
  ssr: true,
});

export default async function Home() {
  return (
    <main>
      <ScrollLoader />
      <HeroSection />
      <div className="py-0 my-0 relative container mx-auto">
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
