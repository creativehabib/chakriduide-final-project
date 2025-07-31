import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Link } from '@inertiajs/react'; // Assuming @inertiajs/react is correctly installed and configured

const Snowfall = () => {
    return (
        <>
            <style>{`
                /* Basic Snowfall CSS */
                .snowfall {
                    pointer-events: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 0;
                }
                .snowflake {
                    position: absolute;
                    top: -10px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0.8;
                    animation-name: fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                @keyframes fall {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(100vh) translateX(20px); /* Adjust translateX for more variation */
                        opacity: 0;
                    }
                }
            `}</style>

            <div className="snowfall">
                {Array.from({ length: 50 }).map((_, i) => {
                    const size = Math.random() * 6 + 2; // Snowflake size from 2px to 8px
                    const left = Math.random() * 100; // Position from 0vw to 100vw
                    const duration = Math.random() * 10 + 5; // Duration from 5s to 15s
                    const delay = Math.random() * 15; // Delay from 0s to 15s

                    return (
                        <div
                            key={i}
                            className="snowflake"
                            style={{
                                width: `${size}px`, // Ensure units are specified
                                height: `${size}px`, // Ensure units are specified
                                left: `${left}vw`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        />
                    );
                })}
            </div>
        </>
    );
};

const HeroComponent = () => {
    // CLS Fix 1: Manage typed characters as an array for pre-rendering full text
    const [typedCharacters, setTypedCharacters] = useState<string[]>([]);
    const fullText = ' চাকরি প্রার্থীদের জন্য সঠিক গাইডলাইন';
    const index = useRef(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Typing effect
    useEffect(() => {
        if (index.current >= fullText.length) return; // Prevent extra intervals if already finished

        const interval = setInterval(() => {
            setTypedCharacters((prev) => [...prev, fullText.charAt(index.current)]);
            index.current += 1;
            if (index.current >= fullText.length) {
                clearInterval(interval);
            }
        }, 80);
        return () => clearInterval(interval);
    }, [typedCharacters.length]); // Depend on typedCharacters.length to restart if component re-renders

    // Scroll animation observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.3 } // Element becomes visible when 30% or more is in viewport
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current); // Use unobserve instead of disconnect if only one element
            }
            observer.disconnect(); // Always disconnect on cleanup
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`relative overflow-hidden bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} py-8 transition-all duration-700 md:py-16`}
        >
            <Snowfall />

            <div className="relative z-10 container mx-auto flex flex-col-reverse items-center gap-4 px-4 md:min-h-screen md:flex-row">
                {' '}
                {/* z-10 to ensure content is above snowfall */}
                {/* Text Section */}
                <div className="w-full text-center md:w-1/2 md:text-left">
                    <h1 className="mb-4 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl md:text-5xl">
                        <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
                            {/* CLS Fix 1: Render full text initially, hide parts with 'invisible' */}
                            {fullText.split('').map((char, i) => (
                                <span key={i} className={i < typedCharacters.length ? '' : 'invisible'}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    </h1>
                    <p className="mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-300">
                        চাকরির খোঁজ, প্রস্তুতি কুইজ, এবং অনুশীলন — সব এক প্ল্যাটফর্মে একসাথে।
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                        <Link
                            href="/quiz"
                            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-green-700 hover:ring-2 hover:ring-green-400 sm:text-base"
                        >
                            MCQ অনুশীলন করুন <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/jobs"
                            className="inline-flex items-center gap-2 rounded-full bg-yellow-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:ring-2 hover:ring-yellow-400 sm:text-base"
                        >
                            চাকরির খবর দেখুন <Briefcase size={18} />
                        </Link>
                    </div>
                </div>
                {/* Image Section (Hidden on small screen) */}
                <div className="flex w-full justify-center md:w-1/2">
                    {/* CLS Fix 2: Add width and height attributes to the image */}
                    <img
                        src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740"
                        alt="Job Search Illustration"
                        width="740" // IMPORTANT: Replace with the actual width of your image
                        height="500" // IMPORTANT: Replace with the actual height of your image
                        className="w-full max-w-xs rounded-xl object-contain shadow-2xl transition duration-500 hover:scale-105 sm:max-w-md dark:brightness-90 dark:contrast-110"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroComponent;
