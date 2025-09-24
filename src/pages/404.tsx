import Head from "next/head";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Friends XI e.V.</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Get back to Friends XI e.V."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-family-sans from-fxiblue to-fxired flex min-h-screen items-center justify-center bg-black">
        <div className="page-404 px-8 py-16 text-center">
          <div className="mb-8">
            {/* Cricket-themed animated GIF */}
            <div className="gif-container bg-opacity-10 glow-button relative mx-auto mb-8 h-40 w-80 overflow-hidden rounded-lg bg-white backdrop-blur-sm">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGhobW00bXhjbWdrOGRrMWgzbDlzOTJhYjVoM3JzMWsxaWF5dW05YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YyKPbc5OOTSQE/giphy.gif"
                alt="Cricket ball animation"
                className="h-full w-full rounded-lg object-cover"
                onError={(e) => {
                  // Fallback if GIF fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
              {/* Fallback content with cricket emoji */}
              <div
                className="h-full w-full items-center justify-center text-6xl text-white"
                style={{ display: "none" }}
              >
                🏏 404 🏏
              </div>
            </div>
          </div>

          <div className="text-white">
            {/* <h1
              className={`mb-4 text-8xl font-bold md:text-9xl ${montserrat.className}`}
            >
              404
            </h1> */}
            <h2
              className={`mb-6 text-3xl font-bold md:text-4xl ${montserrat.className}`}
            >
              Bowled Out!
            </h2>
            <p className="mx-auto mb-4 max-w-md text-xl opacity-90">
              Looks like this page has been caught behind the stumps.
            </p>
            <p className="mx-auto mb-8 max-w-md text-lg opacity-75">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to the pavilion.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className={`bg-fximoonstone hover:bg-opacity-90 rounded-none px-8 py-4 text-lg font-bold text-black transition-colors ${montserrat.className}`}
              >
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className={`hover:text-fxiblue rounded-none border-2 border-white px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white ${montserrat.className}`}
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Fun cricket facts while they're here */}
          <div className="mt-12 text-white opacity-75">
            <p className="text-sm">
              🏏 Fun fact: The fastest recorded cricket ball was bowled at 161.3
              km/h!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
