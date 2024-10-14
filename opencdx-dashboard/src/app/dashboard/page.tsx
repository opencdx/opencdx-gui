import React from 'react';
import { Users, Clock, UserMinus, ClipboardList, Building, MessageSquare, Search } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-white bg-primary-200 rounded-full p-2">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-md font-bold">{value}</p>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const userName = "John"; // This should be dynamically fetched

  return (
    <div className="bg-[#F4F9FF] min-h-screen p-2 w-full">
      <div className="max-w-7xl mx-auto">
        {/* First row: Welcome message and search */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome {userName}!</h1>
            <p className="text-gray-600">Here's a high-level look at your data to date.</p>
          </div>
         
        </header>

        {/* Second row: Six stat cards */}
        <div className="grid grid-cols-6 gap-6 mb-8">
          <StatCard icon={<Users size={24} />} title="Total Users" value={571} />
          <StatCard icon={<Clock size={24} />} title="Pending" value={93} />
          <StatCard icon={<UserMinus size={24} />} title="Inactive Users" value={24} />
          <StatCard icon={<ClipboardList size={24} />} title="Test Types" value={6} />
          <StatCard icon={<Building size={24} />} title="Organization" value={3} />
          <StatCard icon={<MessageSquare size={24} />} title="User Responses" value={8} />
        </div>

        {/* Third row: Two empty boxes */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md h-64"></div>
          <div className="bg-white p-4 rounded-lg shadow-md h-64"></div>
        </div>

        {/* Fourth row: Single empty box */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md h-64"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
