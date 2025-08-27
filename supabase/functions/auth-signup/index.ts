import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
      });
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 },
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: users, error: checkError } = await supabaseAdmin
      .from("auth.users")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (checkError) {
      return new Response(JSON.stringify({ error: checkError.message }), {
        status: 500,
      });
    }

    if (users && users.length > 0) {
      return new Response(
        JSON.stringify({ error: "User already registered with this email" }),
        { status: 400 },
      );
    }

    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
      });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: { id: newUser.id, email: newUser.email },
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error occurred" }),
      { status: 500 },
    );
  }
});
