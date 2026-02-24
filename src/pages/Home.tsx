"use client";

import { useRef, type SyntheticEvent } from "react";
import NavBar from "@/components/generic/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";

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
                    onCanPlay={handleCanPlay}
                    onPlay={handlePlay}
                    onTimeUpdate={handleTimeUpdate}
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
            <div ref={contentRef}>
                <Pelo />
            </div>

            <div
                className="relative w-full bg-red-500 h-[70rem]"
                style={{ clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)' }}
            >
                <div className="pt-20">
                    <section id="pelo-section" className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="items-center justify-center text-white text-right pl-80">
                            <h1 className="font-black text-3xl my-10">On en avait marre de l'application TCL.</h1>
                            <p className="text-xl">
                                Trop peu de clarté, d'ergonomie... Ce qu'on cherchait prenait toujours trop de clics,
                                trop de temps, trop de recherche alors que tout ce qu'on veut, c'est avoir vite
                                l'information dont on a besoin.
                            </p>
                            <h1 className="font-black text-5xl my-10">Pelo, c'est</h1>
                            <p className="text-xl">
                                Une application <span className="font-extrabold">moderne</span>,
                                <span className="font-extrabold"> fluide</span>, avec <span className="font-extrabold">
                                toutes les fonctionnalités</span> dont vous avez besoin pour voyager sur le réseau !
                            </p>
                            <h1 className="font-black text-3xl my-10">Horaires, Itinéraires, Hors-ligne, LIVE</h1>
                            <p className="text-xl">
                                Avec Pelo, vous profiterez du système d'itinéraire open-source sur réseau de transports en commun
                                <span className="font-extrabold"> le plus rapide du monde</span>, de la
                                <span className="font-extrabold"> position en temps réel</span> de tous les bus et tramway dont
                                <span className="font-extrabold"> certains ne sont même pas sur l'application TCL </span>
                                ou encore des alertes traffic, tout cela <span className="font-extrabold">sans connexion internet</span> * !
                            </p>
                            <p className="italic mt-4 text-sm">*un téléchargement de quelques dizaines de Mo est nécessaire pour activer
                            le mode hors-ligne dans les paramètres de l'application. Les données en temps réel telles que
                            le mode LIVE et les alertes traffic ne sont mises à jour qu'en précense d'une connexion internet.</p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="h-80"/>

            <Footer />
        </main>
    )
}

export default Home
