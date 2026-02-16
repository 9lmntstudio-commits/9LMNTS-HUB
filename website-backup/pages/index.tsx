import { useState, useEffect } from "react";
import { Navbar } from "../src/components/Navbar";
import { Footer } from "../src/components/Footer";
import { HomePage } from "../src/components/HomePage";
import { ServicesPage } from "../src/components/ServicesPage";
import { PricingPage } from "../src/components/PricingPage";
import { AboutPage } from "../src/components/AboutPage";
import { UnifiedStartProjectPage } from '../src/components/UnifiedStartProjectPage';
import { PortfolioPage } from "../src/components/PortfolioPage";
import { AdminDashboardFull } from "../src/components/AdminDashboardFull";
import { CRM } from "../src/components/CRM";
import { ClientPortal } from "../src/components/ClientPortal";
import { Login } from "../src/components/Login";
import { Signup } from "../src/components/Signup";
import { getSupabaseClient } from '../src/utils/supabase/client';
import { mapServiceId } from '../src/utils/serviceMapping';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = getSupabaseClient();

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          console.log('Found existing session, getting user details...');
          
          // Get user details directly from Supabase
          const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !userData) {
            console.error('Session validation failed:', userError);
            setLoading(false);
            return;
          }

          console.log('User session validated:', userData);
          setUser({
            id: userData.id,
            email: userData.email || '',
            name: userData.user_metadata?.name || userData.email || 'User',
            role: userData.user_metadata?.role || 'user'
          });
          setAccessToken(session.access_token);
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = getSupabaseClient().auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          const { data: { user: userData } } = await getSupabaseClient().auth.getUser();
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email || '',
              name: userData.user_metadata?.name || userData.email || 'User',
              role: userData.user_metadata?.role || 'user'
            });
            setAccessToken(session.access_token);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setAccessToken(null);
          setCurrentPage('home');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (page: string, plan?: string) => {
    console.log('Navigating to:', page, plan ? `with plan: ${plan}` : '');
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentPage('start-project');
  };

  const handleLoginSuccess = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={(page: string) => handleNavigate(page)} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;
      case 'start-project':
        return <UnifiedStartProjectPage onNavigate={handleNavigate} selectedPlan={selectedPlan} />;
      case 'admin':
        if (user && (user.role === 'admin' || user.role === 'super_admin')) {
          return <AdminDashboardFull onNavigate={handleNavigate} user={user} accessToken={accessToken} onLogout={handleLogout} />;
        } else {
          setCurrentPage('home');
          return <HomePage onNavigate={handleNavigate} />;
        }
      case 'crm':
        if (user && (user.role === 'admin' || user.role === 'super_admin')) {
          return <CRM onNavigate={handleNavigate} />;
        } else {
          setCurrentPage('home');
          return <HomePage onNavigate={handleNavigate} />;
        }
      case 'client-portal':
        if (user) {
          return <ClientPortal onNavigate={handleNavigate} />;
        } else {
          setCurrentPage('login');
          return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
        }
      case 'login':
        return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <Signup onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        user={user}
      />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
