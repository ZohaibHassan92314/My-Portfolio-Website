"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"

const skills = {
  "Data Engineering": [
    { name: "Python",       level: "Experienced" },
    { name: "SQL",          level: "Intermediate" },
    { name: "ETL Pipelines",level: "Experienced" },
    { name: "Git / GitHub", level: "Basic" },
    { name: "Data Modeling",level: "Intermediate" },
    { name: "Snowflake",    level: "Intermediate" },
  ],
  "Data Analytics": [
    { name: "Power BI",             level: "Intermediate" },
    { name: "Excel",                level: "Intermediate" },
    { name: "Data Visualisation",   level: "Experienced" },
    { name: "AI & ML Fundamentals", level: "Basic" },
    { name: "EDA",                  level: "Intermediate" },
    { name: "Statistics",           level: "Intermediate" },
  ],
}

const levelColor: Record<string, string> = {
  Experienced:  "bg-[rgba(0,212,255,0.1)] text-[#00d4ff]",
  Intermediate: "bg-[#2e3650] text-[#6b7a99]",
  Basic:        "bg-[rgba(124,58,237,0.12)] text-[#a78bfa]",
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = ref.current?.querySelector("#skills-scene")
    if (!scene) return
    const nodes = scene.querySelectorAll(".skill-node")
    nodes.forEach((n) => {
      const el = n as HTMLElement
      el.style.opacity = "0"
      el.style.transform = "translateX(-12px)"
      el.style.transition = "opacity 0.45s ease, transform 0.45s ease"
    })
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      nodes.forEach((n, i) => {
        setTimeout(() => {
          const el = n as HTMLElement
          el.style.opacity = "1"
          el.style.transform = "translateX(0)"
        }, i * 60)
      })
      obs.disconnect()
    }, { threshold: 0.2 })
    obs.observe(scene)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-28 px-[clamp(1.25rem,9vw,7rem)] overflow-hidden flex flex-col items-center"
    >
      <div className="section-bg-text">SKILLS</div>

      <div className="text-center mb-16 relative z-10 reveal">
        <p className="block text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#00d4ff] mb-2">
          Explore My
        </p>
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-white leading-[1.1]">
          Technical Skills
        </h2>
      </div>

      {/* Skill clusters */}
      <div
        id="skills-scene"
        className="relative z-10 flex flex-col md:flex-row items-stretch gap-4 w-full max-w-4xl"
        aria-label="Technical skills"
      >
        {Object.entries(skills).map(([cluster, items], ci) => (
          <React.Fragment key={cluster}>
            <div
              className="flex-1 bg-[#0f1220] border border-[rgba(255,255,255,0.07)] rounded-[1.25rem] p-10 flex flex-col gap-3 hover:border-[rgba(0,212,255,0.18)] hover:shadow-[0_0_40px_rgba(0,212,255,0.06)] transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#00d4ff] pb-3 border-b border-[#2e3650] mb-2">
                {cluster}
              </div>
              <div className="flex flex-col gap-1">
                {items.map(({ name, level }) => (
                  <div
                    key={name}
                    className="skill-node flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.2)] hover:translate-x-1 transition-all cursor-default group"
                    tabIndex={0}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#2e3650] group-hover:bg-[#00d4ff] group-hover:shadow-[0_0_8px_#00d4ff] transition-all flex-shrink-0" />
                    <span className="flex-1 text-[0.875rem] font-semibold text-[#dde4f0]">{name}</span>
                    <span className={`text-[0.7rem] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${levelColor[level]}`}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector bridge */}
            {ci === 0 && (
              <div key="bridge" className="hidden md:flex flex-col items-center justify-center gap-2 px-2 flex-shrink-0">
                <svg width="60" height="2" viewBox="0 0 60 2" className="overflow-visible">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(0,212,255,0.25)" strokeWidth="1" strokeDasharray="4 6" />
                </svg>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse shadow-[0_0_8px_#00d4ff]" />
                <svg width="60" height="2" viewBox="0 0 60 2" className="overflow-visible">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(0,212,255,0.25)" strokeWidth="1" strokeDasharray="4 6" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center mt-12 relative z-10">
        <a href="#projects" className="inline-block opacity-30 hover:opacity-70 transition-opacity animate-bounce">
          <Image src="/assets/arrow.png" alt="Scroll to Projects" width={32} height={32} className="opacity-60" />
        </a>
      </div>
    </section>
  )
}
