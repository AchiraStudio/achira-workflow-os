import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsHud from "./components/StatsHud";
import SkillsMatrix from "./components/SkillsMatrix";
import WorkflowsExplorer from "./components/WorkflowsExplorer";
import AgentsDirectory from "./components/AgentsDirectory";
import GlobalArchitecture from "./components/GlobalArchitecture";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A0F] text-[#F8FAFC]">
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />
      
      <main className="flex-1">
        <Hero
          onExploreSkills={() => scrollToSection("skills")}
          onExploreWorkflows={() => scrollToSection("workflows")}
        />
        <StatsHud />
        <SkillsMatrix />
        <WorkflowsExplorer />
        <AgentsDirectory />
        <GlobalArchitecture />
      </main>

      <Footer />
    </div>
  );
}
