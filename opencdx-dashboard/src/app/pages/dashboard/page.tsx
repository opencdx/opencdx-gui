'use client'

import { Users, Clock, UserMinus, ClipboardList, Building, MessageSquare, Search } from 'lucide-react'
import { Input, Card, CardBody, Image } from 'ui-library'
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

const statCards = [
  { icon: <Image src="/images/person.png" alt="Total Users" width={24} height={24} />, title: "Total Users", value: 571, color: "bg-blue-500" },
  { icon: <Image src="/images/person.png" alt="Pending" width={24} height={24} />, title: "Pending", value: 93, color: "bg-yellow-500" },
  { icon: <Image src="/images/person.png" alt="Inactive Users" width={24} height={24} />, title: "Inactive Users", value: 24, color: "bg-red-500" },
  { icon: <Image src="/images/person.png" alt="Test Types" width={24} height={24} />, title: "Test Types", value: 6, color: "bg-green-500" },
  { icon: <Image src="/images/person.png" alt="Organization" width={24} height={24} />, title: "Organization", value: 3, color: "bg-purple-500" },
  { icon: <Image src="/images/person.png" alt="User Responses" width={24} height={24} />, title: "User Responses", value: 8, color: "bg-indigo-500" },
]

export default function Component() {
  return (
    <div className="bg-[#F4F9FF] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome John!</h1>
            <p className="text-muted-foreground">Here's a high-level look at your data to date.</p>
          </div>
          <div className="relative flex items-center">
            <Image src="/images/person.png" alt="Search" width={20} height={20} />
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
          <Card className="h-64 bg-white rounded-lg overflow-hidden" />
          <Card className="h-64 bg-white rounded-lg overflow-hidden" />
        </div>

        <Card className="h-64 bg-white rounded-lg overflow-hidden" />
      </div>
    </div>
  )
}