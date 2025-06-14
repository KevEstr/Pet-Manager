import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

describe('Tabs Component', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { value: 'tab3', label: 'Tab 3', content: 'Content 3' },
  ]

  it('renders all tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    )
    
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument()
    })
  })

  it('shows content of selected tab', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    )
    
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })

  it('changes content when tab is clicked', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    )
    
    fireEvent.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(
      <Tabs defaultValue="tab1" className="custom-class">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )
    
    expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-class')
  })
}) 