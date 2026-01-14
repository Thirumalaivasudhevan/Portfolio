import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { GraduationCap, Calendar, Award } from 'lucide-react';
const education = [{
  degree: 'B.Sc Computer Technology',
  institution: 'Nandha Arts and Science',
  period: '2023 - 2026',
  grade: '6.9/10 GPA',
  status: 'current'
}, {
  degree: 'Higher Secondary',
  institution: 'Govt Higher Secondary School',
  period: '2020 - 2022',
  grade: '67%',
  status: 'completed'
}];
export default function EducationSection() {
  return <section id="education" className="py-24 relative">
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
            <GraduationCap className="w-4 h-4" />
            Academic Journey
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="Education" className="gradient-text" type="word" />
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => <motion.div key={edu.degree} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.2
        }} whileHover={{
          scale: 1.02
        }} className="relative">
              <div className="glass-card-glow p-8 relative overflow-hidden">
                {/* Status indicator */}
                {edu.status === 'current' && <motion.div animate={{
              opacity: [0.5, 1, 0.5]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400 font-medium">Current</span>
                  </motion.div>}

                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Icon */}
                  <motion.div className="shrink-0" whileHover={{
                rotate: 360
              }} transition={{
                duration: 0.6
              }}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-sans">
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground mb-4">{edu.institution}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-secondary" />
                        <span className="font-semibold text-primary">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative line */}
                <motion.div initial={{
              scaleX: 0
            }} whileInView={{
              scaleX: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.3
            }} className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left" />
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}