import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEO } from "./SEO";
import { motion, useScroll, useTransform } from "motion/react";
import sc1 from "../../imports/sound-clash-1.png";
import sc2 from "../../imports/sound-clash-2.png";
import sc3 from "../../imports/sound-clash-3.png";
import wed1 from "../../imports/wedding-1.png";
import wed2 from "../../imports/wedding-2.png";
import wed3 from "../../imports/wedding-3.png";
import corp1 from "../../imports/corporate-1.png";
import corp2 from "../../imports/corporate-2.png";
import corp3 from "../../imports/corporate-3.png";
import corp4 from "../../imports/corporate-4.png";
import corp5 from "../../imports/corporate-5.png";
import corp6 from "../../imports/corporate-6.png";

const soundClashImg1 = sc1;
const soundClashImg2 = sc2;
const soundClashImg3 = sc3;
const weddingImg1 = wed1;
const weddingImg2 = wed2;
const weddingImg3 = wed3;
const corporateImg1 = corp1;
const corporateImg2 = corp2;
const corporateImg3 = corp3;
const corporateImg4 = corp4;
const corporateImg5 = corp5;
const corporateImg6 = corp6;

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  color: string;
  videoUrl?: string;
  images: string[];
  link?: string;
}

export function PortfolioPage({
  onNavigate,
}: PortfolioPageProps) {
  const projects: Project[] = [
    {
      id: "sound-clash",
      category: "NIGHTLIFE & ENTERTAINMENT",
      title: "Sound Clash OS",
      description:
        'Turn the crowd into the judge. A real-time voting engine for DJ battles, rap battles, and dance-offs. Features: Live "Hype" Meter, Song Request Line, VIP Bottle Service Upgrades.',
      color: "#E91E63",
      images: [soundClashImg1, soundClashImg2, soundClashImg3],
    },
    {
      id: "the-union",
      category: "LIFESTYLE & EVENTS",
      title: "The Union: Wedding OS",
      description:
        "Modernize the reception. No more clinking glasses—guests complete challenges to unlock rewards. Features: Digital Guestbook, Buy the Couple a Round, Photo Scavenger Hunt.",
      color: "#FF7A00",
      images: [weddingImg1, weddingImg2, weddingImg3],
    },
    {
      id: "corporate-clash",
      category: "BUSINESS & TECH",
      title: "Corporate Clash",
      description:
        'Gamify the boardroom. Perfect for startup pitch competitions, town halls, and internal hackathons. Features: Real-time Investment Simulation, Networking "Who\'s Here" Grid, Audience Q&A Upvoting.',
      color: "#00D4FF",
      images: [
        corporateImg1,
        corporateImg2,
        corporateImg3,
        corporateImg4,
        corporateImg5,
        corporateImg6,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="Portfolio | 9LMNTS Studio" 
        description="Explore our cyber aesthetic web applications, from Sound Clash OS to Corporate Clash. See how we redefine digital experiences." 
      />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm uppercase tracking-widest">
              Our Work
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 font-bold"
          >
            <span className="font-['Orbitron'] uppercase tracking-tighter">
              Portfolio of
            </span>
            <br />
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-6xl sm:text-7xl lg:text-9xl capitalize ml-[-15px] -rotate-3 inline-block">
              Digital Excellence
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-sans"
          >
            Explore our collection of projects where Hip-Hop
            culture meets cutting-edge design
          </motion.p>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="pb-20">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
            onNavigate={onNavigate}
          />
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight">
            <span className="font-['Orbitron'] uppercase tracking-tighter">
              Ready to Join Our
            </span>
            <br />
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">
              Portfolio?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 font-sans">
            Let's create something legendary together
          </p>
          <button
            onClick={() => onNavigate("start-project")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 border border-primary uppercase tracking-widest"
          >
            Start Your Project
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

function ProjectSection({
  project,
  index,
  onNavigate,
}: {
  project: Project;
  index: number;
  onNavigate: (page: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-background ${index % 2 === 1 ? "bg-card border-y border-border" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? -50 : 50 }
            }
            transition={{ duration: 0.8 }}
            className={isEven ? "" : "lg:order-2"}
          >
            <div className="mb-4">
              <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold uppercase tracking-widest">
              {project.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Video Player Controls (if video exists) */}
            {project.videoUrl && (
              <div className="mb-8 p-4 bg-background rounded-none border border-primary/20">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-primary rounded-none hover:bg-primary/90 transition-all border border-primary"
                  >
                    {isPlaying ? (
                      <Pause
                        className="text-primary-foreground"
                        size={24}
                      />
                    ) : (
                      <Play
                        className="text-primary-foreground"
                        size={24}
                      />
                    )}
                  </button>
                  <div className="font-sans">
                    <p className="text-foreground text-sm font-bold uppercase tracking-widest">
                      Project Walkthrough
                    </p>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">
                      Click to play video demo
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => onNavigate("event-os-demo")}
              className="px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-none font-bold hover:bg-primary/10 transition-all inline-flex items-center gap-2 uppercase tracking-widest text-sm"
            >
              Start Similar Project
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Images Grid with Scroll Animation */}
          <div
            className={`relative ${isEven ? "" : "lg:order-1"}`}
          >
            <div className="relative min-h-[600px]">
              {project.images.map((image, imgIndex) => {
                const positions = getImagePositions(
                  project.images.length,
                  imgIndex,
                );

                return (
                  <motion.div
                    key={imgIndex}
                    initial={{
                      opacity: 0,
                      y: 50,
                      rotate: positions.rotate,
                      scale: 0.8,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            rotate: positions.rotate,
                            scale: 1,
                          }
                        : {
                            opacity: 0,
                            y: 50,
                            rotate: positions.rotate,
                            scale: 0.8,
                          }
                    }
                    transition={{
                      duration: 0.8,
                      delay: imgIndex * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="absolute shadow-2xl"
                    style={{
                      top: positions.top,
                      left: positions.left,
                      zIndex: imgIndex,
                      width: "280px",
                    }}
                  >
                    <div
                      className="rounded-none overflow-hidden border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300 bg-black"
                      style={{
                        boxShadow: `0 10px 40px ${project.color}20`,
                      }}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to position images in an artistic layout
function getImagePositions(totalImages: number, index: number) {
  const layouts = [
    // 3 images layout (for mobile app mockups)
    [
      { top: "0%", left: "15%", rotate: -4 },
      { top: "25%", left: "35%", rotate: 2 },
      { top: "50%", left: "10%", rotate: -3 },
    ],
    // 4 images layout
    [
      { top: "0%", left: "0%", rotate: -5 },
      { top: "10%", left: "30%", rotate: 3 },
      { top: "40%", left: "5%", rotate: -3 },
      { top: "50%", left: "35%", rotate: 5 },
    ],
    // 5 images layout
    [
      { top: "0%", left: "10%", rotate: -8 },
      { top: "5%", left: "45%", rotate: 4 },
      { top: "35%", left: "0%", rotate: -4 },
      { top: "40%", left: "40%", rotate: 6 },
      { top: "70%", left: "15%", rotate: -3 },
    ],
    // 6 images layout
    [
      { top: "0%", left: "0%", rotate: -6 },
      { top: "0%", left: "35%", rotate: 3 },
      { top: "30%", left: "10%", rotate: -3 },
      { top: "35%", left: "45%", rotate: 5 },
      { top: "60%", left: "0%", rotate: -4 },
      { top: "65%", left: "40%", rotate: 4 },
    ],
  ];

  // Select layout based on total images
  let layout;
  if (totalImages === 3) {
    layout = layouts[0];
  } else if (totalImages === 4) {
    layout = layouts[1];
  } else if (totalImages === 5) {
    layout = layouts[2];
  } else {
    layout = layouts[3];
  }

  return layout[index] || { top: "0%", left: "0%", rotate: 0 };
}