"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase-config/client";

export function EmailConfirmationPage() {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const checkEmailConfirmation = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.email_confirmed_at) {
          setConfirmed(true);
        } else {
          setConfirmed(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setConfirmed(false);
      } finally {
        setLoading(false);
      }
    };

    // Polling every 3 seconds in case the user confirms in another tab
    const interval = setInterval(checkEmailConfirmation, 3000);
    checkEmailConfirmation();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {loading ? (
          // Loading / waiting state
          <div className="text-center space-y-4">
            <div className="animate-spin flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Waiting for email confirmation...
            </h1>
            <p className="text-foreground text-sm">
              Please check your inbox and click the verification link. This page
              will update automatically.
            </p>
          </div>
        ) : confirmed ? (
          // Email confirmed state
          <>
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Email Confirmation Successful!
              </h1>
            </div>

            {/* Main Content Card */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-8 text-center space-y-6">
                <p className="text-foreground leading-relaxed">
                  Thank you for confirming your email address. Your account is
                  now verified and you can access all features.
                </p>

                <Link href="/dashboard">
                  <Button
                    className="w-full hover:cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    size="lg"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        ) : (
          // Email not confirmed state
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              Email not confirmed yet
            </h1>
            <p className="text-foreground text-sm">
              Please check your inbox and click the verification link to
              continue.
            </p>
          </div>
        )}

        {/* Footer (always visible) */}
        <footer className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
