import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { NewHomePage } from "./components/NewHomePage";
import { StudioPage } from "./components/StudioPage";
import { ServicesPage } from "./components/ServicesPage";
import { PricingPage } from "./pages/Pricing/PricingPage";
import { AboutPage } from "./components/AboutPage";
import { StartProjectPage } from "./components/StartProjectPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { EventOSSelectionPage } from "./components/EventOSSelectionPage";
import { EventOSPage } from "./pages/EventOS/EventOSPage";
import { LOAAIPage } from "./components/LOAAIPage";
import { SoundClashOSPage } from "./components/SoundClashOSPage";
import { WeddingOSPage } from "./components/WeddingOSPage";
import { FestivalFlowPage } from "./components/FestivalFlowPage";
import { CorporateClashPage } from "./components/CorporateClashPage";
import { GameNightProPage } from "./components/GameNightProPage";
import { ConferenceConnectPage } from "./components/ConferenceConnectPage";
import { RedCarpetPage } from "./components/RedCarpetPage";
import { AdminPage } from "./components/AdminPage";
import { MasterAdminPage } from "./components/MasterAdminPage";
import { CRM } from "./components/CRM";
import { ClientPortal } from "./components/ClientPortal";
import LOAChatWidget from "./components/LOAChatWidget";
import Payments from "./pages/Payments";
import EmergencyNYE from "./pages/EmergencyNYE";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<
    string | undefined
  >(undefined);

  const handleNavigate = (page: string, plan?: string) => {
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <NewHomePage onNavigate={handleNavigate} />;
      case "studio":
        return <StudioPage onNavigate={handleNavigate} />;
      case "loa-ai":
        return <LOAAIPage onNavigate={handleNavigate} />;
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "pricing":
        return <PricingPage onNavigate={handleNavigate} />;
      case "portfolio":
        return <PortfolioPage onNavigate={handleNavigate} />;
      case "event-os":
        return <EventOSPage onNavigate={handleNavigate} />;
      case "sound-clash-os":
        return <SoundClashOSPage onNavigate={handleNavigate} />;
      case "wedding-os":
        return <WeddingOSPage onNavigate={handleNavigate} />;
      case "festival-flow":
        return <FestivalFlowPage onNavigate={handleNavigate} />;
      case "corporate-clash-os":
        return <CorporateClashPage onNavigate={handleNavigate} />;
      case "game-night-pro":
        return <GameNightProPage onNavigate={handleNavigate} />;
      case "conference-connect":
        return <ConferenceConnectPage onNavigate={handleNavigate} />;
      case "red-carpet":
        return <RedCarpetPage onNavigate={handleNavigate} />;
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
        return <AdminPage onNavigate={handleNavigate} />;
      case "master-admin":
        return <MasterAdminPage onNavigate={handleNavigate} />;
      case "crm":
        return <CRM onNavigate={handleNavigate} />;
      case "client-portal":
        return <ClientPortal onNavigate={handleNavigate} />;
      case "payments":
        return <Payments onNavigate={handleNavigate} />;
      case "emergency-nye":
        return <EmergencyNYE onNavigate={handleNavigate} />;
      case "deploy-now":
        return <StartProjectPage selectedPlan="event-os" onNavigate={handleNavigate} />;
      case "case-studies":
        return <PortfolioPage onNavigate={handleNavigate} />;
      default:
        return <NewHomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <LOAChatWidget />
    </div>
  );
}
