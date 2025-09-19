import Carousel from "./Carousal";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const carousalRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const elementleft = sectionRef.current;
    const elementright = carousalRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;
    const background = backgroundRef.current;

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementleft,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate background gradient
    gsap.fromTo(
      background,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: background,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Left side animations with stagger
    tl.fromTo(
      elementleft,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    )
    .fromTo(
      title,
      { y: 50, opacity: 0, rotationX: 45 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
      },
      "-=0.8"
    )
    .fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=1"
    )
    .fromTo(
      button,
      { y: 30, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.7"
    );

    // Right side animation
    gsap.fromTo(
      elementright,
      { x: 100, opacity: 0, rotationY: 45 },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementright,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Continuous floating animation for carousel
    gsap.to(elementright, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1.5,
    });

  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-br from-colour1 via-colour1 to-purple-900 justify-between px-4 md:px-16 py-8 text-white overflow-hidden">
      {/* Animated background elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-colour3 to-colour4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Left Content */}
      <div
        ref={sectionRef}
        className="relative w-full md:w-1/2 text-center md:text-left p-8 z-10"
      >
        <div className="relative">
          {/* Glowing background for title */}
          <div className="absolute inset-0 bg-gradient-to-r from-colour3/20 to-colour4/20 rounded-3xl blur-xl"></div>
          
          <div className="relative backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-[8vw] font-bold leading-tight font-Birthstone bg-gradient-to-r from-white via-colour3 to-colour4 bg-clip-text text-transparent drop-shadow-2xl"
            >
              MealChain
            </h1>
            
            <p 
              ref={subtitleRef}
              className="mt-6 text-xl md:text-[2.5vw] text-gray-100 font-merriweather leading-relaxed drop-shadow-lg"
            >
              Where <span className="text-colour3 font-semibold">Surplus</span> meets{" "}
              <span className="text-colour4 font-semibold">Purpose</span> !
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center md:items-start">
              <button
                ref={buttonRef}
                onClick={() => navigate("/login")}
                className="group relative px-8 py-4 bg-gradient-to-r from-colour3 to-colour4 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-colour3/50 hover:shadow-2xl active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-colour4 to-colour3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
              
              <button className="text-white/80 hover:text-white font-semibold text-lg transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Carousel */}
      <div
        ref={carousalRef}
        className="relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center z-10"
      >
        <div className="relative">
          {/* Glowing ring around carousel */}
          <div className="absolute inset-0 bg-gradient-to-r from-colour3 to-colour4 rounded-full blur-2xl opacity-30 scale-110"></div>
          <div className="relative backdrop-blur-sm bg-white/5 p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[500px] overflow-hidden">
            <Carousel />
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;