'use client'
import React, { useState } from 'react'

interface Tab {
  id: string
  label: string
  component: React.ReactNode
}

interface DashboardTabsProps {
  tabs: Tab[]
}

export default function DashboardTabs({ tabs }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id)

  return (
    <div className="w-full">
      {/* ✅ Tab Buttons */}
      <div className="flex space-x-4 border-b border-gray-300 mb-4 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-semibold transition 
              ${activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Tab Content */}
      <div className="p-4 bg-white rounded-lg shadow-sm min-h-[200px]">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  )
}
