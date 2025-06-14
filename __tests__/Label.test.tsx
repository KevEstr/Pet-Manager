import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Label } from '@/components/ui/label'

describe('Label Component', () => {
  it('renders correctly with text content', () => {
    render(<Label data-testid="label">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Test Label')
  })

  it('renders with default classes', () => {
    render(<Label data-testid="label">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('accepts custom className', () => {
    render(<Label data-testid="label" className="custom-class">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toHaveClass('custom-class')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref} data-testid="label">Test Label</Label>)
    
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    expect(ref.current).toHaveTextContent('Test Label')
  })

  it('accepts htmlFor attribute', () => {
    render(<Label data-testid="label" htmlFor="input-id">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toHaveAttribute('for', 'input-id')
  })

  it('handles disabled state styling', () => {
    render(<Label data-testid="label" className="disabled:cursor-not-allowed disabled:opacity-70">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-70')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Label data-testid="label" className="text-destructive">Error Label</Label>)
    
    let label = screen.getByTestId('label')
    expect(label).toHaveClass('text-destructive')

    rerender(<Label data-testid="label" className="text-muted-foreground">Muted Label</Label>)
    label = screen.getByTestId('label')
    expect(label).toHaveClass('text-muted-foreground')
  })

  it('renders with nested content', () => {
    render(
      <Label data-testid="label">
        <span>Nested</span> Content
      </Label>
    )
    
    const label = screen.getByTestId('label')
    expect(label).toContainHTML('<span>Nested</span>')
    expect(label).toHaveTextContent('Nested Content')
  })

  it('handles empty content', () => {
    render(<Label data-testid="label" />)
    
    const label = screen.getByTestId('label')
    expect(label).toBeInTheDocument()
    expect(label).toBeEmptyDOMElement()
  })

  it('merges multiple class names correctly', () => {
    render(<Label data-testid="label" className="text-lg font-bold custom-class">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none', 'text-lg', 'font-bold', 'custom-class')
  })
}) 