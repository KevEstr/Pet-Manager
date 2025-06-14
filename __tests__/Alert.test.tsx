import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

describe('Alert Component', () => {
  it('renders alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
      </Alert>
    )
    
    expect(screen.getByText('Default Alert').closest('[role="alert"]')).toHaveClass('bg-background')
    
    rerender(
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
      </Alert>
    )
    
    expect(screen.getByText('Destructive Alert').closest('[role="alert"]')).toHaveClass('border-destructive')
  })

  it('renders with custom className', () => {
    render(
      <Alert className="custom-class">
        <AlertTitle>Custom Alert</AlertTitle>
      </Alert>
    )
    
    expect(screen.getByText('Custom Alert').closest('[role="alert"]')).toHaveClass('custom-class')
  })

  it('renders without icon when specified', () => {
    render(
      <Alert>
        <AlertTitle>No Icon Alert</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders with custom icon', () => {
    render(
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Custom Icon Alert</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })
}) 