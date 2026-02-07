"use client";

import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultLocale, supportedLocales, translations, type Locale } from "./translations";

type I18nContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
};

export const I18nContext = createContext<I18nContextValue>({
    locale: defaultLocale,
    setLocale: () => undefined,
    t: (key) => key
});

const normalizeLocale = (value: string): Locale | null => {
    const base = value.toLowerCase().split("-")[0];
    const match = supportedLocales.find((locale) => locale === base);
    return match ?? null;
};

const detectBrowserLocale = (): Locale => {
    if (typeof navigator === "undefined") {
        return defaultLocale;
    }
    const candidates = navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    for (const candidate of candidates) {
        const normalized = normalizeLocale(candidate);
        if (normalized) {
            return normalized;
        }
    }
    return defaultLocale;
};

const resolveKey = (dictionary: Record<string, unknown>, key: string): string | undefined => {
    const value = key.split(".").reduce<unknown>((acc, part) => {
        if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
            return (acc as Record<string, unknown>)[part];
        }
        return undefined;
    }, dictionary);
    return typeof value === "string" ? value : undefined;
};

export function I18nProvider({ children, onReady }: { children: React.ReactNode; onReady?: () => void }) {
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const readyRef = useRef(false);

    useEffect(() => {
        if (readyRef.current) {
            return;
        }
        const detectedLocale = detectBrowserLocale();
        setLocale(detectedLocale);
        readyRef.current = true;
        onReady?.();
    }, [onReady]);

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    const t = useCallback((key: string) => {
        const current = resolveKey(translations[locale], key);
        if (current) {
            return current;
        }
        const fallback = resolveKey(translations[defaultLocale], key);
        return fallback ?? key;
    }, [locale]);

    const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}
