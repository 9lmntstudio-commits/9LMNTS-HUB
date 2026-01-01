import { motion } from 'framer-motion';
import { Globe, Users, Zap, Award, Target, Rocket, ArrowRight, Timer } from 'lucide-react';

interface StudioPageProps {
  onNavigate: (page: string) => void;
}

export function StudioPage({ onNavigate }: StudioPageProps) {
  const team = [
    { name: "AI Development Team", role: "Core Engineering", description: "Building the future of event platforms" },
    { name: "LOA Agent System", role: "Automation Engine", description: "24/7 deployment and management" },
    { name: "Client Success", role: "Support Team", description: "Ensuring every event succeeds" }
  ];

  const achievements = [
    { icon: Rocket, title: "127+ Platforms Deployed", description: "Successfully launched event platforms" },
    { icon: Timer, title: "3-Hour Average", description: "From payment to live platform" },
    { icon: Users, title: "100% Client Satisfaction", description: "All clients running successful events" },
    { icon: Award, title: "Industry Innovation", description: "Leading AI-powered event solutions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              9LMNTS Studio
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The AI-powered development studio transforming event management through cutting-edge technology and automation.
            </p>
            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">The Future of Event Development</h2>
              <p className="text-lg text-gray-300 mb-6">
                9LMNTS Studio represents a paradigm shift in event platform development. By combining cutting-edge AI technology with deep event industry expertise, we deliver premium event platforms in hours, not months.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Our proprietary LOA AI Agent system automates the entire development lifecycle, from initial setup to deployment and ongoing management, ensuring consistent quality and rapid delivery.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">24h</div>
                  <div className="text-gray-400">Average Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100%</div>
                  <div className="text-gray-400">AI-Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">$750</div>
                  <div className="text-gray-400">Starting Price</div>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/30"
            >
              <Target className="w-16 h-16 mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To democratize professional event platforms through AI automation, making enterprise-grade event management accessible to everyone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            The Team Behind the Innovation
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-400">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Achievements
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-12 border border-blue-500/30"
          >
            <Zap className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Event?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution in event management. Deploy your EVENT OS platform in 24 hours.
            </p>
            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Deploy Your EVENT OS - $750
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
