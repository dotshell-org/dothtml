// import MetallicLogo from "@/components/home/logo/MetallicLogo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LogoContainer = () => {
    const [clickCount, setClickCount] = useState(0);
    const [spinKey, setSpinKey] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pressStartRef = useRef<number | null>(null);
    const MIN_PRESS_MS = 140;

    const triggerSpin = () => {
        setIsSpinning(true);
        setSpinKey((prev) => prev + 1);
    };

    const handleLogoClick = () => {
        setClickCount((prev) => {
            const next = prev + 1;
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
            if (next >= 3) {
                triggerSpin();
                return 0;
            }
            clickTimeoutRef.current = setTimeout(() => {
                setClickCount(0);
            }, 600);
            return next;
        });
    };

    const handleAnimationEnd = () => {
        setIsSpinning(false);
    };

    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
            if (pressTimeoutRef.current) {
                clearTimeout(pressTimeoutRef.current);
            }
        };
    }, []);

    const handlePressStart = () => {
        if (pressTimeoutRef.current) {
            clearTimeout(pressTimeoutRef.current);
        }
        pressStartRef.current = Date.now();
        setIsPressed(true);
    };

    const handlePressEnd = () => {
        const startedAt = pressStartRef.current ?? Date.now();
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(MIN_PRESS_MS - elapsed, 0);
        if (pressTimeoutRef.current) {
            clearTimeout(pressTimeoutRef.current);
        }
        pressTimeoutRef.current = setTimeout(() => {
            setIsPressed(false);
        }, remaining);
    };

    return (
        <div className="w-full mb-16 flex flex-col items-center justify-center px-4">
            <div
                key={spinKey}
                onClick={handleLogoClick}
                onAnimationEnd={handleAnimationEnd}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className={`inline-block cursor-pointer transition-transform duration-150 ease-out ${isPressed ? "scale-95" : "scale-100"} ${isSpinning ? "logo-spin" : ""}`}
                aria-label="Dotshell logo"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        handleLogoClick();
                    }
                }}
            >
                <Image
                    className="w-64 lg:w-80 xl:w-[350px] h-auto invert"
                    src="/dotshell-logo.svg"
                    alt="Dotshell Logo"
                    width={350}
                    height={350}
                    priority
                />
            </div>

            <h1 className="text-6xl xl:text-7xl font-black text-white text-center">
                Dotshell
            </h1>
            <h2 className="mt-2 text-base md:text-lg lg:text-xl font-light text-white/80 text-center">
                Be Evil
            </h2>
        </div>
    );
};

export default LogoContainer;
