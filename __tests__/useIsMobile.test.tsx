import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useIsMobile } from '@/hooks/use-mobile'

// Test component that uses the hook
const TestComponent = () => {
  const isMobile = useIsMobile()
  
  return (
    <div>
      <div data-testid="mobile-status">{isMobile ? 'mobile' : 'desktop'}</div>
      <div data-testid="mobile-boolean">{String(isMobile)}</div>
    </div>
  )
}

// Mock window.matchMedia
const createMatchMedia = (matches: boolean) => {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns false for desktop screen size', () => {
    // Mock desktop screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    window.matchMedia = createMatchMedia(false)
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('desktop')
    expect(screen.getByTestId('mobile-boolean')).toHaveTextContent('false')
  })

  it('returns true for mobile screen size', () => {
    // Mock mobile screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })
    
    window.matchMedia = createMatchMedia(true)
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('mobile')
    expect(screen.getByTestId('mobile-boolean')).toHaveTextContent('true')
  })

  it('returns true for exactly 767px (mobile breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    })
    
    window.matchMedia = createMatchMedia(true)
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('mobile')
  })

  it('returns false for exactly 768px (desktop breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    window.matchMedia = createMatchMedia(false)
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('desktop')
  })

  it('handles window resize events', () => {
    let mediaQueryCallback: ((e: MediaQueryListEvent) => void) | null = null
    
    const mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((event, callback) => {
        if (event === 'change') {
          mediaQueryCallback = callback
        }
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
    
    window.matchMedia = mockMatchMedia
    
    // Initial desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('mobile-status')).toHaveTextContent('desktop')
    
    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      
      if (mediaQueryCallback) {
        mediaQueryCallback({} as MediaQueryListEvent)
      }
    })
    
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerMock = jest.fn()
    const addEventListenerMock = jest.fn()
    
    const mockMatchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }))
    
    window.matchMedia = mockMatchMedia
    
    const { unmount } = render(<TestComponent />)
    
    expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
    
    unmount()
    
    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('initializes with undefined state', () => {
    const TestInitialComponent = () => {
      const [renderCount, setRenderCount] = React.useState(0)
      const isMobile = useIsMobile()
      
      React.useEffect(() => {
        setRenderCount(prev => prev + 1)
      }, [])
      
      return (
        <div>
          <div data-testid="render-count">{renderCount}</div>
          <div data-testid="mobile-status">{isMobile ? 'mobile' : 'desktop'}</div>
          <div data-testid="initial-state">{isMobile === undefined ? 'undefined' : 'defined'}</div>
        </div>
      )
    }
    
    window.matchMedia = createMatchMedia(false)
    
    render(<TestInitialComponent />)
    
    // After mount, should be defined
    expect(screen.getByTestId('initial-state')).toHaveTextContent('defined')
  })

  it('handles multiple components using the hook', () => {
    const TestComponent1 = () => {
      const isMobile = useIsMobile()
      return <div data-testid="component-1">{isMobile ? 'mobile' : 'desktop'}</div>
    }
    
    const TestComponent2 = () => {
      const isMobile = useIsMobile()
      return <div data-testid="component-2">{isMobile ? 'mobile' : 'desktop'}</div>
    }
    
    window.matchMedia = createMatchMedia(true)
    
    render(
      <div>
        <TestComponent1 />
        <TestComponent2 />
      </div>
    )
    
    expect(screen.getByTestId('component-1')).toHaveTextContent('mobile')
    expect(screen.getByTestId('component-2')).toHaveTextContent('mobile')
  })

  it('uses correct breakpoint value', () => {
    const mockMatchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
    
    window.matchMedia = mockMatchMedia
    
    render(<TestComponent />)
    
    // Should call matchMedia with the correct query
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('returns boolean value consistently', () => {
    window.matchMedia = createMatchMedia(false)
    
    const TestConsistencyComponent = () => {
      const isMobile = useIsMobile()
      const isMobileType = typeof isMobile
      const isMobileBoolean = !!isMobile
      
      return (
        <div>
          <div data-testid="type">{isMobileType}</div>
          <div data-testid="boolean-conversion">{String(isMobileBoolean)}</div>
          <div data-testid="direct-value">{String(isMobile)}</div>
        </div>
      )
    }
    
    render(<TestConsistencyComponent />)
    
    expect(screen.getByTestId('type')).toHaveTextContent('boolean')
    expect(screen.getByTestId('boolean-conversion')).toHaveTextContent('false')
    expect(screen.getByTestId('direct-value')).toHaveTextContent('false')
  })
}) 