import { render } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'

describe('ThemeProvider Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    )
    
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('provides theme context', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    )
    
    // Verificar que el componente NextThemesProvider está presente
    expect(container.firstChild).toHaveAttribute('data-theme')
  })
}) 