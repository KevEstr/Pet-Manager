import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'

describe('Collapsible Components', () => {
  it('renders Collapsible correctly', () => {
    render(
      <Collapsible data-testid="collapsible">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )
    
    const collapsible = screen.getByTestId('collapsible')
    expect(collapsible).toBeInTheDocument()
  })

  it('renders CollapsibleTrigger correctly', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByTestId('trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Toggle')
  })
}) 