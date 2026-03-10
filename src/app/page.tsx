"use client";

import { useState } from "react";
import Link from "next/link";
import { industries } from "@/lib/data/industries";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const active = industries[activeIndustry];
  const totalInsights = industries.reduce((sum, i) => sum + i.insights.length, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link href="/" className="text-base font-semibold">
          faultline
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-black">Industries</Link>
          <Link href="/explore" className="text-black/50 hover:text-black transition-colors">Explorer</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.08] max-w-2xl mx-auto">
          Find startup ideas
          <br />
          backed by real data.
        </h1>
        <p className="mt-5 text-lg text-black/50 max-w-md mx-auto leading-relaxed">
          {industries.length} industries. {totalInsights} fault lines. Every statistic from BLS and FRED.
        </p>
      </section>

      {/* Interactive Feature Carousel — Cal AI style */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: clickable industry cards */}
          <div className="space-y-3">
            {industries.map((industry, i) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  i === activeIndustry
                    ? "border-black bg-gray-100 scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold">{industry.name}</h3>
                  <span className="text-sm text-black/40">{industry.insights.length} fault lines</span>
                </div>
                <p className="text-sm text-black/50 leading-relaxed">
                  {industry.startupFit}
                </p>
              </button>
            ))}
          </div>

          {/* Right: detail panel — like Cal AI's phone mockup area */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
              {/* Header */}
              <div className="p-8 pb-6 border-b border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-3">
                  {active.name}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-semibold">{active.marketSize}</p>
                    <p className="text-xs text-black/40 mt-0.5">Market size</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{active.techPenetration}</p>
                    <p className="text-xs text-black/40 mt-0.5">Tech adoption</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{active.fragmentation.split(",")[0]}</p>
                    <p className="text-xs text-black/40 mt-0.5">Businesses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {active.employmentK > 0 ? `${(active.employmentK / 1000).toFixed(1)}M` : "—"}
                    </p>
                    <p className="text-xs text-black/40 mt-0.5">Workers</p>
                  </div>
                </div>
              </div>

              {/* Top insight preview */}
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-4">
                  Top fault line
                </p>
                <p className="text-xl font-semibold mb-2">
                  {active.insights[0].value}
                </p>
                <p className="text-sm text-black/60 leading-relaxed mb-6">
                  {active.insights[0].statement}
                </p>
                <Link
                  href={`/industry/${active.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                >
                  See all {active.insights.length} fault lines
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Dot indicators — Cal AI style */}
            <div className="flex justify-center gap-1.5 mt-5">
              {industries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndustry(i)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    i === activeIndustry ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full industry list — Hinge section-break style with dark bg */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">
            All industries
          </h2>
          <p className="text-white/50 mb-12">
            Fragmented markets with low tech adoption.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {industries.map((industry) => (
              <Link key={industry.id} href={`/industry/${industry.id}`}>
                <div className="group p-6 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{industry.name}</h3>
                    <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                  <div className="flex items-center gap-5 text-sm text-white/50">
                    <span>{industry.marketSize}</span>
                    <span>{industry.fragmentation.split(",")[0]}</span>
                    <span>{industry.techPenetration} tech</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — like Hinge's "designed to be deleted" */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Every number is real.
          <br />
          Every source is cited.
        </h2>
        <p className="text-black/50 mb-8 max-w-md mx-auto">
          Built on Bureau of Labor Statistics and Federal Reserve Economic Data.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
        >
          Try AI Explorer
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8 text-xs text-black/30">
          Data from Bureau of Labor Statistics and Federal Reserve Economic Data.
        </div>
      </footer>
    </div>
  );
}
