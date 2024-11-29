'use client'

import { Input, Card, Breadcrumbs, BreadcrumbItem, Button, Tooltip, Link } from 'ui-library'
import {  EditAttributesOutlined , ArrowBack} from '@mui/icons-material'
import CategoryList from '@/components/toggle-management/category-list'
interface ToggleItemProps {
  title: string
  description: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

const ToggleItem: React.FC<ToggleItemProps> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={enabled} 
        onChange={(e) => onToggle(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
    </label>
  </div>
)

interface ToggleSection {
  title: string
  description: string
  toggles: {
    title: string
    description: string
    enabled: boolean
  }[]
}

export default function ToggleManagement() {
 
  return (
   <div className="flex justify-center items-center">
    <div className="bg-[#F4F9FF] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-row justify-between items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
    <div className="flex items-center  justify-center space-x-4 align-center ">
    <EditAttributesOutlined style={{color: 'black',height: '48px',width: '48px'}}/>
    <div className="flex flex-col space-y-1">
        <h1 className="text-base font-semibold">Toggle Management</h1>
        <Breadcrumbs className="mb-4" separator="/" >
          <BreadcrumbItem href="/dashboard/pages/form-builder" >Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Toggle Management</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Link href="/dashboard/pages/form-builder" aria-label="Back to Dashboard">
        <Button
          className="mr-4"
          color="primary"
          variant="bordered"
        >
          <ArrowBack />
          Back
        </Button>
      </Link>
      
     
     
    </div>
  </div>

     <CategoryList  />
      </div>
    </div>
    </div>
  )
}