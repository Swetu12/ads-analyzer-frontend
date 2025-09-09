"use client";

import { useCampaignStore } from "@/lib/stores/analysis/CampaignStore.ts";
import { useUserStore } from "@/lib/stores/global/UserStore.ts";
import React, { useEffect } from "react";
import { supabase } from "@/supabase-config/client.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useCampaignGlobalStore } from "@/lib/stores/global/CampaignGlobalStore.ts";
import { toast, Toaster } from "sonner";

export function CreateCampaignModal() {
  const date = useCampaignStore((state) => state.date);
  const setDate = useCampaignStore((state) => state.setDate);
  const name = useCampaignStore((state) => state.name);
  const setName = useCampaignStore((state) => state.setName);
  const goal = useCampaignStore((state) => state.goal);
  const setGoal = useCampaignStore((state) => state.setGoal);
  const isCampaignModalOpen = useCampaignStore(
    (state) => state.isCampaignModalOpen,
  );
  const setIsCampaignModalOpen = useCampaignStore(
    (state) => state.setIsCampaignModalOpen,
  );
  const { user, loading, fetchUser } = useUserStore();
  const { campaigns, fetchCampaigns, addCampaign } = useCampaignGlobalStore();

  useEffect(() => {
    fetchUser();
    fetchCampaigns();
  }, [fetchUser, fetchCampaigns]);

  if (loading) return <div>Loading...</div>;
  if (!user) alert("Please log in to create a campaign");

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("campaigns")
      .insert([
        {
          user_id: user.id,
          name,
          goal,
          start_date: date?.from,
          end_date: date?.to,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      toast.error("Error creating campaign");
    } else {
      addCampaign(data[0]);
      toast.success("Campaign created successfully");
      setIsCampaignModalOpen(false);
      setGoal(0);
      setName("");
      setDate({});
    }
  };

  if (campaigns === null) return <div>Loading...</div>;

  return campaigns.length > 0 ? (
    <Dialog open={isCampaignModalOpen} onOpenChange={setIsCampaignModalOpen}>
      <Toaster position={"top-right"} richColors />
      <DialogContent className="sm:max-w-lg bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Name
            </label>
            <Input
              className="bg-[#2C82A820] border-[#2C82A8]/40 text-white placeholder-gray-400"
              placeholder="Campaign name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campaign Goal */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Goal
            </label>
            <Input
              className="bg-[#2C82A820] border-[#2C82A8]/40 text-white placeholder-gray-400"
              type="number"
              placeholder="1000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-white",
                    !date && "text-gray-400 border-[#2C82A8]/40",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from && date?.to ? (
                    <>
                      {date.from.toDateString()} - {date.to.toDateString()}
                    </>
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-[#1B2028] text-white border border-[#2C82A8]/40"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="w-full bg-[#2C82A8] hover:bg-[#3893BB] text-white font-medium"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog>
      <Toaster position={`top-right`} richColors />
      <p className="text-sm text-gray-400 mb-6">
        Get started by creating your first campaign
      </p>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#2C82A8] hover:bg-[#3893BB] text-white font-medium px-8 py-3 cursor-pointer"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Name
            </label>
            <Input
              className="bg-[#2C82A820] border-[#2C82A8]/40 text-white placeholder-gray-400"
              placeholder="Campaign name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campaign Goal */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Goal
            </label>
            <Input
              className="bg-[#2C82A820] border-[#2C82A8]/40 text-white placeholder-gray-400"
              type="number"
              placeholder="1000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-white",
                    !date && "text-gray-400 border-[#2C82A8]/40",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from && date?.to ? (
                    <>
                      {date.from.toDateString()} - {date.to.toDateString()}
                    </>
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-[#1B2028] text-white border border-[#2C82A8]/40"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="w-full bg-[#2C82A8] hover:bg-[#3893BB] text-white font-medium cursor-pointer"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
