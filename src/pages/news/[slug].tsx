import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";
import { createClient } from "contentful";
import { format } from "date-fns";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GetStaticProps, GetStaticPaths } from "next";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

// Helper function to create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Rich text rendering options
const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1
        className={`text-fxiblue mb-6 text-3xl font-bold ${montserrat.className}`}
      >
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2
        className={`text-fxiblue mb-4 text-2xl font-bold ${montserrat.className}`}
      >
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3
        className={`text-fxiblue mb-3 text-xl font-bold ${montserrat.className}`}
      >
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-700">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-fxiorange mb-4 border-l-4 bg-gray-50 py-2 pl-4 text-gray-600 italic">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title, description } = node.data.target.fields;
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title}
            width={file.details.image.width}
            height={file.details.image.height}
            className="mx-auto"
          />
          {description && (
            <p className="mt-2 text-center text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function NewsDetailPage({ blog }: { blog: any }) {
  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | Friends XI e.V.</title>
        </Head>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Blog not found</h1>
            <Link href="/blogs" className="text-fxiblue hover:underline">
              Back to all blogs
            </Link>
          </div>
        </div>
      </>
    );
  }

  const publishDate = blog.fields.publishDate || blog.sys.createdAt;

  return (
    <>
      <Head>
        <title>{blog.fields.title} | Friends XI e.V.</title>
        <meta
          name="description"
          content={
            blog.fields.excerpt ||
            `Read about ${blog.fields.title} on Friends XI e.V. blog`
          }
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={blog.fields.title} />
        <meta
          property="og:description"
          content={blog.fields.excerpt || `Read about ${blog.fields.title}`}
        />
        {blog.fields.cover && (
          <meta
            property="og:image"
            content={`https:${blog.fields.cover.fields.file.url}`}
          />
        )}
        <meta property="og:type" content="article" />
      </Head>

      <main
        className={`font-family-sans min-h-screen bg-white ${inter.className}`}
      >
        {/* Hero Section */}
        {blog.fields.cover && (
          <div className="relative h-96 w-full">
            <Image
              src={`https:${blog.fields.cover.fields.file.url}`}
              alt={blog.fields.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Title Overlay */}
            <div className="absolute right-0 bottom-0 left-0 p-8">
              <div className="mx-auto max-w-4xl">
                <h1
                  className={`mb-4 text-4xl font-bold text-white md:text-5xl ${montserrat.className}`}
                >
                  {blog.fields.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <span>{format(new Date(publishDate), "MMMM dd, yyyy")}</span>
                  {blog.fields.category && (
                    <>
                      <span>•</span>
                      <span>{blog.fields.category}</span>
                    </>
                  )}
                  {blog.fields.readTime && (
                    <>
                      <span>•</span>
                      <span>{blog.fields.readTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Title for posts without cover image */}
          {!blog.fields.cover && (
            <div className="mb-8">
              <h1
                className={`text-fxiblue mb-4 text-4xl font-bold md:text-5xl ${montserrat.className}`}
              >
                {blog.fields.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>{format(new Date(publishDate), "MMMM dd, yyyy")}</span>
                {blog.fields.category && (
                  <>
                    <span>•</span>
                    <span>{blog.fields.category}</span>
                  </>
                )}
                {blog.fields.readTime && (
                  <>
                    <span>•</span>
                    <span>{blog.fields.readTime} min read</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Excerpt */}
          {blog.fields.excerpt && (
            <div className="border-fxiorange mb-8 border-l-4 bg-gray-50 p-6">
              <p className="text-lg text-gray-700 italic">
                {blog.fields.excerpt}
              </p>
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            {blog.fields.content &&
              documentToReactComponents(blog.fields.content, renderOptions)}
          </div>

          {/* Navigation */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Link
                href="/news"
                className={`text-fximoonstone hover:text-fximagenta font-family-mono flex items-center transition-colors`}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                ALL NEWS
              </Link>

              <div className="flex gap-4">
                {/* <button
                  onClick={() => window.history.back()}
                  className={`rounded-none border-2 border-black px-4 py-2 transition-colors hover:bg-gray-50`}
                >
                  Go Back
                </button>
                <Link
                  href="/"
                  className={`bg-fximoonstone hover:bg-fximoonstone/80 rounded-none border-2 border-black px-4 py-2 text-white transition-colors`}
                >
                  Home
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID ?? "",
      accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
    });

    const res = await client.getEntries({ content_type: "blogs" });

    const paths = res.items.map((blog: any) => ({
      params: { slug: createSlug(blog.fields.title) },
    }));

    return {
      paths,
      fallback: "blocking", // Enable ISR for new blog posts
    };
  } catch (error) {
    console.error("Error fetching blog paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID ?? "",
      accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
    });

    const res = await client.getEntries({
      content_type: "blogs",
    });

    // Find the blog that matches the slug
    const blog = res.items.find((item: any) => {
      const slug = createSlug(item.fields.title);
      return slug === params?.slug;
    });

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      notFound: true,
    };
  }
};
