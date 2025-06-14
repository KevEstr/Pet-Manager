import { render, screen } from '@testing-library/react'
import { Chart } from '@/components/ui/chart'

const mockData = [
  { name: 'Enero', value: 100 },
  { name: 'Febrero', value: 200 },
  { name: 'Marzo', value: 300 },
]

describe('Chart Component', () => {
  it('renders chart with data', () => {
    render(
      <Chart
        data={mockData}
        dataKey="value"
        nameKey="name"
        title="Test Chart"
      />
    )
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument()
  })

  it('renders chart with custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff']
    
    render(
      <Chart
        data={mockData}
        dataKey="value"
        nameKey="name"
        title="Test Chart"
        colors={customColors}
      />
    )
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument()
  })

  it('renders chart with loading state', () => {
    render(
      <Chart
        data={mockData}
        dataKey="value"
        nameKey="name"
        title="Test Chart"
        isLoading={true}
      />
    )
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders chart with error state', () => {
    render(
      <Chart
        data={mockData}
        dataKey="value"
        nameKey="name"
        title="Test Chart"
        error="Test error"
      />
    )
    
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })
}) 