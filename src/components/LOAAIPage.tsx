import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Globe, Code, Database, Rocket, CheckCircle, Activity, Cpu, Network, ArrowRight } from 'lucide-react';

interface LOAAIPageProps {
  onNavigate: (page: string) => void;
}

export function LOAAIPage({ onNavigate }: LOAAIPageProps) {
  const [isActive, setIsActive] = useState(true);
  const [deployments, setDeployments] = useState(127);
  const [processingTime, setProcessingTime] = useState(2.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeployments(prev => prev + Math.floor(Math.random() * 3));
      setProcessingTime(prev => Math.max(2.5, prev + (Math.random() - 0.5) * 0.2));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    {
      icon: Code,
      title: "Automated Development",
      description: "Generates complete event platforms from templates",
      features: ["React/Vue components", "API integration", "Database setup", "Deployment configuration"]
    },
    {
      icon: Database,
      title: "Smart Data Management",
      description: "Handles all data operations automatically",
      features: ["User authentication", "Payment processing", "Event data", "Analytics tracking"]
    },
    {
      icon: Network,
      title: "Cloud Integration",
      description: "Seamless deployment to multiple platforms",
      features: ["Netlify deployment", "GitHub integration", "CI/CD pipelines", "Environment management"]
    },
    {
      icon: Cpu,
      title: "AI Optimization",
      description: "Continuously improves platform performance",
      features: ["Performance monitoring", "Auto-scaling", "Security updates", "Feature enhancements"]
    }
  ];

  const workflow = [
    { step: 1, title: "Payment Detection", desc: "LOA detects client payment", status: "completed" },
    { step: 2, title: "Client Analysis", desc: "Analyzes event requirements", status: "completed" },
    { step: 3, title: "Platform Generation", desc: "Creates customized EVENT OS", status: "active" },
    { step: 4, title: "Deployment", desc: "Deploys to production", status: "pending" },
    { step: 5, title: "Client Access", desc: "Sends credentials to client", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              LOA AI Agent
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The intelligent automation engine that deploys enterprise-grade event platforms in hours, not months.
            </p>
            
            {/* Live Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-2xl p-6 border border-green-500/30 max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-xl font-semibold">LOA Agent {isActive ? 'Online & Operational' : 'Offline'}</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{deployments}</div>
                  <div className="text-gray-400">Platforms Deployed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{processingTime.toFixed(1)}h</div>
                  <div className="text-gray-400">Avg Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </motion.div>

            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Test LOA Agent Deployment
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            AI Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <capability.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                    <p className="text-gray-300 mb-4">{capability.description}</p>
                    <ul className="space-y-1">
                      {capability.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Deployment Workflow
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-600 to-blue-600"></div>
            
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-lg font-bold">{item.step}</span>
                </div>
                <div className="w-1/2 px-8">
                  <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'active' ? 'bg-yellow-500 animate-pulse' :
                        'bg-gray-500'
                      }`}></div>
                    </div>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Technical Architecture
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Backend</h3>
              <p className="text-gray-400">Node.js, Express, PostgreSQL, Redis</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Engine</h3>
              <p className="text-gray-400">Custom ML models, NLP, Pattern recognition</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Deployment</h3>
              <p className="text-gray-400">Netlify, GitHub Actions, Docker, AWS</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Performance Metrics
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Deployment Speed", value: "3 hours", change: "+200%" },
              { label: "Code Quality", value: "99.8%", change: "+15%" },
              { label: "Client Satisfaction", value: "100%", change: "Perfect" },
              { label: "System Uptime", value: "99.9%", change: "+0.3%" }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/20 text-center"
              >
                <Activity className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <div className="text-gray-400 mb-2">{metric.label}</div>
                <div className="text-green-400 text-sm">{metric.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-3xl p-12 border border-cyan-500/30"
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
            <h2 className="text-4xl font-bold mb-6">Experience the Power of AI</h2>
            <p className="text-xl text-gray-300 mb-8">
              Watch LOA Agent deploy a complete EVENT OS platform in real-time
            </p>
            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Start AI Deployment - $750
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
