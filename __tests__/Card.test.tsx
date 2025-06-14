import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card Component', () => {
  it('renders card with title and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('renders card with only content', () => {
    render(
      <Card>
        <CardContent>Test Content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders card with custom className', () => {
    render(
      <Card className="custom-class">
        <CardContent>Test Content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test Content').parentElement?.parentElement).toHaveClass('custom-class')
  })

  it('renders card with different variants', () => {
    const { rerender } = render(
      <Card variant="default">
        <CardContent>Default Card</CardContent>
      </Card>
    )
    expect(screen.getByText('Default Card').parentElement?.parentElement).toHaveClass('bg-card')
    
    rerender(
      <Card variant="bordered">
        <CardContent>Bordered Card</CardContent>
      </Card>
    )
    expect(screen.getByText('Bordered Card').parentElement?.parentElement).toHaveClass('border')
  })
}) 