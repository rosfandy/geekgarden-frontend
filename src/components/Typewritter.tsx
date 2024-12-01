"use client";

import { Link } from "react-router-dom";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectComponent() {
    const words = [
        {
            text: "Web",
        },
        {
            text: "app",
        },
        {
            text: "for",
        },
        {
            text: "manage",
        },
        {
            text: "Products.",
            className: "relative bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 z-10",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center lg:h-[70vh] md:h-[60vh] h-[70vh]">
            <p className="text-neutral-600 mb-4 font-extrabold text-6xl">
                {':>'}
            </p>
            <TypewriterEffect words={words} />
            <p className="relative font-regular text-base text-zinc-500 tracking-wide mt-8 text-center max-w-3xl mx-4 lg:mx-auto md:mx-8 antialiased">
                We develop product catalog management apps that truly make a difference. Perfect for resellers, our expertly designed and meticulously crafted interfaces provide the ideal foundation for your next venture.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                <Link to="/dashboard">
                    <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                        Get Started
                    </button>
                </Link>
                <Link to={"/register"}>
                    <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                        Signup
                    </button>
                </Link>
            </div>
        </div>
    );
}
