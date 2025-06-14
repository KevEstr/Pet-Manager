import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Test Input" />)
    
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    render(<Input placeholder="Test Input" />)
    
    const input = screen.getByPlaceholderText('Test Input')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(input).toHaveValue('test value')
  })

  it('shows error state', () => {
    render(<Input placeholder="Test Input" className="border-destructive" />)
    
    const input = screen.getByPlaceholderText('Test Input')
    expect(input).toHaveClass('border-destructive')
  })

  it('handles onFocus and onBlur events', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    
    render(
      <Input
        placeholder="Test Input"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
    
    const input = screen.getByPlaceholderText('Test Input')
    
    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalled()
    
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()
  })
}) 