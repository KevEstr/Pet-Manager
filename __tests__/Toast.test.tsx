import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
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
  X: ({ className }: any) => <div data-testid="x-icon" className={className}>X</div>,
}))

describe('Toast Components', () => {
  describe('ToastProvider', () => {
    it('renders children correctly', () => {
      render(
        <ToastProvider>
          <div data-testid="toast-child">Toast Content</div>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('toast-child')).toHaveTextContent('Toast Content')
    })

    it('passes props correctly', () => {
      const { container } = render(
        <ToastProvider data-testid="toast-provider" duration={5000}>
          <div>Content</div>
        </ToastProvider>
      )
      
      expect(container.firstChild).toBeInTheDocument()
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

    it('accepts custom className', () => {
      render(<ToastViewport data-testid="toast-viewport" className="custom-class" />)
      
      const viewport = screen.getByTestId('toast-viewport')
      expect(viewport).toHaveClass('custom-class')
    })
  })

  describe('Toast', () => {
    it('renders with default variant', () => {
      render(<Toast data-testid="toast">Toast content</Toast>)
      
      const toast = screen.getByTestId('toast')
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveClass('group', 'pointer-events-auto', 'relative', 'flex')
    })

    it('renders with destructive variant', () => {
      render(
        <Toast data-testid="toast" variant="destructive">
          Toast content
        </Toast>
      )
      
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveClass('destructive')
    })

    it('accepts custom className', () => {
      render(
        <Toast data-testid="toast" className="custom-toast">
          Toast content
        </Toast>
      )
      
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveClass('custom-toast')
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
  })

  describe('ToastAction', () => {
    it('renders as button with correct classes', () => {
      render(<ToastAction data-testid="toast-action">Action</ToastAction>)
      
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
        'font-medium'
      )
    })

    it('handles click events', () => {
      const handleClick = jest.fn()
      render(
        <ToastAction data-testid="toast-action" onClick={handleClick}>
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      fireEvent.click(action)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('accepts custom className', () => {
      render(
        <ToastAction data-testid="toast-action" className="custom-action">
          Action
        </ToastAction>
      )
      
      const action = screen.getByTestId('toast-action')
      expect(action).toHaveClass('custom-action')
    })
  })

  describe('ToastClose', () => {
    it('renders close button with X icon', () => {
      render(<ToastClose data-testid="toast-close" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toBeInTheDocument()
      expect(close).toHaveAttribute('toast-close', '')
      
      const xIcon = screen.getByTestId('x-icon')
      expect(xIcon).toBeInTheDocument()
      expect(xIcon).toHaveClass('h-4', 'w-4')
    })

    it('has correct default classes', () => {
      render(<ToastClose data-testid="toast-close" />)
      
      const close = screen.getByTestId('toast-close')
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
    })

    it('handles click events', () => {
      const handleClick = jest.fn()
      render(<ToastClose data-testid="toast-close" onClick={handleClick} />)
      
      const close = screen.getByTestId('toast-close')
      fireEvent.click(close)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('accepts custom className', () => {
      render(<ToastClose data-testid="toast-close" className="custom-close" />)
      
      const close = screen.getByTestId('toast-close')
      expect(close).toHaveClass('custom-close')
    })
  })

  describe('ToastTitle', () => {
    it('renders title with correct classes', () => {
      render(<ToastTitle data-testid="toast-title">Title</ToastTitle>)
      
      const title = screen.getByTestId('toast-title')
      expect(title).toHaveTextContent('Title')
      expect(title).toHaveClass('text-sm', 'font-semibold')
    })

    it('accepts custom className', () => {
      render(
        <ToastTitle data-testid="toast-title" className="custom-title">
          Title
        </ToastTitle>
      )
      
      const title = screen.getByTestId('toast-title')
      expect(title).toHaveClass('custom-title')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <ToastTitle ref={ref} data-testid="toast-title">
          Title
        </ToastTitle>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('ToastDescription', () => {
    it('renders description with correct classes', () => {
      render(
        <ToastDescription data-testid="toast-description">
          Description
        </ToastDescription>
      )
      
      const description = screen.getByTestId('toast-description')
      expect(description).toHaveTextContent('Description')
      expect(description).toHaveClass('text-sm', 'opacity-90')
    })

    it('accepts custom className', () => {
      render(
        <ToastDescription data-testid="toast-description" className="custom-description">
          Description
        </ToastDescription>
      )
      
      const description = screen.getByTestId('toast-description')
      expect(description).toHaveClass('custom-description')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <ToastDescription ref={ref} data-testid="toast-description">
          Description
        </ToastDescription>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Complete Toast Example', () => {
    it('renders complete toast with all components', () => {
      render(
        <ToastProvider>
          <ToastViewport>
            <Toast data-testid="complete-toast">
              <ToastTitle data-testid="complete-title">Success</ToastTitle>
              <ToastDescription data-testid="complete-description">
                Operation completed successfully
              </ToastDescription>
              <ToastAction data-testid="complete-action">Undo</ToastAction>
              <ToastClose data-testid="complete-close" />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )
      
      expect(screen.getByTestId('complete-toast')).toBeInTheDocument()
      expect(screen.getByTestId('complete-title')).toHaveTextContent('Success')
      expect(screen.getByTestId('complete-description')).toHaveTextContent(
        'Operation completed successfully'
      )
      expect(screen.getByTestId('complete-action')).toHaveTextContent('Undo')
      expect(screen.getByTestId('complete-close')).toBeInTheDocument()
    })

    it('handles interactions in complete toast', () => {
      const handleAction = jest.fn()
      const handleClose = jest.fn()
      
      render(
        <ToastProvider>
          <Toast data-testid="interactive-toast">
            <ToastTitle>Interactive Toast</ToastTitle>
            <ToastDescription>Test interactions</ToastDescription>
            <ToastAction data-testid="interactive-action" onClick={handleAction}>
              Action
            </ToastAction>
            <ToastClose data-testid="interactive-close" onClick={handleClose} />
          </Toast>
        </ToastProvider>
      )
      
      fireEvent.click(screen.getByTestId('interactive-action'))
      fireEvent.click(screen.getByTestId('interactive-close'))
      
      expect(handleAction).toHaveBeenCalledTimes(1)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })
}) 