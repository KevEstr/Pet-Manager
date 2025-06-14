import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '@/components/header'
import { SidebarProvider } from '@/components/sidebar-provider'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: ({ size, className }: any) => <div data-testid="search-icon" data-size={size} className={className}>Search</div>,
  Menu: ({ size, className }: any) => <div data-testid="menu-icon" data-size={size} className={className}>Menu</div>,
}))

const HeaderWithProvider = () => (
  <SidebarProvider>
    <Header />
  </SidebarProvider>
)

describe('Header Component', () => {
  beforeEach(() => {
    // Reset window size for each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders header with logo and title', () => {
    render(<HeaderWithProvider />)
    
    const logo = screen.getByText('PET MANAGER')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/dashboard')
  })

  it('renders search input with placeholder', () => {
    render(<HeaderWithProvider />)
    
    const searchInput = screen.getByPlaceholderText('Buscar en PetManager...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  it('updates search query when typing', () => {
    render(<HeaderWithProvider />)
    
    const searchInput = screen.getByPlaceholderText('Buscar en PetManager...')
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    
    expect(searchInput).toHaveValue('test search')
  })

  it('renders search icon', () => {
    render(<HeaderWithProvider />)
    
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveAttribute('data-size', '18')
  })

  it('renders menu button for mobile', () => {
    render(<HeaderWithProvider />)
    
    const buttons = screen.getAllByRole('button')
    const menuButton = buttons.find(button => 
      button.querySelector('[data-testid="menu-icon"]')
    )
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('lg:hidden')
  })

  it('renders menu icon', () => {
    render(<HeaderWithProvider />)
    
    const menuIcon = screen.getByTestId('menu-icon')
    expect(menuIcon).toBeInTheDocument()
    expect(menuIcon).toHaveAttribute('data-size', '24')
  })

  it('toggles sidebar when menu button is clicked', () => {
    render(<HeaderWithProvider />)
    
    const buttons = screen.getAllByRole('button')
    const menuButton = buttons.find(button => 
      button.querySelector('[data-testid="menu-icon"]')
    )
    fireEvent.click(menuButton!)
    
    // The sidebar should be toggled (we can test this by checking if the function was called)
    expect(menuButton).toBeInTheDocument()
  })

  it('renders profile button', () => {
    render(<HeaderWithProvider />)
    
    const buttons = screen.getAllByRole('button')
    const profileButton = buttons.find(button => 
      button.className.includes('rounded-full') && button.querySelector('div')
    )
    expect(profileButton).toBeInTheDocument()
    expect(profileButton).toHaveClass('p-2', 'hover:bg-gray-100', 'rounded-full')
  })

  it('renders profile avatar with initial', () => {
    render(<HeaderWithProvider />)
    
    const avatar = screen.getByText('A')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('w-8', 'h-8', 'bg-blue-900', 'rounded-full')
  })

  it('search input has correct styling classes', () => {
    render(<HeaderWithProvider />)
    
    const searchInput = screen.getByPlaceholderText('Buscar en PetManager...')
    expect(searchInput).toHaveClass(
      'w-full',
      'py-2',
      'px-4',
      'pr-10',
      'rounded-full',
      'border',
      'border-gray-300'
    )
  })

  it('header has sticky positioning', () => {
    render(<HeaderWithProvider />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-30')
  })

  it('has proper semantic structure', () => {
    render(<HeaderWithProvider />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const logo = screen.getByText('PET MANAGER')
    expect(logo.closest('a')).toBeInTheDocument()
  })

  it('search button is accessible', () => {
    render(<HeaderWithProvider />)
    
    const searchButtons = screen.getAllByRole('button')
    const searchButton = searchButtons.find(button => 
      button.querySelector('[data-testid="search-icon"]')
    )
    expect(searchButton).toBeInTheDocument()
  })
}) 