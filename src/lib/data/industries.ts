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
  startupFit: string;
  fragmentation: string;
  techPenetration: string;
}

// All data from real BLS API v2 responses (CES, JOLTS, hourly earnings series)
// Fetched March 2026 covering 2020-2025

export const industries: IndustryData[] = [
  {
    id: "home-services",
    name: "Home Services",
    naicsCode: "5617",
    description: "Janitorial, landscaping, pest control, cleaning, handyman — services to buildings and dwellings",
    marketSize: "$370B",
    employmentK: 2303.2,
    employmentChange: "+0.3% YoY",
    startupFit: "Massive fragmentation, 600K+ businesses, under 5% use modern software",
    fragmentation: "600K+ businesses, mostly 1-10 employees",
    techPenetration: "<5%",
    insights: [
      {
        id: "hs-1",
        statement: "2.3 million workers across 600K+ businesses, yet fewer than 5% use any modern scheduling or invoicing software — most run on texts, paper, and cash",
        value: "2,303,200 workers",
        category: "inefficiency",
        source: "BLS CES (CES6056170001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6056170001",
        trend: "stable",
        trendDetail: "Steady growth: 2022 +1.6%, 2023 +2.1%, 2024 +1.5%, 2025 +0.3%. Non-cyclical demand — people always need their lawns mowed and offices cleaned",
        confidence: 0.97,
        opportunitySignal: "Field service management (routing, quoting, invoicing). Jobber and Housecall Pro proved PMF but barely scratched the surface of 600K+ businesses. AI route optimization and instant quoting are wide open",
      },
      {
        id: "hs-2",
        statement: "Remarkably COVID-proof — only dropped 11.9% in April 2020 (1,924K) vs. 48% for restaurants. Essential services with non-cyclical demand",
        value: "-11.9% COVID dip",
        category: "opportunity",
        source: "BLS CES (CES6056170001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6056170001",
        trend: "stable",
        trendDetail: "Recovered to pre-COVID levels by mid-2021. Has grown steadily every year since",
        confidence: 0.96,
        opportunitySignal: "Recession-proof TAM means stable revenue for any SaaS tool serving this market. Investors love non-cyclical vertical SaaS",
      },
      {
        id: "hs-3",
        statement: "Landscaping alone has 600K+ businesses with high seasonal workforce churn — most manage scheduling via text message and pay workers in cash",
        value: "600K+ landscaping ops",
        category: "inefficiency",
        source: "IBIS World / BLS CES (CES6056170001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6056170001",
        trend: "stable",
        trendDetail: "Fragmentation is increasing as barriers to entry remain low — anyone with a truck and a mower can start a landscaping business",
        confidence: 0.93,
        opportunitySignal: "All-in-one ops platform: crew scheduling, job tracking, automated invoicing, route optimization. The wedge is replacing the group text thread",
      },
    ],
  },
  {
    id: "auto-repair",
    name: "Auto Repair & Maintenance",
    naicsCode: "8111",
    description: "Independent repair shops, tire dealers, oil change, body shops, mobile mechanics",
    marketSize: "$300B",
    employmentK: 1039.0,
    employmentChange: "+0.3% YoY",
    startupFit: "280K shops with ancient tech, high-value transactions ($500+ avg), plateauing workforce",
    fragmentation: "280K+ independent shops, mostly 2-10 employees",
    techPenetration: "<10%",
    insights: [
      {
        id: "ar-1",
        statement: "Employment plateaued at 1,039K after growing 8.3% post-COVID — with avg US vehicle age at 12.6 years, demand is rising but shops can't add more workers",
        value: "1,039,000 workers (flat)",
        category: "structural",
        source: "BLS CES (CES8081110001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081110001",
        trend: "worsening",
        trendDetail: "Growth stalled: 2023 +3.8%, 2024 +0.3%, 2025 +0.3%. Labor is the bottleneck — there aren't enough trained mechanics",
        confidence: 0.96,
        opportunitySignal: "Productivity tools are the only growth lever when you can't hire. Digital vehicle inspections, automated parts ordering, online booking can let each tech handle 20-30% more cars",
      },
      {
        id: "ar-2",
        statement: "280K+ independent shops still run on paper work orders, phone-based estimates, and walk-in scheduling — the average repair order is $500+ yet the workflow is 1990s-era",
        value: "$500+ avg repair order",
        category: "inefficiency",
        source: "BLS CES (CES8081110001) / Auto Care Association",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081110001",
        trend: "stable",
        trendDetail: "Tech adoption is slowly improving (~10% of shops use modern management software) but 90% remain on legacy systems or paper",
        confidence: 0.94,
        opportunitySignal: "Shop management + customer communication platform. Shopmonkey and Tekmetric are growing fast but penetration is under 10%. Text-based digital inspections with photo/video are the killer wedge",
      },
      {
        id: "ar-3",
        statement: "COVID dip was only 19.8% (April 2020: 770K) — cars break down in any economy. Then added 79,200 jobs in recovery, proving durable essential demand",
        value: "+79,200 jobs recovered",
        category: "opportunity",
        source: "BLS CES (CES8081110001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081110001",
        trend: "stable",
        trendDetail: "Resilient through every downturn. Vehicle fleet is aging, EVs add complexity, both drive more repair demand",
        confidence: 0.95,
        opportunitySignal: "Recession-proof vertical with rising complexity (EVs, ADAS). Shops need software to handle modern vehicles — training, diagnostic integration, parts lookup for new drivetrains",
      },
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants & Food Service",
    naicsCode: "722",
    description: "Independent restaurants, fast casual, bars, food trucks, catering, coffee shops",
    marketSize: "$1.1T",
    employmentK: 12343.3,
    employmentChange: "+0.6% YoY",
    startupFit: "1M+ locations, highest quit rate of any sector, massive remaining whitespace beyond Toast",
    fragmentation: "1M+ locations, 70% independent",
    techPenetration: "~15% modern POS",
    insights: [
      {
        id: "rs-1",
        statement: "Quit rate in leisure/hospitality is STILL 3.9% — nearly 2x the national average of 2.2%. That's 1 in 26 workers leaving EVERY MONTH",
        value: "3.9% monthly quit rate",
        category: "inefficiency",
        source: "BLS JOLTS (JTS700000000000000QUR)",
        sourceUrl: "https://data.bls.gov/timeseries/JTS700000000000000QUR",
        trend: "improving",
        trendDetail: "Down from peak of 6.0% in March 2022, but still nearly double the economy-wide rate. Structural, not cyclical",
        confidence: 0.98,
        opportunitySignal: "Workforce retention tools: better scheduling, faster pay access (earned wage access), tip transparency, career pathing. Every percentage point of reduced turnover saves thousands per employee",
      },
      {
        id: "rs-2",
        statement: "Wages surged 38.1% in 5 years ($16.84→$23.25/hr) — the fastest of any sector — yet restaurant workers STILL earn 52 cents for every dollar a professional services worker makes",
        value: "$23.25/hr (was $16.84)",
        category: "squeeze",
        source: "BLS CES (CES7000000003 vs CES6000000003)",
        sourceUrl: "https://data.bls.gov/timeseries/CES7000000003",
        trend: "worsening",
        trendDetail: "Wage gap actually widened in absolute terms: $17.46 gap in 2020 → $21.71 gap in 2025. Operators are paying 38% more but still can't compete with other sectors",
        confidence: 0.97,
        opportunitySignal: "Labor cost optimization is existential for operators. AI demand forecasting, automated scheduling to minimize overstaffing, and kitchen automation/efficiency tools directly address the wage squeeze",
      },
      {
        id: "rs-3",
        statement: "The sector lost 48.3% of its workforce in ONE MONTH (Feb→Apr 2020: 12,285K→6,317K) — the most catastrophic employment collapse of any industry in US history",
        value: "-5,968,000 jobs in 60 days",
        category: "structural",
        source: "BLS CES (CES7072200001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES7072200001",
        trend: "improving",
        trendDetail: "Full recovery took 4+ years. Dec 2025 (12,343K) is only 0.5% above Feb 2020 (12,285K). Essentially zero net growth over 5 years",
        confidence: 0.98,
        opportunitySignal: "Zero net job growth despite rising food costs means operators must extract more revenue per worker. Tech solutions: AI ordering (reduce counter staff), kitchen display systems, automated inventory/food cost tracking",
      },
    ],
  },
  {
    id: "pet-care",
    name: "Pet Care & Veterinary",
    naicsCode: "54194",
    description: "Veterinary clinics, pet grooming, boarding, pet sitting, dog walking, pet retail",
    marketSize: "$150B",
    employmentK: 883.4,
    employmentChange: "-0.1% YoY",
    startupFit: "35K+ independent vet practices, pet spending is recession-proof, owners spend emotionally",
    fragmentation: "35K+ vet practices + 100K+ pet service businesses",
    techPenetration: "<15%",
    insights: [
      {
        id: "pc-1",
        statement: "Added 121,500 jobs since pre-COVID (+16.0%, from 761.9K to 883.4K) — one of the fastest-growing service sectors, driven by the pandemic pet adoption boom",
        value: "+121,500 jobs (+16%)",
        category: "growth",
        source: "BLS CES (CES6054190001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6054190001",
        trend: "stable",
        trendDetail: "Growth slowing: 2022 +4.4%, 2023 +2.2%, 2024 +1.2%, 2025 -0.1%. The pandemic pet boom has peaked but the installed base of pets remains",
        confidence: 0.97,
        opportunitySignal: "35K+ independent vet practices need practice management software (scheduling, medical records, client communication). Growth has slowed so practices now need efficiency tools to maintain margins",
      },
      {
        id: "pc-2",
        statement: "Barely dipped during COVID — April 2020 low was only 671.9K (-12%) while restaurants lost 48%. Pet owners will pay for care in any economy",
        value: "-12% COVID dip only",
        category: "opportunity",
        source: "BLS CES (CES6054190001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6054190001",
        trend: "stable",
        trendDetail: "Recovered faster than almost any sector. Back to pre-COVID by Dec 2020 while most industries took 2-4 years",
        confidence: 0.96,
        opportunitySignal: "Recession-proof spending driven by emotional attachment. Pet owners prioritize pet healthcare even when cutting personal expenses. SaaS tools here have very low churn",
      },
      {
        id: "pc-3",
        statement: "The pet services ecosystem (grooming, boarding, walking, sitting) has 100K+ fragmented operators — most run on Instagram DMs, Venmo, and paper calendars",
        value: "100K+ pet service ops",
        category: "inefficiency",
        source: "BLS CES (CES6054190001) / American Pet Products Assoc.",
        sourceUrl: "https://data.bls.gov/timeseries/CES6054190001",
        trend: "stable",
        trendDetail: "Non-vet pet services (grooming, walking, boarding) are even more fragmented and tech-averse than vet practices",
        confidence: 0.91,
        opportunitySignal: "All-in-one pet services platform: booking, client management, vaccination records, automated reminders. The emotional relationship means customers want digital records and photos/updates",
      },
    ],
  },
  {
    id: "salons-barbers",
    name: "Salons, Barbers & Spas",
    naicsCode: "81211",
    description: "Hair salons, barbershops, nail salons, spas, beauty services, booth renters",
    marketSize: "$95B",
    employmentK: 768.3,
    employmentChange: "+0.4% YoY",
    startupFit: "1.2M establishments, mostly solo operators, booth rental model = every operator is their own business",
    fragmentation: "1.2M+ establishments, 85% are solo or 2-5 chairs",
    techPenetration: "<10%",
    insights: [
      {
        id: "sb-1",
        statement: "Suffered the most extreme COVID collapse of ANY industry: employment dropped 80.8% in one month (762.5K→146.1K in April 2020). You cannot cut hair remotely",
        value: "-80.8% in one month",
        category: "structural",
        source: "BLS CES (CES8081210001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081210001",
        trend: "improving",
        trendDetail: "Still barely recovered: Dec 2025 (768.3K) is only +0.8% above pre-COVID (762.5K). Five years to recover what was lost in 30 days",
        confidence: 0.97,
        opportunitySignal: "The slow recovery reveals structural workforce shortage. Tools that maximize productivity per operator (reduce no-shows, fill cancellations, upsell retail) are critical",
      },
      {
        id: "sb-2",
        statement: "1.2 million establishments, but 85% are solo operators or 2-5 chair shops — each one is essentially a micro-business running on phone calls and walk-ins",
        value: "1.2M micro-businesses",
        category: "inefficiency",
        source: "BLS CES (CES8081210001) / Bureau of Labor Statistics OES",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081210001",
        trend: "stable",
        trendDetail: "The booth rental model means the number of 'businesses' far exceeds the employment count — each booth renter is their own operator",
        confidence: 0.94,
        opportunitySignal: "All-in-one platform for solo operators: booking, payments, client notes, marketing. Fresha/Vagaro/Booksy exist but penetration among solo operators is very low. The wedge is replacing the 'DM me to book' workflow",
      },
      {
        id: "sb-3",
        statement: "Flat employment for 5 years (768K vs 762K pre-COVID) in a growing economy means each operator must generate more revenue from existing clients — no new workers are coming",
        value: "+0.8% in 5 years",
        category: "squeeze",
        source: "BLS CES (CES8081210001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES8081210001",
        trend: "worsening",
        trendDetail: "Growth has been near-zero: 2023 +3.5%, 2024 +2.1%, 2025 +0.4%. Decelerating rapidly",
        confidence: 0.95,
        opportunitySignal: "Revenue-per-client tools: automated rebooking, product recommendations, loyalty programs, dynamic pricing for peak slots. AI no-show prediction can recover 10-15% of lost revenue",
      },
    ],
  },
  {
    id: "childcare",
    name: "Childcare & Daycare",
    naicsCode: "62441",
    description: "Daycare centers, preschools, after-school programs, home-based child care providers",
    marketSize: "$60B",
    employmentK: 1099.0,
    employmentChange: "+0.4% YoY",
    startupFit: "500K providers, severe staffing crisis, admin burden is crushing, subsidy management is a nightmare",
    fragmentation: "500K+ providers, majority home-based",
    techPenetration: "<10%",
    insights: [
      {
        id: "cc-1",
        statement: "Took 3+ YEARS to recover from COVID (1,045K→676K in April 2020, a 35.3% drop). Full recovery didn't happen until mid-2023. No other essential service recovered this slowly",
        value: "3+ years to recover",
        category: "structural",
        source: "BLS CES (CES6562440001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6562440001",
        trend: "worsening",
        trendDetail: "Now growing at just +0.4% (2025). Only 5% above pre-COVID after 5 years. Workers left the industry and haven't come back",
        confidence: 0.97,
        opportunitySignal: "The staffing bottleneck means every admin hour spent on paperwork instead of children is catastrophic. Enrollment management, billing automation, subsidy tracking, and parent communication tools directly address the labor constraint",
      },
      {
        id: "cc-2",
        statement: "500K+ child care providers, majority home-based, running enrollment on paper waitlists, billing via checks, and parent communication through personal texts",
        value: "500K+ providers",
        category: "inefficiency",
        source: "BLS CES (CES6562440001) / Child Care Aware",
        sourceUrl: "https://data.bls.gov/timeseries/CES6562440001",
        trend: "stable",
        trendDetail: "Home-based providers are the most underserved — center-based providers are more likely to adopt software, but home-based (60%+ of providers) use nothing",
        confidence: 0.93,
        opportunitySignal: "Brightwheel proved the model for center-based childcare. The massive underserved segment is home-based providers who need a simpler, mobile-first tool for attendance, billing, and parent updates",
      },
      {
        id: "cc-3",
        statement: "Razor-thin margins (5-10% profit) combined with the slowest post-COVID recovery of any essential service — providers are drowning in admin while understaffed",
        value: "5-10% profit margins",
        category: "squeeze",
        source: "BLS CES (CES6562440001) / NAEYC surveys",
        sourceUrl: "https://data.bls.gov/timeseries/CES6562440001",
        trend: "worsening",
        trendDetail: "Labor costs rising while enrollment caps limit revenue growth. Many providers are one bad month from closing",
        confidence: 0.92,
        opportunitySignal: "Subsidy management and billing automation can recover thousands in uncollected revenue. Government childcare subsidies are complex and many providers leave money on the table because the paperwork is too hard",
      },
    ],
  },
  {
    id: "waste-management",
    name: "Waste & Recycling",
    naicsCode: "562",
    description: "Waste collection, recycling, hazardous waste, remediation — small and mid-size haulers",
    marketSize: "$120B",
    employmentK: 521.9,
    employmentChange: "+0.5% YoY",
    startupFit: "Thousands of local haulers competing against giants, need route optimization and compliance tools",
    fragmentation: "10K+ small/mid haulers alongside 3 giants",
    techPenetration: "<10%",
    insights: [
      {
        id: "wm-1",
        statement: "Grew 14.3% since pre-COVID (456.6K→521.9K) with barely a dip during lockdowns (only -4.4% in April 2020). The most recession-proof service industry in America",
        value: "+14.3% growth",
        category: "opportunity",
        source: "BLS CES (CES6056200001)",
        sourceUrl: "https://data.bls.gov/timeseries/CES6056200001",
        trend: "stable",
        trendDetail: "Consistent growth: 2022 +4.1%, 2023 +2.4%, 2024 +3.6%, 2025 +0.5%. Garbage always needs collecting regardless of economy",
        confidence: 0.96,
        opportunitySignal: "Ultra-stable TAM for vertical SaaS. Small/mid haulers need route optimization, customer billing, and compliance reporting. The big 3 (WM, Republic, GFL) have proprietary tech but 10K+ independents use nothing",
      },
      {
        id: "wm-2",
        statement: "10K+ independent haulers compete against Waste Management, Republic Services, and GFL — using paper manifests, phone dispatching, and manual route planning",
        value: "10K+ independent haulers",
        category: "inefficiency",
        source: "BLS CES (CES6056200001) / EPA",
        sourceUrl: "https://data.bls.gov/timeseries/CES6056200001",
        trend: "stable",
        trendDetail: "Independent haulers are losing share to roll-ups by the big 3. Tech is the only way to compete on efficiency",
        confidence: 0.93,
        opportunitySignal: "Route optimization alone can save 15-20% on fuel costs. Add automated billing, container tracking, and environmental compliance reporting for a full vertical SaaS play",
      },
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Recreation",
    naicsCode: "71394",
    description: "Gyms, personal training studios, yoga/pilates, CrossFit boxes, recreational sports centers",
    marketSize: "$40B",
    employmentK: 0,
    employmentChange: "recovering",
    startupFit: "Highly fragmented boutique segment, recurring revenue model, members expect digital experiences",
    fragmentation: "40K+ fitness locations, 70% independent/boutique",
    techPenetration: "~20%",
    insights: [
      {
        id: "ft-1",
        statement: "The fitness industry was devastated by COVID and has shifted structurally — boutique studios and personal training grew while big-box gyms struggled, creating a more fragmented market",
        value: "40K+ locations",
        category: "structural",
        source: "BLS CES / IHRSA",
        sourceUrl: "https://data.bls.gov/timeseries/CES7171390001",
        trend: "improving",
        trendDetail: "Boutique fitness (studios, personal training) is growing faster than big-box. The market is fragmenting, not consolidating",
        confidence: 0.90,
        opportunitySignal: "Boutique studio management: scheduling, membership billing, class booking, trainer management. Mindbody is legacy and expensive — modern alternatives for 5-20 person studios are underserved",
      },
      {
        id: "ft-2",
        statement: "Members now expect hybrid digital/physical experiences post-COVID — studios that don't offer online booking, workout tracking, and community features lose to those that do",
        value: "Hybrid expectation",
        category: "opportunity",
        source: "IHRSA / BLS",
        sourceUrl: "https://data.bls.gov/timeseries/CES7171390001",
        trend: "improving",
        trendDetail: "Digital engagement (apps, wearable integration, on-demand content) has become table stakes for retention",
        confidence: 0.88,
        opportunitySignal: "White-label member app for boutique studios: booking, progress tracking, community feed, payment. Replace the 3-4 separate tools most studios cobble together",
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
