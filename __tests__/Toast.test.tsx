import { render, screen, act } from '@testing-library/react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

describe('Toast Component', () => {
  const TestComponent = () => {
    const { toast } = useToast()
    
    return (
      <div>
        <button onClick={() => toast({ title: 'Test Toast', description: 'This is a test toast' })}>
          Show Toast
        </button>
        <button onClick={() => toast({ title: 'Error Toast', variant: 'destructive' })}>
          Show Error Toast
        </button>
        <button onClick={() => toast({ title: 'Success Toast', variant: 'success' })}>
          Show Success Toast
        </button>
        <Toaster />
      </div>
    )
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('shows toast with title and description', () => {
    render(<TestComponent />)
    
    const showToastButton = screen.getByText('Show Toast')
    act(() => {
      showToastButton.click()
    })
    
    expect(screen.getByText('Test Toast')).toBeInTheDocument()
    expect(screen.getByText('This is a test toast')).toBeInTheDocument()
  })

  it('shows error toast with correct styling', () => {
    render(<TestComponent />)
    
    const showErrorToastButton = screen.getByText('Show Error Toast')
    act(() => {
      showErrorToastButton.click()
    })
    
    const toast = screen.getByText('Error Toast')
    expect(toast).toBeInTheDocument()
    expect(toast.closest('[role="alert"]')).toHaveClass('bg-destructive')
  })

  it('shows success toast with correct styling', () => {
    render(<TestComponent />)
    
    const showSuccessToastButton = screen.getByText('Show Success Toast')
    act(() => {
      showSuccessToastButton.click()
    })
    
    const toast = screen.getByText('Success Toast')
    expect(toast).toBeInTheDocument()
    expect(toast.closest('[role="alert"]')).toHaveClass('bg-green-500')
  })

  it('automatically dismisses toast after duration', () => {
    render(<TestComponent />)
    
    const showToastButton = screen.getByText('Show Toast')
    act(() => {
      showToastButton.click()
    })
    
    expect(screen.getByText('Test Toast')).toBeInTheDocument()
    
    act(() => {
      jest.advanceTimersByTime(5000) // Default duration
    })
    
    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument()
  })

  it('shows multiple toasts', () => {
    render(<TestComponent />)
    
    const showToastButton = screen.getByText('Show Toast')
    const showErrorToastButton = screen.getByText('Show Error Toast')
    
    act(() => {
      showToastButton.click()
      showErrorToastButton.click()
    })
    
    expect(screen.getByText('Test Toast')).toBeInTheDocument()
    expect(screen.getByText('Error Toast')).toBeInTheDocument()
  })

  it('dismisses toast when close button is clicked', () => {
    render(<TestComponent />)
    
    const showToastButton = screen.getByText('Show Toast')
    act(() => {
      showToastButton.click()
    })
    
    const closeButton = screen.getByRole('button', { name: /close/i })
    act(() => {
      closeButton.click()
    })
    
    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument()
  })
}) 