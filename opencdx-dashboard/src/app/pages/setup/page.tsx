'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody } from 'ui-library';
import axios from 'axios';

interface AuditConfigStatus {
  natsAuditEnabled: boolean;
  configEntryFound: boolean;
  configSource: string;
}

export default function SetupPage() {
  const [auditConfig, setAuditConfig] = useState<AuditConfigStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuditConfig = async () => {
      try {
        const token = localStorage.getItem('serviceToken');
        const response = await axios.get('https://localhost:8080/audit/config/nats-status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAuditConfig(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch audit configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditConfig();
  }, []);

  return (
    <div className="p-8 bg-[#F4F9FF] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">System Setup</h1>
          <p className="text-gray-600">Configure system settings and view current configuration</p>
        </header>

        {/* Audit Configuration Section */}
        <Card className="bg-white">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Audit Configuration</h2>
            
            {loading && (
              <div className="text-gray-500">Loading configuration...</div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                <strong>Error:</strong> {error}
              </div>
            )}

            {auditConfig && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">NATS Audit Publishing</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        auditConfig.natsAuditEnabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {auditConfig.natsAuditEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {auditConfig.natsAuditEnabled 
                        ? 'Audit events are published to NATS JetStream for centralized logging and monitoring.'
                        : 'Audit events are logged locally only. NATS publishing is disabled.'}
                    </p>

                    <div className="text-sm space-y-1">
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-600">Configuration Source:</span>
                        <span className="text-gray-800">{auditConfig.configSource}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-600">Explicitly Configured:</span>
                        <span className="text-gray-800">{auditConfig.configEntryFound ? 'Yes' : 'No (using default)'}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">
                        <strong>What this means:</strong>
                        {auditConfig.natsAuditEnabled ? (
                          <> All system operations (create, update, delete) are audited and sent to the central audit service via NATS messaging. 
                          This enables real-time audit trail monitoring and compliance reporting.</>
                        ) : (
                          <> Audit events are logged to application logs only. Operations will not fail if NATS is unavailable. 
                          Use this mode for local development or when NATS is not configured.</>
                        )}
                      </p>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      <p>To change this setting, update the environment variable <code className="bg-gray-200 px-1 py-0.5 rounded">OPENCDX_AUDIT_NATS_ENABLED</code> or 
                      set <code className="bg-gray-200 px-1 py-0.5 rounded">opencdx.audit.nats.enabled</code> in application.yml</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Future Setup Sections */}
        <Card className="bg-white">
          <CardBody className="flex items-center justify-center h-32">
            <div className="text-center text-gray-400">
              <p className="text-lg font-medium">Additional Settings</p>
              <p className="text-sm mt-2">Feature coming soon</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

