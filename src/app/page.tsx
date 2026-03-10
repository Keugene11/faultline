import Link from "next/link";
import { industries } from "@/lib/data/industries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowRight,
  Zap,
  BarChart3,
  Search,
} from "lucide-react";

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "worsening" || trend === "decline")
    return <TrendingDown className="h-4 w-4 text-red-400" />;
  if (trend === "improving") return <TrendingUp className="h-4 w-4 text-green-400" />;
  return <Activity className="h-4 w-4 text-yellow-400" />;
}

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    inefficiency: "bg-red-500/20 text-red-300 border-red-500/30",
    decline: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    growth: "bg-green-500/20 text-green-300 border-green-500/30",
    squeeze: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    opportunity: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    structural: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };
  return map[cat] || "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
}

export default function Home() {
  const totalInsights = industries.reduce((sum, i) => sum + i.insights.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-400" />
            <span className="text-xl font-bold tracking-tight">Faultline</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="text-foreground">
              Industries
            </Link>
            <Link href="/explore" className="hover:text-foreground transition-colors">
              AI Explorer
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-red-950/20 to-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find the fault lines
            <br />
            <span className="text-red-400">in every industry.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Real government statistics that reveal inefficiencies, pain points, and startup
            opportunities. Every number is cited. Every trend is tracked. Like Uber&apos;s pitch
            deck, but for every industry.
          </p>
          <div className="mt-8 flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{industries.length}</div>
              <div className="text-sm text-muted-foreground">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalInsights}</div>
              <div className="text-sm text-muted-foreground">Fault Lines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Cited Sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Fault Lines */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 className="h-5 w-5 text-red-400" />
            <h2 className="text-2xl font-bold">Top Fault Lines</h2>
            <span className="text-sm text-muted-foreground ml-2">
              Highest-confidence data-backed pain points
            </span>
          </div>
          <div className="grid gap-4">
            {industries
              .flatMap((ind) =>
                ind.insights.map((ins) => ({ ...ins, industryName: ind.name, industryId: ind.id }))
              )
              .sort((a, b) => b.confidence - a.confidence)
              .slice(0, 5)
              .map((insight) => (
                <Link key={insight.id} href={`/industry/${insight.industryId}`}>
                  <Card className="group hover:border-red-500/30 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={categoryColor(insight.category)}
                            >
                              {insight.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {insight.industryName}
                            </span>
                            <div className="flex items-center gap-1 ml-auto">
                              <TrendIcon trend={insight.trend} />
                              <span className="text-xs text-muted-foreground">
                                {insight.trend}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed">{insight.statement}</p>
                          <div className="mt-3 flex items-center gap-4">
                            <span className="text-lg font-bold text-red-400">
                              {insight.value}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Source: {insight.source}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-2 mb-8">
            <Search className="h-5 w-5 text-red-400" />
            <h2 className="text-2xl font-bold">Browse Industries</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link key={industry.id} href={`/industry/${industry.id}`}>
                <Card className="group hover:border-red-500/30 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{industry.name}</CardTitle>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      NAICS {industry.naicsCode}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <div className="text-sm font-semibold">{industry.marketSize}</div>
                        <div className="text-xs text-muted-foreground">Market</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          {(industry.employmentK / 1000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">Workers</div>
                      </div>
                      <div>
                        <div
                          className={`text-sm font-semibold ${industry.employmentChange.startsWith("-") ? "text-red-400" : industry.employmentChange.startsWith("+0.0") ? "text-yellow-400" : "text-green-400"}`}
                        >
                          {industry.employmentChange}
                        </div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-sm font-medium">
                        {industry.insights.length} fault lines
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          Data sourced from BLS, FRED, Census Bureau, and SEC EDGAR. All statistics are cited with
          original sources.
        </div>
      </footer>
    </div>
  );
}
