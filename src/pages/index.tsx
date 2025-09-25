import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Inter, Montserrat } from "next/font/google";
import { createClient } from "contentful";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import react-icons
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

// Helper function to create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export default function Home({
  blogs,
  honors,
}: {
  blogs: any[];
  honors: any[];
}) {
  // Handle case when no blogs are available
  if (!blogs || blogs.length === 0) {
    return (
      <>
        <Head>
          <title>Friends XI e.V.</title>
          <meta
            name="description"
            content="Friends XI e.V. - Bochum's premier cricket team"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="font-family-sans">
          <section className="from-fxiblue to-fxired flex h-[calc(100vh-5rem)] w-full items-center justify-center bg-gradient-to-br">
            <div className="text-center text-white">
              <h1 className={`mb-4 text-4xl font-bold md:text-6xl`}>
                Friends XI e.V.
              </h1>
              <p className="mb-8 text-xl">Bochum&apos;s Premier Cricket Team</p>
              <div className="animate-pulse">Loading content...</div>
            </div>
          </section>
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Friends XI e.V.</title>
        <meta
          name="description"
          content="Friends XI e.V. - Bochum's premier cricket team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-family-sans">
        {/* Hero Section with Carousel */}
        <section className="hero-carousel h-[calc(100vh-3.75rem)] w-full">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="h-full w-full [&_.swiper-button-next]:right-4 [&_.swiper-button-prev]:left-4"
            style={{ height: "100%" }}
          >
            {blogs.map((blog: any) => (
              <SwiperSlide key={blog.sys.id}>
                <div className="relative h-[calc(100vh-3.75rem)] w-full">
                  <Image
                    src={`https:${blog.fields.cover.fields.file.url}`}
                    alt={blog.fields.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="bg-opacity-30 absolute inset-0" />
                  <div className="absolute right-10 bottom-10 left-10 z-10">
                    <div className="flex items-end justify-between gap-6">
                      <h1
                        className={`bg-opacity-60 rounded bg-black p-4 text-2xl font-bold text-white backdrop-blur-sm md:text-3xl`}
                      >
                        {blog.fields.title}
                      </h1>
                      <Link
                        href={`/news/${createSlug(blog.fields.title)}`}
                        className={`bg-fximoonstone hover:bg-opacity-90 rounded-none px-6 py-3 font-bold text-black transition-colors`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* About Section */}
        <section className="flex min-h-screen items-center justify-center px-8 py-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Logo Column */}
              <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
                <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
                  <Image
                    src="/logo.png"
                    alt="Friends XI logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
              </div>
              {/* Text Column */}
              <div className="sticky order-1 flex flex-col justify-center gap-6 lg:order-2">
                <h1
                  className={`text-fxisafetyorange text-4xl font-bold lg:text-5xl`}
                >
                  We are Friends XI!
                </h1>
                <div className="space-y-4 text-white">
                  <p className="text-lg leading-relaxed">
                    Welcome to the official website of Friends XI e.V.,
                    Bochum&apos;s premier cricket team and a proud member of the
                    Deutsche Cricket Union (DCU).
                  </p>
                  <p className="text-lg leading-relaxed">
                    Born from a passion for the game and a deep sense of
                    camaraderie, we are a team that has not only achieved
                    considerable success on the field but also strives to spread
                    the love for cricket throughout Germany. As cricket takes
                    its rightful place as an Olympic sport, our commitment to
                    expanding its reach and popularity in our country has never
                    been stronger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Honors Section */}
        <section className="flex min-h-screen flex-col items-center justify-center bg-black px-8 py-16">
          <div className="mx-auto max-w-4xl text-left">
            <h2
              className={`text-fximoonstone mb-12 text-3xl font-bold lg:text-4xl`}
            >
              Honors
            </h2>
            <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
              {/* Add your achievements here */}
              {honors.map((honor) => (
                <div
                  key={honor.sys.id}
                  // gold if type is championship, silver if runner-up, bronze if semi-finalist
                  className={`flex-row gap-6 rounded-none bg-white p-2 shadow-md ${
                    honor.fields.type === "champions"
                      ? "border-gold border-l-8"
                      : honor.fields.type === "runners-up"
                        ? "border-silver border-l-8"
                        : "border-bronze border-l-8"
                  }`}
                >
                  <h3
                    className={`text-fxiblue mb-2 text-xl font-semibold ${
                      honor.fields.type === "champions"
                        ? "text-gold"
                        : honor.fields.type === "runners-up"
                          ? "text-silver"
                          : "text-bronze"
                    }`}
                  >
                    {honor.fields.type.toUpperCase()}
                  </h3>
                  {/* logo of the honor if available */}
                  {honor.fields.logo && (
                    <div className="mb-4 flex justify-center">
                      <div className="relative h-16 w-16">
                        <Image
                          src={`https:${honor.fields.logo.fields.file.url}`}
                          alt={honor.fields.title}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    </div>
                  )}
                  <h3 className={`mb-2 text-xl font-semibold text-black`}>
                    {honor.fields.title}
                  </h3>
                  <div className="flex grow justify-between px-2">
                    <h3 className="mb-2 bg-black p-1 text-sm font-semibold text-white">
                      {new Date(honor.fields.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <h3 className="mb-2 bg-black p-1 text-sm font-semibold text-white">
                      {honor.fields.format.toUpperCase()}
                    </h3>
                  </div>
                  <p className="text-gray-600">{honor.fields.description}</p>
                </div>
              ))}
              {/* Add more achievement cards as needed */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID ?? "",
      accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
    });

    const blogsRes = await client.getEntries({ content_type: "blogs" });
    const blogs = blogsRes.items || [];

    // sort blogs by date, most recent first
    blogs.sort((a, b) => {
      const dateA = new Date(a.fields.date as string);
      const dateB = new Date(b.fields.date as string);
      return dateB.getTime() - dateA.getTime();
    });

    const honorsRes = await client.getEntries({ content_type: "honors" });
    const honors = honorsRes.items || [];

    // sort honors by date, most recent first
    honors.sort((a, b) => {
      const dateA = new Date(a.fields.date as string);
      const dateB = new Date(b.fields.date as string);
      console.log(dateA, dateB);
      return dateB.getTime() - dateA.getTime();
    });

    return {
      props: {
        blogs,
        honors,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Error fetching blogs from Contentful:", error);

    // Return empty array if Contentful fails
    return {
      props: {
        blogs: [],
        honors: [],
      },
      revalidate: 1,
    };
  }
}
