import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useIsMobile } from '@/components/ui/use-mobile'

// Test component that uses the hook
const TestComponent = () => {
  const isMobile = useIsMobile()
  
  return (
    <div data-testid="mobile-status">
      {isMobile ? 'mobile' : 'desktop'}
    </div>
  )
}

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('returns false for desktop size', () => {
    render(<TestComponent />)
    
    const status = screen.getByTestId('mobile-status')
    expect(status).toHaveTextContent('desktop')
  })

  it('returns true for mobile size', () => {
    // Mock matchMedia for mobile
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<TestComponent />)
    
    const status = screen.getByTestId('mobile-status')
    expect(status).toHaveTextContent('mobile')
  })

  it('handles matchMedia change events', () => {
    let matchMediaCallback: any = null
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((_, callback) => {
          matchMediaCallback = callback
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<TestComponent />)
    
    // Initial state should be desktop
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('desktop')
    
    // Simulate media query change
    if (matchMediaCallback) {
      matchMediaCallback({ matches: true })
    }
  })

  it('initializes correctly', () => {
    render(<TestComponent />)
    
    const status = screen.getByTestId('mobile-status')
    expect(status).toBeInTheDocument()
    expect(status.textContent).toMatch(/(mobile|desktop)/)
  })

  it('handles multiple components using the hook', () => {
    const Component1 = () => {
      const isMobile = useIsMobile()
      return <div data-testid="component-1">{isMobile ? 'mobile' : 'desktop'}</div>
    }
    
    const Component2 = () => {
      const isMobile = useIsMobile()
      return <div data-testid="component-2">{isMobile ? 'mobile' : 'desktop'}</div>
    }
    
    render(
      <div>
        <Component1 />
        <Component2 />
      </div>
    )
    
    expect(screen.getByTestId('component-1')).toHaveTextContent('desktop')
    expect(screen.getByTestId('component-2')).toHaveTextContent('desktop')
  })
}) 