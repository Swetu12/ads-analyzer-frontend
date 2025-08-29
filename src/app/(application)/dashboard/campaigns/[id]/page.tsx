"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { supabase } from "@/supabase-config/client.ts";
import { toast, Toaster } from "sonner";

const Page = () => {
  const { id: campaignId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const user = supabase.auth.getUser();
      const userId = (await user).data.user?.id;

      if (!userId) toast.error("User not found");

      const filePath = `${userId}/${campaignId}/${Date.now()}-${selectedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-files")
        .upload(filePath, selectedFile);

      if (uploadError) toast.error(uploadError);

      const { error: dbError } = await supabase.from("campaign_files").insert([
        {
          campaign_id: campaignId,
          user_id: userId,
          file_path: filePath,
          file_name: selectedFile.name,
        },
      ]);

      if (dbError) toast.error(dbError);
      toast.success("File uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center p-4">
        <Toaster position={`top-right`} richColors />
        <div className="flex flex-col items-center gap-6">
          <p className="text-foreground text-base font-medium">Upload a file</p>

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
      </div>
    </>
  );
};
export default Page;
