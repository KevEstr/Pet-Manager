import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SidebarProvider, useSidebar } from '@/components/sidebar-provider'

// Test component to use the hook
const TestComponent = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar()
  
  return (
    <div>
      <div data-testid="sidebar-status">{isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle-button" onClick={toggleSidebar}>
        Toggle
      </button>
      <button data-testid="close-button" onClick={closeSidebar}>
        Close
      </button>
    </div>
  )
}

// Test component without provider to test error
const TestComponentWithoutProvider = () => {
  try {
    useSidebar()
    return <div data-testid="no-error">No error</div>
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>
  }
}

describe('SidebarProvider', () => {
  it('provides sidebar context to children', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open')
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
  })

  it('initializes with isOpen as true', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open')
  })

  it('toggles sidebar state when toggleSidebar is called', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    const toggleButton = screen.getByTestId('toggle-button')
    const status = screen.getByTestId('sidebar-status')
    
    // Initially open
    expect(status).toHaveTextContent('open')
    
    // Toggle to closed
    fireEvent.click(toggleButton)
    expect(status).toHaveTextContent('closed')
    
    // Toggle back to open
    fireEvent.click(toggleButton)
    expect(status).toHaveTextContent('open')
  })

  it('closes sidebar when closeSidebar is called', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    const closeButton = screen.getByTestId('close-button')
    const status = screen.getByTestId('sidebar-status')
    
    // Initially open
    expect(status).toHaveTextContent('open')
    
    // Close sidebar
    fireEvent.click(closeButton)
    expect(status).toHaveTextContent('closed')
    
    // Close again (should remain closed)
    fireEvent.click(closeButton)
    expect(status).toHaveTextContent('closed')
  })

  it('handles multiple toggle operations correctly', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    const toggleButton = screen.getByTestId('toggle-button')
    const closeButton = screen.getByTestId('close-button')
    const status = screen.getByTestId('sidebar-status')
    
    // Initially open
    expect(status).toHaveTextContent('open')
    
    // Toggle to closed
    fireEvent.click(toggleButton)
    expect(status).toHaveTextContent('closed')
    
    // Close (should remain closed)
    fireEvent.click(closeButton)
    expect(status).toHaveTextContent('closed')
    
    // Toggle to open
    fireEvent.click(toggleButton)
    expect(status).toHaveTextContent('open')
  })

  it('memoizes context value properly', () => {
    const TestMemoComponent = () => {
      const context = useSidebar()
      const [renderCount, setRenderCount] = React.useState(0)
      
      React.useEffect(() => {
        setRenderCount(prev => prev + 1)
      }, [context])
      
      return (
        <div>
          <div data-testid="render-count">{renderCount}</div>
          <div data-testid="sidebar-status">{context.isOpen ? 'open' : 'closed'}</div>
          <button data-testid="toggle-button" onClick={context.toggleSidebar}>
            Toggle
          </button>
        </div>
      )
    }
    
    render(
      <SidebarProvider>
        <TestMemoComponent />
      </SidebarProvider>
    )
    
    const toggleButton = screen.getByTestId('toggle-button')
    const renderCount = screen.getByTestId('render-count')
    
    // Initial render
    expect(renderCount).toHaveTextContent('1')
    
    // Toggle should cause re-render due to state change
    fireEvent.click(toggleButton)
    expect(renderCount).toHaveTextContent('2')
  })

  it('provides correct context properties', () => {
    const TestPropsComponent = () => {
      const context = useSidebar()
      
      return (
        <div>
          <div data-testid="has-isopen">{typeof context.isOpen === 'boolean' ? 'true' : 'false'}</div>
          <div data-testid="has-toggle">{typeof context.toggleSidebar === 'function' ? 'true' : 'false'}</div>
          <div data-testid="has-close">{typeof context.closeSidebar === 'function' ? 'true' : 'false'}</div>
        </div>
      )
    }
    
    render(
      <SidebarProvider>
        <TestPropsComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('has-isopen')).toHaveTextContent('true')
    expect(screen.getByTestId('has-toggle')).toHaveTextContent('true')
    expect(screen.getByTestId('has-close')).toHaveTextContent('true')
  })

  it('renders children properly', () => {
    render(
      <SidebarProvider>
        <div data-testid="child-element">Child Content</div>
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('child-element')).toHaveTextContent('Child Content')
  })

  it('handles multiple children', () => {
    render(
      <SidebarProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <TestComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('child-1')).toHaveTextContent('Child 1')
    expect(screen.getByTestId('child-2')).toHaveTextContent('Child 2')
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open')
  })
})

describe('useSidebar hook', () => {
  it('throws error when used outside SidebarProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<TestComponentWithoutProvider />)
    
    expect(screen.getByTestId('error')).toHaveTextContent(
      'useSidebar must be used within a SidebarProvider'
    )
    
    consoleSpy.mockRestore()
  })

  it('works correctly when used within provider', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )
    
    expect(screen.getByTestId('sidebar-status')).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
}) 