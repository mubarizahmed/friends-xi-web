import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import { format } from "date-fns";
import { useState, useMemo } from "react";

// Helper function to create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export default function NewsPage({ blogs }: { blogs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const blogsPerPage = 10;

  // Get unique blog types for filter chips
  const blogTypes = useMemo(() => {
    const types = blogs.map((blog) => blog.fields.type).filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [blogs]);

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.fields.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.fields.excerpt &&
          blog.fields.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType =
        selectedType === "All" || blog.fields.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [blogs, searchTerm, selectedType]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return (
    <>
      <Head>
        <title>Latest News & Updates | Friends XI e.V.</title>
        <meta
          name="description"
          content="Stay updated with the latest news, match reports, and updates from Friends XI e.V., Bochum's premier cricket team."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`font-family-sans min-h-screen bg-black pt-4`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1
              className={`text-fximagenta mb-4 text-3xl font-bold md:text-5xl`}
            >
              Latest News & Updates
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Stay informed with the latest match reports, team updates, and
              cricket news from Friends XI e.V.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="border-fximagenta hover:bg-fximagenta/10 font-family-mono flex w-full items-center justify-between rounded-none border bg-black px-4 py-3 text-sm font-bold text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  FILTER & SEARCH
                  {(searchTerm || selectedType !== "All") && (
                    <span className="bg-fximagenta rounded-full px-2 py-0.5 text-xs text-white">
                      {searchTerm ? 1 : 0 + (selectedType !== "All" ? 1 : 0)}
                    </span>
                  )}
                </span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Layout - Always Visible */}
            <div className="hidden space-y-4 md:block">
              <div className="flex flex-wrap justify-between gap-4 md:flex">
                {/* Filter Chips */}
                <div className="flex flex-wrap justify-center gap-2">
                  {blogTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`font-family-mono rounded-none px-2 py-0 text-xs font-bold transition-colors ${
                        selectedType === type
                          ? "bg-fximagenta text-white shadow-md"
                          : "border-fximagenta hover:bg-fximagenta/30 border bg-black text-white"
                      }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl">
                  <div className="relative">
                    <svg
                      className="absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="SEARCH..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:bg-fximagenta/30 focus:ring-fxiblue/20 border-fximagenta font-family-mono w-full rounded-none border bg-black py-1 pr-4 pl-10 text-sm font-bold text-white placeholder-gray-500 focus:ring-2 focus:outline-none"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:text-fximagenta absolute top-1/2 right-2 -translate-y-1/2 text-white transition-colors"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Collapsible Section */}
            <div
              className={`overflow-hidden transition-all duration-300 md:hidden ${
                isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-fximagenta/30 font-family-mono border-fximagenta space-y-4 border-1 border-t-0 p-4">
                {/* Search Bar for Mobile */}
                <div className="relative">
                  <svg
                    className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="SEARCH..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:bg-fximagenta/30 focus:ring-fxiblue/20 border-fximagenta w-full rounded-full border bg-black py-3 pr-4 pl-10 text-white placeholder-gray-500 focus:ring-2 focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:text-fximagenta absolute top-1/2 right-3 -translate-y-1/2 text-white transition-colors"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Filter Chips for Mobile */}
                <div className="flex justify-around space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {blogTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`rounded-none px-3 py-1 text-sm font-bold transition-colors ${
                          selectedType === type
                            ? "bg-fximagenta text-white shadow-md"
                            : "border-fximagenta hover:bg-fximagenta/30 border bg-black text-white"
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            {/* <div className="text-center text-gray-400">
              {filteredBlogs.length === blogs.length ? (
                <span>Showing all {blogs.length} articles</span>
              ) : (
                <span>
                  Showing {filteredBlogs.length} of {blogs.length} articles
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedType !== "All" && ` in ${selectedType}`}
                </span>
              )}
            </div> */}
          </div>

          {/* Blog Grid */}
          {currentBlogs && currentBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentBlogs.map((blog) => {
                const slug = createSlug(blog.fields.title);
                const publishDate =
                  blog.fields.publishDate || blog.sys.createdAt;

                return (
                  <Link
                    key={blog.sys.id}
                    href={`/news/${slug}`}
                    className="group overflow-hidden rounded-none border-4 border-white bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                  >
                    {/* Blog Image */}
                    {blog.fields.cover && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={`https:${blog.fields.cover.fields.file.url}`}
                          alt={blog.fields.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Category/Type Overlay */}
                        {blog.fields.type && (
                          <div className="absolute bottom-0 left-0">
                            <span className="bg-fximagenta font-family-mono rounded-none px-3 py-1 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                              {blog.fields.type.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Date */}
                      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                        <span className="bg-fximagenta h-2 w-2 rounded-full"></span>
                        {format(new Date(publishDate), "MMMM dd, yyyy")}
                      </div>

                      {/* Title */}
                      <h2
                        className={`group-hover:text-fximoonstone mb-3 text-xl font-bold text-gray-900 transition-colors duration-300`}
                      >
                        {blog.fields.title}
                      </h2>

                      {/* Excerpt */}
                      {blog.fields.excerpt && (
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                          {blog.fields.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="text-fximoonstone flex items-center text-sm font-semibold">
                        <span>Read More</span>
                        <svg
                          className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* No Blogs State */
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏏</div>
              {filteredBlogs.length === 0 && blogs.length > 0 ? (
                <>
                  <h3 className={`mb-4 text-2xl font-bold text-white`}>
                    No Articles Found
                  </h3>
                  <p className="mb-8 text-gray-200">
                    No articles match your current search or filter criteria.
                    Try adjusting your search or selecting a different category.
                  </p>
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedType("All");
                      }}
                      className={`bg-fximoonstone hover:bg-opacity-90 rounded-lg px-6 py-3 font-semibold text-white transition-colors`}
                    >
                      Clear Filters
                    </button>
                    <Link
                      href="/"
                      className={`hover:bg-opacity-90 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors`}
                    >
                      Back to Home
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className={`mb-4 text-2xl font-bold text-gray-900`}>
                    No Articles Yet
                  </h3>
                  <p className="mb-8 text-gray-600">
                    We&apos;re working on bringing you the latest cricket news
                    and updates. Check back soon!
                  </p>
                  <Link
                    href="/"
                    className={`bg-fxiblue hover:bg-opacity-90 rounded-lg px-6 py-3 font-semibold text-white transition-colors`}
                  >
                    Back to Home
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredBlogs.length > blogsPerPage && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center rounded-full bg-black px-1 py-1 text-sm font-medium ${
                    currentPage === 1
                      ? "cursor-not-allowed text-gray-400"
                      : "text-fximagenta hover:bg-fximagenta/30"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
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
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;

                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`font-family-mono border-fximagenta rounded-none border-2 px-2 py-1 text-sm ${
                          isCurrentPage
                            ? "bg-fximagenta text-white shadow-md"
                            : "border-fximagenta hover:bg-fximagenta/30 border-2 bg-black text-white"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNumber}
                        className="px-2 py-2 text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center rounded-full bg-black px-1 py-1 text-sm font-medium ${
                    currentPage === totalPages
                      ? "cursor-not-allowed text-gray-400"
                      : "text-fximagenta hover:bg-fximagenta/30"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
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

    const res = await client.getEntries({
      content_type: "blogs",
      order: ["-sys.createdAt"], // Most recent first
    });

    return {
      props: {
        blogs: res.items || [],
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error("Error fetching blogs from Contentful:", error);

    return {
      props: {
        blogs: [],
      },
      revalidate: 300,
    };
  }
}
