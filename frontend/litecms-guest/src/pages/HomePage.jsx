import { useEffect, useState } from "react";
import Post from "../components/partials/Post";
import dateFormat from "../utils/dateFormat";
import { markdownify } from "../utils/textConverter";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye } from "react-icons/fa";
import  ContentList  from "../components/layouts/ContentList"
import Sidebar from "../components/partials/Sidebar";

const contents = [
  {
    title: "The Future of Artificial Intelligence in Everyday Life",
    createdAt: "2026-02-14",
    featuredImage: "/images/post-1.png",
    description: "An overview of how AI is transforming industries and daily routines across the globe. An overview of how AI is transforming industries and daily routines across the globe. An overview of how AI is transforming industries and daily routines across the globe. An overview of how AI is transforming industries and daily routines across the globe.",
    contentType: "Article",
    category: "Technology",
    viewCount: 1230
  },
  {
    title: "Exploring the Hidden Beaches of the Mediterranean",
    createdAt: "2026-01-28",
    featuredImage: "/images/post-2.png",
    description: "A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches.",
    contentType: "Photo Gallery",
    category: "Travel",
    viewCount: 121
  },
  {
    title: "Top 10 Healthy Habits for a Better Lifestyle",
    createdAt: "2026-02-05",
    featuredImage: "/images/post-3.png",
    description: "Simple daily practices that can significantly improve your physical and mental health.",
    contentType: "Article",
    category: "Health & Wellness",
    viewCount: 123
  },
  {
    title: "Beginner’s Guide to Spring Boot Development",
    createdAt: "2026-02-18",
    featuredImage: "/images/post-4.png",
    description: "Learn the fundamentals of building REST APIs using Spring Boot. Learn the fundamentals of building REST APIs using Spring Boot.",
    contentType: "Video",
    category: "Programming",
    viewCount: 143
  },
  {
    title: "Street Photography: Capturing Urban Life",
    createdAt: "2026-01-30",
    featuredImage: "/images/post-5.png",
    description: "A curated collection of powerful street photography moments.",
    contentType: "Photo Gallery",
    category: "Photography",
    viewCount: 923
  },
  {
    title: "Understanding Global Financial Markets",
    createdAt: "2026-02-10",
    featuredImage: "/images/post-6.png",
    description: "A breakdown of how international markets operate and influence economies.",
    contentType: "Article",
    category: "Finance",
    viewCount: 5239
  },
  {
    title: "Top 5 JavaScript Frameworks in 2026",
    createdAt: "2026-02-22",
    featuredImage: "/images/post-7.png",
    description: "Comparing the most popular frontend frameworks developers are using this year. Comparing the most popular frontend frameworks developers are using this year.",
    contentType: "Article",
    category: "Programming",
    viewCount: 32145
  },
  {
    title: "Culinary Traditions from Around the World",
    createdAt: "2026-01-19",
    featuredImage: "/images/post-8.png",
    description: "A visual exploration of unique dishes and food cultures. A visual exploration of unique dishes and food cultures. A visual exploration of unique dishes and food cultures.",
    contentType: "Photo Gallery",
    category: "Food & Recipes",
    viewCount: 1234
  },
  {
    title: "Highlights from the International Tech Conference",
    createdAt: "2026-02-01",
    featuredImage: "/images/post-3.png",
    description: "Key announcements and breakthrough innovations revealed this year. Key announcements and breakthrough innovations revealed this year.",
    contentType: "Video",
    category: "Technology",
    viewCount: 43212
  },
  {
    title: "The Psychology of Productivity",
    createdAt: "2026-02-12",
    featuredImage: "/images/post-5.png",
    description: "Insights into how mindset and habits impact your efficiency and focus. Insights into how mindset and habits impact your efficiency and focus Insights into how mindset and habits impact your efficiency and focus",
    contentType: "Article",
    category: "Personal Development",
    viewCount: 4125
  }
]

export const HomePage = () => {
    const LatestPublishedContent = contents[0]

    useEffect(() => {
        document.title = "LiteCMS"
    }, []);

    return (
    <section className="section pt-0 ">
      <div className="container px-3">
          <div className="row items-start">
              <div className="mb-3 lg:mb-0 lg:col-8">
              {/* Featured posts */}
                  <div className="section pt-6 pb-8">
                      {markdownify("Latest Content", "h2", "section-title mb-9")}
                      <div className="rounded border border-border p-4 dark:border-darkmode-border">
                          <div className="row">
                              <div className="w-full">
                                  <Post content={LatestPublishedContent} />
                              </div>
                          </div>
                      </div>
                  </div>
                  <ContentList
                      tabs={false}
                      contents={contents.slice(1)} 
                  />
              </div>
              <Sidebar className={"lg:mt-[103px] "} variant={"home"}/>
          </div>
      </div>
    </section>
    )
}