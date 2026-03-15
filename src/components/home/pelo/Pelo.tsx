"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import Phone from "@/components/home/phone/Phone";

const Pelo = () => {
    const { t, locale } = useI18n();

    return (
        <section id="pelo-section" className="py-16 md:py-24 px-8 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center">
            <div className="flex items-center justify-center lg:justify-end">
                <Phone />
            </div>
            <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
                <Image
                    className="dark:invert w-56 md:w-[300px] h-auto"
                    src="/pelo-full-text.svg"
                    alt="Pelo"
                    width={300}
                    height={300}
                />
                <p className="text-xl md:text-2xl lg:text-3xl mt-6 px-4 md:px-0 max-w-full md:max-w-xs lg:w-[16em]" dangerouslySetInnerHTML={{ __html: t('pelo.subtitle') }} />
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10"
                  aria-label={locale === 'fr' ? 'Disponible sur Google Play' : 'Get it on Google Play'}
                >
                  <img
                    src={locale === 'fr' ? '/google_play_store_badge/fr.svg' : '/google_play_store_badge/en.svg'}
                    alt={locale === 'fr' ? 'Disponible sur Google Play' : 'Get it on Google Play'}
                    className="w-48 h-auto"
                  />
                </a>
            </div>
        </section>
    )
}

export default Pelo;