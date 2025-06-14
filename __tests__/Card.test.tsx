import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card'

describe('Card Components - Comprehensive Test Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Card (Root Component)', () => {
    it('renders with default classes', () => {
      render(<Card data-testid="card">Card content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass(
        'rounded-lg',
        'border',
        'bg-card',
        'text-card-foreground',
        'shadow-sm'
      )
    })

    it('renders as div element by default', () => {
      render(<Card data-testid="card">Card content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card.tagName).toBe('DIV')
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <Card data-testid="card" className="custom-card-class">
          Card content
        </Card>
      )
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-card-class', 'rounded-lg', 'border')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Card ref={ref} data-testid="card">Ref Card</Card>)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current?.textContent).toBe('Ref Card')
    })

    it('accepts all standard HTML div attributes', () => {
      render(
        <Card 
          data-testid="card" 
          id="test-card"
          role="region"
          aria-label="Test card"
          onClick={() => {}}
        >
          Card with attributes
        </Card>
      )
      
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('id', 'test-card')
      expect(card).toHaveAttribute('role', 'region')
      expect(card).toHaveAttribute('aria-label', 'Test card')
    })

    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(
        <Card data-testid="clickable-card" onClick={handleClick}>
          Clickable Card
        </Card>
      )
      
      const card = screen.getByTestId('clickable-card')
      await user.click(card)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard events', async () => {
      const handleKeyDown = jest.fn()
      render(
        <Card 
          data-testid="keyboard-card" 
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          Keyboard Card
        </Card>
      )
      
      const card = screen.getByTestId('keyboard-card')
      card.focus()
      await user.keyboard('{Enter}')
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('CardHeader', () => {
    it('renders with default classes', () => {
      render(<CardHeader data-testid="card-header">Header content</CardHeader>)
      
      const header = screen.getByTestId('card-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <CardHeader data-testid="card-header" className="custom-header">
          Header content
        </CardHeader>
      )
      
      const header = screen.getByTestId('card-header')
      expect(header).toHaveClass('custom-header', 'flex', 'flex-col', 'p-6')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CardHeader ref={ref} data-testid="card-header">Header</CardHeader>)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders multiple children with proper spacing', () => {
      render(
        <CardHeader data-testid="card-header">
          <div data-testid="header-child-1">Child 1</div>
          <div data-testid="header-child-2">Child 2</div>
          <div data-testid="header-child-3">Child 3</div>
        </CardHeader>
      )
      
      expect(screen.getByTestId('header-child-1')).toBeInTheDocument()
      expect(screen.getByTestId('header-child-2')).toBeInTheDocument()
      expect(screen.getByTestId('header-child-3')).toBeInTheDocument()
      
      const header = screen.getByTestId('card-header')
      expect(header).toHaveClass('space-y-1.5')
    })
  })

  describe('CardTitle', () => {
    it('renders with default classes', () => {
      render(<CardTitle data-testid="card-title">Card Title</CardTitle>)
      
      const title = screen.getByTestId('card-title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass(
        'text-2xl',
        'font-semibold',
        'leading-none',
        'tracking-tight'
      )
    })

    it('renders text content correctly', () => {
      render(<CardTitle>My Amazing Card</CardTitle>)
      
      expect(screen.getByText('My Amazing Card')).toBeInTheDocument()
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <CardTitle data-testid="card-title" className="custom-title">
          Custom Title
        </CardTitle>
      )
      
      const title = screen.getByTestId('card-title')
      expect(title).toHaveClass('custom-title', 'text-2xl', 'font-semibold')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CardTitle ref={ref} data-testid="card-title">Title</CardTitle>)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders with complex content', () => {
      render(
        <CardTitle data-testid="complex-title">
          <span data-testid="title-icon">🎯</span>
          <span data-testid="title-text">Complex Title</span>
          <span data-testid="title-badge">NEW</span>
        </CardTitle>
      )
      
      expect(screen.getByTestId('title-icon')).toHaveTextContent('🎯')
      expect(screen.getByTestId('title-text')).toHaveTextContent('Complex Title')
      expect(screen.getByTestId('title-badge')).toHaveTextContent('NEW')
    })

    it('handles long titles', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines depending on the container width'
      render(<CardTitle data-testid="long-title">{longTitle}</CardTitle>)
      
      const title = screen.getByTestId('long-title')
      expect(title).toHaveTextContent(longTitle)
      expect(title).toHaveClass('leading-none', 'tracking-tight')
    })
  })

  describe('CardDescription', () => {
    it('renders with default classes', () => {
      render(
        <CardDescription data-testid="card-description">
          Card description
        </CardDescription>
      )
      
      const description = screen.getByTestId('card-description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('renders text content correctly', () => {
      render(
        <CardDescription>This is a detailed description of the card</CardDescription>
      )
      
      expect(screen.getByText('This is a detailed description of the card')).toBeInTheDocument()
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <CardDescription data-testid="card-description" className="custom-desc">
          Custom Description
        </CardDescription>
      )
      
      const description = screen.getByTestId('card-description')
      expect(description).toHaveClass('custom-desc', 'text-sm', 'text-muted-foreground')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <CardDescription ref={ref} data-testid="card-description">
          Description
        </CardDescription>
      )
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders with formatted content', () => {
      render(
        <CardDescription data-testid="formatted-description">
          <strong>Important:</strong> This is a{' '}
          <em>formatted</em> description with{' '}
          <a href="#" data-testid="desc-link">a link</a>
        </CardDescription>
      )
      
      expect(screen.getByText('Important:')).toBeInTheDocument()
      expect(screen.getByText('formatted')).toBeInTheDocument()
      expect(screen.getByTestId('desc-link')).toBeInTheDocument()
    })

    it('handles multiline descriptions', () => {
      const multilineDesc = `Line 1 of description
      Line 2 of description
      Line 3 of description`
      
      render(
        <CardDescription data-testid="multiline-desc">
          {multilineDesc}
        </CardDescription>
      )
      
      expect(screen.getByTestId('multiline-desc')).toHaveTextContent(multilineDesc)
    })
  })

  describe('CardContent', () => {
    it('renders with default classes', () => {
      render(<CardContent data-testid="card-content">Content</CardContent>)
      
      const content = screen.getByTestId('card-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('renders content correctly', () => {
      render(
        <CardContent>
          <p>This is the main content of the card</p>
        </CardContent>
      )
      
      expect(screen.getByText('This is the main content of the card')).toBeInTheDocument()
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <CardContent data-testid="card-content" className="custom-content">
          Custom Content
        </CardContent>
      )
      
      const content = screen.getByTestId('card-content')
      expect(content).toHaveClass('custom-content', 'p-6', 'pt-0')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CardContent ref={ref} data-testid="card-content">Content</CardContent>)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders complex content structures', () => {
      render(
        <CardContent data-testid="complex-content">
          <div data-testid="content-section-1">
            <h3>Section 1</h3>
            <p>Content for section 1</p>
          </div>
          <div data-testid="content-section-2">
            <h3>Section 2</h3>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </CardContent>
      )
      
      expect(screen.getByTestId('content-section-1')).toBeInTheDocument()
      expect(screen.getByTestId('content-section-2')).toBeInTheDocument()
      expect(screen.getByText('Section 1')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })

    it('handles form elements in content', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault())
      
      render(
        <CardContent>
          <form onSubmit={handleSubmit} data-testid="card-form">
            <input 
              data-testid="form-input" 
              placeholder="Enter text"
              type="text"
            />
            <button type="submit" data-testid="form-submit">
              Submit
            </button>
          </form>
        </CardContent>
      )
      
      const input = screen.getByTestId('form-input')
      const submitBtn = screen.getByTestId('form-submit')
      
      await user.type(input, 'test input')
      await user.click(submitBtn)
      
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('CardFooter', () => {
    it('renders with default classes', () => {
      render(<CardFooter data-testid="card-footer">Footer</CardFooter>)
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('renders footer content correctly', () => {
      render(
        <CardFooter>
          <span>Footer content</span>
        </CardFooter>
      )
      
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <CardFooter data-testid="card-footer" className="custom-footer">
          Custom Footer
        </CardFooter>
      )
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('custom-footer', 'flex', 'items-center', 'p-6')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<CardFooter ref={ref} data-testid="card-footer">Footer</CardFooter>)
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders multiple footer items with flex layout', () => {
      render(
        <CardFooter data-testid="card-footer">
          <button data-testid="footer-btn-1">Cancel</button>
          <button data-testid="footer-btn-2">Save</button>
          <span data-testid="footer-text">Last updated: Today</span>
        </CardFooter>
      )
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('flex', 'items-center')
      
      expect(screen.getByTestId('footer-btn-1')).toBeInTheDocument()
      expect(screen.getByTestId('footer-btn-2')).toBeInTheDocument()
      expect(screen.getByTestId('footer-text')).toBeInTheDocument()
    })

    it('handles interactive footer elements', async () => {
      const handleCancel = jest.fn()
      const handleSave = jest.fn()
      
      render(
        <CardFooter>
          <button onClick={handleCancel} data-testid="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSave} data-testid="save-btn">
            Save
          </button>
        </CardFooter>
      )
      
      await user.click(screen.getByTestId('cancel-btn'))
      await user.click(screen.getByTestId('save-btn'))
      
      expect(handleCancel).toHaveBeenCalledTimes(1)
      expect(handleSave).toHaveBeenCalledTimes(1)
    })
  })

  describe('Complete Card Integration', () => {
    it('renders complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader data-testid="complete-header">
            <CardTitle data-testid="complete-title">Complete Card</CardTitle>
            <CardDescription data-testid="complete-description">
              This is a complete card with all components
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="complete-content">
            <p>This is the main content of the complete card.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </CardContent>
          <CardFooter data-testid="complete-footer">
            <button>Learn More</button>
            <button>Get Started</button>
          </CardFooter>
        </Card>
      )
      
      expect(screen.getByTestId('complete-card')).toBeInTheDocument()
      expect(screen.getByTestId('complete-header')).toBeInTheDocument()
      expect(screen.getByTestId('complete-title')).toHaveTextContent('Complete Card')
      expect(screen.getByTestId('complete-description')).toHaveTextContent('This is a complete card with all components')
      expect(screen.getByTestId('complete-content')).toBeInTheDocument()
      expect(screen.getByTestId('complete-footer')).toBeInTheDocument()
      expect(screen.getByText('Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })

    it('handles card with only header and content', () => {
      render(
        <Card data-testid="simple-card">
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Simple content without footer</p>
          </CardContent>
        </Card>
      )
      
      expect(screen.getByText('Simple Card')).toBeInTheDocument()
      expect(screen.getByText('Simple content without footer')).toBeInTheDocument()
    })

    it('handles card with custom styling on all components', () => {
      render(
        <Card className="custom-card" data-testid="styled-card">
          <CardHeader className="custom-header">
            <CardTitle className="custom-title">Styled Card</CardTitle>
            <CardDescription className="custom-description">
              Custom styled description
            </CardDescription>
          </CardHeader>
          <CardContent className="custom-content">
            <p>Custom styled content</p>
          </CardContent>
          <CardFooter className="custom-footer">
            <button>Custom Button</button>
          </CardFooter>
        </Card>
      )
      
      const card = screen.getByTestId('styled-card')
      expect(card).toHaveClass('custom-card', 'rounded-lg', 'border')
      
      const header = screen.getByText('Styled Card').closest('div')
      expect(header).toHaveClass('custom-title', 'text-2xl')
    })

    it('handles nested interactive elements', async () => {
      const handleHeaderClick = jest.fn()
      const handleContentClick = jest.fn()
      const handleFooterClick = jest.fn()
      
      render(
        <Card data-testid="interactive-card">
          <CardHeader onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
            <CardTitle>Interactive Header</CardTitle>
          </CardHeader>
          <CardContent onClick={handleContentClick} style={{ cursor: 'pointer' }}>
            <p>Clickable content area</p>
          </CardContent>
          <CardFooter>
            <button onClick={handleFooterClick}>Footer Button</button>
          </CardFooter>
        </Card>
      )
      
      await user.click(screen.getByText('Interactive Header'))
      await user.click(screen.getByText('Clickable content area'))
      await user.click(screen.getByText('Footer Button'))
      
      expect(handleHeaderClick).toHaveBeenCalledTimes(1)
      expect(handleContentClick).toHaveBeenCalledTimes(1)
      expect(handleFooterClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(
        <Card 
          role="article" 
          aria-label="Product card"
          data-testid="accessible-card"
        >
          <CardHeader>
            <CardTitle id="card-title">Product Name</CardTitle>
            <CardDescription aria-describedby="card-title">
              Product description
            </CardDescription>
          </CardHeader>
        </Card>
      )
      
      const card = screen.getByTestId('accessible-card')
      expect(card).toHaveAttribute('role', 'article')
      expect(card).toHaveAttribute('aria-label', 'Product card')
      
      const title = screen.getByText('Product Name')
      expect(title).toHaveAttribute('id', 'card-title')
    })

    it('supports keyboard navigation when interactive', async () => {
      const handleKeyDown = jest.fn()
      
      render(
        <Card 
          tabIndex={0} 
          onKeyDown={handleKeyDown}
          data-testid="keyboard-card"
        >
          <CardContent>Keyboard navigable card</CardContent>
        </Card>
      )
      
      const card = screen.getByTestId('keyboard-card')
      card.focus()
      
      expect(card).toHaveFocus()
      
      await user.keyboard('{Enter}')
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty card components', () => {
      render(
        <Card data-testid="empty-card">
          <CardHeader data-testid="empty-header"></CardHeader>
          <CardContent data-testid="empty-content"></CardContent>
          <CardFooter data-testid="empty-footer"></CardFooter>
        </Card>
      )
      
      expect(screen.getByTestId('empty-card')).toBeInTheDocument()
      expect(screen.getByTestId('empty-header')).toBeInTheDocument()
      expect(screen.getByTestId('empty-content')).toBeInTheDocument()
      expect(screen.getByTestId('empty-footer')).toBeInTheDocument()
    })

    it('handles null/undefined children', () => {
      render(
        <Card data-testid="null-children-card">
          <CardHeader>
            <CardTitle>{null}</CardTitle>
            <CardDescription>{undefined}</CardDescription>
          </CardHeader>
          <CardContent>
            {null}
            <p>Valid content</p>
            {undefined}
          </CardContent>
        </Card>
      )
      
      expect(screen.getByTestId('null-children-card')).toBeInTheDocument()
      expect(screen.getByText('Valid content')).toBeInTheDocument()
    })

    it('handles very long content', () => {
      const longContent = 'Lorem ipsum dolor sit amet, '.repeat(50)
      
      render(
        <Card data-testid="long-content-card">
          <CardContent>
            <p data-testid="long-text">{longContent}</p>
          </CardContent>
        </Card>
      )
      
      expect(screen.getByTestId('long-text')).toHaveTextContent(longContent)
    })

    it('handles dynamic content updates', () => {
      const { rerender } = render(
        <Card data-testid="dynamic-card">
          <CardHeader>
            <CardTitle>Initial Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Initial content</p>
          </CardContent>
        </Card>
      )
      
      expect(screen.getByText('Initial Title')).toBeInTheDocument()
      expect(screen.getByText('Initial content')).toBeInTheDocument()
      
      rerender(
        <Card data-testid="dynamic-card">
          <CardHeader>
            <CardTitle>Updated Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Updated content</p>
          </CardContent>
        </Card>
      )
      
      expect(screen.getByText('Updated Title')).toBeInTheDocument()
      expect(screen.getByText('Updated content')).toBeInTheDocument()
      expect(screen.queryByText('Initial Title')).not.toBeInTheDocument()
    })
  })
})