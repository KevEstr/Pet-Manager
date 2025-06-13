import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'

// Mock de next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock de lucide-react
jest.mock('lucide-react', () => ({
  Users: () => <div data-testid="users-icon" />,
  ShoppingBag: () => <div data-testid="shopping-bag-icon" />,
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Tag: () => <div data-testid="tag-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
}))

describe('Dashboard Component', () => {
  it('renders the dashboard page correctly', () => {
    render(<Dashboard />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Ver reportes')).toBeInTheDocument()
    
    // Verificar que las estadísticas están presentes
    expect(screen.getByText('Total Usuarios')).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
    expect(screen.getByText('Ventas Mensuales')).toBeInTheDocument()
    expect(screen.getByText('$12,543')).toBeInTheDocument()
    expect(screen.getByText('Compras Mensuales')).toBeInTheDocument()
    expect(screen.getByText('$8,234')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('532')).toBeInTheDocument()
    
    // Verificar que la actividad reciente está presente
    expect(screen.getByText('Actividad Reciente')).toBeInTheDocument()
    expect(screen.getByText('Nueva venta')).toBeInTheDocument()
    expect(screen.getByText('Nuevo usuario')).toBeInTheDocument()
    expect(screen.getByText('Compra registrada')).toBeInTheDocument()
    expect(screen.getByText('Producto actualizado')).toBeInTheDocument()
    expect(screen.getByText('Venta cancelada')).toBeInTheDocument()
    
    // Verificar que los accesos rápidos están presentes
    expect(screen.getByText('Accesos Rápidos')).toBeInTheDocument()
    expect(screen.getByText('Nueva Venta')).toBeInTheDocument()
    expect(screen.getByText('Nuevo Usuario')).toBeInTheDocument()
    expect(screen.getByText('Nueva Compra')).toBeInTheDocument()
    expect(screen.getByText('Ver Reportes')).toBeInTheDocument()
  })

  it('has correct links for quick access buttons', () => {
    render(<Dashboard />)
    
    // Verificar que los enlaces de acceso rápido tienen las URLs correctas
    const newSaleLink = screen.getByText('Nueva Venta').closest('a')
    const newUserLink = screen.getByText('Nuevo Usuario').closest('a')
    const newPurchaseLink = screen.getByText('Nueva Compra').closest('a')
    const viewReportsLink = screen.getByText('Ver Reportes').closest('a')
    const reportsButton = screen.getByText('Ver reportes').closest('a')
    
    expect(newSaleLink).toHaveAttribute('href', '/sales')
    expect(newUserLink).toHaveAttribute('href', '/users')
    expect(newPurchaseLink).toHaveAttribute('href', '/sales')
    expect(viewReportsLink).toHaveAttribute('href', '/sales')
    expect(reportsButton).toHaveAttribute('href', '/sales')
  })

  it('displays all icons correctly', () => {
    render(<Dashboard />)
    
    // Verificar que todos los iconos están presentes
    const usersIcons = screen.getAllByTestId('users-icon')
    const shoppingBagIcons = screen.getAllByTestId('shopping-bag-icon')
    const shoppingCartIcons = screen.getAllByTestId('shopping-cart-icon')
    const tagIcons = screen.getAllByTestId('tag-icon')
    const barChartIcons = screen.getAllByTestId('bar-chart-icon')
    
        expect(usersIcons.length).toBeGreaterThan(0)
    expect(shoppingBagIcons.length).toBeGreaterThan(0)
    expect(shoppingCartIcons.length).toBeGreaterThan(0)
    expect(tagIcons.length).toBeGreaterThan(0)
    expect(barChartIcons.length).toBeGreaterThan(0)
  })

  it('displays recent activity items correctly', () => {
    render(<Dashboard />)
    
    // Verificar que todos los elementos de actividad reciente están presentes
    expect(screen.getByText('Nueva venta')).toBeInTheDocument()
    expect(screen.getByText('Por: Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Hace 5 minutos')).toBeInTheDocument()
    
    expect(screen.getByText('Nuevo usuario')).toBeInTheDocument()
    expect(screen.getByText('Por: María García')).toBeInTheDocument()
    expect(screen.getByText('Hace 1 hora')).toBeInTheDocument()
    
    expect(screen.getByText('Compra registrada')).toBeInTheDocument()
    expect(screen.getByText('Por: Admin')).toBeInTheDocument()
    expect(screen.getByText('Hace 3 horas')).toBeInTheDocument()
    
    expect(screen.getByText('Producto actualizado')).toBeInTheDocument()
    expect(screen.getByText('Por: Carlos López')).toBeInTheDocument()
    expect(screen.getByText('Hace 5 horas')).toBeInTheDocument()
    
    expect(screen.getByText('Venta cancelada')).toBeInTheDocument()
    expect(screen.getByText('Por: Ana Martínez')).toBeInTheDocument()
    expect(screen.getByText('Hace 1 día')).toBeInTheDocument()
  })
})

