import localFont from "next/font/local";

/** Titres éditoriaux */
export const serif = localFont({
  src: [{ path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/** Interface et lecture */
export const sans = localFont({
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: "Arial",
});
