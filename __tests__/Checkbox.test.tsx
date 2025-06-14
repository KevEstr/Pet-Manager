import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox Component', () => {
  it('renders correctly', () => {
    render(<Checkbox data-testid="checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'button')
    expect(checkbox).toHaveAttribute('role', 'checkbox')
  })

  it('renders with default unchecked state', () => {
    render(<Checkbox data-testid="checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders with checked state', () => {
    render(<Checkbox data-testid="checkbox" checked />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })

  it('renders with indeterminate state', () => {
    render(<Checkbox data-testid="checkbox" checked="indeterminate" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('renders with default classes', () => {
    render(<Checkbox data-testid="checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass(
      'peer',
      'h-4',
      'w-4',
      'shrink-0',
      'rounded-sm',
      'border',
      'border-primary'
    )
  })

  it('accepts custom className', () => {
    render(<Checkbox data-testid="checkbox" className="custom-checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('custom-checkbox')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Checkbox data-testid="checkbox" onCheckedChange={handleClick} />)
    
    const checkbox = screen.getByTestId('checkbox')
    fireEvent.click(checkbox)
    
    expect(handleClick).toHaveBeenCalledWith(true)
  })

  it('handles disabled state', () => {
    render(<Checkbox data-testid="checkbox" disabled />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveAttribute('data-disabled', '')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Checkbox ref={ref} data-testid="checkbox" />)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('shows check icon when checked', () => {
    render(<Checkbox data-testid="checkbox" checked />)
    
    const checkbox = screen.getByTestId('checkbox')
    const checkIcon = checkbox.querySelector('svg')
    expect(checkIcon).toBeInTheDocument()
  })

  it('does not show check icon when unchecked', () => {
    render(<Checkbox data-testid="checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    const checkIcon = checkbox.querySelector('svg')
    expect(checkIcon).not.toBeInTheDocument()
  })

  it('handles focus state', () => {
    render(<Checkbox data-testid="checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    checkbox.focus()
    
    expect(checkbox).toHaveFocus()
  })

  it('handles keyboard events', () => {
    const handleChange = jest.fn()
    render(<Checkbox data-testid="checkbox" onCheckedChange={handleChange} />)
    
    const checkbox = screen.getByTestId('checkbox')
    fireEvent.keyDown(checkbox, { key: ' ' })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders with required attribute', () => {
    render(<Checkbox data-testid="checkbox" required />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('aria-required', 'true')
  })

  it('renders with name attribute', () => {
    render(<Checkbox data-testid="checkbox" name="test-checkbox" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('name', 'test-checkbox')
  })

  it('renders with value attribute', () => {
    render(<Checkbox data-testid="checkbox" value="test-value" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('value', 'test-value')
  })

  it('handles controlled component usage', () => {
    const handleChange = jest.fn()
    const { rerender } = render(
      <Checkbox data-testid="checkbox" checked={false} onCheckedChange={handleChange} />
    )
    
    let checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    
    rerender(<Checkbox data-testid="checkbox" checked={true} onCheckedChange={handleChange} />)
    checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })

  it('merges multiple classes correctly', () => {
    render(<Checkbox data-testid="checkbox" className="text-red-500 border-red-500" />)
    
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('h-4', 'w-4', 'text-red-500', 'border-red-500')
  })
}) 