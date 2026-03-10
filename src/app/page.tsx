import Link from "next/link";
import { industries } from "@/lib/data/industries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowRight,
  BarChart3,
  Sparkles,
  Users,
  DollarSign,
  Cpu,
  Target,
} from "lucide-react";

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "worsening" || trend === "decline")
    return <TrendingDown className="h-4 w-4 text-rose-500" />;
  if (trend === "improving") return <TrendingUp className="h-4 w-4 text-emerald-500" />;
  return <Activity className="h-4 w-4 text-amber-500" />;
}

function categoryStyle(cat: string) {
  const map: Record<string, string> = {
    inefficiency: "bg-rose-50 text-rose-700 border-rose-200",
    decline: "bg-orange-50 text-orange-700 border-orange-200",
    growth: "bg-emerald-50 text-emerald-700 border-emerald-200",
    squeeze: "bg-amber-50 text-amber-700 border-amber-200",
    opportunity: "bg-sky-50 text-sky-700 border-sky-200",
    structural: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return map[cat] || "bg-stone-50 text-stone-700 border-stone-200";
}

export default function Home() {
  const totalInsights = industries.reduce((sum, i) => sum + i.insights.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">faultline</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-900"
            >
              Industries
            </Link>
            <Link
              href="/explore"
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors"
            >
              AI Explorer
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-orange-50/50 to-amber-50/30" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-stone-200/60 px-4 py-1.5 text-sm text-stone-600 mb-6 shadow-sm">
              <Target className="h-3.5 w-3.5 text-rose-500" />
              Startup-sized industries you can actually tackle
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-stone-900 leading-[1.1]">
              Find the cracks
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                before they break.
              </span>
            </h1>
            <p className="mt-5 text-lg text-stone-500 leading-relaxed">
              Real BLS and FRED statistics for fragmented, low-tech industries where a
              startup can win. Every number is cited. Every opportunity is grounded in data.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { icon: BarChart3, value: `${industries.length}`, label: "Industries" },
              { icon: Sparkles, value: `${totalInsights}`, label: "Fault Lines" },
              { icon: DollarSign, value: "100%", label: "Cited" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm border border-stone-200/60">
                  <Icon className="h-5 w-5 text-stone-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">{value}</div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Fault Lines */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100">
            <TrendingDown className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">Top Fault Lines</h2>
            <p className="text-sm text-stone-400">
              Highest-confidence pain points — sorted by data quality
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          {industries
            .flatMap((ind) =>
              ind.insights.map((ins) => ({
                ...ins,
                industryName: ind.name,
                industryId: ind.id,
              }))
            )
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 6)
            .map((insight) => (
              <Link key={insight.id} href={`/industry/${insight.industryId}`}>
                <Card className="group border-stone-200/60 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200 cursor-pointer bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <Badge variant="outline" className={categoryStyle(insight.category)}>
                            {insight.category}
                          </Badge>
                          <span className="text-xs font-medium text-stone-400">
                            {insight.industryName}
                          </span>
                          <div className="flex items-center gap-1 ml-auto">
                            <TrendIcon trend={insight.trend} />
                            <span className="text-xs text-stone-400 capitalize">
                              {insight.trend}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-700">
                          {insight.statement}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-base font-bold text-rose-600">
                            {insight.value}
                          </span>
                          <span className="text-[11px] text-stone-400 truncate">
                            {insight.source}
                          </span>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4 text-stone-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      {/* Industry Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100">
            <Users className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">Startup-Ready Industries</h2>
            <p className="text-sm text-stone-400">
              Fragmented markets with low tech adoption — where you can actually win
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industry/${industry.id}`}>
              <Card className="group border-stone-200/60 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200 cursor-pointer h-full bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-stone-900 leading-tight">
                      {industry.name}
                    </h3>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-3.5 w-3.5 text-stone-400" />
                    </div>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">{industry.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-xl bg-stone-50 p-2.5">
                      <div className="text-sm font-bold text-stone-900">{industry.marketSize}</div>
                      <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        Market
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-2.5">
                      <div className="text-sm font-bold text-stone-900">
                        {industry.fragmentation.split(",")[0]}
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        Businesses
                      </div>
                    </div>
                  </div>

                  {/* Tech penetration bar */}
                  <div className="rounded-xl bg-orange-50 p-2.5 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="h-3 w-3 text-orange-500" />
                        <span className="text-[10px] font-semibold text-orange-700 uppercase tracking-wider">
                          Tech Adoption
                        </span>
                      </div>
                      <span className="text-xs font-bold text-orange-600">
                        {industry.techPenetration}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-orange-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400"
                        style={{
                          width: `${parseInt(industry.techPenetration.replace(/[^0-9]/g, "")) || 5}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2">
                    <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-700">
                      {industry.insights.length} fault line{industry.insights.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-stone-400">
          Data sourced from BLS, FRED, and Census Bureau. All statistics are cited with original sources.
        </div>
      </footer>
    </div>
  );
}
