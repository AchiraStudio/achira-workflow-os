export const skillCategories = [
  {
    name: "Master Expert Pillars",
    skills: [
      { id: "web-expert", label: "Web Expert", description: "Mastery of React, Next.js, and SEO. Distills 1,200+ production rules." },
      { id: "backend-expert", label: "Backend Expert", description: "PythonPro, Node.js, and Database architecture mastery." },
      { id: "ai-expert", label: "AI & RAG Expert", description: "LLM integration, Vector DBs, and prompt engineering protocols." },
      { id: "devops-expert", label: "DevOps Expert", description: "CI/CD, Dockerization, and cloud security standards." },
      { id: "app-expert", label: "App Expert", description: "Flutter and Avalonia multi-platform architecture standards." },
      { id: "game-expert", label: "Game Expert", description: "High-performance Unity/C# memory and logic patterns." },
      { id: "commerce-expert", label: "Commerce Expert", description: "Shopify ecosystem and secure payment integration mastery." },
    ],
  },
  {
    name: "Core Foundation",
    skills: [
      { id: "project-setup", label: "Project Setup", description: "Universal standards for Clean Code, Linting, and TDD." },
      { id: "architecture", label: "System Architecture", description: "Design patterns, ADRs, and structural integrity." },
      { id: "orchestration", label: "Orchestration", description: "Multi-agent coordination and Socratic discovery." },
    ],
  },
];

export const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
