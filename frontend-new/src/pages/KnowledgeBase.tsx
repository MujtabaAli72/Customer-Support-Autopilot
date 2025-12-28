import { BookOpen, FileText, Video, Download } from 'lucide-react';

export default function KnowledgeBase() {
  const resources = [
    { id: 1, title: 'Getting Started Guide', type: 'Article', desc: 'Learn the basics of Support AutoPilot.', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, title: 'API Documentation', type: 'Developer', desc: 'Integrate AutoPilot into your apps.', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 3, title: 'Video Tutorials', type: 'Video', desc: 'Watch step-by-step guides.', icon: Video, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 4, title: 'System Reports', type: 'Download', desc: 'Download monthly performance logs.', icon: Download, color: 'text-green-500', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h1>
          <p className="text-gray-500 dark:text-gray-400">Helpful articles, guides, and downloads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer">
            <div className={`h-12 w-12 rounded-xl ${item.bg} dark:bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.desc}</p>
            <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
              View Resource &rarr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}