import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton Component', () => {
  it('renders with default classes', () => {
    render(<Skeleton data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted')
  })

  it('accepts custom className', () => {
    render(<Skeleton data-testid="skeleton" className="custom-skeleton h-4 w-full" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('custom-skeleton', 'h-4', 'w-full')
  })

  it('forwards all props correctly', () => {
    render(<Skeleton data-testid="skeleton" role="presentation" aria-label="Loading..." />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveAttribute('role', 'presentation')
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...')
  })

  it('renders as a div element', () => {
    const { container } = render(<Skeleton />)
    
    const skeletonElement = container.firstChild
    expect(skeletonElement?.nodeName).toBe('DIV')
  })

  it('merges classes correctly with cn utility', () => {
    render(<Skeleton data-testid="skeleton" className="h-8 w-8 rounded-full" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted', 'h-8', 'w-8', 'rounded-full')
  })
}) 