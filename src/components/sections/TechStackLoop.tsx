import { motion } from 'framer-motion';
import LogoLoop, { LogoItem } from '../ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase, SiAmazon, SiSupabase, SiDocker, SiGithub } from 'react-icons/si';

const techLogos: LogoItem[] = [
    { node: <SiReact title="React" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs title="Next.js" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript title="TypeScript" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss title="Tailwind CSS" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs title="Node.js" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiSupabase title="Supabase" />, title: "Supabase", href: "https://supabase.com" },
    { node: <SiFirebase title="Firebase" />, title: "Firebase", href: "https://firebase.google.com" },
    { node: <SiDocker title="Docker" />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiAmazon title="AWS" />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <SiGithub title="GitHub" />, title: "GitHub", href: "https://github.com" },
];

export default function TechStackLoop() {
    return (
        <section className="py-12 relative border-t border-border/50 bg-black/20 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground text-sm font-medium uppercase tracking-wider"
                >
                    Powered By Modern Tech
                </motion.p>
            </div>

            <div className="relative">
                <LogoLoop
                    logos={techLogos}
                    speed={100}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover={true}
                    fadeOut={true}
                    fadeOutColor="#000000"
                    ariaLabel="Technology partners"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                />
            </div>
        </section>
    );
}
