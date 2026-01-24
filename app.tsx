import { useState, useEffect } from "react";
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
import { EventOSDemo } from "./components/EventOSDemo";
import { ClientPortal } from "./components/ClientPortal";

// Placeholder for your Supabase KV logic
// Import * as kv from './kv_store'; 

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  // GLOBAL LIVE STATE (The $5k Secret Sauce)
  const [liveMetrics, setLiveMetrics] = useState({
    revenue: 2500,
    tickets: 42,
    votes: 1204,
    recentSales: [
      { name: "Alex Rivera", type: "VIP Table", amount: "+$500.00", time: "2m ago" },
      { name: "Sarah J.", type: "General Ticket", amount: "+$50.00", time: "14m ago" }
    ]
  });

  // Function to simulate a live sale from the Demo
  const triggerLiveSale = (amount: number, type: string) => {
    setLiveMetrics(prev => ({
      ...prev,
      revenue: prev.revenue + amount,
      tickets: prev.tickets + 1,
      recentSales: [{ 
        name: "New Guest", 
        type: type, 
        amount: `+$${amount}.00`, 
        time: "Just now" 
      }, ...prev.recentSales.slice(0, 3)]
    }));
  };

  const handleNavigate = (page: string, plan?: string) => {
    window.scrollTo(0, 0); // Always reset scroll on nav
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const renderPage = () => {
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
        // Passing live metrics to dashboard
        return <AdminDashboard onNavigate={handleNavigate} metrics={liveMetrics} />;
      case "crm":
        return <CRM onNavigate={handleNavigate} />;
      case "client-portal":
        return <ClientPortal onNavigate={handleNavigate} />;
      case "event-os-demo":
        // Passing sale trigger to demo
        return <EventOSDemo onNavigate={handleNavigate} onPurchaseTrigger={triggerLiveSale} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Standalone pages don't show the standard Navbar/Footer for a "SaaS" feel
  const isStandalonePage = [
    "admin",
    "crm",
    "client-portal",
    "event-os-demo",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {!isStandalonePage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      <main className="transition-all duration-500">
        {renderPage()}
      </main>
      {!isStandalonePage && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
