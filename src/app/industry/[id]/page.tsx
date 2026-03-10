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
    description: `${industry.insights.length} data-backed fault lines in ${industry.name}.`,
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
      <ShieldCheck className={`h-4 w-4 ${pct >= 95 ? "text-emerald-500" : pct >= 85 ? "text-amber-500" : "text-orange-500"}`} />
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

function employmentColor(change: string) {
  if (change.startsWith("-")) return "text-rose-600";
  if (change.startsWith("+0.0")) return "text-amber-600";
  return "text-emerald-600";
}

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) notFound();

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

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, value: industry.marketSize, label: "Market Size", color: "bg-emerald-50 text-emerald-600" },
              { icon: Users, value: `${(industry.employmentK / 1000).toFixed(1)}M`, label: "Workers", color: "bg-sky-50 text-sky-600" },
              { icon: BarChart3, value: industry.employmentChange, label: "YoY Change", color: "bg-stone-50", textColor: employmentColor(industry.employmentChange) },
              { icon: Sparkles, value: `${industry.insights.length}`, label: "Fault Lines", color: "bg-rose-50 text-rose-600" },
            ].map(({ icon: Icon, value, label, color, textColor }) => (
              <div key={label} className={`rounded-2xl ${color} p-4`}>
                <Icon className="h-5 w-5 mb-2 opacity-60" />
                <div className={`text-xl font-bold ${textColor || ""}`}>{value}</div>
                <div className="text-xs font-medium opacity-60 uppercase tracking-wider mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
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
                <div className="flex items-center justify-between gap-4 px-6 py-4 bg-stone-50/50 border-b border-stone-100">
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
                  <div className="mb-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent mb-2">
                      {insight.value}
                    </div>
                    <p className="text-base leading-relaxed text-stone-700">{insight.statement}</p>
                  </div>

                  {/* Trend & Opportunity cards side by side */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {/* Trend */}
                    <div className="rounded-2xl bg-stone-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendIcon trend={insight.trend} size="md" />
                        <span className="text-sm font-semibold text-stone-700">Trend</span>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {insight.trendDetail}
                      </p>
                    </div>

                    {/* Opportunity */}
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-700">Opportunity</span>
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
          Data sourced from BLS, FRED, Census Bureau, and SEC EDGAR. All statistics are cited.
        </div>
      </footer>
    </div>
  );
}
