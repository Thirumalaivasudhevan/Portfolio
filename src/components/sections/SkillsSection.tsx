import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { Code, Brain, Users, Layers, GitBranch, Palette, MessageSquare, Terminal, Sparkles } from 'lucide-react';
const skills = [{
  name: 'Python',
  icon: Code,
  category: 'Language'
}, {
  name: 'Artificial Intelligence',
  icon: Brain,
  category: 'Domain'
}, {
  name: 'Agent Handling',
  icon: Terminal,
  category: 'Technical'
}, {
  name: 'Leadership',
  icon: Users,
  category: 'Soft Skill'
}, {
  name: 'Multi-tasking',
  icon: Layers,
  category: 'Soft Skill'
}];
const software = [{
  name: 'Google Antigravity',
  icon: Code,
  level: 85
}, {
  name: 'Comet',
  icon: Terminal,
  level: 80
}, {
  name: 'ChatGPT',
  icon: MessageSquare,
  level: 90
}, {
  name: 'Git',
  icon: GitBranch,
  level: 85
}, {
  name: 'Canva/Photoshop',
  icon: Palette,
  level: 75
}];
export default function SkillsSection() {
  return <section id="skills" className="py-24 relative">
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
            <Sparkles className="w-4 h-4" />
            My Expertise
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="Skills & Tools" className="gradient-text" type="word" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Grid */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h3 className="text-2xl font-bold mb-8 font-orbitron">Core Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => <motion.div key={skill.name} initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.05,
              y: -5
            }} className="glass-card-glow p-6 text-center group cursor-pointer">
                  <motion.div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" whileHover={{
                rotate: 360
              }} transition={{
                duration: 0.5
              }}>
                    <skill.icon className="w-6 h-6" />
                  </motion.div>
                  <h4 className="font-semibold text-foreground mb-1">{skill.name}</h4>
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Software & Tools */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <h3 className="text-2xl font-bold mb-8 font-orbitron">Software & Tools</h3>
            <div className="space-y-6">
              {software.map((tool, index) => <motion.div key={tool.name} initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                        <tool.icon className="w-[30px] h-[30px]" />
                      </div>
                      <span className="font-medium font-sans text-2xl">{tool.name}</span>
                    </div>
                    <span className="text-primary font-bold">{tool.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" initial={{
                  width: 0
                }} whileInView={{
                  width: `${tool.level}%`
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  delay: 0.3 + index * 0.1
                }} />
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}