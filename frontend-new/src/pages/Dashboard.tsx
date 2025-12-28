import { Users, MessageSquare, BookOpen, Sparkles, ArrowRight, Zap, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { 
    name: 'Total Users', 
    value: '2,543', 
    icon: Users, 
    change: '+12%', 
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20'
  },
  { 
    name: 'AI Conversations', 
    value: '842', 
    icon: MessageSquare, 
    change: '+24%', 
    gradient: 'from-fuchsia-500 to-pink-600',
    shadow: 'shadow-pink-500/20'
  },
  { 
    name: 'Knowledge Articles', 
    value: '156', 
    icon: BookOpen, 
    change: '+5%', 
    gradient: 'from-amber-400 to-orange-500',
    shadow: 'shadow-orange-500/20'
  },
  { 
    name: 'System Health', 
    value: '99.9%', 
    icon: Activity, 
    change: 'Stable', 
    gradient: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-teal-500/20'
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-2">
      
      {/* 1. WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-10 text-white shadow-2xl shadow-indigo-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/20 mb-4">
            <Sparkles className="h-3 w-3" />
            <span>Support AutoPilot v2.0 is live</span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl mb-3">Welcome to Support AutoPilot</h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-lg">
            Your AI-powered assistant for faster, smarter customer support and team management.
          </p>
          <button 
            onClick={() => navigate('/live-chats')}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-lg transition-transform active:scale-95 hover:bg-indigo-50"
          >
            Start New Chat
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
        {/* Decorative Background Circles */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute right-20 bottom-0 h-60 w-60 rounded-full bg-purple-500/20 blur-2xl"></div>
      </div>

      {/* 2. COLORFUL STATS GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                {stat.change}
              </span>
              <span className="ml-2 text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. QUICK ACTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Knowledge Base Card */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Resources</h3>
            <div className="space-y-3">
                {['Getting Started with AutoPilot', 'API Documentation', 'Team Guidelines'].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => navigate('/knowledge-base')}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                ))}
            </div>
        </div>

        {/* System Status Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                System Health
            </h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                        <span>Server Load</span>
                        <span>24%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[24%]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                        <span>AI API Latency</span>
                        <span>120ms</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[60%]"></div>
                    </div>
                </div>
                <div className="pt-2">
                    <button className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors">
                        View Detailed Logs
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}