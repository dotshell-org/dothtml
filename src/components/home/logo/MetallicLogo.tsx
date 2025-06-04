'use client';

import { useEffect, useState } from "react";
import MetallicPaint, { parseLogoImage } from "@/react-bits/MetallicPaint";

const MetallicLogo = () => {
    const [imageData, setImageData] = useState<ImageData | null>(null);

    useEffect(() => {
        async function fetchAndParseImage() {
            const response = await fetch("/dotshell-logo.svg");
            const blob = await response.blob();

            const file = new File([blob], "dotshell-logo.svg", { type: "image/svg+xml" });
            const { imageData } = await parseLogoImage(file);
            setImageData(imageData);
        }
        fetchAndParseImage();
    }, []);

    return (
        <>
            {imageData && (
                <div style={{ width: 350, height: 350 }}>
                    <MetallicPaint imageData={imageData} params={{
                        patternScale: 2,
                        refraction: 0.015,
                        edge: 0,
                        patternBlur: 0.005,
                        liquid: 0.07,
                        speed: 0.1
                    }}
                    />
                </div>
            )}
        </>
    )
}

export default MetallicLogo;