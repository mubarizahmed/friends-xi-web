import Image from "next/image";
import { Inter } from "next/font/google";
import { createClient } from "contentful";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
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
        >
          {blogs.map((blog) => (
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
      <section className="flex w-full justify-between items-center h-full scroll">
            
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blogs" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}
