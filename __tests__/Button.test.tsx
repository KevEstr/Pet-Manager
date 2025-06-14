import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Loader2: ({ className, ...props }: any) => (
    <div 
      data-testid="loader-icon" 
      className={`${className} animate-spin`} 
      {...props}
    >
      ⏳
    </div>
  ),
}))

describe('Button Component - Comprehensive Test Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('Basic Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders as button element by default', () => {
      render(<Button data-testid="button">Button</Button>)
      const button = screen.getByTestId('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('includes default classes', () => {
      render(<Button>Default Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'whitespace-nowrap',
        'rounded-md',
        'text-sm',
        'font-medium',
        'ring-offset-background',
        'transition-colors'
      )
    })

    it('includes focus and disabled state classes', () => {
      render(<Button>Focus Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',
        'disabled:pointer-events-none',
        'disabled:opacity-50'
      )
    })

    it('includes SVG styling classes', () => {
      render(<Button>SVG Button</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toMatch(/\[&_svg\]:pointer-events-none/)
      expect(button.className).toMatch(/\[&_svg\]:size-4/)
      expect(button.className).toMatch(/\[&_svg\]:shrink-0/)
    })
  })

  describe('Variants', () => {
    it('renders with default variant', () => {
      render(<Button variant="default">Default</Button>)
      const button = screen.getByText('Default')
      expect(button).toHaveClass(
        'bg-primary',
        'text-primary-foreground',
        'hover:bg-primary/90'
      )
    })

    it('renders with destructive variant', () => {
      render(<Button variant="destructive">Destructive</Button>)
      const button = screen.getByText('Destructive')
      expect(button).toHaveClass(
        'bg-destructive',
        'text-destructive-foreground',
        'hover:bg-destructive/90'
      )
    })

    it('renders with outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByText('Outline')
      expect(button).toHaveClass(
        'border',
        'border-input',
        'bg-background',
        'hover:bg-accent',
        'hover:text-accent-foreground'
      )
    })

    it('renders with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByText('Secondary')
      expect(button).toHaveClass(
        'bg-secondary',
        'text-secondary-foreground',
        'hover:bg-secondary/80'
      )
    })

    it('renders with ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByText('Ghost')
      expect(button).toHaveClass(
        'hover:bg-accent',
        'hover:text-accent-foreground'
      )
    })

    it('renders with link variant', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByText('Link')
      expect(button).toHaveClass(
        'text-primary',
        'underline-offset-4',
        'hover:underline'
      )
    })

    it('defaults to default variant when no variant is specified', () => {
      render(<Button>No Variant</Button>)
      const button = screen.getByText('No Variant')
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
    })
  })

  describe('Sizes', () => {
    it('renders with default size', () => {
      render(<Button size="default">Default Size</Button>)
      const button = screen.getByText('Default Size')
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
    })

    it('renders with small size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByText('Small')
      expect(button).toHaveClass('h-9', 'rounded-md', 'px-3')
    })

    it('renders with large size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByText('Large')
      expect(button).toHaveClass('h-11', 'rounded-md', 'px-8')
    })

    it('renders with icon size', () => {
      render(<Button size="icon">🚀</Button>)
      const button = screen.getByText('🚀')
      expect(button).toHaveClass('h-10', 'w-10')
    })

    it('defaults to default size when no size is specified', () => {
      render(<Button>No Size</Button>)
      const button = screen.getByText('No Size')
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
    })
  })

  describe('Loading State', () => {
    it('shows loading state with spinner', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByText('Loading')
      expect(button).toBeDisabled()
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
      expect(screen.getByTestId('loader-icon')).toHaveClass('animate-spin')
    })

    it('includes correct loader output element', () => {
      render(<Button loading>Loading Button</Button>)
      const output = screen.getByTestId('loader-icon').closest('output')
      expect(output).toBeInTheDocument()
      expect(output).toHaveClass('mr-2')
    })

    it('disables button when loading', () => {
      render(<Button loading>Loading Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('does not show spinner when not loading', () => {
      render(<Button loading={false}>Not Loading</Button>)
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument()
    })

    it('combines loading with disabled state', () => {
      render(<Button loading disabled>Loading Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
    })

    it('shows loading with different variants', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
      
      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} loading data-testid={`loading-${variant}`}>
            Loading {variant}
          </Button>
        )
        
        const button = screen.getByTestId(`loading-${variant}`)
        expect(button).toBeDisabled()
        expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
        
        unmount()
      })
    })
  })

  describe('Disabled State', () => {
    it('renders disabled button', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
    })

    it('does not trigger click when disabled', async () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('cannot be focused when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      
      button.focus()
      expect(button).not.toHaveFocus()
    })
  })

  describe('AsChild Functionality', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test" data-testid="link-button">Link Button</a>
        </Button>
      )
      
      const link = screen.getByTestId('link-button')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })

    it('renders as div when asChild with div child', () => {
      render(
        <Button asChild>
          <div data-testid="div-button">Div Button</div>
        </Button>
      )
      
      const div = screen.getByTestId('div-button')
      expect(div.tagName).toBe('DIV')
      expect(div).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })

    it('passes props to child component', () => {
      render(
        <Button asChild variant="destructive" size="lg">
          <a href="/destructive" data-testid="destructive-link">Destructive Link</a>
        </Button>
      )
      
      const link = screen.getByTestId('destructive-link')
      expect(link).toHaveClass('bg-destructive', 'h-11', 'px-8')
    })
  })

  describe('Custom Styling', () => {
    it('renders with custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByText('Custom')
      expect(button).toHaveClass('custom-class', 'inline-flex', 'items-center')
    })

    it('merges custom className with variant classes', () => {
      render(
        <Button className="custom-destructive" variant="destructive">
          Custom Destructive
        </Button>
      )
      const button = screen.getByText('Custom Destructive')
      expect(button).toHaveClass('custom-destructive', 'bg-destructive')
    })

    it('applies custom styles with different sizes', () => {
      render(<Button className="custom-size" size="lg">Custom Large</Button>)
      const button = screen.getByText('Custom Large')
      expect(button).toHaveClass('custom-size', 'h-11', 'px-8')
    })
  })

  describe('Events and Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard Button</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('handles focus events', async () => {
      const handleFocus = jest.fn()
      const handleBlur = jest.fn()
      
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focus Button
        </Button>
      )
      
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleFocus).toHaveBeenCalledTimes(1)
      
      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles hover events', async () => {
      const handleMouseEnter = jest.fn()
      const handleMouseLeave = jest.fn()
      
      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover Button
        </Button>
      )
      
      const button = screen.getByRole('button')
      
      await user.hover(button)
      expect(handleMouseEnter).toHaveBeenCalledTimes(1)
      
      await user.unhover(button)
      expect(handleMouseLeave).toHaveBeenCalledTimes(1)
    })

    it('handles form submission', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault())
      
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('handles rapid successive clicks', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Rapid Click</Button>)
      
      const button = screen.getByRole('button')
      
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Accessibility', () => {
    it('has correct role attribute', () => {
      render(<Button>Accessible Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>)
      const button = screen.getByLabelText('Close dialog')
      expect(button).toBeInTheDocument()
    })

    it('supports aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="help-text">Help Button</Button>
          <div id="help-text">This button provides help</div>
        </div>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'help-text')
    })

    it('supports aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed="true">Toggle On</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('is keyboard accessible', async () => {
      render(<Button>Keyboard Accessible</Button>)
      const button = screen.getByRole('button')
      
      await user.tab()
      expect(button).toHaveFocus()
    })

    it('supports screen reader text', () => {
      render(
        <Button>
          <span aria-hidden="true">🚀</span>
          <span className="sr-only">Launch rocket</span>
        </Button>
      )
      
      expect(screen.getByText('Launch rocket')).toBeInTheDocument()
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Button</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toBe('Ref Button')
    })

    it('forwards ref with asChild', () => {
      const ref = React.createRef<HTMLAnchorElement>()
      render(
        <Button asChild ref={ref}>
          <a href="/test">Ref Link</a>
        </Button>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
    })
  })

  describe('Complex Content', () => {
    it('renders with icon and text', () => {
      render(
        <Button>
          <span data-testid="icon">📧</span>
          Send Email
        </Button>
      )
      
      expect(screen.getByTestId('icon')).toHaveTextContent('📧')
      expect(screen.getByText('Send Email')).toBeInTheDocument()
    })

    it('renders with multiple child elements', () => {
      render(
        <Button>
          <span data-testid="prefix">Prefix</span>
          <span data-testid="middle">Middle</span>
          <span data-testid="suffix">Suffix</span>
        </Button>
      )
      
      expect(screen.getByTestId('prefix')).toBeInTheDocument()
      expect(screen.getByTestId('middle')).toBeInTheDocument()
      expect(screen.getByTestId('suffix')).toBeInTheDocument()
    })

    it('renders with loading state and icon', () => {
      render(
        <Button loading>
          <span data-testid="custom-icon">🎯</span>
          Loading with Icon
        </Button>
      )
      
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      expect(screen.getByText('Loading with Icon')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty button', () => {
      render(<Button data-testid="empty-button"></Button>)
      const button = screen.getByTestId('empty-button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })

    it('handles null children', () => {
      render(<Button data-testid="null-children">{null}</Button>)
      const button = screen.getByTestId('null-children')
      expect(button).toBeInTheDocument()
    })

    it('handles undefined children', () => {
      render(<Button data-testid="undefined-children">{undefined}</Button>)
      const button = screen.getByTestId('undefined-children')
      expect(button).toBeInTheDocument()
    })

    it('handles very long text', () => {
      const longText = 'This is a very long button text that might cause layout issues if not handled properly'
      render(<Button>{longText}</Button>)
      const button = screen.getByText(longText)
      expect(button).toHaveClass('whitespace-nowrap')
    })

    it('handles special characters', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      render(<Button>{specialText}</Button>)
      expect(screen.getByText(specialText)).toBeInTheDocument()
    })

    it('handles boolean props correctly', () => {
      render(<Button loading={false} disabled={false}>Boolean Props</Button>)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument()
    })
  })

  describe('Integration Scenarios', () => {
    it('works in form context', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault())
      
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit" variant="default">Submit Form</Button>
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="reset" variant="ghost">Reset</Button>
        </form>
      )
      
      const submitButton = screen.getByText('Submit Form')
      const cancelButton = screen.getByText('Cancel')
      const resetButton = screen.getByText('Reset')
      
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(cancelButton).toHaveAttribute('type', 'button')
      expect(resetButton).toHaveAttribute('type', 'reset')
      
      await user.click(submitButton)
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('works with conditional rendering', () => {
      const { rerender } = render(
        <div>
          {true && <Button>Conditional Button</Button>}
        </div>
      )
      
      expect(screen.getByText('Conditional Button')).toBeInTheDocument()
      
      rerender(
        <div>
          {false && <Button>Conditional Button</Button>}
        </div>
      )
      
      expect(screen.queryByText('Conditional Button')).not.toBeInTheDocument()
    })

    it('handles dynamic prop changes', () => {
      const { rerender } = render(
        <Button variant="default" size="default">Dynamic Button</Button>
      )
      
      let button = screen.getByText('Dynamic Button')
      expect(button).toHaveClass('bg-primary', 'h-10')
      
      rerender(
        <Button variant="destructive" size="lg">Dynamic Button</Button>
      )
      
      button = screen.getByText('Dynamic Button')
      expect(button).toHaveClass('bg-destructive', 'h-11')
    })
  })
})