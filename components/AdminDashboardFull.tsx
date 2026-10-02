import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Settings,
  Search,
  Bell,
  Layers,
  Plus,
  X,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  TrendingUp,
  RefreshCw,
  Check,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Filter,
  Eye,
  MoreVertical,
  Activity,
  ArrowUpRight,
  MousePointer2,
} from "lucide-react";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

/* ─── Mock Data for High-Fidelity Visualization ───────────────── */
const performanceData = [
  { name: "00:00", visits: 400, performance: 240 },
  { name: "04:00", visits: 300, performance: 139 },
  { name: "08:00", visits: 600, performance: 980 },
  { name: "12:00", visits: 800, performance: 790 },
  { name: "16:00", visits: 500, performance: 480 },
  { name: "20:00", visits: 900, performance: 880 },
  { name: "23:59", visits: 700, performance: 630 },
];

const trafficSourceData = [
  { name: "Mobile", value: 65, color: "#FF4500" },
  { name: "Desktop", value: 35, color: "#FFFFFF" },
];

interface AdminDashboardFullProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string | null;
  onLogout: () => void;
}

interface Project {
  id: string;
  name: string;
  type: string;
  status: "active" | "pending" | "completed" | "cancelled";
  budget: number;
  revenue: number;
  client: string;
  clientId?: string;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "prospect" | "completed" | "on-hold";
  revenue: number;
  nextMeeting?: string;
  notes?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export function AdminDashboardFull({
  onNavigate,
  user,
  accessToken,
  onLogout,
}: AdminDashboardFullProps) {
  const [activeView, setActiveView] = useState<
    "dashboard" | "projects" | "clients" | "users" | "settings"
  >("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showNewProjectModal, setShowNewProjectModal] =
    useState(false);
  const [showNewClientModal, setShowNewClientModal] =
    useState(false);
  const [showNewUserModal, setShowNewUserModal] =
    useState(false);
  const [editingClient, setEditingClient] =
    useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form States
  const [newProject, setNewProject] = useState({
    name: "",
    type: "",
    client: "",
    clientId: "",
    budget: "",
    status: "pending" as const,
  });

  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    status: "prospect" as const,
    nextMeeting: "",
    notes: "",
  });

  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    role: "user",
  });

  /* ─── Fetch Protocols ────────────────────────────────────────── */
  useEffect(() => {
    if (activeView === "projects") {
      fetchProjects();
    } else if (activeView === "clients") {
      fetchClients();
    } else if (activeView === "users") {
      fetchUsers();
    } else if (activeView === "dashboard") {
      fetchProjects();
      fetchClients();
    }
  }, [activeView]);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/projects`,
        {
          headers: {
            Authorization: `Bearer ${accessToken || publicAnonKey}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch projects");
      setProjects(data.projects || []);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/clients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken || publicAnonKey}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch clients");
      setClients(data.clients || []);
    } catch (err: any) {
      console.error("Error fetching clients:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken || publicAnonKey}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.type || !newProject.budget) {
      setError("Required fields missing");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken || publicAnonKey}`,
          },
          body: JSON.stringify({
            ...newProject,
            budget: parseFloat(newProject.budget),
            revenue: 0,
          }),
        },
      );
      if (!response.ok) throw new Error("Creation failed");
      await fetchProjects();
      setShowNewProjectModal(false);
      setSuccess("Mission initialized");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email) {
      setError("Name/Email required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken || publicAnonKey}`,
          },
          body: JSON.stringify({ ...newClient, revenue: 0 }),
        },
      );
      if (!response.ok) throw new Error("Sync failed");
      await fetchClients();
      setShowNewClientModal(false);
      setSuccess("Contact synchronized");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Terminate mission?")) return;
    setLoading(true);
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken || publicAnonKey}` },
      });
      await fetchProjects();
      setSuccess("Mission terminated");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClient = async () => {
    if (!editingClient) return;
    setLoading(true);
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/clients/${editingClient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || publicAnonKey}`,
        },
        body: JSON.stringify(editingClient),
      });
      await fetchClients();
      setEditingClient(null);
      setSuccess("Profile updated");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Purge contact?")) return;
    setLoading(true);
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/clients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken || publicAnonKey}` },
      });
      await fetchClients();
      setSuccess("Contact purged");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || publicAnonKey}`,
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Provisioning failed");
      await fetchUsers();
      setShowNewUserModal(false);
      setSuccess("Agent provisioned");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ─── Filtering Logic ────────────────────────────────────────── */
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#10B981";
      case "prospect": return "#FF4500";
      case "completed": return "#00D4FF";
      case "on-hold": return "#E91E63";
      case "pending": return "#F59E0B";
      default: return "#6B7280";
    }
  };

  const statusCounts = {
    all: clients.length,
    active: clients.filter(c => c.status === "active").length,
    prospect: clients.filter(c => c.status === "prospect").length,
    completed: clients.filter(c => c.status === "completed").length,
    "on-hold": clients.filter(c => c.status === "on-hold").length,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ── Header Terminal ────────────────────────────────────── */}
      <header className="bg-card border-b border-primary/10 px-6 py-4 font-['Orbitron'] sticky top-0 z-40 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("home")}
              className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_20px_rgba(255,69,0,0.3)] hover:opacity-90 transition-opacity"
            >
              <Layers size={20} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-tighter">
                9LMNTS <span className="font-['Mrs_Saint_Delafield'] text-primary text-3xl capitalize inline-block ml-[-5px]">Admin</span>
              </h1>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">
                Operator: {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={14} />
              <input
                type="text"
                placeholder="SEARCH_PROTOCOL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-none bg-background border border-primary/10 text-[10px] font-bold tracking-widest focus:border-primary w-64 transition-all"
              />
            </div>
            <button className="w-10 h-10 rounded-none bg-background border border-primary/10 flex items-center justify-center text-muted-foreground relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary shadow-[0_0_10px_#FF4500]" />
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-none bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-black uppercase tracking-widest"
            >
              TERMINATE_SESSION
            </button>
          </div>
        </div>

        <nav className="flex gap-6 mt-4 border-b border-primary/5">
          {[
            { id: "dashboard", label: "Terminal", icon: LayoutDashboard },
            { id: "projects", label: "Missions", icon: Layers },
            { id: "clients", label: "Contacts", icon: Briefcase },
            { id: "users", label: "Agents", icon: UsersIcon },
            { id: "settings", label: "Config", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-black text-[10px] uppercase tracking-[0.2em] relative transition-all ${
                activeView === tab.id ? "text-primary bg-primary/5" : "text-muted-foreground/40 hover:text-foreground"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {activeView === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_#FF4500]" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Status HUD ─────────────────────────────────────────── */}
      {success && (
        <div className="fixed top-24 right-6 z-50 bg-[#10B981] text-white px-6 py-3 rounded-none shadow-lg font-black uppercase tracking-widest text-[10px] border border-[#10B981]">
          <Check size={16} className="inline mr-2" /> {success}
        </div>
      )}
      {error && (
        <div className="fixed top-24 right-6 z-50 bg-destructive text-white px-6 py-3 rounded-none shadow-lg font-black uppercase tracking-widest text-[10px] border border-destructive">
          <AlertCircle size={16} className="inline mr-2" /> {error}
        </div>
      )}

      {/* ── Main Viewport ──────────────────────────────────────── */}
      <main className="p-6">
        
        {/* ── DASHBOARD (TERMINAL) VIEW ─────────────────────────── */}
        {activeView === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-700 font-['Orbitron']">
            
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Mission <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl capitalize ml-[-5px] -rotate-3 inline-block">Control</span>
              </h2>
              <div className="flex gap-3">
                <button onClick={() => setShowNewClientModal(true)} className="px-5 py-2.5 bg-background border border-[#10B981] text-[#10B981] text-[10px] font-black uppercase tracking-widest">NEW_CONTACT</button>
                <button onClick={() => setShowNewProjectModal(true)} className="px-5 py-2.5 bg-primary border border-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,69,0,0.3)]">INITIALIZE_MISSION</button>
              </div>
            </div>

            {/* Performance Analytics (Inspired by image.png) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-card border border-primary/20 p-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 left-0 w-16 h-1 border-t-2 border-primary/50" />
                <div className="absolute top-0 left-0 w-1 h-16 border-l-2 border-primary/50" />
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-1">Performance_Data</h3>
                    <p className="text-xl font-bold uppercase">System <span className="font-['Mrs_Saint_Delafield'] text-primary text-3xl capitalize inline-block">Velocity</span></p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[9px] font-black tracking-widest">REAL-TIME.STABLE</span>
                  </div>
                </div>

                <div className="h-64 w-full font-sans">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF4500" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FF4500" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #FF4500', borderRadius: '0' }}
                        itemStyle={{ color: '#FF4500', fontSize: '10px', textTransform: 'uppercase' }}
                      />
                      <Area type="monotone" dataKey="performance" stroke="#FF4500" strokeWidth={3} fillOpacity={1} fill="url(#colorP)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-primary/10">
                  {[
                    { label: "LATENCY", val: "14ms" },
                    { label: "THROUGHPUT", val: "94.2k/s" },
                    { label: "CPU_LOAD", val: "12%" },
                    { label: "RESOURCES", val: "OPTIMAL" }
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-[9px] text-muted-foreground uppercase font-black mb-1">{s.label}</p>
                      <p className="text-sm font-black text-foreground">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-primary/20 p-8 flex flex-col justify-between group shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-1 border-t-2 border-primary/50" />
                <div className="absolute top-0 right-0 w-1 h-16 border-r-2 border-primary/50" />
                
                <div>
                  <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">Traffic_Monitor</h3>
                  <div className="flex items-end justify-between mb-10">
                    <div>
                      <p className="text-5xl font-black tracking-tighter text-foreground">1,284</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-2">Sessions_Today</p>
                    </div>
                    <div className="w-14 h-14 bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
                      <MousePointer2 size={28} />
                    </div>
                  </div>

                  <div className="space-y-5 font-sans">
                    {trafficSourceData.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="text-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full bg-background border border-primary/5 h-1">
                          <div className="h-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#10B981]">
                    <TrendingUp size={20} />
                    <span className="text-lg font-black">+12.4%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground uppercase font-black">Cycle_Growth</p>
                </div>
              </div>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "MISSIONS", val: projects.length, icon: Layers, color: "text-primary" },
                { label: "CREDITS", val: projects.reduce((s, p) => s + (p.revenue || 0), 0).toLocaleString(), icon: DollarSign, color: "text-[#10B981]" },
                { label: "ENTITIES", val: clients.length, icon: Briefcase, color: "text-primary" },
                { label: "AGENTS", val: users.length || "—", icon: UsersIcon, color: "text-primary" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-primary/10 p-6 shadow-xl relative group hover:border-primary/40 transition-all">
                   <div className="flex items-center gap-3 mb-4 opacity-60">
                    <s.icon size={16} className={s.color} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
                   </div>
                   <div className="text-3xl font-black tracking-tighter">{s.val}</div>
                </div>
              ))}
            </div>

            {/* Split Stream Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-primary/20 p-8 shadow-2xl relative">
                <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest">Mission <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Stream</span></h3>
                </div>
                <div className="space-y-4">
                  {projects.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-5 bg-background/50 border border-primary/5 hover:border-primary/20 transition-all group">
                      <div className="flex-1">
                        <div className="font-black uppercase tracking-wider text-xs group-hover:text-primary transition-colors">{p.name}</div>
                        <div className="text-[9px] text-muted-foreground uppercase mt-1">Ref: {p.client}</div>
                      </div>
                      <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest border border-primary/20 text-primary">{p.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-primary/20 p-8 shadow-2xl relative">
                <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest">Entity <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Stream</span></h3>
                </div>
                <div className="space-y-4">
                  {clients.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-center justify-between p-5 bg-background/50 border border-primary/5 hover:border-primary/20 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-card border border-primary/20 flex items-center justify-center text-primary text-xs font-black">{c.name[0]}</div>
                        <div>
                          <div className="font-black uppercase tracking-wider text-xs">{c.name}</div>
                          <div className="text-[9px] text-muted-foreground uppercase mt-1">{c.company}</div>
                        </div>
                      </div>
                      <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest border border-primary/20 text-primary">{c.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROJECTS (MISSIONS) VIEW ─────────────────────────── */}
        {activeView === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-500 font-['Orbitron']">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase tracking-tighter">
                Active <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Missions</span>
              </h2>
              <div className="flex gap-3">
                <button onClick={fetchProjects} className="px-4 py-2 bg-background border border-primary/20 text-foreground font-black uppercase tracking-widest text-[10px]">Sync</button>
                <button onClick={() => setShowNewProjectModal(true)} className="px-4 py-2 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] border border-primary">New Project</button>
              </div>
            </div>

            <div className="bg-card border border-primary/20 rounded-none overflow-hidden">
              <table className="w-full font-sans">
                <thead className="bg-background border-b border-primary/10 font-['Orbitron']">
                  <tr>
                    <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Mission Identifier</th>
                    <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Client</th>
                    <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Allocation</th>
                    <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Status</th>
                    <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Command</th>
                  </tr>
                </thead>
                <tbody className="font-['Orbitron']">
                  {filteredProjects.map(p => (
                    <tr key={p.id} className="border-b border-primary/5 hover:bg-primary/5 transition-all group">
                      <td className="px-6 py-5 font-black uppercase text-xs tracking-wider">{p.name}</td>
                      <td className="px-6 py-5 text-muted-foreground uppercase font-bold text-[10px]">{p.client}</td>
                      <td className="px-6 py-5 font-mono text-sm text-[#10B981] font-bold">${(p.revenue || 0).toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border border-primary/30" style={{ color: getStatusColor(p.status) }}>{p.status}</span>
                      </td>
                      <td className="px-6 py-5">
                        <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-destructive hover:bg-destructive/10 transition-all"><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CLIENTS (CONTACTS) VIEW ─────────────────────────── */}
        {activeView === "clients" && (
          <div className="space-y-6 animate-in fade-in duration-500 font-['Orbitron']">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Secure <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block capitalize">Contacts</span></h2>
              <div className="flex gap-3">
                <button onClick={fetchClients} className="px-4 py-2 bg-background border border-primary/20 text-foreground font-black uppercase tracking-widest text-[10px]">Sync</button>
                <button onClick={() => setShowNewClientModal(true)} className="px-4 py-2 bg-[#10B981] text-white font-black uppercase tracking-widest text-[10px] border border-[#10B981]">New Contact</button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-card border border-primary/15 p-8 group hover:border-primary/50 transition-all">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 border-2 border-primary/30 bg-background flex items-center justify-center text-primary font-black uppercase text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">{c.name[0]}</div>
                      <div>
                        <div className="text-foreground font-black uppercase tracking-wider text-sm">{c.name}</div>
                        <div className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mt-1">{c.company}</div>
                      </div>
                   </div>
                   <div className="space-y-3 mb-6 pb-6 border-b border-primary/10 font-sans text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Mail size={12}/> {c.email}</div>
                      <div className="flex items-center gap-2"><MapPin size={12}/> {c.location}</div>
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-muted-foreground text-[9px] font-black uppercase mb-1">Revenue</p>
                        <p className="text-[#10B981] font-black text-sm">${(c.revenue || 0).toLocaleString()}</p>
                      </div>
                      <button onClick={() => setEditingClient(c)} className="p-2 border border-primary/20 text-primary hover:bg-primary/10 transition-all"><Edit size={14}/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USERS (AGENTS) VIEW ───────────────────────────── */}
        {activeView === "users" && (
          <div className="space-y-6 animate-in fade-in duration-500 font-['Orbitron']">
             <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Active <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block capitalize">Agents</span></h2>
              <button onClick={() => setShowNewUserModal(true)} className="px-4 py-2 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">New Agent</button>
            </div>
            <div className="bg-card border border-primary/20 overflow-hidden">
               <table className="w-full font-sans">
                  <thead className="bg-background border-b border-primary/10 font-['Orbitron']">
                    <tr>
                      <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Agent ID</th>
                      <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol</th>
                      <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Clearance</th>
                      <th className="text-left px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Authorized</th>
                    </tr>
                  </thead>
                  <tbody className="font-['Orbitron']">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="border-b border-primary/5 hover:bg-primary/5 transition-all">
                        <td className="px-6 py-5 font-black uppercase text-xs">{u.name || 'ANON'}</td>
                        <td className="px-6 py-5 text-muted-foreground font-bold text-[10px]">{u.email}</td>
                        <td className="px-6 py-5"><span className={`px-2 py-0.5 text-[9px] font-black uppercase border ${u.role === 'admin' ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-muted-foreground'}`}>{u.role}</span></td>
                        <td className="px-6 py-5 text-[10px] text-muted-foreground font-black">{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS (CONFIG) VIEW ─────────────────────────── */}
        {activeView === "settings" && (
          <div className="space-y-6 animate-in fade-in duration-500 font-['Orbitron']">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Terminal <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block capitalize">Config</span></h2>
            <div className="bg-card border border-primary/20 p-8">
              <h3 className="text-foreground text-xl font-bold uppercase tracking-widest mb-8 border-b border-primary/10 pb-4">Operator Credentials</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Current Identity</label>
                  <div className="p-4 bg-background border border-border text-foreground font-black uppercase text-xs tracking-wider">{user.name}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Secure Channel</label>
                  <div className="p-4 bg-background border border-border text-foreground font-bold text-xs">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-destructive/20 p-8">
               <h3 className="text-destructive text-xl font-bold uppercase tracking-widest mb-6">Danger Zone</h3>
               <button className="px-6 py-3 bg-destructive/10 text-destructive border border-destructive/20 font-black uppercase tracking-widest text-[10px] hover:bg-destructive hover:text-white transition-all">Terminate Operator Access</button>
            </div>
          </div>
        )}

      </main>

      {/* ── MODALS ────────────────────────────────────────────── */}
      
      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 font-['Orbitron']">
          <div className="bg-card border border-primary/20 p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
              <h3 className="text-xl font-bold uppercase tracking-widest">New <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Mission</span></h3>
              <button onClick={() => setShowNewProjectModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Mission Identifier</label>
                <input type="text" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Vertical</label>
                <select value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:border-primary focus:outline-none font-sans uppercase font-bold appearance-none">
                  <option value="">SELECT VERTICAL</option>
                  <option value="7-Day Agentic Sprint (AI Automation)">AI AUTOMATION</option>
                  <option value="Website Design & Development">WEB DEVELOPMENT</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Allocation (CAD)</label>
                <input type="number" value={newProject.budget} onChange={(e) => setNewProject({...newProject, budget: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none font-mono text-lg font-black" />
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setShowNewProjectModal(false)} className="flex-1 py-4 bg-background border border-border text-muted-foreground font-black uppercase tracking-widest text-[10px]">Abort</button>
                <button onClick={handleCreateProject} className="flex-1 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] border border-primary">Initiate</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 font-['Orbitron']">
          <div className="bg-card border border-primary/20 p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
              <h3 className="text-xl font-bold uppercase tracking-widest">New <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Contact</span></h3>
              <button onClick={() => setShowNewClientModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Entity Name</label>
                <input type="text" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Secure Email</label>
                <input type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setShowNewClientModal(false)} className="flex-1 py-4 bg-background border border-border text-muted-foreground font-black uppercase tracking-widest text-[10px]">Abort</button>
                <button onClick={handleCreateClient} className="flex-1 py-4 bg-[#10B981] text-white font-black uppercase tracking-widest text-[10px] border border-[#10B981]">Sync</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 font-['Orbitron']">
          <div className="bg-card border border-primary/20 p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
              <h3 className="text-xl font-bold uppercase tracking-widest">Edit <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Profile</span></h3>
              <button onClick={() => setEditingClient(null)}><X size={20} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Entity Name</label>
                <input type="text" value={editingClient.name} onChange={(e) => setEditingClient({...editingClient, name: e.target.value})} className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Status</label>
                <select value={editingClient.status} onChange={(e) => setEditingClient({...editingClient, status: e.target.value as any})} className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:border-primary focus:outline-none appearance-none font-sans uppercase font-bold">
                  <option value="prospect">PROSPECT</option>
                  <option value="active">ACTIVE</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setEditingClient(null)} className="flex-1 py-4 bg-background border border-border text-muted-foreground font-black uppercase tracking-widest text-[10px]">Abort</button>
                <button onClick={handleUpdateClient} className="flex-1 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] border border-primary">Commit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 font-['Orbitron']">
          <div className="bg-card border border-primary/20 p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-4">
              <h3 className="text-xl font-bold uppercase tracking-widest">New <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl capitalize ml-[-5px] -rotate-3 inline-block">Agent</span></h3>
              <button onClick={() => setShowNewUserModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Agent ID</label>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="AGENT_NAME" className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Protocol (Email)</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="AGENT@9LMNTS.COM" className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none uppercase text-sm font-bold" />
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setShowNewUserModal(false)} className="flex-1 py-4 bg-background border border-border text-muted-foreground font-black uppercase tracking-widest text-[10px]">Abort</button>
                <button onClick={handleCreateUser} className="flex-1 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] border border-primary">Provision</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
