"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { supabase } from "@/supabase-config/client.ts";
import { toast, Toaster } from "sonner";
import UploadFileModal from "@/components/dashboard/analysis/UploadFileModal.tsx";
import { getCampaignFiles } from "../../../../../../supabase/functions/campaigns/action.ts";
import Link from "next/link";

const Page = () => {
  const { id: campaignId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [campaignFiles, setCampaignFiles] = useState<any[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

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

      toast.success("File uploaded successfully");
      setSelectedFile(null);

      // Refresh the files after upload
      const files = await getCampaignFiles(campaignId);
      setCampaignFiles(files);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-start justify-start p-4">
        <Toaster position="top-right" richColors />
        {loadingFiles ? (
          <p>Loading files...</p>
        ) : campaignFiles.length === 0 ? (
          <div className="flex flex-col items-center gap-6">
            <p className="text-foreground text-base font-medium">
              Upload a file
            </p>

            <Button
              onClick={handleButtonClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-8 h-8" />
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.json"
            />

            {selectedFile && (
              <>
                <p className="text-muted-foreground text-sm">
                  Selected: {selectedFile.name}
                </p>
                <Button
                  onClick={handleUpload}
                  size="sm"
                  disabled={uploading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {campaignFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 border rounded-lg shadow-sm flex flex-col gap-2"
              >
                <p className="font-medium">{file.file_name}</p>
                <Link
                  href={`/dashboard/campaigns/${campaignId}/dashboard`}
                  className="text-blue-600 hover:underline"
                >
                  View File
                </Link>
              </div>
            ))}
          </div>
        )}
        <UploadFileModal />
      </div>
    </>
  );
};

export default Page;
