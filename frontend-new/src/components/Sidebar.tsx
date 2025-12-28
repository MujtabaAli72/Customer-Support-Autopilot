import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid,      // Workspace
  Bot,             // Live Chat (AI)
  Ticket,          // Tickets (New!)
  Users,           // Team
  Library,         // Resources
  Settings2,       // Settings
  LogOut, 
  ChevronLeft, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// --- UPDATED MENU ITEMS ---
const navItems = [
  { 
    name: 'Workspace', 
    path: '/', 
    icon: LayoutGrid, 
    gradient: 'from-blue-400 to-indigo-500' 
  },
  { 
    name: 'Live Chat', // <--- Renamed from Nova Chat
    path: '/live-chats', 
    icon: Bot, 
    gradient: 'from-fuchsia-500 to-pink-500' 
  },
  { 
    name: 'Tickets',   // <--- Added Tickets Option
    path: '/tickets', 
    icon: Ticket, 
    gradient: 'from-violet-500 to-purple-500' 
  },
  { 
    name: 'Team Members', 
    path: '/users', 
    icon: Users, 
    gradient: 'from-emerald-400 to-teal-500' 
  },
  { 
    name: 'Resources', 
    path: '/knowledge-base', 
    icon: Library, 
    gradient: 'from-amber-400 to-orange-500' 
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: Settings2, 
    gradient: 'from-gray-400 to-slate-500' 
  },
];

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.div
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0f172a] text-white transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-800',
        isCollapsed ? 'w-20' : 'w-72'
      )}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 288 }}
    >
      {/* LOGO AREA */}
      <div className="flex items-center h-20 px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white fill-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Support AutoPilot
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveHover(item.name)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <Link
                to={item.path}
                className={cn(
                  'flex items-center py-3.5 px-4 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden',
                  isActive
                    ? 'bg-slate-800/50 text-white shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
              >
                {/* Active Indicator Line */}
                <div className={cn(
                  'absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b rounded-full',
                  item.gradient,
                  isActive ? 'opacity-100' : 'opacity-0',
                  'transition-opacity duration-300'
                )} />

                <Icon className={cn(
                    'h-5 w-5 flex-shrink-0 transition-all duration-300',
                    isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white',
                    isCollapsed ? 'mx-auto' : 'mr-4'
                  )} 
                />

                {!isCollapsed && (
                  <span className="tracking-wide">{item.name}</span>
                )}

                {/* Tooltip for Collapsed State */}
                {isCollapsed && activeHover === item.name && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* CONTACT INFO */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <button
          onClick={toggleSidebar}
          className={cn(
            'absolute -right-3 top-24 bg-slate-800 text-slate-400 hover:text-white rounded-full p-1.5 shadow-lg border border-slate-700 transition-transform duration-200 z-50',
            isCollapsed ? 'rotate-180' : ''
          )}
        >
          <ChevronLeft className="h-3 w-3" />
        </button>

        {!isCollapsed ? (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                        <HelpCircle className="h-5 w-5 text-pink-500" />
                    </div>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Contact Dev</span>
                </div>
                <div className="px-1">
                    <p className="text-lg font-bold text-pink-500 mb-1">Mujtaba Ali</p>
                    <p className="text-sm text-pink-300 break-all opacity-80 hover:opacity-100 transition-opacity">
                      m.elya1412@gmail.com
                    </p>
                </div>
            </div>

            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-sm font-medium transition-colors border border-red-500/10"
            >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-pink-400" title="Contact Mujtaba Ali">
                <HelpCircle className="h-5 w-5" />
             </div>
             <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
                <LogOut className="h-5 w-5" />
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}