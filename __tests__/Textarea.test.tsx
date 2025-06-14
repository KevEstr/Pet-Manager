import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea Component', () => {
  it('renders correctly', () => {
    render(<Textarea data-testid="textarea" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('renders with default classes', () => {
    render(<Textarea data-testid="textarea" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass(
      'flex',
      'min-h-[80px]',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm'
    )
  })

  it('accepts custom className', () => {
    render(<Textarea data-testid="textarea" className="custom-textarea" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass('custom-textarea')
  })

  it('handles placeholder text', () => {
    render(<Textarea data-testid="textarea" placeholder="Enter your text here..." />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('placeholder', 'Enter your text here...')
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Textarea data-testid="textarea" onChange={handleChange} />)
    
    const textarea = screen.getByTestId('textarea')
    fireEvent.change(textarea, { target: { value: 'Test content' } })
    
    expect(handleChange).toHaveBeenCalled()
    expect(textarea).toHaveValue('Test content')
  })

  it('handles disabled state', () => {
    render(<Textarea data-testid="textarea" disabled />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toBeDisabled()
  })

  it('handles readonly state', () => {
    render(<Textarea data-testid="textarea" readOnly />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('readonly')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} data-testid="textarea" />)
    
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(<Textarea data-testid="textarea" onFocus={handleFocus} onBlur={handleBlur} />)
    
    const textarea = screen.getByTestId('textarea')
    
    fireEvent.focus(textarea)
    expect(handleFocus).toHaveBeenCalled()
    expect(textarea).toHaveFocus()
    
    fireEvent.blur(textarea)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('handles rows attribute', () => {
    render(<Textarea data-testid="textarea" rows={5} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('handles cols attribute', () => {
    render(<Textarea data-testid="textarea" cols={50} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('cols', '50')
  })

  it('handles maxLength attribute', () => {
    render(<Textarea data-testid="textarea" maxLength={100} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('maxlength', '100')
  })

  it('handles minLength attribute', () => {
    render(<Textarea data-testid="textarea" minLength={10} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('minlength', '10')
  })

  it('handles required attribute', () => {
    render(<Textarea data-testid="textarea" required />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toBeRequired()
  })

  it('handles name attribute', () => {
    render(<Textarea data-testid="textarea" name="description" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('name', 'description')
  })

  it('handles id attribute', () => {
    render(<Textarea data-testid="textarea" id="textarea-id" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('id', 'textarea-id')
  })

  it('handles default value', () => {
    render(<Textarea data-testid="textarea" defaultValue="Default content" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveValue('Default content')
  })

  it('handles controlled value', () => {
    const { rerender } = render(<Textarea data-testid="textarea" value="Initial value" />)
    
    let textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveValue('Initial value')
    
    rerender(<Textarea data-testid="textarea" value="Updated value" />)
    textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveValue('Updated value')
  })

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn()
    const handleKeyUp = jest.fn()
    
    render(<Textarea data-testid="textarea" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
    
    const textarea = screen.getByTestId('textarea')
    
    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(handleKeyDown).toHaveBeenCalled()
    
    fireEvent.keyUp(textarea, { key: 'Enter' })
    expect(handleKeyUp).toHaveBeenCalled()
  })

  it('handles resize property', () => {
    render(<Textarea data-testid="textarea" className="resize-none" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass('resize-none')
  })

  it('handles error state styling', () => {
    render(<Textarea data-testid="textarea" className="border-destructive" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass('border-destructive')
  })

  it('merges multiple classes correctly', () => {
    render(<Textarea data-testid="textarea" className="h-32 bg-gray-50 text-lg" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass('min-h-[80px]', 'w-full', 'h-32', 'bg-gray-50', 'text-lg')
  })
}) 