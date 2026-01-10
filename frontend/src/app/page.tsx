import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import About from "@/components/public/About";
import Projects from "@/components/public/Projects";
import Blog from "@/components/public/Blog";
import Services from "@/components/public/Services";
import Contact from "@/components/public/Contact";
import ScrollAnimations from "@/components/ScrollAnimations";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function getInitialData() {
  try {
    const [about, projects, blog, timeline] = await Promise.all([
      fetch(`${API_URL}/resources/about`, { next: { revalidate: 60 } }).then(res => res.ok ? res.json() : null),
      fetch(`${API_URL}/projects/`, { next: { revalidate: 60 } }).then(res => res.ok ? res.json() : []),
      fetch(`${API_URL}/resources/blog`, { next: { revalidate: 60 } }).then(res => res.ok ? res.json() : []),
      fetch(`${API_URL}/resources/timeline`, { next: { revalidate: 60 } }).then(res => res.ok ? res.json() : []),
    ]);

    return { about, projects, blog, timeline };
  } catch (error) {
    console.error("Initial data fetch failed:", error);
    return { about: null, projects: [], blog: [], timeline: [] };
  }
}

export default async function Home() {
  const data = await getInitialData();

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-accent animate-pulse"></div>
        <div className="blob blob-blue animate-pulse animation-delay-500"></div>
      </div>

      <Navbar />
      <ScrollAnimations />
      <Hero initialData={data.about} />
      <About initialData={data.about} initialTimeline={data.timeline} />
      <Projects initialData={data.projects} />
      <Blog initialData={data.blog} />
      <Services />
      <Contact />
    </>
  );
}

