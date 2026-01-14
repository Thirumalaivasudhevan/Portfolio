import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { User, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
const highlights = [{
  icon: User,
  label: 'Full Name',
  value: 'Thirumalai V'
}, {
  icon: Phone,
  label: 'Phone',
  value: '+91 8248693783'
}, {
  icon: Mail,
  label: 'Email',
  value: 'thirumalaivasudhavan@gmail.com'
}, {
  icon: MapPin,
  label: 'Location',
  value: 'Komarapalayam, Namakkal'
}];
export default function AboutSection() {
  return <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: '-100px'
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            About Me
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="Who I Am" className="gradient-text" type="word" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Description */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <div className="glass-card-glow p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              
              <AnimatedText text="I am a passionate and self-driven individual with hands-on experience in software development, UI/UX design, data analysis, and AI-based solutions." className="text-lg md:text-xl text-foreground leading-relaxed mb-6" type="line" delay={0.3} />
              
              <AnimatedText text="I enjoy building simple yet impactful digital products that solve real-world problems. My focus is on creating innovative solutions that blend creativity with technology." className="text-muted-foreground leading-relaxed" type="line" delay={0.5} />

              <motion.div initial={{
              scaleX: 0
            }} whileInView={{
              scaleX: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.7
            }} className="w-full h-1 bg-gradient-to-r from-primary to-secondary mt-8 origin-left rounded-full" />
            </div>
          </motion.div>

          {/* Right - Info Cards */}
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
          delay: 0.4
        }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => <motion.div key={item.label} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2 + index * 0.1
          }} whileHover={{
            scale: 1.02,
            y: -5
          }} className="glass-card p-6 group cursor-pointer glow-border">
                <div className="flex items-start gap-4">
                  <motion.div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300" whileHover={{
                rotate: 10
              }}>
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1 font-sans font-bold text-left">{item.label}</span>
                    <span className="text-foreground font-medium text-sm">{item.value}</span>
                  </div>
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </div>
    </section>;
}