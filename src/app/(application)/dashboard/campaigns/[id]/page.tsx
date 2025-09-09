"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/supabase-config/client";
import { toast, Toaster } from "sonner";
import UploadFileModal from "@/components/dashboard/analysis/UploadFileModal";
import { getCampaignFiles } from "../../../../../../supabase/functions/campaigns/action";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useCampaignFilesStore } from "@/lib/stores/analysis/CampaignFilesStore.ts";

const Page = () => {
  const { id: campaignId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { campaignFiles, setCampaignFiles, loadingFiles, setLoadingFiles } =
    useCampaignFilesStore();

  useEffect(() => {
    async function fetchFiles() {
      try {
        const files = await getCampaignFiles(campaignId);
        setCampaignFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
        toast.error("Failed to load files");
      } finally {
        setLoadingFiles(false);
      }
    }
    if (campaignId) fetchFiles();
  }, [campaignId]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) {
        toast.error("User not found");
        return;
      }

      const filePath = `${userId}/${campaignId}/${Date.now()}-${selectedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-files")
        .upload(filePath, selectedFile);

      if (uploadError) {
        toast.error(uploadError.message);
        return;
      }

      const { error: dbError } = await supabase.from("campaign_files").insert([
        {
          campaign_id: campaignId,
          user_id: userId,
          file_path: filePath,
          file_name: selectedFile.name,
        },
      ]);

      if (dbError) {
        toast.error(dbError.message);
        return;
      }

      const toastId = toast.loading("Running analysis...");

      setTimeout(async () => {
        toast.success("Analysis Complete!", { id: toastId });
        const files = await getCampaignFiles(campaignId);
        setCampaignFiles(files);
      }, 5000);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 min-h-full">
      <Toaster position="top-right" richColors />

      {loadingFiles ? (
        <p className="text-slate-400">Loading files...</p>
      ) : campaignFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          <p className="text-slate-300 text-lg font-medium">
            No files uploaded yet
          </p>
          <Button
            onClick={handleButtonClick}
            size="lg"
            className="bg-[#2C82A8] hover:bg-[#3893BB] cursor-pointer text-primary-foreground"
          >
            <Plus className="w-6 h-6 mr-2" />
            Upload File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".csv,.json"
          />
          {selectedFile && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-slate-400">
                Selected: {selectedFile.name}
              </p>
              <Button
                onClick={handleUpload}
                size="sm"
                disabled={uploading}
                className="bg-[#2C82A8] hover:bg-[#3893BB] cursor-pointer"
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {campaignFiles.map((file) => (
            <Link
              href={`/dashboard/campaigns/${campaignId}/dashboard`}
              key={file.id}
            >
              <Card className="p-6 h-40 analysis-card-background-color border-slate-700/50 hover:bg-slate-800/95 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-lg text-slate-100 truncate group-hover:text-blue-300 transition-colors leading-tight">
                        {file.file_name}
                      </h3>
                      <div className="w-3 h-3 bg-blue-500/60 rounded-full group-hover:bg-blue-400 transition-colors shadow-sm"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-slate-400">Click to analyze</span>
                    <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span>View File</span>
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <UploadFileModal />
    </div>
  );
};

export default Page;
