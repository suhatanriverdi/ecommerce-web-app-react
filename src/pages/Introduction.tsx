import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const nagivate = useNavigate();
  const [show, setShow] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    const timerAnim = setTimeout(() => {
      setShow(false);
    }, 3000);

    // Forward to advertisement page after 3 seconds
    const timer = setTimeout(() => {
      nagivate("/advertisement");
    }, 3600);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerAnim);
    };
  }, [nagivate]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="advertisement"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0, y: 100, z: -100 }}
          transition={{
            duration: 1,
            ease: "anticipate",
          }}
          className="flex justify-center items-center mt-[4rem] tablet:mt-[6rem] desktop:mt-[8rem]"
        >
          <h1 className="fixed mix-blend-overlay z-10 text-[34vw] tablet:text-[26vw] desktop:text-[14em] text-white drop-shadow-[0_20px_20px_rgba(0,100,50,0.9)]">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
            >
              GÜLLÜ
            </motion.div>
          </h1>
          <div className="flex">
            <motion.div
              initial={{ width: "0" }}
              animate={{
                width:
                  screenWidth >= 1024
                    ? "800px"
                    : screenWidth < 1024 && screenWidth >= 480
                      ? "450px"
                      : "250px",
                height:
                  screenWidth >= 1024
                    ? "1000px"
                    : screenWidth < 1024 && screenWidth >= 480
                      ? "800px"
                      : "600px",
              }}
              transition={{
                duration: 3,
                ease: "anticipate",
              }}
            >
              <img
                className="object-cover w-full h-full"
                src="/images/introduction/men.jpg"
                alt="Model men photo"
              />
            </motion.div>

            <motion.div
              initial={{ width: "0" }}
              animate={{
                width:
                  screenWidth >= 1024
                    ? "800px"
                    : screenWidth < 1024 && screenWidth >= 480
                      ? "450px"
                      : "250px",
                height:
                  screenWidth >= 1024
                    ? "1000px"
                    : screenWidth < 1024 && screenWidth >= 480
                      ? "800px"
                      : "600px",
              }}
              transition={{
                duration: 3,
                ease: "anticipate",
              }}
            >
              <img
                className="object-cover w-full h-full"
                src="/images/introduction/women.jpg"
                alt="Model women photo"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
