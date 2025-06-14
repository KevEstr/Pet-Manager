import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from '@/components/sidebar'
import { usePathname } from 'next/navigation'

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock de next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
  })

  it('renders all navigation items', () => {
    render(<Sidebar />)
    
    // Verificar que todos los elementos de navegación están presentes
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Mascotas')).toBeInTheDocument()
    expect(screen.getByText('Citas')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('highlights active route', () => {
    render(<Sidebar />)
    
    const activeLink = screen.getByText('Dashboard').closest('a')
    expect(activeLink).toHaveClass('bg-primary/10')
  })

  it('renders user section', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('admin@example.com')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Sidebar />)
    
    const themeButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeButton).toBeInTheDocument()
  })

  it('renders logout button', () => {
    render(<Sidebar />)
    
    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(logoutButton).toBeInTheDocument()
  })
}) 