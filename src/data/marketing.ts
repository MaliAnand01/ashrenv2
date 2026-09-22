export interface MetaCampaign {
  id: string;
  name: string;
  objective: "CONVERSIONS" | "CATALOG_SALES" | "AWARENESS" | "TRAFFIC";
  status: "ACTIVE" | "PAUSED" | "LEARNING";
  spend: number;
  revenue: number;
  roas: number;
  reach: string;
  impressions: string;
  ctr: string;
  conversions: number;
  cpc: number;
  dailyBudget: number;
}

export const INITIAL_META_CAMPAIGNS: MetaCampaign[] = [
  {
    id: "camp-01",
    name: "Summer Luxury Aerial — Phantom 4K Launch",
    objective: "CATALOG_SALES",
    status: "ACTIVE",
    spend: 48200,
    revenue: 218000,
    roas: 4.52,
    reach: "384.2K",
    impressions: "620.5K",
    ctr: "3.42%",
    conversions: 24,
    cpc: 8.4,
    dailyBudget: 5000,
  },
  {
    id: "camp-02",
    name: "Royal Heritage Kundan Jewellery — Bridal Wholesalers",
    objective: "CONVERSIONS",
    status: "ACTIVE",
    spend: 62500,
    revenue: 387500,
    roas: 6.2,
    reach: "192.4K",
    impressions: "310.8K",
    ctr: "2.88%",
    conversions: 18,
    cpc: 12.1,
    dailyBudget: 6000,
  },
  {
    id: "camp-03",
    name: "Titan-Pro Esports Controller — Creator Retargeting",
    objective: "TRAFFIC",
    status: "ACTIVE",
    spend: 29400,
    revenue: 114600,
    roas: 3.9,
    reach: "510.0K",
    impressions: "890.2K",
    ctr: "4.15%",
    conversions: 42,
    cpc: 6.2,
    dailyBudget: 3500,
  },
  {
    id: "camp-04",
    name: "Monsoon Sanctuary — Apex ANC Acoustic Series",
    objective: "CATALOG_SALES",
    status: "LEARNING",
    spend: 18900,
    revenue: 69930,
    roas: 3.7,
    reach: "145.0K",
    impressions: "220.1K",
    ctr: "3.10%",
    conversions: 11,
    cpc: 9.8,
    dailyBudget: 4000,
  },
];
