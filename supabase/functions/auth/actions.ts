import { supabase } from "@/supabase-config/client";
import {
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from "@/lib/types/AuthTypes";
import { options } from "preact";

export async function signUpNewUser(signUpData: SignUpRequest) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: {
        emailRedirectTo: "http://localhost:3000/confirm-email",
      },
    });

    if (error) {
      return { success: false, error: error.message || "Something went wrong" };
    }

    return { success: true, user: result.user };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
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
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
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

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again",
    };
  }
}

export async function updateUserEmail(email: string) {
  try {
    const { data, error } = await supabase.auth.updateUser(
      { email },
      {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/confirm-email`,
      },
    );

    if (error) {
      return {
        success: false,
        error: error.message || "Something went wrong. Please try again.",
      };
    }

    console.log("Email update request sent. Awaiting verification.");
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again.",
    };
  }
}

export async function updateUserPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Something went wrong. Please try again. ",
      };
    }

    return {
      success: true,
      message: "Please check your email for password reset instructions. ",
    };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again.",
    };
  }
}

export async function deleteUserAccount(userId: string) {
  try {
    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return {
        success: false,
        error: error.message || "Something went wrong. Please try again. ",
      };
    }

    return {
      success: true,
      message: "Account deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected error occurred. Please try again.",
    };
  }
}
