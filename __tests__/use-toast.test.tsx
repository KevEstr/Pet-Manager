import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useToast, toast, reducer, resetToastState } from '@/components/ui/use-toast'

// Test component that uses the hook
const TestComponent = () => {
  const { toasts, toast: toastFunc, dismiss } = useToast()
  
  return (
    <div>
      <div data-testid="toast-count">{toasts.length}</div>
      <button 
        data-testid="add-toast" 
        onClick={() => toastFunc({ title: 'Test Toast', description: 'Test Description' })}
      >
        Add Toast
      </button>
      <button 
        data-testid="add-toast-variant" 
        onClick={() => toastFunc({ 
          title: 'Error Toast', 
          description: 'Error Description',
          variant: 'destructive'
        })}
      >
        Add Error Toast
      </button>
      <button 
        data-testid="dismiss-all" 
        onClick={() => dismiss()}
      >
        Dismiss All
      </button>
      <button 
        data-testid="dismiss-first" 
        onClick={() => toasts.length > 0 && dismiss(toasts[0].id)}
      >
        Dismiss First
      </button>
      <div data-testid="toasts-container">
        {toasts.map((toast) => (
          <div key={toast.id} data-testid={`toast-${toast.id}`}>
            <div data-testid={`toast-title-${toast.id}`}>{toast.title}</div>
            <div data-testid={`toast-description-${toast.id}`}>{toast.description}</div>
            <div data-testid={`toast-variant-${toast.id}`}>{toast.variant || 'default'}</div>
            <div data-testid={`toast-open-${toast.id}`}>{String(toast.open)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Mock timers
jest.useFakeTimers()

describe('useToast Hook', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    // Reset the memory state
    resetToastState()
    jest.resetModules()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('initializes with empty toasts array', () => {
    render(<TestComponent />)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0')
  })

  it('adds a toast when toast function is called', () => {
    render(<TestComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
    const titleElement = screen.getByText('Test Toast')
    const descriptionElement = screen.getByText('Test Description')
    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })

  it('adds toast with variant', () => {
    render(<TestComponent />)
    
    const addButton = screen.getByTestId('add-toast-variant')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
    const variantElement = screen.getByText('destructive')
    expect(variantElement).toBeInTheDocument()
  })

  it('limits toasts to TOAST_LIMIT', () => {
    render(<TestComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    
    // Add multiple toasts
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    
    // Should only have 1 toast due to TOAST_LIMIT = 1
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
  })

  it('dismisses specific toast', () => {
    render(<TestComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
    const openElement = screen.getByText('true')
    expect(openElement).toBeInTheDocument()
    
    const dismissButton = screen.getByTestId('dismiss-first')
    fireEvent.click(dismissButton)
    
    const closedElement = screen.getByText('false')
    expect(closedElement).toBeInTheDocument()
  })

  it('dismisses all toasts', () => {
    render(<TestComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
    
    const dismissAllButton = screen.getByTestId('dismiss-all')
    fireEvent.click(dismissAllButton)
    
    const closedElement = screen.getByText('false')
    expect(closedElement).toBeInTheDocument()
  })

  it('handles toast function with all properties', () => {
    const TestAdvancedComponent = () => {
      const { toasts, toast: toastFunc } = useToast()
      
      const addAdvancedToast = () => {
        toastFunc({
          title: 'Advanced Toast',
          description: 'Advanced Description',
          variant: 'destructive',
          action: <button>Action</button>
        })
      }
      
      return (
        <div>
          <div data-testid="toast-count">{toasts.length}</div>
          <button data-testid="add-advanced-toast" onClick={addAdvancedToast}>
            Add Advanced Toast
          </button>
          <div>
            {toasts.map((toast) => (
              <div key={toast.id}>
                <span>{toast.title}</span>
                <span>{toast.description}</span>
                <span>{toast.variant}</span>
                <span>{toast.action ? 'has-action' : 'no-action'}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    render(<TestAdvancedComponent />)
    
    const addButton = screen.getByTestId('add-advanced-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1')
    expect(screen.getByText('Advanced Toast')).toBeInTheDocument()
    expect(screen.getByText('has-action')).toBeInTheDocument()
  })

  it('handles toast update functionality', () => {
    const TestUpdateComponent = () => {
      const { toasts, toast: toastFunc } = useToast()
      const [currentToast, setCurrentToast] = React.useState<any>(null)
      
      const addToast = () => {
        const result = toastFunc({
          title: 'Original Title',
          description: 'Original Description'
        })
        setCurrentToast(result)
      }
      
      const updateToast = () => {
        if (currentToast) {
          currentToast.update({
            title: 'Updated Title',
            description: 'Updated Description'
          })
        }
      }
      
      return (
        <div>
          <div data-testid="toast-count">{toasts.length}</div>
          <button data-testid="add-toast" onClick={addToast}>Add Toast</button>
          <button data-testid="update-toast" onClick={updateToast}>Update Toast</button>
          <div>
            {toasts.map((toast) => (
              <div key={toast.id}>
                <span>{toast.title}</span>
                <span>{toast.description}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    render(<TestUpdateComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByText('Original Title')).toBeInTheDocument()
    
    const updateButton = screen.getByTestId('update-toast')
    fireEvent.click(updateButton)
    
    expect(screen.getByText('Updated Title')).toBeInTheDocument()
  })

  it('handles toast dismiss functionality', () => {
    const TestDismissComponent = () => {
      const { toasts, toast: toastFunc } = useToast()
      const [currentToast, setCurrentToast] = React.useState<any>(null)
      
      const addToast = () => {
        const result = toastFunc({
          title: 'Dismissible Toast',
          description: 'Will be dismissed'
        })
        setCurrentToast(result)
      }
      
      const dismissToast = () => {
        if (currentToast) {
          currentToast.dismiss()
        }
      }
      
      return (
        <div>
          <div data-testid="toast-count">{toasts.length}</div>
          <button data-testid="add-toast" onClick={addToast}>Add Toast</button>
          <button data-testid="dismiss-toast" onClick={dismissToast}>Dismiss Toast</button>
          {toasts.map((toast) => (
            <div key={toast.id} data-testid={`toast-${toast.id}`}>
              <div data-testid={`toast-open-${toast.id}`}>{String(toast.open)}</div>
            </div>
          ))}
        </div>
      )
    }
    
    render(<TestDismissComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('toast-open-1')).toHaveTextContent('true')
    
    const dismissButton = screen.getByTestId('dismiss-toast')
    fireEvent.click(dismissButton)
    
    expect(screen.getByTestId('toast-open-1')).toHaveTextContent('false')
  })

  it('handles onOpenChange callback', () => {
    const TestOnOpenChangeComponent = () => {
      const { toasts, toast: toastFunc } = useToast()
      const [openChangeCount, setOpenChangeCount] = React.useState(0)
      
      const addToast = () => {
        toastFunc({
          title: 'Test Toast',
          onOpenChange: (open) => {
            if (!open) {
              setOpenChangeCount(prev => prev + 1)
            }
          }
        })
      }
      
      return (
        <div>
          <div data-testid="open-change-count">{openChangeCount}</div>
          <button data-testid="add-toast" onClick={addToast}>Add Toast</button>
          {toasts.map((toast) => (
            <div key={toast.id} data-testid={`toast-${toast.id}`}>
              <button 
                data-testid={`close-toast-${toast.id}`}
                onClick={() => toast.onOpenChange?.(false)}
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )
    }
    
    render(<TestOnOpenChangeComponent />)
    
    const addButton = screen.getByTestId('add-toast')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('open-change-count')).toHaveTextContent('0')
    
    const closeButton = screen.getByTestId('close-toast-1')
    fireEvent.click(closeButton)
    
    expect(screen.getByTestId('open-change-count')).toHaveTextContent('1')
  })

  it('handles multiple components using the hook', () => {
    const Component1 = () => {
      const { toasts, toast: toastFunc } = useToast()
      return (
        <div>
          <div data-testid="component1-count">{toasts.length}</div>
          <button data-testid="component1-add" onClick={() => toastFunc({ title: 'Component 1 Toast' })}>
            Add Component 1 Toast
          </button>
        </div>
      )
    }
    
    const Component2 = () => {
      const { toasts, toast: toastFunc } = useToast()
      return (
        <div>
          <div data-testid="component2-count">{toasts.length}</div>
          <button data-testid="component2-add" onClick={() => toastFunc({ title: 'Component 2 Toast' })}>
            Add Component 2 Toast
          </button>
        </div>
      )
    }
    
    render(
      <div>
        <Component1 />
        <Component2 />
      </div>
    )
    
    const component1Add = screen.getByTestId('component1-add')
    fireEvent.click(component1Add)
    
    // Both components should see the same toast
    expect(screen.getByTestId('component1-count')).toHaveTextContent('1')
    expect(screen.getByTestId('component2-count')).toHaveTextContent('1')
  })
})

describe('toast reducer', () => {
  beforeEach(() => {
    resetToastState()
  })
  
  const initialState = { toasts: [] }
  
  it('handles ADD_TOAST action', () => {
    const toast = {
      id: '1',
      title: 'Test Toast',
      description: 'Test Description',
      open: true
    }
    
    const action = {
      type: 'ADD_TOAST' as const,
      toast
    }
    
    const newState = reducer(initialState, action)
    
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0]).toEqual(toast)
  })

  it('handles UPDATE_TOAST action', () => {
    const initialToast = {
      id: '1',
      title: 'Original Title',
      description: 'Original Description',
      open: true
    }
    
    const stateWithToast = { toasts: [initialToast] }
    
    const action = {
      type: 'UPDATE_TOAST' as const,
      toast: {
        id: '1',
        title: 'Updated Title'
      }
    }
    
    const newState = reducer(stateWithToast, action)
    
    expect(newState.toasts[0].title).toBe('Updated Title')
    expect(newState.toasts[0].description).toBe('Original Description')
    expect(newState.toasts[0].id).toBe('1')
  })

  it('handles DISMISS_TOAST action with specific ID', () => {
    const initialToast = {
      id: '1',
      title: 'Test Toast',
      open: true
    }
    
    const stateWithToast = { toasts: [initialToast] }
    
    const action = {
      type: 'DISMISS_TOAST' as const,
      toastId: '1'
    }
    
    const newState = reducer(stateWithToast, action)
    
    expect(newState.toasts[0].open).toBe(false)
  })

  it('handles DISMISS_TOAST action without ID (dismiss all)', () => {
    const initialToasts = [
      { id: '1', title: 'Toast 1', open: true },
      { id: '2', title: 'Toast 2', open: true }
    ]
    
    const stateWithToasts = { toasts: initialToasts }
    
    const action = {
      type: 'DISMISS_TOAST' as const
    }
    
    const newState = reducer(stateWithToasts, action)
    
    expect(newState.toasts[0].open).toBe(false)
    expect(newState.toasts[1].open).toBe(false)
  })

  it('handles REMOVE_TOAST action with specific ID', () => {
    const initialToasts = [
      { id: '1', title: 'Toast 1' },
      { id: '2', title: 'Toast 2' }
    ]
    
    const stateWithToasts = { toasts: initialToasts }
    
    const action = {
      type: 'REMOVE_TOAST' as const,
      toastId: '1'
    }
    
    const newState = reducer(stateWithToasts, action)
    
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('2')
  })

  it('handles REMOVE_TOAST action without ID (remove all)', () => {
    const initialToasts = [
      { id: '1', title: 'Toast 1' },
      { id: '2', title: 'Toast 2' }
    ]
    
    const stateWithToasts = { toasts: initialToasts }
    
    const action = {
      type: 'REMOVE_TOAST' as const
    }
    
    const newState = reducer(stateWithToasts, action)
    
    expect(newState.toasts).toHaveLength(0)
  })
})

describe('standalone toast function', () => {
  beforeEach(() => {
    resetToastState()
  })
  
  it('can be called without component', () => {
    const result = toast({ title: 'Standalone Toast' })
    
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('dismiss')
    expect(result).toHaveProperty('update')
    expect(typeof result.id).toBe('string')
    expect(typeof result.dismiss).toBe('function')
    expect(typeof result.update).toBe('function')
  })

  it('returns unique IDs for different toasts', () => {
    const toast1 = toast({ title: 'Toast 1' })
    const toast2 = toast({ title: 'Toast 2' })
    
    expect(toast1.id).not.toBe(toast2.id)
  })
}) 