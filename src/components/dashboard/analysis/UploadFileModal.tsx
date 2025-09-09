"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Upload } from "lucide-react";
import { supabase } from "@/supabase-config/client";
import { toast, Toaster } from "sonner";
import { useCampaignFilesStore } from "@/lib/stores/analysis/CampaignFilesStore.ts";
import { getCampaignFiles } from "../../../../supabase/functions/campaigns/action.tsx";

export default function UploadFileModal() {
  const { id: campaignId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOpen = useCampaignFilesStore((state) => state.isOpen);
  const setIsOpen = useCampaignFilesStore((state) => state.setIsOpen);
  const selectedFile = useCampaignFilesStore((state) => state.selectedFile);
  const setSelectedFile = useCampaignFilesStore(
    (state) => state.setSelectedFile,
  );
  const { loadingFiles, setLoadingFiles, campaignFiles, setCampaignFiles } =
    useCampaignFilesStore();
  const uploading = useCampaignFilesStore((state) => state.uploading);
  const setUploading = useCampaignFilesStore((state) => state.setUploading);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  useEffect(() => {
    async function fetchFiles() {
      try {
        const files = await getCampaignFiles(campaignId);
        setCampaignFiles(files);
      } catch (error) {
        console.error("Error fetching files: ", error);
        toast.error("Failed to load files");
      } finally {
        setLoadingFiles(false);
      }
    }

    if (campaignId) fetchFiles();
  }, [campaignId]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const user = supabase.auth.getUser();
      const userId = (await user).data.user?.id;

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
      setIsOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload a File</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".csv,.json"
            />

            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              className="bg-[#2C82A8] hover:bg-[#3893BB] cursor-pointer"
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" /> Upload
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
