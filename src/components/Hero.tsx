import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '@/assets/Rakesh.jpg';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typing effect
  const skills = ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer','Web Developer'];
  const [skillText, setSkillText] = useState('');
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[skillIndex % skills.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setSkillText(currentSkill.substring(0, skillText.length + 1));
        if (skillText.length + 1 === currentSkill.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 120);
    } else {
      timeout = setTimeout(() => {
        setSkillText(currentSkill.substring(0, skillText.length - 1));
        if (skillText.length === 0) {
          setIsDeleting(false);
          setSkillIndex((prev) => prev + 1);
        }
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [skillText, isDeleting, skillIndex]);

  // Sparkles positions
  const sparkles = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Rakesh
              </span>
            </motion.h1>

            <motion.h2
              className="text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
             <span className="bg-gradient-primary bg-clip-text text-transparent">
              {skillText}
              
              </span>
              <span className="animate-pulse">|</span>
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Passionate about building scalable, user-friendly web applications with modern technologies
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button variant="hero" size="lg" onClick={() => scrollToSection('projects')}>
                View My Work
              </Button>
              <Button variant="neon" size="lg" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </Button>
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: Github, href: 'https://github.com/RakeshDevarakonda?tab=repositories', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/rakeshdevarakonda', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:rakeshdevarakonda2000@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-glow-primary hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Rotating glowing border */}
            <motion.div
              className="absolute w-96 h-96 rounded-full border border-primary/50 shadow-[0_0_30px_#0ea5e9] pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            />

            {/* Halo rings */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            >
              <div className="absolute w-80 h-80 border-2 border-primary rounded-full opacity-20 shadow-[0_0_20px_#0ea5e9]"></div>
              <div className="absolute w-72 h-72 border-2 border-primary rounded-full opacity-10 shadow-[0_0_10px_#0ea5e9]"></div>
            </motion.div>

            {/* Sparkles */}
            {sparkles.map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_6px_#0ea5e9]"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${deg}deg) translate(160px) rotate(-${deg}deg)`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: i * 0.1 }}
              />
            ))}

            {/* Profile image */}
            <motion.div
              className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary shadow-glow-primary relative z-10"
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={profileImg} alt="Rakesh Devarakonda" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-primary opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="p-2 rounded-full border border-border hover:border-primary transition-all duration-300"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


