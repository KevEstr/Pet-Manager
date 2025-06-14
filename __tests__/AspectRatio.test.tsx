import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AspectRatio } from '@/components/ui/aspect-ratio'

describe('AspectRatio Component', () => {
  it('renders correctly', () => {
    render(
      <AspectRatio data-testid="aspect-ratio" ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    )
    
    const aspectRatio = screen.getByTestId('aspect-ratio')
    expect(aspectRatio).toBeInTheDocument()
  })

  it('renders with default aspect ratio', () => {
    render(
      <AspectRatio data-testid="aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    )
    
    const aspectRatio = screen.getByTestId('aspect-ratio')
    expect(aspectRatio).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(
      <AspectRatio data-testid="aspect-ratio" ratio={16 / 9}>
        <img src="/test.jpg" alt="Test image" />
      </AspectRatio>
    )
    
    const aspectRatio = screen.getByTestId('aspect-ratio')
    const image = screen.getByAltText('Test image')
    
    expect(aspectRatio).toContainElement(image)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <AspectRatio ref={ref} data-testid="aspect-ratio" ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    )
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('accepts custom className', () => {
    render(
      <AspectRatio data-testid="aspect-ratio" className="custom-class" ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    )
    
    const aspectRatio = screen.getByTestId('aspect-ratio')
    expect(aspectRatio).toHaveClass('custom-class')
  })
}) 