import type { Metadata } from "next";
import {
  Tiro_Devanagari_Marathi,
  Bebas_Neue,
  Noto_Sans_Devanagari,
  DM_Sans,
  Courier_Prime,
} from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from "./lib/LanguageContext";
import { AudioProvider } from "./lib/AudioContext";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import LanguageTransition from "./components/LanguageTransition";
import BodyLangClass from "./components/BodyLangClass";

const tiroDevanagari = Tiro_Devanagari_Marathi({
  variable: "--font-display-mr",
  subsets: ["devanagari"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display-en",
  subsets: ["latin"],
  weight: "400",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-body-mr",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-body-en",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const courierPrime = Courier_Prime({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ममित विजय चौगुले | प्रभाग ५-ब, ऐरोली",
  description:
    "ममित विजय चौगुले — प्रभाग ५-ब, ऐरोली, नवी मुंबईचे नगरसेवक. Mamit Vijay Chougule — Corporator, Ward 5B, Airoli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mr"
      className={`${tiroDevanagari.variable} ${bebasNeue.variable} ${notoSansDevanagari.variable} ${dmSans.variable} ${courierPrime.variable}`}
    >
      <body className="lang-mr">
        <LanguageProvider>
          <AudioProvider>
            <BodyLangClass />
            <SmoothScroll>
              <CustomCursor />
              <LanguageTransition>{children}</LanguageTransition>
            </SmoothScroll>
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
