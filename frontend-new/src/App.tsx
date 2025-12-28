import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// --- VITAL IMPORTS ---
import Sidebar from './components/Sidebar';

// Lazy Load Pages (These were missing in your file!)
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LiveChats = lazy(() => import('./pages/LiveChats'));
const Users = lazy(() => import('./pages/Users'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const Settings = lazy(() => import('./pages/Settings'));

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Responsive Sidebar Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Run on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0f172a]">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Component */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      {/* Main Content Area (Adjusts margin based on sidebar) */}
      <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        <main className="flex-1 p-6 overflow-y-auto">
          <Suspense fallback={<div className="flex justify-center mt-10"><Loader2 className="animate-spin text-indigo-600 h-8 w-8" /></div>}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/live-chats" element={<LiveChats />} />
              <Route path="/users" element={<Users />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={
          <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#0f172a]"><Loader2 className="animate-spin text-white"/></div>}>
            <Login />
          </Suspense>
        } />
        <Route path="/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
}

export default App;