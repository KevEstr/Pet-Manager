"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  BarChart3, 
  Home,
  LogOut,
  X
} from "lucide-react"
import Image from "next/image"
import { useSidebar } from "./sidebar-provider"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, closeSidebar } = useSidebar()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home
    },
    {
      title: "Users",
      href: "/users",
      icon: Users
    },
    {
      title: "Sales",
      href: "/sales",
      icon: BarChart3
    }
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSidebar()
    }
  }

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          aria-hidden="true"
        >
          <button
            onClick={closeSidebar}
            className="w-full h-full"
            aria-label="Close sidebar"
          />
        </div>
      )}

      {/* Sidebar */}
      <nav 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Main navigation"
      >
        {/* Logo y botón cerrar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="w-16 h-16">
            <Image 
              src="/logo.png" 
              alt="Pet Manager Logo" 
              width={64} 
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <button 
            onClick={closeSidebar}
            onKeyDown={handleKeyDown}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            aria-label="Close sidebar"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4" aria-label="Main menu">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      // Cerrar sidebar en móvil al hacer clic en un enlace
                      if (window.innerWidth < 1024) {
                        closeSidebar()
                      }
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                      isActive 
                        ? "bg-sky-100 text-blue-900" 
                        : "text-gray-500 hover:bg-sky-50 hover:text-blue-900"
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-sky-50 hover:text-blue-900 transition-all"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </>
  )
}
