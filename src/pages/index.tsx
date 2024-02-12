import Image from "next/image";
import { Inter } from "next/font/google";
import { createClient } from "contentful";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }: { blogs: any[] }) {
  return (
    <main
      className={`flex h-full w-full min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <section className="flex w-full justify-between items-center h-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="w-full"
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000 }}
        >
          {blogs.map((blog: any) => (
            <SwiperSlide key={blog.sys.id}>
              <div className="relative w-full h-[calc(100vh-5rem)] flex items-center justify-center">
                <Image
                  src={`https:${blog.fields.cover.fields.file.url}`} // Assuming this URL is correct
                  alt={blog.fields.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100} // Optional, for better image quality
                />
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end gap-10">
                  <h1 className=" text-white text-3xl bg-black p-3 bg-opacity-40 z-10 rounded">
                    {blog.fields.title}
                  </h1>
                  <button className="bg-fxiblue text-white p-3 rounded font-bold font-header">
                    Read More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="flex w-full p-8 px-20 justify-between items-center h-full scroll">
        <div className="w-full h-full py-20 relative">
          <Image
            src="/logo.png"
            alt="Friends XI logo"
            fill
            objectFit="contain"
            className="p-24"
          />
        </div>
        <div className="w-full h-[calc(100vh-5rem)] snap-top flex gap-4 flex-col items-start justify-center">
          <h1 className="text-5xl font-bold text-fxired">We are Friends XI!</h1>
          <p className="text-l text-fxiblue text-justify">
            Welcome to the official website of Friends XI e.V., Bochum&rsquo;s premier
            cricket team and a proud member of the Deutsche Cricket Union (DCU).
          </p>
          <p className="text-l text-fxiblue text-justify">
            Born from a passion for the game and a deep sense of camaraderie, we
            are a team that has not only achieved considerable success on the
            field but also strives to spread the love for cricket throughout
            Germany. As cricket takes its rightful place as an Olympic sport,
            our commitment to expanding its reach and popularity in our country
            has never been stronger.
          </p>
        </div>
      </section>
      <section className="flex w-full p-8 justify-between items-center h-full snap-start">
        <h1>Honors</h1>
        <div className="flex w-full"></div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
  });

  const res = await client.getEntries({ content_type: "blogs" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}
