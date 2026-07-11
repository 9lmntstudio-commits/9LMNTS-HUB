import { useState } from "react";
import {
  UserPlus,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";

interface SignupProps {
  onNavigate: (page: string) => void;
}

export function Signup({ onNavigate }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name,
            role: isAdmin ? "admin" : "user",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Signup error:", data.error);
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onNavigate("login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred");
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
              <UserPlus size={32} className="text-primary-foreground" />
            </div>
          </button>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
            Create <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl lowercase ml-[-10px] -rotate-6 inline-block capitalize">Account</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans">
            Join 9LMNTS Studio today
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-card border border-primary/15 rounded-none p-8 shadow-2xl">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-none border-2 border-green-500 bg-green-500/10 flex items-center justify-center">
                <CheckCircle
                  size={32}
                  className="text-green-500"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">
                Profile Created!
              </h2>
              <p className="text-muted-foreground text-sm mb-4 font-sans">
                Your credentials have been authorized.
              </p>
              <p className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] animate-pulse">
                Initiating Session Transfer...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
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
                  htmlFor="name"
                  className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
                >
                  Full Identity / Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
                >
                  Communication / Email
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
                  >
                    Key / Password
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
                    minLength={6}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-primary"
                  >
                    Confirm Key
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full px-4 py-3 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <label
                  htmlFor="isAdmin"
                  className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground cursor-pointer"
                >
                  Request Administrative Access
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-black rounded-none hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(255,69,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs border border-primary"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Provisioning...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Register Identity
                  </>
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                Already registered?{" "}
                <button
                  onClick={() => onNavigate("login")}
                  className="text-primary hover:underline transition-colors ml-1"
                >
                  Log In
                </button>
              </p>
            </div>
          )}
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