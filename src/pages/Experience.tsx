
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
// import Projects from "@/components/Projects";

export default function Experience() {
    return (
        <div className="bg-[#121212] min-h-screen">
            {/* 
        Scroll Container 
        Height 500vh ensures the sticky canvas stays pinned for a long time
        while the user scrolls, driving the animation.
      */}
            <div className="relative h-[500vh]">
                <ScrollyCanvas />
                <Overlay />
            </div>

            {/* Content that appears after the scroll sequence */}
            {/* <Projects /> */}


        </div>
    );
}
