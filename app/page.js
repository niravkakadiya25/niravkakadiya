// app/page.js
import { personalData } from "@/utils/data/personal-data";
import dynamic from "next/dynamic";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";

// Dynamically import client components
const HeroSection = dynamic(
  () => import("./components/homepage/hero-section"),
  { ssr: false }
);
const Projects = dynamic(() => import("./components/homepage/projects"), {
  ssr: false,
});
const Skills = dynamic(() => import("./components/homepage/skills"), {
  ssr: false,
});
const Blog = dynamic(() => import("./components/homepage/blog"), {
  ssr: false,
});

async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    const filtered = data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.5);
    return filtered;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div suppressHydrationWarning>
      {/* Browser-dependent components are client components */}
      <HeroSection />
      <AboutSection /> {/* Pure server component */}
      <Experience /> {/* Pure server component */}
      <Skills />
      <Projects />
      <Education /> {/* Pure server component */}
      <Blog blogs={blogs} />
      <ContactSection /> {/* Pure server component */}
    </div>
  );
}
