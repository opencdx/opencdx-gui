'use client'

import { Users, Clock, UserMinus, ClipboardList, Building, MessageSquare, Search } from 'lucide-react'
import { Input, Card, CardBody, Image } from 'ui-library'
import { PageErrorBoundary } from '@/components/custom/page-error-boundary';
import { useUserList, useOrganizationList, useWorkspaceList } from '@/hooks/iam-hooks';

import person from '../../../../public/images/person.png';

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <Card className="bg-white rounded-lg overflow-hidden">
    <CardBody className="p-2 flex flex-row items-center  justify-center">
      <div className={`text-white bg-primary-200 rounded-full p-1`}>{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground px-2">{title}</p>
        <p className="text-xl font-bold text-primary-500 text-left px-2">{value}</p>
      </div>
    </CardBody>
  </Card>
)

export default function Component() {
  const { data: userData } = useUserList();
  const { data: orgData } = useOrganizationList();
  const { data: workspaceData } = useWorkspaceList();

  const users = userData?.data?.iamUsers || [];
  const totalUsers = users.length;
  const activeUsers = users.filter((u: any) => u.status === 'IAM_USER_STATUS_ACTIVE').length;
  const inactiveUsers = users.filter((u: any) => u.status === 'IAM_USER_STATUS_INACTIVE').length;
  const organizations = orgData?.data?.iamOrganizations?.length || 0;
  const workspaces = workspaceData?.data?.iamWorkspaces?.length || 0;

  const statCards = [
    { icon: <Users size={24} />, title: "Total Users", value: totalUsers, color: "bg-blue-500" },
    { icon: <Clock size={24} />, title: "Active Users", value: activeUsers, color: "bg-green-500" },
    { icon: <UserMinus size={24} />, title: "Inactive Users", value: inactiveUsers, color: "bg-red-500" },
    { icon: <ClipboardList size={24} />, title: "Forms", value: 0, color: "bg-yellow-500" },
    { icon: <Building size={24} />, title: "Organizations", value: organizations, color: "bg-purple-500" },
    { icon: <MessageSquare size={24} />, title: "Workspaces", value: workspaces, color: "bg-indigo-500" },
  ];

  return (
    <PageErrorBoundary componentName="Dashboard">
      <div className="bg-[#F4F9FF] min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome John!</h1>
              <p className="text-muted-foreground">Here's a high-level look at your data to date.</p>
            </div>
            <div className="relative flex items-center">
              <Image src={person.src} alt="Search" width={20} height={20} />
              <Input
                type="search"
                placeholder="Search all OpenCDx"
                className="w-64 bg-white"
                variant="bordered"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-64 bg-white rounded-lg overflow-hidden">
              <CardBody className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium">Analytics Chart</p>
                  <p className="text-sm mt-2">Feature coming soon</p>
                </div>
              </CardBody>
            </Card>
            <Card className="h-64 bg-white rounded-lg overflow-hidden">
              <CardBody className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium">Recent Activity</p>
                  <p className="text-sm mt-2">Feature coming soon</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="h-64 bg-white rounded-lg overflow-hidden">
            <CardBody className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-lg font-medium">System Health Monitor</p>
                <p className="text-sm mt-2">Feature coming soon</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageErrorBoundary>
  )
}