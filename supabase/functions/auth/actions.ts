import { supabase } from "@/supabase-config/client";
import {
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from "@/lib/types/AuthTypes";

export async function signUpNewUser(signUpData: SignUpRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/auth-signup`, // your deployed function URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
        },
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

    // Cookies are managed by the Supabase client configured to use cookies
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

export async function resetPassword(data: ResetPasswordRequest) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/reset-password`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: "Password reset email sent. Please check your inbox.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function updatePassword(data: ResetPasswordRequest) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Something went wrong. Please try again.",
      };
    }

    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function googleSignIn() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/dashboard`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Cookies are managed by the Supabase client configured to use cookies
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function githubSignIn() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/dashboard`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Cookies are managed by the Supabase client configured to use cookies
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}
