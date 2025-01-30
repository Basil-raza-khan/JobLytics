import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import gsap from "gsap";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = useMotionValue(COLORS_TOP[0]);
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Function to trigger logo animation
  const handleAnimateLogo = () => {
    setAnimateLogo(true);

    gsap.fromTo(
      ".rolling-logo",
      { y: "-100vh", x: "50%", rotate: 0, opacity: 1 },
      {
        y: 0,
        duration: 0.8,
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(".rolling-logo", {
            y: "-60px",
            repeat: 3,
            yoyo: true,
            duration: 0.3,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(".rolling-logo", {
                x: "100vw",
                rotate: 1440,
                duration: 1.5,
                ease: "power2.in",
                opacity: 0,
                onComplete: () => setAnimateLogo(false),
              });
            },
          });
        },
      }
    );
  };

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="content-block relative z-10 flex flex-col items-center text-center">
        {/* Rolling Logo Animation ABOVE Text */}
        {animateLogo && (
          <motion.img
            src="/rbi.png"
            alt="JobLytics Logo"
            className="rolling-logo absolute top-[-80px] w-20 h-20 md:w-20 md:h-20 "
          />
        )}

        <span
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base cursor-pointer relative overflow-hidden"
          onClick={handleAnimateLogo} // Animation triggers ONLY on click
        >
          Connecting Talent with Opportunity
        </span>


        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold">
          Your Gateway to <br /> <span className="text-[#6A38C2]">Career Success</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg px-4 sm:px-0">
          Find your dream job or hire the perfect candidate <br /> JobLytics makes job hunting and recruitment easier than ever.
        </p>
        <div
          className="search-bar flex w-full sm:w-[80%] md:w-[60%] lg:w-[80%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-6"
        >
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm sm:text-base bg-transparent text-gray-200"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#56279a] transition-colors"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default HeroSection;
