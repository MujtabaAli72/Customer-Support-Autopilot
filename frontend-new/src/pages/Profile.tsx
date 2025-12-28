import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export default function Profile() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-8 sm:flex sm:items-start">
          <div className="sm:flex-shrink-0">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <User className="h-12 w-12" />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <h3 className="text-xl font-medium text-gray-900">Admin User</h3>
            <p className="text-gray-500">Administrator</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span>admin@example.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>Member since January 2023</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Email Notifications</p>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="email-notifications"
                >
                  <span className="sr-only">Email Notifications</span>
                  <span
                    aria-hidden="true"
                    className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">SMS Notifications</p>
                <button
                  type="button"
                  className="bg-blue-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="sms-notifications"
                >
                  <span className="sr-only">SMS Notifications</span>
                  <span
                    aria-hidden="true"
                    className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account.</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enable 2FA
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700">Active Sessions</p>
                <p className="mt-1 text-sm text-gray-500">Manage and review your active sessions.</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Sessions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
