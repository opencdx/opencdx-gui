import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

const ConfigurationPage: React.FC = () => {
  const clientConfigurations = [
    { id: 1, name: 'Client A', configType: 'Complete', environment: 'Production', lastUpdated: '2024-03-19 10:00:00' },
    { id: 2, name: 'Client B', configType: 'Pending', environment: 'Staging', lastUpdated: '2024-03-19 09:55:00' },
    { id: 3, name: 'Client C', configType: 'Complete', environment: 'Production', lastUpdated: '2024-03-19 09:50:00' },
  ];

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <SettingsIcon className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">System Configuration</h1>
          <p>Manage client system configurations and environments</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Config Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Environment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientConfigurations.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${client.configType === 'Complete' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {client.configType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {client.environment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit Config</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigurationPage; 