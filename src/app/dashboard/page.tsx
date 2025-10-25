'use client'

import React, { useState } from 'react'
import Analytics from './components/Analytics'
import Overview from './components/OverView'
import Settings from './components/settings'
import { Menu } from 'lucide-react'

interface Tab {
  id: string
  label: string
  component: React.ReactNode
  icon?: React.ReactNode
}

export default function DashboardPage() {
  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', component: <Overview /> },
    { id: 'analytics', label: 'Analytics', component: <Analytics /> },
    { id: 'settings', label: 'Settings', component: <Settings /> },
  ]

  const [activeTab, setActiveTab] = useState<string>('overview')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* ✅ Sidebar (responsive) */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r shadow-sm flex flex-col transform transition-transform duration-300 z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          {/* Close button (only mobile) */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSidebarOpen(false) // auto close on select (mobile)
              }}
              className={`w-full text-left px-6 py-3 font-medium rounded-r-full transition-all
                ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ✅ Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ✅ Main Content */}
      <main className="flex-1 p-8 w-full">
        {/* Top bar for small devices */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Page content */}
        {tabs.find((t) => t.id === activeTab)?.component}
      </main>
    </div>
  )
}
