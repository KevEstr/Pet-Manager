import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

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
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
      </Alert>
    )
    expect(screen.getByText('Default Alert').closest('[role="alert"]')).toHaveClass('bg-background')
    
    rerender(
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
      </Alert>
    )
    expect(screen.getByText('Destructive Alert').closest('[role="alert"]')).toHaveClass('bg-destructive')
  })

  it('renders with custom className', () => {
    render(
      <Alert className="custom-class">
        <AlertTitle>Custom Alert</AlertTitle>
      </Alert>
    )
    
    expect(screen.getByText('Custom Alert').closest('[role="alert"]')).toHaveClass('custom-class')
  })

  it('renders with icon', () => {
    render(
      <Alert>
        <AlertTitle>Alert with Icon</AlertTitle>
        <AlertDescription>This alert has an icon</AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('renders without icon when specified', () => {
    render(
      <Alert showIcon={false}>
        <AlertTitle>Alert without Icon</AlertTitle>
        <AlertDescription>This alert has no icon</AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders with custom icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">🔔</span>
    
    render(
      <Alert icon={<CustomIcon />}>
        <AlertTitle>Alert with Custom Icon</AlertTitle>
        <AlertDescription>This alert has a custom icon</AlertDescription>
      </Alert>
    )
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
}) 