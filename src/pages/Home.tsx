"use client";

import { useRef, type SyntheticEvent } from "react";
import NavBar from "@/components/generic/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";

import Pelo from "@/components/home/pelo/Pelo";

const LOOP_START_SECONDS = 35;

const Home = () => {
    const { t } = useI18n();
    const contentRef = useRef<HTMLDivElement>(null);
    const hasSeekedRef = useRef(false);

    const handleScrollClick = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const seekToLoopStart = (video: HTMLVideoElement) => {
        if (video.duration > LOOP_START_SECONDS) {
            video.currentTime = LOOP_START_SECONDS;
            hasSeekedRef.current = true;
        }
    };

    const handleLoadedMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (!hasSeekedRef.current) {
            seekToLoopStart(video);
        }
        video.play().catch(() => undefined);
    };

    const handleCanPlay = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (!hasSeekedRef.current) {
            seekToLoopStart(video);
        }
    };

    const handlePlay = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (!hasSeekedRef.current) {
            seekToLoopStart(video);
        }
    };

    const handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (!hasSeekedRef.current && video.duration > LOOP_START_SECONDS) {
            seekToLoopStart(video);
            return;
        }
        if (video.duration > LOOP_START_SECONDS && video.currentTime >= video.duration - 0.05) {
            video.currentTime = LOOP_START_SECONDS;
            video.play().catch(() => undefined);
        }
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
        <main className="min-h-screen overflow-x-hidden">
            <section className="relative h-screen w-full overflow-hidden bg-black">
                <video
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onCanPlay={handleCanPlay}
                    onPlay={handlePlay}
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src="https://dotshell.eu/assets/home_black_loop.mp4" type="video/mp4" />
                </video>
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
            <div ref={contentRef}>
                <Pelo />
            </div>

            <div className="relative w-full bg-red-500" style={{ clipPath: 'polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)' }}>
                <div className="lg:min-h-[70rem] flex items-center justify-center py-32 md:py-40 lg:py-8 px-8 md:px-12 lg:px-4">
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                            <div className="text-white text-center lg:text-left lg:pr-8">
                                <h1 className="font-black text-xl md:text-3xl mb-4">{t("home.redSection.tclFedUpTitle")}</h1>
                                <p className="text-base md:text-xl mb-6">{t("home.redSection.tclFedUpText")}</p>
                                <h1 className="font-black text-3xl md:text-5xl lg:text-6xl mb-4">{t("home.redSection.peloIsTitle")}</h1>
                                <p className="text-base md:text-xl mb-6" dangerouslySetInnerHTML={{ __html: t("home.redSection.peloIsText") }} />
                                <h1 className="font-black text-xl md:text-3xl mb-4">{t("home.redSection.featuresTitle")}</h1>
                                <p className="text-base md:text-xl mb-6" dangerouslySetInnerHTML={{ __html: t("home.redSection.featuresText") }} />
                                <p className="italic text-xs md:text-sm">{t("home.redSection.offlineNote")}</p>
                            </div>
                            <div className="hidden lg:flex justify-center mt-12 lg:mt-0">
                                <div className="overflow-visible lg:overflow-hidden rounded-lg w-full max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
                                    <Image
                                        src="/man_home_page.png"
                                        alt="Man using Dotshell application"
                                        width={1500}
                                        height={1800}
                                        className="scale-100 lg:scale-110 xl:scale-125 transform transition-transform translate-y-0 lg:translate-y-6"
                                        style={{
                                            filter: 'drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white)'
                                        }}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-20 lg:h-40"/>
            <h1 className="text-center font-black text-3xl md:text-4xl lg:text-5xl px-6">{t("home.futureTitle")}</h1>
            <div className="flex flex-col items-center justify-center px-6">
                <div className="flex flex-col items-center max-w-[40em]">
                    <p className="text-center mt-8 md:mt-12 text-base md:text-xl">
                        {t("home.ambition1")}
                        <br /><br />
                        {t("home.ambition2")}
                        <br />
                    </p>
                    <a
                        href="/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-blue-500 text-blue-500 p-3 hover:bg-blue-500 hover:text-white font-semibold rounded-lg transition mt-10 cursor-pointer"
                    >
                        Browse Documentation
                    </a>
                </div>
            </div>
            <div className="h-40"/>

            <Footer />
        </main>
    )
}

export default Home