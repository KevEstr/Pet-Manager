import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Separator } from '@/components/ui/separator'

describe('Separator Component', () => {
  it('renders correctly with default orientation', () => {
    render(<Separator data-testid="separator" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with horizontal orientation', () => {
    render(<Separator data-testid="separator" orientation="horizontal" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('renders with vertical orientation', () => {
    render(<Separator data-testid="separator" orientation="vertical" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('renders with default classes', () => {
    render(<Separator data-testid="separator" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('shrink-0', 'bg-border')
  })

  it('accepts custom className', () => {
    render(<Separator data-testid="separator" className="custom-separator" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('custom-separator')
    expect(separator).toHaveClass('shrink-0', 'bg-border')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Separator ref={ref} data-testid="separator" />)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders with decorative role by default', () => {
    render(<Separator data-testid="separator" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('role', 'separator')
  })

  it('handles different color variants', () => {
    const { rerender } = render(<Separator data-testid="separator" className="bg-destructive" />)
    
    let separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('bg-destructive')

    rerender(<Separator data-testid="separator" className="bg-muted" />)
    separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('bg-muted')
  })

  it('renders with custom thickness', () => {
    const { rerender } = render(<Separator data-testid="separator" className="h-0.5" />)
    
    let separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('h-0.5')

    rerender(<Separator data-testid="separator" orientation="vertical" className="w-2" />)
    separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('w-2')
  })

  it('handles container usage', () => {
    render(
      <div data-testid="container">
        <div>Content above</div>
        <Separator data-testid="separator" />
        <div>Content below</div>
      </div>
    )
    
    const container = screen.getByTestId('container')
    const separator = screen.getByTestId('separator')
    
    expect(container).toContainElement(separator)
    expect(separator).toBeInTheDocument()
  })

  it('merges multiple classes correctly', () => {
    render(<Separator data-testid="separator" className="my-4 bg-red-500" />)
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('shrink-0', 'bg-border', 'my-4', 'bg-red-500')
  })
}) 