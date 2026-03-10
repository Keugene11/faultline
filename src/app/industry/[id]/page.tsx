import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/data/industries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowLeft,
  Zap,
  ExternalLink,
  Lightbulb,
  Shield,
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
    description: `${industry.insights.length} data-backed fault lines in ${industry.name}. Real statistics revealing inefficiencies and startup opportunities.`,
  };
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "worsening") return <TrendingDown className="h-5 w-5 text-red-400" />;
  if (trend === "improving") return <TrendingUp className="h-5 w-5 text-green-400" />;
  return <Activity className="h-5 w-5 text-yellow-400" />;
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

function confidenceBar(confidence: number) {
  const pct = Math.round(confidence * 100);
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 95 ? "bg-green-400" : pct >= 85 ? "bg-yellow-400" : "bg-orange-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{pct}% confidence</span>
    </div>
  );
}

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) notFound();

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
            <Link href="/" className="hover:text-foreground transition-colors">
              Industries
            </Link>
            <Link href="/explore" className="hover:text-foreground transition-colors">
              AI Explorer
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          All Industries
        </Link>

        {/* Industry Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{industry.name}</h1>
          <p className="mt-1 text-muted-foreground">{industry.description}</p>
          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <div className="text-2xl font-bold">{industry.marketSize}</div>
              <div className="text-sm text-muted-foreground">Market Size</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {(industry.employmentK / 1000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Workers</div>
            </div>
            <div>
              <div
                className={`text-2xl font-bold ${industry.employmentChange.startsWith("-") ? "text-red-400" : industry.employmentChange.startsWith("+0.0") ? "text-yellow-400" : "text-green-400"}`}
              >
                {industry.employmentChange}
              </div>
              <div className="text-sm text-muted-foreground">Employment Change</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{industry.insights.length}</div>
              <div className="text-sm text-muted-foreground">Fault Lines</div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Insights */}
        <div className="space-y-6">
          {industry.insights.map((insight, idx) => (
            <Card key={insight.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-400">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={categoryColor(insight.category)}>
                        {insight.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <TrendIcon trend={insight.trend} />
                        <span className="text-sm text-muted-foreground capitalize">
                          {insight.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                  {confidenceBar(insight.confidence)}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* The Stat */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-red-400 mb-2">{insight.value}</div>
                  <p className="text-base leading-relaxed">{insight.statement}</p>
                </div>

                {/* Trend Detail */}
                <div className="mb-4 rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendIcon trend={insight.trend} />
                    <span className="text-sm font-medium">Trend Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.trendDetail}</p>
                </div>

                {/* Opportunity Signal */}
                <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-300">
                      Opportunity Signal
                    </span>
                  </div>
                  <p className="text-sm text-green-200/80">{insight.opportunitySignal}</p>
                </div>

                {/* Source */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Source: {insight.source}</span>
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                  >
                    View data <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
