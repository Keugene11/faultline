import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/data/industries";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return industries.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) return {};
  return {
    title: `${industry.name} — Faultline`,
    description: `${industry.insights.length} data-backed fault lines in ${industry.name}. ${industry.startupFit}`,
  };
}

function ConfidenceDots({ confidence }: { confidence: number }) {
  const filled = Math.round(confidence * 5);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= filled ? "bg-[#1A1A1A]" : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) notFound();

  const techPct = parseInt(industry.techPenetration.replace(/[^0-9]/g, "")) || 5;

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

      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1A1A1A] transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mb-2">
            {industry.name}
          </h1>
          <p className="text-gray-500 leading-relaxed">{industry.description}</p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: industry.marketSize, label: "Market size" },
              {
                value:
                  industry.employmentK > 0
                    ? `${(industry.employmentK / 1000).toFixed(1)}M`
                    : "—",
                label: "Workers",
              },
              { value: industry.fragmentation.split(",")[0], label: "Businesses" },
              { value: industry.techPenetration, label: "Tech adoption" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-gray-200 p-4">
                <p className="text-lg font-semibold text-[#1A1A1A]">{value}</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          {/* Tech bar + startup fit */}
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-3">
                Software penetration
              </p>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1A1A1A] transition-all duration-500"
                  style={{ width: `${techPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {100 - techPct}% still use paper, phone, or nothing
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-3">
                Why a startup can win
              </p>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">{industry.startupFit}</p>
            </div>
          </div>
        </div>

        {/* Fault Lines */}
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
          {industry.insights.length} fault line{industry.insights.length !== 1 ? "s" : ""}
        </p>

        <div className="space-y-4">
          {industry.insights.map((insight, idx) => (
            <Card
              key={insight.id}
              className="border-gray-200 rounded-2xl shadow-none overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Header row */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-500">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {insight.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">confidence</span>
                    <ConfidenceDots confidence={insight.confidence} />
                  </div>
                </div>

                {/* Main content */}
                <div className="px-6 pb-6">
                  <p className="text-2xl font-semibold text-[#1A1A1A] mb-2">{insight.value}</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                    {insight.statement}
                  </p>

                  {/* Trend + Opportunity */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
                        Trend
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {insight.trendDetail}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
                        Opportunity
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {insight.opportunitySignal}
                      </p>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                    <span>{insight.source}</span>
                    <a
                      href={insight.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1A1A1A] hover:underline"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-gray-400">
          Data from Bureau of Labor Statistics and Federal Reserve Economic Data. All statistics cited.
        </div>
      </footer>
    </div>
  );
}
