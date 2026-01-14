import { motion } from 'framer-motion';
import AnimatedText from '../AnimatedText';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 8248693783', href: 'tel:+918248693783' },
  { icon: Mail, label: 'Email', value: 'thirumalaivasudhavan@gmail.com', href: 'mailto:thirumalaivasudhavan@gmail.com' },
  { icon: MapPin, label: 'Location', value: '9/A Mgr Nagar, Komarapalayam, Namakkal - 638183', href: '#' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-primary/10 text-primary mb-6">
            <Send className="w-4 h-4" />
            Get In Touch
          </span>
          <h2 className="section-title mb-6">
            <AnimatedText text="Contact Me" className="gradient-text" type="word" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass-card p-6 flex items-center gap-4 group cursor-pointer block"
              >
                <motion.div
                  className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  <info.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">{info.label}</span>
                  <span className="text-foreground font-medium">{info.value}</span>
                </div>
              </motion.a>
            ))}

          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="glass-card-glow p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
