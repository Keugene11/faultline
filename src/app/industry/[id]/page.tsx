import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/data/industries";
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
    description: `${industry.insights.length} data-backed fault lines. ${industry.startupFit}`,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = getIndustry(id);
  if (!industry) notFound();

  const techPct = parseInt(industry.techPenetration.replace(/[^0-9]/g, "")) || 5;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
        <Link href="/" className="text-base font-semibold">
          faultline
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-black/50 hover:text-black transition-colors">Industries</Link>
          <Link href="/explore" className="text-black/50 hover:text-black transition-colors">Explorer</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">{industry.name}</h1>
          <p className="text-black/50 text-lg">{industry.description}</p>
        </div>

        {/* Stats grid — Cal AI card style */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { value: industry.marketSize, label: "Market size" },
            { value: industry.employmentK > 0 ? `${(industry.employmentK / 1000).toFixed(1)}M` : "—", label: "Workers" },
            { value: industry.fragmentation.split(",")[0], label: "Businesses" },
            { value: industry.techPenetration, label: "Tech adoption" },
          ].map(({ value, label }) => (
            <div key={label} className="p-5 rounded-2xl border border-gray-200">
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-xs text-black/40 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tech penetration + startup fit */}
        <div className="grid sm:grid-cols-2 gap-3 mb-20">
          <div className="p-5 rounded-2xl border border-gray-200">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-3">Software penetration</p>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${techPct}%` }}
              />
            </div>
            <p className="text-xs text-black/40">{100 - techPct}% still run on paper or phone</p>
          </div>
          <div className="p-5 rounded-2xl border border-gray-200">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-3">Why a startup wins</p>
            <p className="text-sm leading-relaxed">{industry.startupFit}</p>
          </div>
        </div>

        {/* Fault Lines */}
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          {industry.insights.length} fault lines
        </h2>

        <div className="space-y-12">
          {industry.insights.map((insight, idx) => (
            <article key={insight.id}>
              {/* Number + category */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs font-semibold">
                  {idx + 1}
                </span>
                <span className="text-xs text-black/40 uppercase tracking-wider">
                  {insight.category}
                </span>
                <div className="flex items-center gap-1 ml-auto">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`h-1.5 w-1.5 rounded-full ${
                        dot <= Math.round(insight.confidence * 5) ? "bg-black" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* The stat */}
              <p className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                {insight.value}
              </p>
              <p className="text-base text-black/70 leading-relaxed mb-6">
                {insight.statement}
              </p>

              {/* Trend + Opportunity — two cards side by side */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="p-5 rounded-2xl bg-gray-50">
                  <p className="text-xs text-black/40 uppercase tracking-wider mb-2">Trend</p>
                  <p className="text-sm text-black/70 leading-relaxed">{insight.trendDetail}</p>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50">
                  <p className="text-xs text-black/40 uppercase tracking-wider mb-2">Opportunity</p>
                  <p className="text-sm text-black/70 leading-relaxed">{insight.opportunitySignal}</p>
                </div>
              </div>

              {/* Source */}
              <p className="text-xs text-black/30">
                {insight.source}
                {" · "}
                <a
                  href={insight.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/50 hover:text-black inline-flex items-center gap-1 transition-colors"
                >
                  View data <ExternalLink className="h-3 w-3" />
                </a>
              </p>

              {/* Divider */}
              {idx < industry.insights.length - 1 && (
                <div className="border-t border-gray-100 mt-12" />
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Dark CTA section — Hinge style */}
      <section className="bg-black text-white mt-24">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">
            Explore more industries
          </h2>
          <p className="text-white/50 mb-8">
            Or ask the AI explorer about any of the data.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              All industries
            </Link>
            <Link
              href="/explore"
              className="border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              AI Explorer
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-8 text-xs text-black/30">
          Data from Bureau of Labor Statistics and Federal Reserve Economic Data.
        </div>
      </footer>
    </div>
  );
}
