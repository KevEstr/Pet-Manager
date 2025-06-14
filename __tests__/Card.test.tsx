import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test Content</p>
        </CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders card with custom className', () => {
    render(
      <Card className="custom-class">
        <CardContent>
          <p>Test Content</p>
        </CardContent>
      </Card>
    )
    
    const card = screen.getByText('Test Content').closest('div')?.parentElement
    expect(card).toHaveClass('custom-class')
  })
}) 