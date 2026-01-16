"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const serviceData = [
    {
      title: t("services.genai_title"),
      description: t("services.genai_desc"),
      icon: "psychology",
      bgIcon: "auto_awesome",
      skills: [
        "LLMs",
        "Agentic RAG",
        "Prompt Engineering",
        "LangChain",
        "LlamaIndex",
        "Vector Databases",
      ],
    },
    {
      title: t("services.agents_title"),
      description: t("services.agents_desc"),
      icon: "smart_toy",
      bgIcon: "hub",
      skills: [
        "ReAct",
        "Tool-Using Agents",
        "Workflow Orchestration",
        "Model Evaluation",
      ],
    },
    {
      title: t("services.backend_title"),
      description: t("services.backend_desc"),
      icon: "database",
      bgIcon: "dns",
      skills: [
        "FastAPI",
        "Python",
        "PostgreSQL",
        "JWT",
        "REST APIs",
        "Vector Stores",
      ],
    },
    {
      title: t("services.frontend_title"),
      description: t("services.frontend_desc"),
      icon: "desktop_windows",
      bgIcon: "devices",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
  ];

  const techRow1 = [
    { name: "Python", icon: "terminal", color: "text-yellow-400" },
    { name: "LLMs", icon: "psychology", color: "text-purple-400" },
    { name: "LangChain", icon: "account_tree", color: "text-emerald-400" },
    { name: "LlamaIndex", icon: "schema", color: "text-sky-400" },
    { name: "FastAPI", icon: "bolt", color: "text-teal-400" },
    { name: "PostgreSQL", icon: "database", color: "text-blue-300" },
  ];

  const techRow2 = [
    { name: "React", icon: "code_blocks", color: "text-blue-400" },
    { name: "Next.js", icon: "layers", color: "text-white" },
    { name: "Docker", icon: "deployed_code", color: "text-blue-400", highlight: true },
    { name: "Git", icon: "commit", color: "text-red-500" },
    { name: "Linux", icon: "terminal", color: "text-gray-300" },
    { name: "CI/CD", icon: "sync", color: "text-green-400" },
  ];

  return (
    <section
      id="services"
      className="animate-section py-24 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {t("services.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("services.title")}
            <span className="text-gradient">
              {t("services.title_highlight")}
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            {t("services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="animate-card glass-panel rounded-3xl p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.04]">
                <span className="material-symbols-outlined !text-[160px] text-primary select-none">
                  {service.bgIcon}
                </span>
              </div>

              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <span className="material-symbols-outlined !text-4xl text-primary">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-8 font-light">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
