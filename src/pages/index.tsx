import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import { createClient } from "contentful";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// Import Swiper styles
import "swiper/css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }: { blogs: any[] }) {
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
      <main
        className={`flex h-full min-h-screen w-full snap-mandatory flex-col items-center justify-between ${inter.className}`}
      >
        <section className="flex h-full w-full items-center justify-between">
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
                <div className="relative flex h-[calc(100vh-5rem)] w-full items-center justify-center">
                  <Image
                    src={`https:${blog.fields.cover.fields.file.url}`} // Assuming this URL is correct
                    alt={blog.fields.title}
                    layout="fill"
                    objectFit="cover"
                    quality={100} // Optional, for better image quality
                  />
                  <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-10">
                    <h1 className=" z-10 rounded bg-black bg-opacity-40 p-3 text-3xl text-white">
                      {blog.fields.title}
                    </h1>
                    <button className="rounded bg-fxiblue p-3 font-header font-bold text-white">
                      Read More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="snap-top scroll flex h-screen w-full items-center justify-between p-8 px-20 pt-28">
          <div className="relative h-full w-full  py-20">
            <Image
              src="/logo.png"
              alt="Friends XI logo"
              fill
              objectFit="contain"
              className="p-24"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <h1 className="text-5xl font-bold text-fxired">
              We are Friends XI!
            </h1>
            <p className="text-l text-justify text-fxiblue">
              Welcome to the official website of Friends XI e.V., Bochum&rsquo;s
              premier cricket team and a proud member of the Deutsche Cricket
              Union (DCU).
            </p>
            <p className="text-l text-justify text-fxiblue">
              Born from a passion for the game and a deep sense of camaraderie,
              we are a team that has not only achieved considerable success on
              the field but also strives to spread the love for cricket
              throughout Germany. As cricket takes its rightful place as an
              Olympic sport, our commitment to expanding its reach and
              popularity in our country has never been stronger.
            </p>
          </div>
        </section>
        <section className="flex flex-col h-full w-full snap-start items-center justify-between p-8">
          <h1 className="text-2xl">Honors</h1>
          <VerticalTimeline className="flex w-full h-full ">
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </section>
      </main>
    </>
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
