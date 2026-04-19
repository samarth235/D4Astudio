import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Research, site study, and aligning on brief and goals. We listen before we draw.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&fit=crop",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Schematic design, massing, and mood — defining the core architectural idea.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&fit=crop",
  },
  {
    num: "03",
    title: "Develop",
    desc: "Detailed design, material selection, and coordination with structural & MEP engineers.",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&fit=crop",
  },
  {
    num: "04",
    title: "Build",
    desc: "Construction oversight, quality control, and real-time problem solving on site.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&fit=crop",
  },
  {
    num: "05",
    title: "Inhabit",
    desc: "Post-occupancy review, feedback loops, and long-term care recommendations.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&fit=crop",
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full flex flex-col lg:flex-row bg-[#080808] text-white overflow-hidden relative">
      {/* Left side: Navigation */}
      <div className="w-full lg:w-1/2 relative lg:min-h-screen pt-24 pb-12 lg:py-40 pl-6 pr-6 md:pl-12 md:pr-16 lg:pl-16 lg:pr-24 xl:pl-24 xl:pr-32 flex flex-col lg:justify-center justify-start z-10">
        
        {/* Giant Watermark "0" */}
        <div className="absolute top-1/3 lg:top-1/2 right-0 translate-x-1/4 -translate-y-1/2 pointer-events-none select-none z-0">
          <span 
            className="text-[60vw] lg:text-[35vw] font-bold leading-none text-[#111] opacity-50 lg:opacity-100"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            0
          </span>
        </div>

        {/* Steps List */}
        <div className="w-full z-10 relative">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div 
                key={step.num}
                className={`border-t border-[#222] py-8 lg:py-10 cursor-pointer transition-colors duration-300 ${i === steps.length - 1 ? 'border-b' : ''} group`}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className="flex items-start gap-8 md:gap-12 lg:gap-16">
                  <span 
                    className="text-xl lg:text-2xl pt-1 lg:pt-2 w-10 lg:w-14 shrink-0 transition-colors duration-300 font-bold"
                    style={{ 
                      color: isActive ? "#888" : "#333",
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    {step.num}
                  </span>
                  
                  <div className="flex-1">
                    <h3 
                      className="text-4xl lg:text-5xl lg:text-[4rem] font-bold transition-colors duration-500 tracking-tight"
                      style={{ 
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: isActive ? "#fff" : "#333",
                        lineHeight: "1.1"
                      }}
                    >
                      {step.title}
                    </h3>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isActive ? "auto" : 0, 
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 text-[#999] text-base lg:text-lg leading-relaxed max-w-md font-light">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: Sticky Image */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky top-0 relative overflow-hidden bg-[#111]">
        {steps.map((step, i) => (
          <motion.img
            key={step.image}
            src={step.image}
            alt={step.title}
            initial={false}
            animate={{
              opacity: activeStep === i ? 1 : 0,
              scale: activeStep === i ? 1 : 1.05,
              zIndex: activeStep === i ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(100%)" }}
          />
        ))}
        
        {/* Subtle Overlay to match screenshots */}
        <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />

        {/* Large step number indicator bottom left */}
        <div className="absolute bottom-8 left-8 z-30 pointer-events-none overflow-hidden">
          {steps.map((step, i) => (
            <motion.span
              key={step.num}
              initial={false}
              animate={{
                y: activeStep === i ? 0 : 20,
                opacity: activeStep === i ? 0.15 : 0
              }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 left-0 text-7xl lg:text-9xl font-bold text-white leading-none touch-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {step.num}
            </motion.span>
          ))}
          {/* Invisible placeholder to maintain height for absolute positioned elements */}
          <span className="text-7xl md:text-9xl font-bold leading-none opacity-0 select-none">
            01
          </span>
        </div>
      </div>

    </section>
  );
};

export default ProcessSection;
