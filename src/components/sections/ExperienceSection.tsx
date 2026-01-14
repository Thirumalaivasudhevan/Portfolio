import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { Briefcase, Code, Megaphone, Sparkles } from 'lucide-react';
const experiences = [{
  title: 'Web Development',
  type: 'Intern',
  icon: Code,
  description: 'I have worked on multiple projects, starting from basic web applications using HTML, CSS, and a simple backend, to AI-powered business solutions. I also have experience in startup-level product planning and UI design.',
  highlights: ['HTML/CSS Development', 'AI-powered Solutions', 'UI Design', 'Product Planning']
}, {
  title: 'Digital Marketing',
  type: 'Intern',
  icon: Megaphone,
  description: 'I have experience in digital marketing, focusing on online promotion, analytics, and performance optimization. I continuously learn new tools and strategies to improve results.',
  highlights: ['Online Promotion', 'Analytics', 'Performance Optimization', 'Strategy Development']
}];
export default function ExperienceSection() {
  return <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-primary/10 text-primary mb-6">
            <Briefcase className="w-4 h-4" />
            Work Experience
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="My Journey" className="gradient-text" type="word" />
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div initial={{
            scaleY: 0
          }} whileInView={{
            scaleY: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 1
          }} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary origin-top" />

            {experiences.map((exp, index) => <motion.div key={exp.title} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.2
          }} className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <motion.div initial={{
              scale: 0
            }} whileInView={{
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.2 + 0.3
            }} className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow" />
                </motion.div>

                {/* Content */}
                <motion.div whileHover={{
              scale: 1.02
            }} className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card-glow p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300" whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.5
                  }}>
                        <exp.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold font-sans">{exp.title}</h3>
                        <span className="text-sm text-primary">{exp.type}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, i) => <motion.span key={highlight} initial={{
                    opacity: 0,
                    scale: 0.8
                  }} whileInView={{
                    opacity: 1,
                    scale: 1
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: 0.5 + i * 0.1
                  }} className="skill-tag text-xs bg-foreground text-primary-foreground">
                          {highlight}
                        </motion.span>)}
                    </div>
                  </div>
                </motion.div>
              </motion.div>)}
          </div>

          {/* Interests */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="mt-16 text-center">
            <div className="glass-card p-8 inline-block">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-orbitron">platforms</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['IoT', 'AI Agents', 'Smart Systems', 'Innovation'].map((interest, index) => <motion.span key={interest} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.2 + index * 0.1
              }} whileHover={{
                scale: 1.1
              }} className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground font-medium border border-primary/30">
                    {interest}
                  </motion.span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}