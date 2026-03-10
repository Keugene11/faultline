import Link from "next/link";
import { industries } from "@/lib/data/industries";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  const totalInsights = industries.reduce((sum, i) => sum + i.insights.length, 0);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#FFFEFD]/90 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            faultline
          </Link>
          <Link
            href="/explore"
            className="text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            AI Explorer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-14">
        <h1 className="text-4xl font-semibold tracking-tight leading-[1.15]">
          Industries with cracks
          <br />
          worth breaking open.
        </h1>
        <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-lg">
          Real government data on fragmented, low-tech industries where a startup can win.
          {" "}{industries.length} industries. {totalInsights} fault lines. Every stat cited.
        </p>
      </section>

      {/* Top Insights */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
          Highest-confidence fault lines
        </p>
        <div className="space-y-3">
          {industries
            .flatMap((ind) =>
              ind.insights.map((ins) => ({
                ...ins,
                industryName: ind.name,
                industryId: ind.id,
              }))
            )
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 5)
            .map((insight) => (
              <Link key={insight.id} href={`/industry/${insight.industryId}`}>
                <Card className="group border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 cursor-pointer rounded-2xl shadow-none">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                          {insight.industryName}
                        </p>
                        <p className="text-[15px] leading-relaxed text-[#1A1A1A]">
                          {insight.statement}
                        </p>
                        <p className="mt-2.5 text-sm font-semibold text-[#1A1A1A]">
                          {insight.value}
                        </p>
                      </div>
                      <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* Industry List */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
          Browse industries
        </p>
        <div className="space-y-3">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industry/${industry.id}`}>
              <Card className="group border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 cursor-pointer rounded-2xl shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-[#1A1A1A]">{industry.name}</h3>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {industry.startupFit}
                  </p>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{industry.marketSize}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Market</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {industry.fragmentation.split(",")[0]}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Businesses</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {industry.techPenetration}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Tech adoption</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {industry.insights.length}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Fault lines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-4">
        <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-gray-400">
          Data from Bureau of Labor Statistics and Federal Reserve Economic Data. All statistics cited.
        </div>
      </footer>
    </div>
  );
}
