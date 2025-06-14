import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Progress } from '@/components/ui/progress'

describe('Progress Component', () => {
  it('renders correctly', () => {
    render(<Progress data-testid="progress" />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveAttribute('role', 'progressbar')
  })

  it('renders with default classes', () => {
    render(<Progress data-testid="progress" />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveClass(
      'relative',
      'h-4',
      'w-full',
      'overflow-hidden',
      'rounded-full',
      'bg-secondary'
    )
  })

  it('renders with default value of 0', () => {
    render(<Progress data-testid="progress" />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('aria-valuenow', '0')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders with specified value', () => {
    render(<Progress data-testid="progress" value={50} />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('aria-valuenow', '50')
  })

  it('accepts custom className', () => {
    render(<Progress data-testid="progress" className="custom-progress" />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveClass('custom-progress')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Progress ref={ref} data-testid="progress" />)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles zero value', () => {
    render(<Progress data-testid="progress" value={0} />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('aria-valuenow', '0')
  })

  it('handles maximum value', () => {
    render(<Progress data-testid="progress" value={100} />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('aria-valuenow', '100')
  })

  it('renders with custom max value', () => {
    render(<Progress data-testid="progress" value={25} max={50} />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('aria-valuemax', '50')
    expect(progress).toHaveAttribute('aria-valuenow', '25')
  })

  it('maintains accessibility attributes', () => {
    render(<Progress data-testid="progress" value={33} />)
    
    const progress = screen.getByTestId('progress')
    expect(progress).toHaveAttribute('role', 'progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '33')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
  })
}) 