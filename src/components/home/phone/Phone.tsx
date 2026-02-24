"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import type { Mesh } from "three";

const PhoneModel = () => {
    const meshRef = useRef<Mesh>(null!);
    const [rotation, setRotation] = useState(0);
    const rotationK = useRef(0.005); // Default value

    const calculateK = () => {
        const peloSection = document.getElementById("pelo-section");
        if (peloSection) {
            const windowHeight = window.innerHeight;
            // We need the distance from top of document to pelo-section.
            const sectionTop = window.pageYOffset + peloSection.getBoundingClientRect().top;
            const scrollAtCenter = sectionTop + peloSection.offsetHeight / 2 - windowHeight / 2;

            if (scrollAtCenter > 0) {
                const turns = 0.5;
                const bias = 0.1;
                const targetRotation = turns * 2 * Math.PI + bias;
                rotationK.current = targetRotation / scrollAtCenter;
            }
        }
    }

    const handleScroll = () => {
        setRotation(window.scrollY * rotationK.current);
    };

    useEffect(() => {
        // We need to make sure the DOM is ready.
        // A small delay or requestAnimationFrame can help.
        const animationFrameId = requestAnimationFrame(() => {
            calculateK();
            handleScroll(); // Set initial rotation
        });

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", calculateK);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", calculateK);
        };
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            // Using lerp for smoothness
            meshRef.current.rotation.y += (rotation - meshRef.current.rotation.y) * 0.1;
        }
    });

    return (
        <Box ref={meshRef} args={[3.5, 6.5, 0.3]}>
            <meshStandardMaterial color={"#333"} />
        </Box>
    );
}

const Phone = () => {
    return (
        <div className="w-80 h-[40rem]">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <PhoneModel />
            </Canvas>
        </div>
    )
}

export default Phone;
