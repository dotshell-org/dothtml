// ClientProviders.tsx (Client Component)
'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import Image from "next/image";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [i18nReady, setI18nReady] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const loaderStartRef = useRef<number | null>(null);
    const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollYRef = useRef(0);
    const MIN_LOADER_MS = 1000;
    const FADE_OUT_MS = 450;

    useEffect(() => {
        setMounted(true);
        loaderStartRef.current = Date.now();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        return () => {
            window.history.scrollRestoration = previous;
        };
    }, []);

    const handleI18nReady = useCallback(() => {
        setI18nReady(true);
    }, []);

    useEffect(() => {
        if (!mounted || !i18nReady) {
            return;
        }
        const startedAt = loaderStartRef.current ?? Date.now();
        const elapsed = Date.now() - startedAt;
        const delay = Math.max(MIN_LOADER_MS - elapsed, 0);
        if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current);
        }
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        }
        fadeTimeoutRef.current = setTimeout(() => {
            setIsFading(true);
            hideTimeoutRef.current = setTimeout(() => {
                setShowLoader(false);
            }, FADE_OUT_MS);
        }, delay);
        return () => {
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [mounted, i18nReady]);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }
        if (showLoader) {
            scrollYRef.current = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.width = "100%";
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.documentElement.style.scrollBehavior = "";
            window.scrollTo(0, 0);
        }
    }, [showLoader]);

    const isContentHidden = showLoader && !isFading;

    const theme = createTheme({ 
        palette: { 
            mode: isDark ? 'dark' : 'light',
            ...(isDark ? {
                // Configuration du mode sombre
                background: {
                    default: '#000000',
                    paper: '#1e1e1e'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#b3b3b3'
                }
            } : {
                // Configuration du mode clair
                background: {
                    default: '#ffffff',
                    paper: '#f5f5f5'
                },
                text: {
                    primary: '#000000',
                    secondary: '#666666'
                }
            })
        } 
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <I18nProvider onReady={handleI18nReady}>
                <div className={`page-content ${isContentHidden ? "page-content--hidden" : ""}`}>
                    {children}
                </div>
                <div
                    className={`page-loader ${showLoader ? "page-loader--visible" : "page-loader--hidden"} ${isFading ? "page-loader--fade" : ""}`}
                    role="status"
                    aria-live="polite"
                    aria-hidden={!showLoader}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="page-loader__mark">
                            <div className="page-loader__pulse">
                                <Image
                                    src="/dotshell-logo.svg"
                                    alt="Dotshell"
                                    width={80}
                                    height={80}
                                    priority
                                    className="h-20 w-20 loader-spin page-loader__logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </I18nProvider>
        </ThemeProvider>
    )
}
