import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Github } from 'lucide-react';
const navLinks = [{
  href: '#home',
  label: 'Home'
}, {
  href: '#about',
  label: 'About'
}, {
  href: '#skills',
  label: 'Skills'
}, {
  href: '#experience',
  label: 'Experience'
}, {
  href: '#projects',
  label: 'Projects'
}, {
  href: '#education',
  label: 'Education'
}, {
  href: '#contact',
  label: 'Contact'
}];
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <>
    <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">


        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => <motion.a key={link.href} href={link.href} onClick={e => {
            e.preventDefault();
            scrollToSection(link.href);
          }} className={`nav-link font-medium ${activeSection === link.href.slice(1) ? 'text-primary' : ''}`} initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1 * index
          }} whileHover={{
            y: -2
          }}>
            {link.label}
          </motion.a>)}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <motion.a
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <Mail className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
          >
            <Github className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button className="lg:hidden glass-card p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>
    </motion.nav>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        x: '100%'
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }} className="fixed inset-0 z-40 lg:hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <motion.div className="absolute right-0 top-0 bottom-0 w-72 glass-card p-8 pt-24" initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => <motion.a key={link.href} href={link.href} onClick={e => {
              e.preventDefault();
              scrollToSection(link.href);
            }} className={`text-lg font-medium transition-colors ${activeSection === link.href.slice(1) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} initial={{
              opacity: 0,
              x: 50
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.1 * index
            }}>
              {link.label}
            </motion.a>)}
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}