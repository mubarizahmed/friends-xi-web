import Image from "next/image";
import Head from "next/head";
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
                      <button
                        className={`bg-fximoonstone hover:bg-opacity-90 rounded-none px-6 py-3 font-bold text-black transition-colors`}
                        onClick={() => {
                          // Add navigation to blog post here
                          console.log("Navigate to blog:", blog.sys.id);
                        }}
                      >
                        Read More
                      </button>
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

        {/* Footer/About Section */}
        <footer id="contact" className="bg-fximoonstone px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Club Info */}
              <div className="text-white">
                <h3 className={`mb-6 text-2xl font-bold`}>Friends XI e.V.</h3>
                <p className="mb-4 leading-relaxed opacity-90">
                  Bochum&apos;s premier cricket team and a proud member of the
                  Deutsche Cricket Union (DCU).
                </p>
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-semibold">Founded:</span>
                  <span className="opacity-90">2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Registration:</span>
                  <span className="opacity-90">VR 12345</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-white">
                <h3 className={`mb-6 text-2xl font-bold`}>Contact</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-90">info@friendsxi.de</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-90">+49 (0) 234 123 456</p>
                  </div>
                  <div>
                    <p className="font-semibold">Training Ground</p>
                    <p className="opacity-90">Bochum Cricket Ground</p>
                    <p className="text-sm opacity-90">Musterstraße 123</p>
                    <p className="text-sm opacity-90">44801 Bochum, Germany</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-white">
                <h3 className={`mb-6 text-2xl font-bold`}>Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Match Fixtures
                  </a>
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Team Statistics
                  </a>
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Join the Team
                  </a>
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Sponsorship
                  </a>
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Club Constitution
                  </a>
                  <a
                    href="#"
                    className="block opacity-90 transition-opacity hover:opacity-100"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>

              {/* Social Media & Newsletter */}
              <div className="text-white">
                <h3 className={`mb-6 text-2xl font-bold`}>Stay Connected</h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-3 font-semibold">Follow Us</p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.facebook.com/FriendsXIbochum/"
                        className="opacity-90 transition-opacity hover:opacity-100"
                        title="Facebook"
                      >
                        <FaFacebook className="h-6 w-6" />
                      </a>
                      {/* <a
                        href="#"
                        className="opacity-90 transition-opacity hover:opacity-100"
                        title="Instagram"
                      >
                        <FaInstagram className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="opacity-90 transition-opacity hover:opacity-100"
                        title="Twitter"
                      >
                        <FaTwitter className="h-6 w-6" />
                      </a> */}
                      <a
                        href="https://www.youtube.com/@FriendsXIe.V"
                        className="opacity-90 transition-opacity hover:opacity-100"
                        title="YouTube"
                      >
                        <FaYoutube className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-semibold">Newsletter</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 rounded-none px-3 py-2 text-sm text-black"
                      />
                      <button className="hover:bg-opacity-90 rounded-none bg-white px-4 py-2 text-sm font-semibold text-black transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-opacity-20 mt-12 border-t border-white pt-8">
              <div className="flex flex-col items-center justify-between gap-4 text-white md:flex-row">
                <div className="text-center md:text-left">
                  <p className="opacity-90">
                    © {new Date().getFullYear()} Friends XI e.V. All rights
                    reserved.
                  </p>
                  <p className="mt-1 text-sm opacity-75">
                    Registered in Germany | Deutsche Cricket Union Member
                  </p>
                </div>
                <div className="flex gap-6 text-sm opacity-90">
                  <a href="#" className="transition-opacity hover:opacity-100">
                    Terms of Service
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-100">
                    Privacy Policy
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-100">
                    Impressum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
