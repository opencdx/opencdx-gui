'use client';

import React from 'react';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const SystemStatusPage: React.FC = () => {
  const systemStatuses = [
    { id: 1, name: 'Client A', status: 'Healthy', lastCheck: '2024-03-19 10:00:00' },
    { id: 2, name: 'Client B', status: 'Warning', lastCheck: '2024-03-19 09:55:00' },
    { id: 3, name: 'Client C', status: 'Critical', lastCheck: '2024-03-19 09:50:00' },
  ];

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-green-600 to-green-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <HealthAndSafetyIcon className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">System Status</h1>
          <p>Current health status of all client systems</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {systemStatuses.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${client.status === 'Healthy' ? 'bg-green-100 text-green-800' : 
                    client.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.lastCheck}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemStatusPage;
