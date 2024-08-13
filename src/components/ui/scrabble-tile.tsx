"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import React from "react";

const scrabbleTileStyles = cva(
  "inline-block text-center font-bold border-2 rounded",
  {
    variants: {
      theme: {
        white: "border-white bg-transparent text-white",
        classic: "border-amber-900 bg-amber-950 text-yellow-200",
        solarizedDark: "border-[#073642] bg-[#002b36] text-[#839496]",
        solarizedLight: "border-[#eee8d5] bg-[#fdf6e3] text-[#657b83]",
        gruvbox: "border-[#3c3836] bg-[#282828] text-[#d5c4a1]",
      },
    },
    defaultVariants: {
      theme: "white",
    },
  },
);

interface ScrabbleTileProps extends VariantProps<typeof scrabbleTileStyles> {
  letter: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: number;
}

export default function ScrabbleTile({
  letter,
  theme,
  borderColor,
  backgroundColor,
  textColor,
  size = 2.5,
}: ScrabbleTileProps) {
  const sizeRem = `${size ?? 2.5}rem`;
  const lineHeightRem = `${size - 0.25}rem`;
  const fontSizeRem = `${size * 0.6}rem`;

  return (
    <motion.div
      className={scrabbleTileStyles({ theme })}
      style={{
        width: sizeRem,
        height: sizeRem,
        lineHeight: lineHeightRem,
        fontSize: fontSizeRem,
        borderColor,
        backgroundColor,
        color: textColor,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
      whileDrag={{
        scale: 1.2,
        rotate: -5,
        transition: { duration: 0.2 },
      }}
      drag
    >
      {letter}
    </motion.div>
  );
}
