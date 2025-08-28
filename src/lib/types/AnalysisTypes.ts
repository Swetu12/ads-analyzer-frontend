type DateRange = { from?: Date; to?: Date };

export interface CampaignStore {
  name: string;
  goal: number;
  date: DateRange;
  setName: (name: string) => void;
  setGoal: (goal: number) => void;
  setDate: (date: DateRange) => void;
}

interface Campaign {
  id: string;
  user_id: string;
  name: string;
  goal: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface CampaignGlobalStore {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Campaign) => void;
}
