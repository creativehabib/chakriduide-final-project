import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Snowfall = () => {
    return (
        <>
            <style>{`
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
                        transform: translateY(100vh) translateX(20px);
                        opacity: 0;
                    }
                }
            `}</style>

            <div className="snowfall">
                {Array.from({ length: 50 }).map((_, i) => {
                    const size = Math.random() * 6 + 2;
                    const left = Math.random() * 100;
                    const duration = Math.random() * 10 + 5;
                    const delay = Math.random() * 15;

                    return (
                        <div
                            key={i}
                            className="snowflake"
                            style={{
                                width: size,
                                height: size,
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
    const [typedText, setTypedText] = useState('');
    const fullText = ' চাকরি প্রার্থীদের জন্য সঠিক গাইডলাইন';
    const index = useRef(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Typing effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTypedText((prev) => prev + fullText.charAt(index.current));
            index.current += 1;
            if (index.current >= fullText.length) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // Scroll animation observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`relative overflow-hidden
                bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300
                dark:from-slate-900 dark:via-gray-800 dark:to-slate-900
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                transition-all duration-700`}
        >
            <Snowfall />

            <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col-reverse md:flex-row items-center gap-4 md:min-h-screen">
            {/* Text Section */}
                <div className="w-full md:w-1/2 text-center md:text-left z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
                            {typedText}
                        </span>
                        <span className="ml-1 border-r-2 border-blue-900 dark:border-white animate-pulse" />
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                        চাকরির খোঁজ, প্রস্তুতি কুইজ, এবং অনুশীলন — সব এক প্ল্যাটফর্মে একসাথে।
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <Link
                            href="/quiz"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold shadow-lg transition duration-300 hover:scale-105 hover:ring-2 hover:ring-green-400"
                        >
                            MCQ অনুশীলন করুন <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/jobs"
                            className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold shadow-lg transition duration-300 hover:scale-105 hover:ring-2 hover:ring-yellow-400"
                        >
                            চাকরির খবর দেখুন <Briefcase size={18} />
                        </Link>
                    </div>
                </div>

                {/* Image Section (Hidden on small screen) */}
                <div className="w-full md:w-1/2 flex justify-center z-10 md:flex">
                    <img
                        src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740"
                        alt="Job Search Illustration"
                        className="rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md object-contain hover:scale-105 transition duration-500 dark:brightness-90 dark:contrast-110"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroComponent;
