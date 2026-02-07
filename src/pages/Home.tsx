"use client";

import { useRef, type SyntheticEvent } from "react";
import NavBar from "@/components/generic/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";

const LOOP_START_SECONDS = 20;

const Home = () => {
    const { t } = useI18n();
    const contentRef = useRef<HTMLDivElement>(null);

    const handleScrollClick = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleLoadedMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (video.duration > LOOP_START_SECONDS) {
            video.currentTime = LOOP_START_SECONDS;
        }
        video.play().catch(() => undefined);
    };

    const handleEnded = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (video.duration > LOOP_START_SECONDS) {
            video.currentTime = LOOP_START_SECONDS;
        } else {
            video.currentTime = 0;
        }
        video.play().catch(() => undefined);
    };

    return (
        <main className="min-h-screen">
            <section className="relative h-screen w-full overflow-hidden bg-black">
                <video
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                >
                    <source src="/lyon_drone_non_official.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 dark:bg-black/35" aria-hidden="true"></div>
                <div className="relative z-10 flex h-full flex-col text-white">
                    <NavBar />
                    <div className="flex flex-1 items-center justify-center">
                        <LogoContainer />
                    </div>
                    <button
                        type="button"
                        onClick={handleScrollClick}
                        className="group mx-auto mb-6 flex flex-col items-center gap-2 text-white/90 transition hover:text-white cursor-pointer"
                        aria-label={t("home.scrollToContent")}
                    >
                        <svg
                            className="h-6 w-6 transition-transform duration-300 ease-out group-hover:-translate-y-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M6 14l6-6 6 6" />
                        </svg>
                        <span className="md:text-sm lg:text-md uppercase tracking-[0.1em]">{t("home.scroll")}</span>
                    </button>
                </div>
            </section>
            <div ref={contentRef} className="h-[33rem] lg:h-[48rem]"></div>
            <Footer />
        </main>
    )
}

export default Home
