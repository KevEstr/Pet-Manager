import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Badge } from '@/components/ui/badge'

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge data-testid="badge">Default Badge</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Default Badge')
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'border', 'px-2.5', 'py-0.5', 'text-xs', 'font-semibold')
  })

  it('renders with secondary variant', () => {
    render(<Badge data-testid="badge" variant="secondary">Secondary Badge</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('border-transparent', 'bg-secondary', 'text-secondary-foreground')
  })

  it('renders with destructive variant', () => {
    render(<Badge data-testid="badge" variant="destructive">Destructive Badge</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('border-transparent', 'bg-destructive', 'text-destructive-foreground')
  })

  it('renders with outline variant', () => {
    render(<Badge data-testid="badge" variant="outline">Outline Badge</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('text-foreground')
  })

  it('accepts custom className', () => {
    render(<Badge data-testid="badge" className="custom-badge">Custom Badge</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('custom-badge')
  })

  it('forwards all props correctly', () => {
    render(<Badge data-testid="badge" role="status" aria-label="Status indicator">Status</Badge>)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveAttribute('aria-label', 'Status indicator')
  })

  it('renders as a div element by default', () => {
    const { container } = render(<Badge>Test</Badge>)
    
    const badgeElement = container.firstChild
    expect(badgeElement?.nodeName).toBe('DIV')
  })

  it('renders children correctly', () => {
    render(
      <Badge data-testid="badge">
        <span>Icon</span>
        Text Content
      </Badge>
    )
    
    const badge = screen.getByTestId('badge')
    expect(badge).toContainHTML('<span>Icon</span>')
    expect(badge).toHaveTextContent('Icon Text Content')
  })

  it('handles empty content', () => {
    render(<Badge data-testid="badge" />)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toBeEmptyDOMElement()
  })

  it('maintains styling consistency across variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const
    
    variants.forEach((variant, index) => {
      render(<Badge data-testid={`badge-${variant}`} variant={variant}>{variant}</Badge>)
      
      const badge = screen.getByTestId(`badge-${variant}`)
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'border')
    })
  })
}) 