import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="absolute w-screen h-screen snap-y overflow-scroll">
      <Component {...pageProps}/>
      </div>
    </div>
  );
}
