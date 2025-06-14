import { render, screen, fireEvent } from '@testing-library/react'
import { SidebarProvider } from '@/components/sidebar-provider'
import { useSidebar } from '@/hooks/use-sidebar'

// Componente de prueba que usa el hook useSidebar
const TestComponent = () => {
  const { isOpen, toggle } = useSidebar()
  return (
    <div>
      <div data-testid="sidebar-state">{isOpen ? 'open' : 'closed'}</div>
      <button onClick={toggle}>Toggle Sidebar</button>
    </div>
  )
}

describe('SidebarProvider Component', () => {
  it('provides initial closed state', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed')
  })

  it('toggles sidebar state', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open')
    
    fireEvent.click(toggleButton)
    
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed')
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <SidebarProvider>
        <div>Test Child</div>
      </SidebarProvider>
    )
    
    expect(getByText('Test Child')).toBeInTheDocument()
  })
}) 