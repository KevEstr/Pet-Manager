import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@/components/theme-provider'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => {
    return <div data-testid="next-themes-provider" {...props}>{children}</div>
  },
}))

describe('ThemeProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('child-element')).toHaveTextContent('Test Child')
  })

  it('passes props to NextThemesProvider', () => {
    const testProps = {
      attribute: 'class',
      defaultTheme: 'system',
      enableSystem: true,
    }
    
    render(
      <ThemeProvider {...testProps}>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>
    )
    
    const provider = screen.getByTestId('next-themes-provider')
    expect(provider).toHaveAttribute('attribute', 'class')
    expect(provider).toHaveAttribute('defaultTheme', 'system')
    expect(provider).toHaveAttribute('enableSystem', 'true')
  })

  it('renders multiple children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('child-1')).toHaveTextContent('Child 1')
    expect(screen.getByTestId('child-2')).toHaveTextContent('Child 2')
    expect(screen.getByTestId('child-3')).toHaveTextContent('Child 3')
  })

  it('handles empty children', () => {
    render(<ThemeProvider />)
    
    const provider = screen.getByTestId('next-themes-provider')
    expect(provider).toBeInTheDocument()
    expect(provider).toBeEmptyDOMElement()
  })

  it('preserves ThemeProviderProps type', () => {
    const testProps = {
      storageKey: 'custom-theme',
      themes: ['light', 'dark'],
      forcedTheme: 'light',
    }
    
    render(
      <ThemeProvider {...testProps}>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>
    )
    
    const provider = screen.getByTestId('next-themes-provider')
    expect(provider).toHaveAttribute('storageKey', 'custom-theme')
    expect(provider).toHaveAttribute('forcedTheme', 'light')
  })

  it('handles readonly children prop correctly', () => {
    const ReadonlyChildrenTest = () => {
      const children = <div data-testid="readonly-child">Readonly Child</div>
      
      return (
        <ThemeProvider>
          {children}
        </ThemeProvider>
      )
    }
    
    render(<ReadonlyChildrenTest />)
    
    expect(screen.getByTestId('readonly-child')).toHaveTextContent('Readonly Child')
  })

  it('supports nested theme providers', () => {
    render(
      <ThemeProvider attribute="class">
        <ThemeProvider storageKey="nested-theme">
          <div data-testid="nested-child">Nested Child</div>
        </ThemeProvider>
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('nested-child')).toHaveTextContent('Nested Child')
  })

  it('maintains component display name', () => {
    expect(ThemeProvider.displayName).toBeUndefined() // Component doesn't set displayName
    expect(ThemeProvider.name).toBe('ThemeProvider')
  })
}) 