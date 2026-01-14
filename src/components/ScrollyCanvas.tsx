import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [framesLoaded, setFramesLoaded] = useState(0);

    // Create a connection to the window scroll for the canvas animation
    const { scrollYProgress } = useScroll();

    // Map scroll progress (0 to 1) to frame index (0 to 119)
    // We assume the sequence plays out over the entire scrollable area of the parent
    // However, useScroll is global by default. We want it relative to the container?
    // Previous approach used basic DOM. Let's stick to a robust approach:
    // Since the parent is 500vh, we can use global scroll but map it.
    // Actually, framer motion useScroll({ target: containerRef }) works best.
    // But this component IS the sticky child. The parent is in Experience.tsx.
    // Let's rely on scrollYProgress of the *page* for now if this is the main feature,
    // OR simpler: use the previous manual calculation which matches "Scrubbing".

    // Re-implementing manual calculation for precision control over the 500vh section.

    const frameCount = 120;

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            // Filename format: frame_000.png (Cleaned up in previous step)
            const frameIndex = i.toString().padStart(3, '0');
            const img = new Image();
            img.src = `/sequence/frame_${frameIndex}.png`;
            img.onload = () => {
                loadedCount++;
                setFramesLoaded(loadedCount);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Drawing Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = images[index];
        if (!canvas || !img || !img.complete) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Object-fit: cover logic
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const centerShift_x = (canvasWidth - imgWidth * ratio) / 2;
        const centerShift_y = (canvasHeight - imgHeight * ratio) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#121212'; // Match global bg
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight, centerShift_x, centerShift_y, imgWidth * ratio, imgHeight * ratio);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleScroll = () => {
            // We need to find the specific scroll container (Experience section)
            // Since we are sticky inside a 500vh container:
            const container = canvas.parentElement;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            // Calculate progress: how far has the top of the container moved up?
            // Progress 0: rect.top = 0
            // Progress 1: rect.bottom = window.innerHeight

            const start = 0;
            const totalDist = container.clientHeight - window.innerHeight;
            const scrolled = -rect.top;

            // Clamp 0 to 1
            let progress = Math.max(0, Math.min(1, scrolled / totalDist));

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(progress * (frameCount - 1))
            );

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        const handleResize = () => {
            // Resize canvas to full viewport
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-render current frame (approximate, triggering scroll handler is easier)
            handleScroll();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        // Init
        handleResize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [images, framesLoaded]);


    if (framesLoaded < frameCount) {
        // Clean loading state
        const progress = Math.round((framesLoaded / frameCount) * 100);
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#121212] text-white">
                <div className="text-2xl font-light tracking-widest opacity-0">
                    LOADING EXPERIENCE {progress}%
                </div>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="sticky top-0 w-full h-screen"
        />
    );
}
