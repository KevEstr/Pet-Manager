import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '@/components/ui/toast'

// Mock lucide-react
jest.mock('lucide-react', () => ({
  X: ({ className, ...props }: any) => (
    <div data-testid="x-icon" className={className} {...props}>
      X
    </div>
  ),
}))

// Mock next/router if used
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}))

describe('Toast Components - Comprehensive Test Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('ToastProvider', () => {
    it('renders children correctly', () => {
      render(
        <ToastProvider>
          <div data-testid="toast-child">Toast Content</div>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('toast-child')).toHaveTextContent('Toast Content')
    })

    it('passes props correctly including duration', () => {
      const { container } = render(
        <ToastProvider data-testid="toast-provider" duration={5000}>
          <div>Content</div>
        </ToastProvider>
      )
      
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles swipeDirection prop', () => {
      render(
        <ToastProvider swipeDirection="right">
          <div data-testid="provider-content">Content</div>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('provider-content')).toBeInTheDocument()
    })

    it('handles swipeThreshold prop', () => {
      render(
        <ToastProvider swipeThreshold={100}>
          <div data-testid="provider-content">Content</div>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('provider-content')).toBeInTheDocument()
    })

    it('renders without any props', () => {
      render(
        <ToastProvider>
          <div data-testid="default-content">Default Content</div>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('default-content')).toBeInTheDocument()
    })
  })

  describe('ToastViewport', () => {
    it('renders with default classes', () => {
      render(<ToastViewport data-testid="toast-viewport" />)
      
      const viewport = screen.getByTestId('toast-viewport')
      expect(viewport).toHaveClass(
        'fixed',
        'top-0',
        'z-[100]',
        'flex',
        'max-h-screen',
        'w-full',
        'flex-col-reverse',
        'p-4'
      )
    })

    it('renders with responsive classes', () => {
      render(<ToastViewport data-testid="toast-viewport" />)
      
      const viewport = screen.getByTestId('toast-viewport')
      expect(viewport).toHaveClass('sm:bottom-0', 'sm:right-0', 'sm:top-auto', 'sm:flex-col', 'md:max-w-[420px]')
    })

    it('accepts custom className and merges with defaults', () => {
      render(<ToastViewport data-testid="toast-viewport" className="custom-viewport-class" />)
      
      const viewport = screen.getByTestId('toast-viewport')
      expect(viewport).toHaveClass('custom-viewport-class', 'fixed', 'top-0')
    })

    it('accepts hotkey prop', () => {
      render(<ToastViewport data-testid="toast-viewport" hotkey={['F8']} />)
      
      expect(screen.getByTestId('toast-viewport')).toBeInTheDocument()
    })

    it('accepts label prop for accessibility', () => {
      render(<ToastViewport data-testid="toast-viewport" label="Notifications" />)
      
      expect(screen.getByTestId('toast-viewport')).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLOListElement>()
      render(<ToastViewport ref={ref} data-testid="toast-viewport" />)
      
      expect(ref.current).toBeInstanceOf(HTMLOListElement)
    })
  })

  describe('Toast', () => {
    it('renders with default variant and all default classes', () => {
      render(<Toast data-testid="toast">Toast content</Toast>)
      
      const toast = screen.getByTestId('toast')
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveClass(
        'group',
        'pointer-events-auto',
        'relative',
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'space-x-4',
        'overflow-hidden',
        'rounded-md',
        'border',
        'p-6',
        'pr-8',
        'shadow-lg',
        'transition-all'
      )
    })

    it('renders with destructive variant and includes variant-specific classes', () => {
      render(
        <Toast data-testid="toast" variant="destructive">
          Toast content
        </Toast>
      )
      
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveClass(
        'destructive',
        'group',
        'border-destructive',
        'bg-destructive',
        'text-destructive-foreground'
      )
    })

    it('includes animation classes for state transitions', () => {
      render(<Toast data-testid="toast">Toast content</Toast>)
      
      const toast = screen.getByTestId('toast')
      // Check for animation-related classes
      expect(toast.className).toMatch(/data-\[state=open\]:animate-in/)
      expect(toast.className).toMatch(/data-\[state=closed\]:animate-out/)
      expect(toast.className).toMatch(/data-\[state=closed\]:fade-out-80/)
    })

    it('includes swipe gesture classes', () => {
      render(<Toast data-testid="toast">Toast content</Toast>)
      
      const toast = screen.getByTestId('toast')
      expect(toast.className).toMatch(/data-\[swipe=cancel\]:translate-x-0/)
      expect(toast.className).toMatch(/data-\[swipe=end\]:translate-x-\[var\(--radix-toast-swipe-end-x\)\]/)
      expect(toast.className).toMatch(/data-\[swipe=move\]:translate-x-\[var\(--radix-toast-swipe-move-x\)\]/)
    })

    it('accepts custom className and merges correctly', () => {
      render(
        <Toast data-testid="toast" className="custom-toast-class">
          Toast content
        </Toast>
      )
      
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveClass('custom-toast-class', 'group', 'pointer-events-auto')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>()
      render(
        <Toast ref={ref} data-testid="toast">
          Toast content
        </Toast>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLLIElement)
    })

    it('handles duration prop', () => {
      render(
        <Toast data-testid="toast" duration={3000}>
          Toast content
        </Toast>
      )
      
      expect(screen.getByTestId('toast')).toBeInTheDocument()
    })

    it('handles type prop', () => {
      render(
        <Toast data-testid="toast" type="foreground">
          Toast content
        </Toast>
      )
      
      expect(screen.getByTestId('toast')).toBeInTheDocument()
    })

    it('handles open state', () => {
      render(
        <Toast data-testid="toast" open={true}>
          Toast content
        </Toast>
      )
      
      expect(screen.getByTestId('toast')).toBeInTheDocument()
    })

    it('handles onOpenChange callback', () => {
      const onOpenChange = jest.fn()
      render(
        <Toast data-testid="toast" onOpenChange={onOpenChange}>
          Toast content
        </Toast>
      )
      
      expect(screen.getByTestId('toast')).toBeInTheDocument()
      // onOpenChange would be called by Radix internally
    })
  })

  describe('ToastAction', () => {
    it('renders as button with correct classes and required altText', () => {
      render(
        <ToastAction data-testid="toast-action" altText="Perform action">
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveClass(
        'inline-flex',
        'h-8',
        'shrink-0',
        'items-center',
        'justify-center',
        'rounded-md',
        'border',
        'bg-transparent',
        'px-3',
        'text-sm',
        'font-medium',
        'ring-offset-background',
        'transition-colors'
      )
    })

    it('includes focus and hover state classes', () => {
      render(
        <ToastAction data-testid="toast-action" altText="Perform action">
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveClass(
        'hover:bg-secondary',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2'
      )
    })

    it('includes disabled state classes', () => {
      render(
        <ToastAction data-testid="toast-action" altText="Disabled action" disabled>
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveClass(
        'disabled:pointer-events-none',
        'disabled:opacity-50'
      )
      expect(action).toBeDisabled()
    })

    it('includes destructive group variant classes', () => {
      render(
        <div className="group destructive">
          <ToastAction data-testid="toast-action" altText="Destructive action">
            Action
          </ToastAction>
        </div>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action.className).toMatch(/group-\[\.destructive\]:border-muted\/40/)
      expect(action.className).toMatch(/group-\[\.destructive\]:hover:border-destructive\/30/)
    })

    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(
        <ToastAction 
          data-testid="toast-action" 
          altText="Clickable action"
          onClick={handleClick}
        >
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      await user.click(action)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard events (Enter and Space)', async () => {
      const handleClick = jest.fn()
      render(
        <ToastAction 
          data-testid="toast-action" 
          altText="Keyboard accessible action"
          onClick={handleClick}
        >
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      action.focus()
      
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('accepts custom className', () => {
      render(
        <ToastAction 
          data-testid="toast-action" 
          altText="Custom styled action"
          className="custom-action-class"
        >
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveClass('custom-action-class', 'inline-flex')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(
        <ToastAction 
          ref={ref} 
          data-testid="toast-action" 
          altText="Ref forwarded action"
        >
          Action
        </ToastAction>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('supports different button types', () => {
      render(
        <ToastAction 
          data-testid="toast-action" 
          altText="Submit action"
          type="submit"
        >
          Submit
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveAttribute('type', 'submit')
    })
  })

  describe('ToastClose', () => {
    it('renders close button with X icon and correct classes', () => {
      render(<ToastClose data-testid="toast-close" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toBeInTheDocument()
      expect(close).toHaveAttribute('toast-close', '')
      expect(close).toHaveClass(
        'absolute',
        'right-2',
        'top-2',
        'rounded-md',
        'p-1',
        'text-foreground/50',
        'opacity-0',
        'transition-opacity'
      )
      
      const xIcon = screen.getByTestId('x-icon')
      expect(xIcon).toBeInTheDocument()
      expect(xIcon).toHaveClass('h-4', 'w-4')
    })

    it('includes hover and focus state classes', () => {
      render(<ToastClose data-testid="toast-close" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toHaveClass(
        'hover:text-foreground',
        'focus:opacity-100',
        'focus:outline-none',
        'focus:ring-2',
        'group-hover:opacity-100'
      )
    })

    it('includes destructive group variant classes', () => {
      render(
        <div className="group destructive">
          <ToastClose data-testid="toast-close" />
        </div>
      )
      
      const close = screen.getByTestId('toast-close')
      expect(close.className).toMatch(/group-\[\.destructive\]:text-red-300/)
      expect(close.className).toMatch(/group-\[\.destructive\]:hover:text-red-50/)
      expect(close.className).toMatch(/group-\[\.destructive\]:focus:ring-red-400/)
    })

    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(<ToastClose data-testid="toast-close" onClick={handleClick} />)
      
      const close = screen.getByTestId('toast-close')
      await user.click(close)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard navigation', async () => {
      const handleClick = jest.fn()
      render(<ToastClose data-testid="toast-close" onClick={handleClick} />)
      
      const close = screen.getByTestId('toast-close')
      close.focus()
      
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('accepts custom className', () => {
      render(<ToastClose data-testid="toast-close" className="custom-close-class" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toHaveClass('custom-close-class', 'absolute', 'right-2')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<ToastClose ref={ref} data-testid="toast-close" />)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('has correct accessibility attributes', () => {
      render(<ToastClose data-testid="toast-close" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toHaveAttribute('toast-close', '')
    })
  })

  describe('ToastTitle', () => {
    it('renders title with correct classes', () => {
      render(<ToastTitle data-testid="toast-title">Toast Title</ToastTitle>)
      
      const title = screen.getByTestId('toast-title')
      expect(title).toHaveTextContent('Toast Title')
      expect(title).toHaveClass('text-sm', 'font-semibold')
    })

    it('accepts custom className and merges correctly', () => {
      render(
        <ToastTitle data-testid="toast-title" className="custom-title-class">
          Custom Title
        </ToastTitle>
      )
      
      const title = screen.getByTestId('toast-title')
      expect(title).toHaveClass('custom-title-class', 'text-sm', 'font-semibold')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <ToastTitle ref={ref} data-testid="toast-title">
          Ref Title
        </ToastTitle>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders React nodes as children', () => {
      render(
        <ToastTitle data-testid="toast-title">
          <span data-testid="title-span">Complex Title</span>
          <em> with emphasis</em>
        </ToastTitle>
      )
      
      expect(screen.getByTestId('title-span')).toHaveTextContent('Complex Title')
      expect(screen.getByTestId('toast-title')).toHaveTextContent('Complex Title with emphasis')
    })

    it('handles long titles correctly', () => {
      const longTitle = 'This is a very long title that might need to wrap or truncate depending on the design requirements and available space'
      render(
        <ToastTitle data-testid="toast-title">
          {longTitle}
        </ToastTitle>
      )
      
      expect(screen.getByTestId('toast-title')).toHaveTextContent(longTitle)
    })
  })

  describe('ToastDescription', () => {
    it('renders description with correct classes', () => {
      render(
        <ToastDescription data-testid="toast-description">
          Toast Description
        </ToastDescription>
      )
      
      const description = screen.getByTestId('toast-description')
      expect(description).toHaveTextContent('Toast Description')
      expect(description).toHaveClass('text-sm', 'opacity-90')
    })

    it('accepts custom className and merges correctly', () => {
      render(
        <ToastDescription 
          data-testid="toast-description" 
          className="custom-description-class"
        >
          Custom Description
        </ToastDescription>
      )
      
      const description = screen.getByTestId('toast-description')
      expect(description).toHaveClass('custom-description-class', 'text-sm', 'opacity-90')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <ToastDescription ref={ref} data-testid="toast-description">
          Ref Description
        </ToastDescription>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders React nodes as children', () => {
      render(
        <ToastDescription data-testid="toast-description">
          <span data-testid="desc-span">Complex Description</span>
          <br />
          <small>Additional info</small>
        </ToastDescription>
      )
      
      expect(screen.getByTestId('desc-span')).toHaveTextContent('Complex Description')
      expect(screen.getByText('Additional info')).toBeInTheDocument()
    })

    it('handles multiline descriptions', () => {
      const multilineDesc = `Line 1 of description
Line 2 of description
Line 3 of description`
      render(
        <ToastDescription data-testid="toast-description">
          {multilineDesc}
        </ToastDescription>
      )
      
      expect(screen.getByTestId('toast-description')).toHaveTextContent(multilineDesc)
    })
  })

  describe('Complete Toast Integration', () => {
    it('renders complete toast with all components and proper structure', () => {
      render(
        <ToastProvider>
          <ToastViewport>
            <Toast data-testid="complete-toast" variant="default">
              <div className="grid gap-1">
                <ToastTitle data-testid="complete-title">Success Notification</ToastTitle>
                <ToastDescription data-testid="complete-description">
                  Your operation completed successfully. Click undo to reverse the action.
                </ToastDescription>
              </div>
              <ToastAction 
                data-testid="complete-action" 
                altText="Undo the last action"
                className="ml-auto"
              >
                Undo
              </ToastAction>
              <ToastClose data-testid="complete-close" />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('complete-toast')).toBeInTheDocument()
      expect(screen.getByTestId('complete-title')).toHaveTextContent('Success Notification')
      expect(screen.getByTestId('complete-description')).toHaveTextContent(
        'Your operation completed successfully. Click undo to reverse the action.'
      )
      expect(screen.getByTestId('complete-action')).toHaveTextContent('Undo')
      expect(screen.getByTestId('complete-close')).toBeInTheDocument()
    })

    it('renders destructive toast with proper styling', () => {
      render(
        <ToastProvider>
          <ToastViewport>
            <Toast data-testid="destructive-toast" variant="destructive">
              <div className="grid gap-1">
                <ToastTitle data-testid="error-title">Error!</ToastTitle>
                <ToastDescription data-testid="error-description">
                  Something went wrong. Please try again.
                </ToastDescription>
              </div>
              <ToastAction 
                data-testid="retry-action" 
                altText="Retry the failed operation"
              >
                Retry
              </ToastAction>
              <ToastClose data-testid="error-close" />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )
      
      const toast = screen.getByTestId('destructive-toast')
      expect(toast).toHaveClass('destructive')
      expect(screen.getByTestId('error-title')).toHaveTextContent('Error!')
      expect(screen.getByTestId('error-description')).toHaveTextContent('Something went wrong. Please try again.')
    })

    it('handles all interactions in complete toast', async () => {
      const handleAction = jest.fn()
      const handleClose = jest.fn()
      
      render(
        <ToastProvider>
          <Toast data-testid="interactive-toast">
            <ToastTitle>Interactive Toast</ToastTitle>
            <ToastDescription>Test all possible interactions</ToastDescription>
            <ToastAction 
              data-testid="interactive-action" 
              altText="Perform interactive action"
              onClick={handleAction}
            >
              Action
            </ToastAction>
            <ToastClose data-testid="interactive-close" onClick={handleClose} />
          </Toast>
        </ToastProvider>
      )
      
      // Test action click
      await user.click(screen.getByTestId('interactive-action'))
      expect(handleAction).toHaveBeenCalledTimes(1)
      
      // Test close click
      await user.click(screen.getByTestId('interactive-close'))
      expect(handleClose).toHaveBeenCalledTimes(1)
      
      // Test keyboard navigation
      const action = screen.getByTestId('interactive-action')
      action.focus()
      await user.keyboard('{Enter}')
      expect(handleAction).toHaveBeenCalledTimes(2)
    })

    it('handles multiple toasts in viewport', () => {
      render(
        <ToastProvider>
          <ToastViewport data-testid="multi-viewport">
            <Toast data-testid="toast-1">
              <ToastTitle>Toast 1</ToastTitle>
            </Toast>
            <Toast data-testid="toast-2" variant="destructive">
              <ToastTitle>Toast 2</ToastTitle>
            </Toast>
            <Toast data-testid="toast-3">
              <ToastTitle>Toast 3</ToastTitle>
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('toast-1')).toBeInTheDocument()
      expect(screen.getByTestId('toast-2')).toBeInTheDocument()
      expect(screen.getByTestId('toast-3')).toBeInTheDocument()
      expect(screen.getByText('Toast 1')).toBeInTheDocument()
      expect(screen.getByText('Toast 2')).toBeInTheDocument()
      expect(screen.getByText('Toast 3')).toBeInTheDocument()
    })

    it('handles toast with only title', () => {
      render(
        <ToastProvider>
          <Toast data-testid="title-only-toast">
            <ToastTitle data-testid="only-title">Just a title</ToastTitle>
            <ToastClose data-testid="title-only-close" />
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('only-title')).toHaveTextContent('Just a title')
      expect(screen.getByTestId('title-only-close')).toBeInTheDocument()
    })

    it('handles toast with only description', () => {
      render(
        <ToastProvider>
          <Toast data-testid="desc-only-toast">
            <ToastDescription data-testid="only-desc">Just a description</ToastDescription>
            <ToastClose data-testid="desc-only-close" />
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('only-desc')).toHaveTextContent('Just a description')
      expect(screen.getByTestId('desc-only-close')).toBeInTheDocument()
    })

    it('handles toast with custom duration', () => {
      render(
        <ToastProvider duration={2000}>
          <Toast data-testid="custom-duration-toast" duration={5000}>
            <ToastTitle>Custom Duration Toast</ToastTitle>
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('custom-duration-toast')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA structure', () => {
      render(
        <ToastProvider>
          <ToastViewport label="Notifications">
            <Toast data-testid="accessible-toast">
              <ToastTitle>Accessible Title</ToastTitle>
              <ToastDescription>Accessible Description</ToastDescription>
              <ToastAction altText="Perform accessible action">Action</ToastAction>
              <ToastClose />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )
      
      // The toast components should have proper structure for screen readers
      expect(screen.getByTestId('accessible-toast')).toBeInTheDocument()
    })

    it('handles focus management correctly', async () => {
      render(
        <ToastProvider>
          <Toast data-testid="focus-toast">
            <ToastTitle>Focus Test</ToastTitle>
            <ToastAction data-testid="focusable-action" altText="Focusable action">
              Action
            </ToastAction>
            <ToastClose data-testid="focusable-close" />
          </Toast>
        </ToastProvider>
      )
      
      const action = screen.getByTestId('focusable-action')
      const close = screen.getByTestId('focusable-close')
      
      // Tab navigation
      await user.tab()
      expect(action).toHaveFocus()
      
      await user.tab()
      expect(close).toHaveFocus()
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('handles empty content gracefully', () => {
      render(
        <ToastProvider>
          <Toast data-testid="empty-toast">
            <ToastTitle></ToastTitle>
            <ToastDescription></ToastDescription>
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('empty-toast')).toBeInTheDocument()
    })

    it('handles null/undefined children', () => {
      render(
        <ToastProvider>
          <Toast data-testid="null-toast">
            <ToastTitle>{null}</ToastTitle>
            <ToastDescription>{undefined}</ToastDescription>
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('null-toast')).toBeInTheDocument()
    })

    it('handles very long content', () => {
      const longTitle = 'A'.repeat(200)
      const longDescription = 'B'.repeat(500)
      
      render(
        <ToastProvider>
          <Toast data-testid="long-content-toast">
            <ToastTitle data-testid="long-title">{longTitle}</ToastTitle>
            <ToastDescription data-testid="long-desc">{longDescription}</ToastDescription>
          </Toast>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('long-title')).toHaveTextContent(longTitle)
      expect(screen.getByTestId('long-desc')).toHaveTextContent(longDescription)
    })

    it('handles missing altText gracefully by providing a fallback', () => {
      // This test verifies that the component can handle cases where altText might be missing
      // though in practice it should always be provided due to TypeScript requirements
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      try {
        render(
          <ToastAction data-testid="no-alt-text-action" altText="">
            Action
          </ToastAction>
        )
        
        expect(screen.getByTestId('no-alt-text-action')).toBeInTheDocument()
      } finally {
        consoleError.mockRestore()
      }
    })

    it('handles rapid successive interactions', async () => {
      const handleClick = jest.fn()
      
      render(
        <ToastAction 
          data-testid="rapid-click-action" 
          altText="Rapid click test"
          onClick={handleClick}
        >
          Rapid Click
        </ToastAction>
      )
      
      const action = screen.getByTestId('rapid-click-action')
      
      // Rapid clicks
      await user.click(action)
      await user.click(action)
      await user.click(action)
      
      expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Styling and Visual States', () => {
    it('applies correct hover states', async () => {
      render(
        <div>
          <ToastAction data-testid="hover-action" altText="Hover test">
            Hover Me
          </ToastAction>
          <ToastClose data-testid="hover-close" />
        </div>
      )
      
      const action = screen.getByTestId('hover-action')
      const close = screen.getByTestId('hover-close')
      
      await user.hover(action)
      await user.hover(close)
      
      // The hover classes should be present (tested via className checks in other tests)
      expect(action).toBeInTheDocument()
      expect(close).toBeInTheDocument()
    })

    it('applies correct focus states', async () => {
      render(
        <div>
          <ToastAction data-testid="focus-action" altText="Focus test">
            Focus Me
          </ToastAction>
          <ToastClose data-testid="focus-close" />
        </div>
      )
      
      const action = screen.getByTestId('focus-action')
      
      await user.tab()
      expect(action).toHaveFocus()
    })

    it('handles disabled state correctly', () => {
      render(
        <ToastAction 
          data-testid="disabled-action" 
          altText="Disabled test"
          disabled
        >
          Disabled Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('disabled-action')
      expect(action).toBeDisabled()
      expect(action).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
    })
  })
})