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
  Search,
  Sparkles,
  Users,
  DollarSign,
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

function employmentColor(change: string) {
  if (change.startsWith("-")) return "text-rose-600";
  if (change.startsWith("+0.0")) return "text-amber-600";
  return "text-emerald-600";
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
            <h1 className="text-5xl font-bold tracking-tight text-stone-900 leading-[1.1]">
              Find the cracks
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                before they break.
              </span>
            </h1>
            <p className="mt-5 text-lg text-stone-500 leading-relaxed">
              Real government statistics that reveal industry inefficiencies and startup
              opportunities. Every number cited. Every trend tracked.
            </p>
          </div>
          <div className="mt-10 flex gap-8">
            {[
              { icon: BarChart3, value: `${industries.length}`, label: "Industries" },
              { icon: Search, value: `${totalInsights}`, label: "Fault Lines" },
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
            <p className="text-sm text-stone-400">Highest-confidence pain points across all industries</p>
          </div>
        </div>
        <div className="grid gap-3">
          {industries
            .flatMap((ind) =>
              ind.insights.map((ins) => ({ ...ins, industryName: ind.name, industryId: ind.id }))
            )
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 5)
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
            <h2 className="text-xl font-bold text-stone-900">Browse Industries</h2>
            <p className="text-sm text-stone-400">Explore fault lines by sector</p>
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
                  <p className="text-xs text-stone-400">NAICS {industry.naicsCode}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="rounded-xl bg-stone-50 p-2.5 text-center">
                      <div className="text-sm font-bold text-stone-900">{industry.marketSize}</div>
                      <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        Market
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-2.5 text-center">
                      <div className="text-sm font-bold text-stone-900">
                        {(industry.employmentK / 1000).toFixed(1)}M
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        Workers
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-2.5 text-center">
                      <div className={`text-sm font-bold ${employmentColor(industry.employmentChange)}`}>
                        {industry.employmentChange}
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        Growth
                      </div>
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
          Data sourced from BLS, FRED, Census Bureau, and SEC EDGAR. All statistics are cited.
        </div>
      </footer>
    </div>
  );
}
