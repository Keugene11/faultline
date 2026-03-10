export interface Insight {
  id: string;
  statement: string;
  value: string;
  category: "inefficiency" | "decline" | "growth" | "squeeze" | "opportunity" | "structural";
  source: string;
  sourceUrl: string;
  trend: "worsening" | "improving" | "stable" | "volatile";
  trendDetail: string;
  confidence: number;
  opportunitySignal: string;
}

export interface IndustryData {
  id: string;
  name: string;
  naicsCode: string;
  description: string;
  marketSize: string;
  employmentK: number;
  employmentChange: string;
  insights: Insight[];
  color: string;
}

// All data below is from real BLS/FRED API responses (CES, JOLTS, CPI, PPI, Productivity series)
// Data retrieved March 2026 covering 2020-2025

export const industries: IndustryData[] = [
  {
    id: "healthcare",
    name: "Healthcare & Social Assistance",
    naicsCode: "62",
    description: "Hospitals, physician offices, nursing facilities, home health, social assistance",
    marketSize: "$4.5T",
    employmentK: 23587.5,
    employmentChange: "+3.0% YoY",
    color: "hsl(142, 76%, 36%)",
    insights: [
      {
        id: "hc-1",
        statement: "Healthcare added 2,863K jobs since pre-COVID — a 17.4% increase — while the overall economy grew only 4.2%",
        value: "+2,863,000 jobs",
        category: "growth",
        source: "BLS Current Employment Statistics (CES6562000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6562000001",
        trend: "worsening",
        trendDetail: "Growing 3-5x faster than overall nonfarm employment. Dec 2024: +4.0% YoY, Dec 2025: +3.0% YoY",
        confidence: 0.98,
        opportunitySignal: "Massive labor demand = opportunities in healthcare staffing automation, AI-assisted diagnostics to reduce physician burden, remote patient monitoring to extend care capacity",
      },
      {
        id: "hc-2",
        statement: "Per-capita healthcare spending surged 10.0% in a single year (2020→2021), from $8,451 to $9,299",
        value: "$9,299 per capita",
        category: "inefficiency",
        source: "FRED Health Consumption Expenditures (HLTHSCPCHCSA)",
        sourceUrl: "https://fred.stlouisfed.org/series/HLTHSCPCHCSA",
        trend: "worsening",
        trendDetail: "Spending growth consistently outpaces inflation and wage growth",
        confidence: 0.95,
        opportunitySignal: "Cost containment tools, price transparency platforms, preventive care tech that reduces downstream spending",
      },
      {
        id: "hc-3",
        statement: "Healthcare is absorbing a disproportionate share of ALL new jobs — sector grew 3.0% while total nonfarm grew just 0.07% in 2025",
        value: "3.0% vs 0.07%",
        category: "structural",
        source: "BLS CES (CES6562000001 vs CES0000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6562000001",
        trend: "worsening",
        trendDetail: "The gap between healthcare growth and economy-wide growth has been widening since 2022",
        confidence: 0.97,
        opportunitySignal: "The sector is a 'labor vacuum' — AI and automation solutions that multiply healthcare worker productivity have enormous TAM",
      },
    ],
  },
  {
    id: "trucking",
    name: "Truck Transportation",
    naicsCode: "484",
    description: "General freight, specialized freight, long-haul, local trucking",
    marketSize: "$940B",
    employmentK: 1467.2,
    employmentChange: "-1.8% YoY",
    color: "hsl(25, 95%, 53%)",
    insights: [
      {
        id: "tr-1",
        statement: "Trucking employment fell to 1,467K in Dec 2025 — now 48,600 jobs BELOW pre-COVID levels (Jan 2020: 1,515.8K) despite e-commerce growth",
        value: "-48,600 jobs vs pre-COVID",
        category: "decline",
        source: "FRED Truck Transportation Employment (CES4348400001)",
        sourceUrl: "https://fred.stlouisfed.org/series/CES4348400001",
        trend: "worsening",
        trendDetail: "3+ consecutive years of decline: Dec 2023 -3.3%, Dec 2024 -2.7%, Dec 2025 -1.8%",
        confidence: 0.97,
        opportunitySignal: "Freight recession + automation pressure = opportunity for AI-driven logistics optimization, load matching platforms, autonomous trucking middleware",
      },
      {
        id: "tr-2",
        statement: "The 'truck driver shortage' narrative persists despite falling employment — the real problem is margin compression making the job unattractive",
        value: "Peak→Now: -120,300 jobs",
        category: "structural",
        source: "BLS CES (CES4348400001), peak June 2022 at 1,587.5K",
        sourceUrl: "https://data.bls.gov/timeseries/CES4348400001",
        trend: "worsening",
        trendDetail: "Employment peaked mid-2022 at 1,587.5K and has declined every year since. Lost 7.6% of workforce in 3 years",
        confidence: 0.93,
        opportunitySignal: "Driver retention platforms, dynamic compensation tools, fleet management software that reduces empty miles",
      },
      {
        id: "tr-3",
        statement: "Broader Transportation & Warehousing (6,555K) is below its Dec 2022 level (6,607K) — the entire logistics sector has stalled",
        value: "6,555K vs 6,607K",
        category: "decline",
        source: "BLS CES (CES4300000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES4300000001",
        trend: "worsening",
        trendDetail: "Dec 2023: -0.7%, Dec 2025: -1.6% year-over-year",
        confidence: 0.96,
        opportunitySignal: "Supply chain optimization, warehouse automation, last-mile delivery innovation",
      },
    ],
  },
  {
    id: "retail",
    name: "Retail Trade",
    naicsCode: "44-45",
    description: "General merchandise, food/beverage, motor vehicles, apparel, e-commerce",
    marketSize: "$7.2T",
    employmentK: 15413.5,
    employmentChange: "-0.3% YoY",
    color: "hsl(280, 68%, 50%)",
    insights: [
      {
        id: "rt-1",
        statement: "Retail employment is now BELOW pre-COVID levels — Dec 2025: 15,413K vs Jan 2020: 15,513K — a net loss of 99,000 jobs over 6 years",
        value: "-99,000 jobs",
        category: "decline",
        source: "BLS CES (CES4200000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES4200000001",
        trend: "worsening",
        trendDetail: "Peaked early 2023 at ~15,600K. Now in 2+ years of consecutive decline",
        confidence: 0.97,
        opportunitySignal: "Brick-and-mortar contraction creates opportunity for tech-enabled retail (automated checkout, experiential retail, omnichannel platforms)",
      },
      {
        id: "rt-2",
        statement: "Retail shed 90,800 jobs in 2024 alone (-0.6%) — the steepest single-year decline since the COVID crash",
        value: "-90,800 in 2024",
        category: "decline",
        source: "BLS CES (CES4200000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES4200000001",
        trend: "worsening",
        trendDetail: "Dec 2022: +0.7%, Dec 2023: +0.1%, Dec 2024: -0.6%, Dec 2025: -0.3%",
        confidence: 0.96,
        opportunitySignal: "E-commerce migration accelerating — tools for digital transformation of physical retailers, AI merchandising, demand forecasting",
      },
    ],
  },
  {
    id: "construction",
    name: "Construction",
    naicsCode: "23",
    description: "Building construction, heavy/civil engineering, specialty trades",
    marketSize: "$2.1T",
    employmentK: 8272,
    employmentChange: "-0.05% YoY",
    color: "hsl(45, 93%, 47%)",
    insights: [
      {
        id: "cn-1",
        statement: "Construction employment flatlined in 2025 (-0.05%) despite $1.2T in federal infrastructure spending (IIJA + IRA) — severe skilled labor shortage is the bottleneck",
        value: "8,272K (flat)",
        category: "structural",
        source: "BLS CES (CES2000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES2000000001",
        trend: "worsening",
        trendDetail: "Growth decelerated sharply: 2022 +3.8%, 2023 +2.7%, 2024 +2.2%, 2025 -0.05%",
        confidence: 0.96,
        opportunitySignal: "Construction tech (modular building, 3D printing, robotics), skilled trades training platforms, project management AI",
      },
      {
        id: "cn-2",
        statement: "Employment is 9.2% above pre-COVID (7,575K→8,272K) but growth has completely stalled — infrastructure money can't be deployed without workers",
        value: "+697K jobs, 0% growth",
        category: "inefficiency",
        source: "BLS CES (CES2000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES2000000001",
        trend: "worsening",
        trendDetail: "The gap between authorized infrastructure spending and actual deployment capacity is growing",
        confidence: 0.94,
        opportunitySignal: "Massive government spending that can't find workers = opportunity for labor-multiplying technology, prefab, and workforce development",
      },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    naicsCode: "31-33",
    description: "Durable goods, non-durable goods, food, chemicals, machinery, electronics",
    marketSize: "$2.9T",
    employmentK: 12580,
    employmentChange: "-0.9% YoY",
    color: "hsl(200, 80%, 50%)",
    insights: [
      {
        id: "mf-1",
        statement: "Manufacturing is STILL 165,000 jobs below pre-COVID (12,745K→12,580K) after 6 years — reshoring rhetoric is not translating to jobs",
        value: "-165,000 vs pre-COVID",
        category: "decline",
        source: "BLS CES (CES3000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES3000000001",
        trend: "worsening",
        trendDetail: "3 consecutive years of decline: 2023 -0.2%, 2024 -1.4%, 2025 -0.9%",
        confidence: 0.97,
        opportunitySignal: "Automation is absorbing tasks faster than reshoring creates them — industrial robotics, smart factory software, quality inspection AI",
      },
      {
        id: "mf-2",
        statement: "Manufacturing employment peaked at 12,895K in late 2022, then shed 315K jobs in 3 years — a 2.4% contraction during economic expansion",
        value: "-315,000 from peak",
        category: "structural",
        source: "BLS CES (CES3000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES3000000001",
        trend: "worsening",
        trendDetail: "Declining while GDP grew 5.6% — manufacturing is decoupling from economic growth",
        confidence: 0.95,
        opportunitySignal: "The gap between economic growth and manufacturing employment = productivity tech, process automation, AI-driven supply chain management",
      },
    ],
  },
  {
    id: "labor-market",
    name: "US Labor Market (Cross-Industry)",
    naicsCode: "00",
    description: "Economy-wide employment trends, wages, productivity, mobility",
    marketSize: "$31.5T GDP",
    employmentK: 158432,
    employmentChange: "+0.07% YoY",
    color: "hsl(350, 80%, 50%)",
    insights: [
      {
        id: "lm-1",
        statement: "Real wages grew only 0.6%/year over the last 6 years — nominal wages up 30.2% ($28.43→$37.02) but CPI inflation ate 25.6%",
        value: "0.6%/year real growth",
        category: "squeeze",
        source: "BLS CES (CES0500000003) + CPI (CUUR0000SA0)",
        sourceUrl: "https://data.bls.gov/timeseries/CES0500000003",
        trend: "stable",
        trendDetail: "Nominal wage growth: 2023 +4.1%, 2024 +4.1%, 2025 +3.7%. CPI: 2023 +3.4%, 2024 +2.9%, 2025 +2.7%",
        confidence: 0.98,
        opportunitySignal: "Workers feeling squeezed = demand for financial wellness tools, salary benchmarking, benefits optimization, side-income platforms",
      },
      {
        id: "lm-2",
        statement: "The 'Big Stay': monthly quits fell 29% from Great Resignation peak (4,491K→3,204K) — now BELOW pre-COVID levels (3,563K in Jan 2020)",
        value: "3,204K quits/month",
        category: "structural",
        source: "BLS JOLTS (JTS000000000000000QUL)",
        sourceUrl: "https://data.bls.gov/timeseries/JTS000000000000000QUL",
        trend: "worsening",
        trendDetail: "Workers staying put despite dissatisfaction — reduced labor mobility signals talent misallocation",
        confidence: 0.96,
        opportunitySignal: "Internal mobility platforms, reskilling marketplaces, 'quiet hiring' tools, employee engagement tech",
      },
      {
        id: "lm-3",
        statement: "Job growth decelerated from +5.1% (2021) to +0.07% (2025) — the labor market is effectively frozen",
        value: "+0.07% in 2025",
        category: "structural",
        source: "BLS CES (CES0000000001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES0000000001",
        trend: "worsening",
        trendDetail: "2021: +5.1%, 2022: +3.0%, 2023: +1.6%, 2024: +0.9%, 2025: +0.07%",
        confidence: 0.98,
        opportunitySignal: "Near-zero job growth with persistent inflation = productivity imperative. Companies MUST do more with existing headcount — AI copilots, workflow automation, process optimization",
      },
      {
        id: "lm-4",
        statement: "Labor productivity swung wildly — from -4.9% (Q1 2022) to +5.2% (Q3 2025) — companies cannot reliably forecast output per worker",
        value: "-4.9% to +5.2% range",
        category: "inefficiency",
        source: "BLS Labor Productivity (PRS85006092)",
        sourceUrl: "https://data.bls.gov/timeseries/PRS85006092",
        trend: "volatile",
        trendDetail: "2022 saw back-to-back negative quarters (-4.9%, -2.9%). 2023-2025 averaged +3.0% but with high variance",
        confidence: 0.95,
        opportunitySignal: "Workforce analytics, capacity planning tools, demand forecasting — anything that reduces output uncertainty",
      },
      {
        id: "lm-5",
        statement: "GDP grew 44.7% nominally since Q1 2020 ($21.75T→$31.49T) while employment grew only 4.2% — output per worker is rising, but workers aren't capturing the gains",
        value: "44.7% GDP vs 4.2% jobs",
        category: "structural",
        source: "FRED GDP + BLS CES (CES0000000001)",
        sourceUrl: "https://fred.stlouisfed.org/series/GDP",
        trend: "worsening",
        trendDetail: "The gap between GDP growth and employment growth has been widening every year since 2021",
        confidence: 0.96,
        opportunitySignal: "Growing inequality + productivity gains not shared = demand for profit-sharing platforms, equity compensation tools, worker ownership models",
      },
    ],
  },
];

export function getIndustry(id: string): IndustryData | undefined {
  return industries.find((i) => i.id === id);
}

export function getAllInsights(): (Insight & { industryId: string; industryName: string })[] {
  return industries.flatMap((industry) =>
    industry.insights.map((insight) => ({
      ...insight,
      industryId: industry.id,
      industryName: industry.name,
    }))
  );
}

export function getInsightsByCategory(category: Insight["category"]) {
  return getAllInsights().filter((i) => i.category === category);
}
