import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Switch } from '@/components/ui/switch'

describe('Switch Component', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="switch" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toHaveAttribute('type', 'button')
    expect(switchElement).toHaveAttribute('role', 'switch')
  })

  it('renders with default unchecked state', () => {
    render(<Switch data-testid="switch" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders with checked state', () => {
    render(<Switch data-testid="switch" checked />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'true')
    expect(switchElement).toHaveAttribute('data-state', 'checked')
  })

  it('renders with default classes', () => {
    render(<Switch data-testid="switch" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveClass(
      'peer',
      'inline-flex',
      'h-6',
      'w-11',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent'
    )
  })

  it('accepts custom className', () => {
    render(<Switch data-testid="switch" className="custom-switch" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveClass('custom-switch')
  })

  it('handles click events', () => {
    const handleChange = jest.fn()
    render(<Switch data-testid="switch" onCheckedChange={handleChange} />)
    
    const switchElement = screen.getByTestId('switch')
    fireEvent.click(switchElement)
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state', () => {
    render(<Switch data-testid="switch" disabled />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toBeDisabled()
    expect(switchElement).toHaveAttribute('data-disabled', '')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Switch ref={ref} data-testid="switch" />)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('renders thumb element', () => {
    render(<Switch data-testid="switch" />)
    
    const switchElement = screen.getByTestId('switch')
    const thumb = switchElement.querySelector('[data-state]')
    expect(thumb).toBeInTheDocument()
    expect(thumb).toHaveClass('pointer-events-none', 'block', 'h-5', 'w-5', 'rounded-full')
  })

  it('handles focus state', () => {
    render(<Switch data-testid="switch" />)
    
    const switchElement = screen.getByTestId('switch')
    switchElement.focus()
    
    expect(switchElement).toHaveFocus()
  })

  it('handles keyboard events', () => {
    const handleChange = jest.fn()
    render(<Switch data-testid="switch" onCheckedChange={handleChange} />)
    
    const switchElement = screen.getByTestId('switch')
    fireEvent.keyDown(switchElement, { key: ' ' })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles controlled component usage', () => {
    const handleChange = jest.fn()
    const { rerender } = render(
      <Switch data-testid="switch" checked={false} onCheckedChange={handleChange} />
    )
    
    let switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
    
    rerender(<Switch data-testid="switch" checked={true} onCheckedChange={handleChange} />)
    switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('data-state', 'checked')
  })

  it('renders with name attribute', () => {
    render(<Switch data-testid="switch" name="toggle-setting" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('name', 'toggle-setting')
  })

  it('renders with value attribute', () => {
    render(<Switch data-testid="switch" value="on" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('value', 'on')
  })

  it('handles required attribute', () => {
    render(<Switch data-testid="switch" required />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('aria-required', 'true')
  })

  it('handles aria-label', () => {
    render(<Switch data-testid="switch" aria-label="Toggle notifications" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('aria-label', 'Toggle notifications')
  })

  it('handles aria-labelledby', () => {
    render(
      <div>
        <div id="switch-label">Enable notifications</div>
        <Switch data-testid="switch" aria-labelledby="switch-label" />
      </div>
    )
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveAttribute('aria-labelledby', 'switch-label')
  })

  it('merges multiple classes correctly', () => {
    render(<Switch data-testid="switch" className="bg-red-500 border-red-600" />)
    
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toHaveClass('h-6', 'w-11', 'bg-red-500', 'border-red-600')
  })
}) 