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

export function CreateCampaignModal() {
  const date = useCampaignStore((state) => state.date);
  const setDate = useCampaignStore((state) => state.setDate);
  const name = useCampaignStore((state) => state.name);
  const setName = useCampaignStore((state) => state.setName);
  const goal = useCampaignStore((state) => state.goal);
  const setGoal = useCampaignStore((state) => state.setGoal);
  const { user, loading, fetchUser } = useUserStore();
  const { campaigns, error, fetchCampaigns, addCampaign } =
    useCampaignGlobalStore();

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
      alert("Error creating campaign");
    } else {
      addCampaign(data[0]);
      alert("Campaign created successfully");
    }
  };

  return campaigns && campaigns.length > 0 ? null : (
    <Dialog>
      <p className="text-sm text-muted-foreground mb-6">
        Get started by creating your first campaign
      </p>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary hover:cursor-pointer hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              placeholder="Campaign name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campaign Goal */}
          <div>
            <label className="block text-sm font-medium mb-1">Goal</label>
            <Input
              type="number"
              placeholder="1000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
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
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
