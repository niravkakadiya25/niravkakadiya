"use client";

import { personalData } from "@/utils/data/personal-data";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("./components/homepage/hero-section"),
  { ssr: false }
);
const Blog = dynamic(() => import("./components/homepage/blog"), {
  ssr: false,
});
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function HomeWrapper() {
  return <Home />;
}

// Keep Home server component for data fetching
async function Home() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const blogs = (await res.json())
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
