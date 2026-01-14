import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'word' | 'character' | 'line';
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  type = 'word' 
}: AnimatedTextProps) {
  const words = text.split(' ');
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: type === 'character' ? 0.03 : 0.12, 
        delayChildren: delay 
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (type === 'line') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.8, 
          delay,
          type: 'spring',
          damping: 15,
          stiffness: 100,
        }}
      >
        {text}
      </motion.div>
    );
  }

  if (type === 'character') {
    return (
      <motion.span
        className={`inline-flex flex-wrap ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
