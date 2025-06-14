import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'

describe('Pagination Components', () => {
  describe('Pagination', () => {
    it('renders as navigation element', () => {
      render(
        <Pagination data-testid="pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
      expect(pagination.tagName).toBe('NAV')
      expect(pagination).toHaveAttribute('role', 'navigation')
      expect(pagination).toHaveAttribute('aria-label', 'pagination')
    })

    it('applies default classes', () => {
      render(
        <Pagination data-testid="pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toHaveClass('mx-auto', 'flex', 'w-full', 'justify-center')
    })

    it('accepts custom className', () => {
      render(
        <Pagination className="custom-pagination" data-testid="pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('pagination')).toHaveClass('custom-pagination')
    })
  })

  describe('PaginationContent', () => {
    it('renders as unordered list', () => {
      render(
        <Pagination>
          <PaginationContent data-testid="pagination-content">
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const content = screen.getByTestId('pagination-content')
      expect(content).toBeInTheDocument()
      expect(content.tagName).toBe('UL')
      expect(content).toHaveClass('flex', 'flex-row', 'items-center', 'gap-1')
    })

    it('accepts custom className', () => {
      render(
        <Pagination>
          <PaginationContent className="custom-content" data-testid="pagination-content">
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('pagination-content')).toHaveClass('custom-content')
    })
  })

  describe('PaginationItem', () => {
    it('renders as list item', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem data-testid="pagination-item">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const item = screen.getByTestId('pagination-item')
      expect(item).toBeInTheDocument()
      expect(item.tagName).toBe('LI')
    })

    it('accepts custom className', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem className="custom-item" data-testid="pagination-item">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('pagination-item')).toHaveClass('custom-item')
    })
  })

  describe('PaginationLink', () => {
    it('renders as anchor with correct attributes', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="/page/2" data-testid="pagination-link">
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('pagination-link')
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/page/2')
      expect(link).toHaveTextContent('2')
    })

    it('shows active state correctly', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive data-testid="active-link">
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('active-link')
      expect(link).toHaveAttribute('aria-current', 'page')
    })

    it('shows inactive state correctly', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive={false} data-testid="inactive-link">
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('inactive-link')
      expect(link).not.toHaveAttribute('aria-current')
    })

    it('handles different sizes', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" size="sm" data-testid="small-link">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="lg" data-testid="large-link">
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const smallLink = screen.getByTestId('small-link')
      const largeLink = screen.getByTestId('large-link')
      
      expect(smallLink).toBeInTheDocument()
      expect(largeLink).toBeInTheDocument()
    })

    it('renders screen reader text when no children provided', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" data-testid="empty-link" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('empty-link')
      expect(link).toHaveTextContent('Page link')
      
      const srText = link.querySelector('.sr-only')
      expect(srText).toBeInTheDocument()
      expect(srText).toHaveTextContent('Page link')
    })

    it('prioritizes children over fallback text', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" data-testid="text-link">
                Page 1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('text-link')
      expect(link).toHaveTextContent('Page 1')
      expect(link).not.toHaveTextContent('Page link')
    })
  })

  describe('PaginationPrevious', () => {
    it('renders previous link with correct attributes', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page/1" data-testid="previous-link" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('previous-link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/page/1')
      expect(link).toHaveAttribute('aria-label', 'Go to previous page')
      expect(link).toHaveTextContent('Previous')
    })

    it('displays chevron left icon', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page/1" data-testid="previous-link" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('previous-link')
      const icon = link.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('accepts custom className', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="/page/1" 
                className="custom-previous" 
                data-testid="previous-link" 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('previous-link')).toHaveClass('custom-previous')
    })
  })

  describe('PaginationNext', () => {
    it('renders next link with correct attributes', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href="/page/3" data-testid="next-link" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('next-link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/page/3')
      expect(link).toHaveAttribute('aria-label', 'Go to next page')
      expect(link).toHaveTextContent('Next')
    })

    it('displays chevron right icon', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href="/page/3" data-testid="next-link" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('next-link')
      const icon = link.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('accepts custom className', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext 
                href="/page/3" 
                className="custom-next" 
                data-testid="next-link" 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('next-link')).toHaveClass('custom-next')
    })
  })

  describe('PaginationEllipsis', () => {
    it('renders ellipsis correctly', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis data-testid="ellipsis" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const ellipsis = screen.getByTestId('ellipsis')
      expect(ellipsis).toBeInTheDocument()
      expect(ellipsis.tagName).toBe('SPAN')
      expect(ellipsis).toHaveAttribute('aria-hidden')
    })

    it('displays more horizontal icon', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis data-testid="ellipsis" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const ellipsis = screen.getByTestId('ellipsis')
      const icon = ellipsis.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('has screen reader text', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis data-testid="ellipsis" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByText('More pages')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toHaveClass('sr-only')
    })

    it('accepts custom className', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis className="custom-ellipsis" data-testid="ellipsis" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByTestId('ellipsis')).toHaveClass('custom-ellipsis')
    })
  })

  describe('Complete Pagination Example', () => {
    it('renders complete pagination with all components', () => {
      render(
        <Pagination data-testid="complete-pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page/1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/2" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/10">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/page/3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toBeInTheDocument()
      
      // Check active page
      const activePage = screen.getByText('2')
      expect(activePage).toHaveAttribute('aria-current', 'page')
    })

    it('handles click events on links', () => {
      const handleClick = jest.fn()
      
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink 
                href="/page/1" 
                onClick={handleClick}
                data-testid="clickable-link"
              >
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      const link = screen.getByTestId('clickable-link')
      fireEvent.click(link)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('maintains accessibility across all components', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page/1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/2" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/page/3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      
      // Check ARIA labels
      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
      expect(screen.getByLabelText('pagination')).toBeInTheDocument()
      
      // Check aria-current for active page
      expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page')
      
      // Check aria-hidden for ellipsis
      const ellipsis = screen.getByText('More pages').parentElement
      expect(ellipsis).toHaveAttribute('aria-hidden')
    })
  })
}) 