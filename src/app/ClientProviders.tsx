// ClientProviders.tsx (Client Component)
'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React, { useCallback, useState } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";

const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
        dark: {
            palette: {
                background: {
                    default: '#000000',
                    paper: '#1e1e1e'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#b3b3b3'
                }
            }
        },
        light: {
            palette: {
                background: {
                    default: '#ffffff',
                    paper: '#f5f5f5'
                },
                text: {
                    primary: '#000000',
                    secondary: '#666666'
                }
            }
        }
    }
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const [i18nReady, setI18nReady] = useState(false);

    const handleI18nReady = useCallback(() => {
        setI18nReady(true);
    }, []);

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: `
                    (function() {
                        try {
                            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                            if (mediaQuery.matches) {
                                document.body.classList.add('dark-theme');
                                document.documentElement.classList.add('dark');
                            }
                            mediaQuery.addEventListener('change', (e) => {
                                document.body.classList.toggle('dark-theme', e.matches);
                                document.documentElement.classList.toggle('dark', e.matches);
                            });
                        } catch (e) {
                            console.error('Theme detection error:', e);
                        }
                    })();
                `}}
            />
            <ThemeProvider theme={theme}>
                <I18nProvider onReady={handleI18nReady}>
                    <CssBaseline enableColorScheme />
                    {children}
                </I18nProvider>
            </ThemeProvider>
        </>
    )
}
