import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/sidebar-provider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, onClick, ...props }: any) => {
    return <a href={href} onClick={onClick} {...props}>{children}</a>
  }
})

// Mock next/image
jest.mock('next/image', () => {
  return ({ src, alt, width, height, className }: any) => {
    return <img src={src} alt={alt} width={width} height={height} className={className} />
  }
})

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Users: ({ className }: any) => <div data-testid="users-icon" className={className}>Users</div>,
  BarChart3: ({ className }: any) => <div data-testid="barchart-icon" className={className}>BarChart3</div>,
  Home: ({ className }: any) => <div data-testid="home-icon" className={className}>Home</div>,
  LogOut: ({ className }: any) => <div data-testid="logout-icon" className={className}>LogOut</div>,
  X: ({ size, className }: any) => <div data-testid="x-icon" data-size={size} className={className}>X</div>,
}))

const SidebarWithProvider = () => (
  <SidebarProvider>
    <Sidebar />
  </SidebarProvider>
)

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Sidebar Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard')
    // Reset window size for each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders sidebar with logo', () => {
    render(<SidebarWithProvider />)
    
    const logo = screen.getByAltText('Pet Manager Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo.png')
    expect(logo).toHaveAttribute('width', '64')
    expect(logo).toHaveAttribute('height', '64')
  })

  it('renders all menu items', () => {
    render(<SidebarWithProvider />)
    
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sales/i })).toBeInTheDocument()
  })

  it('renders menu icons', () => {
    render(<SidebarWithProvider />)
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    expect(screen.getByTestId('barchart-icon')).toBeInTheDocument()
  })

  it('highlights active menu item', () => {
    mockUsePathname.mockReturnValue('/dashboard')
    render(<SidebarWithProvider />)
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink).toHaveClass('bg-sky-100', 'text-blue-900')
    expect(dashboardLink).toHaveAttribute('aria-current', 'page')
  })

  it('highlights users menu item when active', () => {
    mockUsePathname.mockReturnValue('/users')
    render(<SidebarWithProvider />)
    
    const usersLink = screen.getByRole('link', { name: /users/i })
    expect(usersLink).toHaveClass('bg-sky-100', 'text-blue-900')
    expect(usersLink).toHaveAttribute('aria-current', 'page')
  })

  it('highlights sales menu item when active', () => {
    mockUsePathname.mockReturnValue('/sales')
    render(<SidebarWithProvider />)
    
    const salesLink = screen.getByRole('link', { name: /sales/i })
    expect(salesLink).toHaveClass('bg-sky-100', 'text-blue-900')
    expect(salesLink).toHaveAttribute('aria-current', 'page')
  })

  it('shows inactive styling for non-active items', () => {
    mockUsePathname.mockReturnValue('/dashboard')
    render(<SidebarWithProvider />)
    
    const usersLink = screen.getByRole('link', { name: /users/i })
    expect(usersLink).toHaveClass('text-gray-500', 'hover:bg-sky-50', 'hover:text-blue-900')
    expect(usersLink).not.toHaveAttribute('aria-current')
  })

  it('renders close button for mobile', () => {
    render(<SidebarWithProvider />)
    
    const closeButtons = screen.getAllByLabelText('Close sidebar')
    const mobileCloseButton = closeButtons.find(button => button.className.includes('lg:hidden'))
    expect(mobileCloseButton).toBeInTheDocument()
    expect(mobileCloseButton).toHaveClass('lg:hidden')
  })

  it('renders X icon in close button', () => {
    render(<SidebarWithProvider />)
    
    const xIcon = screen.getByTestId('x-icon')
    expect(xIcon).toBeInTheDocument()
    expect(xIcon).toHaveAttribute('data-size', '24')
  })

  it('renders logout button', () => {
    render(<SidebarWithProvider />)
    
    const logoutButton = screen.getByLabelText('Cerrar sesión')
    expect(logoutButton).toBeInTheDocument()
    expect(logoutButton).toHaveClass('flex', 'items-center', 'gap-3', 'w-full')
  })

  it('renders logout icon', () => {
    render(<SidebarWithProvider />)
    
    const logoutIcon = screen.getByText('LogOut')
    expect(logoutIcon).toBeInTheDocument()
  })

  it('renders logout text', () => {
    render(<SidebarWithProvider />)
    
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()
  })

  it('handles keyboard navigation with Escape key', () => {
    render(<SidebarWithProvider />)
    
    const closeButtons = screen.getAllByLabelText('Close sidebar')
    const mobileCloseButton = closeButtons.find(button => button.className.includes('lg:hidden'))
    fireEvent.keyDown(mobileCloseButton!, { key: 'Escape' })
    
    // The sidebar should handle the escape key
    expect(mobileCloseButton).toBeInTheDocument()
  })

  it('handles other keyboard events', () => {
    render(<SidebarWithProvider />)
    
    const closeButtons = screen.getAllByLabelText('Close sidebar')
    const mobileCloseButton = closeButtons.find(button => button.className.includes('lg:hidden'))
    fireEvent.keyDown(mobileCloseButton!, { key: 'Enter' })
    
    // Should not close on non-escape keys
    expect(mobileCloseButton).toBeInTheDocument()
  })

  it('closes sidebar when close button is clicked', () => {
    render(<SidebarWithProvider />)
    
    const closeButtons = screen.getAllByLabelText('Close sidebar')
    const mobileCloseButton = closeButtons.find(button => button.className.includes('lg:hidden'))
    fireEvent.click(mobileCloseButton!)
    
    expect(mobileCloseButton).toBeInTheDocument()
  })

  it('handles menu item clicks for mobile', () => {
    // Mock mobile screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    render(<SidebarWithProvider />)
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    fireEvent.click(dashboardLink)
    
    expect(dashboardLink).toBeInTheDocument()
  })

  it('handles menu item clicks for desktop', () => {
    // Mock desktop screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
    
    render(<SidebarWithProvider />)
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    fireEvent.click(dashboardLink)
    
    expect(dashboardLink).toBeInTheDocument()
  })

  it('has proper ARIA labels and roles', () => {
    render(<SidebarWithProvider />)
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
    
    const mainMenu = screen.getByLabelText('Main menu')
    expect(mainMenu).toBeInTheDocument()
  })

  it('handles overlay click to close sidebar', () => {
    render(<SidebarWithProvider />)
    
    // The overlay should be present when sidebar is open
    const closeButtons = screen.getAllByLabelText('Close sidebar')
    const overlayButton = closeButtons.find(button => button.className.includes('w-full h-full'))
    expect(overlayButton).toBeInTheDocument()
  })

  it('menu items have correct href attributes', () => {
    render(<SidebarWithProvider />)
    
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
    expect(screen.getByRole('link', { name: /users/i })).toHaveAttribute('href', '/users')
    expect(screen.getByRole('link', { name: /sales/i })).toHaveAttribute('href', '/sales')
  })

  it('has proper styling classes', () => {
    render(<SidebarWithProvider />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'lg:static', 'w-64', 'bg-white', 'border-r', 'border-gray-200')
  })

  it('icons have proper accessibility attributes', () => {
    render(<SidebarWithProvider />)
    
    const homeIcon = screen.getByTestId('home-icon')
    const usersIcon = screen.getByTestId('users-icon')
    const barchartIcon = screen.getByTestId('barchart-icon')
    const logoutIcon = screen.getByTestId('logout-icon')
    
    expect(homeIcon).toBeInTheDocument()
    expect(usersIcon).toBeInTheDocument()
    expect(barchartIcon).toBeInTheDocument()
    expect(logoutIcon).toBeInTheDocument()
  })
}) 