import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Github, Mail } from 'lucide-react';

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Section 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    // Section 2: 20% - 50%
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.5], [100, -100]);

    // Section 3: 50% - 80%
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.8], [100, -100]);

    // Section 4: 85% - 100% (Contact)
    const opacity4 = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const y4 = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 md:px-20">

                {/* Section 1: Center */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex items-center justify-center flex-col text-center"
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference mb-4">
                        THIRUMALAI V
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-gray-300 tracking-widest uppercase">
                        Creative Developer
                    </p>
                </motion.div>

                {/* Section 2: Left */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-0 flex items-center justify-start ml-4 md:ml-32"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white max-w-2xl leading-tight mix-blend-difference">
                        I build digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            experiences.
                        </span>
                    </h2>
                </motion.div>

                {/* Section 3: Right */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-0 flex items-center justify-end mr-4 md:mr-32 text-right"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white max-w-2xl leading-tight mix-blend-difference">
                        Bridging design <br />
                        & engineering.
                    </h2>
                </motion.div>

                {/* Section 4: Contact Overlay */}
                <motion.div
                    style={{ opacity: opacity4, y: y4 }}
                    className="absolute inset-0 flex items-center justify-end flex-col pointer-events-auto pb-24"
                >
                    <h2 className="text-4xl font-bold mb-8 uppercase tracking-widest text-[#B0B0B0] mix-blend-difference">Connect</h2>
                    <div className="flex gap-6">
                        <a href="https://github.com/Thirumalaivasudhevan" target="_blank" rel="noopener noreferrer">
                            <button className="flex items-center gap-2 px-8 py-3 bg-black/40 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md">
                                <Github className="w-5 h-5" />
                                GitHub
                            </button>
                        </a>
                        <a href="mailto:thirumalaivasudhavan@gmail.com">
                            <button className="flex items-center gap-2 px-8 py-3 bg-black/40 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md">
                                <Mail className="w-5 h-5" />
                                Mail
                            </button>
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
