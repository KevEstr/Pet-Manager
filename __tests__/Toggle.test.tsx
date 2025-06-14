import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Toggle } from '@/components/ui/toggle'

describe('Toggle Component', () => {
  it('renders correctly', () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveAttribute('type', 'button')
  })

  it('renders with default variant', () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'text-sm',
      'font-medium'
    )
  })

  it('renders with outline variant', () => {
    render(<Toggle data-testid="toggle" variant="outline">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass('border', 'border-input')
  })

  it('renders with small size', () => {
    render(<Toggle data-testid="toggle" size="sm">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass('h-9', 'px-2.5')
  })

  it('renders with large size', () => {
    render(<Toggle data-testid="toggle" size="lg">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass('h-11', 'px-5')
  })

  it('handles pressed state', () => {
    render(<Toggle data-testid="toggle" pressed>Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveAttribute('data-state', 'on')
  })

  it('handles unpressed state', () => {
    render(<Toggle data-testid="toggle" pressed={false}>Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(toggle).toHaveAttribute('data-state', 'off')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Toggle data-testid="toggle" onPressedChange={handleClick}>Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    fireEvent.click(toggle)
    
    expect(handleClick).toHaveBeenCalledWith(true)
  })

  it('handles disabled state', () => {
    render(<Toggle data-testid="toggle" disabled>Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveAttribute('data-disabled', '')
  })

  it('accepts custom className', () => {
    render(<Toggle data-testid="toggle" className="custom-toggle">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass('custom-toggle')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Toggle ref={ref} data-testid="toggle">Toggle</Toggle>)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('handles focus state', () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    toggle.focus()
    
    expect(toggle).toHaveFocus()
  })

  it('renders with icon content', () => {
    render(
      <Toggle data-testid="toggle">
        <span data-testid="icon">🔄</span>
      </Toggle>
    )
    
    const toggle = screen.getByTestId('toggle')
    const icon = screen.getByTestId('icon')
    
    expect(toggle).toContainElement(icon)
  })

  it('renders with text and icon', () => {
    render(
      <Toggle data-testid="toggle">
        <span data-testid="icon">📝</span>
        Edit
      </Toggle>
    )
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveTextContent('Edit')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles controlled component usage', () => {
    const handleChange = jest.fn()
    const { rerender } = render(
      <Toggle data-testid="toggle" pressed={false} onPressedChange={handleChange}>
        Toggle
      </Toggle>
    )
    
    let toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveAttribute('data-state', 'off')
    
    rerender(
      <Toggle data-testid="toggle" pressed={true} onPressedChange={handleChange}>
        Toggle
      </Toggle>
    )
    toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveAttribute('data-state', 'on')
  })

  it('merges multiple classes correctly', () => {
    render(<Toggle data-testid="toggle" className="bg-red-500 text-white">Toggle</Toggle>)
    
    const toggle = screen.getByTestId('toggle')
    expect(toggle).toHaveClass('inline-flex', 'items-center', 'bg-red-500', 'text-white')
  })
}) 