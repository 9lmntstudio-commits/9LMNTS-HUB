import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Target,
  Zap,
  Bell
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [timeframe, setTimeframe] = useState('month');

  const stats = [
    {
      label: 'Total Revenue',
      value: '$127,850',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#00D4FF',
    },
    {
      label: 'Active Clients',
      value: '48',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: '#10B981',
    },
    {
      label: 'Projects Live',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: Zap,
      color: '#FF7A00',
    },
    {
      label: 'Conversion Rate',
      value: '64%',
      change: '-2.3%',
      trend: 'down',
      icon: Target,
      color: '#E91E63',
    },
  ];

  const recentActivity = [
    {
      type: 'payment',
      client: 'TechCorp Inc.',
      action: 'Completed payment for Corporate Clash event',
      amount: '$15,000 CAD',
      time: '2 hours ago',
      status: 'success',
    },
    {
      type: 'project',
      client: 'Sarah & Michael',
      action: 'Launched The Union Wedding OS',
      amount: '',
      time: '5 hours ago',
      status: 'live',
    },
    {
      type: 'inquiry',
      client: 'Club Neon',
      action: 'Requested quote for Sound Clash OS',
      amount: '',
      time: '1 day ago',
      status: 'pending',
    },
    {
      type: 'payment',
      client: 'Startup Summit',
      action: '50% deposit received',
      amount: '$7,500 CAD',
      time: '2 days ago',
      status: 'success',
    },
  ];

  const upcomingDeadlines = [
    {
      project: 'Sound Clash OS - Beta Launch',
      client: 'Club Vertex',
      dueDate: 'Dec 15, 2025',
      status: 'on-track',
      progress: 75,
    },
    {
      project: 'Corporate Clash - UI Redesign',
      client: 'InnovateCo',
      dueDate: 'Dec 18, 2025',
      status: 'at-risk',
      progress: 45,
    },
    {
      project: 'The Union - Custom Features',
      client: 'Emma & James',
      dueDate: 'Dec 20, 2025',
      status: 'on-track',
      progress: 90,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A0F1E] to-[#0D1829] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#00D4FF]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl text-white mb-2">
                Admin <span className="text-[#00D4FF]">Dashboard</span>
              </h1>
              <p className="text-gray-400">Welcome back, let's check your performance</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onNavigate('crm')}
                className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all"
              >
                View CRM
              </button>
              <button className="p-3 bg-[#1A2332] border border-[#00D4FF]/30 rounded-lg hover:bg-[#1A2332]/80 transition-all relative">
                <Bell className="text-[#00D4FF]" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E91E63] rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6 hover:border-[#00D4FF]/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon style={{ color: stat.color }} size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#E91E63]'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                <div className="text-white text-3xl">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-2xl">Recent Activity</h2>
                  <div className="flex gap-2">
                    {['day', 'week', 'month'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          timeframe === tf
                            ? 'bg-[#00D4FF] text-[#0A0F1E]'
                            : 'bg-[#0D1829] text-gray-400 hover:bg-[#0D1829]/80'
                        }`}
                      >
                        {tf.charAt(0).toUpperCase() + tf.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-[#0D1829] rounded-lg hover:bg-[#0D1829]/80 transition-all"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-[#10B981]/20' :
                        activity.status === 'live' ? 'bg-[#00D4FF]/20' :
                        'bg-[#FF7A00]/20'
                      }`}>
                        {activity.status === 'success' && <DollarSign className="text-[#10B981]" size={20} />}
                        {activity.status === 'live' && <Zap className="text-[#00D4FF]" size={20} />}
                        {activity.status === 'pending' && <Calendar className="text-[#FF7A00]" size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-white">{activity.client}</div>
                          {activity.amount && (
                            <div className="text-[#10B981]">{activity.amount}</div>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm mb-1">{activity.action}</div>
                        <div className="text-gray-500 text-xs">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onNavigate('crm')}
                  className="w-full mt-6 px-6 py-3 bg-transparent border border-[#00D4FF]/30 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/10 transition-all"
                >
                  View All Activity
                </button>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6">
                <h2 className="text-white text-2xl mb-6">Upcoming Deadlines</h2>

                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[#0D1829] rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-white text-sm">{deadline.project}</div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          deadline.status === 'on-track' 
                            ? 'bg-[#10B981]/20 text-[#10B981]'
                            : 'bg-[#E91E63]/20 text-[#E91E63]'
                        }`}>
                          {deadline.status === 'on-track' ? 'On Track' : 'At Risk'}
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs mb-3">{deadline.client}</div>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="w-full bg-[#0A0F1E] rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${deadline.progress}%`,
                              backgroundColor: deadline.status === 'on-track' ? '#10B981' : '#E91E63'
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-gray-500 text-xs">{deadline.progress}% Complete</div>
                        <div className="text-gray-400 text-xs flex items-center gap-1">
                          <Calendar size={12} />
                          {deadline.dueDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-transparent border border-[#00D4FF]/30 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/10 transition-all">
                  Manage Projects
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6 mt-6">
                <h2 className="text-white text-xl mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => onNavigate('client-portal')}
                    className="w-full px-4 py-3 bg-[#0D1829] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/10 transition-all text-left flex items-center gap-2"
                  >
                    <Users size={18} />
                    Client Portal
                  </button>
                  <button className="w-full px-4 py-3 bg-[#0D1829] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/10 transition-all text-left flex items-center gap-2">
                    <BarChart3 size={18} />
                    Generate Report
                  </button>
                  <button className="w-full px-4 py-3 bg-[#0D1829] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/10 transition-all text-left flex items-center gap-2">
                    <TrendingUp size={18} />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
