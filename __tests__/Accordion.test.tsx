import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'

describe('Accordion Components', () => {
  it('renders correctly', () => {
    render(
      <Accordion data-testid="accordion" type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    const accordion = screen.getByTestId('accordion')
    expect(accordion).toBeInTheDocument()
  })
}) 