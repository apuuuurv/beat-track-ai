import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const words = ["INITIALIZING...", "DECODING DATA...", "DEVELOPED BY APURV"];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  // We use a ref to ensure onComplete is only called once
  const completed = useRef(false);

  useEffect(() => {
    if (index < words.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 800);
      return () => clearTimeout(timer);
    } else if (!completed.current) {
      // Final name delay
      const timer = setTimeout(() => {
        completed.current = true;
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white"
    >
      {/* Background Lightning/Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Main Text Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-12 flex items-center justify-center">
          {" "}
          {/* Fixed height container to prevent layout jump */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-4xl font-mono font-bold tracking-[0.2em] text-blue-400 text-center"
            >
              {words[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-48 h-[2px] bg-slate-800 overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 3.1, ease: "easeInOut" }} // Matched to total sequence time
            className="absolute inset-0 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
