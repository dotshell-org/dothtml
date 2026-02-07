import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { buildFileUrl, extractFileLabel } from "@/components/archives/archiveUtils";

type ArchiveScreenshotsProps = {
    screenshots: string[];
    t: (key: string) => string;
};

const ArchiveScreenshots = ({ screenshots, t }: ArchiveScreenshotsProps) => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-xxs uppercase tracking-[0.25em] text-neutral-500">
                    {t("archives.screenshotsTitle")}
                </h3>
                <span className="text-xxs uppercase tracking-[0.2em] text-neutral-400">
                    {screenshots.length}
                </span>
            </div>
            {screenshots.length > 0 ? (
                <div className="mt-4">
                    <div className="relative group px-4">
                        <button className="swiper-button-prev-custom absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 p-2 text-neutral-400 transition enabled:cursor-pointer enabled:hover:text-blue-500 disabled:opacity-30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".swiper-button-prev-custom",
                                nextEl: ".swiper-button-next-custom",
                            }}
                            spaceBetween={16}
                            slidesPerView={1}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="archives-swiper"
                        >
                            {screenshots.map((path) => (
                                <SwiperSlide key={path}>
                                    <a
                                        href={buildFileUrl(path)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group block rounded-2xl border border-neutral-200 bg-white p-2 transition hover:border-blue-200 dark:border-neutral-800 dark:bg-neutral-950"
                                    >
                                        <img
                                            src={buildFileUrl(path)}
                                            alt={extractFileLabel(path)}
                                            className="h-40 w-full rounded-xl object-cover"
                                            loading="lazy"
                                        />
                                        <p className="mt-2 truncate text-xs text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                                            {extractFileLabel(path)}
                                        </p>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className="swiper-button-next-custom absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 p-2 text-neutral-400 transition enabled:cursor-pointer enabled:hover:text-blue-500 disabled:opacity-30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <p className="mt-3 text-sm text-neutral-500">
                    {t("archives.noScreenshots")}
                </p>
            )}
        </div>
    );
};

export default ArchiveScreenshots;
