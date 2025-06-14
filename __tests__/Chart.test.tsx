import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Tooltip: ({ content }: { content: React.ComponentType }) => {
    const Content = content
    return <div data-testid="tooltip"><Content active payload={[]} /></div>
  },
  Legend: ({ content }: { content: React.ComponentType }) => {
    const Content = content
    return <div data-testid="legend"><Content payload={[]} /></div>
  },
}))

const mockChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
}

describe('Chart Components', () => {
  describe('ChartContainer', () => {
    it('renders correctly with config', () => {
      render(
        <ChartContainer config={mockChartConfig} className="h-[200px]">
          <div data-testid="chart-content">Chart Content</div>
        </ChartContainer>
      )
      
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('chart-content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <ChartContainer config={mockChartConfig} className="custom-chart">
          <div data-testid="chart-content">Chart Content</div>
        </ChartContainer>
      )
      
      const container = screen.getByTestId('responsive-container')
      expect(container.parentElement).toHaveClass('custom-chart')
    })

    it('generates unique chart id', () => {
      const { rerender } = render(
        <ChartContainer config={mockChartConfig}>
          <div data-testid="chart-1">Chart 1</div>
        </ChartContainer>
      )
      
      const firstChart = screen.getByTestId('chart-1')
      expect(firstChart).toBeInTheDocument()
      
      rerender(
        <ChartContainer config={mockChartConfig}>
          <div data-testid="chart-2">Chart 2</div>
        </ChartContainer>
      )
      
      const secondChart = screen.getByTestId('chart-2')
      expect(secondChart).toBeInTheDocument()
    })

    it('provides chart context to children', () => {
      const TestChild = () => {
        const { config } = React.useContext(
          require('@/components/ui/chart').ChartContext
        )
        return <div data-testid="config-test">{config ? 'Has Config' : 'No Config'}</div>
      }
      
      render(
        <ChartContainer config={mockChartConfig}>
          <TestChild />
        </ChartContainer>
      )
      
      expect(screen.getByTestId('config-test')).toHaveTextContent('Has Config')
    })
  })

  describe('ChartTooltip', () => {
    it('renders correctly', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltip />
        </ChartContainer>
      )
      
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    })

    it('accepts custom content', () => {
      const CustomContent = () => <div data-testid="custom-tooltip">Custom Tooltip</div>
      
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltip content={CustomContent} />
        </ChartContainer>
      )
      
      expect(screen.getByTestId('custom-tooltip')).toBeInTheDocument()
    })
  })

  describe('ChartTooltipContent', () => {
    const mockPayload = [
      {
        dataKey: 'desktop',
        name: 'Desktop',
        value: 100,
        color: '#8884d8',
        payload: { desktop: 100, mobile: 80 },
      },
      {
        dataKey: 'mobile',
        name: 'Mobile',
        value: 80,
        color: '#82ca9d',
        payload: { desktop: 100, mobile: 80 },
      },
    ]

    it('renders tooltip content correctly', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('January')).toBeInTheDocument()
      expect(screen.getByText('Desktop')).toBeInTheDocument()
      expect(screen.getByText('Mobile')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('80')).toBeInTheDocument()
    })

    it('returns null when not active', () => {
      const { container } = render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={false}
            payload={mockPayload}
            label="January"
          />
        </ChartContainer>
      )
      
      expect(container.firstChild?.textContent).toBe('')
    })

    it('returns null when no payload', () => {
      const { container } = render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={[]}
            label="January"
          />
        </ChartContainer>
      )
      
      expect(container.firstChild?.textContent).toBe('')
    })

    it('handles custom label formatter', () => {
      const labelFormatter = (label: string) => `Custom: ${label}`
      
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            labelFormatter={labelFormatter}
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('Custom: January')).toBeInTheDocument()
    })

    it('handles custom formatter', () => {
      const formatter = (value: number, name: string) => [`${value}%`, `${name} Percentage`]
      
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            formatter={formatter}
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('100%')).toBeInTheDocument()
      expect(screen.getByText('Desktop Percentage')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            className="custom-tooltip"
          />
        </ChartContainer>
      )
      
      const tooltipElement = screen.getByText('January').closest('div')
      expect(tooltipElement).toHaveClass('custom-tooltip')
    })

    it('hides label when hideLabel is true', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            hideLabel={true}
          />
        </ChartContainer>
      )
      
      expect(screen.queryByText('January')).not.toBeInTheDocument()
    })

    it('hides indicator when hideIndicator is true', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            hideIndicator={true}
          />
        </ChartContainer>
      )
      
      // The indicator elements should not be present
      const tooltipElement = screen.getByText('Desktop').closest('div')
      const indicators = tooltipElement?.querySelectorAll('[style*="--color-bg"]')
      expect(indicators).toHaveLength(0)
    })

    it('handles different indicator types', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            indicator="dot"
          />
        </ChartContainer>
      )
      
      const tooltipElement = screen.getByText('Desktop').closest('div')
      expect(tooltipElement).toBeInTheDocument()
    })

    it('handles dashed indicator', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            indicator="dashed"
          />
        </ChartContainer>
      )
      
      const tooltipElement = screen.getByText('Desktop').closest('div')
      expect(tooltipElement).toBeInTheDocument()
    })

    it('handles line indicator', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="January"
            indicator="line"
          />
        </ChartContainer>
      )
      
      const tooltipElement = screen.getByText('Desktop').closest('div')
      expect(tooltipElement).toBeInTheDocument()
    })
  })

  describe('ChartLegend', () => {
    it('renders correctly', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegend />
        </ChartContainer>
      )
      
      expect(screen.getByTestId('legend')).toBeInTheDocument()
    })

    it('accepts custom content', () => {
      const CustomContent = () => <div data-testid="custom-legend">Custom Legend</div>
      
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegend content={CustomContent} />
        </ChartContainer>
      )
      
      expect(screen.getByTestId('custom-legend')).toBeInTheDocument()
    })
  })

  describe('ChartLegendContent', () => {
    const mockLegendPayload = [
      {
        value: 'desktop',
        type: 'rect' as const,
        id: 'desktop',
        color: '#8884d8',
        dataKey: 'desktop',
      },
      {
        value: 'mobile',
        type: 'rect' as const,
        id: 'mobile',
        color: '#82ca9d',
        dataKey: 'mobile',
      },
    ]

    it('renders legend content correctly', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent payload={mockLegendPayload} />
        </ChartContainer>
      )
      
      expect(screen.getByText('Desktop')).toBeInTheDocument()
      expect(screen.getByText('Mobile')).toBeInTheDocument()
    })

    it('returns null when no payload', () => {
      const { container } = render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent payload={[]} />
        </ChartContainer>
      )
      
      expect(container.firstChild?.textContent).toBe('')
    })

    it('applies custom className', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent 
            payload={mockLegendPayload} 
            className="custom-legend"
          />
        </ChartContainer>
      )
      
      const legendElement = screen.getByText('Desktop').closest('div')
      expect(legendElement?.parentElement).toHaveClass('custom-legend')
    })

    it('positions correctly for top alignment', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent 
            payload={mockLegendPayload} 
            verticalAlign="top"
          />
        </ChartContainer>
      )
      
      const legendElement = screen.getByText('Desktop').closest('div')
      expect(legendElement?.parentElement).toHaveClass('pb-3')
    })

    it('positions correctly for bottom alignment', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent 
            payload={mockLegendPayload} 
            verticalAlign="bottom"
          />
        </ChartContainer>
      )
      
      const legendElement = screen.getByText('Desktop').closest('div')
      expect(legendElement?.parentElement).toHaveClass('pt-3')
    })

    it('hides icons when hideIcon is true', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent 
            payload={mockLegendPayload} 
            hideIcon={true}
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('Desktop')).toBeInTheDocument()
      expect(screen.getByText('Mobile')).toBeInTheDocument()
    })

    it('handles custom nameKey', () => {
      const customPayload = [
        {
          value: 'desktop',
          type: 'rect' as const,
          id: 'desktop',
          color: '#8884d8',
          customName: 'Desktop Users',
        },
      ]

      render(
        <ChartContainer config={{
          desktop: { label: 'Desktop Users', color: '#8884d8' }
        }}>
          <ChartLegendContent 
            payload={customPayload} 
            nameKey="customName"
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('Desktop Users')).toBeInTheDocument()
    })
  })

  describe('Chart Integration', () => {
    it('works with complete chart setup', () => {
      const CompleteChart = () => (
        <ChartContainer config={mockChartConfig} className="min-h-[200px]">
          <div data-testid="chart-area">
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <div data-testid="chart-data">Chart Data Visualization</div>
          </div>
        </ChartContainer>
      )

      render(<CompleteChart />)
      
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('chart-area')).toBeInTheDocument()
      expect(screen.getByTestId('chart-data')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(screen.getByTestId('legend')).toBeInTheDocument()
    })

    it('maintains context throughout component tree', () => {
      const ContextChecker = () => {
        const context = React.useContext(
          require('@/components/ui/chart').ChartContext
        )
        return (
          <div data-testid="context-check">
            {context ? 'Context Available' : 'No Context'}
          </div>
        )
      }

      render(
        <ChartContainer config={mockChartConfig}>
          <div>
            <div>
              <ContextChecker />
            </div>
          </div>
        </ChartContainer>
      )
      
      expect(screen.getByTestId('context-check')).toHaveTextContent('Context Available')
    })

    it('handles empty config gracefully', () => {
      render(
        <ChartContainer config={{}}>
          <ChartTooltipContent
            active={true}
            payload={[{ dataKey: 'test', value: 100, name: 'Test' }]}
          />
        </ChartContainer>
      )
      
      expect(screen.getByText('Test')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('maintains accessibility in tooltip', () => {
      render(
        <ChartContainer config={mockChartConfig}>
          <ChartTooltipContent
            active={true}
            payload={[{ dataKey: 'desktop', value: 100, name: 'Desktop' }]}
            label="January"
          />
        </ChartContainer>
      )
      
      const tooltipElement = screen.getByText('January').closest('div')
      expect(tooltipElement).toBeInTheDocument()
      expect(tooltipElement).toHaveClass('rounded-lg', 'border', 'bg-background')
    })

    it('maintains accessibility in legend', () => {
      const payload = [
        { value: 'desktop', color: '#8884d8', dataKey: 'desktop' }
      ]

      render(
        <ChartContainer config={mockChartConfig}>
          <ChartLegendContent payload={payload} />
        </ChartContainer>
      )
      
      const legendElement = screen.getByText('Desktop').closest('div')
      expect(legendElement?.parentElement).toHaveClass('flex', 'items-center', 'justify-center')
    })
  })
}) 