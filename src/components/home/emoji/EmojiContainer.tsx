'use client';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';


const emojis = ['💳', '⚙️', '📦', '🕒', '📉', '⏳', '🧾', '📊', '📑', '🛒', '📅', '💰', '📈', '✏️', '📝', '💵', '🪙'];


const EmojiContainer = () => {
    const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);


    useEffect(() => {
        // Set up an interval to change the emoji
        const intervalId = setInterval(() => {
            setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
        }, 1500);


        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    const currentEmoji = emojis[currentEmojiIndex];
    const emojiVariants: Variants = {
        initial: { opacity: 0, y: -50, scale: 0.5 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
        exit: { opacity: 0, y: 50, scale: 1.5, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    };
    const textVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
    };


    return (
        <div className="flex justify-center items-center w-full mt-20">
            <div className="relative flex items-center justify-center w-80 h-80">
                {/* Text on the left (vertical) */}
                <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 rotate-270 text-lg font-light text-gray-700 dark:text-gray-200"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={textVariants}
                >
                    Thought
                </motion.div>


                {/* Text on top (horizontal) */}
                <motion.div
                    className="absolute top-10 text-lg font-light text-gray-700 dark:text-gray-200"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={textVariants}
                >
                    Around
                </motion.div>


                {/* Central emoji with transition */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentEmoji}
                        className="text-9xl cursor-default absolute"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={emojiVariants}
                    >
                        {currentEmoji}
                    </motion.div>
                </AnimatePresence>


                {/* Text on the right (vertical) */}
                <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-lg font-light text-gray-700 dark:text-gray-200"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={textVariants}
                >
                    Emojis
                </motion.div>
            </div>
        </div>
    );
};


export default EmojiContainer;