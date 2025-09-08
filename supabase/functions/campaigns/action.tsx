import { supabase } from "@/supabase-config/client.ts";
import { pdf } from "@react-pdf/renderer";
import { AnalysisPDF } from "@/components/AnalysisPdf.tsx";
import { saveAs } from "file-saver";

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

export const handleExportPDF = async () => {
  try {
    const blob = await pdf(<AnalysisPDF />).toBlob();
    saveAs(blob, "analysis_report.pdf");
  } catch (error) {
    console.error("Error exporting PDF:", error);
  }
};
