import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'

describe('Breadcrumb Components', () => {
  describe('Breadcrumb', () => {
    it('renders correctly with nav element', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toBeInTheDocument()
      expect(breadcrumb.tagName).toBe('NAV')
      expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb')
    })

    it('accepts custom className', () => {
      render(
        <Breadcrumb className="custom-breadcrumb" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByTestId('breadcrumb')).toHaveClass('custom-breadcrumb')
    })
  })

  describe('BreadcrumbList', () => {
    it('renders as ordered list', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="breadcrumb-list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('OL')
    })

    it('applies default and custom classes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList className="custom-list" data-testid="breadcrumb-list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const list = screen.getByTestId('breadcrumb-list')
      expect(list).toHaveClass('custom-list')
      expect(list).toHaveClass('flex', 'flex-wrap', 'items-center')
    })
  })

  describe('BreadcrumbItem', () => {
    it('renders as list item', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="breadcrumb-item">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const item = screen.getByTestId('breadcrumb-item')
      expect(item).toBeInTheDocument()
      expect(item.tagName).toBe('LI')
    })
  })

  describe('BreadcrumbLink', () => {
    it('renders as anchor by default', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test" data-testid="breadcrumb-link">
                Test Link
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const link = screen.getByTestId('breadcrumb-link')
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveTextContent('Test Link')
    })

    it('applies hover styles', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test" data-testid="breadcrumb-link">
                Test Link
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const link = screen.getByTestId('breadcrumb-link')
      expect(link).toHaveClass('transition-colors', 'hover:text-foreground')
    })

    it('works with asChild prop', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild data-testid="breadcrumb-link">
                <button>Custom Component</button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const button = screen.getByTestId('breadcrumb-link')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveTextContent('Custom Component')
    })
  })

  describe('BreadcrumbPage', () => {
    it('renders current page correctly', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="breadcrumb-page">
                Current Page
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const page = screen.getByTestId('breadcrumb-page')
      expect(page).toBeInTheDocument()
      expect(page.tagName).toBe('SPAN')
      expect(page).toHaveAttribute('aria-current', 'page')
      expect(page).toHaveTextContent('Current Page')
    })

    it('applies correct styling for current page', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="breadcrumb-page">
                Current Page
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const page = screen.getByTestId('breadcrumb-page')
      expect(page).toHaveClass('font-normal', 'text-foreground')
    })
  })

  describe('BreadcrumbSeparator', () => {
    it('renders default separator with ChevronRight', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="breadcrumb-separator" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toBeInTheDocument()
      expect(separator.tagName).toBe('LI')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
      
      // Check for SVG element (ChevronRight icon)
      const icon = separator.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('renders custom separator', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="breadcrumb-separator">
              <span>/</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toHaveTextContent('/')
    })

    it('applies correct accessibility attributes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="breadcrumb-separator" />
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const separator = screen.getByTestId('breadcrumb-separator')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('BreadcrumbEllipsis', () => {
    it('renders ellipsis correctly', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      expect(ellipsis).toBeInTheDocument()
      expect(ellipsis.tagName).toBe('SPAN')
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
    })

    it('has screen reader text', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByText('More')).toBeInTheDocument()
      expect(screen.getByText('More')).toHaveClass('sr-only')
    })

    it('displays MoreHorizontal icon', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis')
      const icon = ellipsis.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Complete Breadcrumb Navigation', () => {
    it('renders complete breadcrumb navigation', () => {
      render(
        <Breadcrumb data-testid="complete-breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Current Product')).toBeInTheDocument()
      expect(screen.getByText('More')).toBeInTheDocument()
      
      // Check aria-current on current page
      expect(screen.getByText('Current Product')).toHaveAttribute('aria-current', 'page')
    })

    it('allows navigation through links', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" data-testid="home-link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products" data-testid="products-link">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      
      const homeLink = screen.getByTestId('home-link')
      const productsLink = screen.getByTestId('products-link')
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(productsLink).toHaveAttribute('href', '/products')
    })
  })
}) 