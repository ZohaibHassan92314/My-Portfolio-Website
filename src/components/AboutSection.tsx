"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal")
    if (!els) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 px-[clamp(1.25rem,9vw,7rem)] overflow-hidden"
    >
      <div className="section-bg-text pointer-events-none select-none">ABOUT</div>

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <p className="reveal block text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#00d4ff] mb-2">
          Get to know More
        </p>
        <h2 className="reveal reveal-delay-1 text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-white leading-[1.1]">
          About Me
        </h2>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 max-w-5xl mx-auto">

        {/* Image column */}
        <div className="reveal flex flex-col gap-4">
          <div className="relative rounded-[1.25rem] overflow-hidden border border-[rgba(255,255,255,0.07)] aspect-[3/4] group">
            <Image
              src="/assets/my-pic2.png"
              alt="Zohaib Hassan"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,8,16,0.8)] pointer-events-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["DATA ENGINEER", "ISLAMABAD, PK"].map((tag) => (
              <span
                key={tag}
                className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#6b7a99] border border-[#2e3650] px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-center gap-7">
          <blockquote className="reveal reveal-delay-1 text-[clamp(1.1rem,2.2vw,1.5rem)] font-medium leading-[1.55] text-white border-l-[3px] border-[#00d4ff] pl-6 not-italic">
            &quot;Building reliable data infrastructure that transforms raw information into actionable insights.&quot;
          </blockquote>

          {/* Cards row */}
          <div className="reveal reveal-delay-2 flex gap-4">
            {[
              { icon: "/assets/experience.png", title: "Experience", sub: "1 year\nData Engineer" },
              { icon: "/assets/education.png",  title: "Education",  sub: "BESE Bachelor's\nSoftware Engineering" },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="glass-card flex-1 p-6 text-center">
                <Image src={icon} alt="" width={32} height={32} className="mx-auto mb-2 opacity-60" />
                <h3 className="text-[0.9rem] font-semibold text-white mb-1">{title}</h3>
                <p className="text-[0.82rem] text-[#6b7a99] whitespace-pre-line">{sub}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="reveal reveal-delay-3 glass-card p-8">
            <p className="text-[0.95rem] text-[#6b7a99] leading-[1.85]">
              I&apos;m a Data Engineer with a background in Software Engineering and a Hafiz-e-Quran.
              I design and build scalable Data Pipelines, maintain data infrastructure, and
              ensure high standards of data quality and reliability. I also enjoy data analysis and
              creating interactive dashboards and reports that deliver actionable insights for
              effective decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="text-center mt-8 relative z-10">
        <a href="#experience" className="inline-block opacity-30 hover:opacity-70 transition-opacity animate-bounce">
          <Image src="/assets/arrow.png" alt="Scroll to Skills" width={32} height={32} className="opacity-60" />
        </a>
      </div>
    </section>
  )
}
