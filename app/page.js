import Footer from './components/footer';
import AboutSection from './components/homepage/about';
import ContactSection from './components/homepage/contact';
import Education from './components/homepage/education';
import Experience from './components/homepage/experience';
import HeroSection from './components/homepage/hero-section';
import Projects from './components/homepage/projects';
import Skills from './components/homepage/skills';
import ParticlesComponent from './components/Particles';
import ScrollLoader from './components/ScrollLoader/ScrollLoader';

export default async function Home() {
  return (
    <>
      <ScrollLoader />
      <HeroSection />
      <div className="py-0 my-0 relative container mx-auto">
        <ParticlesComponent />
        <AboutSection />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <ContactSection />
      </div>
    </>
  );
}
