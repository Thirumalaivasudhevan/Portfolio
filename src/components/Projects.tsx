import { motion } from "framer-motion";

const projects = [
    {
        title: "Neon Pulse",
        category: "Web Application",
        description: "A futuristic dashboard for real-time data visualization.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Cyber Dust",
        category: "WebGL Experiment",
        description: "Interactive particle system using Three.js and compute shaders.",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop",
    },
    {
        title: "Glass OS",
        category: "UI/UX Design",
        description: "An exploration of specialized glass-morphism in operating system interfaces.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    },
    {
        title: "Void Scape",
        category: "Immersive Audio",
        description: "Spatial audio generation tool for ambient environments.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
    }
];

export default function Projects() {
    return (
        <section className="bg-[#121212] py-32 px-4 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                        Selected Works
                    </h2>
                    <div className="h-1 w-20 bg-blue-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-500 h-[500px]"
                        >
                            {/* Image Container */}
                            <div className="absolute inset-0 h-full w-full overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-300 uppercase bg-blue-900/30 rounded-full backdrop-blur-md border border-blue-500/20">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 max-w-sm line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
