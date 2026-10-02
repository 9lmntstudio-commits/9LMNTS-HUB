import { useState } from "react";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import { getSupabaseClient } from "../utils/supabase/client";
import { projectId } from "../utils/supabase/info";

interface LoginProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any, accessToken: string) => void;
}

export function Login({
  onNavigate,
  onLoginSuccess,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseClient();

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("Login error:", signInError);
        // Provide more helpful error messages
        if (
          signInError.message === "Invalid login credentials"
        ) {
          setError(
            "Invalid email or password. Please check your credentials or sign up for a new account.",
          );
        } else {
          setError(signInError.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        console.log(
          "Login successful, getting user details...",
        );

        // Get user details directly from Supabase
        const {
          data: { user: userData },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !userData) {
          console.error("Error getting user:", userError);
          setError("Failed to get user details");
          setLoading(false);
          return;
        }

        console.log(
          "User details retrieved:",
          userData.email,
          "Role:",
          userData.user_metadata?.role,
        );

        const userInfo = {
          id: userData.id,
          email: userData.email || "",
          name: userData.user_metadata?.name || "",
          role: userData.user_metadata?.role || "user",
        };

        onLoginSuccess(userInfo, data.session.access_token);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-['Orbitron']">
      {/* Background Effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <button
            onClick={() => onNavigate("home")}
            className="inline-block group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-none bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,69,0,0.3)] transition-transform group-hover:scale-105">
              <LogIn size={32} className="text-primary-foreground" />
            </div>
          </button>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
            Welcome <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl lowercase ml-[-10px] -rotate-6 inline-block capitalize">Back</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans">
            Sign in to access 9LMNTS Studio
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-primary/15 rounded-none p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-none p-4 flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-destructive mt-0.5 flex-shrink-0"
                />
                <p className="text-xs font-sans text-destructive">
                  {error}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
              >
                Identification / Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
              >
                Security / Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-black rounded-none hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(255,69,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs border border-primary"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Authorize Session
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              New to the cypher?{" "}
              <button
                onClick={() => onNavigate("signup")}
                className="text-primary hover:underline transition-colors ml-1"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors uppercase tracking-widest font-bold"
          >
            ← Return to Base
          </button>
        </div>
      </div>
    </div>
  );
}