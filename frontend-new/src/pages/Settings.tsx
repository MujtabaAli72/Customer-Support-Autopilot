import { User, Bell, Lock, Globe, Moon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system configurations.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        {/* Profile Section */}
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Profile Information</h3>
            <p className="text-sm text-gray-500">Update your name, email, and photo.</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">Edit</button>
        </div>

        {/* Notifications */}
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <p className="text-sm text-gray-500">Configure email and push alerts.</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">Manage</button>
        </div>

        {/* Security */}
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <Lock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
            <p className="text-sm text-gray-500">Change password and 2FA settings.</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">Update</button>
        </div>

        {/* Appearance */}
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
            <Moon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Appearance</h3>
            <p className="text-sm text-gray-500">Toggle dark mode and themes.</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">Customize</button>
        </div>
      </div>
    </div>
  );
}