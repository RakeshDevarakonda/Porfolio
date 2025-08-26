import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkillsMarquee from '@/components/SkillsMarquee';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        
        <About />
        <SkillsMarquee />
        <Skills />

        <Projects />

        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;