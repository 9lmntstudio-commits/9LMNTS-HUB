import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Settings, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Activity,
  CheckCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  X,
  Send,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  project: string;
  status: 'active' | 'prospect' | 'completed' | 'on-hold';
  revenue: string;
  nextMeeting?: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'on-track' | 'at-risk' | 'completed' | 'delayed';
  progress: number;
  deadline: string;
  budget: string;
  spent: string;
  startDate: string;
  milestones: Milestone[];
  nextSteps: string[];
}

interface Milestone {
  id: string;
  name: string;
  completed: boolean;
  dueDate: string;
  description: string;
}

interface ProjectMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'client' | 'team' | 'system';
  attachments?: string[];
}

interface Activity {
  id: string;
  client: string;
  action: string;
  amount?: string;
  time: string;
  type: 'payment' | 'project' | 'quote' | 'meeting';
}

export function MasterAdminPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalRevenue: '$127,850',
    revenueChange: '+12.5%',
    activeClients: 48,
    clientChange: '+8',
    projectsLive: 23,
    projectChange: '+5',
    conversionRate: '64%',
    conversionChange: '-2.3%'
  };

  const recentActivity: Activity[] = [
    {
      id: '1',
      client: 'TechCorp Inc.',
      action: 'Completed payment for Corporate Clash event',
      amount: '$15,000 CAD',
      time: '2 hours ago',
      type: 'payment'
    },
    {
      id: '2',
      client: 'Sarah & Michael',
      action: 'Launched The Union Wedding OS',
      time: '5 hours ago',
      type: 'project'
    },
    {
      id: '3',
      client: 'Club Neon',
      action: 'Requested quote for Sound Clash OS',
      time: '1 day ago',
      type: 'quote'
    },
    {
      id: '4',
      client: 'Startup Summit',
      action: '50% deposit received',
      amount: '$7,500 CAD',
      time: '2 days ago',
      type: 'payment'
    }
  ];

  const upcomingDeadlines: Project[] = [
    {
      id: '1',
      name: 'Corporate Clash - Enterprise Launch',
      client: 'TechCorp Inc.',
      status: 'on-track',
      progress: 75,
      deadline: 'Dec 15, 2025',
      budget: '$15,000 CAD',
      spent: '$7,500 CAD',
      startDate: 'Nov 1, 2025',
      milestones: [
        {
          id: '1',
          name: 'Design Phase',
          completed: true,
          dueDate: 'Nov 15, 2025',
          description: 'Complete UI/UX design and mockups'
        },
        {
          id: '2',
          name: 'Development Phase',
          completed: true,
          dueDate: 'Dec 1, 2025',
          description: 'Core functionality development'
        },
        {
          id: '3',
          name: 'Testing & QA',
          completed: false,
          dueDate: 'Dec 10, 2025',
          description: 'Quality assurance and testing'
        },
        {
          id: '4',
          name: 'Final Deployment',
          completed: false,
          dueDate: 'Dec 15, 2025',
          description: 'Launch and deployment'
        }
      ],
      nextSteps: [
        'Complete testing phase',
        'Client review and feedback',
        'Final deployment preparation',
        'Post-launch support setup'
      ]
    },
    {
      id: '2',
      name: 'Sound Clash OS - Beta Launch',
      client: 'Club Vertex',
      status: 'at-risk',
      progress: 45,
      deadline: 'Dec 18, 2025',
      budget: '$10,000',
      spent: '$4,500',
      startDate: 'Nov 5, 2025',
      milestones: [
        {
          id: '1',
          name: 'Backend Development',
          completed: true,
          dueDate: 'Nov 20, 2025',
          description: 'API and database setup'
        },
        {
          id: '2',
          name: 'Frontend Development',
          completed: false,
          dueDate: 'Dec 5, 2025',
          description: 'User interface development'
        },
        {
          id: '3',
          name: 'Integration Testing',
          completed: false,
          dueDate: 'Dec 12, 2025',
          description: 'System integration testing'
        },
        {
          id: '4',
          name: 'Beta Launch',
          completed: false,
          dueDate: 'Dec 18, 2025',
          description: 'Beta version release'
        }
      ],
      nextSteps: [
        'Accelerate frontend development',
        'Additional developer allocation',
        'Extended timeline discussion',
        'Client communication about delays'
      ]
    },
    {
      id: '3',
      name: 'The Union - Custom Features',
      client: 'Emma & James',
      status: 'on-track',
      progress: 90,
      deadline: 'Dec 20, 2025',
      budget: '$15,000',
      spent: '$13,500',
      startDate: 'Oct 15, 2025',
      milestones: [
        {
          id: '1',
          name: 'Core Platform Setup',
          completed: true,
          dueDate: 'Nov 1, 2025',
          description: 'Basic wedding OS setup'
        },
        {
          id: '2',
          name: 'Custom Features Development',
          completed: true,
          dueDate: 'Dec 1, 2025',
          description: 'Custom wedding features'
        },
        {
          id: '3',
          name: 'Client Testing',
          completed: true,
          dueDate: 'Dec 10, 2025',
          description: 'Client testing and feedback'
        },
        {
          id: '4',
          name: 'Final Polish',
          completed: false,
          dueDate: 'Dec 20, 2025',
          description: 'Final touches and delivery'
        }
      ],
      nextSteps: [
        'Final polish and optimization',
        'Client training session',
        'Documentation delivery',
        'Project handoff'
      ]
    }
  ];

  const projectMessages: ProjectMessage[] = [
    {
      id: '1',
      sender: '9LMNTS Studio',
      message: 'Hey! We\'ve just completed the design phase. Please review the mockups and let us know your thoughts.',
      timestamp: 'Dec 8, 2025 - 10:30 AM',
      type: 'team'
    },
    {
      id: '2',
      sender: 'Marcus Chen',
      message: 'Looks amazing! Love the networking grid feature. Can we add a dark mode toggle?',
      timestamp: 'Dec 8, 2025 - 2:15 PM',
      type: 'client'
    },
    {
      id: '3',
      sender: '9LMNTS Studio',
      message: 'Absolutely! Dark mode is already built into our Event OS platform. We\'ll make sure it\'s fully customized for your brand.',
      timestamp: 'Dec 8, 2025 - 3:45 PM',
      type: 'team'
    },
    {
      id: '4',
      sender: 'System',
      message: 'Payment of $7,500 CAD received from TechCorp Inc. Project milestone completed.',
      timestamp: 'Dec 7, 2025 - 4:30 PM',
      type: 'system'
    }
  ];

  const clients: Client[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      company: 'TechCorp Inc.',
      email: 'marcus@techcorp.com',
      phone: '+1 (555) 123-4567',
      location: 'Toronto, ON',
      project: 'Corporate Clash - Enterprise',
      status: 'active',
      revenue: '$15,000 CAD',
      nextMeeting: 'Dec 15, 2025'
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      company: 'Club Vertex',
      email: 'sarah@clubvertex.com',
      phone: '+1 (555) 234-5678',
      location: 'Vancouver, BC',
      project: 'Sound Clash OS',
      status: 'active',
      revenue: '$8,500 CAD',
      nextMeeting: 'Dec 18, 2025'
    }
  ];

  const quickActions = [
    { icon: Users, label: 'Client Portal', color: 'bg-blue-600', action: () => setActiveTab('clients') },
    { icon: FileText, label: 'Generate Report', color: 'bg-green-600', action: () => alert('Generating comprehensive report...') },
    { icon: BarChart3, label: 'Analytics', color: 'bg-purple-600', action: () => setActiveTab('analytics') },
    { icon: Settings, label: 'Settings', color: 'bg-gray-600', action: () => setActiveTab('settings') }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'CRM', icon: Users },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10';
      case 'prospect': return 'text-yellow-500 bg-yellow-500/10';
      case 'completed': return 'text-blue-500 bg-blue-500/10';
      case 'on-hold': return 'text-gray-500 bg-gray-500/10';
      case 'on-track': return 'text-green-500 bg-green-500/10';
      case 'at-risk': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return DollarSign;
      case 'project': return CheckCircle;
      case 'quote': return FileText;
      case 'meeting': return Calendar;
      default: return Activity;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert(`Sending message: ${newMessage}`);
      setNewMessage('');
    }
  };

  const handleAddClient = (clientData: any) => {
    alert(`Adding new client: ${JSON.stringify(clientData)}`);
    setShowAddClientModal(false);
  };

  const handleAddProject = (projectData: any) => {
    alert(`Adding new project: ${JSON.stringify(projectData)}`);
    setShowAddProjectModal(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-[#FF7A00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Master Admin</h1>
              <span className="ml-3 px-2 py-1 bg-[#FF7A00] text-[#1A1A1A] text-xs font-semibold rounded">PRO</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#222222] min-h-screen border-r border-[#FF7A00]/20">
          <nav className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#FF7A00] text-white'
                      : 'text-gray-400 hover:bg-[#333333] hover:text-white'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Welcome back, let's check your performance</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Total Revenue</span>
                    <DollarSign className="text-green-500" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalRevenue}</div>
                  <div className="text-sm text-green-500">{stats.revenueChange}</div>
                </div>
                
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Active Clients</span>
                    <Users className="text-blue-500" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.activeClients}</div>
                  <div className="text-sm text-blue-500">{stats.clientChange}</div>
                </div>
                
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Projects Live</span>
                    <CheckCircle className="text-purple-500" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.projectsLive}</div>
                  <div className="text-sm text-purple-500">{stats.projectChange}</div>
                </div>
                
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Conversion Rate</span>
                    <TrendingUp className="text-orange-500" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.conversionRate}</div>
                  <div className="text-sm text-red-500">{stats.conversionChange}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`${action.color} p-4 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                    >
                      <action.icon size={20} />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                    <button className="text-[#FF7A00] hover:text-[#FF7A00]/80 text-sm">View All Activity</button>
                  </div>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${activity.type === 'payment' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                          {React.createElement(getActivityIcon(activity.type), { size: 16, className: activity.type === 'payment' ? 'text-green-500' : 'text-blue-500' })}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{activity.client}</div>
                          <div className="text-gray-400 text-sm">{activity.action}</div>
                          {activity.amount && (
                            <div className="text-green-500 font-semibold">{activity.amount}</div>
                          )}
                          <div className="text-gray-500 text-xs">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
                    <button className="text-[#FF7A00] hover:text-[#FF7A00]/80 text-sm">Manage Projects</button>
                  </div>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((project) => (
                      <div key={project.id} className="border border-[#333333] rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-medium">{project.name}</h4>
                            <p className="text-gray-400 text-sm">{project.client}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-[#333333] rounded-full h-2">
                            <div 
                              className="bg-[#FF7A00] h-2 rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-gray-400">Deadline: </span>
                            <span className="text-white">{project.deadline}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-400">{project.spent} / {project.budget}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Client Relationship Manager</h2>
                <button 
                  onClick={() => setShowAddClientModal(true)}
                  className="px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Client
                </button>
              </div>
              
              <div className="bg-[#222222] rounded-lg border border-[#FF7A00]/20">
                <div className="p-4 border-b border-[#333333]">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search clients, companies, or projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                      />
                    </div>
                    <button className="px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-[#444444] transition-colors flex items-center">
                      <Filter size={16} className="mr-2" />
                      Filters
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#333333]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Next Meeting</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333]">
                      {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-[#333333] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-white font-medium">{client.name}</div>
                                <div className="text-gray-400 text-sm">{client.company}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                              {client.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white">{client.project}</td>
                          <td className="px-6 py-4 text-green-500 font-medium">{client.revenue}</td>
                          <td className="px-6 py-4 text-gray-400">{client.nextMeeting}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setSelectedClient(client)}
                                className="text-blue-500 hover:text-blue-400 transition-colors"
                              >
                                <Eye size={16} />
                              </button>
                              <button className="text-gray-400 hover:text-gray-300 transition-colors">
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => alert(`Delete client: ${client.name}`)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Project Management</h2>
                <button 
                  onClick={() => setShowAddProjectModal(true)}
                  className="px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  New Project
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingDeadlines.map((project) => (
                  <div key={project.id} className="bg-[#222222] rounded-lg border border-[#FF7A00]/20 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <p className="text-gray-400">{project.client}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#333333] rounded-full h-3">
                        <div 
                          className="bg-[#FF7A00] h-3 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">Start Date</span>
                        <div className="text-white">{project.startDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Deadline</span>
                        <div className="text-white">{project.deadline}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Budget</span>
                        <div className="text-white">{project.budget}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Spent</span>
                        <div className="text-white">{project.spent}</div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-full px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedProject && (
                <div className="mt-8 bg-[#222222] rounded-lg border border-[#FF7A00]/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{selectedProject.name} - Details</h3>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Project Milestones */}
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-white mb-4">Project Milestones</h4>
                      <div className="space-y-3">
                        {selectedProject.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full mr-3 ${milestone.completed ? 'bg-green-500' : 'bg-gray-500'}`} />
                              <div>
                                <div className="text-white font-medium">{milestone.name}</div>
                                <div className="text-gray-400 text-sm">{milestone.description}</div>
                                <div className="text-gray-500 text-xs">Due: {milestone.dueDate}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${milestone.completed ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                              {milestone.completed ? 'COMPLETED' : 'PENDING'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Next Steps & Payment Status */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Next Steps</h4>
                      <div className="space-y-2 mb-6">
                        {selectedProject.nextSteps.map((step, index) => (
                          <div key={index} className="flex items-center p-2 bg-[#1A1A1A] rounded">
                            <span className="w-6 h-6 bg-[#FF7A00] text-white text-xs rounded-full flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            <span className="text-gray-300 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-lg font-semibold text-white mb-4">Payment Status</h4>
                      <div className="bg-[#1A1A1A] rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Total Budget</span>
                          <span className="text-white font-medium">{selectedProject.budget}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Amount Paid</span>
                          <span className="text-green-500 font-medium">{selectedProject.spent}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Remaining</span>
                          <span className="text-orange-500 font-medium">
                            ${parseInt(selectedProject.budget.replace(/[^0-9]/g, '')) - parseInt(selectedProject.spent.replace(/[^0-9]/g, ''))} CAD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Project Messages</h2>
              
              <div className="bg-[#222222] rounded-lg border border-[#FF7A00]/20">
                <div className="p-6 border-b border-[#333333]">
                  <h3 className="text-lg font-semibold text-white">Corporate Clash - Enterprise Launch</h3>
                  <p className="text-gray-400">TechCorp Inc.</p>
                </div>
                
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {projectMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'client' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-md ${message.type === 'client' ? 'bg-[#333333]' : 'bg-[#FF7A00]'} rounded-lg p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${message.type === 'client' ? 'text-white' : 'text-[#1A1A1A]'}`}>
                              {message.sender}
                            </span>
                            <span className={`text-xs ${message.type === 'client' ? 'text-gray-400' : 'text-[#1A1A1A]/70'}`}>
                              {message.timestamp}
                            </span>
                          </div>
                          <div className={`${message.type === 'client' ? 'text-gray-300' : 'text-[#1A1A1A]'}`}>
                            {message.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-[#333333]">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Client Modal */}
          {showAddClientModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#222222] rounded-lg p-6 w-full max-w-md border border-[#FF7A00]/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Add New Client</h3>
                  <button 
                    onClick={() => setShowAddClientModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Client Name"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <button 
                    onClick={() => handleAddClient({ name: 'New Client' })}
                    className="w-full px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
                  >
                    Add Client
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Project Modal */}
          {showAddProjectModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#222222] rounded-lg p-6 w-full max-w-md border border-[#FF7A00]/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Add New Project</h3>
                  <button 
                    onClick={() => setShowAddProjectModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="text"
                    placeholder="Client Name"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="text"
                    placeholder="Budget"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                  <button 
                    onClick={() => handleAddProject({ name: 'New Project' })}
                    className="w-full px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Client Detail Modal */}
          {selectedClient && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#222222] rounded-lg p-6 w-full max-w-2xl border border-[#FF7A00]/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Client Details</h3>
                  <button 
                    onClick={() => setSelectedClient(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                        {selectedClient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">{selectedClient.name}</h4>
                        <p className="text-gray-400">{selectedClient.company}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Mail size={16} className="mr-2" />
                        {selectedClient.email}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Phone size={16} className="mr-2" />
                        {selectedClient.phone}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin size={16} className="mr-2" />
                        {selectedClient.location}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Project Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Project:</span>
                        <span className="text-white">{selectedClient.project}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedClient.status)}`}>
                          {selectedClient.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-green-500">{selectedClient.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Meeting:</span>
                        <span className="text-white">{selectedClient.nextMeeting}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would go here */}
          {activeTab !== 'dashboard' && activeTab !== 'clients' && activeTab !== 'projects' && activeTab !== 'messages' && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-gray-400 mb-4">This section is under development</div>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
