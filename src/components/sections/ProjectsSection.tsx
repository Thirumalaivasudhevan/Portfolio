import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { Folder, ExternalLink, Github, BookOpen, Search, Sparkles } from 'lucide-react';
const projects = [{
  title: 'Acadify',
  description: 'An educational platform designed to help students manage academic resources and learning activities efficiently, with a focus on simplicity and usability.',
  tags: ['Education', 'Web App', 'UI/UX'],
  icon: BookOpen,
  color: 'from-primary to-cyan-400'
}, {
  title: 'Lost & Found Portal',
  description: 'A web-based system that helps users report, search, and recover lost items easily by connecting finders and owners through a centralized platform.',
  tags: ['Community', 'Full Stack', 'Database'],
  icon: Search,
  color: 'from-secondary to-purple-400'
}];
export default function ProjectsSection() {
  return <section id="projects" className="py-24 relative">
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
            <Folder className="w-4 h-4" />
            Featured Work
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="My Projects" className="gradient-text" type="word" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => <motion.div key={project.title} initial={{
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
        }} whileHover={{
          y: -10
        }} className="group">
              <div className="glass-card-glow h-full p-8 relative overflow-hidden border-0">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div className="relative z-10 mb-6" whileHover={{
              rotate: 10,
              scale: 1.1
            }} transition={{
              duration: 0.3
            }}>
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
                    <project.icon className="w-8 h-8" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors font-sans text-justify">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed font-mono text-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {tag}
                      </span>)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.button>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity" animate={{
              rotate: 360
            }} transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}>
                  <Sparkles className="w-24 h-24" />
                </motion.div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}