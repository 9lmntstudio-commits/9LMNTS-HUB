import { useState } from "react";
// Import names must be Capitalized to be used as React Components
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { HomePage } from "./components/homepage";
import { ServicesPage } from "./components/servicespage";
import { PricingPage } from "./components/pricingpage";
import { AboutPage } from "./components/aboutpage";
import { StartProjectPage } from "./components/startprojectpage";
import { PortfolioPage } from "./components/portfoliopage";
import { AdminDashboard } from "./components/admindashboard";
import { CRM } from "./components/crm";
import { EventOSDemo } from "./components/eventosdemo";
import { ClientPortal } from "./components/clientportal"; // Added missing import

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string, plan?: string) => {
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
    // Scroll to top on navigation
    window.scrollTo(0, 0);
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

  const isStandalonePage = [
    "admin",
    "crm",
    "client-portal",
    "event-os-demo",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {!isStandalonePage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      <main>{renderPage()}</main>
      {!isStandalonePage && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
