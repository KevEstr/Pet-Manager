import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout from '@/app/layout'

// Mock the components
jest.mock('@/components/sidebar-provider', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
}))

jest.mock('@/components/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

jest.mock('@/components/sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}))

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}))

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const TestChild = () => <div data-testid="test-child">Test Child Content</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child Content')
  })

  it('renders with correct HTML structure', () => {
    const TestChild = () => <div data-testid="test-child">Test Child</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const htmlElement = container.querySelector('html')
    expect(htmlElement).toHaveAttribute('lang', 'es')
    expect(htmlElement).toHaveClass('h-full')
  })

  it('renders body with correct classes', () => {
    const TestChild = () => <div>Test</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const bodyElement = container.querySelector('body')
    expect(bodyElement).toHaveClass('inter-font', 'min-h-full', 'bg-gray-50', 'antialiased')
  })

  it('renders SidebarProvider wrapper', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders Sidebar component', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('renders main content area with correct classes', () => {
    const TestChild = () => <div data-testid="child">Content</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('flex-1', 'p-4', 'lg:p-6')
    expect(mainElement).toContainElement(screen.getByTestId('child'))
  })

  it('has proper layout structure', () => {
    const TestChild = () => <div data-testid="content">Main Content</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    // Check that layout has the correct structure
    const flexContainer = screen.getByTestId('sidebar-provider').querySelector('.flex')
    expect(flexContainer).toBeInTheDocument()
    expect(flexContainer).toContainElement(screen.getByTestId('sidebar'))
    expect(flexContainer).toContainElement(screen.getByRole('main'))
  })

  it('renders multiple children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </RootLayout>
    )
    
    expect(screen.getByTestId('child-1')).toHaveTextContent('Child 1')
    expect(screen.getByTestId('child-2')).toHaveTextContent('Child 2')
    expect(screen.getByTestId('child-3')).toHaveTextContent('Child 3')
  })

  it('maintains consistent DOM structure', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    // Verify the nested structure: html > body > SidebarProvider > div.min-h-screen
    const sidebarProvider = screen.getByTestId('sidebar-provider')
    const minHeightContainer = sidebarProvider.querySelector('.min-h-screen')
    expect(minHeightContainer).toBeInTheDocument()
    expect(minHeightContainer).toContainElement(screen.getByTestId('header'))
  })
}) 