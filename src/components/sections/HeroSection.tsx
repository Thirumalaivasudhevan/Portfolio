import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Lanyard from '../ui/Lanyard';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <motion.div
        className="w-full h-full absolute inset-0 z-10"
        style={{ opacity }}
      >
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </motion.div>

      {/* Text Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none container mx-auto px-6 flex items-center">
        <div className="pointer-events-auto text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-black/50 backdrop-blur-sm text-primary">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-orbitron leading-tight text-white drop-shadow-lg"
          >
            Hi I am <br />
            <span className="gradient-text-hero">Thirumalai</span>
          </motion.h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}