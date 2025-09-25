import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="absolute h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="absolute h-screen w-screen snap-y overflow-scroll">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </div>
  );
}
