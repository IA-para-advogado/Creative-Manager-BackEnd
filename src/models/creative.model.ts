export interface ICreative {
  id: string;
  title: string;
  status: 'active' | 'paused' | 'archived';
  ctr: number; // Click-Through Rate
  conversions: number;
  spend: number;
  revenue: number;
  image_url: string;
  created_at: string;
}

export interface IDashboardStats {
  totalSpend: number;
  totalRevenue: number;
  roi: number;
  topCreative: ICreative | null;
  aiInsights?: string;
}