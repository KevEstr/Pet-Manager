import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Slider } from '@/components/ui/slider'

describe('Slider Component', () => {
  it('renders correctly', () => {
    render(<Slider data-testid="slider" />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveAttribute('role', 'slider')
  })

  it('renders with default value', () => {
    render(<Slider data-testid="slider" defaultValue={[50]} />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders with custom min and max', () => {
    render(<Slider data-testid="slider" min={10} max={200} />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '10')
    expect(slider).toHaveAttribute('aria-valuemax', '200')
  })

  it('renders with step value', () => {
    render(<Slider data-testid="slider" step={5} />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(<Slider data-testid="slider" disabled />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveAttribute('data-disabled', '')
  })

  it('accepts custom className', () => {
    render(<Slider data-testid="slider" className="custom-slider" />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveClass('custom-slider')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Slider ref={ref} data-testid="slider" />)
    
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders with controlled value', () => {
    render(<Slider data-testid="slider" value={[75]} />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toBeInTheDocument()
  })

  it('handles orientation property', () => {
    render(<Slider data-testid="slider" orientation="vertical" />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveAttribute('data-orientation', 'vertical')
  })

  it('handles multiple values', () => {
    render(<Slider data-testid="slider" defaultValue={[20, 80]} />)
    
    const slider = screen.getByTestId('slider')
    expect(slider).toBeInTheDocument()
  })
}) 