import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/data/industries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
  DollarSign,
  BarChart3,
  Cpu,
  Target,
} from "lucide-react";

export function generateStaticParams() {
  return industries.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) return {};
  return {
    title: `${industry.name} — Faultline`,
    description: `${industry.insights.length} data-backed fault lines in ${industry.name}. Fragmentation: ${industry.fragmentation}. Tech adoption: ${industry.techPenetration}.`,
  };
}

function TrendIcon({ trend, size = "sm" }: { trend: string; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-5 w-5" : "h-4 w-4";
  if (trend === "worsening") return <TrendingDown className={`${cls} text-rose-500`} />;
  if (trend === "improving") return <TrendingUp className={`${cls} text-emerald-500`} />;
  return <Activity className={`${cls} text-amber-500`} />;
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

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck
        className={`h-4 w-4 ${pct >= 95 ? "text-emerald-500" : pct >= 85 ? "text-amber-500" : "text-orange-500"}`}
      />
      <div className="h-2 w-24 rounded-full bg-stone-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${pct >= 95 ? "bg-emerald-400" : pct >= 85 ? "bg-amber-400" : "bg-orange-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-stone-400">{pct}%</span>
    </div>
  );
}

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) notFound();

  const techPct = parseInt(industry.techPenetration.replace(/[^0-9]/g, "")) || 5;

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
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors"
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

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All Industries
        </Link>

        {/* Industry Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">{industry.name}</h1>
          <p className="mt-1.5 text-stone-400">{industry.description}</p>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
              <div className="text-xl font-bold text-emerald-700">{industry.marketSize}</div>
              <div className="text-[10px] text-emerald-600/60 font-medium uppercase tracking-wider mt-0.5">
                Market Size
              </div>
            </div>
            <div className="rounded-2xl bg-sky-50 p-4">
              <Users className="h-5 w-5 text-sky-500 mb-2" />
              <div className="text-xl font-bold text-sky-700">
                {industry.employmentK > 0
                  ? `${(industry.employmentK / 1000).toFixed(1)}M`
                  : "N/A"}
              </div>
              <div className="text-[10px] text-sky-600/60 font-medium uppercase tracking-wider mt-0.5">
                Workers
              </div>
            </div>
            <div className="rounded-2xl bg-violet-50 p-4">
              <BarChart3 className="h-5 w-5 text-violet-500 mb-2" />
              <div className="text-xl font-bold text-violet-700">
                {industry.fragmentation.split(",")[0]}
              </div>
              <div className="text-[10px] text-violet-600/60 font-medium uppercase tracking-wider mt-0.5">
                Businesses
              </div>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4">
              <Sparkles className="h-5 w-5 text-rose-500 mb-2" />
              <div className="text-xl font-bold text-rose-700">{industry.insights.length}</div>
              <div className="text-[10px] text-rose-600/60 font-medium uppercase tracking-wider mt-0.5">
                Fault Lines
              </div>
            </div>
          </div>

          {/* Startup Fit Card */}
          <Card className="mt-4 border-stone-200/60 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                      Tech Adoption
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {industry.techPenetration}
                  </div>
                  <div className="h-2 w-full rounded-full bg-orange-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400"
                      style={{ width: `${techPct}%` }}
                    />
                  </div>
                  <p className="text-xs text-orange-600/60 mt-2">
                    {100 - techPct}% of businesses still use paper, phone, or nothing
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      Startup Fit
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    {industry.startupFit}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="space-y-5">
          {industry.insights.map((insight, idx) => (
            <Card
              key={insight.id}
              className="border-stone-200/60 shadow-sm bg-white overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-stone-50/50 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-bold text-white shadow-sm">
                      {idx + 1}
                    </div>
                    <Badge variant="outline" className={categoryStyle(insight.category)}>
                      {insight.category}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <TrendIcon trend={insight.trend} />
                      <span className="text-sm font-medium text-stone-500 capitalize">
                        {insight.trend}
                      </span>
                    </div>
                  </div>
                  <ConfidenceBar confidence={insight.confidence} />
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                  {/* The Big Number */}
                  <div className="mb-5">
                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent mb-2">
                      {insight.value}
                    </div>
                    <p className="text-base leading-relaxed text-stone-700">{insight.statement}</p>
                  </div>

                  {/* Trend & Opportunity */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="rounded-2xl bg-stone-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendIcon trend={insight.trend} size="md" />
                        <span className="text-sm font-semibold text-stone-700">Trend</span>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {insight.trendDetail}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-700">
                          Startup Opportunity
                        </span>
                      </div>
                      <p className="text-sm text-emerald-600 leading-relaxed">
                        {insight.opportunitySignal}
                      </p>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span className="font-medium">Source:</span>
                    <span>{insight.source}</span>
                    <a
                      href={insight.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      View data <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 mt-16 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-stone-400">
          Data sourced from BLS, FRED, and Census Bureau. All statistics are cited with original sources.
        </div>
      </footer>
    </div>
  );
}
