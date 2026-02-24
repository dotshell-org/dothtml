"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import Phone from "@/components/home/phone/Phone";

const Pelo = () => {
    const { t, locale } = useI18n();

    return (
        <section id="pelo-section" className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-70 items-center">
            <div className="flex items-center justify-end">
                <Phone />
            </div>
            <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
                <Image
                    className="dark:invert"
                    src="/pelo-full-text.svg"
                    alt="Pelo"
                    width={300}
                    height={300}
                />
                <p className="text-3xl mt-4 w-[16em]" dangerouslySetInnerHTML={{ __html: t('pelo.subtitle') }} />
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