import { Ticket, AlertCircle } from 'lucide-react';

export default function Tickets() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Support Tickets</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <Ticket className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium">No Open Tickets</h3>
        <p className="text-gray-500 mb-4">You have no pending support requests.</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create New Ticket</button>
      </div>
    </div>
  );
}