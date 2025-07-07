// ClientProviders.tsx (Client Component)
'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React, { useState, useEffect } from "react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Détecter la préférence système
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        // Écouter les changements de préférence système
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const theme = createTheme({ 
        palette: { 
            mode: isDark ? 'dark' : 'light',
            ...(isDark ? {
                // Configuration du mode sombre
                background: {
                    default: '#101828',
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
            {children}
        </ThemeProvider>
    )
}
