import { supabase } from "@/supabase-config/client";
import { SignInRequest, SignUpRequest } from "@/lib/types/AuthTypes";

export async function signUpNewUser(signUpData: SignUpRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/auth-signup`, // your deployed function URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Something went wrong" };
    }

    return { success: true, user: result.user };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function signInWithEmail(signInData: SignInRequest) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.session) {
      return { success: false, error: "No active session found" };
    }

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  } else {
    return console.log("Sign Out successfully!");
  }
}
