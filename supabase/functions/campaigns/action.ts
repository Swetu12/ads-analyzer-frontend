import { supabase } from "@/supabase-config/client.ts";

export async function getCampaignFiles(campaignId: string) {
  const { data, error } = await supabase
    .from("campaign_files")
    .select("*")
    .eq("campaign_id", campaignId);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
