import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase/client.js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { PricingPage } from "./components/PricingPage";
import { AboutPage } from "./components/AboutPage";
import { StartProjectPage } from "./components/StartProjectPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { CRM } from "./components/CRM";
import { ClientPortal } from "./components/ClientPortal";
import { EventOSDemo } from "./components/EventOSDemo";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (page: string, plan?: string) => {
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const renderPage = () => {
    // Show loading screen while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      );
    }

    // Protected routes - require authentication
    if ((currentPage === "admin" || currentPage === "crm") && !user) {
      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl text-white mb-4">Authentication Required</h1>
            <p className="text-gray-400 mb-8">Please sign in to access this page.</p>
            <button
              onClick={() => setCurrentPage("home")}
              className="px-6 py-3 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "pricing":
        return <PricingPage onNavigate={handleNavigate} />;
      case "portfolio":
        return <PortfolioPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "start-project":
        return (
          <StartProjectPage
            selectedPlan={selectedPlan}
            onNavigate={handleNavigate}
          />
        );
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "crm":
        return <CRM onNavigate={handleNavigate} />;
      case "client-portal":
        return <ClientPortal onNavigate={handleNavigate} />;
      case "event-os-demo":
        return <EventOSDemo onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
